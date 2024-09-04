"use client";

import { SelectedItemsProvider, useSelectedItems } from "@/app/selected-items-context";
import SearchForm from "@/components/search-form";
import DeleteButton from "@/components/delete-button";
import DateSelect from "@/components/date-select";
import FilterButton from "@/components/dropdown-filter";
import InvoicesTable, { Record } from "./invoices-table";
import PaginationClassic from "@/components/pagination-classic";
import { useSession } from "next-auth/react";
import { SetStateAction, useEffect, useMemo, useState } from "react";
import Toast from "@/components/toast";
import * as XLSX from "xlsx";
import { format } from 'date-fns';

import {
  fetchRecords,
  addRecord,
  updateRecord,
  deleteRecord,
  uploadRecord,
} from "@/lib/hooks/useGoogleSheet";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import Datepicker from "@/components/datepicker";
import ModalBlank from "@/components/modal-blank";
import { OrbitProgress, ThreeDot } from "react-loading-indicators";
import LoadingIndicator from "@/components/loading-indicator";


function GivingContent() {
  const { data: session, status } = useSession();
  const axiosAuth = useAxiosAuth();
  const [records, setRecords] = useState<any[]>([]);
  const [newRecord, setNewRecord] = useState<Record | null>(null);
  const [toastWarningOpen, setToastWarningOpen] = useState<boolean>(false);
  const [toastErrorOpen, setToastErrorOpen] = useState<boolean>(false);
  const [toastSuccessOpen, setToastSuccessOpen] = useState<boolean>(false);
  const [toastInfoOpen, setToastInfoOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sheetId, setSheetId] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null);
  const [dangerModalOpen, setDangerModalOpen] = useState<boolean>(false);
  const { selectedItems, setSelectedItems } = useSelectedItems()// Add this line
  const [multiDeleteModalOpen, setMultiDeleteModalOpen] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10; // Define the number of items per page

  const filteredAndSortedRecords = useMemo(() => {
    // If searchTerm is empty, return all records (except the header row)
    if (typeof searchTerm !== "string" || searchTerm.trim() === "") {
      return records;
    }
  
    // Split search terms by commas
    const searchTerms = searchTerm.split(",").filter(term => term.trim() !== "").map(term => term.trim().toLowerCase());
  
    // Filter records based on search terms
    let filteredRecords = records.slice(1).filter((record) => {
      return Object.values(record).some((value) => 
        typeof value === 'string' && searchTerms.some((term) => value.toLowerCase().includes(term))
      );
    });
  
    // Sort the filtered records
    if (sortConfig.key) {
      filteredRecords = filteredRecords.sort((a, b) => {
        const valueA =
          sortConfig.key === "amount"
            ? parseFloat(a[sortConfig.key].replace(/,/g, ""))
            : a[sortConfig.key];
        const valueB =
          sortConfig.key === "amount"
            ? parseFloat(b[sortConfig.key].replace(/,/g, ""))
            : b[sortConfig.key];

        if (valueA < valueB) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (valueA > valueB) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
  
    // Add back the header row after filtering and sorting
    return [records[0], ...filteredRecords];
  }, [records, searchTerm, sortConfig]);  

  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredAndSortedRecords.slice(start, end);
  }, [filteredAndSortedRecords, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedRecords.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const fetchData = async () => {
    try {
      // setToastMessage("Fetching records...");
      // setToastInfoOpen(true);
      const data = await fetchRecords(axiosAuth, "/client/church/records");
      
      const formattedRecords = data.values.map((record: any[], index: any) => ({
        id: index,
        crmStatus: record[0],
        amount: record[1].trim().replace(/[$ ]+/g, ""),
        wallet: record[2],
        fullName: record[3],
        date: record[4].split(" ")[0],
        category: record[5],
        memo: record[6],
        nameInWallet: record[7],
      }));
      setRecords(formattedRecords);
      setSheetId(data.sheetId);
      setToastInfoOpen(false);
    } catch (error) {
      console.error("Error fetching records:", error);
      setToastMessage("Error fetching records.");
      setToastInfoOpen(false);
      setToastErrorOpen(true);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      setIsLoading(true);
      fetchData();
      setIsLoading(false);
    }
  }, [status, axiosAuth]);

  const handleAddRecord = () => {
    setNewRecord({
      crmStatus: "New",
      amount: "",
      wallet: "",
      fullName: "",
      date: "",
      category: "",
      memo: "",
      nameInWallet: "",
    });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSaveNewRecord = async (
    record: Record
  ) => {
    record.date = format(record.date, 'MM/dd/yyyy');
    try {
      setToastMessage("Saving new record...");
      setToastInfoOpen(true);
      await addRecord(
        axiosAuth,
        Object.values(record),
        "/client/church/record"
      );
      await fetchData();
      setNewRecord(null);
      setToastInfoOpen(false);
      setToastMessage("Record added successfully.");
      setToastSuccessOpen(true);
    } catch (error) {
      console.error("Error adding record:", error);
      setToastMessage("Error adding record.");
      setToastInfoOpen(false);
      setToastErrorOpen(true);
    }
  };

  const handleUploadRecord = async () => {
    if (selectedItems.length === 0) {
      setToastMessage(`Select transactions to upload.`);
      setToastWarningOpen(true);
      return;
    }
  
    const newRecords = selectedItems.filter(index => records[index].crmStatus === "New");
  
    if (newRecords.length !== selectedItems.length) {
      setToastMessage(`Select only "New" transactions to upload.`);
      setToastWarningOpen(true);
      return;
    }
  
    try {
      setToastMessage("Uploading records...");
      setToastInfoOpen(true);
  
      const updatePromises = newRecords.map(index => {
        const updatedRecord = { ...records[index], crmStatus: "Pending" };
        return updateRecord(axiosAuth, index + 1, updatedRecord, `/client/church/record`);
      });
  
      await Promise.all(updatePromises);
  
      // Upload the records after updating the statuses
      await uploadRecord(axiosAuth, "/client/church/upload");
  
      setToastInfoOpen(false);
      setToastMessage("Records uploaded successfully.");
      setToastSuccessOpen(true);
  
      // Optionally, refetch the records to update the state
      setSelectedItems([]);
      await fetchData();
    } catch (error) {
      console.error("Error uploading record:", error);
      setToastMessage("Error uploading records.");
      setToastInfoOpen(false);
      setToastErrorOpen(true);
    }
  };
  
  
  

  const handleUpdateRecord = async (index: number, updatedRecord: any) => {
    index = index + 1;
    try {
      setToastMessage("Updating record...");
      setToastInfoOpen(true);
      await updateRecord(
        axiosAuth,
        index,
        updatedRecord,
        `/client/church/record`
      );
      await fetchData();
      setToastInfoOpen(false);
      setToastMessage("Record updated successfully.");
      setToastSuccessOpen(true);
    } catch (error) {
      console.error("Error updating record:", error);
      setToastMessage("Error updating record.");
      setToastInfoOpen(false);
      setToastErrorOpen(true);
    }
  };

  
  const handleDeleteMultipleRecords = async () => {
    if (selectedItems.length === 0) {
      setToastMessage("Please select records to delete.");
      setToastWarningOpen(true);
      return;
    }

    setMultiDeleteModalOpen(true); // Open the danger modal for multiple deletion
  };

  const confirmMultipleDelete = async () => {
    setIsDeleting(true);
    const selectedItemsLength = selectedItems.length;
    try {
      // setToastMessage("Deleting selected records...");
      // setToastInfoOpen(true);

      const deletePromises = selectedItems.map(async (index) => {
        const recordId = index + 1; // Adjust for 1-based index in the Google Sheets API
        return await deleteRecord(axiosAuth, sheetId, recordId, `/client/church/record`);
      });

      await Promise.all(deletePromises);

      await fetchData();
      setSelectedItems([]); // Clear selected items
      setToastInfoOpen(false);
      setToastMessage(`You have successfully deleted ${selectedItemsLength} Transaction(s).`);
      setToastSuccessOpen(true);
    } catch (error) {
      console.error("Error deleting transaction:", error);
      setToastMessage("Error deleting selected transaction.");
      setToastInfoOpen(false);
      setToastErrorOpen(true);
    } finally {
      setIsDeleting(false); 
      setMultiDeleteModalOpen(false); // Close the modal after the operation
    }
  };


  
  const handleDeleteRecord = (index: number) => {
    index = index + 1;
    setSelectedRecordId(index); // Store the ID of the member to delete
    setDangerModalOpen(true); // Show the confirmation modal
  };

  const confirmDelete = async () => {
    setIsDeleting(true); 
    if (selectedRecordId !== null) {
      try {
        // setToastMessage("Deleting transaction...");
        // setToastInfoOpen(true);
        await deleteRecord(axiosAuth,sheetId, selectedRecordId, `/client/church/record`);  // Pass sheetId and rowIndex
        await fetchData();
        setSelectedItems([]);
        setToastInfoOpen(false);
        setToastMessage("Transaction deleted successfully.");
        setToastSuccessOpen(true);
      } catch (error) {
        console.error("Error deleting transaction:", error);
        setToastMessage("Error deleting transaction.");
        setToastInfoOpen(false);
        setToastErrorOpen(true);
      } finally {
        setIsDeleting(false); 
        setDangerModalOpen(false); // Close the modal after the operation
      }
    }
  };
  
  

  const handleDateChange = (dates: [any, any]) => {
    const [startDate, endDate] = dates;
    const filteredRecords = records.filter((record) => {
      const recordDate = new Date(record.date);
      return recordDate >= startDate && recordDate <= endDate;
    });
    setRecords(filteredRecords);
  };

  const handleDownload = () => {
    if (selectedItems.length === 0) {
      setToastMessage("Please select transactions to download.");
      setToastWarningOpen(true);
      return;
    }
  
    let selectedRecords = selectedItems.map(selectedId => {
      // Find the record in filteredAndSortedRecords that matches the selectedId
      const record = paginatedRecords.find(rec => rec.id === selectedId);
  
      if (record) {
        // Create a shallow copy of the record and remove the id property
        const { id, ...recordWithoutId } = record;
        return recordWithoutId;
      }
  
      return null;
    }).filter(record => record !== null); // Filter out any null values
    if (selectedRecords.length === 0) {
      setToastMessage("No valid records found to download.");
      setToastWarningOpen(true);
      return;
    }
    selectedRecords = selectedRecords.length === paginatedRecords.length ? selectedRecords.slice(1) : selectedRecords;
    const ws = XLSX.utils.json_to_sheet(selectedRecords);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "transactions");
  
    // Generate Excel file and trigger download
    XLSX.writeFile(
      wb,
      `${session?.user.churchInfo?.church.name} - ${Date.now()}.xlsx`
    );

    setToastMessage("Download successful.");
    setToastSuccessOpen(true);

  };
  
  
  

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    // Sort records
    // Sort records
    const sortedRecords = [...records.slice(1)].sort((a, b) => {
      let valueA, valueB;
    
      if (key === "amount") {
        // Handle the sorting for the "amount" field
        valueA = parseFloat(String(a[key]).replace(/,/g, ""));
        valueB = parseFloat(String(b[key]).replace(/,/g, ""));
      } else if (key === "date") {
        // Handle the sorting for the "date" field
        valueA = new Date(a[key]).getTime();
        valueB = new Date(b[key]).getTime();
      } else {
        // Default sorting for other fields
        valueA = a[key];
        valueB = b[key];
      }
    
      if (valueA < valueB) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
    

    setSortConfig({ key, direction });
    setRecords( [records[0], ...sortedRecords]);
  };

  if (status === "loading" || isLoading) return (
    <LoadingIndicator />
  );

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      <div className="fixed bottom-0 right-0 z-50 p-4">
        <Toast
          type="warning"
          open={toastWarningOpen}
          setOpen={setToastWarningOpen}
          duration={5000}
        >
          {toastMessage}
        </Toast>

        <Toast
          type="success"
          open={toastSuccessOpen}
          setOpen={setToastSuccessOpen}
          duration={5000}
        >
          {toastMessage}
        </Toast>

        <Toast
          type="error"
          open={toastErrorOpen}
          setOpen={setToastErrorOpen}
          duration={5000}
        >
          {toastMessage}
        </Toast>

        <Toast
          type="info"
          open={toastInfoOpen}
          setOpen={setToastInfoOpen}
          duration={5000}
        >
          {toastMessage}
        </Toast>
      </div>
      <ModalBlank isOpen={dangerModalOpen} setIsOpen={setDangerModalOpen}>
        <div className="p-5 flex space-x-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-gray-100 dark:bg-gray-700">
            <svg
              className="shrink-0 fill-current text-red-500"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z" />
            </svg>
          </div>
          <div>
            <div className="mb-2">
              <div className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Delete transaction?
              </div>
            </div>
            <div className="text-sm mb-10">
              <div className="space-y-2">
                <p>Are you sure you want to delete this transaction?</p>
              </div>
            </div>
            <div className="flex flex-wrap justify-end space-x-2">
              <button
                className="btn-sm border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-300"
                onClick={() => setDangerModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="btn-sm bg-red-500 hover:bg-red-600 text-white"
                onClick={confirmDelete} // Call confirmDelete on confirmation
              >
                {!isDeleting ? "Yes, Delete it": "Deleting..."}
              </button>
            </div>
          </div>
        </div>
      </ModalBlank>
      {/* Modal for multiple deletions */}
      <ModalBlank isOpen={multiDeleteModalOpen} setIsOpen={setMultiDeleteModalOpen}>
        <div className="p-5 flex space-x-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-gray-100 dark:bg-gray-700">
            <svg
              className="shrink-0 fill-current text-red-500"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z" />
            </svg>
          </div>
          <div>
            <div className="mb-2">
              <div className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Delete selected transaction?
              </div>
            </div>
            <div className="text-sm mb-10">
              <div className="space-y-2">
                <p>You are about to delete {selectedItems.length } transaction(s), Are you sure?</p>
              </div>
            </div>
            <div className="flex flex-wrap justify-end space-x-2">
              <button
                className="btn-sm border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-300"
                onClick={() => setMultiDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="btn-sm bg-red-500 hover:bg-red-600 text-white"
                onClick={confirmMultipleDelete} // Confirm multiple deletions
              >
                {!isDeleting ? "Yes, Delete": "Deleting..."}
              </button>
            </div>
          </div>
        </div>
      </ModalBlank>
      {/* Page header */}
      <div className="sm:flex sm:justify-between sm:items-center mb-5">
        {/* Left: Title */}
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
            Giving
          </h1>
        </div>
        {/* Right: Actions */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          {/* Search form */}
          {/* Create invoice button */}
          {session?.user.churchInfo?.church.hasCrm &&<button
            className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
            onClick={handleUploadRecord}
          >
            <svg
              className="fill-current shrink-0 xs:hidden"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
            </svg>
            <span className="max-xs:sr-only">
              Upload to {session?.user.churchInfo?.church.name}
            </span>
          </button>}
          <button
            className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
            onClick={handleAddRecord}
          >
            <svg
              className="fill-current shrink-0 xs:hidden"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
            </svg>
            <span className="max-xs:sr-only">Add Giving</span>
          </button>
        </div>
      </div>

      {/* More actions */}
      <div className="sm:flex sm:justify-between sm:items-center mb-5">
        {/* Left side */}
        <div className="mb-4 sm:mb-0">
          <ul className="flex flex-wrap -m-1">{/* Left-side actions */}</ul>
        </div>
        {/* Right side */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          {/* Delete button */}
          <DeleteButton 
        handleDeleteMultipleRecords={handleDeleteMultipleRecords} 
        selectedItems={selectedItems} 
      />
          {/* Dropdown */}
          <SearchForm placeholder="Search…" onChange={handleSearch} />

          {/* <Datepicker onDateChange={handleDateChange} /> */}
          {/* <FilterButton align="right" /> */}
          <button
            className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
            onClick={handleDownload}
          >
            <svg
              className="fill-current shrink-0 xs:hidden"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
            </svg>
            <span className="max-xs:sr-only">Download</span>
          </button>
        </div>
      </div>
      {/* Table */}
      <InvoicesTable
        invoices={paginatedRecords}
        newRecord={newRecord}
        onSaveNewRecord={handleSaveNewRecord}
        onUpdateRecord={handleUpdateRecord}
        onDeleteRecord={handleDeleteRecord}
        onHandleSort={handleSort}
        sortConfig={sortConfig}
        setNewRecordToNull={() => setNewRecord(null)}
        setSelectedItems={setSelectedItems}
      />
      {/* Pagination */}
      <div className="mt-8">
      <PaginationClassic
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          itemsPerPage={itemsPerPage} // Pass itemsPerPage to the PaginationClassic component
          filteredAndSortedRecords={filteredAndSortedRecords} // Pass filteredAndSortedRecords to the PaginationClassic component
        />
      </div>
    </div>
  );
}

export default function Invoices() {
  return (
    <SelectedItemsProvider>
      <GivingContent />
    </SelectedItemsProvider>
  );
}
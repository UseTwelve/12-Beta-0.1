"use client";

import { SelectedItemsProvider, useSelectedItems } from "@/app/selected-items-context";
import SearchForm from "@/components/search-form";
import DeleteButton from "@/components/delete-button";
import DateSelect from "@/components/date-select";
import FilterButton from "@/components/dropdown-filter";
import InvoicesTable, { Giver } from "./invoices-table";
import PaginationClassic from "@/components/pagination-classic";
import { useSession } from "next-auth/react";
import { SetStateAction, use, useEffect, useMemo, useState } from "react";
import Toast from "@/components/toast";
import * as XLSX from "xlsx";

import {
  fetchRecords,
  addRecord,
  updateRecord,
  deleteRecord,
  uploadRecord,
} from "@/lib/hooks/useGoogleSheet";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import ModalBlank from "@/components/modal-blank";

function GivingContent() {
  const { data: session, status } = useSession();
  const axiosAuth = useAxiosAuth();
  const [records, setRecords] = useState<any[]>([]);
  const [newRecord, setNewRecord] = useState<Giver | null>(null);
  const [toastWarningOpen, setToastWarningOpen] = useState<boolean>(false);
  const [toastErrorOpen, setToastErrorOpen] = useState<boolean>(false);
  const [toastSuccessOpen, setToastSuccessOpen] = useState<boolean>(false);
  const [toastInfoOpen, setToastInfoOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [dangerModalOpen, setDangerModalOpen] = useState<boolean>(false);
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sheetId, setSheetId] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const apiUrl = "/client/givers";
  const { selectedItems, setSelectedItems } = useSelectedItems()

  const filteredAndSortedRecords = useMemo(() => {
    // If searchTerm is empty, return all records (except the header row)
    if (searchTerm.trim() === "") {
      return records;
    }
  
    // Split search terms by commas
    const searchTerms = searchTerm.split(",").filter(term=> term !== " ").map(term => term.trim().toLowerCase());
  
    // Filter records based on search terms
    let filteredRecords = records.slice(1).filter((record) => {
      return Object.values(record).some((value) => 
        typeof value === 'string' && searchTerms.some((term) => value.toLowerCase().includes(term))
      );
    });
  
    // Sort the filtered records
    if (sortConfig.key) {
      filteredRecords.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
  
    // Add back the header row after filtering and sorting
    return [records[0], ...filteredRecords];
  }, [records, searchTerm, sortConfig]);

  const fetchData = async () => {
    try {
      setToastMessage("Fetching records...");
      setToastInfoOpen(true);
      const data = await fetchRecords(axiosAuth, apiUrl);
      const formattedRecords = data.values.map((record: any, index:any) => ({
        id:index,
        nameInWallet: record[0],
        crmName: record[1],
        group: record[2],
        subGroup: record[3],
        wallet: record[4],
        fellowship: record[5],
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
      fetchData();
    }
  }, [status, axiosAuth]);

  const handleAddRecord = () => {
    setNewRecord({
      nameInWallet: "",
      crmName: "",
      group: "",
      subGroup: "",
      wallet: "",
      fellowship: "",
      softrRecordID: "",
    });
  };

  const handleSaveNewRecord = async (record: Giver) => {
    try {
      setToastMessage("Saving new record...");
      setToastInfoOpen(true);
      await addRecord(axiosAuth, Object.values(record), apiUrl);
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

  const handleDownload = () => {
    const ws = XLSX.utils.json_to_sheet(records);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "givers");

    // Generate Excel file and trigger download
    XLSX.writeFile(wb, "givers.xlsx");
  };

  const handleSearch = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchTerm(event.target.value);
  };

  const handleUpdateRecord = async (index: number, updatedRecord: Giver) => {
    index = index + 1;
    try {
      setToastMessage("Updating record...");
      setToastInfoOpen(true);
      await updateRecord(axiosAuth, index, updatedRecord, apiUrl);
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
  
    try {
      setToastMessage("Deleting selected records...");
      setToastInfoOpen(true);
  
      const deletePromises = selectedItems.map(async (index) => {
        const recordId = index + 1; // Adjust for 1-based index in the Google Sheets API
        return await deleteRecord(axiosAuth, sheetId, recordId, `/client/church/record`);
      });
  
      await Promise.all(deletePromises);
  
      setSelectedItems([]); // Clear selected items
      await fetchData();
      setToastInfoOpen(false);
      setToastMessage("Selected records deleted successfully.");
      setToastSuccessOpen(true);
    } catch (error) {
      console.error("Error deleting records:", error);
      setToastMessage("Error deleting selected records.");
      setToastInfoOpen(false);
      setToastErrorOpen(true);
    }
  }

  const handleDeleteRecord = (index: number) => {
    index = index + 1;
    setSelectedRecordId(index); // Store the ID of the member to delete
    setDangerModalOpen(true); // Show the confirmation modal
  };


  const confirmDelete = async () => {
    if (selectedRecordId !== null) {
      try {
        setToastMessage("Deleting record...");
        setToastInfoOpen(true);
        await deleteRecord(axiosAuth,sheetId, selectedRecordId, apiUrl);  // Pass sheetId and rowIndex
        await fetchData();
        setToastInfoOpen(false);
        setToastMessage("Record deleted successfully.");
        setToastSuccessOpen(true);
      } catch (error) {
        console.error("Error deleting record:", error);
        setToastMessage("Error deleting record.");
        setToastInfoOpen(false);
        setToastErrorOpen(true);
      } finally {
        setDangerModalOpen(false); // Close the modal after the operation
      }
    }
  };

  if (status === "loading") return <p>Loading...</p>;

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
                Delete giver?
              </div>
            </div>
            <div className="text-sm mb-10">
              <div className="space-y-2">
                <p>Are you sure you want to delete this giver?</p>
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
                Yes, Delete it
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
            Givers
          </h1>
        </div>
        {/* Right: Actions */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          {/* Search form */}
          {/* Create invoice button */}
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
            <span className="max-xs:sr-only">Add Giver</span>
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
          {/* <DateSelect /> */}
          {/* <FilterButton align="right" /> */}
          {/* <button
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
          </button> */}
        </div>
      </div>

      {/* Table */}
      <InvoicesTable
        invoices={filteredAndSortedRecords}
        newRecord={newRecord}
        onSaveNewRecord={handleSaveNewRecord}
        onUpdateRecord={handleUpdateRecord}
        onDeleteRecord={handleDeleteRecord}
        setNewRecordToNull={() => setNewRecord(null)}
        setSelectedItems={setSelectedItems}
      />

      {/* Pagination */}
      {/* <div className="mt-8">
        <PaginationClassic />
      </div> */}
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

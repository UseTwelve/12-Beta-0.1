"use client";

import { SelectedItemsProvider } from "@/app/selected-items-context";
import SearchForm from "@/components/search-form";
import DeleteButton from "@/components/delete-button";
import InvoicesTable from "./invoices-table";
import { useSession } from "next-auth/react";
import { SetStateAction, useEffect, useMemo, useState } from "react";
import Toast from "@/components/toast";

import {
  fetchRecords,
  deleteRecord,
} from "@/lib/hooks/useRequests";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { FlyoutProvider, useFlyoutContext } from "@/app/flyout-context";
import { MemberDetailProvider, useMemberDetail } from "./transaction-context";
import MemberPanel from "./transaction-panel";
import ModalBlank from "@/components/modal-blank";

function GivingContent() {
  const { data: session, status } = useSession();
  const axiosAuth = useAxiosAuth();
  const [records, setRecords] = useState<any[]>([]);
  const [newRecord, setNewRecord] = useState(null);
  const [toastWarningOpen, setToastWarningOpen] = useState<boolean>(false);
  const [toastErrorOpen, setToastErrorOpen] = useState<boolean>(false);
  const [toastSuccessOpen, setToastSuccessOpen] = useState<boolean>(false);
  const [toastInfoOpen, setToastInfoOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [dangerModalOpen, setDangerModalOpen] = useState<boolean>(false);
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const apiUrl = "/admin/users";

  const { setMember } = useMemberDetail();
  const { setFlyoutOpen } = useFlyoutContext();

  const filteredAndSortedRecords = useMemo(() => {
    // Step 1: Filter records
    let filteredRecords = records.filter((record) => {
      return Object.values(record).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    // Step 2: Sort the filtered records
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
    return filteredRecords;
  }, [records, searchTerm, sortConfig]);

  const fetchData = async () => {
    try {
      setToastMessage("Fetching records...");
      setToastInfoOpen(true);
      const data = await fetchRecords(axiosAuth, apiUrl);
      setRecords(data);
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

  const handleDeleteRecord = (id: number) => {
    setSelectedMemberId(id); // Store the ID of the member to delete
    setDangerModalOpen(true); // Show the confirmation modal
  };

  const confirmDelete = async () => {
    if (selectedMemberId !== null) {
      try {
        setToastMessage("Deleting record...");
        setToastInfoOpen(true);
        await deleteRecord(axiosAuth, selectedMemberId, apiUrl);
        await fetchData();
        setToastInfoOpen(false);
        setToastMessage("User deleted successfully.");
        setToastSuccessOpen(true);
      } catch (error) {
        console.error("Error deleting user:", error);
        setToastMessage("Error deleting user.");
        setToastInfoOpen(false);
        setToastErrorOpen(true);
      } finally {
        setDangerModalOpen(false); // Close the modal after the operation
      }
    }
  };

  const handleSearch = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
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
                Delete user?
              </div>
            </div>
            <div className="text-sm mb-10">
              <div className="space-y-2">
                <p>Are you sure you want to delete this member?</p>
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
            Members
          </h1>
        </div>
        {/* Right: Actions */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          {/* Search form */}
          {/* Create invoice button */}
          <button
            className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
            onClick={() => {
              setMember(null); // Clear the current church in context
              setFlyoutOpen(true);
            }}
          >
            <svg
              className="fill-current shrink-0 xs:hidden"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
            </svg>
            <span className="max-xs:sr-only">Add Member</span>
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
          <DeleteButton />
          {/* Dropdown */}
          {/* <SearchForm placeholder="Search" onChange={handleSearch} /> */}
        </div>
      </div>

      {/* Table */}
      <InvoicesTable
        members={records}
        newRecord={newRecord}
        onDeleteRecord={handleDeleteRecord}
      />
       <MemberPanel onReload={fetchData} />

      {/* Pagination */}
      {/* <div className="mt-8">
        <PaginationClassic />
      </div> */}
    </div>
  );
}

export default function Members() {
  return (
    <SelectedItemsProvider>
      <FlyoutProvider initialState={false}>
        <MemberDetailProvider>
          <GivingContent />
        </MemberDetailProvider>
      </FlyoutProvider>
    </SelectedItemsProvider>
  );
}

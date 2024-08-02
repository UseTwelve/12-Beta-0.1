"use client"

import { SelectedItemsProvider } from '@/app/selected-items-context'
import SearchForm from '@/components/search-form'
import DeleteButton from '@/components/delete-button'
import DateSelect from '@/components/date-select'
import InvoicesTable from './invoices-table'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Toast from '@/components/toast';
import * as XLSX from 'xlsx';

import { fetchRecords, addRecord, updateRecord, deleteRecord } from '@/lib/hooks/useRequests';
import useAxiosAuth from '@/lib/hooks/useAxiosAuth';

function GivingContent() {
  const { data: session, status } = useSession();
  const axiosAuth = useAxiosAuth();
  const [records, setRecords] = useState<any[]>([]);
  const [newRecord, setNewRecord] = useState(null);
  const [toastWarningOpen, setToastWarningOpen] = useState<boolean>(false)
  const [toastErrorOpen, setToastErrorOpen] = useState<boolean>(false)
  const [toastSuccessOpen, setToastSuccessOpen] = useState<boolean>(false)
  const [toastInfoOpen, setToastInfoOpen] = useState<boolean>(false)
  const [toastMessage, setToastMessage] = useState<string>('');
  const apiUrl = '/admin/users';

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
    if (status === 'authenticated') {
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

  const handleSaveNewRecord = async (record) => {
    try {
      setToastMessage('Saving new record...');
      setToastInfoOpen(true);
      await addRecord(axiosAuth, Object.values(record), apiUrl);
      await fetchData();
      setNewRecord(null);
      setToastInfoOpen(false);
      setToastMessage('Record added successfully.');
      setToastSuccessOpen(true);
    } catch (error) {
      console.error('Error adding record:', error);
      setToastMessage('Error adding record.');
      setToastInfoOpen(false);
      setToastErrorOpen(true);
    }
  };

  const handleDownload = () => {
    const ws = XLSX.utils.json_to_sheet(records);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'givers');

    // Generate Excel file and trigger download
    XLSX.writeFile(wb, 'givers.xlsx');
  };


  const handleUpdateRecord = async (index, updatedRecord) => {
    index = index + 1;
    try {
      setToastMessage('Updating record...');
      setToastInfoOpen(true);
      await updateRecord(axiosAuth, index, updatedRecord, apiUrl);
      await fetchData();
      setToastInfoOpen(false);
      setToastMessage('Record updated successfully.');
      setToastSuccessOpen(true);
    } catch (error) {
      console.error('Error updating record:', error);
      setToastMessage('Error updating record.');
      setToastInfoOpen(false);
      setToastErrorOpen(true);
    }
  };

  const handleDeleteRecord = async (index) => {
    index = index + 1;
    try {
      setToastMessage('Deleting record...');
      setToastInfoOpen(true);
      await deleteRecord(axiosAuth, index,  apiUrl);
      await fetchData();
      setToastInfoOpen(false);
      setToastMessage('Record deleted successfully.');
      setToastSuccessOpen(true);
    } catch (error) {
      console.error('Error deleting record:', error);
      setToastMessage('Error deleting record.');
      setToastInfoOpen(false);
      setToastErrorOpen(true);
    }
  };

  

  if (status === 'loading') return <p>Loading...</p>;

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      <div className="fixed bottom-0 right-0 z-50 p-4">
        <Toast type="warning" open={toastWarningOpen} setOpen={setToastWarningOpen} duration={5000}>
          {toastMessage}
        </Toast>

        <Toast type="success" open={toastSuccessOpen} setOpen={setToastSuccessOpen} duration={5000}>
          {toastMessage}
        </Toast>

        <Toast type="error" open={toastErrorOpen} setOpen={setToastErrorOpen} duration={5000}>
          {toastMessage}
        </Toast>

        <Toast type="info" open={toastInfoOpen} setOpen={setToastInfoOpen} duration={5000}>
          {toastMessage}
        </Toast>  
      </div>
      {/* Page header */}
      <div className="sm:flex sm:justify-between sm:items-center mb-5">
        {/* Left: Title */}
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Members</h1>
        </div>
        {/* Right: Actions */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          {/* Search form */}
          {/* Create invoice button */}
          <button className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white" onClick={handleAddRecord}>
            <svg className="fill-current shrink-0 xs:hidden" width="16" height="16" viewBox="0 0 16 16">
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
          <ul className="flex flex-wrap -m-1">
            {/* Left-side actions */}
          </ul>
        </div>
        {/* Right side */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          {/* Delete button */}
          <DeleteButton />
          {/* Dropdown */}
          <SearchForm placeholder="Search" />

        </div>
      </div>

      {/* Table */}
      <InvoicesTable invoices={records} newRecord={newRecord} onSaveNewRecord={handleSaveNewRecord} onUpdateRecord={handleUpdateRecord} onDeleteRecord={handleDeleteRecord} setNewRecordToNull={() => setNewRecord(null)} />

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
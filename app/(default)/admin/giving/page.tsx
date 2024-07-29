"use client"

import { SelectedItemsProvider } from '@/app/selected-items-context'
import SearchForm from '@/components/search-form'
import DeleteButton from '@/components/delete-button'
import DateSelect from '@/components/date-select'
import FilterButton from '@/components/dropdown-filter'
import InvoicesTable from './invoices-table'
import PaginationClassic from '@/components/pagination-classic'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

import { fetchRecords, addRecord, updateRecord, deleteRecord } from '@/lib/hooks/useGoogleSheet';
import useAxiosAuth from '@/lib/hooks/useAxiosAuth';

function GivingContent() {
  const { data: session, status } = useSession();
  const axiosAuth = useAxiosAuth();
  const [records, setRecords] = useState<any[]>([]);
  const [newRecord, setNewRecord] = useState(null);

  const fetchData = async () => {
    try {
      const data = await fetchRecords(axiosAuth);
      const formattedRecords = data.map((record) => ({
        crmStatus: record[0],
        amount: record[1],
        wallet: record[2],
        fullName: record[3],
        date: record[4],
        category: record[5],
        memo: record[6],
        nameInWallet: record[7],
      }));
      setRecords(formattedRecords);
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      fetchData();
    }
  }, [status, axiosAuth]);

  const handleAddRecord = () => {
    setNewRecord({
      crmStatus: "",
      amount: "",
      wallet: "",
      fullName: "",
      date: "",
      category: "",
      memo: "",
      nameInWallet: ""
    });
  };

  const handleSaveNewRecord = async (record) => {
    try {
       await addRecord(axiosAuth, Object.values(record));
      await fetchData();
      setNewRecord(null);
    } catch (error) {
      console.error('Error adding record:', error);
    }
  };

  const handleUpdateRecord = async (index, updatedRecord) => {
    index = index + 1;
    try {
      const updated = await updateRecord(axiosAuth, index, updatedRecord);
      setRecords(records.map((rec, i) => (i === index ? updated : rec)));
      await fetchData();
    } catch (error) {
      console.error('Error updating record:', error);
    }
  };

  const handleDeleteRecord = async (index) => {
    index = index + 1;
    try {
      await deleteRecord(axiosAuth, index);
      await fetchData();
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  if (status === 'loading') return <p>Loading...</p>;

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      {/* Page header */}
      <div className="sm:flex sm:justify-between sm:items-center mb-5">
        {/* Left: Title */}
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Giving</h1>
        </div>
        {/* Right: Actions */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          {/* Search form */}
          <SearchForm placeholder="Search by invoice ID…" />
          {/* Create invoice button */}
          <button className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white" onClick={handleAddRecord}>
            <svg className="fill-current shrink-0 xs:hidden" width="16" height="16" viewBox="0 0 16 16">
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
          <ul className="flex flex-wrap -m-1">
            <li className="m-1">
              <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-transparent shadow-sm bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-800 transition">All <span className="ml-1 text-gray-400 dark:text-gray-500">{records.length}</span></button>
            </li>
            <li className="m-1">
              <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 transition">Paid <span className="ml-1 text-gray-400 dark:text-gray-500">14</span></button>
            </li>
            <li className="m-1">
              <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 transition">Due <span className="ml-1 text-gray-400 dark:text-gray-500">34</span></button>
            </li>
            <li className="m-1">
              <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 transition">Overdue <span className="ml-1 text-gray-400 dark:text-gray-500">19</span></button>
            </li>
          </ul>
        </div>
        {/* Right side */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          {/* Delete button */}
          <DeleteButton />
          {/* Dropdown */}
          <DateSelect />
          {/* Filter button */}
          <FilterButton align="right" />
        </div>
      </div>

      {/* Table */}
      <InvoicesTable invoices={records} newRecord={newRecord} onSaveNewRecord={handleSaveNewRecord} onUpdateRecord={handleUpdateRecord} onDeleteRecord={handleDeleteRecord} />

      {/* Pagination */}
      <div className="mt-8">
        <PaginationClassic />
      </div>
    </div>
  )
}

export default function Invoices() {
  return (
    <SelectedItemsProvider>
      <GivingContent />
    </SelectedItemsProvider>
  )
}

'use client'

import { useItemSelection } from '@/components/utils/use-item-selection'
import InvoicesTableItem from './invoices-table-item'
import NewInvoiceRow from './new-invoice-row'
import { useSession } from 'next-auth/react';

export interface Giver {
  id?: number;
  nameInWallet: string;
  crmName: string;
  group: string;
  subGroup: string;
  wallet: string;
  fellowship: string;
  softrRecordID: string;
}

interface InvoicesTableProps {
  invoices: Giver[];
  newRecord: Giver | null;
  onSaveNewRecord: (record: Giver) => void;
  onUpdateRecord: (index: number, updatedRecord: Giver) => void;
  onDeleteRecord: (index: number) => void;
  setNewRecordToNull: () => void;
}

export default function InvoicesTable({ invoices, newRecord, onSaveNewRecord, onUpdateRecord, onDeleteRecord, setNewRecordToNull }: InvoicesTableProps) {
  const {
    selectedItems,
    isAllSelected,
    handleCheckboxChange,
    handleSelectAllChange,
  } = useItemSelection(invoices);
  const { data: session, status } = useSession();

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl relative">
      <header className="px-5 py-4">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Total givers<span className="text-gray-400 dark:text-gray-500 font-medium"> {invoices.length-1}</span></h2>
      </header>
      <div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-gray-300">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 border-t border-b border-gray-100 dark:border-gray-700/60">
              <tr>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                  <div className="flex items-center">
                    <label className="inline-flex">
                      <span className="sr-only">Select all</span>
                      <input className="form-checkbox" type="checkbox" onChange={handleSelectAllChange} checked={isAllSelected} />
                    </label>
                  </div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Wallet Name</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">CRM Name</div>
                </th>
                { session && !session.user.churchInfo?.church.hasCrm && <><th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Group</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">sub Group</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Wallet</div>
                </th></>}
   
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Actions</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60" key="heghiwudhfuhdis">
              {newRecord && (
                <NewInvoiceRow
                  key="new"
                  record={newRecord}
                  onSave={onSaveNewRecord}
                  onCancel={() => setNewRecordToNull()}
                />
              )}
              {invoices.slice(1).map((invoice, index) => (
                <InvoicesTableItem
                  key={index + 1}
                  index={index + 1}
                  invoice={invoice}
                  onCheckboxChange={handleCheckboxChange}
                  isSelected={selectedItems.includes(invoice.id ?? index + 1)}
                  onUpdateRecord={onUpdateRecord}
                  onDeleteRecord={onDeleteRecord}
                  isEditing={false} // Add the isEditing property with a default value
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
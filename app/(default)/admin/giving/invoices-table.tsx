'use client'

import { useItemSelection } from '@/components/utils/use-item-selection'
import InvoicesTableItem from './invoices-table-item'
import NewInvoiceRow from './new-invoice-row'

export interface Invoice {
  id: number;
  crmStatus: string;
  amount: string;
  wallet: string;
  fullName: string;
  date: string;
  category: string;
  memo: string;
  nameInWallet: string;
}

interface InvoicesTableProps {
  invoices: Invoice[];
  newRecord: Invoice | null;
  onSaveNewRecord: (record: Invoice) => void;
  onUpdateRecord: (index: number, updatedRecord: Invoice) => void;
  onDeleteRecord: (index: number) => void;
}

export default function InvoicesTable({ invoices, newRecord, onSaveNewRecord, onUpdateRecord, onDeleteRecord }: InvoicesTableProps) {
  const {
    selectedItems,
    isAllSelected,
    handleCheckboxChange,
    handleSelectAllChange,
  } = useItemSelection(invoices);

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl relative">
      <header className="px-5 py-4">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Transactions <span className="text-gray-400 dark:text-gray-500 font-medium">{invoices.length}</span></h2>
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
                  <div className="font-semibold text-left">CRM Status</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Amount</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Wallet</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Fullname in CRM</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Date</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Category</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Memo</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Name in wallet</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Actions</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
              {newRecord && (
                <NewInvoiceRow
                  record={newRecord}
                  onSave={onSaveNewRecord}
                  onCancel={() => setNewRecord(null)}
                />
              )}
              {invoices.slice(1).map((invoice, index) => (
                <InvoicesTableItem
                  key={invoice.id}
                  index={index + 1}
                  invoice={invoice}
                  onCheckboxChange={handleCheckboxChange}
                  isSelected={selectedItems.includes(invoice.id)}
                  onUpdateRecord={onUpdateRecord}
                  onDeleteRecord={onDeleteRecord}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
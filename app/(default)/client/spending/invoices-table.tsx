"use client";

import { useItemSelection } from "@/components/utils/use-item-selection";
import InvoicesTableItem from "./invoices-table-item";
import NewInvoiceRow from "./new-invoice-row";
import { useEffect } from "react";

export interface Record {
  id?: number;
  date: string;
  budget: string;
  expense: string;
  amount: string;
  vendor: string;
}

interface InvoicesTableProps {
  invoices: Record[];
  newRecord: Record | null;
  sortConfig: { key: string; direction: string } | null;
  onSaveNewRecord: (record: Record) => void;
  onUpdateRecord: (index: number, updatedRecord: Record) => void;
  onDeleteRecord: (index: number) => void;
  onHandleSort: (key: string) => void;
  setNewRecordToNull: () => void;
  setSelectedItems: (items: number[]) => void; // Add this line
}

export default function InvoicesTable({
  invoices,
  newRecord,
  onSaveNewRecord,
  onUpdateRecord,
  onDeleteRecord,
  setNewRecordToNull,
  onHandleSort,
  sortConfig,
  setSelectedItems, // Add this line
}: InvoicesTableProps) {
  const {
    selectedItems,
    isAllSelected,
    handleCheckboxChange,
    handleSelectAllChange,
  } = useItemSelection(invoices);

  const totalAmount = invoices
    .filter((_, index) => selectedItems.includes(index))
    .reduce((sum, record) => {
      const amount = record.amount
        ? parseFloat(record.amount.replace(/[^0-9.-]+/g, ""))
        : 0;
      return sum + (isNaN(amount) ? 0 : amount);
    }, 0);

    useEffect(() => {
      setSelectedItems(selectedItems);
    }, [selectedItems, setSelectedItems]);

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl relative">
      <header className="px-5 py-4">
        {selectedItems.length > 0 && <h2 className="font-semibold text-gray-800 dark:text-gray-100">
          Total amount {" "}
          <span className="text-gray-400 dark:text-gray-500 font-medium">
            ${totalAmount.toLocaleString()}
          </span>
        </h2>}
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
                      <input
                        className="form-checkbox"
                        type="checkbox"
                        onChange={handleSelectAllChange}
                        checked={isAllSelected}
                      />
                    </label>
                  </div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap cursor-pointer  text-left">
                  <div
                    className="font-semibold text-left inline-flex items-start"
                    onClick={() => onHandleSort("date")}
                  >
                    Date
                    <svg
                      className={`sort-icon ${
                        sortConfig?.key === "date"
                          ? sortConfig.direction === "asc"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3.204 5h9.592L8 10.204 3.204 5z" />
                    </svg>
                  </div>
                </th>
                
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap cursor-pointer  text-left">
                  <div
                    className="font-semibold text-left inline-flex items-start"
                    onClick={() => onHandleSort("budget")}
                  >
                    Budget
                    <svg
                      className={`sort-icon ${
                        sortConfig?.key === "budget"
                          ? sortConfig.direction === "asc"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3.204 5h9.592L8 10.204 3.204 5z" />
                    </svg>
                  </div>
                </th>

                
                
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap cursor-pointer  text-left">
                  <div
                    className="font-semibold text-left inline-flex items-start"
                    onClick={() => onHandleSort("expense")}
                  >
                    Expense
                    <svg
                      className={`sort-icon ${
                        sortConfig?.key === "expense"
                          ? sortConfig.direction === "asc"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3.204 5h9.592L8 10.204 3.204 5z" />
                    </svg>
                  </div>
                </th>

                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap cursor-pointer  text-left">
                  <div
                    className="font-semibold text-left inline-flex items-start"
                    onClick={() => onHandleSort("amount")}
                  >
                    Amount
                    <svg
                      className={`sort-icon ${
                        sortConfig?.key === "amount"
                          ? sortConfig.direction === "asc"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3.204 5h9.592L8 10.204 3.204 5z" />
                    </svg>
                  </div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap cursor-pointer  text-left">
                  <div
                    className="font-semibold text-left inline-flex items-start"
                    onClick={() => onHandleSort("vendor")}
                  >
                    Vendor
                    <svg
                      className={`sort-icon ${
                        sortConfig?.key === "vendor"
                          ? sortConfig.direction === "asc"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3.204 5h9.592L8 10.204 3.204 5z" />
                    </svg>
                  </div>
                </th>
                
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Actions</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody
              className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60"
              key="heghiwudhfuhdis"
            >
              {newRecord && (
                <NewInvoiceRow
                  key="New"
                  record={newRecord}
                  onSave={onSaveNewRecord}
                  onCancel={() => setNewRecordToNull()}
                />
              )}
              {invoices.slice(1).map((invoice, index) => (
                <InvoicesTableItem
                  key={invoice.id}
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
  );
}

"use client";

import { useItemSelection } from "@/components/utils/use-item-selection";
import InvoicesTableItem from "./invoices-table-item";
import NewInvoiceRow from "./new-invoice-row";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export interface Record {
  id?: number;
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
  const { data: session, status } = useSession();

  const totalAmount = invoices
    .filter((record:Record, index) => selectedItems.includes(record.id?? index))
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
        {selectedItems.length > 0 && (
          <h2 className="font-semibold text-gray-800 dark:text-gray-100">
            Total amount{" "}
            <span className="text-gray-400 dark:text-gray-500 font-medium">
              ${totalAmount.toLocaleString()}
            </span>
          </h2>
        )}
      </header>
      <div>
        {/* Table */}
        {/* <div className="table-container"> */}
        <div className=" overflow-x-auto">
          <table className="table-auto w-full dark:text-gray-300">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 border-t border-b border-gray-100 dark:border-gray-700/60">
              <tr>
                <th className="px-6 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
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
                {session && session.user.churchInfo?.church.hasCrm && (
                  <th className="px-6 first:pl-5 last:pr-5 py-3 whitespace-nowrap cursor-pointer  text-left">
                    <div
                      className="font-semibold text-left inline-flex items-start text-sm normal-case"
                      onClick={() => onHandleSort("crmStatus")}
                    >
                      CRM Status
                      <svg
                        className={`sort-icon mt-1 ${sortConfig?.key === "crmStatus"
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
                  </th>)}
                <th className="px-6 first:pl-5 last:pr-5 py-3 whitespace-nowrap cursor-pointer  text-left">
                  <div
                    className="font-semibold text-left inline-flex items-start text-sm normal-case"
                    onClick={() => onHandleSort("amount")}
                  >
                    Amount
                    <svg
                      className={`sort-icon mt-1 ${
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
                <th className="px-6 first:pl-5 last:pr-5 py-3 whitespace-nowrap cursor-pointer  text-left">
                  <div
                    className="font-semibold text-left inline-flex items-start text-sm normal-case"
                    onClick={() => onHandleSort("wallet")}
                  >
                    Wallet
                    <svg
                      className={`sort-icon mt-1 ${
                        sortConfig?.key === "wallet"
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
                <th className="px-6 first:pl-5 last:pr-5 py-3 whitespace-nowrap cursor-pointer  text-left">
                  <div
                    className="font-semibold text-left inline-flex items-start text-sm normal-case"
                    onClick={() => onHandleSort("fullName")}
                  >
                    Fullname in CRM
                    <svg
                      className={`sort-icon mt-1 ${
                        sortConfig?.key === "fullName"
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
                <th className="px-6 first:pl-5 last:pr-5 py-3 whitespace-nowrap cursor-pointer  text-left">
                  <div
                    className="font-semibold text-left inline-flex items-start text-sm normal-case"
                    onClick={() => onHandleSort("date")}
                  >
                    Date
                    <svg
                      className={`sort-icon mt-1 ${
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
                <th className="px-6 first:pl-5 last:pr-5 py-3 whitespace-nowrap cursor-pointer  text-left">
                  <div
                    className="font-semibold text-left inline-flex items-start text-sm normal-case"
                    onClick={() => onHandleSort("category")}
                  >
                    Category
                    <svg
                      className={`sort-icon mt-1 ${
                        sortConfig?.key === "category"
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
                <th className="px-6 first:pl-5 last:pr-5 py-3 whitespace-nowrap cursor-pointer  text-left">
                  <div
                    className="font-semibold text-left inline-flex items-start text-sm normal-case"
                    onClick={() => onHandleSort("memo")}
                  >
                    Memo
                    <svg
                      className={`sort-icon mt-1 ${
                        sortConfig?.key === "memo"
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
                {/* <th className="px-6 first:pl-5 last:pr-5 py-3 whitespace-nowrap cursor-pointer  text-left">
                  <div
                    className="font-semibold text-left inline-flex items-start text-sm normal-case"
                    onClick={() => onHandleSort("nameInWallet")}
                  >
                    Name in wallet
                    <svg
                      className={`sort-icon mt-1 ${
                        sortConfig?.key === "nameInWallet"
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
                </th> */}
                <th className="px-6 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left text-sm normal-case">Actions</div>
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
                  key="new"
                  record={newRecord}
                  onSave={onSaveNewRecord}
                  onCancel={() => setNewRecordToNull()}
                />
              )}
              {invoices.slice(1).map((invoice, index) => (
                <InvoicesTableItem
                  key={invoice.id}
                  index={invoice.id ?? index + 1}
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

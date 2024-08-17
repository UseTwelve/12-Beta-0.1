// churches-table.tsx
"use client";

import { useItemSelection } from "@/components/utils/use-item-selection";
import InvoicesTableItem from "./invoices-table-item";

export interface Record {
  id: number;
  name: string;
  logo: string;
  physicalAddress: string;
  googleSheetLink: string;
  spreadsheetId: string;
  hasCrm: boolean;
  chmsName: string;
  active: string;
  createdAt: string;
  updatedAt: string;
}

interface InvoicesTableProps {
  churches: Record[];
  sortConfig: { key: string; direction: string } | null;
  onDeleteRecord: (index: number) => void;
  onHandleSort: (key: string) => void;
}

export default function ChurchesTable({
  churches,
  onDeleteRecord,
  onHandleSort,
  sortConfig,
}: InvoicesTableProps) {
  const {
    selectedItems,
    isAllSelected,
    handleCheckboxChange,
    handleSelectAllChange,
  } = useItemSelection(churches);

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl relative">
      <header className="px-5 py-4">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">
          Churches{" "}
          <span className="text-gray-400 dark:text-gray-500 font-medium">
            {churches.length}
          </span>
        </h2>
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
                    onClick={() => onHandleSort("name")}
                  >
                    Church Name
                    <svg
                      className={`sort-icon ${
                        sortConfig?.key === "name"
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
                    onClick={() => onHandleSort("chmsName")}
                  >
                    ChMs Name
                    <svg
                      className={`sort-icon ${
                        sortConfig?.key === "chmsName"
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
                    onClick={() => onHandleSort("physicalAddress")}
                  >
                    Physical address
                    <svg
                      className={`sort-icon ${
                        sortConfig?.key === "physicalAddress"
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
                    onClick={() => onHandleSort("hasCrm")}
                  >
                   CRM
                    <svg
                      className={`sort-icon ${
                        sortConfig?.key === "hasCrm"
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
                  <div className="font-semibold text-left" >Actions</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody
              className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60"
              key="heghiwudhfuhdis"
            >
              {churches.map((church) => (
                <InvoicesTableItem
                  key={church.id}
                  index={church.id}
                  church={church}
                  onCheckboxChange={handleCheckboxChange}
                  isSelected={selectedItems.includes(church.id)}
                  onDeleteRecord={onDeleteRecord}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

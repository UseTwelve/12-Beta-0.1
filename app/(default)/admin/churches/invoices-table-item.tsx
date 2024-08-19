import { useState } from "react";
import { Record } from "./invoices-table";
import { InvoicesProperties } from "./invoices-properties";
import Image from "next/image";
import { useFlyoutContext } from "@/app/flyout-context";
import { useChurchDetail } from "./transaction-context";

interface InvoicesTableItemProps {
  church: Record;
  onCheckboxChange: (id: number, checked: boolean) => void;
  isSelected: boolean;
  onDeleteRecord: (index: number) => void;
  index: number;
}

export default function InvoicesTableItem({
  church,
  onCheckboxChange,
  isSelected,
  onDeleteRecord,
  index,
}: InvoicesTableItemProps) {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheckboxChange(church.id, e.target.checked);
  };
  const { setFlyoutOpen } = useFlyoutContext()

  const { setChurch } = useChurchDetail()

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {    
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    setFlyoutOpen(true)
    setChurch(church)
  }
  

  const { totalColor, statusColor, typeIcon } = InvoicesProperties();

  return (
    <tr >
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        <div className="flex items-center">
          <label className="inline-flex">
            <span className="sr-only">Select</span>
            <input
              className="form-checkbox"
              type="checkbox"
              onChange={handleCheckboxChange}
              checked={isSelected}
            />
          </label>
        </div>
      </td>

      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap md:w-1/2">
        <div className="flex items-center">
          <div className="w-9 h-9 shrink-0 mr-2 sm:mr-3">
            <span tabIndex={-1}>
              {church.logo && <Image
                className="rounded-full"
                src={church.logo}
                width={36}
                height={36}
                alt={church.name}
              />}
            </span>
          </div>
          <div className="font-medium text-gray-800 dark:text-gray-100">
            <span>{church.name}</span>
          </div>
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="font-medium text-gray-800 dark:text-gray-100">
          {church.chmsName}
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="font-medium text-gray-800 dark:text-gray-100">
          {church.physicalAddress}
        </div>
      </td>

      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="font-medium text-gray-800 dark:text-gray-100">
          {church.hasCrm ? "Yes" : "No"}
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        <div className="space-x-1 flex">
          <button
            className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 rounded-full"
            onClick={(e) => handleEdit(e)}
          >
            <span className="sr-only">Edit</span>
            <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
              <path d="M19.7 8.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM12.6 22H10v-2.6l6-6 2.6 2.6-6 6zm7.4-7.4L17.4 12l1.6-1.6 2.6 2.6-1.6 1.6z" />
            </svg>
          </button>
          {/* <button
            className="text-red-500 hover:text-red-600 rounded-full"
            onClick={() => onDeleteRecord(church.id)}
          >
            <span className="sr-only">Delete</span>
            <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
              <path d="M13 15h2v6h-2zM17 15h2v6h-2z" />
              <path d="M20 9c0-.6-.4-1-1-1h-6c-.6 0-1 .4-1 1v2H8v2h1v10c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V13h1v-2h-4V9zm-6 1h4v1h-4v-1zm7 3v9H11v-9h10z" />
            </svg>
          </button> */}
          <a
            href={church.googleSheetLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn border-[#028511] dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-[#028511] dark:text-gray-300"
          >
            <svg
              className="fill-current shrink-0 xs:hidden"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
            </svg>
            <span className="max-xs:sr-only">Google sheet -&gt;</span>
          </a>
        </div>
      </td>
    </tr>
  );
}

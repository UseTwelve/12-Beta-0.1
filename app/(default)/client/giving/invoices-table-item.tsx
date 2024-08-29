import { useEffect, useState } from "react";
import { Record } from "./invoices-table";
import { InvoicesProperties } from "./invoices-properties";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import FullNameDropdown from "@/components/dropdown-giver";
import CategoryDropdown from "@/components/dropdown-category-full";
import { useSession } from "next-auth/react";

interface InvoicesTableItemProps {
  invoice: Record;
  onCheckboxChange: (id: number, checked: boolean) => void;
  isSelected: boolean;
  onUpdateRecord: (index: number, updatedRecord: any) => void;
  onDeleteRecord: (index: number) => void;
  index: number;
  isEditing: boolean;
}

export interface Giver {
  id: number;
  nameInWallet: string;
  crmName: string;
  group: string;
  subGroup: string;
  wallet: string;
  fellowship: string;
  softrRecordID: string;
}

export default function InvoicesTableItem({
  invoice,
  onCheckboxChange,
  isSelected,
  onUpdateRecord,
  onDeleteRecord,
  index,
  isEditing,
}: InvoicesTableItemProps) {
  const [isEditingState, setIsEditingState] = useState(isEditing);
  const [editValues, setEditValues] = useState(invoice);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const axiosAuth = useAxiosAuth();
  const { data: session, status } = useSession();
  const categories = [
    {
      id: 1,
      name: "Tithe",
    },
    {
      id: 2,
      name: "Offering",
    },
    {
      id: 3,
      name: "Orphanage",
    },
  ];


  function convertToYMD(dateString: string) {
    const [month, day, year] = dateString.split('/');
    const paddedMonth = month.padStart(2, '0');
    const paddedDay = day.padStart(2, '0');
    console.log(`${year}-${paddedMonth}-${paddedDay}`);
    return `${year}-${paddedMonth}-${paddedDay}`;
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheckboxChange(invoice.id ?? index, e.target.checked);
  };

  const handleChange = (e: any) => {
    setEditValues({
      ...editValues,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!editValues.amount) {
      newErrors.amount = "Amount is required.";
    }

    if (!editValues.wallet) {
      newErrors.wallet = "Wallet is required.";
    }

    if (!editValues.fullName) {
      newErrors.fullName = "Full name is required.";
    }

    if (!editValues.date) {
      newErrors.date = "Date is required.";
    }

    if (!editValues.category) {
      newErrors.category = "Category is required.";
    }

    if (!editValues.memo) {
      newErrors.memo = "Memo is required.";
    }

    setErrors(newErrors);

    setTimeout(() => {
      setErrors({});
    }, 5000);

    return Object.keys(newErrors).length === 0;
  };


  const handleSave = () => {
    if (validate()) {
      onUpdateRecord(index, editValues);
      setIsEditingState(false);
    }
  };

  const handleCancel = () => {
    setEditValues(invoice);
    setIsEditingState(false);
  };

  const handleEdit = () => {
    setIsEditingState(true);
  };

  const handleCategoryChange = (selectedCategory: number | null) => {
    const selectedCategoryName =
      categories.find((category) => category.id === selectedCategory)?.name ||
      "";
    setEditValues({
      ...editValues,
      category: selectedCategoryName,
    });
  };

  const { totalColor, statusColor, typeIcon } = InvoicesProperties();

  return (
    <tr>
      <td className="px-6 first:pl-5 last:pr-5 py-2 whitespace-nowrap w-px">
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
      {isEditingState ? (
        <>
          {session && session.user.churchInfo?.church.hasCrm && (
            <td className="px-6 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
              {editValues.crmStatus === "Successful" ||
                editValues.crmStatus === "Uploaded" ||
                editValues.crmStatus === "Failed" ? (
                <input
                  type="text"
                  name="crmStatus"
                  value={editValues.crmStatus}
                  onChange={handleChange}
                  className="form-input"
                  disabled
                />
              ) : (
                <select
                  name="crmStatus"
                  value={editValues.crmStatus}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="New">New</option>
                  <option value="Pending">Pending</option>
                </select>
              )}
            </td>)}
          <td className="px-6 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
            <input
              type="text"
              name="amount"
              value={editValues.amount}
              onChange={handleChange}
              className="form-input"
            />
            {errors.amount && (
              <div className="text-red-500 text-xs mt-1">{errors.amount}</div>
            )}
          </td>
          <td className="px-6 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
          <input
              type="text"
              name="wallet"
              value={editValues.wallet}
              className="form-input"
              disabled
            />
            {errors.wallet && (
              <div className="text-red-500 text-xs mt-1">{errors.wallet}</div>
            )}
          </td>
          <td className="px-6 first:pl-5 last:pr-5 py-2 whitespace-nowrap relative">
            <div className="relative">
              <FullNameDropdown
                value={editValues.fullName}
                onChange={(selectedOption) => {
                  setEditValues({
                    ...editValues,
                    fullName: selectedOption,
                  });
                }}
              />
              {errors.fullName && (
                <div className="text-red-500 text-xs mt-1">
                  {errors.fullName}
                </div>
              )}
            </div>
          </td>

          <td className="px-6 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
            <input
              type="date"
              name="date"
              value={convertToYMD(editValues.date)}
              className="form-input"
              disabled
            />
            {errors.date && (
              <div className="text-red-500 text-xs mt-1">{errors.date}</div>
            )}
          </td>
          <td className="px-6 first:pl-5 last:pr-5 py-2 whitespace-nowrap relative">
            <CategoryDropdown
              value={editValues.category}
              onChange={(selectedOption) => {
                setEditValues({
                  ...editValues,
                  category: selectedOption,
                });
              }}
            />
            {errors.category && (
              <div className="text-red-500 text-xs mt-1">
                {errors.category}
              </div>
            )}
          </td>

          <td className="px-6 first:pl-5 last:pr-5 py-2 pr-32 whitespace-nowrap">
            <input
              type="text"
              name="memo"
              value={editValues.memo}
              className="form-input"
              disabled
            />
            {errors.memo && (
              <div className="text-red-500 text-xs mt-1">
                {errors.memo}
              </div>
            )}
          </td>
          {/* <td className="px-6 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
            <input
              type="text"
              name="nameInWallet"
              value={editValues.nameInWallet}
              className="form-input"
              disabled
            />
            {errors.nameInWallet && (
              <div className="text-red-500 text-xs mt-1">
                {errors.nameInWallet}
              </div>
            )}
          </td> */}
          <td className="px-6 first:pl-5 last:pr-5 py-3  whitespace-nowrap absolute right-0 bg-white dark:bg-gray-900/20 border-t border-b border-gray-100 dark:border-gray-700/60">
            <div className="space-x-1">
              <button
                className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 rounded-full"
                onClick={handleSave}
              >
                <span className="sr-only">Save</span>
                <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                  <path d="M16 3c-7.2 0-13 5.8-13 13s5.8 13 13 13 13-5.8 13-13S23.2 3 16 3zM23 16l-7 7-7-7 1.4-1.4 4.6 4.6V8h2v11.2l4.6-4.6L23 16z" />
                </svg>
              </button>
              <button
                className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 rounded-full"
                onClick={handleCancel}
              >
                <span className="sr-only">Cancel</span>
                <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                  <path d="M16 3c-7.2 0-13 5.8-13 13s5.8 13 13 13 13-5.8 13-13S23.2 3 16 3zM20.7 20.7l-1.4 1.4-4.3-4.3-4.3 4.3-1.4-1.4 4.3-4.3-4.3-4.3 1.4-1.4 4.3 4.3 4.3-4.3 1.4 1.4-4.3 4.3 4.3 4.3z" />
                </svg>
              </button>
            </div>
          </td>
        </>
      ) : (
          <>
            {session && session.user.churchInfo?.church.hasCrm && (
              <td className="px-6 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
                <div
                  className={`inline-flex font-medium rounded-full text-center px-2.5 py-0.5 ${statusColor(
                    invoice.crmStatus
                  )}`}
                >
                  {invoice.crmStatus}
                </div>
              </td>
            )}
          <td className="px-6 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
            <div className="font-medium text-gray-800 dark:text-gray-100">
              ${invoice.amount}
            </div>
          </td>
          <td className="px-6 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
            <div className={`font-medium ${totalColor(invoice.wallet)}`}>
              {invoice.wallet}
            </div>
          </td>
          <td className="px-6 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
            <div className="font-medium text-gray-800 dark:text-gray-100">
              {invoice.fullName}
            </div>
          </td>
          <td className="px-6 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
            <div className="font-medium text-gray-800 dark:text-gray-100">
              {invoice.date}
            </div>
          </td>

          <td className="px-6 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
            <div className="font-medium text-gray-800 dark:text-gray-100">
              {invoice.category}
            </div>
          </td>
          <td className="px-6 first:pl-5 last:pr-5 py-2 pr-32 whitespace-nowrap">
            <div className="font-medium text-gray-800 dark:text-gray-100">
              {invoice.memo}
            </div>
          </td>
          {/* <td className="px-6 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
            <div className="font-medium text-gray-800 dark:text-gray-100">
              {invoice.nameInWallet}
            </div>
          </td> */}
          <td className="first:pl-3 last:pr-3  mt-[-1px] whitespace-nowrap absolute right-0 bg-white dark:bg-gray-900/20 border-t border-b border-gray-100 dark:border-gray-700/60">
            <div className="space-x-1">
              <button
                className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 rounded-full"
                onClick={handleEdit}
              >
                <span className="sr-only">Edit</span>
                <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                  <path d="M19.7 8.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM12.6 22H10v-2.6l6-6 2.6 2.6-6 6zm7.4-7.4L17.4 12l1.6-1.6 2.6 2.6-1.6 1.6z" />
                </svg>
              </button>
              <button
                className="text-red-500 hover:text-red-600 rounded-full"
                onClick={() => onDeleteRecord(index)}
              >
                <span className="sr-only">Delete</span>
                <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                  <path d="M13 15h2v6h-2zM17 15h2v6h-2z" />
                  <path d="M20 9c0-.6-.4-1-1-1h-6c-.6 0-1 .4-1 1v2H8v2h1v10c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V13h1v-2h-4V9zm-6 1h4v1h-4v-1zm7 3v9H11v-9h10z" />
                </svg>
              </button>
            </div>
          </td>
        </>
      )}
    </tr>
  );
}

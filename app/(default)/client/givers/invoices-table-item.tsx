import { useState } from "react";
import { Invoice } from "./invoices-table";
import { InvoicesProperties } from "./invoices-properties";

interface InvoicesTableItemProps {
  invoice: Invoice;
  onCheckboxChange: (id: number, checked: boolean) => void;
  isSelected: boolean;
  onUpdateRecord: (index: number, updatedRecord: any) => void;
  onDeleteRecord: (index: number) => void;
  index: number;
  isEditing: boolean;
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

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheckboxChange(invoice.id, e.target.checked);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValues({
      ...editValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    onUpdateRecord(index, editValues);
    setIsEditingState(false);
  };

  const handleCancel = () => {
    setEditValues(invoice);
    setIsEditingState(false);
  };

  const handleEdit = () => {
    setIsEditingState(true);
  };

  const { totalColor, statusColor, typeIcon } = InvoicesProperties();

  return (
    <tr>
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
      {isEditingState ? (
        <>
          <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
            <input
              type="text"
              name="nameInWallet"
              value={editValues.nameInWallet}
              onChange={handleChange}
              className="form-input"
            />
          </td>
          <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
            <input
              type="text"
              name="crmName"
              value={editValues.crmName}
              onChange={handleChange}
              className="form-input"
            />
          </td>
          <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
            <input
              type="text"
              name="group"
              value={editValues.group}
              onChange={handleChange}
              className="form-input"
            />
          </td>
          <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
            <input
              type="text"
              name="subGroup"
              value={editValues.subGroup}
              onChange={handleChange}
              className="form-input"
            />
          </td>
          <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
            <input
              type="text"
              name="wallet"
              value={editValues.wallet}
              onChange={handleChange}
              className="form-input"
            />
          </td>
          <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
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
          <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
            <div className="font-medium text-gray-800 dark:text-gray-100">
              {invoice.nameInWallet}
            </div>
          </td>
          {/* <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
            <div
              className={`inline-flex font-medium rounded-full text-center px-2.5 py-0.5 ${statusColor(
                invoice.crmStatus
              )}`}
            >
              {invoice.crmStatus}
            </div>
          </td> */}
          <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
            <div className="font-medium text-gray-800 dark:text-gray-100">
              {invoice.crmName}
            </div>
          </td>
          <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
            <div className="font-medium text-gray-800 dark:text-gray-100">
              {invoice.group}
            </div>
          </td>
          <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
            <div className="font-medium text-gray-800 dark:text-gray-100">
              {invoice.subGroup}
            </div>
          </td>
          <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
            <div className={`font-medium ${totalColor(invoice.wallet)}`}>
              {invoice.wallet}
            </div>
          </td>

          
          <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
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

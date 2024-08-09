import CategoryDropdown from "@/components/dropdown-category-full";
import FullNameDropdown from "@/components/dropdown-giver";
import { useState } from "react";

interface NewInvoiceRowProps {
  record: any;
  onSave: (record: any) => void;
  onCancel: () => void;
}

export default function NewInvoiceRow({
  record,
  onSave,
  onCancel,
}: NewInvoiceRowProps) {
  const [newRecord, setNewRecord] = useState(record);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewRecord({
      ...newRecord,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    onSave(newRecord);
  };

  return (
    <tr>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px"></td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <input
          type="text"
          name="crmStatus"
          value={newRecord.crmStatus}
          onChange={handleChange}
          className="form-input"
          disabled
        />
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <input
          type="text"
          name="amount"
          value={newRecord.amount}
          onChange={handleChange}
          className="form-input"
        />
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <input
          type="text"
          name="wallet"
          value={newRecord.wallet}
          onChange={handleChange}
          className="form-input"
        />
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <FullNameDropdown
          value={newRecord.fullName}
          onChange={(selectedOption) => {
            setNewRecord({
              ...newRecord,
              fullName: selectedOption,
            });
          }}
        />
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <input
          type="date"
          name="date"
          value={newRecord.date}
          onChange={handleChange}
          className="form-input"
        />
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <CategoryDropdown
          value={newRecord.category}
          onChange={(selectedOption) => {
            setNewRecord({
              ...newRecord,
              category: selectedOption,
            });
          }}
        />
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <input
          type="text"
          name="memo"
          value={newRecord.memo}
          onChange={handleChange}
          className="form-input"
        />
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <input
          type="text"
          name="nameInWallet"
          value={newRecord.nameInWallet}
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
            onClick={onCancel}
          >
            <span className="sr-only">Cancel</span>
            <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
              <path d="M16 3c-7.2 0-13 5.8-13 13s5.8 13 13 13 13-5.8 13-13S23.2 3 16 3zM20.7 20.7l-1.4 1.4-4.3-4.3-4.3 4.3-1.4-1.4 4.3-4.3-4.3-4.3 1.4-1.4 4.3 4.3 4.3-4.3 1.4 1.4-4.3 4.3 4.3 4.3z" />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
}

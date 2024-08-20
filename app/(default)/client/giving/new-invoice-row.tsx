import { useState } from "react";
import CategoryDropdown from "@/components/dropdown-category-full";
import FullNameDropdown from "@/components/dropdown-giver";

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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: any) => {
    setNewRecord({
      ...newRecord,
      [e.target.name]: e.target.value,
    });
  };


  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!newRecord.amount) {
      newErrors.amount = "Amount is required.";
    }

    if (!newRecord.wallet) {
      newErrors.wallet = "Wallet is required.";
    }

    if (!newRecord.fullName) {
      newErrors.fullName = "Full name is required.";
    }

    if (!newRecord.date) {
      newErrors.date = "Date is required.";
    }

    if (!newRecord.category) {
      newErrors.category = "Category is required.";
    }
    if (!newRecord.memo) {
      newErrors.memo = "Memo is required.";
    }

    if (!newRecord.nameInWallet) {
      newErrors.nameInWallet = "Name in wallet is required.";
    }

    setErrors(newErrors);

    setTimeout(() => {
      setErrors({});
    }, 5000); 

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      onSave(newRecord);
    }
  };

  return (
    <tr>
      <td className="px-6 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px"></td>
      <td className="px-6 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <input
          type="text"
          name="crmStatus"
          value={newRecord.crmStatus}
          onChange={handleChange}
          className="form-input"
          disabled
        />
      </td>
      <td className="px-6 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <input
          type="text"
          name="amount"
          value={newRecord.amount}
          onChange={handleChange}
          className="form-input"
        />
        {errors.amount && (
          <div className="text-red-500 text-xs mt-1">{errors.amount}</div>
        )}
      </td>
      <td className="px-6 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <select
          name="wallet"
          value={newRecord.wallet}
          onChange={handleChange}
          className="form-select"
        >
          <option value=""></option>
          <option value="Cash App">Cash App</option>
          <option value="PayPal">PayPal</option>
          <option value="Apple Pay">Apple Pay</option>
          <option value="KingPay">KingPay</option>
          <option value="Zelle">Zelle</option>
          <option value="Stock">Stock</option>
          <option value="DonorPerfect">DonorPerfect</option>
          <option value="Cash">Cash</option>
          <option value="Check">Check</option>
        </select>
        {errors.wallet && (
          <div className="text-red-500 text-xs mt-1">{errors.wallet}</div>
        )}
      </td>
      <td className="px-6 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <FullNameDropdown
          value={newRecord.fullName}
          onChange={(selectedOption) => {
            setNewRecord({
              ...newRecord,
              fullName: selectedOption,
            });
          }}
        />
        {errors.fullName && (
          <div className="text-red-500 text-xs mt-1">{errors.fullName}</div>
        )}
      </td>
       <td className="px-6 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <input
          type="date"
          name="date"
          value={newRecord.date}  
          onChange={handleChange}
          className="form-input"
        />
        {errors.date && (
          <div className="text-red-500 text-xs mt-1">{errors.date}</div>
        )}
      </td>
      <td className="px-6 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <CategoryDropdown
          value={newRecord.category}
          onChange={(selectedOption) => {
            setNewRecord({
              ...newRecord,
              category: selectedOption,
            });
          }}
        />
        {errors.category && (
          <div className="text-red-500 text-xs mt-1">{errors.category}</div>
        )}
      </td>
      <td className="px-6 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <input
          type="text"
          name="memo"
          value={newRecord.memo}
          onChange={handleChange}
          className="form-input"
        />
        {errors.memo && (
          <div className="text-red-500 text-xs mt-1">{errors.memo}</div>
        )}
      </td>
      <td className="px-6 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <input
          type="text"
          name="nameInWallet"
          value={newRecord.nameInWallet}
          onChange={handleChange}
          className="form-input"
        />
        {errors.nameInWallet && (
          <div className="text-red-500 text-xs mt-1">{errors.nameInWallet}</div>
        )}
      </td>
      <td className="px-6 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
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

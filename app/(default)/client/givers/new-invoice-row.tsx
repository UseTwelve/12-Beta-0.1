import CategoryDropdown from "@/components/dropdown-category-full";
import FellowshipDropdown from "@/components/dropdown-fellowship";
import GroupDropdown from "@/components/dropdown-group";
import { useSession } from "next-auth/react";
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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { data: session, status } = useSession();

  const handleChange = (e: any) => {
    setNewRecord({
      ...newRecord,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!newRecord.nameInWallet) {
      newErrors.nameInWallet = "Name in wallet is required.";
    }

    if (!newRecord.crmName) {
      newErrors.crmName = "CRM name is required.";
    }

    if (session && !session.user.churchInfo?.church.hasCrm) {
      // if (!newRecord.group) {
      //   newErrors.group = "Group is required.";
      // }
      if (!newRecord.subGroup) {
        newErrors.subGroup = "Group is required.";
      }
      // if (!newRecord.wallet) {
      //   newErrors.wallet = "Wallet is required.";
      // }
      // if (!newRecord.fellowship) {
      //   newErrors.fellowship = "Fellowship is required.";
      // }
    }

    setErrors(newErrors);

    // Clear errors after 5 seconds
    setTimeout(() => {
      setErrors({});
    }, 5000); // 300000 milliseconds = 5 seconds

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      onSave(newRecord);
    }
  };

  return (
    <tr>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px"></td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <input
          type="text"
          name="nameInWallet"
          value={newRecord.nameInWallet}
          onChange={handleChange}
          className="form-input"
        />
        {errors.nameInWallet && (
          <div className="text-red-500 text-xs mt-1">
            {errors.nameInWallet}
          </div>
        )}
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <input
          type="text"
          name="crmName"
          value={newRecord.crmName}
          onChange={handleChange}
          className="form-input"
        />
        {errors.crmName && (
          <div className="text-red-500 text-xs mt-1">
            {errors.crmName}
          </div>
        )}
      </td>

      {session && !session.user.churchInfo?.church.hasCrm && (
        <>
          {/* <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
            <select
              name="group"
              value={newRecord.group}
              onChange={handleChange}
              className="form-select"
            >
              <option value=""></option>
              <option value="Group 1">Group 1</option>
              <option value="Group 2">Group 2</option>
            </select>
            {errors.group && (
              <div className="text-red-500 text-xs mt-1">
                {errors.group}
              </div>
            )}
          </td> */}
          <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
            <GroupDropdown
              value={newRecord.subGroup}
              onChange={(selectedOption) => {
                setNewRecord({
                  ...newRecord,
                  subGroup: selectedOption,
                });
              }}
            />
            {errors.subGroup && (
              <div className="text-red-500 text-xs mt-1">
                {errors.subGroup}
              </div>
            )}
          </td>
          <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
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
            </select>
            {errors.wallet && (
              <div className="text-red-500 text-xs mt-1">
                {errors.wallet}
              </div>
            )}
          </td>
          <td className="px-2 first:pl-5 last:pr-5 py-3 pr-32 whitespace-nowrap">
            <FellowshipDropdown
              value={newRecord.fellowship}
              onChange={(selectedOption) => {
                setNewRecord({
                  ...newRecord,
                  fellowship: selectedOption,
                });
              }}
            />
            {errors.fellowship && (
              <div className="text-red-500 text-xs mt-1">
                {errors.fellowship}
              </div>
            )}
          </td>
        </>
      )}
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
import { useState } from "react";
import { Giver } from "./invoices-table";
import { InvoicesProperties } from "./invoices-properties";
import { useSession } from "next-auth/react";
import FellowshipDropdown from "@/components/dropdown-fellowship";
import GroupDropdown from "@/components/dropdown-group";

interface InvoicesTableItemProps {
  invoice: Giver;
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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { data: session, status } = useSession();
  const { totalColor, statusColor, typeIcon } = InvoicesProperties();

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!editValues.crmName) {
      newErrors.crmName = "CRM name is required.";
    }

    if (session && !session.user.churchInfo?.church.hasCrm) {
      if (!editValues.subGroup) {
        newErrors.subGroup = "Subgroup is required.";
      }
    }

    setErrors(newErrors);

    // Clear errors after 5 sec
    setTimeout(() => {
      setErrors({});
    }, 5000); // 300000 milliseconds = 5 sec

    return Object.keys(newErrors).length === 0;
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheckboxChange(invoice.id ?? index + 1, e.target.checked);
  };

  const handleChange = (e: any) => {
    setEditValues({
      ...editValues,
      [e.target.name]: e.target.value,
    });
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

  return (
    <tr>
      <td className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap w-px">
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
          <td className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
            <input
              type="text"
              name="nameInWallet"
              value={editValues.nameInWallet}
              onChange={handleChange}
              className="form-input"
            />
            {errors.nameInWallet && (
              <div className="text-red-500 text-xs mt-1">
                {errors.nameInWallet}
              </div>
            )}
          </td>
          <td className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
            <input
              type="text"
              name="crmName"
              value={editValues.crmName}
              onChange={handleChange}
              className="form-input"
            />
            {errors.crmName && (
              <div className="text-red-500 text-xs mt-1">{errors.crmName}</div>
            )}
          </td>
          {session && !session.user.churchInfo?.church.hasCrm && (
            <>
              {/* <td className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
                <select
                  name="group"
                  value={editValues.group}
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
              <td className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
                <GroupDropdown
              value={editValues.subGroup}
              onChange={(selectedOption) => {
                setEditValues({
                  ...editValues,
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
              <td className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
                <select
                  name="wallet"
                  value={editValues.wallet}
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
              <td className="px-2 first:pl-5 last:pr-5 py-2 pr-32 whitespace-nowrap">
                <FellowshipDropdown
                  value={editValues.fellowship}
                  onChange={(selectedOption) => {
                    setEditValues({
                      ...editValues,
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
          <td className="first:pl-5 last:pr-5 py-2  whitespace-nowrap absolute right-0 bg-white dark:bg-gray-900/20 border-t border-b border-gray-100 dark:border-gray-700/60">
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
          <td className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
            <div className="font-medium text-gray-800 dark:text-gray-100">
              {invoice.nameInWallet}
            </div>
          </td>

          <td className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
            <div className="font-medium text-gray-800 dark:text-gray-100">
              {invoice.crmName}
            </div>
          </td>
          {session && !session.user.churchInfo?.church.hasCrm && (
            <>
              {/* <td className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
                <div className="font-medium text-gray-800 dark:text-gray-100">
                  {invoice.group}
                </div>
              </td> */}
              <td className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
                <div className="font-medium text-gray-800 dark:text-gray-100">
                  {invoice.subGroup}
                </div>
              </td>
              <td className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
                <div className={`font-medium ${totalColor(invoice.wallet)}`}>
                  {invoice.wallet}
                </div>
              </td>
              <td className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
                <div className="font-medium text-gray-800 dark:text-gray-100">
                  {invoice.fellowship}
                </div>
              </td>
            </>
          )}

          <td className="first:pl-3 last:pr-3  mt-[-1px] whitespace-nowrap absolute right-0 bg-white dark:bg-[#1f2937] border-t border-b border-gray-100 dark:border-gray-700/60">
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

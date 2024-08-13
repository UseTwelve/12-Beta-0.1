import CategoryDropdown from "@/components/dropdown-category-full";
import FullNameDropdown from "@/components/dropdown-giver";
import { useState } from "react";
import { Record } from "./invoices-table";

interface NewInvoiceRowProps {
  record: Record;
  onSave: (record: any) => void;
  onCancel: () => void;
}

export default function NewInvoiceRow({
  record,
  onSave,
  onCancel,
}: NewInvoiceRowProps) {
  const [newRecord, setNewRecord] = useState(record);

  const handleChange = (e: any) => {
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
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
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
            <select
              name="budget"
              value={newRecord.budget}
              onChange={handleChange}
              className="form-select"
            >
              <option value=""></option>
              <option value="Payroll">Payroll</option>
              <option value="Facilities">Facilities</option>
              <option value="Operations">Operations</option>
              <option value="Fundraising">Fundraising</option>
              <option value="Software">Software</option>
              <option value="Insurance">Insurance</option>
            </select>
          </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
            <select
              name="expense"
              value={newRecord.expense}
              onChange={handleChange}
              className="form-select"
            >
              <option value=""></option>
              <option value="Salary">Salary</option>
              <option value="Benefits">Benefits</option>
              <option value="Overtime">Overtime</option>
              <option value="Rent">Rent</option>
              <option value="Utility">Utility</option>
              <option value="Property Maintenance">Property Maintenance</option>
              <option value="Property Supplies">Property Supplies</option>
              <option value="Program Development">Program Development</option>
              <option value="Direct ProgramServices">Direct ProgramServices</option>
              <option value="Materials">Materials</option>
              <option value="Contracted Services">Contracted Services</option>
              <option value="Travel">Travel</option>
              <option value="Marketing">Marketing</option>
              <option value="Legal Fees">Legal Fees</option>
              <option value="CRM Tool">CRM Tool</option>
              <option value="Financial Management Software">Financial Management Software</option>
              <option value="General Liability">General Liability</option>
              <option value="Property Insurance">Property Insurance</option>
            </select>
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
          name="vendor"
          value={newRecord.vendor}
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

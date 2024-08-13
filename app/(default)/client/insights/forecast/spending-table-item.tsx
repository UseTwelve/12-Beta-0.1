import { Spending } from './spending-table';

interface SpendingTableItemProps {
  spending: Spending;
  onCheckboxChange: (id: number, checked: boolean) => void;
  isSelected: boolean;
}

export default function SpendingTableItem({ spending, onCheckboxChange, isSelected }: SpendingTableItemProps) {

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheckboxChange(spending.id, e.target.checked);
  };

  return (
    <tr>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        <div className="flex items-center">
          <label className="inline-flex">
            <span className="sr-only">Select</span>
            <input className="form-checkbox" type="checkbox" onChange={handleCheckboxChange} checked={isSelected} />
          </label>
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div>{spending.date}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div>{spending.budget}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div>{spending.expense}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div>{`$${spending.amount.toLocaleString()}`}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div>{spending.vendor}</div>
      </td>
    </tr>
  );
}

import { Giving } from './giving-table';

interface GivingTableItemProps {
  giving: Giving;
  onCheckboxChange: (id: number, checked: boolean) => void;
  isSelected: boolean;
}

export default function GivingTableItem({ giving, onCheckboxChange, isSelected }: GivingTableItemProps) {

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheckboxChange(giving.id, e.target.checked);
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
        <div>{giving.date}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div>{giving.goal}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div>{`$${giving.amount.toLocaleString()}`}</div>
      </td>
    </tr>
  );
}

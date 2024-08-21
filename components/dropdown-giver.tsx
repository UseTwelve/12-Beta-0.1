import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchRecords } from "@/lib/hooks/useGoogleSheet";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";

interface FullNameDropdownProps {
  onChange: (value: string) => void;
  value: string;
}

export interface Giver {
  id?: number;
  nameInWallet: string;
  crmName: string;
  group: string;
  subGroup: string;
  wallet: string;
  fellowship: string;
  softrRecordID: string;
}

const FullNameDropdown: React.FC<FullNameDropdownProps> = ({
  onChange,
  value,
}) => {
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const axiosAuth = useAxiosAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchGivers = async () => {
      setLoading(true);
      try {
        const response = await fetchRecords(axiosAuth, "/client/givers");
        const formattedRecords = response.values
          .slice(1)
          .reduce((uniqueRecords: any[], record: any) => {
            const crmName = record[1];

            // Check if crmName is already in the uniqueRecords
            if (!uniqueRecords.some((rec) => rec.crmName === crmName)) {
              uniqueRecords.push({
                nameInWallet: record[0],
                crmName: crmName,
                group: record[2],
                subGroup: record[3],
                wallet: record[4],
              });
            }

            return uniqueRecords;
          }, []);

        // Sort the givers by crmName alphabetically
        const sortedRecords = formattedRecords
          .map((giver: Giver) => giver.crmName)
          .sort((a: string, b: any) => a.localeCompare(b));

        setOptions(sortedRecords);
      } catch (error) {
        console.error("Error fetching givers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGivers();
  }, []);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    if (selectedValue === "add_name") {
      router.push("/client/givers");
    } else {
      onChange(selectedValue);
    }
  };

  return (
    <div className="relative w-full">
      {loading ? (
        <div className="flex justify-center items-center py-2">
          Loading...
        </div>
      ) : (
        <select
          value={value}
          onChange={handleSelectChange}
            className="form-select block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            style={{ minWidth: '200px' }}
        >
          <option value="" disabled>
            Match name
          </option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
          <option value="add_name" className="text-indigo-600 font-semibold">
            Add New Name
          </option>
        </select>
      )}
    </div>
  );
};

export default FullNameDropdown;

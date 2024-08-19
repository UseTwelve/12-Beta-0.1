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
  const [focused, setFocused] = useState(false);
  const axiosAuth = useAxiosAuth();
  const router = useRouter();

  useEffect(() => {
    if (focused) {
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

          setOptions(formattedRecords.map((giver: Giver) => giver.crmName));
        } catch (error) {
          console.error("Error fetching givers:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchGivers();
    }
  }, [focused]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleSelect = (option: string) => {
    if (option === "add_name") {
      router.push("/client/givers");
    } else {
      onChange(option);
    }
  };

  return (
    <div className="relative w-full">
      {" "}
      {/* Make the container relative */}
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="form-input block w-64 pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
        placeholder="Match name"
      />
      {focused && (
        <div className="absolute z-50 mt-1 w-full max-h-[240px] bg-white border border-gray-300 rounded-md shadow-lg overflow-y-scroll">
          {loading ? (
            <div className="flex justify-center items-center py-2">
              Loading...
            </div>
          ) : (
            <>
              {options
                .filter(
                  (option) =>
                    typeof option === "string" &&
                    option.toLowerCase().includes(value.toLowerCase())
                )
                .map((option, index) => (
                  <div
                    key={index}
                    onMouseDown={() => handleSelect(option)}
                    className="cursor-pointer px-4 py-2 hover:bg-indigo-100 transition duration-150 ease-in-out"
                  >
                    {option}
                  </div>
                ))}
              <div
                onMouseDown={() => handleSelect("add_name")}
                className="cursor-pointer px-4 py-2 hover:bg-indigo-100 text-indigo-600 font-semibold transition duration-150 ease-in-out"
              >
                Add New Name
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default FullNameDropdown;

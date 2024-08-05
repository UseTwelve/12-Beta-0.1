import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchRecords } from '@/lib/hooks/useGoogleSheet';
import useAxiosAuth from '@/lib/hooks/useAxiosAuth';

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

const FullNameDropdown: React.FC<FullNameDropdownProps> = ({ onChange, value }) => {
 const [options, setOptions] = useState<string[]>([]);
 const axiosAuth = useAxiosAuth();
  const router = useRouter();

  useEffect(() => {
   // Fetch givers from API
   const fetchGivers = async () => {
     try {
       const response = await fetchRecords(axiosAuth, '/client/givers');
       const formattedRecords = response.slice(1).map((record:any) => ({
         nameInWallet: record[0],
         crmName: record[1],
         group: record[2],
         subGroup: record[3],
         wallet: record[4],
       }));
      setOptions(formattedRecords.map((giver:Giver) => giver.nameInWallet));
     } catch (error) {
       console.error('Error fetching givers:', error);
     }
   }
   fetchGivers();
 }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleSelect = (option: string) => {
    if (option === 'add_name') {
      // Redirect to the givers page
      router.push('/client/givers');
    } else {
      onChange(option);
    }
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        className="form-select block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        placeholder="Match name"
      />
      <div className="absolute z-50 mt-1 w-fit max-h-[240px] bg-white border border-gray-300 rounded-md shadow-lg overflow-y-scroll">
        {options
          .filter(option => option.toLowerCase().includes(value.toLowerCase()))
          .map(option => (
            <div
              key={option}
              onClick={() => handleSelect(option)}
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
            >
              {option}
            </div>
          ))}
        <div
          onClick={() => handleSelect('add_name')}
          className="cursor-pointer px-4 py-2 hover:bg-gray-100 text-blue-500 font-semibold"
        >
          Add New Name
        </div>
      </div>
    </div>
  );
};

export default FullNameDropdown;

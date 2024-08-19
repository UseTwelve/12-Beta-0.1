import { useState, useEffect } from 'react';
import { fetchRecords } from '@/lib/hooks/useGoogleSheet';
import useAxiosAuth from '@/lib/hooks/useAxiosAuth';

interface CategoryDropdownProps {
  onChange: (value: string) => void;
  value: string;
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({ onChange, value }) => {
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);
  const axiosAuth = useAxiosAuth();

  useEffect(() => {
    if (focused) {
      const fetchCategories = async () => {
        setLoading(true);
        try {
          const response = await fetchRecords(axiosAuth, '/client/church/categories');
          const formattedRecords = response.values.slice(1).map((record: any) => ({
            category: record[0]
          }));
          setOptions(formattedRecords.map((data: {category:string}) => data.category));
        } catch (error) {
          console.error('Error fetching category:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchCategories();
    }
  }, [focused]);

  

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleSelect = (option: string) => {
      onChange(option);
  
  };

  return (
    <div className="relative w-full"> {/* Make the container relative */}
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="form-input block w-64 pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
        placeholder="Category"
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
                ).map((option, index) => (
                  <div
                    key={index}
                    onMouseDown={() => handleSelect(option)}
                    className="cursor-pointer px-4 py-2 hover:bg-indigo-100 transition duration-150 ease-in-out"
                  >
                    {option}
                  </div>
                ))}
              
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;

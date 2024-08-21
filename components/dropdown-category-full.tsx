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
  const axiosAuth = useAxiosAuth();

  useEffect(() => {
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
  }, []);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
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
            Select Category
          </option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default CategoryDropdown;

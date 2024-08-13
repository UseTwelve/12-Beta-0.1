"use client";

import { useState } from "react";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";

export default function DropdownProfile({
  onChange,
}: {
  onChange: (selected: string[]) => void;
}) {
  const categories = [
    "Facilities",
    "Fundraising",
    "Insurance",
    "Operations",
    "Payroll",
    "Software",
  ];

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categories
  );

  const handleCheckboxChange = (category: string) => {
    setSelectedCategories((prev) => {
      const newSelection = prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category];
      onChange(newSelection);
      return newSelection;
    });
  };

  return (
    <Popover className="relative inline-flex">
      <PopoverButton className="btn px-2.5 bg-white dark:bg-gray-800 border-gray-200 hover:border-gray-300 dark:border-gray-700/60 dark:hover:border-gray-600 text-gray-400 dark:text-gray-500">
        <svg
          className="fill-current mr-3"
          width="16"
          height="16"
          viewBox="0 0 16 16"
        >
          <path d="M0 3a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H1a1 1 0 0 1-1-1ZM3 8a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1ZM7 12a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2H7Z" />
        </svg>
        <span className="text-black dark:text-gray-200">Select Budget</span>
      </PopoverButton>
      <Transition
        as="div"
        className="origin-top-left z-10 absolute top-full right-0 left-auto min-w-[14rem] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 pt-1.5 rounded-lg shadow-lg overflow-hidden mt-1"
        enter="transition ease-out duration-200 transform"
        enterFrom="opacity-0 -translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <PopoverPanel>
          {({ close }) => (
            <>
              <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase pt-1.5 pb-2 px-3">
                Filters
              </div>
              <ul className="mb-4">
                {categories.map((category) => (
                  <li key={category} className="py-1 px-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCheckboxChange(category)}
                      />
                      <span className="text-sm font-medium ml-2">
                        {category}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
              <div className="py-2 px-3 border-t border-gray-200 dark:border-gray-700/60 bg-gray-50 dark:bg-gray-700/20">
                <ul className="flex items-center justify-between">
                  <li>
                    <button
                      className="btn-xs bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-red-500"
                      onClick={() => setSelectedCategories([])}
                    >
                      Clear
                    </button>
                  </li>
                </ul>
              </div>
            </>
          )}
        </PopoverPanel>
      </Transition>
    </Popover>
  );
}

"use client";
// export const metadata = {
//   title: 'Analytics - Mosaic',
//   description: 'Page description',
// }

import Datepicker from "@/components/datepicker";
import AnalyticsCard04 from "./analytics-card-04";
import AnalyticsCard05 from "./analytics-card-05";
import AnalyticsCard06 from "./analytics-card-06";
import AnalyticsCard07 from "./analytics-card-07";
import DropdownFilter from "@/components/dropdown-filter";
import DropdownFilterBudget from "@/components/dropdown-filter-budget";
import FintechCard01 from "./analytics-card-01";
import FintechCard02 from "./analytics-card-02";
import { useState } from "react";
import SpendingTable, { Spending } from "./spending-table";
import GivingTable, { Giving } from "./giving-table";
import { SelectedItemsProvider } from "@/app/selected-items-context";

export default function Analytics() {
  const [showSpendingTable, setShowSpendingTable] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([
    "Adoption Initiative",
    "Bible Distribution",
    "Food Program",
    "InnerCity Mentorship",
    "International Missions",
    "Offering",
    "Tithes",
  ]);
  const spendingData: Spending[] = [
    {
      id: 1,
      date: "August 2024",
      budget: "Facilities",
      expense: "Rent",
      amount: 2373,
      vendor: "Property Co.",
    },
    {
      id: 2,
      date: "April 2025",
      budget: "Facilities",
      expense: "Utility",
      amount: 678,
      vendor: "Utility Co.",
    },
    {
      id: 3,
      date: "February 2025",
      budget: "Facilities",
      expense: "Property Maintenance",
      amount: 170,
      vendor: "Property Management Co.",
    },
    {
      id: 4,
      date: "January 2025",
      budget: "Facilities",
      expense: "Property Supplies",
      amount: 170,
      vendor: "Property Management Co.",
    },
    {
      id: 5,
      date: "June 2025",
      budget: "Operations",
      expense: "Program Development",
      amount: 1220,
      vendor: "Research Co.",
    },
    {
      id: 6,
      date: "March 2025",
      budget: "Operations",
      expense: "Direct ProgramServices",
      amount: 7323,
      vendor: "Program Management Co.",
    },
    {
      id: 7,
      date: "May 2025",
      budget: "Operations",
      expense: "Materials",
      amount: 1953,
      vendor: "Supplies Co.",
    },
    {
      id: 8,
      date: "August 2024",
      budget: "Operations",
      expense: "Contracted Services",
      amount: 1709,
      vendor: "Program Management Co.",
    },
    {
      id: 9,
      date: "February 2025",
      budget: "Fundraising",
      expense: "Travel",
      amount: 1017,
      vendor: "Travel Co.",
    },
    {
      id: 10,
      date: "May 2025",
      budget: "Fundraising",
      expense: "Marketing",
      amount: 593,
      vendor: "Marketing Co.",
    },
    {
      id: 11,
      date: "August 2024",
      budget: "Fundraising",
      expense: "Legal Fees",
      amount: 85,
      vendor: "Legal Co.",
    },
    {
      id: 12,
      date: "April 2025",
      budget: "Software",
      expense: "CRM Tool",
      amount: 170,
      vendor: "Software Co.",
    },
    {
      id: 13,
      date: "February 2025",
      budget: "Software",
      expense: "Financial Management Software",
      amount: 170,
      vendor: "Software Co.",
    },
    {
      id: 14,
      date: "February 2025",
      budget: "Insurance",
      expense: "General Liability",
      amount: 203,
      vendor: "Insurance Co.",
    },
    {
      id: 15,
      date: "June 2025",
      budget: "Insurance",
      expense: "Property Insurance",
      amount: 814,
      vendor: "Insurance Co.",
    },
  ];

  const givingData: Giving[] = [
    {
      id: 1,
      date: "August 2024",
      goal: "International Missions",
      amount: 2610,
    },
    { id: 2, date: "April 2025", goal: "InnerCity Mentorship", amount: 746 },
    { id: 3, date: "February 2025", goal: "Bible Distribution", amount: 186 },
    { id: 4, date: "January 2025", goal: "Family Support", amount: 186 },
    { id: 5, date: "June 2025", goal: "Adoption Initiative", amount: 1343 },
    { id: 6, date: "March 2025", goal: "Food Program", amount: 8055 },
    { id: 7, date: "May 2025", goal: "Housing Assistance", amount: 2148 },
    {
      id: 8,
      date: "August 2024",
      goal: "International Missions",
      amount: 1880,
    },
    {
      id: 9,
      date: "February 2025",
      goal: "InnerCity Mentorship",
      amount: 1119,
    },
    { id: 10, date: "May 2025", goal: "Bible Distribution", amount: 653 },
    { id: 11, date: "August 2024", goal: "Family Support", amount: 93 },
    { id: 12, date: "April 2025", goal: "Adoption Initiative", amount: 186 },
    { id: 13, date: "February 2025", goal: "Food Program", amount: 186 },
    { id: 14, date: "February 2025", goal: "Housing Assistance", amount: 224 },
    { id: 15, date: "June 2025", goal: "International Missions", amount: 895 },
  ];

  return (
    <SelectedItemsProvider>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
        {/* Page header */}
        <div className="sm:flex sm:justify-between sm:items-center mb-8">
          {/* Left: Title */}
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
              Financial Forecast
            </h1>
          </div>

          {/* Right: Actions */}
          <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
            <Datepicker align="right" />
            <DropdownFilter onChange={setSelectedCategories} />
            <DropdownFilterBudget onChange={setSelectedCategories} />
          </div>
        </div>

        {/* Line chart */}
        <FintechCard02 />

        {/* Toggle Buttons */}


        {/* Conditional Rendering of Tables */} 
        <div className="flex flex-col gap-8 py-3 px-6 bg-gray-50 dark:bg-gray-900  my-4">
          <div className="flex justify-between">
            <h2>
              Giving and Spending Forecast
            </h2>
            <span>

          <button
            className={`px-4 py-2 font-semibold ${
              showSpendingTable
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
            } rounded-l-md`}
            onClick={() => setShowSpendingTable(true)}
          >
            Spending
          </button>
          <button
            className={`px-4 py-2 font-semibold ${
              !showSpendingTable
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
            } rounded-r-md`}
            onClick={() => setShowSpendingTable(false)}
            >
            Giving
          </button>
            </span>
        </div>
          {showSpendingTable ? (
            <SpendingTable spendings={spendingData} />
          ) : (
            <GivingTable givings={givingData} />
          )}
        </div>
      </div>
    </SelectedItemsProvider>
  );
}
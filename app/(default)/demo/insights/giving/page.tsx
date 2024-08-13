"use client"
// export const metadata = {
//   title: 'Analytics - Mosaic',
//   description: 'Page description',
// }

import Datepicker from '@/components/datepicker'
import AnalyticsCard04 from './analytics-card-04'
import AnalyticsCard05 from './analytics-card-05'
import AnalyticsCard06 from './analytics-card-06'
import AnalyticsCard07 from './analytics-card-07'
import DropdownFilter from "@/components/dropdown-filter";
import FintechCard01 from './fintech-card-01'
import { useState } from 'react'

export default function Analytics() {
  const [selectedCategories, setSelectedCategories] = useState([
    "Adoption Initiative",
    "Bible Distribution",
    "Food Program",
    "InnerCity Mentorship",
    "International Missions",
    "Offering",
    "Tithes",
  ]);
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">

      {/* Page header */}
      <div className="sm:flex sm:justify-between sm:items-center mb-8">

        {/* Left: Title */}
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Giving insights</h1>
        </div>

        {/* Right: Actions */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">

          {/* Datepicker built with flatpickr */}
          <Datepicker align="right" />
          <DropdownFilter onChange={setSelectedCategories} />

        </div>

      </div>

      {/* Cards */}
      <div className="grid grid-cols-12 gap-6">

        {/* Line chart (Analytics) */}
        <FintechCard01 selectedCategories={selectedCategories} />
        {/*  Line chart (Active Users Right Now) */}
        {/* Horizontal bar chart (Audience Overview) */}
        <AnalyticsCard04 selectedCategories={selectedCategories} />
        {/* Report card (Top Channels) */}
        <AnalyticsCard05 />
        {/* Report card (Top Pages) */}
        <AnalyticsCard06 />
        {/* Report card (Top Countries) */}
        <AnalyticsCard07 />

      </div>
    </div>
  )
}

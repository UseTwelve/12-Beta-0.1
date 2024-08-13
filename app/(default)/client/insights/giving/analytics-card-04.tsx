'use client'

import BarChart04 from '@/components/charts/bar-chart-04'
import { tailwindConfig } from '@/components/utils/utils'
import DropdownFilter from "@/components/dropdown-filter";
import { useState, useMemo } from 'react'

export default function AnalyticsCard04({ selectedCategories }: { selectedCategories: string[]}) {


  // Data from your sheet, adjusted for full dates
  const data: { [key: string]: { goals: number[]; actuals: number[] } } = {
    "International Missions": {
      goals: [40000, 60000, 60000],
      actuals: [45801, 65801, 25678],
    },
    "InnerCity Mentorship": {
      goals: [50000, 50000, 50000],
      actuals: [54679, 78888, 0],
    },
    "Bible Distribution": {
      goals: [50000, 70000, 70000],
      actuals: [45801, 60456, 48456],
    },
    "Tithes": {
      goals: [60000, 50000, 50000],
      actuals: [58888, 33456, 86426],
    },
    "Adoption Initative": {
      goals: [70000, 40000, 50000],
      actuals: [45801, 38901, 57890],
    },
    "Food Program": {
      goals: [30000, 70000, 80000],
      actuals: [23901, 64468, 41234],
    },
    "Offering": {
      goals: [35000, 50000, 50000],
      actuals: [28456, 74679, 49012],
    },
  }

  // Using useMemo to compute chart data only when selectedCategories changes
  const chartData = useMemo(() => {
    const aggregateData = selectedCategories.reduce(
      (acc, category) => {
        const categoryData = data[category];
        if (categoryData) {
          acc.goals = acc.goals.map((goal, index) => goal + categoryData.goals[index]);
          acc.actuals = acc.actuals.map((actual, index) => actual + categoryData.actuals[index]);
        }
        return acc;
      },
      { goals: [0, 0, 0], actuals: [0, 0, 0] }
    );

    return {
      labels: ['01-01-2022', '01-01-2023', '01-01-2024'],
      datasets: [
        {
          label: 'Goals',
          data: aggregateData.goals,
          backgroundColor: tailwindConfig.theme.colors.violet[500],
          hoverBackgroundColor: tailwindConfig.theme.colors.violet[600],
          categoryPercentage: 0.7,
          borderRadius: 4,
        },
        {
          label: 'Actual',
          data: aggregateData.actuals,
          backgroundColor: tailwindConfig.theme.colors.sky[500],
          hoverBackgroundColor: tailwindConfig.theme.colors.sky[600],
          categoryPercentage: 0.7,
          borderRadius: 4,
        },
      ],
    };
  }, [selectedCategories]);

  return (
    <div className="flex flex-col col-span-full bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex justify-between">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Goals vs Actual</h2>

      </header>
      <BarChart04 data={chartData} selected={selectedCategories} width={595} height={248} />
    </div>
  )
}

'use client'

import BarChart04 from '@/components/charts/bar-chart-04'
import { tailwindConfig } from '@/components/utils/utils'
import DropdownFilter from "@/components/dropdown-filter";
import { useState, useMemo } from 'react'

export default function AnalyticsCard04({ selectedCategories }: { selectedCategories: string[]}) {


  // Data from your sheet, adjusted for full dates
  const data: { [key: string]: { goals: number[]; actuals: number[] } } =  {
    "Payroll": {
      goals: [125595, 147683, 98934],
      actuals: [139550, 134258, 116393],
    },
    "Facilities": {
      goals: [18607, 31327, 24572],
      actuals: [31011, 29835, 25865],
    },
    "Operations": {
      goals: [100476, 118147, 79148],
      actuals: [111640, 107406, 93115],
    },
    "Fundraising": {
      goals: [11009, 15216, 12286],
      actuals: [15506, 14918, 12933],
    },
    "Software": {
      goals: [2791, 3103, 2224],
      actuals: [3101, 2984, 2587],
    },
    "Insurance": {
      goals: [9024, 7429, 9699],
      actuals: [9303, 8951, 7760],
    }
  };

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
          label: 'Budget',
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
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Budget vs Actual</h2>

      </header>
      <BarChart04 data={chartData} selected={selectedCategories} width={595} height={248} />
    </div>
  )
}

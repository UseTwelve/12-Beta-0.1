"use client";

import LineChart05 from "@/components/charts/line-chart-05";
import { chartAreaGradient } from "@/components/charts/chartjs-config";
import { tailwindConfig, hexToRGB } from "@/components/utils/utils";
import data from "./data";

export default function FintechCard01({ selectedCategories }: { selectedCategories: string[]}) {


  // Extract unique dates from the data
  const labels = [...new Set(data.map(item => item.date))] as string[];

  // Filter data based on selected categories
  const filteredData = data.filter(item =>
    selectedCategories.includes(item.category)
  );

  // Calculate the total amount for each date
  const totalAmounts = labels.map(label => {
    return filteredData
      .filter(item => item.date === label)
      .reduce((sum, item) => sum + item.amount, 0);
  });

  // Prepare chart data
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "",
        data: totalAmounts,
        borderColor: tailwindConfig.theme.colors.blue[500],
        backgroundColor: function (context: { chart: any }) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          const gradientOrColor = chartAreaGradient(ctx, chartArea, [
            {
              stop: 0,
              color: `rgba(${hexToRGB(tailwindConfig.theme.colors.blue[500])}, 0)`,
            },
            {
              stop: 1,
              color: `rgba(${hexToRGB(tailwindConfig.theme.colors.blue[500])}, 0.2)`,
            },
          ]);
          return gradientOrColor || "transparent";
        },
        fill: true,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig.theme.colors.blue[500],
        pointHoverBackgroundColor: tailwindConfig.theme.colors.blue[500],
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        clip: 20,
        tension: 0.2,
      },
    ],
  };

  // Calculate the total sum of amounts
  const totalSum = totalAmounts.reduce((a, b) => a + b, 0);

  return (
    <div className="flex flex-col col-span-full bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex justify-between">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">
          Giving{" "}
          <span className="text-gray-400 dark:text-gray-500 font-medium">
            ${totalSum.toLocaleString()}
          </span>
        </h2>
      </header>
      <LineChart05
        data={chartData}
        selectedCategories={selectedCategories}
        width={800}
        height={300}
      />
    </div>
  );
}

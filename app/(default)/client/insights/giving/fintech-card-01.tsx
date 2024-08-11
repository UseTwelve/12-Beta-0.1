"use client";

import LineChart05 from "@/components/charts/line-chart-05";
import { chartAreaGradient } from "@/components/charts/chartjs-config";
import { tailwindConfig, hexToRGB } from "@/components/utils/utils";
import { useState } from "react";
import DropdownFull from "@/components/dropdown-giving-insight";
import DropdownFilter from "@/components/dropdown-filter";

export default function FintechCard01() {
  const data = [
    {
      date: "01-01-2022",
      amount: 23456,
      category: "International Missions",
      wallet: "Stock",
    },
    {
      date: "02-01-2022",
      amount: 27890,
      category: "InnerCity Mentorship",
      wallet: "Zelle",
    },
    {
      date: "03-01-2022",
      amount: 21234,
      category: "Bible Distribution",
      wallet: "Apple Pay",
    },
    {
      date: "04-01-2022",
      amount: 29012,
      category: "Family Support",
      wallet: "DonorPerfect",
    },
    {
      date: "05-01-2022",
      amount: 25678,
      category: "Adoption Initative",
      wallet: "Zelle",
    },
    {
      date: "06-01-2022",
      amount: 23901,
      category: "Food Program",
      wallet: "PayPal",
    },
    {
      date: "07-01-2022",
      amount: 28456,
      category: "Housing Assistance",
      wallet: "Stock",
    },
    {
      date: "08-01-2022",
      amount: 22345,
      category: "International Missions",
      wallet: "Zelle",
    },
    {
      date: "09-01-2022",
      amount: 26789,
      category: "InnerCity Mentorship",
      wallet: "PayPal",
    },
    {
      date: "10-01-2022",
      amount: 24567,
      category: "Bible Distribution",
      wallet: "DonorPerfect",
    },
    {
      date: "11-01-2022",
      amount: 29876,
      category: "Family Support",
      wallet: "Stock",
    },
    {
      date: "12-01-2022",
      amount: 20123,
      category: "Adoption Initative",
      wallet: "PayPal",
    },
    {
      date: "01-01-2023",
      amount: 32456,
      category: "Food Program",
      wallet: "Stock",
    },
    {
      date: "02-01-2023",
      amount: 37890,
      category: "Housing Assistance",
      wallet: "Zelle",
    },
    {
      date: "03-01-2023",
      amount: 31234,
      category: "International Missions",
      wallet: "DonorPerfect",
    },
    {
      date: "04-01-2023",
      amount: 39012,
      category: "InnerCity Mentorship",
      wallet: "DonorPerfect",
    },
    {
      date: "05-01-2023",
      amount: 35678,
      category: "Bible Distribution",
      wallet: "Zelle",
    },
    {
      date: "06-01-2023",
      amount: 33456,
      category: "Family Support",
      wallet: "PayPal",
    },
    {
      date: "07-01-2023",
      amount: 38901,
      category: "Adoption Initative",
      wallet: "Stock",
    },
    {
      date: "08-01-2023",
      amount: 32012,
      category: "Food Program",
      wallet: "Zelle",
    },
    {
      date: "09-01-2023",
      amount: 36789,
      category: "Housing Assistance",
      wallet: "PayPal",
    },
    {
      date: "10-01-2023",
      amount: 34567,
      category: "International Missions",
      wallet: "DonorPerfect",
    },
    {
      date: "11-01-2023",
      amount: 39876,
      category: "InnerCity Mentorship",
      wallet: "Cash App",
    },
    {
      date: "12-01-2023",
      amount: 30123,
      category: "Bible Distribution",
      wallet: "PayPal",
    },
    {
      date: "01-01-2024",
      amount: 42345,
      category: "Family Support",
      wallet: "Stock",
    },
    {
      date: "02-01-2024",
      amount: 57890,
      category: "Adoption Initative",
      wallet: "Zelle",
    },
    {
      date: "03-01-2024",
      amount: 41234,
      category: "Food Program",
      wallet: "Apple Pay",
    },
    {
      date: "04-01-2024",
      amount: 49012,
      category: "Housing Assistance",
      wallet: "DonorPerfect",
    },
    {
      date: "05-01-2024",
      amount: 25678,
      category: "International Missions",
      wallet: "Stock",
    },
    {
      date: "06-01-2024",
      amount: 43901,
      category: "Family Support",
      wallet: "PayPal",
    },
    {
      date: "07-01-2024",
      amount: 48456,
      category: "Bible Distribution",
      wallet: "Zelle",
    },
  ];
  const [selectedCategories, setSelectedCategories] = useState([
    "International Missions",
    "InnerCity Mentorship",
    "Bible Distribution",
    "Family Support",
    "Adoption Initative",
    "Food Program",
    "Housing Assistance",
  ]);

  const labels = [...new Set(data.map(item => item.date))] as string[]; // --target es5

  const filteredData = data.filter(item => selectedCategories.includes(item.category));

  const totalAmounts = labels.map(label => {
    return filteredData
      .filter(item => item.date === label)
      .reduce((sum, item) => sum + item.amount, 0);
  });

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "",
        data: totalAmounts,
        borderColor: tailwindConfig.theme.colors.blue[500],
        backgroundColor: function(context: { chart: any; }) {
          const chart = context.chart;
          const {ctx, chartArea} = chart;
          const gradientOrColor = chartAreaGradient(ctx, chartArea, [
            { stop: 0, color: `rgba(${hexToRGB(tailwindConfig.theme.colors.blue[500])}, 0)` },
            { stop: 1, color: `rgba(${hexToRGB(tailwindConfig.theme.colors.blue[500])}, 0.2)` }
          ]);
          return gradientOrColor || 'transparent';
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

  const totalSum = totalAmounts.reduce((a, b) => a + b, 0);

  return (
    <div className="flex flex-col col-span-full  bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex justify-between">
          <DropdownFilter onChange={setSelectedCategories}  />
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">
          Total amount {" "}
          <span className="text-gray-400 dark:text-gray-500 font-medium">
            ${totalSum.toLocaleString()}
          </span>
        </h2>
        {/* <div className="w-80 flex">
          <DropdownFull selectedCategories={selectedCategories} onSelect={setSelectedCategories} />
        </div> */}
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <LineChart05 data={chartData} selectedCategories={selectedCategories} width={800} height={300} />
    </div>
  );
}
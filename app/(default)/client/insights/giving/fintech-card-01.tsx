"use client";

import LineChart05 from "@/components/charts/line-chart-05";
import { chartAreaGradient } from "@/components/charts/chartjs-config";
import { tailwindConfig, hexToRGB } from "@/components/utils/utils";

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

  const labels = data.map((item) => item.date);

  const categories = [
    "International Missions",
    "InnerCity Mentorship",
    "Bible Distribution",
    "Family Support",
    "Adoption Initative",
    "Food Program",
    "Housing Assistance",
  ];

  const colorPalette = [
    tailwindConfig.theme.colors.blue[500],
    tailwindConfig.theme.colors.green[500],
    tailwindConfig.theme.colors.red[500],
    tailwindConfig.theme.colors.purple[500],
    tailwindConfig.theme.colors.orange[500],
    tailwindConfig.theme.colors.yellow[500],
    tailwindConfig.theme.colors.teal[500],
  ];

  const amountsByCategory: { [key: string]: (number | null)[] } = categories.reduce((acc, category, index) => {
    acc[category] = labels.map((label) => {
      const item = data.find(
        (entry) => entry.date === label && entry.category === category
      );
      return item ? item.amount : null; // Return null if no data for that month
    });
    return acc;
  }, {} as { [key: string]: (number | null)[] });

  const chartData = {
    labels: labels,
    datasets: categories.map((category, index) => ({
      label: category,
      data: amountsByCategory[category],
      borderColor: colorPalette[index % colorPalette.length],
      fill: false,
      borderWidth: 2,
      pointRadius: 0,
      pointHoverRadius: 3,
      pointBackgroundColor: colorPalette[index % colorPalette.length],
      pointHoverBackgroundColor: colorPalette[index % colorPalette.length],
      pointBorderWidth: 0,
      pointHoverBorderWidth: 0,
      clip: 20,
      tension: 0.2,
      spanGaps: true, // Allow the line to continue even if there are nulls
    })),
  };

  return (
    <div className="flex flex-col col-span-full  bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex items-center">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">
          Giving
        </h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <LineChart05 data={chartData} width={800} height={300} />
    </div>
  );
}

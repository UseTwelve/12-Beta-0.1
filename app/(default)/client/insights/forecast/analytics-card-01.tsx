'use client'

import LineChart05 from '@/components/charts/line-chart-05'
import { chartAreaGradient } from '@/components/charts/chartjs-config'
import { tailwindConfig, hexToRGB } from '@/components/utils/utils'

export default function FintechCard01() {

  const chartData = {
    labels: [
      '08-01-2023', '09-01-2023', '10-01-2023', '11-01-2023', '12-01-2023',
      '01-01-2024', '02-01-2024', '03-01-2024', '04-01-2024', '05-01-2024',
      '06-01-2024', '07-01-2024', '08-01-2024', '09-01-2024', '10-01-2024',
      '11-01-2024', '12-01-2024', '01-01-2025', '02-01-2025', '03-01-2025',
      '04-01-2025', '05-01-2025', '06-01-2025', '07-01-2025'
    ],
    datasets: [
      {
        label: 'Giving History',
        data: [
          32012, 36789, 34567, 39876, 30123,
          42345, 57890, 41234, 49012, 25678,
          43901, 48456, null, null, null,
          null, null, null, null, null,
          null, null, null, null
        ],
        borderColor: tailwindConfig.theme.colors.violet[500],
        fill: true,
        backgroundColor: function(context: any) {
          const chart = context.chart;
          const {ctx, chartArea} = chart;
          const gradientOrColor = chartAreaGradient(ctx, chartArea, [
            { stop: 0, color: `rgba(${hexToRGB(tailwindConfig.theme.colors.violet[500])}, 0)` },
            { stop: 1, color: `rgba(${hexToRGB(tailwindConfig.theme.colors.violet[500])}, 0.2)` }
          ]);
          return gradientOrColor || 'transparent';
        },     
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig.theme.colors.violet[500],
        pointHoverBackgroundColor: tailwindConfig.theme.colors.violet[500],
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        clip: 20,
        tension: 0.2,
      },
      {
        label: 'Giving Forecast',
        data: [
          null, null, null, null, null,
          null, null, null, null, null,
          null, 48456, 49237, 51872, 46015,
          54398, 47562, 52741, 48903, 50124,
          45679, 53456, 46820, 52195
        ],
        borderColor: tailwindConfig.theme.colors.yellow[400],
        borderDash: [4, 4],
        fill: false,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig.theme.colors.yellow[400],
        pointHoverBackgroundColor: tailwindConfig.theme.colors.yellow[400],
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,        
        clip: 20,
        tension: 0.2,
      },
    ],
  }

  return(
    <div className="flex flex-col col-span-full bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex items-center">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Giving History vs Forecast</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <LineChart05 data={chartData} width={800} height={300} />
    </div>
  )
}

import Link from 'next/link'

export default function AnalyticsCard06() {
  return(
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Top Categories</h2>
      </header>
      <div className="grow p-3">
        <div className="flex flex-col h-full">
          {/* Card content */}
          <div className="grow">
            <ul className="flex justify-between text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold px-2 space-x-2">
              <li>Category</li>
              <li>Amount</li>
            </ul>

            <ul className="space-y-1 text-sm text-gray-800 dark:text-gray-100 mt-3 mb-4">
              {/* Item */}
              <li className="relative px-2 py-1">
                <div className="absolute inset-0 bg-green-50 dark:bg-green-400/20 rounded-r" aria-hidden="true" style={{ width: '82%' }}></div>
                <div className="relative flex justify-between space-x-2">
                  <div>International Missions</div>
                  <div className="font-medium">$281K</div>
                </div>
              </li>
              {/* Item */}
              <li className="relative px-2 py-1">
                <div className="absolute inset-0 bg-green-50 dark:bg-green-400/20 rounded-r" aria-hidden="true" style={{ width: '70%' }}></div>
                <div className="relative flex justify-between space-x-2">
                  <div>InnerCity Mentorship</div>
                  <div className="font-medium">$121K</div>
                </div>
              </li>
              {/* Item */}
              <li className="relative px-2 py-1">
                <div className="absolute inset-0 bg-green-50 dark:bg-green-400/20 rounded-r" aria-hidden="true" style={{ width: '60%' }}></div>
                <div className="relative flex justify-between space-x-2">
                  <div>Bible Distribution</div>
                  <div className="font-medium">$91K</div>
                </div>
              </li>
              {/* Item */}
              <li className="relative px-2 py-1">
                <div className="absolute inset-0 bg-green-50 dark:bg-green-400/20 rounded-r" aria-hidden="true" style={{ width: '44%' }}></div>
                <div className="relative flex justify-between space-x-2">
                  <div>Tithes</div>
                  <div className="font-medium">$90K</div>
                </div>
              </li>
              {/* Item */}
              <li className="relative px-2 py-1">
                <div className="absolute inset-0 bg-green-50 dark:bg-green-400/20 rounded-r" aria-hidden="true" style={{ width: '40%' }}></div>
                <div className="relative flex justify-between space-x-2">
                  <div>Adoption Initative</div>
                  <div className="font-medium">$71K</div>
                </div>
              </li>
              
            </ul>
          </div>
          
        </div>
      </div>
    </div>
  )
}

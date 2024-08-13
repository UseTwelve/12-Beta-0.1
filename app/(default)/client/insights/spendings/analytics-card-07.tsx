import Link from 'next/link'

// Helper function to format numbers with "K"
const formatWithK = (num: number) => {
  return `${(num / 1000).toFixed(0)}K`; // Divide by 1000 and append "K"
};

export default function AnalyticsCard06() {
  // List of vendors
  const vendors = [
    "Payroll Co.",
    "Property Management Co.",
    "Travel Co.",
    "Program Management Co.",
    "Supplies Co.",
  ];

  // Generate random amounts for each vendor
  const vendorData = vendors.map(vendor => ({
    vendor,
    amount: Math.floor(Math.random() * 100000) + 1000, // Random amount between 1000 and 100000
  }));

  // Sort vendors by amount, descending
  vendorData.sort((a, b) => b.amount - a.amount);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Top Vendors</h2>
      </header>
      <div className="grow p-3">
        <div className="flex flex-col h-full">
          {/* Card content */}
          <div className="grow">
            <ul className="flex justify-between text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold px-2 space-x-2">
              <li>Vendor</li>
              <li>Amount</li>
            </ul>

            <ul className="space-y-1 text-sm text-gray-800 dark:text-gray-100 mt-3 mb-4">
              {vendorData.map((vendor, index) => (
                <li key={index} className="relative px-2 py-1">
                  <div className={`absolute inset-0 bg-sky-100 dark:bg-sky-500/20 rounded-r`} aria-hidden="true" style={{ width: `${Math.floor((vendor.amount / vendorData[0].amount) * 100)}%` }}></div>
                  <div className="relative flex justify-between space-x-2">
                    <div>{vendor.vendor}</div>
                    <div className="font-medium">{formatWithK(vendor.amount)}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
        </div>
      </div>
    </div>
  )
}

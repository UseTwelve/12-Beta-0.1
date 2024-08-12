import Link from 'next/link'

// Function to generate a random number between two values
const generateRandomValue = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function AnalyticsCard06() {
  // List of expenses
  const expenses = [
    "Salary",
    "Benefits",
    "Overtime",
    "Rent",
    "Utility",
    "Property Maintenance",
    "Property Supplies",
    "Program Development",
    "Direct ProgramServices",
    "Materials",
    "Contracted Services",
    "Travel",
    "Marketing",
    "Legal Fees",
    "CRM Tool",
    "Financial Management Software",
    "General Liability",
    "Property Insurance",
  ];

  // Generate random values and percentage widths for each expense
  const expensesWithValues = expenses.map(expense => {
    const amount = generateRandomValue(50000, 300000); // Generating a random value between 50K and 300K
    const percentage = Math.floor((amount / 300000) * 100); // Calculate the percentage based on the max value
    return { expense, amount, percentage };
  });

  // Sort the expenses from highest to lowest by amount
  const sortedExpenses = expensesWithValues.sort((a, b) => b.amount - a.amount);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Top Expenses</h2>
      </header>
      <div className="grow p-3">
        <div className="flex flex-col h-full">
          {/* Card content */}
          <div className="grow">
            <ul className="flex justify-between text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold px-2 space-x-2">
              <li>Expense</li>
              <li>Amount</li>
            </ul>

            <ul className="space-y-1 text-sm text-gray-800 dark:text-gray-100 mt-3 mb-4">
              {sortedExpenses.map(({ expense, amount, percentage }) => (
                <li key={expense} className="relative px-2 py-1">
                  <div className="absolute inset-0 bg-green-50 dark:bg-green-400/20 rounded-r" aria-hidden="true" style={{ width: `${percentage}%` }}></div>
                  <div className="relative flex justify-between space-x-2">
                    <div>{expense}</div>
                    <div className="font-medium">${(amount / 1000).toFixed(0)}K</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/* Card footer */}
          <div className="text-center pt-4 pb-1 border-t border-gray-100 dark:border-gray-700/60">
            <Link className="text-sm font-medium text-violet-500 hover:text-violet-600 dark:hover:text-violet-400" href="#0">Categories Report -&gt;</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

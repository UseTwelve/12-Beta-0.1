export default function PaginationClassic({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  filteredAndSortedRecords,
}: {
  currentPage: number,
  totalPages: number,
  onPageChange: (page: number) => void,
  itemsPerPage: number,
  filteredAndSortedRecords: any[], // Replace 'any' with the actual type of 'filteredAndSortedRecords'
  }) {
 const filteredAndSortedRecordsLength = filteredAndSortedRecords.length -1;
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <nav
        className="mb-4 sm:mb-0 sm:order-1"
        role="navigation"
        aria-label="Navigation"
      >
        <ul className="flex justify-center">
          <li className="ml-3 first:ml-0">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`btn bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 text-gray-800 dark:text-gray-300 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-300 dark:hover:border-gray-600'}`}
            >
              &lt;- Previous
            </button>
          </li>
          <li className="ml-3 first:ml-0">
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`btn bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 text-gray-800 dark:text-gray-300 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-300 dark:hover:border-gray-600'}`}
            >
              Next -&gt;
            </button>
          </li>
        </ul>
      </nav>
      <div className="text-sm text-gray-500 text-center sm:text-left">
        Showing <span className="font-medium text-gray-600 dark:text-gray-300">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium text-gray-600 dark:text-gray-300">{Math.min(currentPage * itemsPerPage, filteredAndSortedRecordsLength)}</span> of <span className="font-medium text-gray-600 dark:text-gray-300">{filteredAndSortedRecordsLength}</span> results
      </div>
    </div>
  );
}

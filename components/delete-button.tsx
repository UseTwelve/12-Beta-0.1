'use client'

import { useEffect } from 'react'

export default function DeleteButton({ handleDeleteMultipleRecords, selectedItems }: { handleDeleteMultipleRecords: () => void, selectedItems: any[] }) {

  return (
    <div className={`${selectedItems?.length && selectedItems.length >= 1 ? ""  : 'hidden'}`}>
      <div className="flex items-center">
        <div className="hidden xl:block text-sm italic mr-2 whitespace-nowrap"><span>{selectedItems?.length}</span> items selected</div>
        <button 
          className="btn bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-red-500"
          onClick={handleDeleteMultipleRecords}
        >
          Delete
        </button>
      </div>
    </div>
  )
}
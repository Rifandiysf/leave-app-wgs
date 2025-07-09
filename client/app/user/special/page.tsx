'use client'

import { useState } from 'react'
import classNames from 'classnames'
import { usePathname } from 'next/navigation'


const dummyData = [
  { status: 'WAITING', title: 'Sick', start: '15 January 2025', end: '16 January 2025', amount: '2 day(s)', gender: 'F', note: 'Note not found' },
  { status: 'APPROVE', title: 'Holiday', start: '20 March 2025', end: '25 March 2025', amount: '6 day(s)', gender: 'M', note: 'Note not found' },
  { status: 'REJECT', title: 'Party', start: '16 June 2025', end: '18 June 2025', amount: '3 day(s)', gender: 'F', note: 'not allowed' },
  { status: 'APPROVE', title: 'Holiday', start: '20 March 2025', end: '25 March 2025', amount: '6 day(s)', gender: 'M', note: 'Note not found' },
  { status: 'REJECT', title: 'Party', start: '16 June 2025', end: '18 June 2025', amount: '3 day(s)', gender: 'F', note: 'not allowed' },
  { status: 'REJECT', title: 'Party', start: '16 June 2025', end: '18 June 2025', amount: '3 day(s)', gender: 'F', note: 'not allowed' },
  { status: 'APPROVE', title: 'Business Trip', start: '01 July 2025', end: '03 July 2025', amount: '3 day(s)', gender: 'M', note: 'Note not found' },
  { status: 'WAITING', title: 'Sick', start: '10 July 2025', end: '11 July 2025', amount: '2 day(s)', gender: 'F', note: 'Urgent' },
  { status: 'REJECT', title: 'Vacation', start: '05 August 2025', end: '15 August 2025', amount: '10 day(s)', gender: 'M', note: 'peak season' },
  { status: 'APPROVE', title: 'Conference', start: '22 September 2025', end: '25 September 2025', amount: '4 day(s)', gender: 'F', note: 'Note not found' },
  { status: 'APPROVE', title: 'Holiday', start: '10 October 2025', end: '12 October 2025', amount: '3 day(s)', gender: 'M', note: 'Note not found' },
  { status: 'REJECT', title: 'Party', start: '16 June 2025', end: '18 June 2025', amount: '3 day(s)', gender: 'F', note: 'not allowed' },
]

const statusColor = {
  WAITING: 'bg-yellow-200 text-yellow-800',
  APPROVE: 'bg-green-200 text-green-800',
  REJECT: 'bg-red-200 text-red-800',
}

export default function SpecialPage() {
  const pathname = usePathname()
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(6) // ✅ Sudah 6 per halaman

  const totalPages = Math.ceil(dummyData.length / itemsPerPage)
  const paginatedData = dummyData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const goToNextPage = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPages))
  }

  const goToPreviousPage = () => {
    setCurrentPage((page) => Math.max(page - 1, 1))
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Spesial</h1>
        </div>
        <div className="my-6 h-px bg-gray-200" />
      </div>

      {/* Search bar mobile only */}
      {pathname === '/user/special' && (
        <div className="block sm:hidden mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-base text-left">
          <thead className="text-gray-700 font-semibold sticky top-0 bg-gray-100/70 backdrop-blur-sm">
            <tr className="text-base">
              <th className="px-6 py-4 whitespace-nowrap">Status</th>
              <th className="px-6 py-4 whitespace-nowrap">Leave Title</th>
              <th className="px-6 py-4 whitespace-nowrap">Start Leave</th>
              <th className="px-6 py-4 whitespace-nowrap">End Leave</th>
              <th className="px-6 py-4 whitespace-nowrap">Amount</th>
              <th className="px-6 py-4 whitespace-nowrap">Gender</th>
              <th className="px-6 py-4 whitespace-nowrap">Reject Note</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {paginatedData.map((row, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={classNames(
                      'px-3 py-1.5 rounded-full text-sm font-semibold',
                      statusColor[row.status as keyof typeof statusColor]
                    )}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{row.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{row.start}</td>
                <td className="px-6 py-4 whitespace-nowrap">{row.end}</td>
                <td className="px-6 py-4 whitespace-nowrap">{row.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap">{row.gender}</td>
                <td className="px-6 py-4 whitespace-nowrap">{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination  */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4 mt-4 mb-2">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            &lt;
          </button>

          <span className="text-base font-medium text-gray-800">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  )
}

'use client'

import { ReactNode, useState } from "react"
import 'bootstrap-icons/font/bootstrap-icons.css'



type dataLeaveType = {
    nik: number,
    fullName: string,
    gender: string,
    lastYearLeave: number,
    thisYearLeave: number,
    leaveTotal: number, 
    role: string,
    status: ReactNode
}

const DashboardPage = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const ITEMS_PER_PAGE = 6  
    const goToNextPage = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPages))
  }

  const goToPreviousPage = () => {
    setCurrentPage((page) => Math.max(page - 1, 1))
  }

    const dataLeave: dataLeaveType[] = [{
        nik: 1234567890123456,
        fullName: "Admin WGS",
        gender: "M",
        lastYearLeave: 1,
        thisYearLeave: 11,
        leaveTotal: 12,
        role: "Tetap",
        status: <span className="text-[#00c41d] bg-[#82ff9544] p-2 px-3 rounded-full text-xs">ACTIVE</span>
    },{
        nik: 1234567890123456,
        fullName: "Admin WGS",
        gender: "M",
        lastYearLeave: 1,
        thisYearLeave: 11,
        leaveTotal: 12,
        role: "Tetap",
        status: <span className="text-[#00c41d] bg-[#82ff9544] p-2 px-3 rounded-full text-xs">ACTIVE</span>
    },{
        nik: 1234567890123456,
        fullName: "Admin WGS",
        gender: "M",
        lastYearLeave: 1,
        thisYearLeave: 11,
        leaveTotal: 12,
        role: "Tetap",
        status: <span className="text-[#00c41d] bg-[#82ff9544] p-2 px-3 rounded-full text-xs">ACTIVE</span>
    },{
        nik: 1234567890123456,
        fullName: "Admin WGS",
        gender: "M",
        lastYearLeave: 1,
        thisYearLeave: 11,
        leaveTotal: 12,
        role: "Tetap",
        status: <span className="text-[#00c41d] bg-[#82ff9544] p-2 px-3 rounded-full text-xs">ACTIVE</span>
    },{
        nik: 1234567890123456,
        fullName: "Admin WGS",
        gender: "M",
        lastYearLeave: 1,
        thisYearLeave: 11,
        leaveTotal: 12,
        role: "Tetap",
        status: <span className="text-[#00c41d] bg-[#82ff9544] p-2 px-3 rounded-full text-xs">ACTIVE</span>
    },{
        nik: 1234567890123456,
        fullName: "Admin WGS",
        gender: "M",
        lastYearLeave: 1,
        thisYearLeave: 11,
        leaveTotal: 12,
        role: "Tetap",
        status: <span className="text-[#00c41d] bg-[#82ff9544] p-2 px-3 rounded-full text-xs">ACTIVE</span>
    },{
        nik: 1234567890123456,
        fullName: "Admin WGS",
        gender: "M",
        lastYearLeave: 1,
        thisYearLeave: 11,
        leaveTotal: 12,
        role: "Tetap",
        status: <span className="text-[#00c41d] bg-[#82ff9544] p-2 px-3 rounded-full text-xs">ACTIVE</span>
    },{
        nik: 1234567890123456,
        fullName: "Admin WGS",
        gender: "M",
        lastYearLeave: 1,
        thisYearLeave: 11,
        leaveTotal: 12,
        role: "Tetap",
        status: <span className="text-[#00c41d] bg-[#82ff9544] p-2 px-3 rounded-full text-xs">ACTIVE</span>
    },
    ]

    const totalPages = Math.ceil(dataLeave.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const currentData = dataLeave.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setIsLoading(true)
            setTimeout(() => {
                setCurrentPage(page)
                setIsLoading(false)
            }, 600)
        }
    }
    return (
        <>
      {/* Header with Title and Search Bar */}
<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 px-4 gap-4">
  {/* Title */}
  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 truncate">Dashboard</h1>

  {/* Search bar */}
  <div className="w-full sm:w-auto">
    <div className="relative w-full max-w-xs">
      <input
        type="text"
        placeholder="Search..."
        className="w-[300px] pl-10 pr-4 py-2 text-sm border rounded-2xl focus:outline-none bg-gray-100"/>
      <i className="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2  text-gray-400 text-base" />
    </div>
  </div>
</div>


<section className="relative p-3 min-h-[calc(100dvh-137px)] overflow-x-auto">
  <table className="w-full text-base text-center">
    <thead className="text-black bg-gray-100/70 backdrop-blur-sm">
      <tr className="text-base">
        <th className="px-6 py-4 align-middle font-semibold">NIK</th>
        <th className="px-6 py-4 align-middle font-semibold">Name</th>
        <th className="px-6 py-4 align-middle font-semibold">Gender</th>
        <th className="px-6 py-4 align-middle font-semibold">Last Year Leave</th>
        <th className="px-6 py-4 align-middle font-semibold">This Year Leave</th>
        <th className="px-6 py-4 align-middle font-semibold">Leave Total</th>
        <th className="px-6 py-4 align-middle font-semibold">Role</th>
        <th className="px-6 py-4 align-middle font-semibold">Status</th>
      </tr>
    </thead>
    <tbody className="text-gray-800 ">
      {isLoading ? (
        Array.from({ length: ITEMS_PER_PAGE }).map((_, rowIdx) => (
          <tr key={rowIdx} className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-100 animate-pulse'}>
            {Array.from({ length: 8 }).map((_, colIdx) => (
              <td key={colIdx} className="px-6 py-4 align-middle">
                <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto" />
              </td>
            ))}
          </tr>
        ))
      ) : (
        currentData.map((data, idx) => (
          <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
            <td className="px-6 py-4 align-middle">{data.nik}</td>
            <td className="px-6 py-4 align-middle">{data.fullName}</td>
            <td className="px-6 py-4 align-middle">{data.gender}</td>
            <td className="px-6 py-4 align-middle">{data.lastYearLeave}</td>
            <td className="px-6 py-4 align-middle">{data.thisYearLeave}</td>
            <td className="px-6 py-4 align-middle">{data.leaveTotal}</td>
            <td className="px-6 py-4 align-middle">{data.role}</td>
            <td className="px-6 py-4 align-middle">{data.status}</td>
          </tr>
        ))
      )}
    </tbody>
  </table>

  {/* Pagination */}
  {totalPages > 1 && (
    <div className="flex justify-center items-center space-x-4 mt-8">
      <button
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
        className="text-gray-500 hover:text-gray-800 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        &lt;
      </button>

      <span className="text-base font-bold text-gray-800">{currentPage}</span>

      <button
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        className="text-gray-500 hover:text-gray-800 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        &gt;
      </button>
    </div>
  )}
</section>

        </>

    )
}

export default DashboardPage
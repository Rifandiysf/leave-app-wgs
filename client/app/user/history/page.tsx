'use client'

import { ReactNode, useState } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'

type LeaveHistoryType = {
  statusText: string
  statusStyle: string
  type: string
  startLeave: string
  endLeave: string
  leaveUsage: string
  reason: string
  approveBy?: string
  rejectBy?: string
  rejectReason?: string
}

const HistoryPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedLeave, setSelectedLeave] = useState<LeaveHistoryType | null>(null)
  const [showModal, setShowModal] = useState(false)
  const ITEMS_PER_PAGE = 6

  const HistoryLeave: LeaveHistoryType[] = [
    {
      statusText: 'WAITING',
      statusStyle: 'text-[#d39b02] bg-[#ffcf494b]',
      type: 'Personal',
      startLeave: '15 January 2025',
      endLeave: '16 January 2025',
      leaveUsage: '2 day(s)',
      reason: 'Family',
    },
    {
      statusText: 'REJECT',
      statusStyle: 'text-[#ca0000] bg-[#ff5f5f77]',
      type: 'Mandatory',
      startLeave: '20 March 2025',
      endLeave: '25 March 2025',
      leaveUsage: '6 day(s)',
      reason: 'Holiday',
      rejectBy: 'Admin WGS',
      rejectReason: 'Not approved',
    },
    {
      statusText: 'APPROVE',
      statusStyle: 'text-[#00c41d] bg-[#82ff9544]',
      type: 'Personal',
      startLeave: '01 April 2025',
      endLeave: '03 April 2025',
      leaveUsage: '3 day(s)',
      reason: 'Medical',
      approveBy: 'Admin WGS',
    },
  ]

  const totalPages = Math.ceil(HistoryLeave.length / ITEMS_PER_PAGE)
  const currentData = HistoryLeave.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const openModal = (leave: LeaveHistoryType) => {
    setSelectedLeave(leave)
    setShowModal(true)
  }

  const closeModal = () => {
    setSelectedLeave(null)
    setShowModal(false)
  }

  const goToPreviousPage = () => setCurrentPage((page) => Math.max(page - 1, 1))
  const goToNextPage = () => setCurrentPage((page) => Math.min(page + 1, totalPages))

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">Leave History</h1>
        <div className="my-6 h-px bg-gray-200" />
      </div>

      {/* Search bar mobile only */}
      <div className="block sm:hidden mb-4 px-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-base text-center">
          <thead className="text-black  bg-gray-100/70 backdrop-blur-sm">
            <tr className="text-base">
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold">Type</th>
              <th className="px-6 py-4 font-semibold">Start Leave</th>  
              <th className="px-6 py-4 font-semibold">End Leave</th>
              <th className="px-6 py-4 font-semibold">Leave Usage</th>
              <th className="px-6 py-4 font-semibold">Reason</th>
              <th className="px-6 py-4 font-semibold">Note</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 ">
            {currentData.map((data, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                <td className="px-6 py-4">
                  <span className={`w-24 inline-block text-center px-3 py-1.5 rounded-full text-sm font-semibold ${data.statusStyle}`}>
                    {data.statusText}
                  </span>
                </td>
                <td className="px-6 py-4">{data.type}</td>
                <td className="px-6 py-4">{data.startLeave}</td>
                <td className="px-6 py-4">{data.endLeave}</td>
                <td className="px-6 py-4">{data.leaveUsage}</td>
                <td className="px-6 py-4">{data.reason}</td>
                <td className="px-6 py-4">
                  <i className="bi bi-exclamation-circle-fill text-2xl cursor-pointer" onClick={() => openModal(data)}></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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

{/* Modal */}
{showModal && selectedLeave && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg relative">
      <button
        onClick={closeModal}
        className="absolute top-2 right-3 text-2xl text-gray-500 hover:text-gray-700"
      >
        &times;
      </button>
      <h2 className="text-xl font-bold mb-2 text-center">Informasi</h2>
      <hr className="border-black mb-4" />
      <div className="text-sm sm:text-base flex flex-col gap-2">
        <div className="flex justify-between">
          <span className="font-semibold w-[45%]">Type</span>
          <span className="w-[80%]  pl-2">: {selectedLeave.type}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold w-[45%]">Start Leave</span>
          <span className="w-[80%]  pl-2">: {selectedLeave.startLeave}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold w-[45%]">End Leave</span>
          <span className="w-[80%]  pl-2">: {selectedLeave.endLeave}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold w-[45%]">Leave Used</span>
          <span className="w-[80%]  pl-2">: {selectedLeave.leaveUsage}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold w-[45%]">Reason</span>
          <span className="w-[80%]  pl-2">: {selectedLeave.reason}</span>
        </div>

        {selectedLeave.statusText === 'REJECT' && (
          <>
            <div className="flex justify-between">
              <span className="font-semibold w-[45%]">Reject by</span>
              <span className="w-[80%]  pl-2">: {selectedLeave.rejectBy || '-'}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold w-[45%]">Reason rejected</span>
              <span className="w-[80%]  pl-2">: {selectedLeave.rejectReason || '-'}</span>
            </div>
          </>
        )}

        {selectedLeave.statusText === 'APPROVE' && (
          <div className="flex justify-between">
            <span className="font-semibold w-[45%]">Approve by</span>
            <span className="w-[80%] pl-2">: {selectedLeave.approveBy || '-'}</span>
          </div>
        )}
      </div>
    </div>
  </div>
)}


    </div>
  )
}

export default HistoryPage

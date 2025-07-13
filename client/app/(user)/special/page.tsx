'use client'

import { useState } from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "../../components/ui/pagination"

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
  WAITING: 'text-[#d39b02] bg-[#ffcf494b] p-2 px-3 rounded-full text-xs',
  APPROVE: 'text-[#00c41d] bg-[#82ff9544] p-2 px-3 rounded-full text-xs',
  REJECT: 'text-[#ca0000] bg-[#ff5f5f77] p-2 px-3 rounded-full text-xs',
}

export default function SpecialPage() {
  const pathname = usePathname()
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const ITEMS_PER_PAGE = 7

  const totalPages = Math.ceil(dummyData.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentData = dummyData.slice(startIndex, startIndex + ITEMS_PER_PAGE)

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
      <section className="relative p-3 min-h-[calc(100dvh-137px)]">
        <table className="w-full min-w-max rounded-t-2xl">
          <thead className="border-b-[1.5px] border-[#0000001f] bg-[#f0f4f9] rounded-2xl shadow-2xl">
            <tr>
              <th className="p-3 text-[18px] font-semibold tracking-wide whitespace-nowrap">Status</th>
              <th className="p-3 text-[18px] font-semibold tracking-wide whitespace-nowrap">Leave Title</th>
              <th className="p-3 text-[18px] font-semibold tracking-wide whitespace-nowrap">Start Leave</th>
              <th className="p-3 text-[18px] font-semibold tracking-wide whitespace-nowrap">End Leave</th>
              <th className="p-3 text-[18px] font-semibold tracking-wide whitespace-nowrap">Amount</th>
              <th className="p-3 text-[18px] font-semibold tracking-wide whitespace-nowrap">Gender</th>
              <th className="p-3 text-[18px] font-semibold tracking-wide whitespace-nowrap">Reject Note</th>
            </tr>
          </thead>
          <tbody className="cursor-pointer">
            {isLoading ? (
              Array.from({ length: ITEMS_PER_PAGE }).map((_, rowIdx) => (
                <tr key={rowIdx} className="animate-pulse odd:bg-[#e8efff] even:bg-[#f8faff]">
                  {Array.from({ length: 7 }).map((_, colIdx) => (
                    <th key={colIdx} className="p-2 sm:p-3">
                      <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto" />
                    </th>
                  ))}
                </tr>
              ))
            ) : (
              currentData.map((data, idx) => (
                <tr key={idx} className="odd:bg-[#e8efff] even:bg-[#f8faff] hover:bg-[#e3e7f0] transition-colors duration-300">
                  <th className="p-2 text-sm sm:text-[14px] font-medium border-b-[1.5px] border-[#0000001f]">
                    <span
                      className={classNames(
                        'px-3 py-1.5 rounded-full text-sm font-semibold',
                        statusColor[data.status as keyof typeof statusColor]
                      )}
                    >
                      {data.status}
                    </span>
                  </th>
                  <th className="p-2 text-sm sm:text-[14px] font-medium border-b-[1.5px] border-[#0000001f]">{data.title}</th>
                  <th className="p-2 text-sm sm:text-[14px] font-medium border-b-[1.5px] border-[#0000001f]">{data.start}</th>
                  <th className="p-2 text-sm sm:text-[14px] font-medium border-b-[1.5px] border-[#0000001f]">{data.end}</th>
                  <th className="p-2 text-sm sm:text-[14px] font-medium border-b-[1.5px] border-[#0000001f]">{data.amount}</th>
                  <th className="p-2 text-sm sm:text-[14px] font-medium border-b-[1.5px] border-[#0000001f]">{data.gender}</th>
                  <th className="p-2 text-sm sm:text-[14px] font-medium border-b-[1.5px] border-[#0000001f]">{data.note}</th>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="flex justify-center items-center bg-white py-5">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={`${currentPage === 1 ? "pointer-events-none opacity-50 cursor-default" : "cursor-pointer"}`}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    isActive={currentPage === i + 1}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={`${currentPage === totalPages ? "pointer-events-none opacity-50 cursor-default" : "cursor-pointer"}`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </section>
    </div>
  )
}

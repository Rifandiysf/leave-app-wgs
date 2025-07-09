'use client'

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function UserDashboard() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      {/* Header Specific to Dashboard Page */}
      <div className="flex flex-col mb-6">  
        
        {/* Mobile Header */}
        <div className="sm:hidden">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-600 text-sm">Manage your leave requests and track your remaining days</p>
        </div>
        
        {/* Desktop Header */}
        <div className="hidden sm:flex items-center space-x-4 flex-1">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 truncate">Dashboard</h1>
            <p className="text-gray-600 text-sm sm:text-base">Manage your leave requests and track your remaining days</p>
          </div>  
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
        
        {/* --- KARTU 1 --- */}
        <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-blue-50 to-blue-100 border-0 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-200 rounded-full -mr-10 -mt-10 opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-blue-300 rounded-full -ml-8 -mb-8 opacity-30"></div>
          
          {/* VERSI MOBILE (Hanya terlihat di layar kecil) */}
          <div className="sm:hidden p-4">
            <div className="flex items-start justify-between">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <i className="bi bi-calendar-check text-white text-lg" />
                </div>
                <div className="text-3xl font-bold text-blue-800">2</div>
            </div>
            <div className="mt-2">
                <h3 className="text-sm font-semibold text-blue-900 leading-tight">Remaining Leave</h3>
                <p className="text-xs text-gray-600">this year</p>
            </div>
          </div>

          {/* VERSI DESKTOP (Kode asli Anda, hanya terlihat di layar besar) */}
          <div className="hidden sm:block relative p-6 sm:p-8 md:p-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <i className="bi bi-calendar-check text-white text-xl" />
              </div>
              <div className="text-right">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-800 mb-1">12</div>
                <div className="w-8 h-1 bg-blue-600 rounded-full ml-auto"></div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-1">Remaining Leave</h3>
              <p className="text-gray-600 text-sm"> this year</p>
            </div>
          </div>
        </Card>

        {/* --- KARTU 2 --- */}
        <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-blue-50 to-blue-100 border-0 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-200 rounded-full -mr-10 -mt-10 opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-blue-300 rounded-full -ml-8 -mb-8 opacity-30"></div>
          
           {/* VERSI MOBILE (Hanya terlihat di layar kecil) */}
          <div className="sm:hidden p-4">
             <div className="flex items-start justify-between">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <i className="bi bi-calendar-plus text-white text-lg" />
                </div>
                <div className="text-3xl font-bold text-blue-800">12</div>
             </div>
             <div className="mt-2">
                <h3 className="text-sm font-semibold text-blue-900 leading-tight">Remaining Leave</h3>
                <p className="text-xs text-gray-600">From Last year</p>
             </div>
          </div>
          
          {/* VERSI DESKTOP (Kode asli Anda, hanya terlihat di layar besar) */}
          <div className="hidden sm:block relative p-6 sm:p-8 md:p-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <i className="bi bi-calendar-plus text-white text-xl" />
              </div>
              <div className="text-right">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-800 mb-1">4</div>
                <div className="w-8 h-1 bg-blue-600 rounded-full ml-auto"></div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-1">Remaining Leave </h3>
              <p className="text-gray-600 text-sm">From Last year</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Action Section */}
      <div className="space-y-6">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-0 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 to-blue-200/20"></div>
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-blue-200 rounded-full -mt-16 opacity-30"></div>
          <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-blue-300 rounded-full -mb-12 opacity-20"></div>
          <div className="relative p-6 sm:p-8 md:p-12 text-center">
            <div className="max-w-md mx-auto">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-900 mb-3">Ready to take a break?</h2>
              <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">Submit your leave request and we'll process it for you</p>
              <Button
                onClick={() => setShowModal(true)}
                className="group px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-900 font-semibold hover:bg-blue-50 hover:shadow-lg transition-all duration-300 rounded-xl border-0 text-base sm:text-lg"
              >
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <i className="bi bi-calendar-event-fill text-xl sm:text-2xl" />
                  <span>Apply For Leave</span>
                </div>
              </Button>
            </div>
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Card className="p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-white border border-blue-100 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <i className="bi bi-calendar-week text-white text-sm" />
              </div>
              <div className="min-w-0">
                <div className="text-xl sm:text-2xl font-bold text-blue-800">16</div>
                <p className="text-xs sm:text-sm text-gray-600">Total Available</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-white border border-blue-100 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <i className="bi bi-clock-history text-white text-sm" />
              </div>
              <div className="min-w-0">
                <div className="text-xl sm:text-2xl font-bold text-blue-800">3</div>
                <p className="text-xs sm:text-sm text-gray-600">Pending Requests</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-white border border-blue-100 hover:shadow-md transition-shadow sm:col-span-2 md:col-span-1">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <i className="bi bi-check-circle-fill text-white text-sm" />
              </div>
              <div className="min-w-0">
                <div className="text-xl sm:text-2xl font-bold text-blue-800">8 </div>
                <p className="text-xs sm:text-sm text-gray-600">Days Used</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative transform transition-all">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-white rounded-2xl"></div>
            <div className="relative p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <i className="bi bi-file-earmark-text text-white text-2xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Leave Application</h2>
                <p className="text-gray-600">Fill in the details for your leave request</p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Leave Type</label>
                  <select className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all">
                    <option value="">Select Leave Type</option>
                    <option value="personal">Personal Leave</option>
                    <option value="special">Special Leave</option>
                    <option value="mandatory">Mandatory Leave</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Reason</label>
                  <input
                    type="text"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                    placeholder="Brief reason for leave"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Start Date</label>
                    <input
                      type="date"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">End Date</label>
                    <input
                      type="date"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center pt-6 space-y-4 sm:space-y-0">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <i className="bi bi-box-arrow-left text-xl" />
                    <span className="font-medium">Cancel</span>
                  </button>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all hover:shadow-lg">
                    Submit Request
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
'use client'

import { Card } from "../../components/ui/card"
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Modal } from "@/app/components/Modal/Modal"

export default function UserDashboard() {

  return (
    <>
      {/* Header Specific to Dashboard Page */}
      <div className="flex flex-col mb-4">
        {/* Mobile Header */}
        <div className="sm:hidden w-full bg-white pb-4 sticky top-[-1rem] z-10">
          <h1 className="text-2xl font-bold text-gray-800 text-center">Dashboard</h1>
          <p className="text-gray-600 text-sm text-center mt-2">Manage your leave requests and track your remaining days</p>
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
        <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-blue-50 to-blue-100 border-0 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-200 rounded-full -mr-10 -mt-10 opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-blue-300 rounded-full -ml-8 -mb-8 opacity-30"></div>
          <div className="relative p-6 sm:p-8 md:p-10">
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

        <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-blue-50 to-blue-100 border-0 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-200 rounded-full -mr-10 -mt-10 opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-blue-300 rounded-full -ml-8 -mb-8 opacity-30"></div>
          <div className="relative p-6 sm:p-8 md:p-10">
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
              <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">Submit your leave request and well process it for you</p>
              <Modal 
                styleButton="w-full px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-900 font-semibold hover:bg-blue-50 hover:shadow-lg transition-all duration-300 rounded-xl border-0 text-base sm:text-lg"
                TitleButton="Apply For Leave"
                title="Leave Application"
                description="Fill in the details for your leave request"
                mode="form"
              />
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
    </>
  )
}
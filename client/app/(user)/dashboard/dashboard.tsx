'use client'

import { Card } from "../../components/ui/card"
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Modal } from "@/app/components/Modal/Modal"
import withAuth from "@/lib/auth/withAuth"

const UserDashboard = () => {
  return (
    <>
      <div className="flex flex-col mb-4">
        {/* Mobile Header */}
        <div className="sm:hidden w-full bg-white pb-4 sticky top-[-1rem] z-10">
          <h1 className="text-2xl font-bold text-gray-800 mt-5">Dashboard</h1>
          <p className="text-gray-600 text-sm mt-2">
            Manage your leave requests and track your remaining days
          </p>
        </div>

        {/* Desktop Header */}
        <div className="hidden sm:flex items-center space-x-4 flex-1">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 truncate">
              Dashboard
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Manage your leave requests and track your remaining days
            </p>
          </div>
        </div>
      </div>

      {/* Stats Card */}
      <div className="grid grid-cols-2 gap-3 sm:gap-6 mb-8">
        {[{ count: 12, label: "Remaining Leave", subtitle: "This Year" }, { count: 4, label: "Remaining Leave", subtitle: "From Last Year" }].map((item, idx) => (
          <Card
            key={idx}
            className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-blue-50 to-blue-100 border-0 overflow-hidden relative rounded-lg sm:rounded-2xl p-5 sm:p-8"
          >
            <div className="absolute top-0 right-0 w-14 h-14 sm:w-20 sm:h-20 bg-blue-200 rounded-full -mr-6 -mt-6 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-16 sm:h-16 bg-blue-300 rounded-full -ml-4 -mb-4 opacity-30"></div>
            <div className="relative p-2 sm:p-6">
              <div className="flex items-center justify-between mb-2 sm:mb-4">
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                  <i className="bi bi-calendar-check text-white text-base sm:text-xl" />
                </div>
                <div className="text-right">
                  <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-blue-800 mb-0.5 sm:mb-1">
                    {item.count}
                  </div>
                  <div className="w-6 h-1 bg-blue-600 rounded-full ml-auto"></div>
                </div>
              </div>
              <div>
                <h3 className="text-sm sm:text-lg font-semibold text-blue-900 mb-0.5 sm:mb-1">
                  {item.label}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm">{item.subtitle}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Action Section */}
      <div className="space-y-6 pb-24">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-0 overflow-hidden relative rounded-lg sm:rounded-2xl p-5 sm:p-12">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 to-blue-200/20"></div>
          <div className="absolute top-0 left-1/4 w-20 h-20 sm:w-32 sm:h-32 bg-blue-200 rounded-full -mt-10 sm:-mt-16 opacity-30"></div>
          <div className="absolute bottom-0 right-1/4 w-16 h-16 sm:w-24 sm:h-24 bg-blue-300 rounded-full -mb-8 sm:-mb-12 opacity-20"></div>

          <div className="relative p-2 sm:p-12 text-center">
            <div className="max-w-md mx-auto">
              <h2 className="text-base sm:text-2xl md:text-3xl font-bold text-blue-900 mb-2 sm:mb-3">
                Ready to take a break?
              </h2>
              <p className="text-gray-600 mb-4 sm:mb-8 text-xs sm:text-base">
                Submit your leave request and we’ll process it for you
              </p>
              <Modal
                mode="form"
                title="Leave Application"
                triggerLabel="Apply For Leave"
                description="Fill in the details for your leave request"
                triggerClassName="w-full px-4 sm:px-8 py-2 sm:py-4 bg-white text-blue-900 font-semibold hover:bg-blue-50 hover:shadow-lg transition-all duration-300 rounded-xl border-0 text-sm sm:text-lg"
              />
            </div>
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { icon: "bi-calendar-week", count: 16, label: "Total Available" },
            { icon: "bi-clock-history", count: 3, label: "Pending Requests" },
            { icon: "bi-check-circle-fill", count: 8, label: "Days Used" }
          ].map((stat, idx) => (
            <Card
              key={idx}
              className={`p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-white border border-blue-100 hover:shadow-md transition-shadow ${
                idx === 2 ? 'sm:col-span-2 md:col-span-1' : ''
              }`}
            >
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className={`bi ${stat.icon} text-white text-sm`} />
                </div>
                <div className="min-w-0">
                  <div className="text-3xl sm:text-3xl font-bold text-blue-800">{stat.count}</div>
                  <p className="text-xs sm:text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}

export default withAuth(UserDashboard)
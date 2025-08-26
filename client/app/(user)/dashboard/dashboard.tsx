'use client'

import React from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useUser } from "@/app/context/UserContext"; 
import { useUserDashboardData } from "@/app/hooks/UseUserDashboardData";  
import { DashboardHeader } from "@/app/components/dashboard/DashboardHeader";
import { SummaryCards } from "@/app/components/dashboard/SummaryCards";
import { Card } from "@/app/components/ui/card";
import { ApplyLeave } from "@/app/components/form/applyLeave";


const DashboardSkeleton = () => (
    <>
      <div className="flex flex-col mb-4">
        <div className="h-8 bg-gray-200 dark:bg-gray-600 rounded w-1/4 mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2 animate-pulse"></div>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-6 mb-8">
        <div className="h-36 bg-gray-200 dark:bg-gray-600 rounded-lg sm:rounded-2xl animate-pulse"></div>
        <div className="h-36 bg-gray-200 dark:bg-gray-600 rounded-lg sm:rounded-2xl animate-pulse"></div>
      </div>
      <div className="space-y-6 pb-24">
        <div className="h-48 bg-gray-200 dark:bg-gray-600 rounded-lg sm:rounded-2xl animate-pulse"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="h-20 bg-gray-200 dark:bg-gray-600 rounded-lg animate-pulse"></div>
          <div className="h-20 bg-gray-200 dark:bg-gray-600 rounded-lg animate-pulse"></div>
          <div className="h-20 bg-gray-200 dark:bg-gray-600 rounded-lg animate-pulse sm:col-span-2 md:col-span-1"></div>
        </div>
      </div>
    </>
);


const UserDashboard = () => {
  const { user: globalUser, isLoading: isUserLoading, error: userError } = useUser();
  const { dashboardData, isLoading: isLoadingDashboard, error: dashboardError } = useUserDashboardData(globalUser);

  // Menggabungkan state loading dari context dan hook kustom
  if (isUserLoading || isLoadingDashboard) {
    return <DashboardSkeleton />;
  }

  // Menangani state error
  if (userError) {
    return <div className="text-center text-red-500 p-8">Error: {userError}</div>;
  }
  if (dashboardError) {
    return <div className="text-center text-red-500 p-8">Error: {dashboardError}</div>;
  }
  
  if (!globalUser || !dashboardData) {
    return <div className="text-center text-gray-500 p-8">Could not load dashboard data.</div>;
  }
  
  const quickStats = [
    { icon: "bi-calendar-week", count: dashboardData.balance.total_amount, label: "Total Available" },
    { icon: "bi-clock-history", count: dashboardData.balance.pending_request, label: "Pending Requests" },
    { icon: "bi-check-circle-fill", count: dashboardData.balance.used_days, label: "Days Used" }
  ];

  return (
    <>
      <DashboardHeader fullname={globalUser.fullname || 'User'} />
      
      <SummaryCards 
        currentAmount={dashboardData.balance.current_amount} 
        carriedAmount={dashboardData.balance.carried_amount}
      />
      
      <div className="space-y-6 pb-24">
        <Card className="bg-card border-0 overflow-hidden relative rounded-lg sm:rounded-2xl p-5 sm:p-12">
          <div className="relative p-2 sm:p-12 text-center max-w-md mx-auto">
            <h2 className="text-base sm:text-2xl md:text-3xl font-bold text-card-foreground mb-2 sm:mb-3">
              Ready to take a break?
            </h2>
            <p className="text-muted-foreground mb-4 sm:mb-8 text-xs sm:text-base">
              Submit your leave request and we’ll process it for you
            </p>
            <ApplyLeave />
          </div>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {quickStats.map((stat, idx) => (
            <Card key={idx} className={`p-4 sm:p-6 bg-card border border-border hover:shadow-md transition-shadow ${idx === 2 ? 'sm:col-span-2 md:col-span-1' : ''}`}>
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className={`bi ${stat.icon} text-white text-sm`} />
                </div>
                <div>
                  <div className="text-3xl sm:text-3xl font-bold text-card-foreground">{stat.count}</div>
                  <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}

export default UserDashboard;
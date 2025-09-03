'use client';

import { Card } from "@/app/components/ui/card";
import { DashboardStats } from "@/app/hooks/admin/UseDashboardData";
import 'bootstrap-icons/font/bootstrap-icons.css';

interface SummaryCardsProps {
    stats: DashboardStats;
}

export const SummaryCards = ({ stats }: SummaryCardsProps) => {
    const summaryCards = [
        { count: stats.totalEmployees?.total || 0, label: "Total Employee", subtitle: `${stats.totalEmployees?.activeEmployees || 0} active, ${stats.totalEmployees?.resignEmployees || 0} resign`, icon: "bi-people-fill", color: "blue" },
        { count: stats.thisYearLeave || 0, label: "Total Leave This Year", subtitle: `Approved in ${new Date().getFullYear()}`, icon: "bi-calendar-check-fill", color: "green" },
        { count: `${stats.weeklyLeave || 0}`, label: "Employees on Weekly Leave", subtitle: "Leave in the last 7 days", icon: "bi-person-dash-fill", color: "orange" },
        { count: `${stats.pendingLeaves || 0}`, label: "Pending Leave Requests", subtitle: "Waiting for approval", icon: "bi-clock-history", color: "yellow" }
    ];

    const getColorClasses = (color: string) => {
        const colors: { [key: string]: { bg: string; line: string } } = {
            blue: { bg: "bg-blue-600", line: "bg-blue-600" },
            green: { bg: "bg-green-600", line: "bg-green-600" },
            orange: { bg: "bg-orange-600", line: "bg-orange-600" },
            yellow: { bg: "bg-yellow-600", line: "bg-yellow-600" }
        };
        return colors[color] || colors.blue;
    };

    return (
        <div className="grid grid-cols-2 gap-3 sm:gap-6 mb-8">
            {summaryCards.map((item, idx) => {
                const colorClasses = getColorClasses(item.color);
                return (
                    <Card key={idx} className="group hover:shadow-lg transition-all duration-300 bg-white dark:bg-card border border-border overflow-hidden relative rounded-lg sm:rounded-2xl p-2 sm:p-3">
                        <div className="relative p-1 sm:p-2">
                            <div className="flex items-center justify-between mb-2 sm:mb-4">
                                <div className={`w-8 h-8 sm:w-12 sm:h-12 ${colorClasses.bg} rounded-xl flex items-center justify-center`}>
                                    <i className={`bi ${item.icon} text-white text-base sm:text-xl`} />
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground mb-0.5 sm:mb-1">
                                        {item.count}
                                    </div>
                                    <div className={`h-1 ${colorClasses.line} rounded-full ml-auto sm:hidden ${String(item.count).length >= 2 ? 'w-8' : 'w-6'}`}></div>
                                    <div className={`h-1 ${colorClasses.line} rounded-full ml-auto hidden sm:block ${String(item.count).length >= 2 ? 'w-16' : 'w-12'}`}></div>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xs sm:text-sm md:text-base font-semibold text-foreground mb-0.5 sm:mb-1 leading-tight">
                                    {item.label}
                                </h3>
                                <p className="text-muted-foreground text-xs sm:text-xs leading-tight">{item.subtitle}</p>
                            </div>
                        </div>
                    </Card>
                );
            })}
        </div>
    );
};

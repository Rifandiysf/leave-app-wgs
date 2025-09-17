'use client';

import { PendingLeaveRequestType } from "@/app/hooks/admin/UseDashboardData";

interface PendingLeaveRequestsProps {
    requests: PendingLeaveRequestType[];
}

export const PendingLeaveRequests = ({ requests }: PendingLeaveRequestsProps) => {
    const dateOptions: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };

    if (!requests || requests.length === 0) {
        return null;
    }

    const getScrollClasses = () => {
        if (requests.length > 9) {
            return 'max-h-[380px] md:max-h-[420px] overflow-y-auto';
        }
        if (requests.length > 3) {
            return 'max-h-[380px] overflow-y-auto md:max-h-none md:overflow-visible';
        }
        return '';
    };

    return (
        <div className="bg-white dark:bg-card border border-border overflow-hidden relative rounded-lg sm:rounded-2xl p-4 sm:p-6 mb-8">
            <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                
                Employees on Pending Leave ({requests.length} request{requests.length !== 1 ? 's' : ''})
            </h3>
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${getScrollClasses()}`}>
                {requests.map((leave, index) => (
                    <div key={`${leave.nik}-${index}`} className="bg-yellow-50 dark:bg-gray-800 rounded-lg p-4 border border-yellow-200 dark:border-yellow-900 text-gray-800 dark:text-gray-200">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-bold">{leave.name}</p>
                                <p className="text-sm capitalize text-gray-600 dark:text-gray-400">{leave.type}</p>
                            </div>
                            <span className="px-2 py-1 bg-yellow-200 text-yellow-800 rounded-full text-xs font-medium">{leave.status}</span>
                        </div>
                        <div className="mt-3 text-sm space-y-1 text-gray-700 dark:text-gray-300">
                            <p>Start Date: {new Date(leave.start_date).toLocaleDateString('id-ID', dateOptions)}</p>
                            <p>End Date : {new Date(leave.end_date).toLocaleDateString('id-ID', dateOptions)}</p>
                            <p className="font-medium">Duration: {leave.duration.replace('days', ' Hari')}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


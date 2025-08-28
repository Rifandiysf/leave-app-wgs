'use client';

import { Card } from "@/app/components/ui/card";
import { LeaderboardUserType } from "@/app/hooks/admin/UseDashboardData";
import 'bootstrap-icons/font/bootstrap-icons.css';

interface LeaderboardProps {
    title: string;
    icon: string;
    themeColor: 'green' | 'red';
    data: LeaderboardUserType[];
}

export const Leaderboard = ({ title, icon, themeColor, data }: LeaderboardProps) => {
    const colors = {
        green: { icon: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20', border: 'border-green-100 dark:border-green-800/30', rank1: 'bg-green-500', rank2: 'bg-green-400', rank3: 'bg-green-300', text: 'text-green-600 dark:text-green-400' },
        red: { icon: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20', border: 'border-red-100 dark:border-red-800/30', rank1: 'bg-red-500', rank2: 'bg-red-400', rank3: 'bg-red-300', text: 'text-red-600 dark:text-red-400' }
    };
    const theme = colors[themeColor];

    return (
        <Card className="bg-white dark:bg-card border border-border overflow-hidden relative rounded-lg sm:rounded-2xl p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <i className={`bi ${icon} ${theme.icon}`}></i>
                {title}
            </h3>
            <div className="space-y-3">
                {data.map((user, index) => (
                    // FIX: Added a unique key prop using user.nik
                    <div key={user.nik} className={`flex items-center justify-between p-3 ${theme.bg} rounded-lg border ${theme.border}`}>
                        <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${index === 0 ? theme.rank1 : index === 1 ? theme.rank2 : theme.rank3}`}>
                                {index + 1}
                            </div>
                            <div>
                                <p className="font-medium text-gray-800 dark:text-gray-200">{user.name}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{user.nik} • {(user.role || '').replace(/_/g, ' ')}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className={`font-bold ${theme.text}`}>{user.total_amount || 0} Day</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">This Year: {user.this_year || 0} | Last Year: {user.last_year || 0}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Average Leave: <b>{user.average_leave}</b></p>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};

'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card } from "@/app/components/ui/card";
import { MonthlyTrendType } from '@/app/hooks/admin/UseDashboardData';
import 'bootstrap-icons/font/bootstrap-icons.css';

interface TrendChartProps {
    trendData: MonthlyTrendType[];
    selectedYear: number;
    availableYears: number[];
    onYearChange: (year: number) => void;
    isLoading?: boolean;
}

const ChartLoader = () => (
    <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
);

export const TrendChart = ({ trendData, selectedYear, availableYears, onYearChange, isLoading }: TrendChartProps) => (
    <Card className="bg-white dark:bg-card border border-border overflow-hidden relative rounded-lg sm:rounded-2xl p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg sm:text-xl font-semibold text-foreground flex items-center gap-2">
                <i className="bi bi-graph-up text-blue-500"></i>
                Monthly Leave Trends
            </h3>
            <select
                value={selectedYear}
                onChange={(e) => {
                    e.preventDefault(); 
                    onYearChange(Number(e.target.value));
                }}
                className="bg-gray-50 border border-border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                aria-label="Pilih tahun untuk tren cuti"
                disabled={isLoading}
            >
                {availableYears.map(year => (
                    <option key={year} value={year}>{year}</option>
                ))}
            </select>
        </div>
        <div className="h-80">
            {isLoading ? (
                <ChartLoader />
            ) : (
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                        <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
                        <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                        <Tooltip contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px' }} />
                        <Legend />
                        <Line type="monotone" dataKey="mandatory_leave" name="Mandatory" stroke="var(--chart-1)" strokeWidth={2} activeDot={{ r: 6 }} />
                        <Line type="monotone" dataKey="special_leave" name="Special" stroke="var(--chart-2)" strokeWidth={2} activeDot={{ r: 6 }} />
                        <Line type="monotone" dataKey="personal_leave" name="Personal" stroke="var(--chart-3)" strokeWidth={2} activeDot={{ r: 6 }} />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </div>
    </Card>
);
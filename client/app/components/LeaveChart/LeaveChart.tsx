'use client';

import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type LeaveChartProps = {
    nik: string;
    join_date: string; 
};

export const LeaveChart = ({ nik, join_date }: LeaveChartProps) => {
    const [chartData, setChartData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!nik || !join_date) {
            setError("NIK atau tanggal bergabung tidak valid.");
            setIsLoading(false);
            return;
        }

        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            
            try {
                const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${nik}/leave-trend`;
                const response = await fetch(apiUrl, { credentials: 'include' });

                if (!response.ok) {
                    throw new Error(`Failed to fetch. Status: ${response.status}`);
                }

                const resJson = await response.json();
                const trendObject = resJson.data?.trend || {};
                const startYear = new Date(join_date).getFullYear(); 
                const endYear = new Date().getFullYear();           

                const allYearsData = [];
                for (let year = startYear; year <= endYear; year++) {
                    const yearDataFromApi = trendObject[year];

                    if (yearDataFromApi) {
                        allYearsData.push({
                            year: year,
                            personal: yearDataFromApi.personal_leave,
                            special: yearDataFromApi.special_leave,
                            mandatory: yearDataFromApi.mandatory_leave
                        });
                    } else {
                        allYearsData.push({
                            year: year,
                            personal: 0,
                            special: 0,
                            mandatory: 0
                        });
                    }
                }
                
                setChartData(allYearsData);

            } catch (err) {
                console.error("An error occurred in LeaveChart:", err);
                setError(err instanceof Error ? err.message : 'An unknown error occurred.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [nik, join_date]); 

    if (isLoading) {
        return <div className="flex justify-center items-center h-80">Loading statistics...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-80 text-red-500">{error}</div>;
    }
    
    
    return (
        <div className="w-full h-80 mt-4">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" tickCount={chartData.length} />
                    <YAxis allowDecimals={false} label={{ value: 'Total Leave', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="personal" name="Personal Leave" stroke="var(--chart-1)" strokeWidth={2} activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="special" name="Special Leave" stroke="var(--chart-2)" strokeWidth={2} activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="mandatory" name="Mandatory Leave" stroke="var(--chart-3)" strokeWidth={2} activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};
'use client'; 

import React, { useState, useEffect } from 'react'; 
import { Employee } from "@/app/hooks/admin/UseEmployeeListData";
import { fetchUserHistory } from '@/lib/api/service/admin'

interface HistoryItem { 
    date: string; 
    type: 'Leave Request' | 'Adjustment'; 
    description: string; 
    status: string; 
} 

interface ApiHistoryItem {
    data_source: 'leave' | 'adjustment';
    created_at: string;
    title?: string;
    reason?: string;
    status?: string;
    adjustment_value?: number;
    notes?: string;
}

const formatDate = (dateString: string) => { 
    return new Date(dateString).toLocaleDateString('en-US', { 
        month: 'short', day: 'numeric', year: 'numeric' 
    }); 
}; 

const renderStatusPill = (status: string) => { 
    const baseClasses = "px-3 py-1 rounded text-xs font-medium"; 
    switch (status.toLowerCase()) { 
        case 'approved': 
        case 'completed': 
            return <span className={`text-green-800 bg-green-200 ${baseClasses}`}>Completed</span>; 
        case 'pending': 
            return <span className={`text-amber-800 bg-amber-200 ${baseClasses}`}>Pending</span>;
        case 'rejected':
            return <span className={`text-red-800 bg-red-200 ${baseClasses}`}>Rejected</span>;
        default: 
            return <span className={`text-gray-800 bg-gray-200 ${baseClasses}`}>{status}</span>; 
    } 
}; 

type AllHistoryProps = { 
    user: Employee; 
    isOpen: boolean; 
    onClose: () => void; 
}; 

const DetailsModal = ({ item, onClose }: { item: HistoryItem; onClose: () => void; }) => ( 
    <div className="fixed inset-0 bg-black/50 z-[60] flex justify-center items-center p-4" onClick={onClose}> 
        <div className="bg-slate-800 rounded-lg shadow-lg w-full max-w-md" onClick={e => e.stopPropagation()}> 
            <div className="p-6 border-b border-slate-700"> 
                <h3 className="text-lg font-semibold text-white">Detail History</h3> 
            </div> 
            <div className="p-6 space-y-4"> 
                <div> 
                    <label className="text-sm font-medium text-gray-400">Type</label> 
                    <p className="text-white mt-1">{item.type}</p> 
                </div> 
                <div> 
                    <label className="text-sm font-medium text-gray-400">Date</label> 
                    <p className="text-white mt-1">{formatDate(item.date)}</p> 
                </div> 
                <div> 
                    <label className="text-sm font-medium text-gray-400">Status</label> 
                    <div className="mt-1">{renderStatusPill(item.status)}</div> 
                </div> 
                <div> 
                    <label className="text-sm font-medium text-gray-400">Description</label> 
                    <p className="text-white mt-1 leading-relaxed">{item.description}</p> 
                </div> 
            </div> 
            <div className="p-6 border-t border-slate-700 flex justify-end"> 
                <button  
                    onClick={onClose}  
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors" 
                > 
                    Close 
                </button> 
            </div> 
        </div> 
    </div> 
); 

const AllHistory = ({ user, isOpen, onClose }: AllHistoryProps) => { 
    const [isLoading, setIsLoading] = useState(false); 
    const [combinedHistory, setCombinedHistory] = useState<HistoryItem[]>([]); 
    const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => { 
        const loadData = async () => {
            if (!user?.nik) return;

            setIsLoading(true);
            setError(null);

            try {
                const rawData: ApiHistoryItem[] = await fetchUserHistory(user.nik);

                const processedHistory = rawData.map((item): HistoryItem => {
                     if (item.data_source === 'leave') {
                        return {
                            type: 'Leave Request',
                            date: item.created_at,
                            description: item.reason || item.title || 'No description provided',
                            status: item.status || 'Unknown'
                        };
                    } else { 
                        const value = item.adjustment_value || 0;
                        const sign = value > 0 ? '+' : '';
                        return {
                            type: 'Adjustment',
                            date: item.created_at,
                            description: `[${sign}${value} days] ${item.notes || 'No notes'}`,
                            status: 'Completed'
                        };
                    }
                });

                const sortedHistory = processedHistory.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                setCombinedHistory(sortedHistory);

            } catch (err: any) {
                console.error("Error fetching history:", err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        if (isOpen) { 
            loadData();
        } else {
            setCombinedHistory([]);
            setError(null);
        }
    }, [isOpen, user?.nik]);

    if (!isOpen) { 
        return null; 
    } 

    return ( 
        <> 
            <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4" onClick={onClose}> 
                <div className="bg-slate-800 rounded-xl shadow-xl w-full max-w-5xl" onClick={e => e.stopPropagation()}> 
                    <div className="p-6 border-b border-slate-700"> 
                        <h2 className="text-xl font-semibold text-white">History - {user.fullname}</h2> 
                        <p className="text-sm text-gray-400 mt-1">NIK: {user.nik}</p> 
                    </div> 
                    
                    <div className="p-6 max-h-[65vh] overflow-y-auto"> 
                        {isLoading ? ( 
                            <div className="flex justify-center items-center h-32"> 
                                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div> 
                            </div> 
                        ) : error ? (
                            <div className="text-center py-12 text-red-400 bg-red-900/20 rounded-lg">
                                <p className="font-semibold">Failed to load data</p>
                                <p className="text-sm mt-1">{error}</p>
                            </div>
                        ) : combinedHistory.length === 0 ? ( 
                            <div className="text-center py-12"> 
                                <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4"> 
                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"> 
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /> 
                                    </svg> 
                                </div> 
                                <p className="text-gray-400">No history data found</p> 
                            </div> 
                        ) : ( 
                            <div className="overflow-x-auto border border-slate-700 rounded-lg"> 
                                <table className="w-full text-sm border-collapse bg-slate-800"> 
                                    <thead> 
                                        <tr className="bg-slate-700 border-b border-slate-600"> 
                                            <th className="px-4 py-3 text-left font-semibold text-white border-r border-slate-600">Date</th> 
                                            <th className="px-4 py-3 text-left font-semibold text-white border-r border-slate-600">Type</th> 
                                            <th className="px-4 py-3 text-left font-semibold text-white border-r border-slate-600">Description</th> 
                                            <th className="px-4 py-3 text-left font-semibold text-white border-r border-slate-600">Status</th> 
                                            <th className="px-4 py-3 text-center font-semibold text-white">Action</th> 
                                        </tr> 
                                    </thead> 
                                    <tbody> 
                                        {combinedHistory.map((item, index) => ( 
                                            <tr key={index} className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors"> 
                                                <td className="px-4 py-3 text-white border-r border-slate-600 whitespace-nowrap">{formatDate(item.date)}</td> 
                                                <td className="px-4 py-3 text-white border-r border-slate-600">{item.type}</td> 
                                                <td className="px-4 py-3 text-gray-300 border-r border-slate-600 max-w-xs truncate">{item.description}</td> 
                                                <td className="px-4 py-3 border-r border-slate-600">{renderStatusPill(item.status)}</td> 
                                                <td className="px-4 py-3 text-center"> 
                                                    <button onClick={() => setSelectedItem(item)} className="text-blue-400 hover:text-blue-300" title="View Details"> 
                                                        <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"> 
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> 
                                                        </svg> 
                                                    </button> 
                                                </td> 
                                            </tr> 
                                        ))} 
                                    </tbody> 
                                </table> 
                            </div> 
                        )} 
                    </div> 
                    
                    <div className="p-6 border-t border-slate-700 flex justify-between items-center"> 
                        <span className="text-sm text-gray-400">{combinedHistory.length} records total</span> 
                        <button onClick={onClose} className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"> 
                            Close 
                        </button> 
                    </div> 
                </div> 
            </div> 
            {selectedItem && <DetailsModal item={selectedItem} onClose={() => setSelectedItem(null)} />} 
        </> 
    ); 
}; 

export default AllHistory;
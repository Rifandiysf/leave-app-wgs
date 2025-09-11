'use client';

import React from 'react';
import { Employee } from "@/app/hooks/admin/UseEmployeeListData";
import { useAllHistoryData } from '@/app/hooks/admin/UseAllHistoryData';
import Modal from '@/app/components/ui/Modal/Modal';

interface HistoryItem {
    date: string;
    created_at: string;
    type: 'Leave Request' | 'Adjustment';
    description: string;
    status: string;
    rawData: any; 
}

type AllHistoryProps = {
    user: Employee;
    isOpen: boolean;
    onClose: () => void;
};

const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'Invalid Date';
        return date.toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric'
        });
    } catch (error) {
        return 'Invalid Date';
    }
};

const getStatusChip = (status: string) => {
    switch (status?.toLowerCase()) {
        case 'pending': return <span className="text-yellow-600 bg-yellow-100 p-2 px-3 rounded-full text-xs font-semibold">PENDING</span>;
        case 'approved': return <span className="text-green-600 bg-green-100 p-2 px-3 rounded-full text-xs font-semibold">APPROVED</span>;
        case 'completed': return <span className="text-green-600 bg-green-100 p-2 px-3 rounded-full text-xs font-semibold">COMPLETED</span>;
        case 'rejected': return <span className="text-red-600 bg-red-100 p-2 px-3 rounded-full text-xs font-semibold">REJECTED</span>;
        case 'taken': return <span className="text-blue-600 bg-blue-100 p-2 px-3 rounded-full text-xs font-semibold">TAKEN</span>;
        default: return <span className="text-gray-600 bg-gray-100 p-2 px-3 rounded-full text-xs font-semibold">{status?.toUpperCase() || 'N/A'}</span>;
    }
};

const renderModalStatus = (status: string) => {
    const lowerStatus = status?.toLowerCase() || '';
    let colorClass = 'text-gray-500';
    switch (lowerStatus) {
        case 'pending': colorClass = 'text-yellow-500'; break;
        case 'approved': case 'completed': colorClass = 'text-green-500'; break;
        case 'rejected': colorClass = 'text-red-500'; break;
    }
    return (
        <div className="flex items-center gap-2">
            <i className={`bi bi-circle-fill text-xs ${colorClass}`}></i>
            <p className="capitalize">{status || 'N/A'}</p>
        </div>
    );
};

const DetailRow = ({ label, children }: { label: string, children: React.ReactNode }) => (
    <div className="flex flex-col gap-1">
        <p className="font-bold text-sm text-gray-400">{label}</p>
        <div>{children}</div>
    </div>
);

const DetailContent = ({ item }: { item: HistoryItem }) => {
    const { rawData, type } = item;

    if (type === 'Leave Request') {
        const actorName = rawData.approved_by?.fullname || rawData.changed_by?.fullname;
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 text-left text-white">
                <DetailRow label="Type"><p>{type}</p></DetailRow>
                <DetailRow label="Status">{renderModalStatus(rawData.status)}</DetailRow>
                <DetailRow label="Leave Type"><p>{rawData.leave_type || 'Uncategorized'}</p></DetailRow>
                <DetailRow label="Request Date"><p>{formatDate(rawData.created_at)}</p></DetailRow>
                <DetailRow label="Start Date"><p>{formatDate(rawData.start_date)}</p></DetailRow>
                <DetailRow label="End Date"><p>{formatDate(rawData.end_date)}</p></DetailRow>
                <DetailRow label="Total Days"><p>{rawData.total_days} day(s)</p></DetailRow>
                {actorName && <DetailRow label="Actor"><p>{actorName}</p></DetailRow>}
                <div className="md:col-span-2">
                    <DetailRow label="Reason"><p className="leading-relaxed">{rawData.reason || 'N/A'}</p></DetailRow>
                </div>
            </div>
        );
    }

    if (type === 'Adjustment') {
        console.log("DATA UNTUK ADJUSTMENT MODAL:", rawData);

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 text-left text-white">
                <DetailRow label="Type"><p>{type}</p></DetailRow>
                <DetailRow label="Status">{renderModalStatus('Completed')}</DetailRow>
                <DetailRow label="Adjustment Date"><p>{formatDate(rawData.date)}</p></DetailRow>
                <DetailRow label="Adjustment Value"><p>{rawData.adjustment_value} day(s)</p></DetailRow>
                <DetailRow label="Actor"><p>{rawData.actor?.fullname || 'System'}</p></DetailRow>
                <DetailRow label="Actor"><p>{rawData.actor || 'System'}</p></DetailRow>
                <div className="md:col-span-2">
                    <DetailRow label="Notes"><p className="leading-relaxed">{rawData.notes || 'N/A'}</p></DetailRow>
                </div>
                
                
               
            </div>
        );
    }

    return <p className="text-gray-400">No details available for this type.</p>;
};


const PaginationControls = ({ paginationInfo, currentPage, onPageChange }: { paginationInfo: any, currentPage: number, onPageChange: (page: number) => void }) => {
    if (!paginationInfo || paginationInfo.last_visible_page <= 1) return null;
    return (
        <div className="flex items-center justify-center space-x-4">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className="px-3 py-1 bg-slate-600 hover:bg-slate-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                Previous
            </button>
            <span className="text-gray-300 font-medium">Page {currentPage} of {paginationInfo.last_visible_page}</span>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={!paginationInfo.has_next_page}
                className="px-3 py-1 bg-slate-600 hover:bg-slate-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                Next
            </button>
        </div>
    );
};

const AllHistory = ({ user, isOpen, onClose }: AllHistoryProps) => {
    const { state, dispatch } = useAllHistoryData({ user, isOpen });
    const handlePageChange = (page: number) => dispatch({ type: 'SET_PAGE', payload: page });

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4" onClick={onClose}>
            <div className="bg-slate-800 rounded-xl shadow-xl w-full max-w-5xl" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b border-slate-700">
                    <h2 className="text-xl font-semibold text-white">History - {user.fullname}</h2>
                    <p className="text-sm text-gray-400 mt-1">NIK: {user.nik}</p>
                </div>
                <div className="p-6 max-h-[65vh] overflow-y-auto">
                    {state.isLoading ? (
                        <div className="flex justify-center items-center h-32"><div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>
                    ) : state.error ? (
                        <div className="text-center py-12 text-red-400 bg-red-900/20 rounded-lg"><p className="font-semibold">Failed to load data</p><p className="text-sm mt-1">{state.error}</p></div>
                    ) : state.history.length === 0 ? (
                        <div className="text-center py-12"><div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4"><svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg></div><p className="text-gray-400">No history data found</p></div>
                    ) : (
                        <div className="overflow-x-auto border border-slate-700 rounded-lg">
                            <table className="w-full text-sm border-collapse bg-slate-800">
                                <thead>
                                    <tr className="bg-slate-700 border-b border-slate-600">
                                        <th className="px-4 py-3 text-left font-semibold text-white border-r border-slate-600">Date</th>
                                        <th className="px-4 py-3 text-left font-semibold text-white border-r border-slate-600">Type</th>
                                        <th className="px-4 py-3 text-left font-semibold text-white border-r border-slate-600">Description</th>
                                        <th className="px-4 py-3 text-center font-semibold text-white border-r border-slate-600">Status</th>
                                        <th className="px-4 py-3 text-center font-semibold text-white">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {state.history.map((item, index) => (
                                        <tr key={index} className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors">
                                            <td className="px-4 py-3 text-white border-r border-slate-600 whitespace-nowrap">{formatDate(item.created_at)}</td>
                                            <td className="px-4 py-3 text-white border-r border-slate-600">{item.type}</td>
                                            <td className="px-4 py-3 text-gray-300 border-r border-slate-600 max-w-xs truncate">{item.description}</td>
                                            <td className="px-4 py-3 border-r border-slate-600 text-center">{getStatusChip(item.status)}</td>
                                            <td className="px-4 py-3 text-center">
                                                <Modal mode='info' size='default' variant='ghost' title='Detail History' showFooter={false} triggerLabel={<div className='text-blue-400 hover:text-blue-300' title='View Details'><svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>}>
                                                    <DetailContent item={item} />
                                                </Modal>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
                <div className="p-6 border-t border-slate-700 flex justify-between items-center">
                    <span className="text-sm text-gray-400">{state.paginationInfo?.item?.total || 0} records total</span>
                    <PaginationControls paginationInfo={state.paginationInfo} currentPage={state.currentPage} onPageChange={handlePageChange} />
                    <button onClick={onClose} className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors">Close</button>
                </div>
            </div>
        </div>
    );
};

export default AllHistory;
'use client';

import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { useAdjustHistoryData } from '@/app/hooks/admin/UseAdjustHistoryData';
import { AdjustHistoryFilters } from '@/app/components/admin/adjust-history/AdjustHistoryAdminFilters';
import { AdjustHistoryTable } from '@/app/components/admin/adjust-history/AdjustHistoryAdminTable';
import {PaginationControls} from '@/app/components/ui/PaginationControls'; 

const AdjustHistoryAdminPage = () => {
    // Memanggil hook admin
    const { state, dispatch, isLoading, error, history, paginationInfo, itemPerPage } = useAdjustHistoryData();

    // Handler tetap sama
    const handlePageChange = (page: number) => {
        dispatch({ type: 'SET_PAGE', payload: page });
    };

    return (
        <section className="flex flex-col relative p-3 min-h-[calc(100dvh-137px)] max-sm:mb-14">
            {/* Menggunakan komponen filter admin */}
            <AdjustHistoryFilters 
                state={state} 
                dispatch={dispatch} 
            />

            {/* Menggunakan komponen tabel admin */}
            <AdjustHistoryTable 
                isLoading={isLoading} 
                error={error} 
                history={history} 
                itemsPerPage={itemPerPage} 
            />

             <PaginationControls
                paginationInfo={paginationInfo}
                currentPage={state.currentPage}
                onPageChange={handlePageChange}
            />

            
        </section>
    );
};

export default AdjustHistoryAdminPage;

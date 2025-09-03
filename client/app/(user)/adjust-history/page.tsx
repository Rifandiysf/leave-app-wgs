
'use client';

import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { useAdjustHistoryData } from '@/app/hooks/user/useAdjustHistoryData';
import { AdjustHistoryFilters } from '@/app/components/user/adjust-history/adjustHistoryFilters';
import { AdjustHistoryTable } from '@/app/components/user/adjust-history/adjustHistoryTable';
import { PaginationControls } from '@/app/components/ui/PaginationControls';

const AdjustHistoryUserPage = () => {
    // Panggil hook tanpa argumen untuk mendapatkan semua yang kita butuhkan
    const { state, dispatch, isLoading, error, history, paginationInfo, itemPerPage } = useAdjustHistoryData();

    // Handler untuk mengubah halaman
    const handlePageChange = (page: number) => {
        dispatch({ type: 'SET_PAGE', payload: page });
    };

    return (
        <section className="flex flex-col relative p-3 min-h-[calc(100dvh-137px)] max-sm:mb-14">
            {/* Komponen filter sekarang menerima state dan dispatch-nya sendiri */}
            <AdjustHistoryFilters 
                state={state} 
                dispatch={dispatch} 
            />

            {/* Komponen tabel menerima data dari hook */}
            <AdjustHistoryTable 
                isLoading={isLoading} 
                error={error} 
                history={history} 
                itemsPerPage={itemPerPage} 
            />

            {/* Komponen paginasi juga menerima data dari hook */}
            <PaginationControls
                paginationInfo={paginationInfo}
                currentPage={state.currentPage}
                onPageChange={handlePageChange}
            />
        </section>
    );
};

export default AdjustHistoryUserPage;
'use client';

import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useHistoryData } from '@/app/hooks/UseHistoryData';
import { HistoryFilters } from '@/app/components/history/HistoryFiilters';
import { HistoryTable } from '@/app/components/history/HistoryTable';
import { PaginationControls } from '@/app/components/history/PaginationControls';

const HistoryPage = () => {
    const { state, dispatch, isLoading, dataHistoryLeave, paginationInfo, itemPerPage } = useHistoryData();

    const handlePageChange = (page: number) => {
        dispatch({ type: 'SET_PAGE', payload: page });
    };

    return (
        <section className="flex flex-col relative p-3 min-h-[calc(100dvh-137px)] max-sm:mb-14">
            <HistoryFilters
                state={state}
                dispatch={dispatch}
            />
            <HistoryTable
                isLoading={isLoading}
                data={dataHistoryLeave}
                itemsPerPage={itemPerPage}
            />
            <PaginationControls
                paginationInfo={paginationInfo}
                currentPage={state.currentPage}
                onPageChange={handlePageChange}
            />
        </section>
    );
}

export default HistoryPage;
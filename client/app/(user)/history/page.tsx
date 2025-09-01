'use client';

import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useHistoryData } from '@/app/hooks/user/UseHistoryData';
import { HistoryFilters } from '@/app/components/user/history/HistoryFiilters';
import { HistoryTable } from '@/app/components/user/history/HistoryTable';
import { PaginationControls } from '@/app/components/ui/PaginationControls';

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
                totalPages={paginationInfo?.last_visible_page || 0}
                currentPage={state.currentPage}
                hasNextPage={paginationInfo?.has_next_page}
                onPageChange={handlePageChange}
            />
        </section>
    );
}

export default HistoryPage;
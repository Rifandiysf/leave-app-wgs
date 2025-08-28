'use client';

import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useAdjustHistoryData } from '@/app/hooks/useAdjustHistoryData';
import { AdjustHistoryFilters } from '@/app/components/user/adjust-history/adjustHistoryFilters';
import { AdjustHistoryTable } from '@/app/components/user/adjust-history/adjustHistoryTable';
import { PaginationControls } from '@/app/components/ui/PaginationControls';

const AdjustHistoryUserPage = () => {
    const { state, dispatch, isLoading, error, history, paginationInfo, itemPerPage } = useAdjustHistoryData();

    const handlePageChange = (page: number) => {
        dispatch({ type: 'SET_PAGE', payload: page });
    };

    return (
        <section className="flex flex-col relative p-3 min-h-[calc(100dvh-137px)] max-sm:mb-14">
            <AdjustHistoryFilters state={state} dispatch={dispatch} />
            <AdjustHistoryTable isLoading={isLoading} error={error} history={history} itemsPerPage={itemPerPage} />
            <PaginationControls
                paginationInfo={paginationInfo}
                currentPage={state.currentPage}
                onPageChange={handlePageChange}
            />
        </section>
    );
};

export default AdjustHistoryUserPage;
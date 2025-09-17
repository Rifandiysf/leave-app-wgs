// app/admin/list-leave/page.tsx

'use client';

import React, { Suspense } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useLeaveData } from '@/app/hooks/admin/UseLeaveData';
import { LeaveChoiceModal } from '@/app/components/ui/LeaveChoiceModal/LeaveChoiceModal';
import { Notification } from '@/app/components/ui/notification/Notification';
import { PaginationControls } from '@/app/components/ui/PaginationControls'; 
import { LeaveFilters } from '@/app/components/admin/list-leave/ListLeaveFilters';
import { LeaveTable } from '@/app/components/admin/list-leave/ListLeaveTable';


const ListOfLeaveContent = () => {
    const { state, dispatch, isLoading, leaveData, paginationInfo, itemPerPage, handleAction, notification, closeNotification } = useLeaveData();

    if (state.viewMode === null) {
        return <LeaveChoiceModal isOpen={true} onSelectMode={(mode) => dispatch({ type: 'SET_VIEW_MODE', payload: mode })} />;
    }

    return (
        <>
            <LeaveFilters state={state} dispatch={dispatch} />
            <LeaveTable
                viewMode={state.viewMode}
                isLoading={isLoading}
                leaveData={leaveData}
                itemsPerPage={itemPerPage}
                onAction={handleAction}
            />
            <PaginationControls
                paginationInfo={paginationInfo}
                currentPage={state.currentPage}
                onPageChange={(page) => dispatch({ type: 'SET_PAGE', payload: page })}
            />
            <Notification
                mode={notification.mode}
                show={notification.show}
                message={notification.message}
                onClose={closeNotification}
                duration={5000}
            />
        </>
    );
};

const ListOfLeavePage = () => (
    <Suspense fallback={<div>Loading Page...</div>}>
        <ListOfLeaveContent />
    </Suspense>
);

export default ListOfLeavePage;

'use client';

import React, { Suspense } from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEmployeeData } from "@/app/hooks/admin/UseEmployeeListData";
import { EmployeeListFilters } from "@/app/components/admin/employee-list/EmployeeLIstFilters";
import { EmployeeListTable } from "@/app/components/admin/employee-list/EmployeeListTable";
import { PaginationControls } from "@/app/components/ui/PaginationControls"; 

const EmployeeListContent = () => {
    const { state, dispatch, isLoading, employees, paginationInfo, itemPerPage } = useEmployeeData();
    const handlePageChange = (page: number) => dispatch({ type: 'SET_PAGE', payload: page });

    return (
        <>
            <EmployeeListFilters state={state} dispatch={dispatch} />
            <EmployeeListTable isLoading={isLoading} employees={employees} itemsPerPage={itemPerPage} />
            <PaginationControls
                paginationInfo={paginationInfo}
                currentPage={state.currentPage}
                onPageChange={handlePageChange}
            />
        </>
    );
};

const EmployeeListPage = () => (
    <Suspense fallback={<div>Loading page...</div>}>
        <EmployeeListContent />
    </Suspense>
);

export default EmployeeListPage;
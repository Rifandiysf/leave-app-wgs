'use client';

import { useState, useCallback } from 'react';

export function usePagination(initialPage: number = 1) {
    const [currentPage, setCurrentPage] = useState(initialPage);

    const onPageChange = useCallback((page: number) => {
        if (page > 0) {
            setCurrentPage(page);
        }
    }, []);

    return { currentPage, onPageChange };
}
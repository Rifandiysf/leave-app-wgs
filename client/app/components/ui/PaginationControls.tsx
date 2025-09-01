
'use client';

import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/app/components/ui/pagination";

type PageItem = number | 'ellipsis';

const getVisiblePages = (current: number, total: number, maxVisible: number = 5): PageItem[] => {
    const pages: PageItem[] = [];
    if (total <= maxVisible + 2) {
        for (let i = 1; i <= total; i++) pages.push(i);
        return pages;
    }
    const half = Math.floor(maxVisible / 2);
    let start = Math.max(current - half, 2);
    let end = Math.min(current + half, total - 1);
    if (current <= half + 2) {
        start = 2;
        end = maxVisible;
    }
    if (current >= total - half - 1) {
        start = total - maxVisible + 1;
        end = total - 1;
    }
    pages.push(1);
    if (start > 2) pages.push('ellipsis');
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < total - 1) pages.push('ellipsis');
    pages.push(total);
    return pages;
};

interface PaginationControlsProps {
    totalPages: number;
    currentPage: number;
    hasNextPage?: boolean;
    onPageChange: (page: number) => void;
}

export const PaginationControls = ({ totalPages, currentPage, hasNextPage, onPageChange }: PaginationControlsProps) => {
    if (totalPages <= 0) {
        return null;
    }

    const pages = getVisiblePages(currentPage, totalPages);
    const isFirstPage = currentPage === 1;
    const isLastPage = !hasNextPage && currentPage === totalPages;

    return (
        <div className="flex justify-center items-center bg-background py-5">
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => onPageChange(currentPage - 1)}
                            className={`${isFirstPage ? "pointer-events-none opacity-50" : "cursor-pointer"}`}
                        />
                    </PaginationItem>

                    {totalPages > 1 && pages.map((page, idx) => (
                        <PaginationItem key={idx}>
                            {page === 'ellipsis' ? (
                                <span className="px-2 text-gray-500 select-none">…</span>
                            ) : (
                                <PaginationLink
                                    isActive={currentPage === page}
                                    onClick={() => onPageChange(page as number)}
                                    className="cursor-pointer"
                                >
                                    {page}
                                </PaginationLink>
                            )}
                        </PaginationItem>
                    ))}

                    {totalPages <= 1 && (
                        <PaginationItem>
                            <PaginationLink isActive>{currentPage}</PaginationLink>
                        </PaginationItem>
                    )}

                    <PaginationItem>
                        <PaginationNext
                            onClick={() => onPageChange(currentPage + 1)}
                            className={`${isLastPage ? "pointer-events-none opacity-50" : "cursor-pointer"}`}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};
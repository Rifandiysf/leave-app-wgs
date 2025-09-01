<<<<<<< HEAD

'use client';

import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/app/components/ui/pagination";
=======
'use client';

import { 
    Pagination, 
    PaginationContent, 
    PaginationItem, 
    PaginationLink, 
    PaginationNext, 
    PaginationPrevious 
} from "@/app/components/ui/pagination";

export type PaginationInfo = {
    current_page: number;
    last_visible_page: number;
    has_next_page: boolean;
    item?: { 
        count: number;
        total: number;
        per_page: number;
    }
};
>>>>>>> f3b6e849a92fb7fad81f1428c4a0e427bdd5643f

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
<<<<<<< HEAD
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
=======
    paginationInfo: PaginationInfo | null;
    currentPage: number;
    onPageChange: (page: number) => void;
}

export const PaginationControls = ({ paginationInfo, currentPage, onPageChange }: PaginationControlsProps) => {
    if (!paginationInfo || paginationInfo.last_visible_page <= 0) {
        return null;
    }

    const pages = getVisiblePages(currentPage, paginationInfo.last_visible_page);
    const isFirstPage = currentPage === 1;
    const isLastPage = !paginationInfo.has_next_page && currentPage === paginationInfo.last_visible_page;
>>>>>>> f3b6e849a92fb7fad81f1428c4a0e427bdd5643f

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
<<<<<<< HEAD

                    {totalPages > 1 && pages.map((page, idx) => (
=======
                    
                    {paginationInfo.last_visible_page > 1 && pages.map((page, idx) => (
>>>>>>> f3b6e849a92fb7fad81f1428c4a0e427bdd5643f
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

<<<<<<< HEAD
                    {totalPages <= 1 && (
                        <PaginationItem>
                            <PaginationLink isActive>{currentPage}</PaginationLink>
                        </PaginationItem>
=======
                    {paginationInfo.last_visible_page === 1 && (
                         <PaginationItem>
                             <PaginationLink isActive>{currentPage}</PaginationLink>
                         </PaginationItem>
>>>>>>> f3b6e849a92fb7fad81f1428c4a0e427bdd5643f
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
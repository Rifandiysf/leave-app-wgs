'use client';
import { PaginationControls } from "@/app/components/ui/PaginationControls";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { itemPerPage, useMandatoryLeaveData } from "@/app/hooks/UseMandatoryAdmin";
import { updateMandatoryLeaveStatus } from "@/lib/api/service/leave";
import { MandatoryLeaveTable } from "@/app/components/admin/mandatory/MandatoryTable";
import { MandatoryFilters } from "@/app/components/admin/mandatory/MandatoryFilter";

const MandatoryLeavePage = () => {
    const { state, dispatch, isLoading, dataMandatoryLeave, paginationInfo } = useMandatoryLeaveData();
    const [selectedSwitch, setSelectedSwitch] = useState<{ id: string; currentStatus: boolean } | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);

    const handlePageChange = (page: number) => {
        dispatch({ type: "SET_PAGE", payload: page });
    };

    const handleSwitchClick = (id: string, currentStatus: boolean) => {
        setSelectedSwitch({ id, currentStatus });
    };

    const handleFormSubmitSuccess = () => {
        dispatch({ type: "SET_PAGE", payload: state.currentPage });
    };

    const handleConfirmToggle = async () => {
        if (!selectedSwitch) return;
        setIsUpdating(true);
        try {
            await updateMandatoryLeaveStatus(selectedSwitch.id, !selectedSwitch.currentStatus);
            dispatch({ type: "SET_PAGE", payload: state.currentPage });
            setSelectedSwitch(null);
        } catch (err) {
            console.error(err);
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <section className="p-3 min-h-[calc(100dvh-137px)]">
            <MandatoryFilters
                state={state}
                dispatch={dispatch}
                onFormSubmit={handleFormSubmitSuccess}
            />

            <MandatoryLeaveTable
                isLoading={isLoading}
                data={dataMandatoryLeave}
                itemsPerPage={itemPerPage}
                currentPage={state.currentPage}
                onToggle={handleSwitchClick}
                onFormSubmit={handleFormSubmitSuccess}
            />

            <PaginationControls
                totalPages={paginationInfo?.last_visible_page || 0}
                currentPage={state.currentPage}
                hasNextPage={paginationInfo?.has_next_page}
                onPageChange={handlePageChange}
            />

            <Dialog open={!!selectedSwitch} onOpenChange={() => setSelectedSwitch(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Update Action</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to {selectedSwitch?.currentStatus ? "disable" : "enable"} this leave?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setSelectedSwitch(null)} disabled={isUpdating}>
                            Cancel
                        </Button>
                        <Button onClick={handleConfirmToggle} disabled={isUpdating}>
                            {isUpdating ? "Updating..." : "Confirm"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </section>
    );
};

export default MandatoryLeavePage;

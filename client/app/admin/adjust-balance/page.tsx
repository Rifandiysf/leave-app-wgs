'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { UseAdjustBalanceForm } from '@/app/hooks/admin/UseAdjustBalanceForm';
import { Button } from '@/app/components/ui/button';
import Modal from '@/app/components/ui/Modal/Modal';
import { UserSearch } from '@/app/components/admin/adjust-balance/UserSearch';
import { YearSelector } from '@/app/components/admin/adjust-balance/YearSelector';
import { BalanceFields } from '@/app/components/admin/adjust-balance/BalanceFields';
import { AdjustmentTypeSelector } from '@/app/components/admin/adjust-balance/AdjusmentTypeSelector';
import { Notification } from '@/app/components/ui/notification/Notification';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"; // Asumsi Anda punya komponen Tabs
import { BalanceInjection } from '@/app/components/admin/adjust-balance/BalanceInjection';

const AmountLeavePage = () => {
    const { state, dispatch, handleUserSelect, handleSubmit, closeNotification } = UseAdjustBalanceForm();
    const router = useRouter();

    const isFormValid = state.selectedUser && state.adjustmentAmount > 0 && state.information.trim() !== '' && !state.isSelfEdit;
    const isDirty = state.nik.trim() !== '' || state.adjustmentAmount > 0 || state.information.trim() !== '';

    const getConfirmationMessage = () => {
        if (!state.selectedUser) return "";
        const thisYear = new Date().getFullYear();
        const lastYear = thisYear - 1;
        const lastTwoYear = thisYear - 2;
        let yearType;
        if (state.selectedYear === lastYear.toString()) yearType = "last year";
        else if (state.selectedYear === lastTwoYear.toString()) yearType = "last 2 year";
        else yearType = "this year";
        const actionVerb = state.adjustmentType === 'add' ? 'add' : 'reduce';
        return `Are you sure you want to ${actionVerb} ${state.adjustmentAmount} leaves for ${yearType} (${state.selectedYear}) to ${state.selectedUser.nik} - ${state.selectedUser.fullname}?`;
    };

    const effectiveError = state.isSelfEdit ? "You are not allowed to adjust your own leave balance." : state.error;

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-2">
                <div className="bg-background rounded-lg shadow-lg py-3 px-4 w-full max-w-lg relative max-h-[95vh] overflow-y-auto">
                    <div className="text-center mb-4">
                        <h2 className="text-lg font-bold">Adjust Leave Balance</h2>
                    </div>

                    <Tabs defaultValue="manual" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="manual">Manual Adjustment</TabsTrigger>
                            <TabsTrigger value="inject">Inject File</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="manual">
                            {effectiveError && (
                                <div className="bg-red-500 text-white p-2 rounded-lg my-4 flex items-center gap-2">
                                    <div className="bg-white text-red-500 rounded-full p-0.5"><i className="bi bi-x-lg"></i></div>
                                    <span className="text-xs">{effectiveError}</span>
                                </div>
                            )}
                            <div className="space-y-3 pt-4">
                                <UserSearch state={state} dispatch={dispatch} onUserSelect={handleUserSelect} />
                                <AdjustmentTypeSelector state={state} dispatch={dispatch} />
                                <YearSelector state={state} dispatch={dispatch} />
                                <BalanceFields state={state} dispatch={dispatch} />
                                <div>
                                    <label className="block text-xs font-medium text-foreground mb-1">Information</label>
                                    <textarea
                                        rows={3}
                                        className="w-full border border-border px-2 py-1.5 rounded-lg bg-accent text-sm"
                                        placeholder="Information..."
                                        value={state.information}
                                        onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'information', payload: e.target.value })}
                                    ></textarea>
                                </div>
                                <div className="flex justify-between items-center mt-6">
                                    {isDirty ? (
                                        <Modal
                                            mode="confirm"
                                            title="Do you want to discard the changes?"
                                            onConfirm={() => router.back()}
                                            triggerLabel={
                                                <div className="flex items-center gap-1 text-foreground hover:text-gray-800 font-medium cursor-pointer text-sm p-2">
                                                    <i className="bi bi-box-arrow-in-left text-lg"></i> Back
                                                </div>
                                            }
                                        />
                                    ) : (
                                        <Button type="button" variant="ghost" className="flex items-center gap-1 text-foreground hover:text-gray-800 font-medium text-sm p-2" onClick={() => router.back()}>
                                            <i className="bi bi-box-arrow-in-left text-lg"></i> Back
                                        </Button>
                                    )}
                                    {isFormValid ? (
                                        <Modal
                                            mode="confirm"
                                            title={getConfirmationMessage()}
                                            onConfirm={handleSubmit}
                                            triggerLabel={state.isSubmitting ? 'Submitting...' : 'Confirm'}
                                            variant="default"
                                            triggerClassName="bg-blue-500 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 font-medium shadow-md text-sm"
                                        />
                                    ) : (
                                        <button type="button" className="bg-blue-300 text-white px-4 py-1.5 rounded-lg text-sm font-medium shadow-md cursor-not-allowed" disabled>
                                            Confirm
                                        </button>
                                    )}
                                </div>
                            </div>
                        </TabsContent>
                        
                        <TabsContent value="inject">
                             <div className="pt-4">
                                <BalanceInjection />
                                <div className="flex justify-start items-center mt-6">
                                    <Button type="button" variant="ghost" className="flex items-center gap-1 text-foreground hover:text-gray-800 font-medium text-sm p-2" onClick={() => router.back()}>
                                        <i className="bi bi-box-arrow-in-left text-lg"></i> Back
                                    </Button>
                                </div>
                             </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

            <Notification
                mode='success'
                show={!!state.success}
                message={state.success || ""}
                onClose={closeNotification}
                duration={3000}
            />
        </>
    );
};

export default AmountLeavePage;
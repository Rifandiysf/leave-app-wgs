'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAmountLeaveForm } from '@/app/hooks/admin/UseAmountLeaveForm';
import { Button } from '@/app/components/ui/button';
import Modal from '@/app/components/ui/Modal/Modal';
import { UserSearch } from '@/app/components/admin/amount-leave/UserSearch';
import { YearSelector } from '@/app/components/admin/amount-leave/YearSelector';
import { BalanceFields } from '@/app/components/admin/amount-leave/BalanceFields';
import { Notification } from '@/app/components/ui/notification/Notification';

const AmountLeavePage = () => {
    const { state, dispatch, handleUserSelect, handleSubmit, closeNotification } = useAmountLeaveForm();
    const router = useRouter();

    const isFormValid = state.selectedUser && state.amountToAdd > 0 && state.information.trim() !== '' && !state.isSelfEdit;
    const isDirty = state.nik.trim() !== '' || state.amountToAdd > 0 || state.information.trim() !== '';

    const getConfirmationMessage = () => {
        if (!state.selectedUser) return "";
        const thisYear = new Date().getFullYear();
        const lastYear = thisYear - 1;
        const yearType = state.selectedYear === lastYear.toString() ? "last year" : "this year";
        return `Are you sure you want to add ${state.amountToAdd} leaves for ${yearType} (${state.selectedYear}) to ${state.selectedUser.nik} - ${state.selectedUser.name}?`;
    };

    const effectiveError = state.isSelfEdit ? "You are not allowed to add your own leave balance." : state.error;

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-2">
                <div className="bg-background rounded-lg shadow-lg py-3 px-4 w-full max-w-lg relative max-h-[95vh] overflow-y-auto">
                    <div className="text-center mb-4">
                        <h2 className="text-lg font-bold">Add Amount Leave</h2>
                    </div>

                    {effectiveError && (
                        <div className="bg-red-500 text-white p-2 rounded-lg mb-4 flex items-center gap-2">
                            <div className="bg-white text-red-500 rounded-full p-0.5">
                                <i className="bi bi-x-lg"></i>
                            </div>
                            <span className="text-xs">{effectiveError}</span>
                        </div>
                    )}
                    
                    <div className="space-y-3">
                        <UserSearch state={state} dispatch={dispatch} onUserSelect={handleUserSelect} />
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
                        
                        {/* Buttons */}
                        <div className="flex justify-between items-center mt-6">
                            {isDirty ? (
                                <Modal
                                    mode="confirm"
                                    title="Do you want to discard the changes?"
                                    onConfirm={() => router.back()}
                                    triggerLabel={
                                        <div className="flex items-center gap-1 text-foreground hover:text-gray-800 font-medium cursor-pointer text-sm p-2">
                                            <i className="bi bi-box-arrow-in-left text-lg"></i>
                                            Back
                                        </div>
                                    }
                                />
                            ) : (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    className="flex items-center gap-1 text-foreground hover:text-gray-800 font-medium text-sm p-2"
                                    onClick={() => router.back()}
                                >
                                    <i className="bi bi-box-arrow-in-left text-lg"></i>
                                    Back
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
                                <button
                                    type="button"
                                    className="bg-blue-300 text-white px-4 py-1.5 rounded-lg text-sm font-medium shadow-md cursor-not-allowed"
                                    disabled
                                >
                                    Confirm
                                </button>
                            )}
                        </div>
                    </div>
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
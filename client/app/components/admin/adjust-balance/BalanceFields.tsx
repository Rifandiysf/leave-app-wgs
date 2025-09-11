
'use client';

import React from 'react';

export const BalanceFields = ({ state, dispatch }: any) => {
    const thisYear = (new Date().getFullYear()).toString();
    const lastYear = (new Date().getFullYear() - 1).toString();
    const lastTwoYear = (new Date().getFullYear() - 2).toString();

    let currentBalance = 0;
    if (state.selectedUser) {
        if (state.selectedYear === thisYear) {
            currentBalance = state.selectedUser.this_year_leave || 0;
        } else if (state.selectedYear === lastYear) {
            currentBalance = state.selectedUser.last_year_leave || 0;
        } else if (state.selectedYear === lastTwoYear) {
            currentBalance = state.selectedUser.last_two_year_leave || 0;
        }
    }

    const total = state.adjustmentType === 'add'
        ? currentBalance + Number(state.adjustmentAmount)
        : Math.max(0, currentBalance - Number(state.adjustmentAmount));

    const maxReduceAmount = state.adjustmentType === 'reduce' ? currentBalance : Infinity;

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = Number(e.target.value);
        if (value < 0) value = 0; 
        if (state.adjustmentType === 'reduce' && value > maxReduceAmount) {
            value = maxReduceAmount; 
        }
        dispatch({ type: 'SET_FIELD', field: 'adjustmentAmount', payload: value });
    };

    return (
        <>
            <div className="flex flex-col md:flex-row gap-3">
                <div className="w-full md:w-1/2">
                    <label className="block text-xs font-medium text-foreground mb-1">
                        {state.adjustmentType === 'add' ? 'Amount to Add' : 'Amount to Reduce'}
                    </label>
                    <input
                        type="number"
                        min="0"
                        max={state.adjustmentType === 'reduce' ? maxReduceAmount : undefined}
                        className="w-full border border-border bg-accent text-foreground px-2 py-1.5 rounded-lg text-sm"
                        value={state.adjustmentAmount}
                        onChange={handleAmountChange}
                        disabled={!state.selectedUser}
                    />
                </div>
                <div className="w-full md:w-1/2">
                    <label className="block text-xs font-medium text-foreground mb-1">Current Balance</label>
                    <input
                        type="text"
                        className="w-full border border-border px-2 py-1.5 rounded-lg bg-muted/40 text-foreground text-sm"
                        readOnly
                        value={state.selectedUser ? currentBalance : 0}
                    />
                </div>
            </div>
            <div>
                <label className="block text-xs font-medium text-foreground mb-1">Total After Adjustment</label>
                <input
                    type="text"
                    className="w-full border border-border px-2 py-1.5 rounded-lg bg-muted/40 text-foreground text-sm"
                    readOnly
                    value={state.selectedUser ? total : 0}
                />
            </div>
        </>
    );
};
'use client';

import React from 'react';

export const BalanceFields = ({ state, dispatch }: any) => {
    const lastYearBalance = state.selectedUser?.last_year_leave || 0;
    const thisYearBalance = state.selectedUser?.this_year_leave || 0;
    const currentBalance = state.selectedYear === (new Date().getFullYear() - 1).toString() ? lastYearBalance : thisYearBalance;

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
                    />
                </div>
                <div className="w-full md:w-1/2">
                    <label className="block text-xs font-medium text-foreground mb-1">Current Balance</label>
                    <input
                        type="text"
                        className="w-full border border-border px-2 py-1.5 rounded-lg bg-muted/40 text-foreground text-sm"
                        readOnly
                        value={currentBalance}
                    />
                </div>
            </div>
            <div>
                <label className="block text-xs font-medium text-foreground mb-1">Total After Adjustment</label>
                <input
                    type="text"
                    className="w-full border border-border px-2 py-1.5 rounded-lg bg-muted/40 text-foreground text-sm"
                    readOnly
                    value={total}
                />
            </div>
        </>
    );
};
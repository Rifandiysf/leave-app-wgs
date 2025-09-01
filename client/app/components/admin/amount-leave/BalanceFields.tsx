
'use client';

import React from 'react';

export const BalanceFields = ({ state, dispatch }: any) => {
    const lastYearBalance = state.selectedUser?.last_year_leave || 0;
    const thisYearBalance = state.selectedUser?.this_year_leave || 0;
    const currentBalance = state.selectedYear === (new Date().getFullYear() - 1).toString() ? lastYearBalance : thisYearBalance;
    const total = currentBalance + Number(state.amountToAdd);

    return (
        <>
            <div className="flex flex-col md:flex-row gap-3">
                <div className="w-full md:w-1/2">
                    <label className="block text-xs font-medium text-foreground mb-1">Add How Much</label>
                    <input type="number" min="0" className="w-full border border-border bg-accent text-foreground px-2 py-1.5 rounded-lg text-sm" value={state.amountToAdd} onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'amountToAdd', payload: Number(e.target.value) >= 0 ? Number(e.target.value) : 0 })} />
                </div>
                <div className="w-full md:w-1/2">
                    <label className="block text-xs font-medium text-foreground mb-1">Current Balance</label>
                    <input type="text" className="w-full border border-border px-2 py-1.5 rounded-lg bg-muted/40 text-foreground text-sm" readOnly value={currentBalance} />
                </div>
            </div>
            <div>
                <label className="block text-xs font-medium text-foreground mb-1">Total</label>
                <input type="text" className="w-full border border-border px-2 py-1.5 rounded-lg bg-muted/40 text-foreground text-sm" readOnly value={total} />
            </div>
        </>
    );
};

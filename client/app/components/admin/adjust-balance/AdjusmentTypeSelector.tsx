'use client';

import React from 'react';

export const AdjustmentTypeSelector = ({ state, dispatch }: any) => {
    return (
        <div>
            <label className="block text-xs font-medium text-foreground mb-2">Adjustment Type</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {/* Opsi Add Leave */}
                <label className={`flex items-center cursor-pointer border-[1.5px] rounded-lg px-3 py-2 transition-colors ${state.adjustmentType === 'add' ? 'border-blue-500 bg-blue-500/10' : 'border-border bg-accent'}`}>
                    <input
                        type="radio"
                        name="adjustmentType"
                        value="add"
                        checked={state.adjustmentType === 'add'}
                        onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'adjustmentType', payload: e.target.value })}
                        className="w-3 h-3"
                    />
                    <span className="ml-2 text-xs text-foreground font-medium">Add Leave</span>
                </label>
                {/* Opsi Reduce Leave */}
                <label className={`flex items-center cursor-pointer border-[1.5px] rounded-lg px-3 py-2 transition-colors ${state.adjustmentType === 'reduce' ? 'border-red-500 bg-red-500/10' : 'border-border bg-accent'}`}>
                    <input
                        type="radio"
                        name="adjustmentType"
                        value="reduce"
                        checked={state.adjustmentType === 'reduce'}
                        onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'adjustmentType', payload: e.target.value })}
                        className="w-3 h-3"
                    />
                    <span className="ml-2 text-xs text-foreground font-medium">Reduce Leave</span>
                </label>
            </div>
        </div>
    );
};
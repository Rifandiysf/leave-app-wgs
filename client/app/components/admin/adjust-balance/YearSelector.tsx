
    'use client';

    import React from 'react';

    export const YearSelector = ({ state, dispatch }: any) => {
        const thisYear = new Date().getFullYear();
        const lastYear = thisYear - 1;

        const getYearLabel = (year: string) => {
            return year === lastYear.toString() ? `${lastYear} (Last Year)` : `${thisYear} (This Year)`;
        };

        return (
            <div>
                <label className="block text-xs font-medium text-foreground mb-2">Select Year</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[lastYear.toString(), thisYear.toString()].map((year) => (
                        <label key={year} className={`flex items-center cursor-pointer border-[1.5px] rounded-lg px-3 py-2 transition-colors ${state.selectedYear === year ? 'border-blue-500 bg-blue-500/10' : 'border-border bg-accent'}`}>
                            <input type="radio" name="year" value={year} checked={state.selectedYear === year} onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'selectedYear', payload: e.target.value })} className="w-3 h-3"/>
                            <span className="ml-2 text-xs text-foreground font-medium">{getYearLabel(year)}</span>
                        </label>
                    ))}
                </div>
            </div>  
        );
    };

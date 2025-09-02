'use client';

import { SpecialAction, SpecialState } from "@/app/hooks/admin/UseSpecial";
import { AddSpecial } from "../../ui/form/addSpecial";

interface SpecialFilterProps {
    state: SpecialState;
    dispatch: React.Dispatch<SpecialAction>;
    onFormSubmit: () => void
}

export const SpecialFilters = ({ state, dispatch, onFormSubmit }: SpecialFilterProps) => {
    return (
        <div className="mb-4">
            <div className='flex justify-between items-center gap-3'>
                <h1 className="hidden sm:flex text-2xl sm:text-3xl font-bold text-foreground truncate">Special</h1>
                <div className="grid grid-cols-2 max-sm:grid-cols-1 max-sm:w-full items-center gap-3">
                    <input
                        type="text"
                        placeholder="Search By Title..."
                        value={state.search}
                        onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-foreground dark:bg-card text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <AddSpecial onFormSubmit={onFormSubmit} />
                </div>
            </div>
        </div>
    )
}
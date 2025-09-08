
'use client';

import { MandatoryAction, MandatoryState } from "@/app/hooks/admin/UseMandatory";
import { AddMandatory } from "../../ui/form/addMandatory";
import { Button } from "../../ui/button";
import { Calendar } from "lucide-react";
import UpdateYear from "../../ui/Modal/UpdateYear";

interface MandatoryFilterProps {
    state: MandatoryState;
    dispatch: React.Dispatch<MandatoryAction>;
    onFormSubmit: () => void
}

export const MandatoryFilters = ({ state, dispatch, onFormSubmit }: MandatoryFilterProps) => {
    return (
        <div className="mb-4">
            <div className='flex justify-between items-center gap-3'>
                <h1 className="hidden sm:flex text-2xl sm:text-3xl font-bold text-foreground truncate">Mandatory</h1>
                <div className="grid grid-cols-3 max-sm:grid-cols-1 max-sm:w-full items-center gap-3">
                    <input
                        type="text"
                        placeholder="Search By Title..."
                        value={state.search}
                        onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-foreground dark:bg-card text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <UpdateYear/>
                    <AddMandatory onFormSubmit={onFormSubmit} />
                </div>
            </div>
        </div>
    );
};

'use client';

import React from 'react';
import { UserSearchResult } from '@/app/hooks/admin/UseAmountLeaveForm';

export const UserSearch = ({ state, dispatch, onUserSelect }: any) => (
    <div>
        <label className="block text-xs font-medium text-foreground mb-1">Search NIK</label>
        <div className="relative">
            <input
                type="text"
                className="w-full border border-border bg-accent px-2 py-1.5 rounded-lg pl-8 text-foreground text-sm"
                placeholder="Type NIK to search..."
                value={state.nik}
                onChange={(e) => {
                    if (state.selectedUser) dispatch({ type: 'RESET_SEARCH' });
                    dispatch({ type: 'SET_FIELD', field: 'nik', payload: e.target.value });
                }}
                autoComplete="off"
            />
            {state.debouncedSearch && !state.selectedUser && (
                <div className="absolute z-10 w-full mt-1 bg-white dark:bg-card border border-border rounded-lg shadow-lg max-h-40 overflow-y-auto">
                    {state.isSearching ? (
                        <div className="p-2 text-center text-muted-foreground text-xs">Searching...</div>
                    ) : state.searchResults.length > 0 ? (
                        state.searchResults.map((user: UserSearchResult) => (
                            <div key={user.nik} className="p-2 hover:bg-muted-foreground/20 cursor-pointer text-sm" onClick={() => onUserSelect(user)}>
                                {user.nik} - {user.name}
                            </div>
                        ))
                    ) : (
                        <div className="p-2 text-center text-muted-foreground text-xs">User not found.</div>
                    )}
                </div>
            )}
        </div>
        {state.selectedUser && <p className="text-xs text-foreground mt-1">Name: <span className="font-semibold">{state.selectedUser.name}</span></p>}
    </div>
);
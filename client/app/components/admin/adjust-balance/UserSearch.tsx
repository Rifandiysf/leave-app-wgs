'use client';

import React from 'react';
import { UserSearchResult } from '@/app/hooks/admin/UseAdjustBalanceForm';

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);


export const UserSearch = ({ state, dispatch, onUserSelect }: any) => (
    <div>
        <label className="block text-xs font-medium text-foreground mb-1">Search NIK</label>
        <div className="relative flex items-center">
            <input
                type="text"
                className="w-full border border-border bg-accent px-2 py-1.5 rounded-lg pl-8 text-foreground text-sm"
                placeholder={state.selectedUser ? '' : 'Type NIK to search...'}
                value={state.selectedUser ? `${state.selectedUser.nik} - ${state.selectedUser.fullname}` : state.nik}
                onChange={(e) => {
                    if (!state.selectedUser) {
                        dispatch({ type: 'SET_FIELD', field: 'nik', payload: e.target.value });
                    }
                }}
                readOnly={!!state.selectedUser}
                autoComplete="off"
            />
            {state.selectedUser && (
                <button
                    type="button"
                    className="absolute right-2 text-muted-foreground hover:text-foreground"
                    onClick={() => dispatch({ type: 'RESET_SEARCH' })}
                    aria-label="Clear selection"
                >
                    <CloseIcon />
                </button>
            )}

            {state.debouncedSearch && !state.selectedUser && (
                <div className="absolute z-10 w-full mt-1 top-full bg-white dark:bg-card border border-border rounded-lg shadow-lg max-h-40 overflow-y-auto">
                    {state.isSearching ? (
                        <div className="p-2 text-center text-muted-foreground text-xs">Searching...</div>
                    ) : state.searchResults.length > 0 ? (
                        state.searchResults.map((user: UserSearchResult) => (
                            <div key={user.nik} className="p-2 hover:bg-muted-foreground/20 cursor-pointer text-sm" onClick={() => onUserSelect(user)}>
                                {user.nik} - {user.fullname}
                            </div>
                        ))
                    ) : (
                        <div className="p-2 text-center text-muted-foreground text-xs">User not found.</div>
                    )}
                </div>
            )}
        </div>
    </div>
);
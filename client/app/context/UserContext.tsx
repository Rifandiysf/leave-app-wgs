'use client';

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { getMe, UserData } from '@/lib/api/service/user';

interface UserContextType {
  user: UserData | null;
  isLoading: boolean;
  error: string | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);


export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getMe(); 
        setUser(userData);
      } catch (err: any) {
        setError(err.message);
        console.error("Context fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []); 

  const value = { user, isLoading, error };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
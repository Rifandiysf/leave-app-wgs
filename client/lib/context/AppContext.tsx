'use client';

import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { getMe, UserData } from '@/lib/api/service/user';
import { fetchSettingData, SettingData } from '@/lib/api/service/setting';
import { applyThemeFromConfig } from '../utils';

// --- Tipe Data untuk Context ---
interface AppContextType {
    user: UserData | null;
    isUserLoading: boolean;
    userError: string | null;
    settingData: SettingData | null;
    settingImage: string | null;
    fetchUserData: () => Promise<void>;
    fetchSetting: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// --- Provider Gabungan ---
export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserData | null>(null);
    const [isUserLoading, setIsUserLoading] = useState(true);
    const [userError, setUserError] = useState<string | null>(null);
    const [settingData, setSettingData] = useState<SettingData | null>(null);
    const [settingImage, setSettingImage] = useState<string | null>(null);

    const fetchUserData = useCallback(async () => {
        // ... kode yang sama dengan yang ada di soal ...
        setIsUserLoading(true);
        try {
            const userData = await getMe();
            setUser(userData);
            setUserError(null);
        } catch (err: any) {
            setUser(null);
            setUserError(err.message);
            console.error("User context fetch error:", err);
        } finally {
            setIsUserLoading(false);
        }
    }, []);

    const fetchSetting = useCallback(async () => {
        const data = await fetchSettingData();
        if (data) {
            setSettingData(data);

            const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
            const themeToApply = savedTheme || 'system';

            let finalThemeMode = themeToApply;
            if (themeToApply === 'system') {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                finalThemeMode = prefersDark ? 'dark' : 'light';
            }

            const imageToApply = finalThemeMode === 'dark' ? data.dark_color.dark_image : data.light_color.light_image;

            setSettingImage(imageToApply);
            applyThemeFromConfig(data, themeToApply);
        }
    }, []);

    const value = {
        user,
        isUserLoading,
        userError,
        settingData,
        settingImage,
        fetchUserData,
        fetchSetting,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

// --- Hook untuk Mengakses Context ---
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
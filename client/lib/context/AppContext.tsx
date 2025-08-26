'use client';

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { getMe, UserData } from '@/lib/api/service/user';
import axiosInstance from "@/lib/api/axiosInstance";

// --- Tipe Data untuk Context ---
interface ThemeImages {
    light_image: string;
    dark_image: string;
}

interface AppContextType {
    user: UserData | null;
    isUserLoading: boolean;
    userError: string | null;
    settingImages: ThemeImages | null;
    fetchSetting: () => Promise<void>;
    fetchUserData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// --- Provider Gabungan ---
export const AppProvider = ({ children }: { children: ReactNode }) => {
    // State untuk User
    const [user, setUser] = useState<UserData | null>(null);
    const [isUserLoading, setIsUserLoading] = useState(true);
    const [userError, setUserError] = useState<string | null>(null);

    // State untuk Setting
    const [settingImages, setSettingImages] = useState<ThemeImages | null>(null);

    // Fetch User Data
    const fetchUserData = async () => {
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
    };

    // Fetch Setting Data
    const fetchSetting = async () => {
        try {
            const res = await axiosInstance.get("/setting");
            if (res?.data?.data?.light_color && res?.data?.data?.dark_color) {
                setSettingImages({
                    light_image: res.data.data.light_color.image,
                    dark_image: res.data.data.dark_color.image,
                });
            } else {
                setSettingImages({
                    light_image: "/images/logo-wgs.svg",
                    dark_image: "/images/logo-wgs.svg",
                });
            }
        } catch (error) {
            console.error("Failed to fetch setting:", error);
            setSettingImages({
                light_image: "/images/logo-wgs.svg",
                dark_image: "/images/logo-wgs.svg",
            });
        }
    };

    const value = {
        user,
        isUserLoading,
        userError,
        settingImages,
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
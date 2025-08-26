"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "@/lib/api/axiosInstance";

type ThemeImages = {
    light_image: string;
    dark_image: string;
};

type SettingContextType = {
    images: ThemeImages | null;
    fetchSetting: () => Promise<void>;
};

const SettingContext = createContext<SettingContextType>({
    images: null,
    fetchSetting: async () => { },
});

export const useSetting = () => useContext(SettingContext);

export const SettingProvider = ({ children }: { children: React.ReactNode }) => {
    const [images, setImages] = useState<ThemeImages | null>(null);

    const fetchSetting = async () => {
        try {
            const res = await axiosInstance.get("/setting");
            console.log(res.data.data.light_color.image)

            if (res?.data?.data?.light_color && res?.data?.data?.dark_color) {
                setImages({
                    light_image: res.data.data.light_color.image,
                    dark_image: res.data.data.dark_color.image ,
                });
            } else {
                // fallback kalau data tidak lengkap
                setImages({
                    light_image: "/images/logo-wgs.svg",
                    dark_image: "/images/logo-wgs.svg",
                });
            }
        } catch (error) {
            console.error("Failed to fetch setting:", error);
            // fallback default logo
            setImages({
                light_image: "/images/logo-wgs.svg",
                dark_image: "/images/logo-wgs.svg",
            });
        }
    };

    useEffect(() => {
        fetchSetting();
    }, []);

    return (
        <SettingContext.Provider value={{ images, fetchSetting }}>
            {children}
        </SettingContext.Provider>
    );
};

import axiosInstance from "@/lib/api/axiosInstance";

type ColorVariant = {
    background: string;
    foreground: string;
};

type CardVariant = {
    card: string;
    cardForeground: string;
};

type PrimaryVariant = {
    primary: string;
    primaryForeground: string;
};

type SecondaryVariant = {
    secondary: string;
    secondaryForeground: string;
};

type ThemeConfig = {
    light_image: string;
    dark_image: string;
    baseColor: ColorVariant;
    cardColor: CardVariant;
    primaryColor: PrimaryVariant;
    secondaryColor: SecondaryVariant;
};

export type SettingData = {
    id: string;
    light_color: ThemeConfig;
    dark_color: ThemeConfig;
};

export const fetchSettingData = async (): Promise<SettingData | null> => {
    try {
        const response = await axiosInstance.get("/setting");
        const data = response.data?.data;
        if (data && data.id && data.light_color && data.dark_color) {
            return data;
        }
    } catch (error) {
        console.error("Failed to fetch setting:", error);
    }
    return null;
};
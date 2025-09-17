import { SettingData } from '@/lib/api/service/setting';
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const applyThemeFromConfig = (
  configData: SettingData,
  mode: "light" | "dark" | "system"
) => {
  let selectedMode = mode;
  if (mode === "system") {
    const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    selectedMode = isDarkMode ? "dark" : "light";
  }

  const theme = selectedMode === "light" ? configData.light_color : configData.dark_color
  const root = document.documentElement

  root.style.setProperty("--background", theme.baseColor.background)
  root.style.setProperty("--foreground", theme.baseColor.foreground)

  root.style.setProperty("--card", theme.cardColor.card)
  root.style.setProperty("--card-foreground", theme.cardColor.cardForeground)

  root.style.setProperty("--primary", theme.primaryColor.primary)
  root.style.setProperty(
    "--primary-foreground",
    theme.primaryColor.primaryForeground
  )

  root.style.setProperty("--secondary", theme.secondaryColor.secondary)
  root.style.setProperty(
    "--secondary-foreground",
    theme.secondaryColor.secondaryForeground
  )
}

export const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/history": "History",
  "/mandatory": "Mandatory",
  "/adjust-history": "Adjust History",
  "/information": "Empolyee Information",
  "/forbidden": "Access Denied",
  "/admin/dashboard": "Admin Dashboard",
  "/admin/employee-list": "Employee List",
  "/admin/list-leave": "List Leave",
  "/admin/special-leave": "Special Leave",
  "/admin/mandatory": "Mandatory Leave",
  "/admin/adjust-balance": "Adjust Balance",
  "/admin/adjust-history": "Admin Adjust History",
  "/admin/information": "Admin Information"
}

export function getPageTitle(pathname: string): string {
  return pageTitles[pathname] ?? "My App"
}
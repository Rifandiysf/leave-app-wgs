'use client'
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useEffect, useState } from 'react'
import { useAppContext } from '@/lib/context/AppContext'

const SidebarSkeleton = () => (
  <aside className="w-64 flex-col hidden lg:flex bg-background h-full fixed lg:relative z-50 animate-pulse">
    <div className="bg-background p-7 pb-3">
      <div className="w-32 h-10 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
      <div className="w-48 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>
    <nav className="bg-card p-4 flex-1 relative rounded-se-4xl">
      <div className="font-semibold mt-8 space-y-2">
        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        <div className="!my-4 h-px bg-gray-400 dark:bg-gray-600" />
        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
      </div>
    </nav>
  </aside>
);


export default function Sidebar() {
  const pathname = usePathname()
  const { user, isUserLoading, settingImages, fetchSetting,fetchUserData } = useAppContext();
  const [logoSrc, setLogoSrc] = useState("/images/logo-wgs.svg");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    fetchSetting();
    fetchUserData();
  },[])
  useEffect(() => {
    if (!settingImages) return;

    const updateLogo = () => {
      const currentTheme = localStorage.getItem("theme") as "light" | "dark" | "system" | null;
      let darkMode = false;

      if (currentTheme === "dark") darkMode = true;
      else if (currentTheme === "light") darkMode = false;
      else darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

      setIsDarkMode(darkMode);
      setLogoSrc(darkMode ? settingImages.dark_image ?? "/images/logo-wgs.svg" : settingImages.light_image ?? "/images/logo-wgs.svg");
    };

    // update langsung saat mount
    updateLogo();

    // listener system theme change
    const darkMedia = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = (e: MediaQueryListEvent) => {
      const currentTheme = localStorage.getItem("theme");
      if (!currentTheme || currentTheme === "system") {
        updateLogo();
      }
    };
    darkMedia.addEventListener("change", listener);

    // listener localStorage theme change (jika theme diubah di tempat lain)
    const storageListener = (e: StorageEvent) => {
      if (e.key === "theme") updateLogo();
    };
    window.addEventListener("storage", storageListener);

    return () => {
      darkMedia.removeEventListener("change", listener);
      window.removeEventListener("storage", storageListener);
    };
  }, [settingImages]);


  const getLogoSrc = () => {
    if (!settingImages) return "/images/logo-wgs.svg";
    return isDarkMode ? (settingImages.dark_image ?? "/images/logo-wgs.svg") : (settingImages.light_image ?? "/images/logo-wgs.svg");
  };

  useEffect(() => {
    setLogoSrc(getLogoSrc());
  }, [settingImages, isDarkMode]);

  const isActive = (path: string) => pathname === path ? 'bg-background shadow-sm' : 'hover:bg-blue-200 hover:dark:bg-blue-900'
  const isBottomActive = (path: string) => pathname === path ? 'text-blue-700' : 'text-gray-500'

  const broadcastResetView = () => {
    window.dispatchEvent(new CustomEvent('resetLeaveView'));
  };

  if (isUserLoading) {
    return <SidebarSkeleton />;
  }

  const welcomeText = `Welcome, ${user?.fullname || 'Guest'}`;
  const userRole = user?.role;
  const isAdmin = userRole === 'admin' || userRole === 'super_admin';

  return (
    <>
      {isAdmin ? (
        <>
          {/* Sidebar Desktop Admin */}
          <aside className="w-64 flex-col hidden lg:flex bg-background h-full fixed lg:relative z-50">
            <div className="bg-background p-7 pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <Image src={logoSrc} alt="Logo WGS" width={90} height={90} priority />
                  <h2 className="text-2xl font-medium text-foreground mt-2 truncate">{welcomeText}</h2>
                </div>
              </div>
            </div>
            <nav className="bg-card p-4 flex-1 relative rounded-se-4xl">
              <div className="font-semibold mt-8 space-y-2">
                <Link href="/admin/dashboard" className={`flex items-center py-3 px-6 rounded-full transition-colors ${isActive('/admin/dashboard')}`}>
                  <i className="bi bi-person-workspace text-xl w-6 text-center" />
                  <span className="ml-3">Dashboard</span>
                </Link>
                <div className="!my-4 h-px bg-gray-400" />
                <Link href="/admin/employee-list" className={`flex items-center py-3 px-6 rounded-full transition-colors ${isActive('/admin/employee-list')}`}>
                  <i className="bi bi-person-circle text-xl w-6 text-center" />
                  <span className="ml-3">Employee List</span>
                </Link>
                <Link href="/admin/list-leave" onClick={broadcastResetView} className={`flex items-center py-3 px-6 rounded-full transition-colors ${isActive('/admin/list-leave')}`}>
                  <i className="bi bi-clock-history text-xl w-6 text-center" />
                  <span className="ml-3">List Of Leave</span>
                </Link>
                <Link href="/admin/special-leave" className={`flex items-center py-3 px-6 rounded-full transition-colors ${isActive('/admin/special-leave')}`}>
                  <i className="bi bi-asterisk text-xl w-6 text-center" />
                  <span className="ml-3">Special Leave</span>
                </Link>
                <Link href="/admin/mandatory" className={`flex items-center py-3 px-6 rounded-full transition-colors ${isActive('/admin/mandatory')}`}>
                  <i className="bi bi-archive-fill text-xl w-6 text-center" />
                  <span className="ml-3">Mandatory</span>
                </Link>
                <Link href="/admin/amount-leave" className={`flex items-center py-3 px-6 rounded-full transition-colors ${isActive('/admin/amount-leave')}`}>
                  <i className="bi bi-window-plus text-xl w-6 text-center" />
                  <span className="ml-3">Amount Leave</span>
                </Link>
                <Link href="/admin/adjust-history" className={`flex items-center py-3 px-6 rounded-full transition-colors ${isActive('/admin/adjust-history')}`}>
                  <i className="bi bi-journal-bookmark text-xl w-6 text-center" />
                  <span className="ml-3">Adjust History</span>
                </Link>
                <Link href="/admin/information" className={`flex items-center py-3 px-6 rounded-full transition-colors ${isActive('/admin/information')}`}>
                  <i className="bi bi-info-circle text-xl w-6 text-center" />
                  <span className="ml-3">Information</span>
                </Link>
              </div>
            </nav>
          </aside>

          {/* BOTTOM BAR ADMIN  */}
          <nav className="fixed bottom-0 left-0 w-full bg-white dark:bg-card border-t z-50 overflow-x-auto lg:hidden">
            <div className="flex flex-nowrap items-start px-2">
              <Link href="/admin/dashboard" className={`flex flex-col items-center text-center h-full pt-2 px-3 min-w-[85px] ${isBottomActive('/admin/dashboard')}`}>
                <i className="bi bi-person-workspace text-xl" />
                <span className="text-[10px] leading-tight mt-1">Dashboard</span>
              </Link>
              <Link href="/admin/employee-list" className={`flex flex-col items-center text-center h-full pt-2 px-3 min-w-[85px] ${isBottomActive('/admin/employee-list')}`}>
                <i className="bi bi-person-circle text-xl" />
                <span className="text-[10px] leading-tight mt-1">Employee List</span>
              </Link>
              <Link href="/admin/list-leave" onClick={broadcastResetView} className={`flex flex-col items-center text-center h-full pt-2 px-3 min-w-[85px] ${isBottomActive('/admin/list-leave')}`}>
                <i className="bi bi-clock-history text-xl" />
                <span className="text-[10px] leading-tight mt-1">List Of Leave</span>
              </Link>
              <Link href="/admin/special-leave" className={`flex flex-col items-center text-center h-full pt-2 px-3 min-w-[85px] ${isBottomActive('/admin/special-leave')}`}>
                <i className="bi bi-asterisk text-xl" />
                <span className="text-[10px] leading-tight mt-1">Special Leave</span>
              </Link>
              <Link href="/admin/mandatory" className={`flex flex-col items-center text-center h-full pt-2 px-3 min-w-[85px] ${isBottomActive('/admin/mandatory')}`}>
                <i className="bi bi-archive-fill text-xl" />
                <span className="text-[10px] leading-tight mt-1">Mandatory</span>
              </Link>
              <Link href="/admin/amount-leave" className={`flex flex-col items-center text-center h-full pt-2 px-3 min-w-[85px] ${isBottomActive('/admin/amount-leave')}`}>
                <i className="bi bi-window-plus text-xl" />
                <span className="text-[10px] leading-tight mt-1">Amount Leave</span>
              </Link>
              <Link href="/admin/adjust-history" className={`flex flex-col items-center text-center h-full pt-2 px-3 min-w-[85px] ${isBottomActive('/admin/adjust-history')}`}>
                <i className="bi bi-journal-bookmark text-xl" />
                <span className="text-[10px] leading-tight mt-1">Adjust History</span>
              </Link>
              <Link href="/admin/information" className={`flex flex-col items-center text-center h-full pt-2 px-3 min-w-[85px] ${isBottomActive('/admin/information')}`}>
                <i className="bi bi-info-circle text-xl" />
                <span className="text-[10px] leading-tight mt-1">Information</span>
              </Link>
            </div>
          </nav>
        </>
      ) : (
        <>
          {/* Sidebar User */}
          <aside className="w-64 flex-col hidden lg:flex bg-background h-full fixed lg:relative z-50">
            <div className="bg-background p-7 pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <Image src={logoSrc} alt="Logo WGS" width={90} height={90} priority />
                  <h2 className="text-2xl font-medium text-foreground mt-2 truncate">{welcomeText}</h2>
                </div>
              </div>
            </div>
            <nav className="bg-card p-4 flex-1 pt-5 relative rounded-se-4xl">
              <div className="font-semibold mt-8 space-y-2">
                <Link href="/" className={`flex items-center py-3 px-6 rounded-full transition-colors ${isActive('/')}`}>
                  <i className="bi bi-person-workspace text-xl w-6 text-center" />
                  <span className="ml-3">Dashboard</span>
                </Link>
                <div className="!my-4 h-px bg-gray-400" />
                <Link href="/history" className={`flex items-center py-3 px-6 rounded-full transition-colors ${isActive('/history')}`}>
                  <i className="bi bi-clock-history text-xl w-6 text-center" />
                  <span className="ml-3">History</span>
                </Link>
                <Link href="/mandatory" className={`flex items-center py-3 px-6 rounded-full transition-colors ${isActive('/mandatory')}`}>
                  <i className="bi bi-archive-fill text-xl w-6 text-center" />
                  <span className="ml-3">Mandatory</span>
                </Link>
                <Link href="/adjust-history" className={`flex items-center py-3 px-6 rounded-full transition-colors ${isActive('/adjust-history')}`}>
                  <i className="bi bi-journal-bookmark text-xl w-6 text-center" />
                  <span className="ml-3">Adjust History</span>
                </Link>
                <Link href="/information" className={`flex items-center py-3 px-6 rounded-full transition-colors ${isActive('/information')}`}>
                  <i className="bi bi-info-circle text-xl w-6 text-center" />
                  <span className="ml-3">Information</span>
                </Link>
              </div>
            </nav>
          </aside>

          {/* Bottombar User */}
          <nav className="fixed bottom-0 left-0 w-full bg-white dark:bg-card border-t z-50 flex justify-around items-center py-2 lg:hidden">
            <Link href="/" className={`flex flex-col items-center text-xs ${isBottomActive('/')}`}>
              <i className={`bi bi-person-workspace text-xl`} />
              <span>Dashboard</span>
            </Link>
            <Link href="/history" className={`flex flex-col items-center text-xs ${isBottomActive('/history')}`}>
              <i className={`bi bi-clock-history text-xl`} />
              <span>History</span>
            </Link>
            <Link href="/mandatory" className={`flex flex-col items-center text-xs ${isBottomActive('/mandatory')}`}>
              <i className={`bi bi-archive-fill text-xl`} />
              <span>Mandatory</span>
            </Link>
            <Link href="/adjust-history" className={`flex flex-col items-center text-xs ${isBottomActive('/addjust-history')}`}>
              <i className={`bi bi-journal-bookmark text-xl`} />
              <span>Adjust History</span>
            </Link>
            <Link href="/information" className={`flex flex-col items-center text-xs ${isBottomActive('/information')}`}>
              <i className={`bi bi-info-circle text-xl`} />
              <span>Information</span>
            </Link>
          </nav>
        </>
      )}
    </>
  )
}
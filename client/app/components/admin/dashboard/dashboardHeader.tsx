'use client';

export const DashboardHeader = () => (
    <div className="flex flex-col mb-4">
        <div className="sm:hidden w-full bg-background pb-4 sticky top-[-1rem] z-10">
            <h1 className="text-2xl font-bold text-foreground mt-5">Dashboard Admin</h1>
            <p className="text-muted-foreground text-sm mt-2">Summary of employee information and statistics</p>
        </div>
        <div className="hidden sm:flex items-center space-x-4 flex-1">
            <div className="flex-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2 truncate">Dashboard Admin</h1>
                <p className="text-muted-foreground text-sm sm:text-base">Summary of employee information and statistics</p>
            </div>
        </div>
    </div>
);

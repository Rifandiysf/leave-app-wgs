'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/app/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/app/components/ui/popover';
import { Button } from '@/app/components/ui/button';
import { Employee } from "@/app/hooks/admin/UseEmployeeListData";
import AllHistory from '@/app/components/ui/Modal/AllHistory'; 
import { LeaveChart } from '@/app/components/ui/LeaveChart/LeaveChart';

type ActionMenuProps = {
    user: Employee & { tanggalMasukKerja?: string };
};

const ActionMenu = ({ user }: ActionMenuProps) => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [isStatsDialogOpen, setIsStatsDialogOpen] = useState(false);
    const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

    const handleStatisticsClick = () => {
        setIsPopoverOpen(false);
        setIsStatsDialogOpen(true);
    };
    
    const handleHistoryClick = () => {
        setIsPopoverOpen(false);
        setIsHistoryModalOpen(true);
    };

    return (
        <>
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                    <Button variant={'ghost'} size={'icon'} className='cursor-pointer transition-colors'>
                        <i className="bi bi-three-dots-vertical"></i>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className='w-40 py-2 px-0' align='end'>
                    <Button 
                        variant={'ghost'} 
                        className='rounded-none w-full justify-start px-4 cursor-pointer' 
                        onClick={handleStatisticsClick}
                    >
                        <i className="bi bi-bar-chart-line-fill mr-2"></i>
                        Statistic
                    </Button>
                    <Button 
                        variant={'ghost'} 
                        className='rounded-none w-full justify-start px-4 cursor-pointer'
                        onClick={handleHistoryClick}
                    >
                        <i className="bi bi-clock-history mr-2"></i>
                        History
                    </Button>
                </PopoverContent>
            </Popover>

            <Dialog open={isStatsDialogOpen} onOpenChange={setIsStatsDialogOpen}>
                <DialogContent className='sm:max-w-3xl p-6'>
                    <DialogHeader>
                        <DialogTitle>{user.fullname}'s Leave Statistics</DialogTitle>
                    </DialogHeader>
                    {isStatsDialogOpen && user.tanggalMasukKerja && <LeaveChart nik={user.nik} join_date={user.tanggalMasukKerja} />}
                </DialogContent>
            </Dialog>

            <AllHistory 
                user={user} 
                isOpen={isHistoryModalOpen} 
                onClose={() => setIsHistoryModalOpen(false)} 
            />
        </>
    );
};

export default ActionMenu;


'use client'

import 'bootstrap-icons/font/bootstrap-icons.css';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from '@/app/components/ui/popover';
import { Button } from '@/app/components/ui/button';
import { useState } from 'react';
import { LeaveChart } from '@/app/components/ui/LeaveChart/LeaveChart';

type UserData = {
    nik: string;
    fullname: string;
    tanggalMasukKerja: string; 
};

type StatisticsProps = {
    user: UserData;
};

const Statistics = ({ user }: StatisticsProps) => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleStatisticsClick = () => {
        setIsPopoverOpen(false); 
        setIsDialogOpen(true);   
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                    <Button variant={'ghost'} size={'icon'} className='cursor-pointer transition-colors'>
                        <i className="bi bi-three-dots-vertical"></i>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className='w-36 py-2 px-0' align='end'>
                    <Button variant={'ghost'} className='rounded-none w-full justify-start px-4 cursor-pointer' onClick={handleStatisticsClick}>
                        <i className="bi bi-bar-chart-line-fill mr-2"></i>
                        Statistic
                    </Button>
                </PopoverContent>
            </Popover>
            <DialogContent className='sm:max-w-3xl p-6'>
                <DialogHeader>
                    <DialogTitle>{user.fullname}'s Leave Statistics</DialogTitle>
                </DialogHeader>
                {isDialogOpen && <LeaveChart nik={user.nik} join_date={user.tanggalMasukKerja} />}
            </DialogContent>
        </Dialog>
    );
};

export default Statistics;
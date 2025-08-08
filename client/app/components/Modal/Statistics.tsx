import 'bootstrap-icons/font/bootstrap-icons.css'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { useState } from 'react'
import { LeaveChart } from '../ui/leaveChart'

const Statistics = () => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleStatisticsClick = () => {
        setIsPopoverOpen(false);
        setIsDialogOpen(true); 
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                    <Button variant={'ghost'} size={'icon'} className='cursor-pointer transition-colors'>
                        <i className="bi bi-three-dots-vertical"></i>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className='w-36 py-2 px-0' align='end'>
                    <Button variant={'ghost'} className='rounded-none w-full cursor-pointer' onClick={handleStatisticsClick}>
                        Statistic
                    </Button>
                </PopoverContent>
            </Popover>
            <DialogContent className='sm:max-w-2xl p-4'>
                <DialogHeader>
                    <DialogTitle>Andi Admin Leave Statistics</DialogTitle>
                </DialogHeader>
                <LeaveChart/>
            </DialogContent>
        </Dialog >
    )
}

export default Statistics
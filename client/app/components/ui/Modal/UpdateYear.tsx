'use client'

import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button } from "../button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../dialog"
import { DialogClose } from '@radix-ui/react-dialog';
import { Card } from '../card';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useUpdateMandatoryYear } from '@/app/hooks/admin/UseUpdateYear';
import { useState } from 'react';

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 10 }, (_, i) => currentYear + i);

const UpdateYear = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const { state, dispatch, handleSubmit } = useUpdateMandatoryYear(() => {
        setIsDialogOpen(false)
        window.location.reload()
    });

    const selectedIndex = years.indexOf(state.selectedYear);

    const handlePrev = () => {
        if (selectedIndex > 0) {
            dispatch({ type: "SET_FIELD", field: "selectedYear", value: years[selectedIndex - 1] });
        }
    };

    const handleNext = () => {
        if (selectedIndex < years.length - 1) {
            dispatch({ type: "SET_FIELD", field: "selectedYear", value: years[selectedIndex + 1] });
        }
    };

    const itemWidth = 6;
    const offset = `calc(50% - ${itemWidth / 2}rem - ${selectedIndex * itemWidth}rem)`;

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button className="cursor-pointer">
                    <i className="bi bi-calendar"></i> Update Year
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Year</DialogTitle>
                    <DialogDescription>Update mandatory leave year</DialogDescription>
                </DialogHeader>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                >
                    <Card className="flex justify-center items-center rounded-md mb-5 shadow-none border-none p-4">
                        <div className="flex items-center w-full max-w-xs">
                            {/* Prev Button*/}
                            <button
                                type="button"
                                onClick={handlePrev}
                                disabled={selectedIndex === 0}
                                className="text-gray-500 hover:text-black disabled:opacity-30 p-2 z-10"
                            >
                                <ChevronLeftIcon className="text-xl text-foreground cursor-pointer" />
                            </button>

                            {/* Year Slider*/}
                            <div className="flex-grow overflow-hidden h-12">
                                <div
                                    className="flex items-center h-full transition-transform duration-500 ease-in-out"
                                    style={{ transform: `translateX(${offset})` }}
                                >
                                    {years.map((year) => (
                                        <div
                                            key={year}
                                            onClick={() => dispatch({ type: "SET_FIELD", field: "selectedYear", value: year })}
                                            className={`
                                                flex-shrink-0 w-24 h-full flex items-center justify-center 
                                                cursor-pointer text-lg transition-all duration-500
                                                ${state.selectedYear === year
                                                    ? "text-blue-600 font-extrabold border-x-[1.5px] border-border scale-125"
                                                    : "text-gray-400 font-medium border-none scale-90"
                                                }
                                            `}
                                        >
                                            {year}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Next Button*/}
                            <button
                                type="button"
                                onClick={handleNext}
                                disabled={selectedIndex === years.length - 1}
                                className="text-gray-500 hover:text-black disabled:opacity-30 p-2 z-10"
                            >
                                <ChevronRightIcon className="text-xl text-foreground cursor-pointer" />
                            </button>
                        </div>
                    </Card>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant={"ghost"} disabled={state.loading}>
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            variant={"secondary"}
                            className="text-white"
                            disabled={state.loading}
                        >
                            {state.loading ? "Submitting..." : "Submit"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateYear
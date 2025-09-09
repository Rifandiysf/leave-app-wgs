'use client'

import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from 'react';
import { Button } from "../button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../dialog"
import { DialogClose } from '@radix-ui/react-dialog';
import { Card } from '../card';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 10 }, (_, i) => currentYear + i);

const UpdateYear = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handlePrev = () => {
        setSelectedIndex((prevIndex) => Math.max(0, prevIndex - 1));
    };

    const handleNext = () => {
        setSelectedIndex((prevIndex) => Math.min(years.length - 1, prevIndex + 1));
    };

    const itemWidth = 6;
    const offset = `calc(50% - ${itemWidth / 2}rem - ${selectedIndex * itemWidth}rem)`;

    return (
        <Dialog>
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
                <form>
                    <Card className="flex justify-center items-center rounded-md mb-5 shadow-none border-none p-4">
                        <div className="flex items-center w-full max-w-xs">
                            {/* Tombol Prev */}
                            <button
                                type="button"
                                onClick={handlePrev}
                                disabled={selectedIndex === 0}
                                className="text-gray-500 hover:text-black disabled:opacity-30 p-2 z-10"
                            >
                                <ChevronLeftIcon className='text-xl text-foreground cursor-pointer'/>
                            </button>

                            {/* Viewport untuk slider tahun */}
                            <div className="flex-grow overflow-hidden h-12">
                                <div
                                    className="flex items-center h-full transition-transform duration-500 ease-in-out"
                                    style={{ transform: `translateX(${offset})` }}
                                >
                                    {years.map((year, index) => (
                                        <div
                                            key={year}
                                            onClick={() => setSelectedIndex(index)}
                                            className={`
                                                flex-shrink-0 w-24 h-full flex items-center justify-center 
                                                cursor-pointer text-lg transition-all duration-500
                                                ${selectedIndex === index
                                                    ? 'text-blue-600 font-extrabold border-x-[1.5px] border-border scale-125'
                                                    : 'text-gray-400 font-medium border-none scale-90'
                                                }
                                            `}
                                        >
                                            {year}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Tombol Next */}
                            <button
                                type="button"
                                onClick={handleNext}
                                disabled={selectedIndex === years.length - 1}
                                className="text-gray-500 hover:text-black disabled:opacity-30 p-2 z-10"
                            >
                                <ChevronRightIcon className='text-xl text-foreground cursor-pointer'/>
                            </button>
                        </div>
                    </Card>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant={"ghost"}>Cancel</Button>
                        </DialogClose>
                        <Button type="submit" variant={"secondary"} className="text-white">
                            Submit
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateYear;
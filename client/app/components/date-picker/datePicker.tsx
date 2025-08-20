"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { Calendar } from "@/app/components/ui/calendar"
import { Label } from "@/app/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/ui/popover"
import { cn } from "@/lib/utils"
import { DateRange, SelectSingleEventHandler, SelectRangeEventHandler } from "react-day-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

type DatePickerFieldProps = {
    label: string;
    className?: string;
    mode?: "single" | "range";
    disablePastAndWeekends?: boolean;
} & (
        | {
            mode?: "single";
            value: Date | undefined;
            onChange: (date: Date | undefined) => void;
        }
        | {
            mode: "range";
            value: DateRange | undefined;
            onChange: (range: DateRange | undefined) => void;
        }
    );

export function DatePickerField({
    label,
    value,
    onChange,
    className,
    mode = "range",
    disablePastAndWeekends = true,
}: DatePickerFieldProps) {
    const [open, setOpen] = React.useState(false)
    const now = new Date()
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const currentYear = now.getFullYear()
    const years = Array.from({ length: 7 }, (_, i) => currentYear - 3 + i)
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]

    let initialDate: Date = now;
    if (mode === "single") {
        initialDate = (value as Date | undefined) ?? now;
    } else {
        initialDate = (value as DateRange | undefined)?.from ?? now;
    }
    const [selectedMonth, setSelectedMonth] = React.useState<number>(initialDate.getMonth());
    const [selectedYear, setSelectedYear] = React.useState<number>(initialDate.getFullYear());

    const handleMonthChange = (monthIndex: number) => {
        setSelectedMonth(monthIndex)
    }

    const handleYearChange = (year: number) => {
        setSelectedYear(year)
    }

    const formatLabel = () => {
        if (mode === "single") {
            const singleDate = value as Date | undefined;
            return singleDate
                ? singleDate.toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                })
                : "Select date";
        } else {
            const dateRange = value as DateRange | undefined;
            if (dateRange?.from && dateRange?.to) {
                return `${dateRange.from.toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                })} -> ${dateRange.to.toLocaleDateString('en-GB',
                    {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                    }
                )}`
            } else if (dateRange?.from) {
                return `${dateRange.from.toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                })}`
            } else {
                return "Select date"
            }
        }
    }

    const getDisabledDates = (date: Date) => {
        if (disablePastAndWeekends) {
            const day = date.getDay();
            return day === 0 || day === 6 || date < today;
        }
        return false;
    };

    return (
        <div className="flex flex-col gap-3 w-full">
            <Label htmlFor={label.toLowerCase()} className="px-1">
                {label}
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id={label.toLowerCase()}
                        className={cn(
                            'w-full justify-between font-normal',
                            className
                        )}
                    >
                        {formatLabel()}
                        <ChevronDownIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-4" align="start">
                    <div className="flex gap-2 mb-4">
                        <Select
                            value={selectedMonth.toString()}
                            onValueChange={(val) => handleMonthChange(Number(val))}
                        >
                            <SelectTrigger className="w-[140px]">
                                <SelectValue placeholder="Month" />
                            </SelectTrigger>
                            <SelectContent>
                                {months.map((month, index) => (
                                    <SelectItem key={month} value={index.toString()}>
                                        {month}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select
                            value={selectedYear.toString()}
                            onValueChange={(val) => handleYearChange(Number(val))}
                        >
                            <SelectTrigger className="w-[100px]">
                                <SelectValue placeholder="Year" />
                            </SelectTrigger>
                            <SelectContent>
                                {years.map((year) => (
                                    <SelectItem key={year} value={year.toString()}>
                                        {year}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    {mode === "single" ? (
                        <Calendar
                            mode="single"
                            selected={value as Date | undefined}
                            month={new Date(selectedYear, selectedMonth)}
                            onMonthChange={(newDate) => {
                                setSelectedMonth(newDate.getMonth());
                                setSelectedYear(newDate.getFullYear());
                            }}
                            onSelect={onChange as SelectSingleEventHandler}
                            disabled={getDisabledDates}
                            modifiers={{
                                weekend: (date) => date.getDay() === 0 || date.getDay() === 6,
                            }}
                            modifiersClassNames={{
                                weekend: "text-red-700",
                            }}
                            numberOfMonths={1}
                        />
                    ) : (
                        <Calendar
                            mode="range"
                            selected={value as DateRange | undefined}
                            month={new Date(selectedYear, selectedMonth)}
                            onMonthChange={(newDate) => {
                                setSelectedMonth(newDate.getMonth());
                                setSelectedYear(newDate.getFullYear());
                            }}
                            onSelect={onChange as SelectRangeEventHandler}
                            disabled={getDisabledDates}
                            modifiers={{
                                weekend: (date) => date.getDay() === 0 || date.getDay() === 6,
                            }}
                            modifiersClassNames={{
                                weekend: "text-red-700",
                            }}
                            numberOfMonths={1}
                        />
                    )}
                </PopoverContent>
            </Popover>
        </div>
    )
}

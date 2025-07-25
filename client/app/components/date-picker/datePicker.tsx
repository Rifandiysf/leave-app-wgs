"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { Calendar } from "@/app/components/ui/calendar"
import { Label } from "@/app/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/app/components/ui/popover"
import { cn } from "@/lib/utils"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/app/components/ui/select"

type DatePickerFieldProps = {
    label: string
    value: Date | undefined
    onChange: (date: Date | undefined) => void
    className?: string
}

export function DatePickerField({
    label,
    value,
    onChange,
    className,
}: DatePickerFieldProps) {
    const [open, setOpen] = React.useState(false)
    const now = new Date()
    const currentYear = now.getFullYear()
    const years = Array.from({ length: 7 }, (_, i) => currentYear - 3 + i)
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]

    const [selectedMonth, setSelectedMonth] = React.useState<number>((value ?? now).getMonth())
    const [selectedYear, setSelectedYear] = React.useState<number>((value ?? now).getFullYear())

    const handleMonthChange = (monthIndex: number) => {
        setSelectedMonth(monthIndex)
    }

    const handleYearChange = (year: number) => {
        setSelectedYear(year)
    }

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
                        {value ? value.toLocaleDateString() : "Select date"}
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

                    <Calendar
                        mode="single"
                        selected={value}
                        month={new Date(selectedYear, selectedMonth)}
                        onMonthChange={(newDate) => {
                            setSelectedMonth(newDate.getMonth());
                            setSelectedYear(newDate.getFullYear());
                        }}
                        onSelect={(date) => {
                            onChange(date)
                            setOpen(false)
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}

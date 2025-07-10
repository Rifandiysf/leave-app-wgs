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

type DatePickerFieldProps = {
    label: string
    value: Date | undefined
    onChange: (date: Date | undefined) => void
}

export function DatePickerField({ label, value, onChange }: DatePickerFieldProps) {
    const [open, setOpen] = React.useState(false)

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
                        className="w-full justify-between font-normal"
                    >
                        {value ? value.toLocaleDateString() : "Select date"}
                        <ChevronDownIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={value}
                        captionLayout="dropdown"
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

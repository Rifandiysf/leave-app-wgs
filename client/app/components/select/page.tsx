import * as React from "react"
import { ReactNode } from "react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectTrigger,
    SelectValue,
} from "../ui/select"

type SelectCustomProps = {
    placeholder?: string
    children?: ReactNode
    className?: string
    value?: string
    defaultValue?: string
    disabled?: boolean
    onValueChange?: (value: string) => void
}

export function SelectDemo({
    placeholder,
    children,
    className,
    value,
    defaultValue,
    disabled,
    onValueChange,
}: SelectCustomProps) {
    return (
        <Select
            value={value}
            defaultValue={defaultValue}
            onValueChange={onValueChange}
            disabled={disabled}
        >
            <SelectTrigger className={className}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {children || <div className="px-2 py-1 text-sm text-gray-500">Tidak ada pilihan</div>}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

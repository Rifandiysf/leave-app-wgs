import * as React from "react"
import { ReactNode } from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectTrigger,
    SelectValue,
} from "../ui/select"

type SelectDemoProps = {
    placeholder?: string,
    children: ReactNode,
    className?: string
}

export function SelectDemo({ placeholder , children, className }: SelectDemoProps) {
    return (
        <Select>
            <SelectTrigger className={className}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {children}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

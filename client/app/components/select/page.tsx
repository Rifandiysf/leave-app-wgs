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
    children: ReactNode
}

export function SelectDemo({ placeholder , children }: SelectDemoProps) {
    return (
        <Select>
            <SelectTrigger className="w-[180px]">
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

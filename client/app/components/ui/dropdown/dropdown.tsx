"use client"

import React, { useState } from "react"
import { Switch } from "../switch"

type DropdownProps = {
    initial?: boolean,
    onChange?: (value: boolean) => void,
    idx: number,
    title: string,
    startLeave: string,
    endLeave: string
}

export function DropDownButton({ initial = false, onChange, idx, title, startLeave, endLeave }: DropdownProps) {
    const [isOn, setIsOn] = useState(initial)

    const DropDown = () => {
        const newValue = !isOn
        setIsOn(newValue)
        onChange?.(newValue)
    }

    return (
        <div key={idx} className='Relative w-full col-span-2'>
            <div onClick={DropDown} className='absolute flex justify-between items-center gap-5 rounded-lg border-[1.5px] border-[#0000001f] hover:bg-primary hover:shadow-xl transition delay-150 w-full p-5 cursor-pointer'>
                <h1 className='text-2xl font-bold'>{title}</h1>
                <div>
                    <i className="bi bi-caret-down-fill"></i>
                </div>
            </div>
            <div className={`flex justify-between items-center px-3 py-2 rounded-b-lg bottom-0 ${isOn ? "translate-y-7" : "translate-y-1"}`}>
                <p>{startLeave} - {endLeave}</p>
                <Switch />
            </div>
        </div>
    )
}
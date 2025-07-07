"use client"

import React, { useState } from "react"

type ToggleSwitchProps = {
    initial?: boolean
    onChange?: (value: boolean) => void
}

export function ToggleSwitch({ initial = false, onChange }: ToggleSwitchProps) {
    const [isOn, setIsOn] = useState(initial)

    const toggle = () => {
        const newValue = !isOn
        setIsOn(newValue)
        onChange?.(newValue)
    }

    return (            
        <button
            onClick={toggle}
            className={`relative w-14 h-8 flex items-center rounded-full transition-colors duration-300 ${isOn ? "bg-primary" : "bg-gray-300"}`}
        >
            <span
                className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isOn ? "translate-x-7" : "translate-x-1"}`}
            />
        </button>
    )
}

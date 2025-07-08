"use client"

import 'bootstrap-icons/font/bootstrap-icons.css'
import React, { useState } from 'react'
import { ToggleSwitch } from '../components/toggle/page'

const MandatoryPage = () => {
    const dataMandatory = [
        {
            title: "Libur Lebaran",
            startLeave: "30 March 2025",
            endLeave: "31 March 2025",
        },
        {
            title: "Libur Natal",
            startLeave: "25 December 2025",
            endLeave: "25 December 2025",
        },
        {
            title: "Libur Tahun Baru",
            startLeave: "01 January 2026",
            endLeave: "01 January 2026",
        },
        {
            title: "Libur Kemerdekaan",
            startLeave: "17 August 2025",
            endLeave: "17 August 2025",
        },
    ]

    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const handleToggle = (index: number) => {
        setOpenIndex(prev => prev === index ? null : index)
    }

    return (
        <>
            <section className='p-2'>
                <div className='grid grid-cols-4 grid-rows-2 gap-3'>
                    {dataMandatory.map((data, idx) => (
                        <div key={idx} className='w-full col-span-2'>
                            <div
                                className='flex justify-between items-center gap-5 rounded-lg border-[1.5px] border-[#0000001f] hover:bg-primary hover:shadow-xl transition delay-150 w-full p-2 cursor-pointer'
                                onClick={() => handleToggle(idx)}
                            >
                                <h1 className='text-xl font-bold'>{data.title}</h1>
                                <i className={`bi ${openIndex === idx ? "bi-caret-up-fill" : "bi-caret-down-fill"}`}></i>
                            </div>

                            <div
                                className={`
                                    transition-all duration-300 ease-in-out overflow-hidden 
                                    ${openIndex === idx ? "max-h-40 py-2" : "max-h-0 py-0"}
                                `}
                            >
                                <div className='flex justify-between items-center p-2 bg-gray-100 rounded-lg'>
                                    <p>{data.startLeave} - {data.endLeave}</p>
                                    <ToggleSwitch />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}

export default MandatoryPage

"use client"

import withAuth from "@/lib/auth/withAuth"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "../../components/ui/accordion"
import { Switch } from "../../components/ui/switch"

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

    return (
        <section className="p-4">
            <Accordion type="multiple" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {dataMandatory.map((data, idx) => (
                    <AccordionItem key={idx} value={`item-${idx}`} className="border-[1.5px] border-[#0000001f] rounded-xl shadow-sm">
                        <AccordionTrigger className="flex justify-between items-center p-4 text-left font-semibold text-lg">
                            <span>{data.title}</span>
                        </AccordionTrigger>
                        <AccordionContent className="p-4 bg-gray-50 rounded-b-xl">
                            <div className="flex justify-between items-center">
                                <p className="text-sm text-gray-700">
                                    {data.startLeave} - {data.endLeave}
                                </p>
                                <Switch />
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    )
}

export default MandatoryPage /*withAuth()*/

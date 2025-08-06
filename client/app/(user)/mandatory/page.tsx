"use client"

import 'bootstrap-icons/font/bootstrap-icons.css'
import { Card } from "@/app/components/ui/card"
import { Switch } from "../../components/ui/switch"
import { Label } from "@/app/components/ui/label"
import { formatDate } from "@/lib/format"
import { useEffect, useState } from 'react'
import axiosInstance from '@/lib/api/axiosInstance'

type MandatoryType = {
    id_mandatory: string
    title: string
    is_active: boolean
    description: string
    start_date: string
    end_date: string
    message: string
}

const SkeletonCard = () => {
    return (
        <div className="bg-gray-100 gap-1.5 border-none shadow-none min-h-54 p-1.5 rounded-md animate-pulse">
            <div className="bg-gray-300 border-none shadow-none p-3 rounded-sm space-y-2">
                <div className="h-5 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-300 rounded w-full"></div>
                <div className="mt-3 space-y-1">
                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                    <div className="flex items-center gap-2">
                        <div className="h-5 w-20 bg-gray-300 rounded-full"></div>
                        <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
                        <div className="h-5 w-20 bg-gray-300 rounded-full"></div>
                    </div>
                </div>
            </div>
            <div className='flex justify-between items-center mx-2 mt-2'>
                <div className='space-y-1'>
                    <div className="h-4 bg-gray-300 rounded w-24"></div>
                    <div className="h-3 bg-gray-300 rounded w-40"></div>
                </div>
                <div className="h-6 w-10 bg-gray-300 rounded-full"></div>
            </div>
        </div>
    )
}


const MandatoryPage = () => {
    const [dataMandatory, setMandatory] = useState<MandatoryType[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const fetchMandatoryData = async () => {
        try {
            const res = await axiosInstance.get('/users/mandatory')
            console.log(res.data.data)
            setMandatory(res.data.data)
        } catch (error) {
            console.error('Error fetching data:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMandatoryData()
    }, [])

    const isSameDay = (startDateStr: string, endDateStr: string) => {
        const start = new Date(startDateStr)
        const end = new Date(endDateStr)
        return (
            start.getFullYear() === end.getFullYear() &&
            start.getMonth() === end.getMonth() &&
            start.getDate() === end.getDate()
        )
    }

    return (
        <section className="p-4">
            <div className="flex justify-center items-center my-2 border-b-[1.5px] border-accent">
                <h1 className="text-2xl font-bold">Mandatory</h1>
            </div>
            {loading ? (
                <div className='grid grid-cols-2 gap-3'>
                {Array.from({ length: 4 }).map((_, idx) => (
                    <SkeletonCard key={idx} />
                ))}
            </div>
            ) : dataMandatory.length === 0 ? (
                <div className='flex justify-center items-center'>
                    <h1 className="text-2xl font-bold">No Mandatory Leave Available</h1>
                </div>
            ) : (
                <div className='grid grid-cols-2 gap-3 mb-16'>
                    {dataMandatory.map((data, idx) => {
                        const singleDay = isSameDay(data.start_date, data.end_date)

                        return (
                            <Card key={idx} className="gap-1.5 border-none shadow-none min-h-54 p-1.5 rounded-md">
                                <Card className="bg-[#dde8ffab] border-none shadow-none p-3 rounded-sm">
                                    <div>
                                        <Label className="text-xl font-semibold mb-1">{data.title}</Label>
                                        <p className=" text-gray-600 text-sm">{data.description}</p>
                                    </div>
                                    <div>
                                        <Label className="text-base font-semibold">Periode</Label>
                                        <div className="flex items-center gap-2">
                                            <p className="text-xs font-bold bg-white py-1 px-2.5 rounded-full">{formatDate(data.start_date)}</p>
                                            {!singleDay && (
                                                <>
                                                    <i className="bi bi-arrow-right-short"></i>
                                                    <p className="text-xs font-bold bg-white py-1 px-2.5 rounded-full">{formatDate(data.end_date)}</p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                                <div className='flex justify-between items-center mx-2'>
                                    <div className='flex flex-col'>
                                        <Label className='font-bold text-lg'>Apply Segera</Label>
                                        <p className='text-xs font-medium text-red-400'>{data.message}</p>
                                    </div>
                                    <Switch />
                                </div>
                            </Card>
                        )
                    })}
                </div>
            )}
        </section>
    )
}

export default MandatoryPage

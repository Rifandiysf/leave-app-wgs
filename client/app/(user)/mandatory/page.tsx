"use client"

import 'bootstrap-icons/font/bootstrap-icons.css'
import { useEffect, useState } from 'react'
import axiosInstance from '@/lib/api/axiosInstance'
import { formatDate } from '@/lib/format'

import { Card } from "@/app/components/ui/card"
import { Label } from "@/app/components/ui/label"
import { Switch } from "@/app/components/ui/switch"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/app/components/ui/dialog"
import { Button } from "@/app/components/ui/button"

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

    const [appliedStatus, setAppliedStatus] = useState<Record<string, 'approved' | 'rejected'>>({})
    const [selectedMandatory, setSelectedMandatory] = useState<MandatoryType | null>(null)
    const [isApply, setIsApply] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [cancelReason, setCancelReason] = useState("")

    const fetchMandatoryData = async () => {
        try {
            const res = await axiosInstance.get('/users/mandatory?limit=50')
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

    const isWithin7Days = (startDate: string) => {
        const today = new Date()
        const start = new Date(startDate)
        const diffTime = start.getTime() - today.getTime()
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return diffDays <= 7
    }

    const handleToggleChange = (checked: boolean, item: MandatoryType) => {
        setSelectedMandatory(item)
        setIsApply(checked)
        setCancelReason("")
        setShowConfirmModal(true)
    }

    const handleConfirmSubmit = async () => {
        if (!selectedMandatory) return
        setIsLoading(true)

        try {
            const payload = {
                id_mandatory: selectedMandatory.id_mandatory,
                leave_type: "mandatory_leave",
                status: isApply ? "approved" : "rejected",
                ...(isApply ? {} : { reason: cancelReason }),
            }

            await axiosInstance.post('/users/leave', payload)

            setAppliedStatus(prev => ({
                ...prev,
                [selectedMandatory.id_mandatory]: isApply ? "approved" : "rejected"
            }))

            setShowConfirmModal(false)
        } catch (err) {
            console.error("Failed submit:", err)
        } finally {
            setIsLoading(false)
        }
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
                                        <p className={`text-xs font-medium ${appliedStatus[data.id_mandatory] === 'approved' ? 'text-green-500' : 'text-red-500'}`}>
                                            {appliedStatus[data.id_mandatory] === 'approved' && "✓ Approved"}
                                            {appliedStatus[data.id_mandatory] === 'rejected' && "✕ Rejected"}
                                        </p>
                                    </div>
                                    <Switch
                                        checked={appliedStatus[data.id_mandatory] === 'approved'}
                                        onCheckedChange={(checked) => handleToggleChange(checked, data)}
                                        disabled={isWithin7Days(data.start_date)}
                                    />
                                </div>
                            </Card>
                        )
                    })}
                </div>
            )}

            {/* MODAL KONFIRMASI */}
            <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
                <DialogContent className="sm:max-w-[450px]">
                    <DialogHeader className="text-center">
                        <DialogTitle className="text-lg font-semibold">
                            {isApply ? "Confirm Leave Application" : "Cancel Leave Application"}
                        </DialogTitle>
                        <DialogDescription className="text-center mt-2">
                            {isApply ? (
                                <>
                                    Are you sure you want to apply for mandatory leave on
                                    <br />
                                    <span className="font-medium text-gray-900">
                                        {selectedMandatory && formatDate(selectedMandatory.start_date)}
                                    </span>?
                                </>
                            ) : (
                                <>
                                    Are you sure you want to cancel your application?
                                    <br />
                                    <span className="font-medium text-gray-900">
                                        Please provide a reason for rejection.
                                    </span>
                                    <textarea
                                        className="mt-2 w-full border rounded-md p-2 text-sm"
                                        rows={3}
                                        placeholder="Enter your reason here..."
                                        value={cancelReason}
                                        onChange={(e) => setCancelReason(e.target.value)}
                                    />
                                </>
                            )}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex justify-center gap-3 mt-6">
                        <Button
                            variant="outline"
                            onClick={() => setShowConfirmModal(false)}
                            className="px-8 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full"
                        >
                            No
                        </Button>
                        <Button
                            onClick={handleConfirmSubmit}
                            className="px-8 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full"
                            disabled={isLoading || (!isApply && cancelReason.trim() === "")}
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4zm2 5.29A7.96 7.96 0 014 12H0c0 3.04 1.14 5.82 3 7.94l3-2.65z" />
                                    </svg>
                                    Submitting...
                                </>
                            ) : 'Yes'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </section>
    )
}

export default MandatoryPage

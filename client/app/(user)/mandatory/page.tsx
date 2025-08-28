"use client"

import 'bootstrap-icons/font/bootstrap-icons.css'
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
import { Input } from '@/app/components/ui/input'
import { isLeavePassed, isSameDay, isWithin6Days } from '@/lib/date'
import { useMandatory } from '@/app/hooks/UseMandatory'

const SkeletonCard = () => {
    return (
        <div className="bg-gray-100 dark:bg-gray-400 gap-1.5 border-none shadow-none min-h-54 p-1.5 rounded-md animate-pulse">
            <div className="bg-gray-300 dark:bg-gray-600 border-none shadow-none p-3 rounded-sm space-y-2">
                <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
                <div className="mt-3 space-y-1">
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
                    <div className="flex items-center gap-2">
                        <div className="h-5 w-20 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                        <div className="h-5 w-5 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                        <div className="h-5 w-20 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                    </div>
                </div>
            </div>
            <div className='flex justify-between items-center mx-2 mt-2'>
                <div className='space-y-1'>
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
                    <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-40"></div>
                </div>
                <div className="h-6 w-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            </div>
        </div>
    )
}

const MandatoryPage = () => {
    const {
        dataMandatory,
        loading,
        appliedStatus,
        selectedMandatory,
        isApply,
        isLoading,
        showConfirmModal,
        cancelReason,
        cancelReasonError,
        setCancelReason,
        setShowConfirmModal,
        handleToggleChange,
        handleConfirmSubmit,
    } = useMandatory();

    return (
        <section className="p-4">
            <div className="flex justify-center items-center my-2 border-b-[1.5px] border-border">
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
                <div className='grid grid-cols-2 gap-3 mb-16 max-sm:grid-cols-1'>
                    {dataMandatory.map((data, idx) => {
                        const singleDay = isSameDay(data.start_date, data.end_date)
                        const currentDisplayStatus = appliedStatus[data.id_mandatory];
                        const leaveHasPassed = isLeavePassed(data.end_date);

                        return (
                            <div key={idx} className={`gap-1.5 border-none shadow-none p-1.5 rounded-md bg-accent ${leaveHasPassed && 'opacity-50'}`}>
                                <Card className="bg-[#dde8ffab] dark:bg-card border-none shadow-none p-3 rounded-sm">
                                    <div>
                                        <Label className={`${currentDisplayStatus === 'approved' || 'rejected' ? 'flex justify-between gap-1.5 text-xl font-semibold mb-1' : 'text-xl font-semibold mb-1'}`}>
                                            {data.title}
                                            {currentDisplayStatus === 'approved' ? (
                                                <span className="text-green-600 bg-green-100 p-2 px-3 rounded-full text-xs">APPROVED</span>
                                            ) : currentDisplayStatus === 'rejected' ? (
                                                <span className="text-red-600 bg-red-100 p-2 px-3 rounded-full text-xs">REJECTED</span>
                                            ) : (
                                                leaveHasPassed && <span className="text-gray-600 bg-gray-100 p-2 px-3 rounded-full text-xs">HAS PASSED</span>
                                            )}
                                        </Label>
                                        <p className=" text-muted-foreground text-sm">{data.description}</p>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <p className="text-xs font-bold bg-background py-1 px-2.5 rounded-full">{formatDate(data.start_date)}</p>
                                            {!singleDay && (
                                                <>
                                                    <i className="bi bi-arrow-right-short"></i>
                                                    <p className="text-xs font-bold bg-background py-1 px-2.5 rounded-full">{formatDate(data.end_date)}</p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                                <div className='flex justify-between items-center m-2'>
                                    {currentDisplayStatus === 'approved' ? (
                                        <div className='flex'>
                                            <Label className='font-bold text-lg'>Apply Segera</Label>
                                        </div>
                                    ) : (
                                        <div className='flex flex-col'>
                                            <Label className='font-bold text-lg'>Apply Segera</Label>
                                            {!leaveHasPassed && <p className='text-xs font-medium text-red-400'>{data.message}</p>}
                                        </div>
                                    )}
                                    <Switch
                                        checked={data.taken}
                                        onCheckedChange={(checked) => handleToggleChange(checked, data)}
                                        disabled={isWithin6Days(data.start_date) || leaveHasPassed}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}

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
                                    <span className="font-medium text-foreground">
                                        {selectedMandatory && formatDate(selectedMandatory.start_date)}
                                    </span>?
                                </>
                            ) : (
                                <>
                                    Are you sure you want to cancel your application?
                                    <br />
                                    <span className="font-medium text-foreground">
                                        Please provide a reason for rejection.
                                    </span>
                                    <Input
                                        className={`mt-2 w-full border rounded-md p-2 text-sm text-foreground ${cancelReasonError ? 'border-red-400' : ''}`}
                                        placeholder="Enter your reason here..."
                                        value={cancelReason}
                                        onChange={(e) => setCancelReason(e.target.value)}
                                    />
                                    {cancelReasonError && (
                                        <p className="text-sm text-red-600 mt-1">{cancelReasonError}</p>
                                    )}
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
                            className="px-8 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-primary text-white rounded-full cursor-pointer"
                            disabled={isLoading || (!isApply && (cancelReason.trim() === "" || cancelReason.trim().length < 5))}
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

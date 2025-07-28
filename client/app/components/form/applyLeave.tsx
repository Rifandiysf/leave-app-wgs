'use client'

import 'bootstrap-icons/font/bootstrap-icons.css'
import React, { useEffect, useState } from "react";
import { DatePickerField } from "../date-picker/datePicker";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Notification } from '../notification/Notification';

export function ApplyLeave() {
    const [title, setTitle] = useState("")
    const [leaveType, setLeaveType] = useState("")
    const [startDate, setStartDate] = useState<Date>()
    const [endDate, setEndDate] = useState<Date>()
    const [reason, setReason] = useState("")
    const [specialLeaves, setSpecialLeaves] = useState<{ id_special: string, title: string }[]>([])
    const [selectedSpecialLeaveId, setSelectedSpecialLeaveId] = useState("")


    const [generalError, setGeneralError] = useState("")
    const [titleError, setTitleError] = useState("")
    const [leaveTypeError, setLeaveTypeError] = useState("")
    const [dateError, setDateError] = useState("")
    const [reasonError, setReasonError] = useState("")
    const [specialLeaveError, setSpecialLeaveError] = useState("")

    const [isLoading, setIsLoading] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [showDiscardModal, setShowDiscardModal] = useState(false);
    const [showSuccessNotification, setShowSuccessNotification] = useState(false);


    useEffect(() => {
        if (!isDialogOpen) {
            setTitle("")
            setLeaveType("")
            setStartDate(undefined)
            setEndDate(undefined)
            setReason("")
            setSelectedSpecialLeaveId("")
            setSpecialLeaves([])

            setTitleError("")
            setLeaveTypeError("")
            setDateError("")
            setReasonError("")
            setSpecialLeaveError("")
            setGeneralError("")
        }
    }, [isDialogOpen])

    useEffect(() => {
        if (leaveType === 'special_leave') {
            const token = localStorage.getItem('token');
            const deviceId = localStorage.getItem('device-id');
            fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/special`, {
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { Authorization: `${token}` }),
                    ...(deviceId && { 'device-id': deviceId }),
                }
            }).then((res) => res.json()).then(data => {
                setSpecialLeaves(data?.data || [])
            }).catch(err => {
                console.error("Failed to fetch special leaves:", err);
            })
        } else {
            setSelectedSpecialLeaveId("")
        }
    }, [leaveType])

    const handleApplyLeave = async (e: React.FormEvent) => {
        e.preventDefault()

        setTitleError("")
        setLeaveTypeError("")
        setDateError("")
        setReasonError("")
        setSpecialLeaveError("")
        setGeneralError("")

        let hasError = false;

        if (!leaveType) {
            setLeaveTypeError("Leave type is required");
            hasError = true;
        }

        if (leaveType === "special_leave") {
            if (!selectedSpecialLeaveId) {
                setSpecialLeaveError("Please select a special leave type");
                hasError = true;
            }
            if (!startDate) {
                setDateError("Start date is required for special leave.");
                hasError = true;
            }

            const selectedSpecialLeave = specialLeaves.find(leave => leave.id_special === selectedSpecialLeaveId);
            if (selectedSpecialLeave) {

                setTitle(selectedSpecialLeave.title);
            }
        } else {

            if (!title.trim()) {
                setTitleError("Title cannot be empty");
                hasError = true;
            } else if (title.trim().length < 3) {
                setTitleError("Title must be at least 3 characters")
                hasError = true
            }
            if (!reason.trim()) {
                setReasonError("Reason cannot be empty");
                hasError = true;
            } else if (reason.trim().length < 5) {
                setReasonError("Reason must be at least 5 characters")
                hasError = true
            }
            if (!startDate || !endDate) {
                setDateError("Both start and end date are required.");
                hasError = true;
            }
        }

        if (hasError) {
            return;
        }
        setShowConfirmModal(true);
    }

    const handleConfirmSubmit = async () => {
        setShowConfirmModal(false);
        setIsLoading(true)

        const payload: any = {
            leave_type: leaveType,
            start_date: startDate?.toLocaleDateString('en-CA'),
        }

        if (leaveType === "special_leave") {
            const selectedSpecialLeave = specialLeaves.find(leave => leave.id_special === selectedSpecialLeaveId);
            payload.title = selectedSpecialLeave?.title || "";
            payload.end_date = startDate?.toLocaleDateString('en-CA');
            payload.id_special = selectedSpecialLeaveId;
            payload.reason = "Special Leave";
        } else {
            payload.title = title;
            payload.end_date = endDate?.toLocaleDateString('en-CA');
            payload.reason = reason;
        }

        try {
            const token = localStorage.getItem('token');
            const deviceId = localStorage.getItem('device-id');
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/leave`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { Authorization: `${token}` }),
                    ...(deviceId && { 'device-id': deviceId }),
                },
                credentials: 'include',
                body: JSON.stringify(payload),
            })

            const result = await res.json()

            if (!res.ok) {
                setGeneralError(result.message || "Failed to Request Leave. Please try again.")
                return;
            }

            setIsDialogOpen(false);
            setShowConfirmModal(false)
            // setSuccessMessage( result.message || "Your leave request was submitted successfully.");
            setShowSuccessNotification(true);
        } catch (err) {
            console.error('Failed adding request leave', err)
            setGeneralError("Failed to Request Leave. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    const formatDate = (date: Date | undefined) => {
        if (!date) return '';
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    }

    return (
        <>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button className="w-full px-4 sm:px-8 py-2 sm:py-4 bg-white text-blue-900 font-semibold hover:bg-blue-50 hover:shadow-lg transition-all duration-300 rounded-xl border-0 text-sm sm:text-lg">
                        Apply For Leave
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px]">
                    <form onSubmit={handleApplyLeave}>
                        <DialogHeader className="flex flex-col justify-center items-center mb-3">
                            <DialogTitle>
                                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <i className="bi bi-file-earmark-text text-white text-2xl" />
                                </div>
                                Leave Application
                            </DialogTitle>
                            <DialogDescription>Fill in the details for your leave request</DialogDescription>
                        </DialogHeader>
                        {generalError && (
                            <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">
                                {generalError}
                            </div>
                        )}

                        <div className="grid gap-4 mb-3">
                            <div className="grid gap-2">
                                <Label>Leave Type</Label>
                                <Select value={leaveType} onValueChange={(value) => setLeaveType(value)} >
                                    <SelectTrigger className={`w-full ${leaveTypeError && 'border-red-400'}`}>
                                        <SelectValue placeholder="Leave Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="personal_leave">Personal Leave</SelectItem>
                                        <SelectItem value="special_leave">Special Leave</SelectItem>
                                    </SelectContent>
                                </Select>
                                {leaveTypeError && (
                                    <p className="text-sm text-red-600 mt-1">{leaveTypeError}</p>
                                )}
                            </div>

                            {leaveType === "special_leave" ? (
                                <>
                                    <div className="grid gap-2">
                                        <Label>Special Leave Type</Label>
                                        <Select
                                            value={selectedSpecialLeaveId}
                                            onValueChange={(value) => {
                                                setSelectedSpecialLeaveId(value)
                                                if (specialLeaveError) setSpecialLeaveError("")
                                            }}>
                                            <SelectTrigger className={`w-full ${specialLeaveError && 'border-red-400'}`}>
                                                <SelectValue placeholder="Choose Leave Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {specialLeaves.map((leave) => (
                                                    <SelectItem key={leave.id_special} value={leave.id_special}>
                                                        {leave.title}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {specialLeaveError && (
                                            <p className="text-sm text-red-600 mt-1">{specialLeaveError}</p>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-1 gap-2">
                                        <DatePickerField label="Start Leave" value={startDate} onChange={(value) => setStartDate(value)} className={dateError && 'border-red-400'} />
                                        {dateError && (
                                            <p className="text-sm text-red-600 mt-1">{dateError}</p>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="grid gap-3">
                                        <Label htmlFor="title">Title</Label>
                                        <Input
                                            type="text"
                                            id="title"
                                            value={title}
                                            onChange={(e) => {
                                                setTitle(e.target.value)
                                                if (titleError) setTitleError("")
                                            }}
                                            placeholder="Type title for leave"
                                            className={titleError && 'border-red-400'}
                                        />
                                        {titleError && (
                                            <p className="text-sm text-red-600 mt-1">{titleError}</p>
                                        )}
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="reason">Reason</Label>
                                        <Input
                                            type="text"
                                            id="reason"
                                            value={reason}
                                            onChange={(e) => {
                                                setReason(e.target.value)
                                                if (reasonError) setReasonError("")
                                            }}
                                            placeholder="Brief reason for leave"
                                            className={reasonError && 'border-red-400'}
                                        />
                                        {reasonError && (
                                            <p className="text-sm text-red-600 mt-1">{reasonError}</p>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <DatePickerField label="Start Leave" value={startDate} onChange={(value) => setStartDate(value)} className={dateError && 'border-red-400'} />
                                        <DatePickerField label="End Leave" value={endDate} onChange={(value) => setEndDate(value)} className={dateError && 'border-red-400'} />
                                        {dateError && (
                                            <p className="text-sm text-red-600 mt-1">{dateError}</p>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="ghost"
                                className="cursor-pointer"
                                disabled={isLoading}
                                onClick={() => setShowDiscardModal(true)}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" className='bg-blue-600 hover:bg-blue-400 cursor-pointer' disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4zm2 5.29A7.96 7.96 0 014 12H0c0 3.04 1.14 5.82 3 7.94l3-2.65z" />
                                        </svg>
                                        {leaveType === 'special_leave' ? 'Submitting Special Leave...' : 'Processing...'}
                                    </>
                                ) : 'Confirm'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>

                {/* Confirmation Modal */}
                <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
                    <DialogContent className="sm:max-w-[450px]">
                        <DialogHeader className="text-center">
                            <DialogTitle className="text-lg font-semibold">
                                Confirm Leave Application
                            </DialogTitle>
                            <DialogDescription className="text-center mt-2">
                                {leaveType === "special_leave" ? (
                                    <>
                                        Are you sure you want to apply for special leave on <br />
                                        <span className="font-medium text-gray-900">
                                            {formatDate(startDate)}
                                        </span>?
                                    </>
                                ) : (
                                    <>
                                        Are you sure you want to apply for personal leave from <br />
                                        <span className="font-medium text-gray-900">
                                            {formatDate(startDate)} to {formatDate(endDate)}
                                        </span>?
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
                                disabled={isLoading}
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

                {/* discard Modal */}
                <Dialog open={showDiscardModal} onOpenChange={setShowDiscardModal}>
                    <DialogContent className="sm:max-w-[450px]">
                        <DialogHeader className="text-center">
                            <DialogTitle className="text-lg font-semibold">
                                Discard Form?
                            </DialogTitle>
                            <DialogDescription className="text-center mt-2">
                                Are you sure you want to discard this leave application? <br />
                                All changes will be lost.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="flex justify-center gap-3 mt-6">
                            <Button
                                variant="outline"
                                onClick={() => setShowDiscardModal(false)}
                                className="px-8 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full"
                            >
                                No
                            </Button>
                            <Button
                                onClick={() => {
                                    setIsDialogOpen(false);
                                    setShowDiscardModal(false);
                                }}
                                className="px-8 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full"
                            >
                                Yes, Discard
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

            </Dialog>
            <Notification
                mode='success'
                show={showSuccessNotification}
                message={() => `${leaveType === 'special_leave' ? 'Special' : 'Personal'} Leave schedule successfully added!`}
                onClose={() => setShowSuccessNotification(false)}
                duration={4000}
            />
        </>

    )
}
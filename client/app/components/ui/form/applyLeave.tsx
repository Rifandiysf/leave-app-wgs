'use client'

import 'bootstrap-icons/font/bootstrap-icons.css'
import { DatePickerField } from "../date-picker/datePicker";
import { Button } from "../button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../dialog";
import { Input } from "../input";
import { Label } from "../label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select";
import { Notification } from '../notification/Notification';
import { DateRange } from 'react-day-picker';
import { useApplyLeave } from '@/app/hooks/user/UseApplyLeave';

export function ApplyLeave() {
    const { state, dispatch, handleSubmit, confirmSubmit } = useApplyLeave()

    const formatDate = (date: Date | undefined) => {
        if (!date) return '';
        return date.toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    }

    return (
        <>
            <Dialog open={state.isDialogOpen} onOpenChange={(val) => dispatch({ type: "SET_FIELD", field: "isDialogOpen", value: val })}>
                <DialogTrigger asChild>
                    <Button className="w-full px-4 sm:px-8 py-2 sm:py-4 bg-secondary text-white font-semibold hover:bg-secondary hover:shadow-lg transition-all duration-300 rounded-xl border-0 text-sm sm:text-lg">
                        <i className="bi bi-calendar-event-fill" />
                        Apply For Leave
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px] bg-background">
                    <form onSubmit={handleSubmit}>
                        <DialogHeader className="flex flex-col justify-center items-center mb-3">
                            <DialogTitle>
                                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <i className="bi bi-file-earmark-text text-white text-2xl" />
                                </div>
                                <span className='text-foreground'>Leave Application</span>
                            </DialogTitle>
                            <DialogDescription>Fill in the details for your leave request</DialogDescription>
                        </DialogHeader>
                        {state.generalError && (
                            <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">
                                {state.generalError}
                            </div>
                        )}

                        <div className="grid gap-4 mb-3">
                            <div className="grid gap-2">
                                <Label>Leave Type</Label>
                                <Select value={state.leaveType} onValueChange={(value) => dispatch({ type: "SET_FIELD", field: "leaveType", value: value })} >
                                    <SelectTrigger className={`w-full ${state.leaveTypeError && 'border-red-400'}`}>
                                        <SelectValue placeholder="Leave Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="personal_leave">Personal Leave</SelectItem>
                                        <SelectItem value="special_leave">Special Leave</SelectItem>
                                    </SelectContent>
                                </Select>
                                {state.leaveTypeError && (
                                    <p className="text-sm text-red-600 mt-1">{state.leaveTypeError}</p>
                                )}
                            </div>

                            {state.leaveType === "special_leave" ? (
                                <>
                                    <div className="grid gap-2">
                                        <Label>Special Leave Type</Label>
                                        <Select
                                            value={state.selectedSpecialLeaveId}
                                            onValueChange={(value) => dispatch({
                                                type: "SET_FIELD",
                                                field: "selectedSpecialLeaveId",
                                                value: value
                                            })}>
                                            <SelectTrigger className={`w-full ${state.specialLeaveError && 'border-red-400'}`}>
                                                <SelectValue placeholder="Choose Leave Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {state.specialLeaves.map((leave) => (
                                                    <SelectItem key={leave.id_special} value={leave.id_special}>
                                                        {leave.title}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {state.specialLeaveError && (
                                            <p className="text-sm text-red-600 mt-1">{state.specialLeaveError}</p>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-1 gap-2">
                                        <DatePickerField
                                            label="Leave Date"
                                            mode="single"
                                            value={state.startDate}
                                            onChange={(date: Date | undefined) => {
                                                dispatch({ type: "SET_FIELD", field: "startDate", value: date });
                                                dispatch({ type: "SET_FIELD", field: "endDate", value: date });
                                            }}
                                            className={state.dateError && 'border-red-400'}
                                        />
                                        {state.dateError && (
                                            <p className="text-sm text-red-600 mt-1">{state.dateError}</p>
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
                                            value={state.title}
                                            onChange={(e) => dispatch({
                                                type: "SET_FIELD",
                                                field: "title",
                                                value: e.target.value
                                            })}
                                            placeholder="Type title for leave"
                                            className={state.titleError && 'border-red-400'}
                                        />
                                        {state.titleError && (
                                            <p className="text-sm text-red-600 mt-1">{state.titleError}</p>
                                        )}
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="reason">Reason</Label>
                                        <Input
                                            type="text"
                                            id="reason"
                                            value={state.reason}
                                            onChange={(e) => dispatch({
                                                type: "SET_FIELD",
                                                field: "reason",
                                                value: e.target.value
                                            })}
                                            placeholder="Brief reason for leave"
                                            className={state.reasonError && 'border-red-400'}
                                        />
                                        {state.reasonError && (
                                            <p className="text-sm text-red-600 mt-1">{state.reasonError}</p>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-1 gap-2">
                                        <DatePickerField
                                            label="Leave Date"
                                            mode="range"
                                            value={state.startDate && state.endDate ? { from: state.startDate, to: state.endDate } : undefined}
                                            onChange={(range: DateRange | undefined) => {
                                                dispatch({ type: "SET_FIELD", field: "startDate", value: range?.from });
                                                dispatch({ type: "SET_FIELD", field: "endDate", value: range?.to });
                                            }}
                                            className={state.dateError && 'border-red-400'}
                                        />
                                        {state.dateError && (
                                            <p className="text-sm text-red-600 mt-1">{state.dateError}</p>
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
                                disabled={state.isLoading}
                                onClick={() => dispatch({ type: "SET_FIELD", field: "showDiscardModal", value: true })}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" className='bg-blue-600 hover:bg-blue-400 cursor-pointer' disabled={state.isLoading}>
                                {state.isLoading ? (
                                    <>
                                        <svg className="animate-spin ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4zm2 5.29A7.96 7.96 0 014 12H0c0 3.04 1.14 5.82 3 7.94l3-2.65z" />
                                        </svg>
                                        {state.leaveType === 'special_leave' ? 'Submitting Special Leave...' : 'Processing...'}
                                    </>
                                ) : 'Confirm'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>

                {/* Confirmation Modal */}
                <Dialog open={state.showConfirmModal} onOpenChange={(val) => dispatch({ type: "SET_FIELD", field: "showConfirmModal", value: val })}>
                    <DialogContent className="sm:max-w-[450px]">
                        <DialogHeader className="text-center">
                            <DialogTitle className="text-lg font-semibold">
                                Confirm Leave Application
                            </DialogTitle>
                            <DialogDescription className="text-center mt-2">
                                {state.leaveType === "special_leave" ? (
                                    <>
                                        Are you sure you want to apply for special leave on <br />
                                        <span className="font-medium text-foreground">
                                            {formatDate(state.startDate)}
                                        </span>?
                                    </>
                                ) : (
                                    <>
                                        Are you sure you want to apply for personal leave from <br />
                                        <span className="font-medium text-foreground">
                                            {formatDate(state.startDate)} to {formatDate(state.endDate)}
                                        </span>?
                                    </>
                                )}
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="flex justify-center gap-3 mt-6">
                            <Button
                                variant="outline"
                                onClick={() => dispatch({ type: "SET_FIELD", field: "showConfirmModal", value: false })}
                                className="px-8 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full"
                            >
                                No
                            </Button>
                            <Button
                                onClick={confirmSubmit}
                                className="px-8 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full"
                                disabled={state.isLoading}
                            >
                                {state.isLoading ? (
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
                <Dialog open={state.showDiscardModal} onOpenChange={(val) => dispatch({ type: "SET_FIELD", field: "showDiscardModal", value: val })}>
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
                                onClick={() => dispatch({ type: "SET_FIELD", field: "showDiscardModal", value: false })}
                                className="px-8 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full"
                            >
                                No
                            </Button>
                            <Button
                                onClick={() => {
                                    dispatch({ type: "SET_FIELD", field: "isDialogOpen", value: false })
                                    dispatch({ type: "SET_FIELD", field: "showDiscardModal", value: false })
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
                show={state.showSuccessNotification}
                message={`${state.leaveType === 'special_leave' ? 'Special' : 'Personal'} Leave schedule successfully added!`}
                onClose={() => dispatch({ type: "SET_FIELD", field: "showSuccessNotification", value: false })}
                duration={4000}
            />
        </>
    )
}
'use client'

import { Button } from "@/app/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/app/components/ui/dialog"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { DatePickerField } from "../date-picker/datePicker"
import { DateRange } from 'react-day-picker';
import { useAddMandatory } from "@/app/hooks/admin/UseAddMandatory"

export function AddMandatory({ onFormSubmit }: { onFormSubmit: () => void }) {
    const { state, dispatch, submit, handleConfirmModal } = useAddMandatory(onFormSubmit)

    return (
        <>
            <Dialog
                open={state.isDialogOpen}
                onOpenChange={
                    (open) => {
                        dispatch({ type: "SET_FIELD", field: "isDialogOpen", value: open })
                        if (!open) {
                            dispatch({ type: "RESET" });
                        }
                    }
                }
            >
                <DialogTrigger asChild>
                    <Button variant="default" className="text-foreground">
                        <i className="bi bi-plus-circle-fill text-lg text-foreground"></i> Add Mandatory Leave
                    </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[550px]">
                    <form onSubmit={handleConfirmModal}>
                        <DialogHeader className="flex flex-col justify-center items-center mb-3">
                            <DialogTitle>Add Mandatory Leave</DialogTitle>
                        </DialogHeader>

                        {state.errors.general && (
                            <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">
                                {state.errors.general}
                            </div>
                        )}
                        {state.success && (
                            <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4 text-sm">
                                {state.success}
                            </div>
                        )}
                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    type="text"
                                    value={state.title}
                                    onChange={(e) => {
                                        dispatch({ type: "SET_FIELD", field: "title", value: e.target.value })
                                    }}
                                    placeholder="Type the new leave title"
                                    className={state.errors.title ? 'border-red-400' : ''}
                                />
                                {state.errors.title && (
                                    <p className="text-sm text-red-600 mt-1">{state.errors.title}</p>
                                )}
                            </div>
                            <div className="grid gap-3">
                                <div className="grid grid-cols-1 gap-2">
                                    <DatePickerField
                                        label="Leave Date"
                                        mode="range"
                                        disablePastAndWeekends={false}
                                        value={state.startDate && state.endDate ? { from: state.startDate, to: state.endDate } : undefined}
                                        onChange={(range: DateRange | undefined) => {
                                            dispatch({ type: "SET_FIELD", field: "startDate", value: range?.from });
                                            dispatch({ type: "SET_FIELD", field: "endDate", value: range?.to });
                                        }}
                                        className={state.errors.date ? 'border-red-400' : ''}
                                    />
                                </div>
                                {state.errors.date && (
                                    <p className="text-sm text-red-600 mt-1">{state.errors.date}</p>
                                )}
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="description">Description</Label>
                                <textarea
                                    id="description"
                                    value={state.description}
                                    onChange={(e) => {
                                        dispatch({ type: "SET_FIELD", field: "description", value: e.target.value })
                                    }}
                                    placeholder="Type the information"
                                    className={`border-[1.5px] border-border bg-accent ${state.errors.description ? 'border-red-400' : ''} rounded-sm p-1 focus:border-2 focus:border-black`}
                                />
                                {state.errors.description && (
                                    <p className="text-sm text-red-600 mt-1">{state.errors.description}</p>
                                )}
                            </div>
                        </div>

                        <DialogFooter className="mt-5">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() =>
                                    dispatch({ type: "SET_FIELD", field: "showDiscardModal", value: true })
                                }
                                disabled={state.isLoading}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" className="text-black" disabled={state.isLoading}>
                                {state.isLoading ? (
                                    <>
                                        <svg className="animate-spin ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4zm2 5.29A7.96 7.96 0 014 12H0c0 3.04 1.14 5.82 3 7.94l3-2.65z" />
                                        </svg>
                                        Processing...
                                    </>
                                ) : 'Submit'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog >

            {/* Confirm Modal */}
            <Dialog
                open={state.showConfirmModal}
                onOpenChange={(open) =>
                    dispatch({ type: "SET_FIELD", field: "showConfirmModal", value: open })
                }
            >
                <DialogContent className="sm:max-w-[450px]">
                    <DialogHeader className="text-center">
                        <DialogTitle className="text-lg font-semibold">
                            Confirm Create Mandatory Leave
                        </DialogTitle>
                        <DialogDescription className="text-center mt-2">
                            Are you sure you want to add this mandatory leave?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex justify-center gap-3 mt-6">
                        <Button
                            variant="outline"
                            onClick={() =>
                                dispatch({ type: "SET_FIELD", field: "showConfirmModal", value: false })
                            }
                            className="px-8 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full"
                        >
                            No
                        </Button>
                        <Button
                            className="px-8 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full"
                            onClick={submit}
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

            {/* Discard Modal */}
            <Dialog
                open={state.showDiscardModal}
                onOpenChange={(open) =>
                    dispatch({ type: "SET_FIELD", field: "showDiscardModal", value: open })
                }
            >
                <DialogContent className="sm:max-w-[400px]">
                    <DialogHeader className="text-center">
                        <DialogTitle className="text-lg font-semibold">
                            Discard Changes?
                        </DialogTitle>
                        <DialogDescription className="text-center mt-2">
                            Are you sure you want to cancel and discard this form?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex justify-center gap-3 mt-6">
                        <Button
                            variant="outline"
                            onClick={() =>
                                dispatch({ type: "SET_FIELD", field: "showDiscardModal", value: false })
                            }
                            className="px-8 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full"
                        >
                            No
                        </Button>
                        <DialogClose asChild>
                            <Button
                                className="px-8 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full"
                                onClick={() => {
                                    dispatch({ type: "RESET" });
                                    dispatch({ type: "SET_FIELD", field: "isDialogOpen", value: false });
                                    dispatch({ type: "SET_FIELD", field: "showDiscardModal", value: false });
                                }}
                            >
                                Yes, Discard
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
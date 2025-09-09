'use client'

import { useState } from "react"
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
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../select"
import { DataSpecialType, useEditSpecialLeave } from "@/app/hooks/admin/UseEditSpecial"

type Props = {
    initialData: DataSpecialType
    onFormSubmit: () => void
}

export function EditSpecial({ initialData, onFormSubmit }: Props) {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const { state, dispatch, handleSubmit, handleConfirmModal } = useEditSpecialLeave(initialData, () => {
        onFormSubmit();
        setIsDialogOpen(false)
    })

    const handleReset = () => {
        dispatch({ type: "RESET", payload: initialData });
    };

    return (
        <Dialog
            open={isDialogOpen}
            onOpenChange={(open) => {
                setIsDialogOpen(open)
                if (!open) {
                    handleReset();
                }
            }}>
            <DialogTrigger asChild>
                <Button variant="ghost" size={'icon'}>
                    <i className="bi bi-pencil-square text-lg"></i>
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[550px]">
                <form onSubmit={handleConfirmModal}>
                    <DialogHeader className="flex flex-col justify-center items-center mb-3">
                        <DialogTitle>Edit Special Leave</DialogTitle>
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
                                placeholder="Edit title"
                                className={state.errors.title ? 'border-red-400' : ''}
                            />
                            {state.errors.title && (
                                <p className="text-sm text-red-600 mt-1">{state.errors.title}</p>
                            )}
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="gender">Gender</Label>
                            <Select value={state.gender} onValueChange={(value) => dispatch({ type: "SET_FIELD", field: "gender", value: value })} >
                                <SelectTrigger className={`w-full ${state.errors.gender ? 'border-red-400' : ''}`}>
                                    <SelectValue placeholder="Select the gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Gender</SelectLabel>
                                        <SelectItem value="m">Male</SelectItem>
                                        <SelectItem value="f">Female</SelectItem>
                                        <SelectItem value="mf">Male/Female</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {state.errors.gender && (
                                <p className="text-sm text-red-600 mt-1">{state.errors.gender}</p>
                            )}
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="grid gap-3">
                                <Label htmlFor="duration">Duration</Label>
                                <Input
                                    id="duration"
                                    type="number"
                                    min={0}
                                    value={state.duration}
                                    onChange={(e) => dispatch({ type: "SET_FIELD", field: "duration", value: Number(e.target.value) })}
                                    placeholder="Edit duration"
                                    className={state.errors.duration ? 'border-red-400' : ''}
                                />
                                {state.errors.duration && (
                                    <p className="text-sm text-red-600 mt-1">{state.errors.duration}</p>
                                )}
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="type">Type Date</Label>
                                <Select value={state.type} onValueChange={(value) => dispatch({ type: "SET_FIELD", field: "type", value: value })}>
                                    <SelectTrigger className={`w-full ${state.errors.type ? 'border-e-red-400' : ''}`}>
                                        <SelectValue placeholder="Select the type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Type Date</SelectLabel>
                                            <SelectItem value="day">Day</SelectItem>
                                            <SelectItem value="month">Month</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                {state.errors.type && (
                                    <p className="text-sm text-red-600 mt-1">{state.errors.type}</p>
                                )}
                            </div>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="description">Description</Label>
                            <textarea
                                id="description"
                                value={state.description}
                                onChange={(e) => {
                                    dispatch({ type: "SET_FIELD", field: "description", value: e.target.value })
                                }}
                                placeholder="Edit description"
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
                            disabled={state.loading}
                            onClick={() => dispatch({ type: 'SET_FIELD', field: 'showDiscardModal', value: true })}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" className="text-black" disabled={state.loading}>
                            {state.loading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4zm2 5.29A7.96 7.96 0 014 12H0c0 3.04 1.14 5.82 3 7.94l3-2.65z" />
                                    </svg>
                                    Saving…
                                </>
                            ) : 'Save'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
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
                            Confirm Update Special Leave
                        </DialogTitle>
                        <DialogDescription className="text-center mt-2">
                            Are you sure you want to update this Special leave?
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
                            onClick={handleSubmit}
                            disabled={state.loading}
                        >
                            {state.loading ? (
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
                            Are you sure you want to cancel and discard this update form?
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
                                    dispatch({ type: "SET_FIELD", field: "showDiscardModal", value: false });
                                    setIsDialogOpen(false)
                                }}
                            >
                                Yes, Discard
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Dialog>
    )
}
'use client'

import { useState, useEffect } from "react"
import { Button } from "@/app/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/app/components/ui/dialog"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { DatePickerField } from "../date-picker/datePicker"

export function AddMandatory({ onFormSubmit }: { onFormSubmit: () => void }) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [startDate, setStartDate] = useState<Date>()
    const [endDate, setEndDate] = useState<Date>()

    const [titleError, setTitleError] = useState("")
    const [descriptionError, setDescriptionError] = useState("")
    const [dateError, setDateError] = useState("")
    const [generalError, setGeneralError] = useState('')
    const [generalSuccess, setGeneralSuccess] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    useEffect(() => {
        if (!isDialogOpen) {
            setTitle("");
            setDescription("");
            setStartDate(undefined);
            setEndDate(undefined);

            setTitleError("");
            setDescriptionError("");
            setDateError("")
            setGeneralError("");
            setGeneralSuccess("");
        }
    }, [isDialogOpen]);

    const handleAddMandatory = async (e: React.FormEvent) => {
        e.preventDefault()

        setGeneralError("")
        setGeneralSuccess("")
        setTitleError("")
        setDescription("")
        setDateError("")

        let hasError = false;
        if (!title.trim()) {
            setTitleError("Title cannot be empty");
            hasError = true;
        }
        if (!description.trim()) {
            setDescriptionError("Description cannot be empty");
            hasError = true;
        }
        if (!startDate || !endDate) {
            setDateError("Both start and end date are required.")
            hasError = true
        } else if (endDate < startDate) {
            setDateError("End date cannot be before start date.")
            hasError = true
        }

        if (hasError) {
            return;
        }

        setIsLoading(true)
        const payload = {
            title,
            description,
            start_date: startDate?.toLocaleDateString('en-CA'),
            end_date: endDate?.toLocaleDateString('en-CA'),
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/leaves/mandatory`, {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(payload),
            })

            const result = await res.json()

            if (!res.ok) {
                setGeneralError("Failed to add data. Please try again.");
            }

            onFormSubmit()
            setGeneralSuccess(result.message || "Mandatory leave added successfully!");
            setIsDialogOpen(false);
        } catch (error) {
            console.error("Error adding data:", error);
            setGeneralError("Failed to add data. Check your network or server response.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="default" className="text-black">
                    <i className="bi bi-plus-circle-fill text-lg text-slate-600"></i> Add Mandatory Leave
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[550px]">
                <form onSubmit={handleAddMandatory}>
                    <DialogHeader className="flex flex-col justify-center items-center mb-3">
                        <DialogTitle>Add Mandatory Leave</DialogTitle>
                    </DialogHeader>

                    {generalError && (
                        <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">
                            {generalError}
                        </div>
                    )}
                    {generalSuccess && (
                        <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4 text-sm">
                            {generalSuccess}
                        </div>
                    )}
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                type="text"
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                    if (titleError) setTitleError("");
                                }}
                                placeholder="Type the new leave title"
                                className={titleError ? 'border-red-400' : ''}
                            />
                            {titleError && (
                                <p className="text-sm text-red-600 mt-1">{titleError}</p>
                            )}
                        </div>
                        <div className="grid gap-3">
                            <div className="grid grid-cols-2 gap-2">
                                <DatePickerField label="Start Leave" value={startDate} onChange={(value) => { setStartDate(value) }} className={dateError ? 'border-red-400' : ''}/>
                                <DatePickerField label="End Leave" value={endDate} onChange={(value) => { setEndDate(value) }} className={dateError ? 'border-red-400' : ''}/>
                            </div>
                            {dateError && (
                                <p className="text-sm text-red-600 mt-1">{dateError}</p>
                            )}
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="description">Description</Label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                    if (descriptionError) setDescriptionError("");
                                }}
                                placeholder="Type the information"
                                className={`border-[1.5px] border-[#0000001f] ${descriptionError ? 'border-red-400' : ''} rounded-sm p-1 focus:border-2 focus:border-black`}
                            />
                            {descriptionError && (
                                <p className="text-sm text-red-600 mt-1">{descriptionError}</p>
                            )}
                        </div>
                    </div>

                    <DialogFooter className="mt-5">
                        <DialogClose asChild>
                            <Button type="button" variant="outline" disabled={isLoading}>Cancel</Button>
                        </DialogClose>
                        <Button type="submit" className="text-black" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4zm2 5.29A7.96 7.96 0 014 12H0c0 3.04 1.14 5.82 3 7.94l3-2.65z" />
                                    </svg>
                                    Processing…
                                </>
                            ) : 'Confirm'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
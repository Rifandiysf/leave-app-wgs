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
import { parseISO } from "date-fns"
import { DateRange } from "react-day-picker"

type dataMandatoryType = {
    id_mandatory: string
    title: string
    description: string
    start_date: string
    end_date: string
}

type Props = {
    initialData: dataMandatoryType
    onFormSubmit: () => void
}

export function EditMandatory({ initialData, onFormSubmit }: Props) {
    const [title, setTitle] = useState(initialData.title)
    const [description, setDescription] = useState(initialData.description)
    const [startDate, setStartDate] = useState<Date>()
    const [endDate, setEndDate] = useState<Date>()

    const [titleError, setTitleError] = useState("")
    const [descriptionError, setDescriptionError] = useState("")
    const [generalError, setGeneralError] = useState('')
    const [dateError, setDateError] = useState("")
    const [generalSuccess, setGeneralSuccess] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    useEffect(() => {
        if (isDialogOpen) {
            setTitle(initialData.title)
            setDescription(initialData.description)
            setStartDate(initialData.start_date ? parseISO(initialData.start_date) : undefined)
            setEndDate(initialData.end_date ? parseISO(initialData.end_date) : undefined)
            setTitleError("")
            setDescriptionError("")
            setDateError("")
            setGeneralError("")
            setGeneralSuccess("")
        } else {
            setTitle(initialData.title)
            setDescription(initialData.description)
            setStartDate(initialData.start_date ? parseISO(initialData.start_date) : undefined)
            setEndDate(initialData.end_date ? parseISO(initialData.end_date) : undefined)
        }
    }, [isDialogOpen, initialData])

    const handleEditMandatory = async (e: React.FormEvent) => {
        e.preventDefault()

        setGeneralError("")
        setGeneralSuccess("")
        setTitleError("")
        setDescriptionError("")
        setDateError("")

        let hasError = false
        if (!title.trim()) {
            setTitleError("Title cannot be empty")
            hasError = true
        }
        if (!description.trim()) {
            setDescriptionError("Description cannot be empty")
            hasError = true
        }
        if (!startDate || !endDate) {
            setDateError("Both start and end date are required.")
            hasError = true
        } else if (endDate < startDate) {
            setDateError("End date cannot be before start date.")
            hasError = true
        }

        if (hasError) {
            return
        }

        setIsLoading(true)
        const payload = {
            title,
            description,
            start_date: startDate?.toLocaleDateString('en-CA'),
            end_date: endDate?.toLocaleDateString('en-CA')
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/leaves/mandatory/${initialData.id_mandatory}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(payload),
            })

            const result = await res.json()

            if (!res.ok) {
                setGeneralError("Failed to update mandatory leave")
                return
            }

            setGeneralSuccess(result.message || "Mandatory leave updated successfully!")
            onFormSubmit()
            setIsDialogOpen(false)

        } catch (error) {
            console.error("Error updating data:", error)
            setGeneralError("Failed to update data. Check your network or server response.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size={'icon'}>
                    <i className="bi bi-pencil-square text-lg"></i>
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[550px]">
                <form onSubmit={handleEditMandatory}>
                    <DialogHeader className="flex flex-col justify-center items-center mb-3">
                        <DialogTitle>Edit Mandatory Leave</DialogTitle>
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
                                    setTitle(e.target.value)
                                    if (titleError) setTitleError("")
                                }}
                                placeholder="Edit title"
                                className={titleError ? 'border-red-400' : ''}
                            />
                            {titleError && (
                                <p className="text-sm text-red-600 mt-1">{titleError}</p>
                            )}
                        </div>
                        <div className="grid gap-3">
                            <div className="grid grid-cols-1 gap-2">
                                <DatePickerField
                                    label="Leave Date"
                                    mode="range"
                                    disablePastAndWeekends={false}
                                    value={startDate && endDate ? { from: startDate, to: endDate } : undefined}
                                    onChange={(range: DateRange | undefined) => {
                                        setStartDate(range?.from)
                                        setEndDate(range?.to)
                                        if (dateError) setDateError("")
                                    }}
                                    className={dateError ? 'border-red-400' : ''}
                                />
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
                                    setDescription(e.target.value)
                                    if (descriptionError) setDescriptionError("")
                                }}
                                placeholder="Edit description"
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
                                    Saving…
                                </>
                            ) : 'Save'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
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
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"

type dataSpecialType = {
    id_special: string
    title: string
    applicable_gender: string
    duration: number
    description: string
}

type Props = {
    initialData: dataSpecialType
    onFormSubmit: () => void
}

export function EditSpecial({ initialData, onFormSubmit }: Props) {
    const [title, setTitle] = useState(initialData.title)
    const [gender, setGender] = useState(initialData.applicable_gender)
    const [duration, setDuration] = useState(initialData.duration)
    const [description, setDescription] = useState(initialData.description)

    const [titleError, setTitleError] = useState("")
    const [descriptionError, setDescriptionError] = useState("")
    const [genderError, setGenderError] = useState("")
    const [durationError, setDurationError] = useState("")
    const [generalError, setGeneralError] = useState('')
    const [generalSuccess, setGeneralSuccess] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    useEffect(() => {
        if (isDialogOpen) {
            setTitle(initialData.title)
            setGender(initialData.applicable_gender)
            setDuration(initialData.duration)
            setDescription(initialData.description)
            setTitleError("")
            setDescriptionError("")
            setGenderError("")
            setDurationError("")
            setGeneralError("")
            setGeneralSuccess("")
        } else {
            setTitle(initialData.title)
            setGender(initialData.applicable_gender)
            setDuration(initialData.duration)
            setDescription(initialData.description)
        }
    }, [isDialogOpen, initialData])

    const handleEditSpecial = async (e: React.FormEvent) => {
        e.preventDefault()

        setGeneralError("")
        setGeneralSuccess("")
        setTitleError("")
        setDescriptionError("")
        setGenderError("")
        setDurationError("")

        let hasError = false
        if (!title.trim()) {
            setTitleError("Title cannot be empty");
            hasError = true;
        }
        if (!description.trim()) {
            setDescriptionError("Description cannot be empty");
            hasError = true;
        }
        if (duration <= 0) {
            setDurationError("Amount cannot be 0 days");
            hasError = true;
        }
        if (!gender.trim()) {
            setGenderError("Gander cannot be empty");
            hasError = true;
        }

        if (hasError) {
            return
        }

        setIsLoading(true)
        const payload = {
            title,
            applicable_gender: gender,
            duration,
            description,
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/leaves/special/${initialData.id_special}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(payload),
            })

            const result = await res.json()

            if (!res.ok) {
                setGeneralError("Failed to update special leave")
                return
            }

            setGeneralSuccess(result.message || "Special leave updated successfully!")
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
                <form onSubmit={handleEditSpecial}>
                    <DialogHeader className="flex flex-col justify-center items-center mb-3">
                        <DialogTitle>Edit Special Leave</DialogTitle>
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
                            <Label htmlFor="gender">Gender</Label>
                            <Select value={gender} onValueChange={(value) => setGender(value)} >
                                <SelectTrigger className={`w-full ${genderError ? 'border-red-400' : ''}`}>
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
                            {genderError && (
                                <p className="text-sm text-red-600 mt-1">{genderError}</p>
                            )}
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="duration">Duration</Label>
                            <Input
                                id="duration"
                                type="number"
                                min={0}
                                value={duration}
                                onChange={(e) => setDuration(Number(e.target.value))}
                                placeholder="Edit duration"
                                className={durationError ? 'border-red-400' : ''}
                            />
                            {durationError && (
                                <p className="text-sm text-red-600 mt-1">{durationError}</p>
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
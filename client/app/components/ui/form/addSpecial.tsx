'use client'

import { useState } from "react"
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
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../select"
import { useAddSpecialLeave } from "@/app/hooks/admin/UseAddSpecial"

export function AddSpecial({ onFormSubmit }: { onFormSubmit: () => void }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const { state, dispatch, handleSubmit } = useAddSpecialLeave(() => { onFormSubmit(); setIsDialogOpen(false) })

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="default" className="text-foreground dark:bg-secondary">
                    <i className="bi bi-plus-circle-fill text-lg text-foreground"></i> Add Special Leave
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[550px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader className="flex flex-col justify-center items-center mb-3">
                        <DialogTitle>Add Special Leave</DialogTitle>
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
                            <Label htmlFor="gender">Gender</Label>
                            <Select onValueChange={(value) => dispatch({ type: "SET_FIELD", field: "gender", value: value })}>
                                <SelectTrigger className={`w-full ${state.errors.gender ? 'border-e-red-400' : ''}`}>
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
                        <div className="grid gap-3">
                            <Label htmlFor="duration">Duration</Label>
                            <Input
                                id="duration"
                                type="number"
                                min={0}
                                value={state.duration}
                                onChange={(e) => dispatch({ type: "SET_FIELD", field: "duration", value: Number(e.target.value)})}
                                placeholder="Set amount in days"
                                className={state.errors.duration ? 'border-red-400' : ''}
                            />
                            {state.errors.duration && (
                                <p className="text-sm text-red-600 mt-1">{state.errors.duration}</p>
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
                                placeholder="Type the description"
                                className={`border-[1.5px] border-border bg-accent ${state.errors.description ? 'border-red-400' : ''} rounded-sm p-1 focus:border-2 focus:border-black`}
                            />
                            {state.errors.description && (
                                <p className="text-sm text-red-600 mt-1">{state.errors.description}</p>
                            )}
                        </div>
                    </div>

                    <DialogFooter className="mt-5">
                        <DialogClose asChild>
                            <Button type="button" variant="outline" disabled={state.loading}>Cancel</Button>
                        </DialogClose>
                        <Button type="submit" className="text-black" disabled={state.loading}>
                            {state.loading ? (
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
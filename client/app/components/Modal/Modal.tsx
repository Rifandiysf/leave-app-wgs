"use client"

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
import { DatePickerField } from "../date-picker/page"
import {
    Select,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectContent,
} from "../ui/select"

type ModalTypeProps = {
    children?: React.ReactNode
    styleButton?: string
    title: string
    TitleButton: React.ReactNode
    description: string
    footer?: boolean
    mode?: "form" | "info"
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
    size?: "default" | "sm" | "lg" | "icon"
}

export function Modal({
    children,
    styleButton,
    title,
    TitleButton,
    description,
    footer = true,
    mode = "form",
    variant = "default",
    size = "default"
}: ModalTypeProps) {
    const [startLeave, setStartLeave] = useState<Date | undefined>()
    const [endLeave, setEndLeave] = useState<Date | undefined>()
    const [leaveType, setLeaveType] = useState("personal")

    return (
        <Dialog>
            {mode === "form" ? (
                <form>
                    <DialogTrigger asChild>
                        <Button variant={variant} size={size} className={styleButton}>
                            {TitleButton}
                        </Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-[550px]">
                        <DialogHeader className="flex flex-col justify-center items-center mb-3">
                            <DialogTitle>
                                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <i className="bi bi-file-earmark-text text-white text-2xl" />
                                </div>
                                {title}
                            </DialogTitle>
                            <DialogDescription>
                                {description}
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4 mb-3">
                            <div className="grid gap-2">
                                <Label>Leave Type</Label>
                                <Select
                                    value={leaveType}
                                    onValueChange={(val: string) => setLeaveType(val)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Leave Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="personal">Personal Leave</SelectItem>
                                        <SelectItem value="special">Special Leave</SelectItem>
                                        <SelectItem value="mandatory">Mandatory</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Form berdasarkan leaveType */}
                            {leaveType === "special" ? (
                                <>
                                    <Label>Special Leave Type</Label>
                                    <Select>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Choose Leave Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="personal">Personal Leave</SelectItem>
                                            <SelectItem value="special">Special Leave</SelectItem>
                                            <SelectItem value="mandatory">Mandatory</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <div className="grid grid-cols-2 gap-2">
                                        <DatePickerField
                                            label="Start Leave"
                                            value={startLeave}
                                            onChange={setStartLeave}
                                        />
                                        <DatePickerField
                                            label="End Leave"
                                            value={endLeave}
                                            onChange={setEndLeave}
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="grid gap-3">
                                        <Label htmlFor="reason-1">Reason</Label>
                                        <Input
                                            type="text"
                                            id="reason-1"
                                            placeholder="Brief reason for leave"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <DatePickerField
                                            label="Start Leave"
                                            value={startLeave}
                                            onChange={setStartLeave}
                                        />
                                        <DatePickerField
                                            label="End Leave"
                                            value={endLeave}
                                            onChange={setEndLeave}
                                        />
                                    </div>
                                </>
                            )}
                        </div>

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="ghost">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Submit</Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            ) : mode === "info" ? (
                <>
                    <DialogTrigger asChild>
                        <Button variant={variant} size={size} className={styleButton}>
                            {TitleButton}
                        </Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-[550px]">
                        <DialogHeader>
                            <DialogTitle>{title}</DialogTitle>
                            <DialogDescription>{description}</DialogDescription>
                        </DialogHeader>

                        {children}

                        {footer && (
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="ghost">Cancel</Button>
                                </DialogClose>
                                <Button>Save changes</Button>
                            </DialogFooter>
                        )}
                    </DialogContent>
                </>
            ) : (
                <DialogTrigger asChild>
                    <Button variant={variant} size={size} className={styleButton}>
                        {TitleButton}
                    </Button>
                </DialogTrigger>
            )}
        </Dialog>
    )
}

export default Modal

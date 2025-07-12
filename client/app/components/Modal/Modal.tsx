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
    triggerClassName?: string
    title: string
    triggerLabel: React.ReactNode
    description: string
    showFooter?: boolean
    mode?: "form" | "info" | "confirm" | "reject"
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
    size?: "default" | "sm" | "lg" | "icon"
}

export function Modal({
    children,
    triggerClassName,
    title,
    triggerLabel,
    description,
    showFooter = true,
    mode = "form",
    variant = "default",
    size = "default"
}: ModalTypeProps) {
    const [startLeave, setStartLeave] = useState<Date | undefined>()
    const [endLeave, setEndLeave] = useState<Date | undefined>()
    const [leaveType, setLeaveType] = useState("personal")

    const TriggerButton = () => (
        <DialogTrigger asChild>
            <Button variant={variant} size={size} className={triggerClassName}>
                {triggerLabel}
            </Button>
        </DialogTrigger>
    )

    const FormContent = () => (
        <form>
            {TriggerButton()}
            <DialogContent className="sm:max-w-[550px]">
                <DialogHeader className="flex flex-col justify-center items-center mb-3">
                    <DialogTitle>
                        <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <i className="bi bi-file-earmark-text text-white text-2xl" />
                        </div>
                        {title}
                    </DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 mb-3">
                    <div className="grid gap-2">
                        <Label>Leave Type</Label>
                        <Select value={leaveType} onValueChange={setLeaveType}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Leave Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="personal">Personal Leave</SelectItem>
                                <SelectItem value="special">Special Leave</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {leaveType === "special" ? (
                        <>
                            <Label>Special Leave Type</Label>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Choose Leave Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="personal">test</SelectItem>
                                    <SelectItem value="special">test</SelectItem>
                                    <SelectItem value="mandatory">test</SelectItem>
                                </SelectContent>
                            </Select>
                            <div className="grid grid-cols-2 gap-2">
                                <DatePickerField label="Start Leave" value={startLeave} onChange={setStartLeave} />
                                <DatePickerField label="End Leave" value={endLeave} onChange={setEndLeave} />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="grid gap-3">
                                <Label htmlFor="reason">Reason</Label>
                                <Input type="text" id="reason" placeholder="Brief reason for leave" />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <DatePickerField label="Start Leave" value={startLeave} onChange={setStartLeave} />
                                <DatePickerField label="End Leave" value={endLeave} onChange={setEndLeave} />
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
    )

    const InfoContent = () => (
        <>
            {TriggerButton()}
            <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                {children}
                {showFooter && (
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="ghost">Cancel</Button>
                        </DialogClose>
                        <Button>Save changes</Button>
                    </DialogFooter>
                )}
            </DialogContent>
        </>
    )

    const ConfirmContent = () => (
        <>
            {TriggerButton()}
            <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <p>{description}</p>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="ghost">Cancel</Button>
                    </DialogClose>
                    <Button className="bg-green-200 hover:bg-green-300 text-green-600 font-bold">Accept</Button>
                </DialogFooter>
            </DialogContent>
        </>
    )

    const RejectContent = () => (
        <>
            {TriggerButton()}
            <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <p>{description}</p>
                <div className="grid gap-3">
                    <Label htmlFor="reason-reject">Reason</Label>
                    <Input type="text" id="reason-reject" placeholder="Brief reason for rejection" />
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="ghost">Cancel</Button>
                    </DialogClose>
                    <Button className="bg-red-200 hover:bg-red-300 text-red-600 font-bold">Reject</Button>
                </DialogFooter>
            </DialogContent>
        </>
    )

    const ContentByMode = () => {
        switch (mode) {
            case "form":
                return FormContent()
            case "info":
                return InfoContent()
            case "confirm":
                return ConfirmContent()
            case "reject":
                return RejectContent()
            default:
                return TriggerButton()
        }
    }

    return <Dialog>{ContentByMode()}</Dialog>
}

export default Modal

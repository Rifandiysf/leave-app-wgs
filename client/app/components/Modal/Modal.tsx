"use client"

import { ReactNode, useEffect, useState } from "react"
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
import 'bootstrap-icons/font/bootstrap-icons.css'

type ModalTypeProps = {
    children?: React.ReactNode
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
    triggerClassName?: string
    title: string
    triggerLabel: React.ReactNode
    description?: ReactNode
    showFooter?: boolean
    mode?: "info" | "confirm" | "reject" | "approve"
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
    size?: "default" | "sm" | "lg" | "icon"
    onConfirm?: (reason?: string) => void;
}

export function Modal({
    children,
    onClick,
    triggerClassName,
    title,
    triggerLabel,
    description,
    showFooter = true,
    mode = "info",
    variant = "default",
    size = "default",
    onConfirm,
}: ModalTypeProps) {
    const [rejectionReason, setRejectionReason] = useState('')
    const [rejectionReasonError, setRejectionReasonErorr] = useState('')
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (!open) {
            setRejectionReasonErorr("")
        }
    }, [open])

    const handleConfirm = (reason?: string) => {
        if (mode === 'reject' && !reason?.trim()) {
            setRejectionReasonErorr("Reason cannot be empty.");
            return;
        }

        onConfirm?.(reason);
        setOpen(false);
    }

    const TriggerButton = () => (
        <DialogTrigger asChild>
            <Button variant={variant} size={size} className={triggerClassName}>
                {triggerLabel}
            </Button>
        </DialogTrigger>
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
                        <Button onClick={onClick}>Save changes</Button>
                    </DialogFooter>
                )}
            </DialogContent>
        </>
    )

    const ApproveContent = () => (
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
                    <Button
                        onClick={() => handleConfirm()}
                        className="bg-green-200 hover:bg-green-300 text-green-600 font-bold"
                    >
                        Accept
                    </Button>
                </DialogFooter>
            </DialogContent>
        </>
    )

    const RejectContent = () => (
        <>
            {TriggerButton()}
            <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                    <DialogTitle className="text-foreground">{title}</DialogTitle>
                </DialogHeader>
                <p className="text-muted-foreground">{description}</p>
                <div className="grid gap-3">
                    <Label htmlFor="reason-reject">Reason</Label>
                    <Input
                        type="text"
                        id="reason-reject"
                        placeholder="Brief reason for rejection"
                        value={rejectionReason}
                        onChange={(e) => {
                            setRejectionReason(e.target.value)
                        }}
                        className={rejectionReasonError && 'border-red-400'}
                    />
                    {rejectionReasonError && (
                        <p className="text-sm text-red-600 mt-1">{rejectionReasonError}</p>
                    )}
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="ghost">Cancel</Button>
                    </DialogClose>
                    <Button
                        onClick={() => handleConfirm(rejectionReason)}
                        className="bg-red-200 hover:bg-red-300 text-red-600 font-bold"
                    >
                        Reject
                    </Button>
                </DialogFooter>
            </DialogContent>
        </>
    )

    const ConfirmContent = () => (
        <>
            {TriggerButton()}
            <DialogContent className="sm:max-w-md p-6 [&>button]:hidden">
                <DialogTitle className="sr-only">{title}</DialogTitle>
                <p className="text-center text-lg font-medium text-foreground mb-8">
                    {title}
                </p>

                <div className="flex w-full items-center justify-between">
                    <DialogClose asChild>
                        <Button variant="ghost" className="text-foreground hover:bg-gray-100 px-3">
                            <i className="bi bi-box-arrow-left text-2xl"></i>
                            Cancel
                        </Button>
                    </DialogClose>

                    <Button
                        onClick={() => handleConfirm()}
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-10 py-1"
                    >
                        Yes
                    </Button>
                </div>
            </DialogContent>
        </>
    )

    const ContentByMode = () => {
        switch (mode) {
            case "info":
                return InfoContent()
            case "approve":
                return ApproveContent()
            case "reject":
                return RejectContent()
            case "confirm":
                return ConfirmContent()
            default:
                return TriggerButton()
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {ContentByMode()}
        </Dialog>
    )
}

export default Modal

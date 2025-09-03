import { applyMandatoryLeave, getMandatoryLeaveUsers } from "@/lib/api/service/leave";
import { MandatoryType } from "@/lib/type"
import { useEffect, useState } from "react"

type AppliedStatus = Record<string, "approved" | "rejected" | undefined>;

export function useMandatory() {
    const [dataMandatory, setMandatory] = useState<MandatoryType[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [appliedStatus, setAppliedStatus] = useState<AppliedStatus>({})
    const [selectedMandatory, setSelectedMandatory] = useState<MandatoryType | null>(null)
    const [isApply, setIsApply] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [cancelReason, setCancelReason] = useState("")
    const [cancelReasonError, setCancelReasonError] = useState("")

    useEffect(() => {
        setCancelReasonError("")
        setCancelReason("")
    }, [showConfirmModal])

    const fetchMandatoryData = async () => {
        try {
            const data = await getMandatoryLeaveUsers();
            setMandatory(data);

            const initialAppliedStatus: AppliedStatus = {};
            data.forEach((item: MandatoryType) => {
                if (item.taken) initialAppliedStatus[item.id_mandatory] = "approved";
            });
            setAppliedStatus(initialAppliedStatus);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMandatoryData()
    }, [])

    const handleToggleChange = (checked: boolean, item: MandatoryType) => {
        setSelectedMandatory(item)
        setIsApply(checked)
        setCancelReason("")
        setCancelReasonError("")
        setShowConfirmModal(true)
    }

    const handleConfirmSubmit = async () => {
        if (!selectedMandatory) return;
        setIsLoading(true);

        let hasError = false;
        if (!isApply) {
            if (!cancelReason.trim()) {
                setCancelReasonError("Reason cannot be empty");
                hasError = true;
            } else if (cancelReason.trim().length < 5) {
                setCancelReasonError("Reason must be at least 5 characters");
                hasError = true;
            } else {
                setCancelReasonError("");
            }
        }

        if (hasError) {
            setIsLoading(false);
            return;
        }

        try {
            await applyMandatoryLeave(
                selectedMandatory.id_mandatory,
                isApply ? "approved" : "rejected",
                isApply ? undefined : cancelReason.trim()
            );

            setMandatory((prevData) =>
                prevData.map((item) =>
                    item.id_mandatory === selectedMandatory.id_mandatory
                        ? { ...item, taken: isApply }
                        : item
                )
            );

            setAppliedStatus((prev) => ({
                ...prev,
                [selectedMandatory.id_mandatory]: isApply ? "approved" : "rejected",
            }));

            setShowConfirmModal(false);
        } catch (err) {
            console.error("Failed submit:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        dataMandatory,
        loading,
        appliedStatus,
        selectedMandatory,
        isApply,
        isLoading,
        showConfirmModal,
        cancelReason,
        cancelReasonError,
        setCancelReason,
        setShowConfirmModal,
        handleToggleChange,
        handleConfirmSubmit,
    };
}
import { applyLeave, getSpecialLeaveUsers } from "@/lib/api/service/leave"
import { useEffect, useReducer } from "react"


type LeaveType = "personal_leave" | "special_leave" | ""

interface SpecialLeave {
    id_special: string
    title: string
}

interface ApplyLeaveState {
    title: string
    leaveType: LeaveType
    startDate?: Date
    endDate?: Date
    reason: string
    specialLeaves: SpecialLeave[]
    selectedSpecialLeaveId: string

    generalError: string
    titleError: string;
    leaveTypeError: string;
    dateError: string;
    reasonError: string;
    specialLeaveError: string;

    isLoading: boolean;
    isDialogOpen: boolean;
    showConfirmModal: boolean;
    showDiscardModal: boolean;
    showSuccessNotification: boolean;
}

type ApplyLeaveAction =
    | { type: "SET_FIELD"; field: keyof ApplyLeaveState; value: any }
    | { type: "RESET_FORM" }
    | { type: "SET_ERROR"; errors: Partial<ApplyLeaveState> }
    | { type: "SET_SPECIAL_LEAVES"; leaves: SpecialLeave[] }

const initialState: ApplyLeaveState = {
    title: "",
    leaveType: "",
    startDate: undefined,
    endDate: undefined,
    reason: "",
    specialLeaves: [],
    selectedSpecialLeaveId: "",

    generalError: "",
    titleError: "",
    leaveTypeError: "",
    dateError: "",
    reasonError: "",
    specialLeaveError: "",

    isLoading: false,
    isDialogOpen: false,
    showConfirmModal: false,
    showDiscardModal: false,
    showSuccessNotification: false,
}

function ApplyLeaveReducer(state: ApplyLeaveState, action: ApplyLeaveAction): ApplyLeaveState {
    switch (action.type) {
        case "SET_FIELD":
            return { ...state, [action.field]: action.value };
        case "RESET_FORM":
            return { ...initialState };
        case "SET_ERROR":
            return { ...state, ...action.errors };
        case "SET_SPECIAL_LEAVES":
            return { ...state, specialLeaves: action.leaves };
        default:
            return state
    }
}

export function useApplyLeave() {
    const [state, dispatch] = useReducer(ApplyLeaveReducer, initialState)

    useEffect(() => {
        if (!state.isDialogOpen && !state.showSuccessNotification) dispatch({ type: "RESET_FORM" })
    }, [state.isDialogOpen, state.showSuccessNotification])

    useEffect(() => {
        if (state.leaveType === "special_leave") {
            getSpecialLeaveUsers()
                .then((leaves) => dispatch({ type: "SET_SPECIAL_LEAVES", leaves }))
                .catch(() => {
                    dispatch({
                        type: "SET_ERROR",
                        errors: { generalError: "Failed to fetch special leaves" }
                    })
                })
        } else {
            dispatch({ type: "SET_FIELD", field: "selectedSpecialLeaveId", value: "" })
        }
        dispatch({ type: "SET_FIELD", field: "startDate", value: undefined })
        dispatch({ type: "SET_FIELD", field: "endDate", value: undefined })
    }, [state.leaveType])

    const validationForm = (): boolean => {
        const errors: Partial<ApplyLeaveState> = {};
        let hasError = false;

        if (!state.leaveType) {
            errors.leaveTypeError = "Leave type is required";
            hasError = true;
        }

        if (state.leaveType === "special_leave") {
            if (!state.selectedSpecialLeaveId) {
                errors.specialLeaveError = "Please select a special leave type";
                hasError = true;
            }
            if (!state.startDate) {
                errors.dateError = "Leave date is required for special leave.";
                hasError = true;
            }
        } else {
            if (!state.title.trim()) {
                errors.titleError = "Title cannot be empty";
                hasError = true;
            } else if (state.title.trim().length < 3) {
                errors.titleError = "Title must be at least 3 characters";
                hasError = true;
            }
            if (!state.reason.trim()) {
                errors.reasonError = "Reason cannot be empty";
                hasError = true;
            } else if (state.reason.trim().length < 5) {
                errors.reasonError = "Reason must be at least 5 characters";
                hasError = true;
            }
            if (!state.startDate || !state.endDate) {
                errors.dateError = "Both start and end date are required.";
                hasError = true;
            }
        }

        if (hasError) dispatch({ type: "SET_ERROR", errors });
        return !hasError;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validationForm()) return
        dispatch({ type: "SET_FIELD", field: "showConfirmModal", value: true })
    }

    const confirmSubmit = async () => {
        dispatch({ type: "SET_FIELD", field: "showConfirmModal", value: false })
        dispatch({ type: "SET_FIELD", field: "isLoading", value: true })

        try {
            const payload: any = {
                leave_type: state.leaveType,
                start_date: state.startDate?.toLocaleDateString("en-CA"),
            };

            if (state.leaveType === "special_leave") {
                const selectedSpecialLeave = state.specialLeaves.find(
                    (leave) => leave.id_special === state.selectedSpecialLeaveId
                );
                payload.title = selectedSpecialLeave?.title || "";
                payload.end_date = state.startDate?.toLocaleDateString("en-CA");
                payload.id_special = state.selectedSpecialLeaveId;
                payload.reason = "Special Leave";
            } else {
                payload.title = state.title;
                payload.end_date = state.endDate?.toLocaleDateString("en-CA");
                payload.reason = state.reason;
            }

            await applyLeave(payload);

            dispatch({ type: "SET_FIELD", field: "isDialogOpen", value: false })
            dispatch({ type: "SET_FIELD", field: "showSuccessNotification", value: true })
            window.location.reload()
        } catch (err: any) {
            dispatch({
                type: "SET_ERROR",
                errors: { generalError: err?.response?.data?.message || "Failed to request leave" },
            });
        } finally {
            dispatch({ type: "SET_FIELD", field: "isLoading", value: false })
        }
    }

    return { state, dispatch, handleSubmit, confirmSubmit }
}
import { updateSpecialLeave } from "@/lib/api/service/leave";
import { useEffect, useReducer } from "react";

export type DataSpecialType = {
    id_special: string;
    title: string;
    applicable_gender: string;
    duration: number;
    type: string;
    description: string;
};

interface EditSpecialState {
    title: string;
    gender: string;
    duration: number;
    type: string;
    description: string;
    errors: {
        title?: string;
        gender?: string;
        duration?: string;
        type?: string;
        description?: string;
        general?: string;
    };
    success: string;
    loading: boolean;
    showConfirmModal: boolean;
    showDiscardModal: boolean;
    isDialogOpen: boolean;
}

type EditSpecialAction =
    | { type: "SET_FIELD"; field: keyof EditSpecialState; value: any }
    | { type: "SET_ERROR"; field: keyof EditSpecialState["errors"]; value: string }
    | { type: "CLEAR_ERRORS" }
    | { type: "SET_SUCCESS"; message: string }
    | { type: "SET_LOADING"; value: boolean }
    | { type: "RESET"; payload: DataSpecialType };

const initialState: EditSpecialState = {
    title: "",
    gender: "",
    duration: 0,
    type: "",
    description: "",
    errors: {},
    success: "",
    loading: false,
    showConfirmModal: false,
    showDiscardModal: false,
    isDialogOpen: false,
};

function EditSpecialReducer(state: EditSpecialState, action: EditSpecialAction): EditSpecialState {
    switch (action.type) {
        case "SET_FIELD":
            return { ...state, [action.field]: action.value };
        case "SET_ERROR":
            return { ...state, errors: { ...state.errors, [action.field]: action.value } };
        case "CLEAR_ERRORS":
            return { ...state, errors: {}, success: "" };
        case "SET_SUCCESS":
            return { ...state, success: action.message };
        case "SET_LOADING":
            return { ...state, loading: action.value };
        case "RESET":
            return {
                ...initialState,
                title: action.payload.title,
                gender: action.payload.applicable_gender,
                duration: action.payload.duration,
                type: action.payload.type,
                description: action.payload.description,
            };
        default:
            return state;
    }
}

export const useEditSpecialLeave = (initialData: DataSpecialType, onSuccess: () => void) => {
    const [state, dispatch] = useReducer(EditSpecialReducer, initialState)

    useEffect(() => {
        dispatch({ type: "RESET", payload: initialData })
    }, [initialData])

    const validateForm = () => {
        let hasError = true;
        dispatch({ type: "CLEAR_ERRORS" });

        if (!state.title.trim()) {
            dispatch({ type: "SET_ERROR", field: "title", value: "Title cannot be empty" });
            hasError = false;
        }
        if (!state.description.trim()) {
            dispatch({ type: "SET_ERROR", field: "description", value: "Description cannot be empty" });
            hasError = false;
        }
        if (state.duration <= 0) {
            dispatch({ type: "SET_ERROR", field: "duration", value: "Amount cannot be 0 days" });
            hasError = false;
        }
        if (state.type.trim()) {
            dispatch({ type: "SET_ERROR", field: 'type', value: "Type cannot be empty" })
        }
        if (!state.gender.trim()) {
            dispatch({ type: "SET_ERROR", field: "gender", value: "Gender cannot be empty" });
            hasError = false;
        }

        return hasError;
    };

    const handleConfirmModal = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        dispatch({ type: "SET_FIELD", field: "showConfirmModal", value: true });
    };

    const handleSubmit = async () => {
        dispatch({ type: "SET_FIELD", field: "showConfirmModal", value: false });
        dispatch({ type: "SET_LOADING", value: true });
        try {
            const result = await updateSpecialLeave(initialData.id_special, {
                title: state.title,
                applicable_gender: state.gender,
                duration: state.duration,
                type: state.type,
                description: state.description,
            })

            dispatch({ type: "SET_SUCCESS", message: result.message || "Special leave updated successfully!" })
            onSuccess()
        } catch (err: any) {
            dispatch({ type: "SET_ERROR", field: "general", value: err?.response?.data?.message || "Failed to update data. Please try again." });
        } finally {
            dispatch({ type: "SET_LOADING", value: false });
        }
    }

    return { state, dispatch, handleSubmit, handleConfirmModal }
}
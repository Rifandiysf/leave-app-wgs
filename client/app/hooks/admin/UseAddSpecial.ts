import { addSpecialLeave } from "@/lib/api/service/leave";
import { useReducer } from "react";


interface AddSpecialState {
    title: string;
    gender: string;
    duration: number;
    description: string;
    errors: {
        title?: string;
        gender?: string;
        duration?: string;
        description?: string;
        general?: string;
    };
    success: string;
    loading: boolean;
}

type AddSpecialAction =
    | { type: "SET_FIELD"; field: keyof AddSpecialState; value: any }
    | { type: "SET_ERROR"; field: keyof AddSpecialState["errors"]; value: string }
    | { type: "CLEAR_ERRORS" }
    | { type: "SET_SUCCESS"; message: string }
    | { type: "SET_LOADING"; value: boolean }
    | { type: "RESET" };

const initialState: AddSpecialState = {
    title: "",
    gender: "",
    duration: 0,
    description: "",
    errors: {},
    success: "",
    loading: false,
}

function AddSpecialReducer(state: AddSpecialState, action: AddSpecialAction): AddSpecialState {
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
            return initialState;
        default:
            return state;
    }
}

export const useAddSpecialLeave = (onSuccess: () => void) => {
    const [state, dispatch] = useReducer(AddSpecialReducer, initialState)

    const validateForm = () => {
        let hasError = false;
        dispatch({ type: "CLEAR_ERRORS" })

        if (!state.title.trim()) {
            dispatch({ type: "SET_ERROR", field: "title", value: "Title cannot be empty" });
            hasError = true;
        }
        if (!state.description.trim()) {
            dispatch({ type: "SET_ERROR", field: "description", value: "Description cannot be empty" });
            hasError = true;
        }
        if (state.duration <= 0) {
            dispatch({ type: "SET_ERROR", field: "duration", value: "Amount cannot be 0 days" });
            hasError = true;
        }
        if (!state.gender.trim()) {
            dispatch({ type: "SET_ERROR", field: "gender", value: "Gender cannot be empty" });
            hasError = true;
        }

        return !hasError;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validateForm()) return

        dispatch({ type: "SET_LOADING", value: true })
        try {
            const result = await addSpecialLeave({
                title: state.title,
                applicable_gender: state.gender,
                duration: state.duration,
                description: state.description
            })

            dispatch({ type: "SET_SUCCESS", message: result.message || "Special leave added successfully!" })
            onSuccess();
            dispatch({ type: "RESET" })
        } catch (err: any) {
            dispatch({ type: "SET_ERROR", field: "general", value: err?.response?.data?.message || "Failed to add data. Check your network or server response." })
        } finally {
            dispatch({ type: "SET_LOADING", value: false })
        }
    }

    return { state, dispatch, handleSubmit }
}
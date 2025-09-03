import { addMandatoryLeave } from "@/lib/api/service/leave";
import { MandatoryPayload } from "@/lib/type";
import { useReducer } from "react";


interface AddMandatoryState {
    title: string;
    description: string;
    startDate?: Date;
    endDate?: Date;
    errors: {
        title?: string;
        description?: string;
        date?: string;
        general?: string;
    };
    success: string;
    isLoading: boolean;
}

type AddMandatoryAction =
    | { type: "SET_FIELD"; field: keyof AddMandatoryState; value: any }
    | { type: "SET_ERROR"; field: keyof AddMandatoryState["errors"]; value: string }
    | { type: "CLEAR_ERRORS" }
    | { type: "SET_SUCCESS"; message: string }
    | { type: "SET_LOADING"; value: boolean }
    | { type: "RESET" };

const initialState: AddMandatoryState = {
    title: "",
    description: "",
    startDate: undefined,
    endDate: undefined,
    errors: {},
    success: "",
    isLoading: false,
}

function AddMandatoryReducer(state: AddMandatoryState, action: AddMandatoryAction): AddMandatoryState {
    switch (action.type) {
        case "SET_FIELD":
            return { ...state, [action.field]: action.value };
        case "SET_ERROR":
            return { ...state, errors: { ...state.errors, [action.field]: action.value } };
        case "CLEAR_ERRORS":
            return { ...state, errors: {} };
        case "SET_SUCCESS":
            return { ...state, success: action.message };
        case "SET_LOADING":
            return { ...state, isLoading: action.value };
        case "RESET":
            return initialState;
        default:
            return state;
    }
}

export function useAddMandatory(onSuccess: () => void) {
    const [state, dispatch] = useReducer(AddMandatoryReducer, initialState)

    const validateForm = () => {
        let hasError = false;
        dispatch({ type: "CLEAR_ERRORS" });

        if (!state.title.trim()) {
            dispatch({ type: "SET_ERROR", field: "title", value: "Title cannot be empty" });
            hasError = true;
        }
        if (!state.description.trim()) {
            dispatch({ type: "SET_ERROR", field: "description", value: "Description cannot be empty" });
            hasError = true;
        }
        if (!state.startDate || !state.endDate) {
            dispatch({
                type: "SET_ERROR",
                field: "date",
                value: "Both start and end date are required.",
            });
            hasError = true;
        } else if (state.endDate < state.startDate) {
            dispatch({
                type: "SET_ERROR",
                field: "date",
                value: "End date cannot be before start date.",
            });
            hasError = true;
        }

        return !hasError;
    };

    const submit = async () => {
        if (!validateForm()) return;

        dispatch({ type: "SET_LOADING", value: true });
        try {
            const payload: MandatoryPayload = {
                title: state.title,
                description: state.description,
                start_date: state.startDate?.toLocaleDateString("en-CA")!,
                end_date: state.endDate?.toLocaleDateString("en-CA")!,
            };
            const result = await addMandatoryLeave(payload);
            dispatch({ type: "SET_SUCCESS", message: result.message || "Mandatory leave added successfully!" });
            onSuccess();
            dispatch({ type: "RESET" });
        } catch (err: any) {
            dispatch({
                type: "SET_ERROR",
                field: "general",
                value: err.response?.data?.message || "Failed to add data. Please try again.",
            });
        } finally {
            dispatch({ type: "SET_LOADING", value: false });
        }
    };

    return { state, dispatch, submit };
}
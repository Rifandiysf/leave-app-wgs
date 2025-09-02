import { updateMandatoryLeave } from "@/lib/api/service/leave";
import { useReducer } from "react";


type EditMandatoryState = {
    title: string;
    description: string;
    startDate?: Date;
    endDate?: Date;
    titleError: string;
    descriptionError: string;
    dateError: string;
    generalError: string;
    generalSuccess: string;
    isLoading: boolean;
};

type EditMandatoryAction =
    | { type: "SET_FIELD"; field: keyof EditMandatoryState; value: any }
    | { type: "SET_ERROR"; field: keyof EditMandatoryState; message: string }
    | { type: "RESET_ERRORS" }
    | { type: "SET_LOADING"; value: boolean }
    | { type: "SET_SUCCESS"; message: string }
    | { type: "RESET"; payload: Partial<EditMandatoryState> };

const initialState: EditMandatoryState = {
    title: "",
    description: "",
    startDate: undefined,
    endDate: undefined,
    titleError: "",
    descriptionError: "",
    dateError: "",
    generalError: "",
    generalSuccess: "",
    isLoading: false,
};

function EditMandatoryReducer(state: EditMandatoryState, action: EditMandatoryAction): EditMandatoryState {
    switch (action.type) {
        case "SET_FIELD":
            return { ...state, [action.field]: action.value };
        case "SET_ERROR":
            return { ...state, [action.field]: action.message };
        case "RESET_ERRORS":
            return {
                ...state,
                titleError: "",
                descriptionError: "",
                dateError: "",
                generalError: "",
                generalSuccess: "",
            };
        case "SET_LOADING":
            return { ...state, isLoading: action.value };
        case "SET_SUCCESS":
            return { ...state, generalSuccess: action.message };
        case "RESET":
            return { ...state, ...action.payload };
        default:
            return state;
    }
}

export const useEditMandatory = (initialData: {
    id_mandatory: string;
    title: string;
    description: string;
    start_date: string;
    end_date: string;
}) => {
    const [state, dispatch] = useReducer(EditMandatoryReducer, {
        ...initialState,
        title: initialData.title,
        description: initialData.description,
        startDate: initialData.start_date ? new Date(initialData.start_date) : undefined,
        endDate: initialData.end_date ? new Date(initialData.end_date) : undefined,
    })

    const resetToInitial = () => {
        dispatch({
            type: "RESET",
            payload: {
                title: initialData.title,
                description: initialData.description,
                startDate: initialData.start_date ? new Date(initialData.start_date) : undefined,
                endDate: initialData.end_date ? new Date(initialData.end_date) : undefined,
                titleError: "",
                descriptionError: "",
                dateError: "",
                generalError: "",
                generalSuccess: "",
            },
        });
    };

    const validateForm = () => {
        let hasError = true;
        dispatch({ type: "RESET_ERRORS" });

        if (!state.title.trim()) {
            dispatch({ type: "SET_ERROR", field: "titleError", message: "Title cannot be empty" });
            hasError = false;
        }
        if (!state.description.trim()) {
            dispatch({ type: "SET_ERROR", field: "descriptionError", message: "Description cannot be empty" });
            hasError = false;
        }
        if (!state.startDate || !state.endDate) {
            dispatch({ type: "SET_ERROR", field: "dateError", message: "Both start and end date are required." });
            hasError = false;
        } else if (state.endDate < state.startDate) {
            dispatch({ type: "SET_ERROR", field: "dateError", message: "End date cannot be before start date." });
            hasError = false;
        }

        return hasError;
    };

    const handleSubmit = async (onFormSubmit: () => void) => {
        if (!validateForm()) return
        dispatch({ type: "SET_LOADING", value: true })

        try {
            const payload = {
                title: state.title,
                description: state.description,
                start_date: state.startDate?.toLocaleDateString("en-CA")!,
                end_date: state.endDate?.toLocaleDateString("en-CA")!,
            }

            const result = await updateMandatoryLeave(initialData.id_mandatory, payload)

            dispatch({ type: "SET_SUCCESS", message: result.message || "Mandatory leave updated successfully!" });
            onFormSubmit();
            return true;
        } catch (error) {
            dispatch({ type: "SET_ERROR", field: "generalError", message: "Failed to update mandatory leave" });
            return false;
        } finally {
            dispatch({ type: "SET_LOADING", value: false });
        }
    }

    return { state, dispatch, handleSubmit, resetToInitial };
}
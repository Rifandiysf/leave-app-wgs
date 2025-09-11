import { useReducer } from "react";
import { updateMandatoryYear } from "@/lib/api/service/leave";

interface UpdateYearState {
    selectedYear: number;
    loading: boolean;
    error: string;
    success: string;
}

type UpdateYearAction =
    | { type: "SET_FIELD"; field: keyof UpdateYearState; value: any }
    | { type: "SET_ERROR"; message: string }
    | { type: "SET_SUCCESS"; message: string }
    | { type: "RESET" };

const currentYear = new Date().getFullYear();

const initialState: UpdateYearState = {
    selectedYear: currentYear,
    loading: false,
    error: "",
    success: "",
};

function updateYearReducer(state: UpdateYearState, action: UpdateYearAction): UpdateYearState {
    switch (action.type) {
        case "SET_FIELD":
            return { ...state, [action.field]: action.value };
        case "SET_ERROR":
            return { ...state, error: action.message, success: "" };
        case "SET_SUCCESS":
            return { ...state, success: action.message, error: "" };
        case "RESET":
            return { ...initialState };
        default:
            return state;
    }
}

export const useUpdateMandatoryYear = (onSuccess: () => void) => {
    const [state, dispatch] = useReducer(updateYearReducer, initialState);

    const handleSubmit = async () => {
        dispatch({ type: "SET_FIELD", field: "loading", value: true });
        try {
            const res = await updateMandatoryYear(state.selectedYear);
            dispatch({ type: "SET_SUCCESS", message: res.message || "Year updated successfully!" });
            onSuccess(); // refresh data di page
        } catch (err: any) {
            dispatch({
                type: "SET_ERROR",
                message: err?.response?.data?.message || "Failed to update year",
            });
        } finally {
            dispatch({ type: "SET_FIELD", field: "loading", value: false });
        }
    };

    return { state, dispatch, handleSubmit };
};

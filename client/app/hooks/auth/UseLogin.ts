"use client"

import { loginRequest } from "@/lib/api/service/auth";
import { useReducer } from "react";


interface LoginState {
    email: string;
    password: string;
    showPassword: boolean;
    emailError: string;
    passwordError: string;
    generalError: string;
    isLoading: boolean;
}

type LoginAction =
    | { type: "SET_EMAIL"; payload: string }
    | { type: "SET_PASSWORD"; payload: string }
    | { type: "TOGGLE_SHOW_PASSWORD" }
    | { type: "SET_EMAIL_ERROR"; payload: string }
    | { type: "SET_PASSWORD_ERROR"; payload: string }
    | { type: "SET_GENERAL_ERROR"; payload: string }
    | { type: "SET_LOADING"; payload: boolean }
    | { type: "RESET_ERRORS" };

const initialState: LoginState = {
    email: "",
    password: "",
    showPassword: false,
    emailError: "",
    passwordError: "",
    generalError: "",
    isLoading: false,
};


function LoginReducer(state: LoginState, action: LoginAction): LoginState {
    switch (action.type) {
        case "SET_EMAIL":
            return { ...state, email: action.payload };
        case "SET_PASSWORD":
            return { ...state, password: action.payload };
        case "TOGGLE_SHOW_PASSWORD":
            return { ...state, showPassword: !state.showPassword };
        case "SET_EMAIL_ERROR":
            return { ...state, emailError: action.payload };
        case "SET_PASSWORD_ERROR":
            return { ...state, passwordError: action.payload };
        case "SET_GENERAL_ERROR":
            return { ...state, generalError: action.payload };
        case "SET_LOADING":
            return { ...state, isLoading: action.payload };
        case "RESET_ERRORS":
            return { ...state, emailError: "", passwordError: "", generalError: "" };
        default:
            return state;
    }
}

export const useLogin = (onSuccess: () => void) => {
    const [state, dispatch] = useReducer(LoginReducer, initialState)

    const validateForm = (): boolean => {
        let hasError = false;
        dispatch({ type: "RESET_ERRORS" });

        if (!state.email) {
            dispatch({ type: "SET_EMAIL_ERROR", payload: "Email wajib diisi" });
            hasError = true;
        }

        if (!state.password) {
            dispatch({ type: "SET_PASSWORD_ERROR", payload: "Password wajib diisi" });
            hasError = true;
        }

        return !hasError;
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validateForm()) return;
        dispatch({ type: "SET_LOADING", payload: true })

        try {
            await loginRequest(state.email, state.password)
            onSuccess()
        } catch (error: any) {
            const message = error.response?.data?.message || "Terjadi kesalahan, coba beberapa saat lagi";
            dispatch({ type: "SET_GENERAL_ERROR", payload: message });
        } finally {
            dispatch({ type: "SET_LOADING", payload: false });
        }
    }

    return { state, dispatch, handleLogin }
}
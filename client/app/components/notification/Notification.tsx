import 'bootstrap-icons/font/bootstrap-icons.css'
import React, { useEffect } from 'react';

interface SuccessNotificationProps {
    mode: 'success' | 'failed' | "warning"
    show: boolean;
    message: string | (() => string);
    onClose: () => void;
    duration?: number;
}

export function SuccessNotification({
    show,
    message,
    onClose,
    duration = 3000
}: SuccessNotificationProps) {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [show, duration, onClose]);

    if (!show) return null;

    const displayMessage = typeof message === 'function' ? message() : message;

    return (
        <div className="fixed top-6 z-50 animate-in slide-in-from-top-2 duration-300">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg max-w-sm">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        <i className="bi bi-check-circle-fill text-green-400"></i>
                    </div>
                    <div className="ml-3">
                        <p className="text-xl font-medium text-green-800">Success!</p>
                        <p className="text-base text-green-700 mt-1">{displayMessage}</p>
                    </div>
                    <div className="ml-auto pl-3">
                        <button
                            className="inline-flex text-green-400 hover:text-green-600 focus:outline-none"
                            onClick={onClose}
                        >
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
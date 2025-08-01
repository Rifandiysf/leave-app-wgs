import 'bootstrap-icons/font/bootstrap-icons.css'
import React, { useEffect } from 'react';

interface SuccessNotificationProps {
    mode: 'success' | 'failed' | 'warning' | (() => 'success' | 'failed' | 'warning')
    show: boolean;
    message: string | (() => string);
    onClose: () => void;
    duration?: number;
}

const modeConfig = {
    success: {
        icon: 'bi-check-circle-fill',
        iconColor: 'text-green-400',
        title: 'Success!',
        bg: 'bg-green-50',
        border: 'border-green-200',
        textColor: 'text-green-800',
        descColor: 'text-green-700',
        closeColor: 'text-green-400 hover:text-green-600',
    },
    failed: {
        icon: 'bi-x-circle-fill',
        iconColor: 'text-red-400',
        title: 'Failed!',
        bg: 'bg-red-50',
        border: 'border-red-200',
        textColor: 'text-red-800',
        descColor: 'text-red-700',
        closeColor: 'text-red-400 hover:text-red-600',
    },
    warning: {
        icon: 'bi-exclamation-triangle-fill',
        iconColor: 'text-yellow-400',
        title: 'Warning!',
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        textColor: 'text-yellow-800',
        descColor: 'text-yellow-700',
        closeColor: 'text-yellow-400 hover:text-yellow-600',
    },
};

export function Notification({
    mode = 'success',
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
    const config = modeConfig[mode];

    return (
        <div className="fixed top-6 z-50 animate-in slide-in-from-top-2 duration-300">
            <div className={`${config.bg} border ${config.border} rounded-lg p-4 shadow-lg max-w-sm`}>
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        <i className={`bi ${config.icon} ${config.iconColor}`}></i>
                    </div>
                    <div className="ml-3">
                        <p className={`text-xl font-medium ${config.textColor}`}>{config.title}</p>
                        <p className={`text-base ${config.descColor} mt-1`}>{displayMessage}</p>
                    </div>
                    <div className="ml-auto pl-3">
                        <button
                            className={`inline-flex ${config.closeColor} focus:outline-none`}
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
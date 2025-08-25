'use client'

import 'bootstrap-icons/font/bootstrap-icons.css';

type LeaveChoiceModalProps = {
    isOpen: boolean;
    onSelectMode: (mode: 'requests' | 'history') => void;
    onClose?: () => void;
};

export const LeaveChoiceModal = ({ isOpen, onSelectMode, onClose }: LeaveChoiceModalProps) => {
    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget && onClose) {
            onClose();
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
            onClick={handleBackdropClick}
        >
            <div className="bg-background rounded-2xl shadow-lg w-full max-w-lg mx-4 sm:max-w-4xl sm:mx-4 relative">
                {/* Close Button */}
                {onClose && (
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 z-10"
                    >
                        <i className="bi bi-x text-xl text-gray-600"></i>
                    </button>
                )}

                {/* Content */}
                <div className="p-6 sm:p-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
                        <button
                            onClick={() => onSelectMode('requests')}
                            className="flex flex-col items-center justify-center p-6 sm:p-10 bg-blue-100 text-blue-800 rounded-xl hover:bg-blue-200 transition-colors duration-300"
                        >
                            <i className="bi bi-envelope-paper text-5xl sm:text-7xl mb-4 sm:mb-5"></i>
                            <span className="text-xl sm:text-3xl font-semibold">Request Leave</span>
                            <p className="text-base sm:text-lg text-gray-600 mt-2 text-center">View pending requests</p>
                        </button>

                        <button
                            onClick={() => onSelectMode('history')}
                            className="flex flex-col items-center justify-center p-6 sm:p-10 bg-gray-100 text-gray-800 rounded-xl hover:bg-gray-200 transition-colors duration-300"
                        >
                            <i className="bi bi-folder2-open text-5xl sm:text-7xl mb-4 sm:mb-5"></i>
                            <span className="text-xl sm:text-3xl font-semibold">History Leave</span>
                            <p className="text-base sm:text-lg text-gray-600 mt-2 text-center">View all leave history</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
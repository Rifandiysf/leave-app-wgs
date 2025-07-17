'use client'

import 'bootstrap-icons/font/bootstrap-icons.css';

type LeaveChoiceModalProps = {
    isOpen: boolean;
    onSelectMode: (mode: 'requests' | 'history') => void;
};

export const LeaveChoiceModal = ({ isOpen, onSelectMode }: LeaveChoiceModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40  backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-12 rounded-2xl shadow-lg w-full max-w-4xl mx-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <button
                        onClick={() => onSelectMode('requests')}
                        className="flex flex-col items-center justify-center p-10 bg-blue-100 text-blue-800 rounded-xl hover:bg-blue-200 transition-colors duration-300"
                    >
                        <i className="bi bi-envelope-paper text-7xl mb-5"></i>
                        <span className="text-3xl font-semibold">Request Leave</span>
                        <p className="text-lg text-gray-600 mt-2">View pending requests</p>
                    </button>

                    <button
                        onClick={() => onSelectMode('history')}
                        className="flex flex-col items-center justify-center p-10 bg-gray-100 text-gray-800 rounded-xl hover:bg-gray-200 transition-colors duration-300"
                    >
                        <i className="bi bi-folder2-open text-7xl mb-5"></i>
                        <span className="text-3xl font-semibold">History Leave</span>
                         <p className="text-lg text-gray-600 mt-2">View all leave history</p>
                    </button>
                </div>
            </div>
        </div>
    );
};

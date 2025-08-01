'use client'

import React from 'react';
import { Button } from '@/app/components/ui/button'; 
import 'bootstrap-icons/font/bootstrap-icons.css';

type SuccessAlertProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
};

const SuccessAlert = ({ isOpen, onClose, title }: SuccessAlertProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-[100] w-full max-w-md px-4">
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-6 text-center border border-green-100">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-9 h-9 flex items-center justify-center bg-green-100 rounded-full ring-4 ring-green-50">
            <i className="bi bi-check2-circle text-green-600 text-2xl"></i>
          </div>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>

        <Button
          onClick={onClose}
          className="w-full sm:w-auto px-10 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-base"
        >
          OK
        </Button>
      </div>
    </div>
  );
};

export default SuccessAlert;

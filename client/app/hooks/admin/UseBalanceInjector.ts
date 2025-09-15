'use client';

import { useState, useCallback } from 'react';
import { injectBalanceAdjustment } from '@/lib/api/service/admin';

interface UploadErrorState {
    message: string;
    detail?: string;
}

export function useBalanceInjection() {
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
    
    const [uploadError, setUploadError] = useState<UploadErrorState | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            const selectedFile = acceptedFiles[0];
            if (selectedFile.type === 'text/csv') {
                setFile(selectedFile);
                setUploadError(null);
                setUploadSuccess(null);
            } else {
                setUploadError({ message: 'Hanya file dengan format .csv yang diterima.' });
                setFile(null);
            }
        }
    }, []);

    const handleUpload = async () => {
        if (!file) {
            setUploadError({ message: "Silakan pilih file terlebih dahulu." });
            return;
        }

        setIsUploading(true);
        setUploadError(null);
        setUploadSuccess(null);

        try {
            const response = await injectBalanceAdjustment(file);
            setUploadSuccess(response.message || 'File berhasil diproses!');
            setFile(null);
        } catch (error: any) {
            const errorData = error.response?.data;
            const errorMessage = errorData?.message || "Terjadi kesalahan saat mengunggah file.";
            const errorDetail = errorData?.detail;

            setUploadError({ message: errorMessage, detail: errorDetail });
        } finally {
            setIsUploading(false);
        }
    };
    
    const resetState = () => {
        setFile(null);
        setIsUploading(false);
        setUploadSuccess(null);
        setUploadError(null);
    };

    return {
        file,
        isUploading,
        uploadSuccess,
        uploadError,
        onDrop,
        handleUpload,
        resetState,
    };
}
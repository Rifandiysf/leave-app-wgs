'use client';

import { useState, useCallback } from 'react';
import { injectBalanceAdjustment } from '@/lib/api/service/admin';

export function useBalanceInjection() {
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
    const [uploadError, setUploadError] = useState<string | null>(null);
    // State dan logika untuk uploadProgress sudah tidak ada

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            const selectedFile = acceptedFiles[0];
            if (selectedFile.type === 'text/csv') {
                setFile(selectedFile);
                setUploadError(null);
                setUploadSuccess(null);
            } else {
                setUploadError('Hanya file dengan format .csv yang diterima.');
                setFile(null);
            }
        }
    }, []);

    const handleUpload = async () => {
        if (!file) {
            setUploadError("Silakan pilih file terlebih dahulu.");
            return;
        }

        setIsUploading(true);
        setUploadError(null);
        setUploadSuccess(null);

        try {
            // PERBAIKAN: Hanya satu argumen yang dikirim
            const response = await injectBalanceAdjustment(file);
            setUploadSuccess(response.message || 'File berhasil diproses!');
            setFile(null);
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Terjadi kesalahan saat mengunggah file.";
            setUploadError(errorMessage);
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
'use client';

import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/app/components/ui/button';
import { useBalanceInjection } from '@/app/hooks/admin/UseBalanceInjector';

export const BalanceInjection = () => {
    const {
        file,
        isUploading,
        uploadSuccess,
        uploadError,
        onDrop,
        handleUpload,
    } = useBalanceInjection();
    // uploadProgress dihapus dari sini

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'text/csv': ['.csv'] },
        multiple: false,
    });

    const uploadedFileName = file?.name;

    return (
        <div className='flex flex-col gap-4'>
            <div>
                <Label className='block text-sm font-medium mb-1'>Unggah File CSV</Label>
                <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${isDragActive ? 'border-blue-500 bg-blue-500/10' : 'border-border bg-accent'}`}
                >
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p className="text-blue-500">Lepaskan file di sini...</p>
                    ) : (
                        <>
                            {uploadedFileName && !uploadSuccess && !uploadError ? (
                                <div className='text-center'>
                                    <i className="bi bi-file-earmark-spreadsheet-fill text-3xl text-foreground mb-2" />
                                    <p className="text-sm text-foreground">{uploadedFileName}</p>
                                </div>
                            ) : (
                                <>
                                    <i className="bi bi-cloud-arrow-up-fill text-3xl text-muted-foreground mb-2" />
                                    <p className="text-sm text-muted-foreground">Tarik & lepas file CSV di sini, atau klik untuk memilih</p>
                                    <p className="text-xs text-muted-foreground/80 mt-1">Hanya file .csv yang diterima</p>
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Komponen Progress telah dihapus dari sini */}

            {uploadSuccess && (
                <div className="bg-green-500/10 text-green-700 dark:text-green-400 p-3 rounded-lg text-sm flex items-center gap-2">
                    <i className='bi bi-check-circle-fill'></i> {uploadSuccess}
                </div>
            )}
            {uploadError && (
                 <div className="bg-red-500/10 text-red-700 dark:text-red-500 p-3 rounded-lg text-sm flex items-center gap-2">
                    <i className='bi bi-x-circle-fill'></i> {uploadError}
                </div>
            )}
            
            <div className="flex justify-end items-center mt-2">
                <Button
                    onClick={handleUpload}
                    disabled={!file || isUploading}
                    className="bg-blue-500 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 font-medium shadow-md text-sm"
                >
                    {/* Teks persentase dihapus */}
                    {isUploading ? 'Mengunggah...' : 'Inject Data'}
                </Button>
            </div>
        </div>
    );
};

const Label = ({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) => (
    <label className={`text-xs font-medium text-foreground ${className}`} {...props} />
);
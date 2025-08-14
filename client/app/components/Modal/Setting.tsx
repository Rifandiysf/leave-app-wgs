"use client";

import 'bootstrap-icons/font/bootstrap-icons.css'
import { Button } from "../ui/button"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Label } from "@/app/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { useDropzone } from 'react-dropzone'
import { useCallback, useEffect, useState } from 'react'
import axiosInstance from '@/lib/api/axiosInstance';
import { cn } from '@/lib/utils';

type SettingProps = {
    role: string
    className?: string
}

const SettingModal = ({ role, className }: SettingProps) => {
    const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');
    const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const [isLoading, setIsLoading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [uploadError, setUploadError] = useState(false);

    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    useEffect(() => {
        if (!isDialogOpen) {
            setUploadedFileName(null)
            setUploadSuccess(false)
            setUploadError(false)
        }
    },[isDialogOpen])

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as 'light' | 'dark' | 'system' | null;
        if (savedTheme) applyTheme(savedTheme);
    }, []);

    // Terapkan theme
    const applyTheme = (mode: 'light' | 'dark' | 'system') => {
        setTheme(mode);
        localStorage.setItem("theme", mode);

        if (mode === "dark") {
            document.documentElement.classList.add("dark");
        } else if (mode === "light") {
            document.documentElement.classList.remove("dark");
        } else {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            if (prefersDark) {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
        }
    };

    const handleImport = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);

        try {
            setIsLoading(true);
            setUploadSuccess(false)
            setUploadError(false)
            const res = await axiosInstance.post("/uploads/import", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("Upload sukses:", res.data);
            setUploadSuccess(true)
        } catch (error) {
            console.error("Gagal upload:", error);
            setUploadError(true)
        } finally {
            setIsLoading(false);
            setConfirmDialogOpen(false);
        }
    };

    const onDropCsv = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            setUploadedFileName(file.name);
            setSelectedFile(file);
            setConfirmDialogOpen(true);
        }
    }, []);

    const { getRootProps: getRootPropsCsv, getInputProps: getInputPropsCsv, isDragActive: isDragActiveCsv } = useDropzone({
        onDrop: onDropCsv,
        accept: {
            'text/csv': ['.csv'],
            'application/vnd.ms-excel': ['.csv'],
        },
        multiple: false
    });

    return (
        <>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button variant="ghost" size="default" className={cn('flex items-center cursor-pointer transition-colors', className)}>
                        <i className="bi bi-gear-fill text-xl" />
                        <span className="text-sm font-medium">Settings</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl p-4 [&>button]:hidden">
                    <DialogHeader>
                        <DialogTitle className='text-2xl'>Settings</DialogTitle>
                    </DialogHeader>

                    <div className="flex w-full">
                        <Tabs defaultValue="appearance" className='w-full'>
                            <TabsList>
                                <TabsTrigger value="appearance">Appearance</TabsTrigger>
                                {role === 'super_admin' && (
                                    <TabsTrigger value="inject">Inject</TabsTrigger>
                                )}
                            </TabsList>

                            {/* Theme */}
                            <TabsContent value="appearance">
                                <Card className='w-full shadow-none border-none rounded-lg p-3'>
                                    <CardHeader className='px-1'>
                                        <CardTitle>Themes</CardTitle>
                                        <CardDescription>Choose your style or customize your theme</CardDescription>
                                    </CardHeader>
                                    <CardContent className='flex gap-4 p-0'>
                                        {['light', 'dark', 'system'].map((item) => (
                                            <button
                                                key={item}
                                                type="button"
                                                onClick={() => applyTheme(item as 'light' | 'dark' | 'system')}
                                                className={`flex-1 bg-background rounded-lg p-3 flex flex-col items-center gap-2 transition-all ${theme === item ? 'border-blue-600 ring-2 ring-blue-200' : 'border-gray-300'}`}
                                            >
                                                <div className={`w-full h-24 rounded-md ${item === 'light' ? 'bg-gray-100' : item === 'dark' ? 'bg-gray-800' : 'bg-gradient-to-r from-gray-100 from-50% to-gray-800 to-50%'} flex items-center justify-center`}>
                                                    <div className="w-10 h-6 rounded bg-white shadow-md"></div>
                                                </div>
                                                <div className="flex justify-center items-center gap-1 text-sm text-foreground font-semibold capitalize">
                                                    {theme === item ? <i className='bi-check-circle-fill text-blue-600'></i> : <i className='bi-circle-fill text-gray-200'></i>}
                                                    {item} Mode
                                                </div>
                                            </button>
                                        ))}
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value='inject'>
                                <Card className='w-full shadow-none border-none rounded-lg p-3 gap-1'>
                                    <CardHeader className='px-1'>
                                        <CardTitle>Inject Data dari File CSV</CardTitle>
                                        <CardDescription>Unggah file CSV untuk memasukkan data ke database.</CardDescription>
                                    </CardHeader>
                                    <CardContent className='flex gap-4 p-0'>
                                        <Card className='w-full shadow-none border-none rounded-lg dark:bg-card'>
                                            <CardContent className='flex flex-col gap-6 p-0'>
                                                <div>
                                                    <Label className='block text-sm font-medium mb-1'>Unggah File CSV</Label>
                                                    <div
                                                        {...getRootPropsCsv()}
                                                        className={`border-2 border-muted-foreground border-dashed rounded-md p-6 flex flex-col items-center justify-center cursor-pointer transition-all ${isDragActiveCsv ? 'border-blue-500 bg-muted-foreground/20' : 'border-gray-300 bg-muted-foreground/20'}`}
                                                    >
                                                        <input {...getInputPropsCsv()} />
                                                        {isDragActiveCsv ? (
                                                            <p className="text-blue-600">Lepaskan file CSV Anda di sini...</p>
                                                        ) : (
                                                            <>
                                                                {uploadSuccess && (
                                                                    <div className="mt-1 text-center">
                                                                        <i className="bi bi-file-earmark-spreadsheet-fill text-3xl text-green-500 mb-2" />
                                                                        <p className="text-sm text-green-600">{uploadedFileName}</p>
                                                                        <p className="mt-1 text-green-600 text-sm">
                                                                            <i className='bi-check-circle-fill'></i> File berhasil diupload!
                                                                        </p>
                                                                    </div>
                                                                )}
                                                                {uploadError && (
                                                                    <div className="mt-1 text-center">
                                                                        <i className="bi bi-x-circle-fill text-3xl text-red-500 mb-2" />
                                                                        <p className="text-sm text-red-600 font-semibold">Gagal mengupload file</p>
                                                                    </div>
                                                                )}
                                                                {!uploadSuccess && !uploadError && uploadedFileName && (
                                                                    <div className='mt-1 text-center'>
                                                                        <i className="bi bi-file-earmark-spreadsheet-fill text-3xl text-gray-500 mb-2" />
                                                                        <p className="text-sm text-gray-700">{uploadedFileName}</p>
                                                                    </div>
                                                                )}
                                                                {!uploadedFileName && !uploadSuccess && !uploadError && (
                                                                    <>
                                                                        <i className="bi bi-cloud-arrow-up-fill text-3xl text-gray-400 mb-2" />
                                                                        <p className="text-sm text-gray-500">Tarik & lepas file CSV di sini, atau klik untuk memilih file</p>
                                                                        <p className="text-xs text-gray-400 mt-1">Hanya file dengan format .csv yang diterima.</p>
                                                                    </>
                                                                )}
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                    <div className="flex w-full items-center justify-between">
                        <DialogClose asChild>
                            <Button variant="ghost" className="text-gray-700 hover:bg-gray-100 px-3">
                                <i className="bi bi-box-arrow-left text-2xl"></i>
                                Cancel
                            </Button>
                        </DialogClose>

                        <Button
                            className="text-green-600 bg-green-100 hover:bg-green-200 rounded-lg px-4 py-1 transition-colors"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4zm2 5.29A7.96 7.96 0 014 12H0c0 3.04 1.14 5.82 3 7.94l3-2.65z" />
                                    </svg>
                                    Processing…
                                </>
                            ) : 'Save Change'}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {confirmDialogOpen && (
                <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Konfirmasi Upload</DialogTitle>
                        </DialogHeader>
                        <p>Apakah Anda yakin ingin mengupload file <b>{uploadedFileName}</b>?</p>
                        <div className="flex justify-end gap-2 mt-4">
                            <Button variant="ghost" onClick={() => setConfirmDialogOpen(false)}>Batal</Button>
                            <Button
                                className="bg-green-600 text-white"
                                onClick={() => selectedFile && handleImport(selectedFile)}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4zm2 5.29A7.96 7.96 0 014 12H0c0 3.04 1.14 5.82 3 7.94l3-2.65z" />
                                        </svg>
                                        Uploading...
                                    </>
                                ) : 'Upload'}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </>
    )
}

export default SettingModal;
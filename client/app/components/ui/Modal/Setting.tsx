"use client";

import 'bootstrap-icons/font/bootstrap-icons.css'
import { Button } from "../button"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Label } from "@/app/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { useDropzone } from 'react-dropzone'
import { useCallback, useEffect, useState } from 'react'
import axiosInstance from '@/lib/api/axiosInstance';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import EditConfig from '../form/editConfig';
import { shortenFileName } from '@/lib/format';

type SettingProps = {
    role: string
    className?: string
}

type ColorVariant = {
    background: string;
    foreground: string;
};

type CardVariant = {
    card: string;
    cardForeground: string;
};

type PrimaryVariant = {
    primary: string;
    primaryForeground: string;
};

type SecondaryVariant = {
    secondary: string;
    secondaryForeground: string;
};

type ThemeConfig = {
    light_image: string;
    dark_image: string;
    baseColor: ColorVariant;
    cardColor: CardVariant;
    primaryColor: PrimaryVariant;
    secondaryColor: SecondaryVariant;
};

export type SettingData = {
    id: string;
    light_color: ThemeConfig;
    dark_color: ThemeConfig;
};

const SettingModal = ({ role, className }: SettingProps) => {
    const [selectedTheme, setSelectedTheme] = useState<'light' | 'dark' | 'system'>('light');
    const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [configData, setConfigData] = useState<SettingData | null>(null)

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
    }, [isDialogOpen])

    const saveTheme = (mode: 'light' | 'dark' | 'system') => {
        localStorage.setItem("theme", mode);
        setSelectedTheme(mode);
    };

    // Penerapan theme
    const applyTheme = (mode: 'light' | 'dark' | 'system') => {
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

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as 'light' | 'dark' | 'system' | null;
        if (savedTheme) {
            setSelectedTheme(savedTheme);
            applyTheme(savedTheme);
        }
    }, []);

    const handleImport = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);

        try {
            setIsLoading(true);
            setUploadSuccess(false)
            setUploadError(false)
            await axiosInstance.post("/uploads/import", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
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

    const fetchConfig = async () => {
        if (configData) return
        try {
            const res = await axiosInstance.get(`/setting`)
            setConfigData(res.data.data)
        } catch (error) {
            console.error(error)
        }
    }

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
                        <Tabs
                            defaultValue="appearance"
                            className='w-full'
                            onValueChange={(val) => {
                                if (val === "config" && role === "super_admin" && !configData) {
                                    fetchConfig();
                                }
                            }}>
                            <TabsList>
                                <TabsTrigger value="appearance">Appearance</TabsTrigger>
                                {role === 'super_admin' && (
                                    <>
                                        <TabsTrigger value="inject">Inject</TabsTrigger>
                                        <TabsTrigger value="config">Config</TabsTrigger>
                                    </>
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
                                                onClick={() => setSelectedTheme(item as 'light' | 'dark' | 'system')}
                                                className={`flex-1 bg-background rounded-lg p-3 flex flex-col items-center gap-2 transition-all ${selectedTheme === item ? 'border-blue-600 ring-2 ring-blue-200' : 'border-gray-300'}`}
                                            >
                                                <div className={`w-full h-24 rounded-md ${item === 'light' ? 'bg-gray-100' : item === 'dark' ? 'bg-gray-800' : 'bg-gradient-to-r from-gray-100 from-50% to-gray-800 to-50%'} flex items-center justify-center`}>
                                                    <div className="w-10 h-6 rounded bg-white shadow-md"></div>
                                                </div>
                                                <div className="flex justify-center items-center gap-1 text-sm text-foreground font-semibold capitalize">
                                                    {selectedTheme === item ? <i className='bi-check-circle-fill text-blue-600'></i> : <i className='bi-circle-fill text-gray-200'></i>}
                                                    {item} Mode
                                                </div>
                                            </button>
                                        ))}
                                    </CardContent>
                                </Card>
                                <div className='flex justify-end items-center mt-3'>
                                    <DialogClose asChild>
                                        <Button variant="ghost" onClick={() => {
                                            saveTheme(selectedTheme);
                                            window.location.reload()
                                        }} className="text-green-500 bg-green-100 hover:bg-green-200 hover:text-green-600 px-3 cursor-pointer">
                                            Apply Theme
                                        </Button>
                                    </DialogClose>
                                </div>
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
                                                                        <p className="text-sm text-green-600">{uploadedFileName ? shortenFileName(uploadedFileName) : ""}</p>
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
                                                                        <p className="text-sm text-gray-700">{uploadedFileName ? shortenFileName(uploadedFileName) : ""}</p>
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

                            <TabsContent value='config'>
                                <Card className='relative w-full h-96 shadow-none border-none rounded-lg p-3 gap-1 overflow-y-scroll'>
                                    <CardHeader className='px-1'>
                                        <CardTitle>Config</CardTitle>
                                        <CardDescription>Customize your website.</CardDescription>
                                    </CardHeader>
                                    {configData && (
                                        <EditConfig initialData={configData} onFormSubmit={fetchConfig} />
                                    )}
                                    <CardContent className='flex gap-4 p-0'>
                                        <Card className='w-full shadow-none border-none rounded-lg dark:bg-card'>
                                            <CardContent className='grid grid-cols-2 gap-4 p-0'>
                                                <div className='bg-background p-3 rounded-md'>
                                                    <Label className='block text-base font-semibold mb-3 text-foreground'>Light theme logo</Label>
                                                    {configData?.light_color?.light_image && (
                                                        <Image src={configData.light_color.light_image} alt='Website Light Theme Logo' width={140} height={140} />
                                                    )}
                                                </div>
                                                <div className='bg-background p-3 rounded-md'>
                                                    <Label className='block text-base font-semibold mb-3 text-foreground'>Dark theme logo</Label>
                                                    {configData?.dark_color?.dark_image && (
                                                        <Image src={configData.dark_color.dark_image} alt='Website Dark Theme Logo' width={140} height={140} />
                                                    )}
                                                </div>
                                                <div className='bg-background p-3 rounded-md col-span-2'>
                                                    <Label className='block text-base font-semibold mb-3 text-foreground'>Website Color</Label>
                                                    <Tabs defaultValue='light'>
                                                        <TabsList className='mb-2.5'>
                                                            <TabsTrigger value='light'>Light mode</TabsTrigger>
                                                            <TabsTrigger value='dark'>Dark mode</TabsTrigger>
                                                        </TabsList>
                                                        <TabsContent value='light'>
                                                            <div className='grid grid-cols-4 gap-2.5 justify-center items-center'>
                                                                <div className='flex flex-col justify-center items-center gap-1'>
                                                                    <p className='text-xs font-bold'>Background</p>
                                                                    <div
                                                                        className="w-9 h-9 rounded-full border-[0.5px] border-border"
                                                                        style={{ backgroundColor: configData?.light_color.baseColor.background }}
                                                                    />
                                                                    <p className='text-xs font-semibold'>{configData?.light_color.baseColor.background}</p>
                                                                </div>
                                                                <div className='flex flex-col justify-center items-center gap-1'>
                                                                    <p className='text-xs font-bold'>Foreground</p>
                                                                    <div
                                                                        className="w-9 h-9 rounded-full border-[0.5px] border-border"
                                                                        style={{ backgroundColor: configData?.light_color.baseColor.foreground }}
                                                                    />
                                                                    <p className='text-xs font-semibold'>{configData?.light_color.baseColor.foreground}</p>
                                                                </div>
                                                                <div className='flex flex-col justify-center items-center gap-1'>
                                                                    <p className='text-xs font-bold'>Card</p>
                                                                    <div
                                                                        className="w-9 h-9 rounded-full border-[0.5px] border-border"
                                                                        style={{ backgroundColor: configData?.light_color.cardColor.card }}
                                                                    />
                                                                    <p className='text-xs font-semibold'>{configData?.light_color.cardColor.card}</p>
                                                                </div>
                                                                <div className='flex flex-col justify-center items-center gap-1'>
                                                                    <p className='text-xs font-bold'>Card Foreground</p>
                                                                    <div
                                                                        className="w-9 h-9 rounded-full border-[0.5px] border-border"
                                                                        style={{ backgroundColor: configData?.light_color.cardColor.cardForeground }}
                                                                    />
                                                                    <p className='text-xs font-semibold'>{configData?.light_color.cardColor.cardForeground}</p>
                                                                </div>
                                                                <div className='flex flex-col justify-center items-center gap-1'>
                                                                    <p className='text-xs font-bold'>Primary</p>
                                                                    <div
                                                                        className="w-9 h-9 rounded-full border-[0.5px] border-border"
                                                                        style={{ backgroundColor: configData?.light_color.primaryColor.primary }}
                                                                    />
                                                                    <p className='text-xs font-semibold'>{configData?.light_color.primaryColor.primary}</p>
                                                                </div>
                                                                <div className='flex flex-col justify-center items-center gap-1'>
                                                                    <p className='text-xs font-bold'>Primary Foreground</p>
                                                                    <div
                                                                        className="w-9 h-9 rounded-full border-[0.5px] border-border"
                                                                        style={{ backgroundColor: configData?.light_color.primaryColor.primaryForeground }}
                                                                    />
                                                                    <p className='text-xs font-semibold'>{configData?.light_color.primaryColor.primaryForeground}</p>
                                                                </div>
                                                                <div className='flex flex-col justify-center items-center gap-1'>
                                                                    <p className='text-xs font-bold'>Secondary</p>
                                                                    <div
                                                                        className="w-9 h-9 rounded-full border-[0.5px] border-border"
                                                                        style={{ backgroundColor: configData?.light_color.secondaryColor.secondary }}
                                                                    />
                                                                    <p className='text-xs font-semibold'>{configData?.light_color.secondaryColor.secondary}</p>
                                                                </div>
                                                                <div className='flex flex-col justify-center items-center gap-1'>
                                                                    <p className='text-xs font-bold'>Secondary Foreground</p>
                                                                    <div
                                                                        className="w-9 h-9 rounded-full border-[0.5px] border-border"
                                                                        style={{ backgroundColor: configData?.light_color.secondaryColor.secondaryForeground }}
                                                                    />
                                                                    <p className='text-xs font-semibold'>{configData?.light_color.secondaryColor.secondaryForeground}</p>
                                                                </div>
                                                            </div>
                                                        </TabsContent>

                                                        <TabsContent value='dark'>
                                                            <div className='grid grid-cols-4 gap-2.5 justify-center items-center'>
                                                                <div className='flex flex-col justify-center items-center gap-1'>
                                                                    <p className='text-xs font-bold'>Background</p>
                                                                    <div
                                                                        className="w-9 h-9 rounded-full border-[0.5px] border-border"
                                                                        style={{ backgroundColor: configData?.dark_color.baseColor.background }}
                                                                    />
                                                                    <p className='text-xs font-semibold'>{configData?.dark_color.baseColor.background}</p>
                                                                </div>
                                                                <div className='flex flex-col justify-center items-center gap-1'>
                                                                    <p className='text-xs font-bold'>Foreground</p>
                                                                    <div
                                                                        className="w-9 h-9 rounded-full border-[0.5px] border-border"
                                                                        style={{ backgroundColor: configData?.dark_color.baseColor.foreground }}
                                                                    />
                                                                    <p className='text-xs font-semibold'>{configData?.dark_color.baseColor.foreground}</p>
                                                                </div>
                                                                <div className='flex flex-col justify-center items-center gap-1'>
                                                                    <p className='text-xs font-bold'>Card</p>
                                                                    <div
                                                                        className="w-9 h-9 rounded-full border-[0.5px] border-border"
                                                                        style={{ backgroundColor: configData?.dark_color.cardColor.card }}
                                                                    />
                                                                    <p className='text-xs font-semibold'>{configData?.dark_color.cardColor.card}</p>
                                                                </div>
                                                                <div className='flex flex-col justify-center items-center gap-1'>
                                                                    <p className='text-xs font-bold'>Card Foreground</p>
                                                                    <div
                                                                        className="w-9 h-9 rounded-full border-[0.5px] border-border"
                                                                        style={{ backgroundColor: configData?.dark_color.cardColor.cardForeground }}
                                                                    />
                                                                    <p className='text-xs font-semibold'>{configData?.dark_color.cardColor.cardForeground}</p>
                                                                </div>
                                                                <div className='flex flex-col justify-center items-center gap-1'>
                                                                    <p className='text-xs font-bold'>Primary</p>
                                                                    <div
                                                                        className="w-9 h-9 rounded-full border-[0.5px] border-border"
                                                                        style={{ backgroundColor: configData?.dark_color.primaryColor.primary }}
                                                                    />
                                                                    <p className='text-xs font-semibold'>{configData?.dark_color.primaryColor.primary}</p>
                                                                </div>
                                                                <div className='flex flex-col justify-center items-center gap-1'>
                                                                    <p className='text-xs font-bold'>Primary Foreground</p>
                                                                    <div
                                                                        className="w-9 h-9 rounded-full border-[0.5px] border-border"
                                                                        style={{ backgroundColor: configData?.dark_color.primaryColor.primaryForeground }}
                                                                    />
                                                                    <p className='text-xs font-semibold'>{configData?.dark_color.primaryColor.primaryForeground}</p>
                                                                </div>
                                                                <div className='flex flex-col justify-center items-center gap-1'>
                                                                    <p className='text-xs font-bold'>Secondary</p>
                                                                    <div
                                                                        className="w-9 h-9 rounded-full border-[0.5px] border-border"
                                                                        style={{ backgroundColor: configData?.dark_color.secondaryColor.secondary }}
                                                                    />
                                                                    <p className='text-xs font-semibold'>{configData?.dark_color.secondaryColor.secondary}</p>
                                                                </div>
                                                                <div className='flex flex-col justify-center items-center gap-1'>
                                                                    <p className='text-xs font-bold'>Secondary Foreground</p>
                                                                    <div
                                                                        className="w-9 h-9 rounded-full border-[0.5px] border-border"
                                                                        style={{ backgroundColor: configData?.dark_color.secondaryColor.secondaryForeground }}
                                                                    />
                                                                    <p className='text-xs font-semibold'>{configData?.dark_color.secondaryColor.secondaryForeground}</p>
                                                                </div>
                                                            </div>
                                                        </TabsContent>
                                                    </Tabs>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </DialogContent>
            </Dialog >

            {confirmDialogOpen && (
                <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Konfirmasi Upload</DialogTitle>
                        </DialogHeader>
                        <p>Apakah Anda yakin ingin mengupload file <b>{uploadedFileName ? shortenFileName(uploadedFileName) : ""}</b>?</p>
                        <div className="flex justify-end gap-2 mt-4">
                            <Button variant="ghost" onClick={() => setConfirmDialogOpen(false)}>Batal</Button>
                            <Button
                                className="bg-green-600 hover:bg-green-400 text-white"
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
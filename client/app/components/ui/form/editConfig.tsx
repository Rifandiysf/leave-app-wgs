"use client"

import { useCallback, useEffect, useState } from "react"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../dialog"
import { Button } from "../button"
import { Edit2 } from "lucide-react"
import { DialogDescription } from "@radix-ui/react-dialog"
import { Card, CardContent } from "../card"
import { useDropzone } from "react-dropzone"
import { Label } from "../label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs"
import ColorPicker from "../colorPicker"
import axiosInstance from "@/lib/api/axiosInstance"
import Image from "next/image"

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

type SettingData = {
    id: string;
    light_color: ThemeConfig;
    dark_color: ThemeConfig;
};

type EditConfigProps = {
    initialData: SettingData
    onFormSubmit: () => void
}

const EditConfig = ({ initialData, onFormSubmit }: EditConfigProps) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [previewLightLogo, setPreviewLightLogo] = useState<string | null>(null);
    const [previewDarkLogo, setPreviewDarkLogo] = useState<string | null>(null);

    const [lightLogo, setLightLogo] = useState<File | string>(initialData.light_color.light_image);
    const [darkLogo, setDarkLogo] = useState<File | string>(initialData.dark_color.dark_image);
    const [lightColor, setLightColor] = useState<ThemeConfig>(initialData.light_color);
    const [darkColor, setDarkColor] = useState<ThemeConfig>(initialData.dark_color);

    const [generalError, setGeneralError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!openDialog) {
            setPreviewLightLogo(null)
            setPreviewDarkLogo(null)
            setGeneralError(null)
        }
    }, [openDialog])

    const onDropLight = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            setLightLogo(file);
            setPreviewLightLogo(URL.createObjectURL(file))
        }
    }, []);

    const onDropDark = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            setDarkLogo(file);
            setPreviewDarkLogo(URL.createObjectURL(file))
        }
    }, []);

    const { getRootProps: getRootPropsLight, getInputProps: getInputPropsLight, isDragActive: isDragActiveLight } = useDropzone({
        onDrop: onDropLight,
        accept: {
            "image/jpeg": [".jpeg", ".jpg"],
            "image/png": [".png"],
            "image/svg+xml": [".svg"],
            "image/webp": [".webp"],
        },
        multiple: false,
    });

    const { getRootProps: getRootPropsDark, getInputProps: getInputPropsDark, isDragActive: isDragActiveDark } = useDropzone({
        onDrop: onDropDark,
        accept: {
            "image/jpeg": [".jpeg", ".jpg"],
            "image/png": [".png"],
            "image/svg+xml": [".svg"],
            "image/webp": [".webp"],
        },
        multiple: false,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        setGeneralError(null)

        setIsLoading(true)

        try {
            const formData = new FormData();
            if (lightLogo instanceof File) {
                formData.append("light_image", lightLogo);
            } else {
                formData.append("light_image", lightLogo); // string URL dari backend
            }

            if (darkLogo instanceof File) {
                formData.append("dark_image", darkLogo);
            } else {
                formData.append("dark_image", darkLogo);
            }

            //light color
            formData.append("light_background", lightColor.baseColor.background);
            formData.append("light_foreground", lightColor.baseColor.foreground);
            formData.append("light_card", lightColor.cardColor.card);
            formData.append("light_cardForeground", lightColor.cardColor.cardForeground);
            formData.append("light_primary", lightColor.primaryColor.primary);
            formData.append("light_primaryForeground", lightColor.primaryColor.primaryForeground);
            formData.append("light_secondary", lightColor.secondaryColor.secondary);
            formData.append("light_secondaryForeground", lightColor.secondaryColor.secondaryForeground);

            //dark color
            formData.append("dark_background", darkColor.baseColor.background);
            formData.append("dark_foreground", darkColor.baseColor.foreground);
            formData.append("dark_card", darkColor.cardColor.card);
            formData.append("dark_cardForeground", darkColor.cardColor.cardForeground);
            formData.append("dark_primary", darkColor.primaryColor.primary);
            formData.append("dark_primaryForeground", darkColor.primaryColor.primaryForeground);
            formData.append("dark_secondary", darkColor.secondaryColor.secondary);
            formData.append("dark_secondaryForeground", darkColor.secondaryColor.secondaryForeground);

            await axiosInstance.patch(`/setting/${initialData.id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })

            onFormSubmit()
            setOpenDialog(false)
        } catch (error) {
            console.error("Failed Update Configuration", error)
            setGeneralError('Failed Update Configuration')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
                <Button variant={'secondary'} className="absolute top-3 right-3"><Edit2 />Edit</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Update Configuration</DialogTitle>
                        <DialogDescription>Customize logo and color Website</DialogDescription>
                    </DialogHeader>
                    <Card className="shadow-none border-none rounded-lg w-full p-3 h-96 overflow-y-scroll">
                        <CardContent className="p-0">
                            {generalError && (
                                <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">
                                    {generalError}
                                </div>
                            )}
                            <div className="grid grid-cols-2 gap-2 mb-2">
                                <div>
                                    <Label className='block text-sm font-medium mb-1'>Light theme logo</Label>
                                    <div
                                        {...getRootPropsLight()}
                                        className={`border-2 border-muted-foreground border-dashed rounded-md p-6 flex flex-col items-center justify-center cursor-pointer transition-all ${isDragActiveLight ? 'border-blue-500 bg-muted-foreground/20' : 'border-gray-300 bg-muted-foreground/20'}`}
                                    >
                                        <input {...getInputPropsLight()} />
                                        {isDragActiveLight ? (
                                            <p className="text-blue-600">Lepaskan Logo Anda di sini...</p>
                                        ) : (
                                            <>
                                                {previewLightLogo ? (
                                                    <div className="flex flex-col justify-center items-center mt-1">
                                                        <Image
                                                            src={previewLightLogo}
                                                            alt="Light Logo Preview"
                                                            width={120}
                                                            height={120}
                                                            className="rounded-md"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col justify-center items-center">
                                                        <i className="bi bi-cloud-arrow-up-fill text-3xl text-gray-400 mb-2" />
                                                        <p className="text-sm text-gray-500 text-center">
                                                            Tarik & lepas Image di sini, atau klik untuk memilih file
                                                        </p>
                                                        <p className="text-xs text-gray-400 mt-1 text-center">
                                                            Hanya file dengan format .jpeg, .jpg, .png, .svg, .webp yang diterima.
                                                        </p>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <Label className='block text-sm font-medium mb-1'>Dark theme logo</Label>
                                    <div
                                        {...getRootPropsDark()}
                                        className={`border-2 border-muted-foreground border-dashed rounded-md p-6 flex flex-col items-center justify-center cursor-pointer transition-all ${isDragActiveDark ? 'border-blue-500 bg-muted-foreground/20' : 'border-gray-300 bg-muted-foreground/20'}`}
                                    >
                                        <input {...getInputPropsDark()} />
                                        {isDragActiveDark ? (
                                            <p className="text-blue-600">Lepaskan Logo Anda di sini...</p>
                                        ) : (
                                            <>
                                                {previewDarkLogo ? (
                                                    <div className="flex flex-col justify-center items-center mt-1">
                                                        <Image
                                                            src={previewDarkLogo}
                                                            alt="Dark Logo Preview"
                                                            width={120}
                                                            height={120}
                                                            className="rounded-md"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col justify-center items-center">
                                                        <i className="bi bi-cloud-arrow-up-fill text-3xl text-gray-400 mb-2" />
                                                        <p className="text-sm text-gray-500 text-center">
                                                            Tarik & lepas Image di sini, atau klik untuk memilih file
                                                        </p>
                                                        <p className="text-xs text-gray-400 mt-1 text-center">
                                                            Hanya file dengan format .jpeg, .jpg, .png, .svg, .webp yang diterima.
                                                        </p>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-2 row-start-2 p-3 bg-background rounded-md">
                                <Label>Website Color</Label>
                                <Tabs defaultValue="light">
                                    <TabsList className="p-0 mt-2">
                                        <TabsTrigger value={'light'}>Light Themes</TabsTrigger>
                                        <TabsTrigger value={'dark'}>Dark Themes</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="light">
                                        <div className="grid grid-cols-4 gap-1.5 justify-center items-center">
                                            <ColorPicker title="Background"
                                                value={lightColor.baseColor.background}
                                                onChange={(e) => setLightColor(prev => ({
                                                    ...prev,
                                                    baseColor: { ...prev.baseColor, background: e.target.value }
                                                }))}
                                            />
                                            <ColorPicker title="Foreground"
                                                value={lightColor.baseColor.foreground}
                                                onChange={(e) => setLightColor(prev => ({
                                                    ...prev,
                                                    baseColor: { ...prev.baseColor, foreground: e.target.value }
                                                }))}
                                            />
                                            <ColorPicker title="Card"
                                                value={lightColor.cardColor.card}
                                                onChange={(e) => setLightColor(prev => ({
                                                    ...prev,
                                                    cardColor: { ...prev.cardColor, card: e.target.value }
                                                }))}
                                            />
                                            <ColorPicker title="Card Foreground"
                                                value={lightColor.cardColor.cardForeground}
                                                onChange={(e) => setLightColor(prev => ({
                                                    ...prev,
                                                    cardColor: { ...prev.cardColor, cardForeground: e.target.value }
                                                }))}
                                            />
                                            <ColorPicker title="Primary"
                                                value={lightColor.primaryColor.primary}
                                                onChange={(e) => setLightColor(prev => ({
                                                    ...prev,
                                                    primaryColor: { ...prev.primaryColor, primary: e.target.value }
                                                }))}
                                            />
                                            <ColorPicker title="Primary Foreground"
                                                value={lightColor.primaryColor.primaryForeground}
                                                onChange={(e) => setLightColor(prev => ({
                                                    ...prev,
                                                    primaryColor: { ...prev.primaryColor, primaryForeground: e.target.value }
                                                }))}
                                            />
                                            <ColorPicker title="Secondary"
                                                value={lightColor.secondaryColor.secondary}
                                                onChange={(e) => setLightColor(prev => ({
                                                    ...prev,
                                                    secondaryColor: { ...prev.secondaryColor, secondary: e.target.value }
                                                }))}
                                            />
                                            <ColorPicker title="Secondary Foreground"
                                                value={lightColor.secondaryColor.secondaryForeground}
                                                onChange={(e) => setLightColor(prev => ({
                                                    ...prev,
                                                    secondaryColor: { ...prev.secondaryColor, secondaryForeground: e.target.value }
                                                }))}
                                            />
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="dark">
                                        <div className="grid grid-cols-4 gap-1.5 justify-center items-center">
                                            <ColorPicker title="Background"
                                                value={darkColor.baseColor.background}
                                                onChange={(e) => setDarkColor(prev => ({
                                                    ...prev,
                                                    baseColor: { ...prev.baseColor, background: e.target.value }
                                                }))}
                                            />
                                            <ColorPicker title="Foreground"
                                                value={darkColor.baseColor.foreground}
                                                onChange={(e) => setDarkColor(prev => ({
                                                    ...prev,
                                                    baseColor: { ...prev.baseColor, foreground: e.target.value }
                                                }))}
                                            />
                                            <ColorPicker title="Card"
                                                value={darkColor.cardColor.card}
                                                onChange={(e) => setDarkColor(prev => ({
                                                    ...prev,
                                                    cardColor: { ...prev.cardColor, card: e.target.value }
                                                }))}
                                            />
                                            <ColorPicker title="Card Foreground"
                                                value={darkColor.cardColor.cardForeground}
                                                onChange={(e) => setDarkColor(prev => ({
                                                    ...prev,
                                                    cardColor: { ...prev.cardColor, cardForeground: e.target.value }
                                                }))}
                                            />
                                            <ColorPicker title="Primary"
                                                value={darkColor.primaryColor.primary}
                                                onChange={(e) => setDarkColor(prev => ({
                                                    ...prev,
                                                    primaryColor: { ...prev.primaryColor, primary: e.target.value }
                                                }))}
                                            />
                                            <ColorPicker title="Primary Foreground"
                                                value={darkColor.primaryColor.primaryForeground}
                                                onChange={(e) => setDarkColor(prev => ({
                                                    ...prev,
                                                    primaryColor: { ...prev.primaryColor, primaryForeground: e.target.value }
                                                }))}
                                            />
                                            <ColorPicker title="Secondary"
                                                value={darkColor.secondaryColor.secondary}
                                                onChange={(e) => setDarkColor(prev => ({
                                                    ...prev,
                                                    secondaryColor: { ...prev.secondaryColor, secondary: e.target.value }
                                                }))}
                                            />
                                            <ColorPicker title="Secondary Foreground"
                                                value={darkColor.secondaryColor.secondaryForeground}
                                                onChange={(e) => setDarkColor(prev => ({
                                                    ...prev,
                                                    secondaryColor: { ...prev.secondaryColor, secondaryForeground: e.target.value }
                                                }))}
                                            />
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </div>
                        </CardContent>
                    </Card>
                    <DialogFooter className="mt-5">
                        <DialogClose asChild>
                            <Button variant={'ghost'}>Cancel</Button>
                        </DialogClose>
                        <Button type="submit" onClick={() => window.location.reload()} className="bg-green-100 text-green-500 font-semibold" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4zm2 5.29A7.96 7.96 0 014 12H0c0 3.04 1.14 5.82 3 7.94l3-2.65z" />
                                    </svg>
                                    Processing…
                                </>
                            ) : 'Apply'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default EditConfig
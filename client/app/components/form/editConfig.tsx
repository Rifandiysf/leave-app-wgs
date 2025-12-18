import { useCallback, useState, useEffect } from 'react'
import { Dialog, DialogClose, DialogFooter, DialogHeader, DialogTitle, DialogContent, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Card } from '../ui/card'
import ColorPicker from '../ui/colorPicker'
import { formatUpperCase } from '@/lib/format'
import { useDropzone } from 'react-dropzone'
import axiosInstance from '@/lib/api/axiosInstance'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'

const EditConfig = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [logoPreview, setLogoPreview] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    // State untuk ID pengaturan
    const [settingId, setSettingId] = useState<string | null>(null);

    // State untuk mengelola tab mode warna di dalam modal
    const [colorModeTab, setColorModeTab] = useState<'light' | 'dark'>('light');

    // State ganda untuk warna light dan dark mode
    const [colors, setColors] = useState({
        light: {
            background: '', foreground: '',
            card: '', cardForeground: '',
            primary: '', primaryForeground: '',
            secondary: '', secondaryForeground: ''
        },
        dark: {
            background: '', foreground: '',
            card: '', cardForeground: '',
            primary: '', primaryForeground: '',
            secondary: '', secondaryForeground: ''
        }
    });

    // Mengambil data saat modal dibuka
    useEffect(() => {
        if (isDialogOpen) {
            fetchSettings();
        }
    }, [isDialogOpen]);

    const fetchSettings = async () => {
        setIsLoading(true);
        try {
            const res = await axiosInstance.get("/setting");
            const data = res.data.data;

            setSettingId(data.id);
            if (data.imageUrl) setLogoPreview(data.imageUrl);

            // Mengisi state dengan data dari API
            setColors({
                light: {
                    background: data.light_color?.baseColor?.light_background || '',
                    foreground: data.light_color?.baseColor?.light_foreground || '',
                    card: data.light_color?.cardColor?.light_card || '',
                    cardForeground: data.light_color?.cardColor?.light_cardForeground || '',
                    primary: data.light_color?.primaryColor?.light_primary || '',
                    primaryForeground: data.light_color?.primaryColor?.light_primaryForeground || '',
                    secondary: data.light_color?.secondaryColor?.light_secondary || '',
                    secondaryForeground: data.light_color?.secondaryColor?.light_secondaryForeground || ''
                },
                dark: {
                    background: data.dark_color?.baseColor?.dark_background || '',
                    foreground: data.dark_color?.baseColor?.dark_foreground || '',
                    card: data.dark_color?.cardColor?.dark_card || '',
                    cardForeground: data.dark_color?.cardColor?.dark_cardForeground || '',
                    primary: data.dark_color?.primaryColor?.dark_primary || '',
                    primaryForeground: data.dark_color?.primaryColor?.dark_primaryForeground || '',
                    secondary: data.dark_color?.secondaryColor?.dark_secondary || '',
                    secondaryForeground: data.dark_color?.secondaryColor?.dark_secondaryForground || ''
                }
            });

        } catch (err) {
            console.error("Failed to fetch settings", err);
        } finally {
            setIsLoading(false);
        }
    };

    // Fungsi untuk memperbarui state warna berdasarkan mode
    const handleColorChange = (key: string, value: string) => {
        setColors(prev => ({
            ...prev,
            [colorModeTab]: {
                ...prev[colorModeTab],
                [key]: value
            }
        }));
    };

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setLogoPreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }, [])

    const { getRootProps: getRootPropsLogo, getInputProps: getInputPropsLogo, isDragActive: isDragActiveLogo } = useDropzone({
        onDrop: onDrop,
        accept: { 'image/*': [] },
        multiple: false
    });

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            const payload = {
                imageUrl: logoPreview,
                light_color: {
                    baseColor: { background: colors.light.background, foreground: colors.light.foreground },
                    cardColor: { card: colors.light.card, cardForeground: colors.light.cardForeground },
                    primaryColor: { primary: colors.light.primary, primaryForeground: colors.light.primaryForeground },
                    secondaryColor: { secondary: colors.light.secondary, secondaryForeground: colors.light.secondaryForeground }
                },
                dark_color: {
                    baseColor: { background: colors.dark.background, foreground: colors.dark.foreground },
                    cardColor: { card: colors.dark.card, cardForeground: colors.dark.cardForeground },
                    primaryColor: { primary: colors.dark.primary, primaryForeground: colors.dark.primaryForeground },
                    secondaryColor: { secondary: colors.dark.secondary, secondaryForeground: colors.dark.secondaryForeground }
                }
            };
            
            await axiosInstance.patch(`/setting/${settingId}`, payload);

            alert("Settings saved successfully!");
            setIsDialogOpen(false);
        } catch (err) {
            console.error("Failed to save settings", err);
            alert("Failed to save settings");
        } finally {
            setIsLoading(false)
        }
    };

    // Menentukan set warna mana yang akan ditampilkan di UI berdasarkan tab yang aktif
    const currentModeColors = colors[colorModeTab];

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button className='cursor-pointer text-foreground' variant={'secondary'}>
                    <i className="bi bi-pencil-square"></i><span className='font-bold'>Edit</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <form onSubmit={handleSave}>
                    <DialogHeader>
                        <DialogTitle>Configuration Website</DialogTitle>
                    </DialogHeader>
                    
                    {isLoading ? (
                        <div className="flex justify-center items-center h-40">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4zm2 5.29A7.96 7.96 0 014 12H0c0 3.04 1.14 5.82 3 7.94l3-2.65z" />
                            </svg>
                            <span>Loading…</span>
                        </div>
                    ) : (
                        <>
                            <div>
                                <Label className='block text-sm font-medium mb-1'>Website Logo</Label>
                                <div
                                    {...getRootPropsLogo()}
                                    className={`border-2 border-muted-foreground border-dashed rounded-md p-6 flex flex-col items-center justify-center cursor-pointer transition-all ${isDragActiveLogo ? 'border-blue-500 bg-muted-foreground/20' : 'border-gray-300 bg-muted-foreground/20'}`}
                                >
                                    <input {...getInputPropsLogo()} />
                                    {isDragActiveLogo ? (
                                        <p className="text-blue-600">Drop the logo here...</p>
                                    ) : (
                                        <>
                                            {logoPreview ? (
                                                <div className='mt-1 w-24 h-24 rounded overflow-hidden flex flex-col items-center justify-center'>
                                                    <img src={logoPreview} alt="Logo Preview" className='object-contain w-full h-full' />
                                                </div>
                                            ) : (
                                                <>
                                                    <i className="bi bi-cloud-arrow-up-fill text-3xl text-gray-400 mb-2" />
                                                    <p className="text-sm text-gray-500">Drag & drop your logo here, or click to select file</p>
                                                </>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
        
                            {/* Colors */}
                            <div className="mt-4">
                                <Label className='block text-sm font-medium mb-2'>Website Colors</Label>
                                {/* Tab untuk Light dan Dark Mode */}
                                <Tabs value={colorModeTab} onValueChange={(value: 'light' | 'dark') => setColorModeTab(value)} className="mb-4">
                                    <TabsList>
                                        <TabsTrigger value="light">Light Mode</TabsTrigger>
                                        <TabsTrigger value="dark">Dark Mode</TabsTrigger>
                                    </TabsList>
                                </Tabs>

                                <div className='grid grid-cols-2 gap-2 max-sm:grid-cols-1'>
                                    <Card className='w-full shadow-none border-none rounded-lg p-3 gap-2 bg-gray-500/10 dark:bg-gray-500/10'>
                                        <h1 className='font-semibold text-foreground'>Base Color</h1>
                                        <div className='flex justify-center gap-2'>
                                            <ColorPicker title='Background' value={formatUpperCase(currentModeColors.background || '#FFFFFF')} onChange={(e) => handleColorChange('background', e.target.value)} />
                                            <ColorPicker title='Foreground' value={formatUpperCase(currentModeColors.foreground || '#000000')} onChange={(e) => handleColorChange('foreground', e.target.value)} />
                                        </div>
                                    </Card>
                                    <Card className='w-full shadow-none border-none rounded-lg p-3 gap-2 bg-gray-500/10 dark:bg-gray-500/10'>
                                        <h1 className='font-semibold text-foreground'>Card Color</h1>
                                        <div className='flex justify-center gap-2'>
                                            <ColorPicker title='Card' value={formatUpperCase(currentModeColors.card || '#FFFFFF')} onChange={(e) => handleColorChange('card', e.target.value)} />
                                            <ColorPicker title='Card Foreground' value={formatUpperCase(currentModeColors.cardForeground || '#000000')} onChange={(e) => handleColorChange('cardForeground', e.target.value)} />
                                        </div>
                                    </Card>
                                    <Card className='w-full shadow-none border-none rounded-lg p-3 gap-2 bg-gray-500/10 dark:bg-gray-500/10'>
                                        <h1 className='font-semibold text-foreground'>Primary Color</h1>
                                        <div className='flex justify-center gap-2'>
                                            <ColorPicker title='Primary' value={formatUpperCase(currentModeColors.primary || '#000000')} onChange={(e) => handleColorChange('primary', e.target.value)} />
                                            <ColorPicker title='Primary Foreground' value={formatUpperCase(currentModeColors.primaryForeground || '#FFFFFF')} onChange={(e) => handleColorChange('primaryForeground', e.target.value)} />
                                        </div>
                                    </Card>
                                    <Card className='w-full shadow-none border-none rounded-lg p-3 gap-2 bg-gray-500/10 dark:bg-gray-500/10'>
                                        <h1 className='font-semibold text-foreground'>Secondary Color</h1>
                                        <div className='flex justify-center gap-2'>
                                            <ColorPicker title='Secondary' value={formatUpperCase(currentModeColors.secondary || '#F3F4F6')} onChange={(e) => handleColorChange('secondary', e.target.value)} />
                                            <ColorPicker title='Secondary Foreground' value={formatUpperCase(currentModeColors.secondaryForeground || '#1F2937')} onChange={(e) => handleColorChange('secondaryForeground', e.target.value)} />
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </>
                    )}
                    
                    <DialogFooter className="mt-5">
                        <DialogClose asChild>
                            <Button type="button" variant="outline" disabled={isLoading}>Cancel</Button>
                        </DialogClose>
                        <Button type="submit" className="text-black" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4zm2 5.29A7.96 7.96 0 014 12H0c0 3.04 1.14 5.82 3 7.94l3-2.65z" />
                                    </svg>
                                    Saving…
                                </>
                            ) : 'Save'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default EditConfig;
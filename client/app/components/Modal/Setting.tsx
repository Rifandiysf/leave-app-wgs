import 'bootstrap-icons/font/bootstrap-icons.css'
import { Button } from "../ui/button"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/app/components/ui/card"
import { Label } from "@/app/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/app/components/ui/tabs"
import { useDropzone } from 'react-dropzone'
import { useCallback, useState } from 'react'
import { formatUpperCase } from '@/lib/format'
import ColorPicker from '../ui/colorPicker'

const SettingModal = () => {
    const [theme, setTheme] = useState('light')
    const [logoPreview, setLogoPreview] = useState<string | null>(null)
    const [primaryColor, setPrimaryColor] = useState('#000000')
    const [secondaryColor, setSecondaryColor] = useState('#0011FF')
    const [primaryTextColor, setPrimaryTextColor] = useState('#000000')
    const [secondaryTextColor, setSecondaryTextColor] = useState('#1C398E')

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

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        multiple: false
    })
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="default" className='flex items-center cursor-pointer hover:text-blue-900 transition-colors'>
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
                            <TabsTrigger value="config">Config</TabsTrigger>
                            <TabsTrigger value="inject">Inject</TabsTrigger>
                        </TabsList>
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
                                            onClick={() => setTheme(item)}
                                            className={`flex-1 bg-white border rounded-lg p-3 flex flex-col items-center gap-2 transition-all ${theme === item ? 'border-blue-600 ring-2 ring-blue-200' : 'border-gray-300'}`}
                                        >
                                            <div className={`w-full h-24 rounded-md ${item === 'light' ? 'bg-gray-100' : item === 'dark' ? 'bg-gray-800' : 'bg-gradient-to-r from-gray-100 from-50% to-gray-800 to-50%'} flex items-center justify-center`}>
                                                <div className="w-10 h-6 rounded bg-white shadow-md"></div>
                                            </div>
                                            <div className="flex justify-center items-center gap-1 text-sm font-semibold capitalize">{theme === item ? <i className='bi-check-circle-fill text-blue-600'></i> : <i className='bi-circle-fill text-gray-200'></i>}{item} Mode</div>
                                        </button>
                                    ))}
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="config">
                            <Card className='w-full shadow-none border-none rounded-lg p-3 gap-1'>
                                <CardHeader className='px-1'>
                                    <CardTitle>Config</CardTitle>
                                    <CardDescription>Customize your website</CardDescription>
                                </CardHeader>
                                <CardContent className='flex gap-4 p-0'>
                                    <Card className='w-full shadow-none border-none rounded-lg'>
                                        <CardContent className='flex flex-col gap-6 p-0'>
                                            <div>
                                                <Label className='block text-sm font-medium mb-1'>Website Logo</Label>
                                                <div
                                                    {...getRootProps()}
                                                    className={`border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center cursor-pointer transition-all ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'
                                                        }`}
                                                >
                                                    <input {...getInputProps()} />
                                                    {isDragActive ? (
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

                                            <div>
                                                <Label htmlFor="accent-colors" className='block text-sm font-medium mb-2'>Website Colors</Label>
                                                <div className='flex gap-2'>
                                                    <ColorPicker title='Primary Color' value={formatUpperCase(primaryColor)} onChange={(e) => setPrimaryColor(e.target.value)}/>
                                                    <ColorPicker title='Secondary Color' value={formatUpperCase(secondaryColor)} onChange={(e) => setSecondaryColor(e.target.value)}/>
                                                    <ColorPicker title='Primary Text' value={formatUpperCase(primaryTextColor)} onChange={(e) => setPrimaryTextColor(e.target.value)}/>
                                                    <ColorPicker title='Secondary Text' value={formatUpperCase(secondaryTextColor)} onChange={(e) => setSecondaryTextColor(e.target.value)}/>
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
                    >
                        Save Change
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default SettingModal
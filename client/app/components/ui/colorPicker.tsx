import { Input } from "./input"
import { Label } from "./label"

type ColorPickerProps = {
    title?: string | 'Color'
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ColorPicker = ({title, value, onChange}: ColorPickerProps) => {
    return (
        <div className='flex flex-col justify-start items-center gap-2'>
            <Label htmlFor='secondary' className="text-sm text-center text-gray-500 dark:text-muted-foreground">{title}</Label>
            <div className='flex flex-col justify-center items-center gap-2' id='secondary'>
                <Input
                    type="color"
                    value={value}
                    onChange={onChange}
                    className='w-7 h-7 cursor-pointer border-0 ring-0 outline-0  p-0 shadow-none m-0 rounded-2xl'
                />
                <Input
                    type="text"
                    value={value}
                    onChange={onChange}
                    className="ml-1 border border-border p-1 rounded-md text-xs w-20 h-7 text-center bg-accent text-foreground"
                />
            </div>
        </div>
    )
}

export default ColorPicker
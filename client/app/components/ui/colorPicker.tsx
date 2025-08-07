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
            <Label htmlFor='secondary' className="text-sm text-gray-500">{title}</Label>
            <div className='flex flex-col justify-center items-center gap-1' id='secondary'>
                <Input
                    type="color"
                    value={value}
                    onChange={onChange}
                    className='w-7 h-7 cursor-pointer border-0 ring-0 outline-0  p-0 shadow-none m-0 rounded-2xl'
                />
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    className="ml-1 border p-1 rounded-lg text-xs w-24 text-center bg-white "
                />
            </div>
        </div>
    )
}

export default ColorPicker
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"

type SearchButtonPropsType = {
    placeholder?: string
    className?: string
}

export function SearchButton({ placeholder, className }: SearchButtonPropsType) {
    return (
        <div className="flex w-full items-center gap-2">
            <Input type="search" placeholder={placeholder} className="w-full"/>
            <Button type="submit" variant="default" className={className}>
                <i className="bi bi-search"></i>
            </Button>
        </div>
    )
}

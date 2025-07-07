import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"

export function SearchButton() {
    return (
        <div className="flex w-full max-w-[15rem] items-center gap-2">
            <Input type="search" placeholder="Search History" className="w-44"/>
            <Button type="submit" variant="default">
                <i className="bi bi-search"></i>
            </Button>
        </div>
    )
}

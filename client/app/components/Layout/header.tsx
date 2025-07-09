import 'bootstrap-icons/font/bootstrap-icons.css'
import Image from "next/image"
import { Button } from "../ui/button"

const Header = () => {
    return (
        <header className="flex justify-between items-center p-4 gap-4 h-16 border-b-[1.5px] border-[#0000001f]">
            <div>
                <Image src={"/logo_wgs_fullBlack.svg"} alt="Logo WGS" width={120} height={120}/>
            </div>
            <div>
                <Button>
                    <i className="bi bi-gear-fill"></i>
                    Setting
                </Button>
            </div>
        </header>
    )
}

export default Header
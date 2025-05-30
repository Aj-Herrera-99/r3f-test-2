import { Html } from "@react-three/drei";
import { useState } from "react";

export default function PortalBtn({ content = "next", onClick }) {

    const [isClicked, setIsClicked] = useState(false)
    const handleClick = () => {
        setIsClicked(true)
        onClick()
    }

    return (
        <Html className="-translate-x-1/2" position={[0, window.innerWidth > 640 ? -3.75 : -3.6, -.5]}><button onClick={handleClick} className={`${isClicked && "border-b scale-100"} whitespace-nowrap pb-1 px-2 hover:border-b active:border-b scale-95 active:scale-100 hover:scale-100 transition-transform max-sm:text-xs cursor-pointer`}>{content}</button></Html>
    )
}

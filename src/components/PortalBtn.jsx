import { Html } from "@react-three/drei";

export default function PortalBtn({ content, onClick }) {
    return (
        <Html className="-translate-x-1/2" position={[0, window.innerWidth > 640 ? -3.75 : -3.6, -.5]}><button onClick={onClick} className="whitespace-nowrap pb-1 px-2 hover:border-b active:border-b scale-95 active:scale-100 hover:scale-100 transition-transform max-sm:text-xs  cursor-pointer">{content}</button></Html>
    )
}

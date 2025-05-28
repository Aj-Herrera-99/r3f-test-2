import { Environment, useHelper } from "@react-three/drei"
import { useRef } from "react"
import { DirectionalLightHelper } from "three"

export default function Lights() {
    const directionalLightRef = useRef()
    // useHelper(directionalLightRef, DirectionalLightHelper, 0.3, 0xffffff)
    return (
        <>
            <Environment preset="city" />
            <directionalLight color={0x000000} intensity={100} position={[0, 1, 5]} ref={directionalLightRef} />
        </>
    )
}

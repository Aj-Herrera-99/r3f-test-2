import Lights from "./Lights";
import { Float, Html, MeshTransmissionMaterial, Text } from "@react-three/drei";
import { useRef, useState } from "react";
import gsap from 'gsap'
import { useFrame, useThree } from "@react-three/fiber";
import { MathUtils } from "three";
import { takeScreenshot } from "../utils/takeScreenshot";
import PortalBtn from "./PortalBtn";

export default function Scene({ setScreenshot }) {
    const { viewport, gl, scene, camera } = useThree()
    const [isClicked, setIsClicked] = useState(false)

    const handleEnterPortal = () => {
        setIsClicked(c => !c)
        takeScreenshot(gl, scene, camera, setScreenshot)
    }

    return (
        <>
            {/* lights */}
            <Lights />
            {/* meshes */}
            <Float floatIntensity={.5}>
                <group
                    scale={window.innerWidth > 768 ? viewport.width / 6 : viewport.width / 4}
                >
                    <TorusMesh
                        enterPortal={isClicked}
                        position={[0, 0, 0]}
                        args={[.6, .3]}
                        color={"lightblue"}
                    />
                    <Text
                        font="/fonts/Orbitron-VariableFont_wght.ttf"
                        fontSize={window.innerWidth > 768 ? .75 : .55}
                        position={[0, 0, -.5]}
                    >
                        {"   "}elevate your {"\n"} experience
                    </Text>
                </group>
            </Float>
            <PortalBtn content="embrace the power" onClick={handleEnterPortal} />
        </>
    )
}

function TorusMesh({ position = [0, 0, 0], rotation = [0, 0, 0], args = [], color = 0xffffff, enterPortal }) {
    const meshRef = useRef(null);
    const { pointer } = useThree();
    const [mouseStartPos, setMouseStartPos] = useState(null)
    const [isHovered, setIsHovered] = useState(false)

    useFrame(() => {
        if (!meshRef.current) return
        if (enterPortal) {
            gsap.killTweensOf(meshRef.current.position)
            gsap.to(meshRef.current.position, {
                x: position[0],
                y: position[1],
                duration: .7,
                ease: 'power2.out',
            })

            gsap.to(meshRef.current.rotation, {
                x: rotation[0],
                y: rotation[1],
                duration: .7,
                ease: 'power2.out',
            })
            setMouseStartPos(null);
            return
        }
        if (isHovered) {
            // position
            meshRef.current.position.x = MathUtils.lerp(meshRef.current.position.x, pointer.x * 2, 0.003)
            meshRef.current.position.y = MathUtils.lerp(meshRef.current.position.y, pointer.y * 2, 0.003)
        } else if (!mouseStartPos) {
            // position
            meshRef.current.position.x = MathUtils.lerp(meshRef.current.position.x, position[0], 0.003)
            meshRef.current.position.y = MathUtils.lerp(meshRef.current.position.y, position[1], 0.003)
        }
        return
    })

    // Calcola la direzione rispetto al centro dello schermo
    const handlePointerEnter = () => {
        if (!meshRef.current) return
        setIsHovered(true)

        setMouseStartPos({
            x: pointer.x,
            y: pointer.y
        })
    }

    const handlePointerLeave = () => {
        if (!meshRef.current) return
        if (enterPortal) return
        setIsHovered(false)

        if (mouseStartPos) {
            gsap.killTweensOf(meshRef.current.position)

            gsap.to(meshRef.current.position, {
                x: (pointer.x - mouseStartPos.x) * .85,
                y: (pointer.y - mouseStartPos.y) * .85,
                duration: 2,
                ease: 'power2.out',
            }).eventCallback("onComplete", () => {
                setMouseStartPos(null);
                gsap.to(meshRef.current.position, {
                    x: position[0],
                    y: position[1],
                    duration: 2,
                    ease: 'power2.in',
                })
            })

            gsap.to(meshRef.current.rotation, {
                y: (pointer.x - mouseStartPos.x) * 3,
                x: -(pointer.y - mouseStartPos.y) * 3,
                duration: 2,
                ease: 'power2.out',
            }).eventCallback("onComplete", () => {
                if (meshRef.current) {
                    gsap.to(meshRef.current.rotation, {
                        x: rotation[0],
                        y: rotation[1],
                        duration: 2,
                        ease: 'power2.in',
                    })
                }
            })
        }
    }

    return (
        <mesh
            ref={meshRef}
            position={position}
            rotation={rotation}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
        >
            <torusGeometry args={args} />
            <meshStandardMaterial color={color} />
            <MeshTransmissionMaterial thickness={0.3} roughness={0.3} transmission={1} ior={1} chromaticAberration={0.3} anisotropy={3} backside />
        </mesh>
    )
}

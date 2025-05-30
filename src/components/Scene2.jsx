import { useEffect, useRef, useState } from "react";
import Lights from "./Lights";
import gsap from "gsap"
import { Float, OrbitControls, PresentationControls, Text } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { takeScreenshot } from "../utils/takeScreenshot";
import PortalBtn from "./PortalBtn";
import { focusOnClick } from "../utils/focusOnClick";

export default function Scene2({ setScreenshot }) {
    const { gl, scene, camera } = useThree()
    const meshRef = useRef(null)
    const controlsRef = useRef(null)
    const [controls, setControls] = useState(null)
    const [, forceUpdate] = useState(0);

    const initialCameraPosition = camera.position.clone();
    const initialTarget = controls?.target?.clone();
    // const [isClicked, setIsClicked] = useState(false)

    const handleEnterPortal = () => {
        // setIsClicked(c => !c)
        takeScreenshot(gl, scene, camera, setScreenshot)
    }

    useEffect(() => {
        if (meshRef.current) {
            gsap.fromTo(meshRef.current.position, {
                z: 10
            }, {
                z: 0,
                duration: 3,
                ease: "power1.out"
            })
        }
    }, [meshRef])

    useEffect(() => {
        if (controlsRef.current) {
            setControls(controlsRef.current)
        }
    }, [controlsRef])

    useEffect(() => {
        const handleResize = () => {
            forceUpdate(n => n + 1);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize)
    }, [forceUpdate])

    return (
        <>
            <OrbitControls
                ref={controlsRef}
                enableRotate={false}
                enablePan={false}
                enableZoom={false}
            />
            <Lights />
            <Float floatIntensity={.0005} speed={.3} floatingRange={.4}>
                <PresentationControls
                    global
                    config={{ mass: 2, tension: 500 }}
                    snap
                    rotation={[0, 0, 0]}
                    polar={[-Math.PI / 3, Math.PI / 3]}
                    azimuth={[-Math.PI / 2, Math.PI / 2]}>
                    <mesh ref={meshRef} position={[0, 0]}>
                        <boxGeometry args={[1, 1, 1]} />
                        <meshStandardMaterial color={0xff0000} />
                    </mesh>
                </PresentationControls>
                <LeftText controls={controls} camera={camera} initialCameraPosition={initialCameraPosition} initialTarget={initialTarget} />
                <RightText controls={controls} camera={camera} initialCameraPosition={initialCameraPosition} initialTarget={initialTarget} />
            </Float>
            <PortalBtn onClick={handleEnterPortal} />
        </>
    )
}

function LeftText({ controls, camera, initialCameraPosition, initialTarget }) {
    const ref = useRef()
    const rot = [0, window.innerWidth >= 640 ? 1 : .7, 0]
    const pos = leftTextPos()
    const [isClicked, setIsClicked] = useState(false)

    const handleClick = () => {
        const res = focusOnClick(isClicked, ref.current, camera, initialCameraPosition, initialTarget, controls)
        setIsClicked(res)
    }

    return (<Text
        ref={ref}
        onClick={handleClick}
        font="/fonts/Orbitron-VariableFont_wght.ttf"
        fontSize={.15}
        position={pos}
        rotation={rot}
    >
        Lorem ipsum, dolor sit amet {"\n"}
        consectetur  adipisicing elit.{"\n"}
        Dolore exercitationem  tempore sed!{"\n"}
        Nihil officia magni rerum  {"\n"}
        voluptas sunt modi quis!
    </Text>)
}

function RightText({ controls, camera, initialCameraPosition, initialTarget }) {
    const ref = useRef()
    const rot = [0, window.innerWidth >= 640 ? -1 : -.5, 0]
    const pos = rightTextPos()
    const [isClicked, setIsClicked] = useState(false)

    const handleClick = () => {
        const res = focusOnClick(isClicked, ref.current, camera, initialCameraPosition, initialTarget, controls)
        setIsClicked(res)
    }

    return (
        <Text
            ref={ref}
            onClick={handleClick}
            font="/fonts/Orbitron-VariableFont_wght.ttf"
            fontSize={.15}
            position={pos}
            rotation={rot}
        >
            Lorem ipsum, dolor sit amet {"\n"}
            consectetur  adipisicing elit.{"\n"}
            Dolore exercitationem {"\n"}
            tempore sed! Nihil officia {"\n"}
            magni rerum
            voluptas sunt {"\n"}
            modi quis!
        </Text>
    )
}

const leftTextPos = () => {
    return window.innerWidth >= 1550 ? [-3.7, 1.5, 0]
        : window.innerWidth >= 1280 ? [-3, 1.5, 0]
            : window.innerWidth >= 1024 ? [-2, 1.5, 0]
                : window.innerWidth >= 768 ? [-1.3, 1.5, 0]
                    : innerWidth >= 640 ? [-.8, 1.5, 0]
                        : [-.35, 1.5, 0]
}

const rightTextPos = () => {
    return window.innerWidth >= 1500 ? [3.5, -1.5, 0]
        : window.innerWidth >= 1280 ? [3, -1.5, 0]
            : window.innerWidth >= 1024 ? [2.3, -1.5, 0]
                : window.innerWidth >= 768 ? [1.5, -1.5, 0]
                    : window.innerWidth >= 640 ? [1.2, -1.5, 0]
                        : [.8, -1.5, 0]
}
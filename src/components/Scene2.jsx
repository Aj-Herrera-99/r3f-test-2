import { useEffect, useRef, useState } from "react";
import Lights from "./Lights";
import gsap from "gsap"
import { Float, OrbitControls, Text } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Raycaster } from "three";
import { focusOnObject } from "../utils/focusOnObject";
import { resetCamera } from "../utils/resetCamera";
import { takeScreenshot } from "../utils/takeScreenshot";
import PortalBtn from "./PortalBtn";

export default function Scene2({ setScreenshot }) {
    const meshRef = useRef(null)
    const controlsRef = useRef(null)
    const [controls, setControls] = useState(null)
    const { gl, scene, camera } = useThree()
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

    return (
        <>
            <OrbitControls
                ref={controlsRef}
                // enableRotate={false}

                enablePan={false}
                enableZoom={false}
            />
            <Lights />
            <Float floatIntensity={.0005} speed={.3} floatingRange={.4}>
                <mesh ref={meshRef} position={[0, 0]}>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial color={0xff0000} />
                </mesh>
                <LeftText controls={controls} />
                <RightText controls={controls} />
            </Float>
            <PortalBtn content="go back" onClick={handleEnterPortal} />
        </>
    )
}

function LeftText({ controls }) {
    const { camera, scene, pointer } = useThree();
    const initialCameraPosition = camera.position.clone();
    const initialTarget = controls?.target?.clone();

    const rot = [0, window.innerWidth >= 640 ? 1 : .7, 0]
    const pos = window.innerWidth >= 1550 ? [-3.7, 1.5, 0] : window.innerWidth >= 1280 ? [-3, 1.5, 0] : window.innerWidth >= 1024 ? [-2, 1.5, 0] : window.innerWidth >= 768 ? [-1.3, 1.5, 0] : innerWidth >= 640 ? [-.8, 1.5, 0] : [-.35, 1.5, 0]
    const [, forceUpdate] = useState(0);
    const [isClicked, setIsClicked] = useState(false)

    const raycaster = new Raycaster();

    const handleClick = () => {
        if (!isClicked) {
            // Lancia il raycaster dalla camera
            raycaster.setFromCamera(pointer, camera);

            const intersects = raycaster.intersectObjects(scene.children, true); // true = cerca in profondità

            if (intersects.length > 0 && controls) {
                const targetMesh = intersects[0].object;
                focusOnObject(targetMesh, camera, controls);
            }
        } else {
            console.log('test')
            resetCamera(camera, initialCameraPosition, initialTarget, controls)
        }
        setIsClicked(c => !c)
    }

    useEffect(() => {
        const handleResize = () => {
            forceUpdate(n => n + 1);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize)
    }, [forceUpdate])

    return <Text onClick={handleClick} font="/fonts/Orbitron-VariableFont_wght.ttf" fontSize={.15} position={pos} rotation={rot}>
        Lorem ipsum, dolor sit amet {"\n"}
        consectetur  adipisicing elit.{"\n"}
        Dolore exercitationem  tempore sed!{"\n"}
        Nihil officia magni rerum  {"\n"}
        voluptas sunt modi quis!
    </Text>
}

function RightText({ controls }) {
    const { camera, scene, pointer } = useThree();
    const initialCameraPosition = camera.position.clone();
    const initialTarget = controls?.target?.clone();

    const rot = [0, window.innerWidth >= 640 ? -1 : -.5, 0]
    const pos = window.innerWidth >= 1500 ? [3.5, -1.5, 0] : window.innerWidth >= 1280 ? [3, -1.5, 0] : window.innerWidth >= 1024 ? [2.3, -1.5, 0] : window.innerWidth >= 768 ? [1.5, -1.5, 0] : window.innerWidth >= 640 ? [1.2, -1.5, 0] : [.8, -1.5, 0]
    const [, forceUpdate] = useState(0);
    const [isClicked, setIsClicked] = useState(false)

    const raycaster = new Raycaster();

    const handleClick = () => {
        if (!isClicked) {
            // Lancia il raycaster dalla camera
            raycaster.setFromCamera(pointer, camera);

            const intersects = raycaster.intersectObjects(scene.children, true); // true = cerca in profondità

            if (intersects.length > 0 && controls) {
                const targetMesh = intersects[0].object;
                focusOnObject(targetMesh, camera, controls);
            }
        } else {
            console.log('test')
            resetCamera(camera, initialCameraPosition, initialTarget, controls)
        }
        setIsClicked(c => !c)
    }

    useEffect(() => {
        const handleResize = () => {
            forceUpdate(n => n + 1);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize)
    }, [forceUpdate])

    return <Text onClick={handleClick} font="/fonts/Orbitron-VariableFont_wght.ttf" fontSize={.15} position={pos} rotation={rot}>
        Lorem ipsum, dolor sit amet {"\n"}
        consectetur  adipisicing elit.{"\n"}
        Dolore exercitationem {"\n"}
        tempore sed! Nihil officia {"\n"}
        magni rerum
        voluptas sunt {"\n"}
        modi quis!
    </Text>
}


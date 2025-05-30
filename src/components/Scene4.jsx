import { Image, OrbitControls, Scroll, ScrollControls, useScroll } from '@react-three/drei'
import Lights from './Lights'
import { BufferGeometry, Color, MathUtils, MeshBasicMaterial, TextureLoader, Vector3 } from 'three'
import { useFrame, useLoader } from '@react-three/fiber'
import { useEffect, useRef } from 'react'

export default function Scene4() {
    return (
        <>
            <Lights />
            <ScrollControls horizontal pages={3}>
                <Map />
                <Minimap />
            </ScrollControls>
        </>
    )
}

function Map() {

    const imgSources = Array.from({ length: 6 }).map((_, i) => `/images/${i + 1}.jpg`);
    // carico tutte le texture in un array
    const textures = useLoader(TextureLoader, imgSources);

    const ref = useRef()

    const geometry = new BufferGeometry().setFromPoints([new Vector3(0, -2, 0), new Vector3(0, 3, 0)])
    const material = new MeshBasicMaterial()
    material.color = new Color('red')
    const length = 30

    const scroll = useScroll();

    useFrame(() => {
        if (ref.current) {
            ref.current.children.forEach((child, i, arr) => {
                const y = scroll.curve(i / arr.length - .16, 10 / arr.length)
                if (y < .8) {
                    child.scale.y = .8
                } else {
                    child.scale.y = y
                }
            })
        }
    })

    const lines = Array.from({ length }).map((_, i) => {
        let x = i / (length - 1) // normalizzazione x = 0~1
        x = x - 0.5     // centramento in 0
        x *= length * .4    // moltiplicatore arbitrario
        return <line
            key={i}
            geometry={geometry}
            material={material}
            position={[x, 0, 0]}
        />
    })

    const images = textures.map((texture, i, arr) => {
        const aspect = texture.image.width / texture.image.height;

        

        let x = i / (arr.length - 1) // normalizzazione x = 0~1
        x = x - 0.5     // centramento in 0
        x *= arr.length * 2
        return <Image key={i} url={imgSources[i]} position={[x, 0, 1]}>
            <planeGeometry args={[aspect, 4]} />
        </Image>
    })
    return <>
        <group>
            {images}
        </group>
        <group ref={ref}>
            {lines}
        </group>
    </>
}
function Minimap() {
    const ref = useRef()

    const geometry = new BufferGeometry().setFromPoints([new Vector3(0, -0.15, 0), new Vector3(0, 0.15, 0)])
    const material = new MeshBasicMaterial()
    material.color = new Color('red')
    const length = 30

    const scroll = useScroll();

    useFrame(() => {
        if (ref.current) {
            ref.current.children.forEach((child, i, arr) => {
                const y = scroll.curve(i / arr.length - .07, 5 / arr.length)
                if (y < .3) {
                    child.scale.y = .3
                } else {
                    child.scale.y = y
                }
            })
        }
    })

    const lines = Array.from({ length }).map((_, i) => {
        let x = i / (length - 1) // normalizzazione x = 0~1
        x = x - 0.5     // centramento in 0
        x *= length * .07    // moltiplicatore arbitrario
        return <line
            key={i}
            geometry={geometry}
            material={material}
            position={[x, -3, 0]}
        />
    })
    return <group ref={ref}>
        {lines}
    </group>
}

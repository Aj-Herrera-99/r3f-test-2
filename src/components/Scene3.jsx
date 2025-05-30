import { ScrollControls, Scroll, useScroll } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import Lights from './Lights'
import PortalBtn from './PortalBtn'
import { takeScreenshot } from '../utils/takeScreenshot'

// https://drei.docs.pmnd.rs/controls/scroll-controls
export default function Scene3({ setScreenshot }) {
    const { gl, scene, camera } = useThree()

    const handleEnterPortal = () => {
        console.log(scene.children)
        takeScreenshot(gl, scene, camera, setScreenshot)
    }
    return (
        <>
            <Lights />
            <ScrollControls pages={3} damping={0.6}>
                <Scroll html>
                    <First />
                    <Second />
                    <Third />
                </Scroll>
            </ScrollControls>
            <PortalBtn onClick={handleEnterPortal} />
        </>
    )
}

function First() {
    const img1 = useRef()
    const img2 = useRef()
    const div2 = useRef()
    const scroll = useScroll();
    const refs = [img1, img2, div2]

    useFrame(() => {
        if (refs.some(ref => !ref.current)) return
        img1.current.style.transform = `scale(${scroll.offset * 3 + 1})`;
        img2.current.style.transform = `scale(${scroll.offset * 1.3 + 1})`;
        div2.current.style.transform = `translateY(${-scroll.offset * 750}px)`;
    })

    return <div className='canvas-div absolute w-screen h-screen flex justify-center items-center gap-[75px] z-40'>
        <div className='w-[500px] h-full overflow-hidden relative'>
            <img ref={img1} src="/images/1.jpg" alt="cover" className='w-full h-full object-cover' />
            <div className='overlay absolute z-10 inset-0 bg-black transition-opacity duration-300'></div>
        </div>
        <div ref={div2} className='w-[500px] aspect-square overflow-hidden'>
            <img ref={img2} src="/images/2.jpg" alt="cover" className='w-full h-full object-cover' />
            <div className='overlay absolute z-10 inset-0 bg-black transition-opacity duration-300'></div>
        </div>
        <span className='absolute bottom-16 left-48 z-10 text-[250px] text-black'>to</span>
    </div>
}

function Second() {
    const img1 = useRef()
    const img2 = useRef()
    const img3 = useRef()
    const img4 = useRef()
    const div1 = useRef()
    const div2 = useRef()
    const div3 = useRef()
    const div4 = useRef()
    const scroll = useScroll();
    const refs = [div1, div2, div3, div4, img1, img2, img3, img4]

    useFrame(() => {
        if (refs.some(ref => !ref.current)) return

        div1.current.style.transform = `translateY(${-(scroll.offset * 1000) + 500}px)`;
        div2.current.style.transform = `translateY(${-(scroll.offset * 2000) + 1000}px)`;
        div3.current.style.transform = `translateY(${-(scroll.offset * 4000) + 2000}px)`;
        div4.current.style.transform = `translateY(${-(scroll.offset * 1500) + 750}px)`;

        img1.current.style.transform = `scale(${(scroll.offset * 2.5) + 1})`;
        img2.current.style.transform = `scale(${(scroll.offset * 2) + 1})`;
        img3.current.style.transform = `scale(${(scroll.offset * 1.5) + 1})`;
        img4.current.style.transform = `scale(${(scroll.offset * 2.5) + 1})`;
    })

    return <div className='canvas-div absolute mt-[100vh] w-screen h-screen text-black flex [&>div]:h-[650px] items-center justify-center gap-8'>
        <div ref={div1} className='w-[163px] h-full overflow-hidden ' >
            <img ref={img1} src="/images/1.jpg" alt="cover" className='w-full h-full object-cover' />
            <div className='overlay absolute z-10 inset-0 bg-black transition-opacity duration-300'></div>
        </div>
        <div ref={div2} className='w-[325px] overflow-hidden '>
            <img ref={img2} src="/images/2.jpg" alt="cover" className='w-full h-full object-cover' />
            <div className='overlay absolute z-10 inset-0 bg-black transition-opacity duration-300'></div>
        </div>
        <div ref={div3} className='w-[650px] overflow-hidden '>
            <img ref={img3} src="/images/3.jpg" alt="cover" className='w-full h-full object-cover' />
            <div className='overlay absolute z-10 inset-0 bg-black transition-opacity duration-300'></div>
        </div>
        <div ref={div4} className='absolute w-[400px] !h-[725px] aspect-square overflow-hidden left-1/2 -translate-x-1/2 bottom-[-750px]'>
            <img ref={img4} src="/images/5.jpg" alt="cover" className='w-full h-full object-cover' />
            <div className='overlay absolute z-10 inset-0 bg-black transition-opacity duration-300'></div>
        </div>

        <span className='absolute left-1/2 translate-x-1/2 bottom-1/2 text-[250px] text-black'>be</span>
    </div>
}

function Third() {
    const img = useRef()
    const scroll = useScroll();
    useFrame(() => {
        if (!img.current) return
        img.current.style.transform = `scale(${(scroll.offset * 1.3) + 1})`;
    })

    return <div className='canvas-div absolute mt-[200vh] w-screen h-screen flex flex-col-reverse'>
        <div className='h-1/2 w-full overflow-hidden relative'>
            <img ref={img} src="/images/6.jpg" alt="cover" className='w-full h-full object-cover object-bottom' />
            <div className='overlay absolute z-10 inset-0 bg-black transition-opacity duration-300'></div>
        </div>

        <span className='absolute left-1/2 -translate-x-1/2 bottom-1/2 translate-y-1/4 text-[650px] text-black'>home</span>
    </div>
}

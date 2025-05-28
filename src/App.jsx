import { Canvas } from '@react-three/fiber'
import './App.css'
import Scene from './components/Scene'
import { Stats } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import gsap from "gsap"
import Scene2 from './components/Scene2'
function App() {


  const [screenshot, setScreenshot] = useState(null)
  const screenshotRef = useRef(null)
  const pRef = useRef(null)
  const [blurLvl, setBlurLvl] = useState(0)
  const [currScene, setCurrScene] = useState(1)

  useEffect(() => {
    if (screenshot && screenshotRef.current && pRef.current) {

      gsap.to(pRef.current,
        {
          opacity: 1, duration: 2, ease: "power3.in"
        })

      const tween = gsap.to(screenshotRef.current, {
        transform: "scale(20)",
        rotate: "90deg",
        duration: 3.5,
        ease: "power3.in",
        onUpdate() {
          setBlurLvl(tween.progress())
        },
        onComplete() {
          setScreenshot(null)
          setCurrScene(c => c === 1 ? 2 : 1)
        }
      })
    }
  }, [screenshot, screenshotRef])

  return (
    <>
      <main className='relative h-[100dvh] bg-black'>
        {screenshot ?
          <div>
            <img
              ref={screenshotRef}
              src={screenshot}
              alt="Screenshot"
              style={{ width: '100%', height: '100%', transform: "scale(1)", objectFit: 'cover', filter: `blur(${blurLvl * 8}px)` }}
            />
            <p ref={pRef} className='absolute top-1/2 left-1/2 -translate-1/2 opacity-0'>Lorem, ipsum dolor.</p>
          </div> :
          <>
            <Canvas style={{ background: 'black' }}>

              {currScene === 1 &&
                <Scene setScreenshot={setScreenshot} />
              }
              {currScene === 2 &&
                <Scene2 setScreenshot={setScreenshot} />
              }
            </Canvas>
          </>
        }
        <Stats />
      </main>
    </>
  )
}

export default App

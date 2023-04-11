import { useEffect, useState } from "react"

export const useScreen = () => {
  const [screen, setScreen] = useState(window.innerWidth)

  useEffect(() => {
    const handle = () => setScreen(window.innerWidth)
    window.addEventListener('resize', handle)

    return () => {
      window.removeEventListener('resize', handle)
    }
  }, [])

  return screen
}
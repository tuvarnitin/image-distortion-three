import { useEffect, useRef } from "react";

export default function useMouse() {
    const mouse = useRef({
        x: 0,
        y: 0
    })
    const handleMouseMove = (e) => {
        mouse.current.x = (e.clientX / window.innerWidth) - 0.5;
        mouse.current.y = ((e.clientY / window.innerHeight) - 0.5) * -1;
    }

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])

    return mouse
}
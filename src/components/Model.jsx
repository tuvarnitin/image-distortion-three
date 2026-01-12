import { useRef, useEffect } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { vertex } from "../shaders/vertex.glsl"
import { fragment } from "../shaders/fragment.glsl"
import { useAspect, useTexture } from "@react-three/drei"
import useMouse from "../hooks/useMouse"
import { images } from "../images"
import gsap from "gsap"

import * as THREE from 'three'
import { glsl } from "three/tsl"

export default function Model({ selectedIndex }) {

    const textures = images.map(image => useTexture(image.path));

    const mesh = useRef(null)
    const mouse = useMouse()

    const { viewport } = useThree()

    const scale = useAspect(
        textures[0]?.image.height > textures[0]?.image.width ? textures[0]?.image.height : textures[0]?.image.width,
        textures[0]?.image.height < textures[0]?.image.width ? textures[0]?.image.width : textures[0]?.image.height,
        0.065
    )

    const lerp = (x, y, a) => x * (1 - a) + y * a;

    const smoothMouse = useRef({ x: mouse.current.x, y: mouse.current.y })

    const uniforms = useRef({
        uTexture: { value: textures[0] },
        uDelta: { value: { x: 0, y: 0 } },
        uOpacity: { value: 1 }
    })

    useFrame(() => {

        if (!mesh.current) return;
        const smoothX = smoothMouse.current.x;
        const smoothY = smoothMouse.current.y;

        smoothMouse.current.x = lerp(smoothX, mouse.current?.x, 0.1)
        smoothMouse.current.y = lerp(smoothY, mouse.current?.y, 0.1)

        gsap.to(mesh.current.position, {
            x: mouse.current?.x * viewport.width,
            y: mouse.current?.y * viewport.height,
            duration: 0.1,
            ease: "power1.inOut"
        })
        mesh.current.material.uniforms.uDelta.value.x = (mouse.current?.x - smoothX)
        mesh.current.material.uniforms.uDelta.value.y = (mouse.current?.y - smoothY)

    })

    useEffect(() => {
        if (selectedIndex === null) {
            mesh.current.material.uniforms.uOpacity.value = 0.0;
        } else {
            mesh.current.material.uniforms.uOpacity.value = 1.0;
            mesh.current.material.uniforms.uTexture.value = textures[selectedIndex];
        }
    }, [textures[selectedIndex]])

    // if (mesh.current) {
    //     mesh.current.material.uTexture.colorSpace = THREE.SRGBColorSpace
    //     mesh.current.material.uTexture.minFilter = THREE.LinearFilter
    //     mesh.current.material.uTexture.magFilter = THREE.LinearFilter
    //     mesh.current.material.uTexture.generateMipmaps = false
    //     mesh.current.material.uTexture.anisotropy = gl.capabilities.getMaxAnisotropy()
    // }
    return (
        <mesh ref={mesh} scale={scale}>
            <planeGeometry args={[2, 3, 50, 50]} />
            <shaderMaterial
                vertexShader={vertex}
                fragmentShader={fragment}
                uniforms={uniforms.current}
            />
        </mesh>
    )
}


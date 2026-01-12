import { Canvas } from '@react-three/fiber'
import Model from './Model'

const Scene = ({ selectedIndex }) => {

    return (
        <Canvas style={{ background: 'transparent' }} dpr={[1, Math.min(window.devicePixelRatio, 2)]}>
            {
                selectedIndex !== null &&
                <Model selectedIndex={selectedIndex} />
            }
        </Canvas>
    )
}

export default Scene
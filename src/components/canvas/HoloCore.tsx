import { useMemo, useRef, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createCoreMaterial } from "../../three/CoreMaterial";

interface HoloCoreProps {
    scrollProgress: MutableRefObject<number>;
    pointer: MutableRefObject<{ x: number; y: number }>;
    mobile: boolean;
}

export default function HoloCore({
    scrollProgress,
    pointer,
    mobile,
}: HoloCoreProps) {
    const group = useRef<THREE.Group>(null);
    const shellRef = useRef<THREE.Mesh>(null);
    const material = useMemo(() => createCoreMaterial(), []);

    const detail = mobile ? 3 : 5;
    const baseX = mobile ? 0 : 1.75;
    const endX = mobile ? 0 : 2.6;

    useFrame((state, delta) => {
        const t = state.clock.elapsedTime;
        material.uniforms.uTime.value = t;

        if (group.current) {
            const tiltX = pointer.current.y * 0.25;
            const tiltZ = pointer.current.x * -0.18;

            group.current.rotation.y = t * 0.16;
            group.current.rotation.x = THREE.MathUtils.lerp(
                group.current.rotation.x,
                tiltX,
                0.045,
            );
            group.current.rotation.z = THREE.MathUtils.lerp(
                group.current.rotation.z,
                tiltZ,
                0.045,
            );

            const p = scrollProgress.current;
            const scale = THREE.MathUtils.clamp(1 - p * 0.82, 0.2, 1);
            group.current.scale.setScalar(scale);
            group.current.position.y = -p * 0.6;
            group.current.position.x = THREE.MathUtils.lerp(baseX, endX, p);
        }

        if (shellRef.current) {
            shellRef.current.rotation.y -= delta * 0.05;
            shellRef.current.rotation.x += delta * 0.02;
        }
    });

    return (
        <group ref={group} position={[baseX, 0, 0]}>
            <mesh material={material}>
                <icosahedronGeometry args={[1.25, detail]} />
            </mesh>
            <mesh ref={shellRef} scale={1.58}>
                <icosahedronGeometry args={[1.25, 1]} />
                <meshBasicMaterial
                    color="#9B6BFF"
                    wireframe
                    transparent
                    opacity={0.14}
                    depthWrite={false}
                />
            </mesh>
        </group>
    );
}

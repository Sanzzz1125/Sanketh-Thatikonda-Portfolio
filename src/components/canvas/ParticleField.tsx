import { useMemo, useRef, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

interface ParticleFieldProps {
    pointer: MutableRefObject<{ x: number; y: number }>;
    count?: number;
}

export default function ParticleField({
    pointer,
    count = 1400,
}: ParticleFieldProps) {
    const ref = useRef<THREE.Points>(null);

    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const radius = 3.5 + Math.random() * 11;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6;
            arr[i * 3 + 2] = radius * Math.cos(phi) - 4;
        }
        return arr;
    }, [count]);

    useFrame((_, delta) => {
        const points = ref.current;
        if (!points) return;
        points.rotation.y += delta * 0.014;
        points.rotation.x = THREE.MathUtils.lerp(
            points.rotation.x,
            pointer.current.y * 0.08,
            0.02,
        );
        points.rotation.z = THREE.MathUtils.lerp(
            points.rotation.z,
            -pointer.current.x * 0.05,
            0.02,
        );
    });

    return (
        <Points ref={ref} positions={positions} stride={3}>
            <PointMaterial
                transparent
                color="#8fd8ff"
                size={0.026}
                sizeAttenuation
                depthWrite={false}
                opacity={0.5}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    );
}

import { Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import HoloCore from "./HoloCore";
import ParticleField from "./ParticleField";

interface SceneProps {
    mobile: boolean;
    reducedMotion: boolean;
}

export default function Scene({ mobile, reducedMotion }: SceneProps) {
    const pointer = useRef({ x: 0, y: 0 });
    const scrollProgress = useRef(0);

    useEffect(() => {
        const onMove = (e: PointerEvent) => {
            pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
        };
        const onScroll = () => {
            const heroHeight = window.innerHeight * 0.9;
            scrollProgress.current = Math.min(
                Math.max(window.scrollY / heroHeight, 0),
                1,
            );
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => {
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    if (reducedMotion) return null;

    return (
        <div className="fixed inset-0 z-0" aria-hidden="true">
            <Canvas
                dpr={[1, mobile ? 1.5 : 2]}
                camera={{ position: [0, 0, 6], fov: 45 }}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance",
                }}
            >
                <Suspense fallback={null}>
                    <ParticleField pointer={pointer} count={mobile ? 450 : 1500} />
                    <HoloCore
                        scrollProgress={scrollProgress}
                        pointer={pointer}
                        mobile={mobile}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
}

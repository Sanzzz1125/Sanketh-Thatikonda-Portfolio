import { useRef, type MouseEvent } from "react";
import { useMotionValue, useSpring } from "motion/react";

/**
 * Pointer-driven 3D tilt for cards. Rotation is spring-smoothed; the sheen
 * position (--mx / --my custom properties, consumed in CSS) is set directly
 * on the DOM node so it tracks the cursor with zero lag.
 */
export function useTilt(maxDeg = 8) {
    const ref = useRef<HTMLDivElement>(null);
    const rawRotateX = useMotionValue(0);
    const rawRotateY = useMotionValue(0);
    const springConfig = { stiffness: 220, damping: 22, mass: 0.5 };
    const rotateX = useSpring(rawRotateX, springConfig);
    const rotateY = useSpring(rawRotateY, springConfig);

    const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        rawRotateY.set((px - 0.5) * maxDeg * 2);
        rawRotateX.set(-(py - 0.5) * maxDeg * 2);
        el.style.setProperty("--mx", `${px * 100}%`);
        el.style.setProperty("--my", `${py * 100}%`);
    };

    const onMouseLeave = () => {
        rawRotateX.set(0);
        rawRotateY.set(0);
        ref.current?.style.setProperty("--mx", "50%");
        ref.current?.style.setProperty("--my", "50%");
    };

    return { ref, rotateX, rotateY, onMouseMove, onMouseLeave };
}

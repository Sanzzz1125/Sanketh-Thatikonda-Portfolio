import { useRef, type MouseEvent, type RefObject } from "react";
import { useMotionValue, useSpring, type MotionValue } from "motion/react";

interface UseMagneticResult<T> {
    ref: RefObject<T | null>;
    x: MotionValue<number>;
    y: MotionValue<number>;
    onMouseMove: (e: MouseEvent) => void;
    onMouseLeave: () => void;
}

/** Spreads onto a motion element to give it a magnetic pull toward the cursor. */
export function useMagnetic<T extends HTMLElement>(
    strength = 0.35,
): UseMagneticResult<T> {
    const ref = useRef<T>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
    const springY = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

    const onMouseMove = (e: MouseEvent) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
        y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
    };

    const onMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return { ref, x: springX, y: springY, onMouseMove, onMouseLeave };
}

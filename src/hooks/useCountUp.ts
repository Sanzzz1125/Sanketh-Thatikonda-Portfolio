import { useEffect, useRef, useState } from "react";

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

interface CountUpOptions {
    end: number;
    duration?: number;
    decimals?: number;
    reducedMotion?: boolean;
}

/** Counts up to `end` once the returned ref scrolls into view. */
export function useCountUp<T extends HTMLElement>({
    end,
    duration = 1600,
    decimals = 0,
    reducedMotion = false,
}: CountUpOptions) {
    const ref = useRef<T | null>(null);
    const [value, setValue] = useState(reducedMotion ? end : 0);
    const started = useRef(false);

    useEffect(() => {
        if (reducedMotion) {
            setValue(end);
            return;
        }
        const node = ref.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !started.current) {
                        started.current = true;
                        const start = performance.now();
                        const tick = (now: number) => {
                            const progress = Math.min(
                                (now - start) / duration,
                                1,
                            );
                            setValue(end * easeOutExpo(progress));
                            if (progress < 1) requestAnimationFrame(tick);
                        };
                        requestAnimationFrame(tick);
                    }
                });
            },
            { threshold: 0.4 },
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, [end, duration, reducedMotion]);

    const display =
        decimals > 0 ? value.toFixed(decimals) : String(Math.round(value));

    return { ref, display };
}

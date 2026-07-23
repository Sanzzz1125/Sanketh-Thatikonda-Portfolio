import { useEffect, useRef, useState } from "react";

interface PreloaderProps {
    onComplete: () => void;
    reducedMotion?: boolean;
}

const DURATION = 1700; // ms
const EXIT_MS = 700;

/**
 * Plain React state + requestAnimationFrame, no animation-library timeline.
 * The previous GSAP-timeline version was getting stuck mid-play in testing
 * (nested tween + onComplete chaining is hard to reason about under
 * StrictMode's double-invoke) — this version has far fewer moving parts:
 * one rAF loop drives the count, one CSS transition (toggled by a single
 * boolean) handles the exit slide. Nothing to get left half-finished.
 */
export default function Preloader({
    onComplete,
    reducedMotion = false,
}: PreloaderProps) {
    const [count, setCount] = useState(0);
    const [exiting, setExiting] = useState(false);
    const onCompleteRef = useRef(onComplete);
    onCompleteRef.current = onComplete;

    useEffect(() => {
        if (reducedMotion) {
            setCount(100);
            setExiting(true);
            const t = window.setTimeout(() => onCompleteRef.current(), 250);
            return () => window.clearTimeout(t);
        }

        const start = performance.now();
        let frame: number;

        const tick = (now: number) => {
            const progress = Math.min((now - start) / DURATION, 1);
            const eased = 1 - Math.pow(1 - progress, 2);
            setCount(Math.floor(eased * 100));

            if (progress < 1) {
                frame = requestAnimationFrame(tick);
            } else {
                setCount(100);
                setExiting(true);
                window.setTimeout(() => onCompleteRef.current(), EXIT_MS);
            }
        };
        frame = requestAnimationFrame(tick);

        return () => cancelAnimationFrame(frame);
    }, [reducedMotion]);

    return (
        <div
            aria-hidden="true"
            className={`fixed inset-0 z-[100] bg-black flex items-center justify-center transition-transform ease-[cubic-bezier(0.76,0,0.24,1)] ${
                exiting ? "-translate-y-full" : "translate-y-0"
            }`}
            style={{ transitionDuration: `${EXIT_MS}ms` }}
        >
            <div className="mono-heading text-8xl sm:text-9xl tabular-nums text-white">
                {String(count).padStart(2, "0")}
                <span style={{ color: "var(--accent-cyan)" }}>%</span>
            </div>
        </div>
    );
}

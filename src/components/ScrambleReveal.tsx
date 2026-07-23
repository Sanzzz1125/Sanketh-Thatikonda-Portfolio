import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

interface ScrambleRevealProps {
    text: string;
    className?: string;
    delay?: number;
    start?: boolean;
}

export default function ScrambleReveal({
    text,
    className,
    delay = 0,
    start = true,
}: ScrambleRevealProps) {
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el || !start) return;

        const tween = gsap.to(el, {
            duration: 1.6,
            delay,
            ease: "none",
            scrambleText: {
                text,
                chars: "XO01#*+<>/\\ABCDEFGHIJKLMNOPQRSTUVWXYZ",
                speed: 0.42,
                revealDelay: 0.15,
            },
        });

        return () => {
            tween.kill();
        };
    }, [text, delay, start]);

    return (
        <span className={className}>
            <span className="sr-only">{text}</span>
            <span ref={ref} aria-hidden="true" />
        </span>
    );
}

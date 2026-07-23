import { useEffect, useRef, type ReactNode } from "react";
import { gsap, SplitText } from "../lib/gsap";

interface RevealHeadingProps {
    children: ReactNode;
    className?: string;
}

export default function RevealHeading({
    children,
    className,
}: RevealHeadingProps) {
    const ref = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // Plain one-shot split (no autoSplit) — heading text is static and
        // line breaks are explicit <br/>s, so there's nothing to react to on
        // resize. autoSplit installs its own resize/font-load listeners that
        // only `.kill()` removes (`.revert()` alone leaks them), which under
        // StrictMode's mount/unmount/remount cycle in dev caused a stale
        // listener to fire against an already-reverted element and throw —
        // taking down the whole tree since nothing caught it. Simpler is safer.
        const split = new SplitText(el, {
            type: "lines",
            mask: "lines",
            linesClass: "reveal-line",
        });

        const tween = gsap.from(split.lines, {
            yPercent: 110,
            opacity: 0,
            stagger: 0.07,
            duration: 0.9,
            ease: "power4.out",
            scrollTrigger: {
                trigger: el,
                start: "top 88%",
                once: true,
            },
        });

        return () => {
            (tween as any)?.scrollTrigger?.kill();
            tween.kill();
            split.revert();
        };
    }, []);

    return (
        <h2 ref={ref} className={className}>
            {children}
        </h2>
    );
}

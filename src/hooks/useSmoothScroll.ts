import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "../lib/gsap";

/** Live Lenis instance, set while smooth scroll is active. Nav uses this to
 *  scroll-to-section without fighting Lenis's own scroll handling; falls
 *  back to native scrollIntoView when null (reduced-motion / not yet ready). */
export const lenisRef: { current: Lenis | null } = { current: null };

export function useSmoothScroll(enabled: boolean) {
    useEffect(() => {
        if (!enabled) return;

        const lenis = new Lenis({
            duration: 1.1,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });
        lenisRef.current = lenis;

        lenis.on("scroll", ScrollTrigger.update);

        const tick = (time: number) => {
            lenis.raf(time * 1000);
        };
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(tick);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, [enabled]);
}

export function scrollToSection(id: string) {
    if (lenisRef.current) {
        lenisRef.current.scrollTo(`#${id}`, { offset: 0, duration: 1.2 });
        return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(() =>
        typeof window !== "undefined" ? window.matchMedia(query).matches : false,
    );

    useEffect(() => {
        const mql = window.matchMedia(query);
        const onChange = () => setMatches(mql.matches);
        onChange();
        mql.addEventListener("change", onChange);
        return () => mql.removeEventListener("change", onChange);
    }, [query]);

    return matches;
}

/** True on small / handheld viewports — used to scale back particle counts. */
export function useIsMobile(): boolean {
    return useMediaQuery("(max-width: 768px)");
}

/** True when the primary input has no hover (touch). Custom cursor + tilt disable here. */
export function useIsCoarsePointer(): boolean {
    return useMediaQuery("(hover: none), (pointer: coarse)");
}

export function usePrefersReducedMotion(): boolean {
    return useMediaQuery("(prefers-reduced-motion: reduce)");
}

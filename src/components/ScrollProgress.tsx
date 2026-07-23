import { motion, useScroll, useSpring } from "motion/react";

/**
 * Vertical signal strip on the left edge instead of the usual top bar —
 * reads as part of the nav rail rather than a bolted-on loading indicator.
 */
export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 200,
        damping: 40,
        restDelta: 0.001,
    });

    return (
        <motion.div
            aria-hidden="true"
            className="fixed top-0 left-0 bottom-0 w-[2px] z-[95] origin-top"
            style={{ scaleY, background: "var(--accent-cyan)" }}
        />
    );
}

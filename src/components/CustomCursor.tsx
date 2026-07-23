import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
    const x = useMotionValue(-100);
    const y = useMotionValue(-100);
    const springX = useSpring(x, { damping: 28, stiffness: 380, mass: 0.4 });
    const springY = useSpring(y, { damping: 28, stiffness: 380, mass: 0.4 });
    const [hovering, setHovering] = useState(false);
    const [label, setLabel] = useState("");
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const move = (e: MouseEvent) => {
            x.set(e.clientX);
            y.set(e.clientY);
            setVisible(true);
        };
        const onOver = (e: MouseEvent) => {
            const target = (e.target as HTMLElement)?.closest?.<HTMLElement>(
                "a, button, [data-cursor-hover]",
            );
            setHovering(Boolean(target));
            setLabel(target?.dataset.cursorLabel ?? "");
        };
        const onLeaveWindow = () => setVisible(false);

        window.addEventListener("mousemove", move, { passive: true });
        window.addEventListener("mouseover", onOver, { passive: true });
        document.addEventListener("mouseleave", onLeaveWindow);
        return () => {
            window.removeEventListener("mousemove", move);
            window.removeEventListener("mouseover", onOver);
            document.removeEventListener("mouseleave", onLeaveWindow);
        };
    }, [x, y]);

    return (
        <motion.div
            aria-hidden="true"
            className="pointer-events-none fixed left-0 top-0 z-[200] mix-blend-difference"
            style={{ x: springX, y: springY, opacity: visible ? 1 : 0 }}
        >
            <motion.div
                className="flex items-center justify-center rounded-full bg-white -translate-x-1/2 -translate-y-1/2"
                animate={{ width: hovering ? 60 : 9, height: hovering ? 60 : 9 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
            >
                <span className="mono-heading text-black text-[9px] tracking-widest">
                    {hovering ? label : ""}
                </span>
            </motion.div>
        </motion.div>
    );
}

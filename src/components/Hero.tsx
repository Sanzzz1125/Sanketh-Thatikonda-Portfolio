import { motion } from "motion/react";
import resume from "../assets/resume.pdf";
import ScrambleReveal from "./ScrambleReveal";
import { useMagnetic } from "../hooks/useMagnetic";
import { useCountUp } from "../hooks/useCountUp";
import { STATS } from "../data/content";

interface StatBlockProps {
    label: string;
    value: number;
    decimals?: number;
    suffix?: string;
    pad?: number;
    reducedMotion: boolean;
}

function StatBlock({
    label,
    value,
    decimals = 0,
    suffix = "",
    pad,
    reducedMotion,
}: StatBlockProps) {
    const { ref, display } = useCountUp<HTMLDivElement>({
        end: value,
        decimals,
        reducedMotion,
    });
    const shown = pad ? display.padStart(pad, "0") : display;

    return (
        <div ref={ref}>
            <span className="text-xs text-white/40 tracking-[0.3em] uppercase block mb-1">
                {label}
            </span>
            <span className="mono-heading text-3xl sm:text-4xl">
                {shown}
                {suffix}
            </span>
        </div>
    );
}

interface HeroProps {
    onNavigate: (item: string) => void;
    loaded: boolean;
    reducedMotion: boolean;
}

export default function Hero({ onNavigate, loaded, reducedMotion }: HeroProps) {
    const viewProjects = useMagnetic<HTMLButtonElement>(0.3);
    const downloadResume = useMagnetic<HTMLAnchorElement>(0.3);

    return (
        <section
            id="home"
            className="min-h-screen flex flex-col justify-center pt-24 md:pt-0 relative"
        >
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={loaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="barcode mb-6 text-sm">
                    {new Date().toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                    })}
                </div>

                <h1 className="mono-heading text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] xl:text-[11rem] mb-4 leading-none">
                    <ScrambleReveal text="SANKETH" start={loaded} delay={0.2} />
                    <br />
                    <span className="text-white/40">
                        <ScrambleReveal
                            text="THATIKONDA"
                            start={loaded}
                            delay={0.75}
                        />
                    </span>
                </h1>

                <p className="text-white/50 text-sm sm:text-base tracking-[0.2em] uppercase mb-8 max-w-xl">
                    Building full-stack systems, Chrome extensions, and
                    developer-first automation tools.
                </p>

                <div className="flex flex-wrap gap-6 sm:gap-10 items-start mb-10">
                    <div className="flex flex-col">
                        <span className="text-xs text-white/40 tracking-[0.4em] mb-2 uppercase">
                            Role
                        </span>
                        <span className="mono-heading text-base sm:text-lg">
                            Full Stack Developer
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs text-white/40 tracking-[0.4em] mb-2 uppercase">
                            Status
                        </span>
                        <span className="mono-heading text-base sm:text-lg text-[var(--accent-cyan)]">
                            Available for Internships
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs text-white/40 tracking-[0.4em] mb-2 uppercase">
                            Location
                        </span>
                        <span className="mono-heading text-base sm:text-lg">
                            Warangal, India
                        </span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-16 sm:mb-20">
                    <motion.button
                        ref={viewProjects.ref}
                        onClick={() => onNavigate("WORK")}
                        onMouseMove={viewProjects.onMouseMove}
                        onMouseLeave={viewProjects.onMouseLeave}
                        style={{ x: viewProjects.x, y: viewProjects.y }}
                        className="border border-white px-8 py-4 mono-heading text-sm hover:bg-white hover:text-black transition-colors cursor-pointer bg-transparent text-white"
                        data-cursor-hover
                    >
                        View Projects
                    </motion.button>
                    <motion.a
                        ref={downloadResume.ref}
                        href={resume}
                        download="Sanketh_Thatikonda_Resume.pdf"
                        onMouseMove={downloadResume.onMouseMove}
                        onMouseLeave={downloadResume.onMouseLeave}
                        style={{ x: downloadResume.x, y: downloadResume.y }}
                        className="border border-white/30 px-8 py-4 mono-heading text-sm hover:border-white hover:shadow-[0_0_30px_-8px_var(--accent-violet)] transition-all inline-flex items-center gap-3"
                        data-cursor-hover
                    >
                        Download Resume
                    </motion.a>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-12 max-w-2xl border-t border-white/10 pt-8">
                    {STATS.map((stat) => (
                        <StatBlock
                            key={stat.label}
                            {...stat}
                            reducedMotion={reducedMotion}
                        />
                    ))}
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={loaded ? { opacity: 1 } : {}}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="hidden md:flex flex-col items-center gap-3 absolute bottom-10 left-1/2 -translate-x-1/2"
            >
                <span className="barcode text-[10px]">SCROLL</span>
                <motion.div
                    animate={
                        reducedMotion ? {} : { y: [0, 10, 0] }
                    }
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    className="w-px h-10 bg-gradient-to-b from-white/60 to-transparent"
                />
            </motion.div>
        </section>
    );
}

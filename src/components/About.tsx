import { useEffect, useRef, type ReactNode } from "react";
import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { EDUCATION, EXPERIENCE } from "../data/content";
import RevealHeading from "./RevealHeading";
import { gsap, ScrollTrigger } from "../lib/gsap";

function TimelineRail({ children }: { children: ReactNode }) {
    const railRef = useRef<HTMLDivElement>(null);
    const fillRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const rail = railRef.current;
        const fill = fillRef.current;
        if (!rail || !fill) return;

        const tween = gsap.fromTo(
            fill,
            { scaleY: 0 },
            {
                scaleY: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: rail,
                    start: "top 80%",
                    end: "bottom 65%",
                    scrub: 0.6,
                },
            },
        );

        return () => {
            (tween as any)?.scrollTrigger?.kill();
            tween.kill();
        };
    }, []);

    return (
        <div ref={railRef} className="timeline-rail">
            <div ref={fillRef} className="timeline-fill" />
            {children}
        </div>
    );
}

export default function About() {
    return (
        <section id="about" className="py-24 sm:py-32 border-t border-white/10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                <div>
                    <RevealHeading className="mono-heading text-4xl sm:text-5xl mb-10 sm:mb-12">
                        Educational <br /> Journey
                    </RevealHeading>
                    <TimelineRail>
                        <div className="space-y-12 sm:space-y-16">
                            {EDUCATION.map((edu) => (
                                <motion.div
                                    key={edu.school}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    className="group"
                                >
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-1">
                                        <h3 className="mono-heading text-lg sm:text-2xl group-hover:text-white transition-colors">
                                            {edu.school}
                                        </h3>
                                        <span className="text-xs sm:text-sm text-white/40 tracking-widest shrink-0">
                                            {edu.period}
                                        </span>
                                    </div>
                                    <p className="text-base text-white/60 mb-4">
                                        {edu.degree}
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <span className="mono-heading text-2xl sm:text-3xl text-white">
                                            {edu.stats}
                                        </span>
                                        <span className="h-px bg-white/20 flex-grow" />
                                    </div>
                                    <p className="text-sm text-white/40 mt-4 leading-relaxed italic">
                                        {edu.details}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </TimelineRail>
                </div>

                <div>
                    <RevealHeading className="mono-heading text-4xl sm:text-5xl mb-10 sm:mb-12 mt-12 lg:mt-0">
                        Internship <br /> Experience
                    </RevealHeading>
                    <TimelineRail>
                        <div className="space-y-12 sm:space-y-16">
                            {EXPERIENCE.map((exp) => (
                                <motion.div
                                    key={exp.company}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    className="group"
                                >
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-1">
                                        <h3 className="mono-heading text-lg sm:text-2xl group-hover:text-white transition-colors">
                                            {exp.company}
                                        </h3>
                                        <span className="text-xs sm:text-sm text-white/40 tracking-widest shrink-0">
                                            {exp.period}
                                        </span>
                                    </div>
                                    <p className="text-sm text-white/60 mb-6 uppercase tracking-widest">
                                        {exp.role}
                                    </p>
                                    <ul className="space-y-4">
                                        {exp.details.map((detail, i) => (
                                            <li
                                                key={i}
                                                className="flex items-start gap-3 text-sm sm:text-base text-white/40 leading-relaxed"
                                            >
                                                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--accent-cyan)] mt-0.5 flex-shrink-0" />
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    </TimelineRail>
                </div>
            </div>
        </section>
    );
}

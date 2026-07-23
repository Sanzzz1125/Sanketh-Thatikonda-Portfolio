import type { KeyboardEvent, MouseEvent } from "react";
import { motion } from "motion/react";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "../data/content";
import { useTilt } from "../hooks/useTilt";

interface ProjectCardProps {
    project: Project;
    index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
    const tilt = useTilt(7);
    const Icon = project.icon;
    const primaryUrl = project.live || project.github;

    const openPrimary = () => {
        window.open(primaryUrl, "_blank", "noopener,noreferrer");
    };

    const onCardKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openPrimary();
        }
    };

    // Icon/text links inside the card navigate to their own specific target —
    // stop the click from also bubbling up to the card's own handler.
    const stop = (e: MouseEvent) => e.stopPropagation();

    return (
        <motion.div
            ref={tilt.ref}
            onMouseMove={tilt.onMouseMove}
            onMouseLeave={tilt.onMouseLeave}
            onClick={openPrimary}
            onKeyDown={onCardKeyDown}
            role="button"
            tabIndex={0}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
                delay: (index % 3) * 0.08,
                duration: 0.6,
                ease: "easeOut",
            }}
            style={{
                rotateX: tilt.rotateX,
                rotateY: tilt.rotateY,
                transformPerspective: 900,
            }}
            className="tilt-card group relative border border-white/10 p-7 sm:p-10 flex flex-col cursor-pointer"
            data-cursor-hover
            data-cursor-label="VIEW"
        >
            <div className="tilt-sheen" />

            {project.featured && (
                <span className="absolute top-4 right-4 mono-heading text-[10px] tracking-widest border border-white/20 px-2 py-1 text-white/50 z-10">
                    FEATURED
                </span>
            )}

            <div
                className="flex justify-between mb-10 relative z-10"
                style={{ transform: "translateZ(28px)" }}
            >
                <div className="text-[var(--accent-cyan)]">
                    <Icon className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-3">
                    {project.live && (
                        <a
                            href={project.live}
                            target="_blank"
                            rel="noreferrer"
                            onClick={stop}
                            className="text-white/40 hover:!text-white transition-colors"
                            title="Live Demo"
                            data-cursor-hover
                            data-cursor-label="OPEN"
                        >
                            <ExternalLink className="w-5 h-5" />
                        </a>
                    )}
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        onClick={stop}
                        className="text-white/40 hover:!text-white transition-colors"
                        title="GitHub"
                        data-cursor-hover
                        data-cursor-label="CODE"
                    >
                        <Github className="w-6 h-6" />
                    </a>
                </div>
            </div>

            <h3
                className="mono-heading text-2xl sm:text-3xl mb-3 relative z-10"
                style={{ transform: "translateZ(22px)" }}
            >
                {project.title}
            </h3>
            <p className="text-sm sm:text-base text-white/45 mb-6 leading-relaxed flex-grow relative z-10">
                {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-auto relative z-10">
                {project.tech.map((t) => (
                    <span
                        key={t}
                        className="text-xs mono-heading border border-white/15 group-hover:border-[var(--accent-violet)]/60 px-3 py-1.5 transition-colors"
                    >
                        {t}
                    </span>
                ))}
            </div>

            {project.live && (
                <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    onClick={stop}
                    className="mt-6 inline-flex items-center gap-2 mono-heading text-xs text-white/40 hover:text-[var(--accent-cyan)] transition-colors relative z-10"
                >
                    LIVE DEMO <ExternalLink className="w-3 h-3" />
                </a>
            )}
        </motion.div>
    );
}

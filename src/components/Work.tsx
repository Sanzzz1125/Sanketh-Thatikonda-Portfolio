import { PROJECTS } from "../data/content";
import ProjectCard from "./ProjectCard";
import RevealHeading from "./RevealHeading";

export default function Work() {
    return (
        <section id="work" className="py-24 sm:py-32 border-t border-white/10">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-14 sm:mb-20 gap-4">
                <RevealHeading className="mono-heading text-4xl sm:text-5xl">
                    Selected <br /> Projects
                </RevealHeading>
                <div className="barcode hidden sm:block">PROJECTS-2026</div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {PROJECTS.map((project, idx) => (
                    <ProjectCard key={project.title} project={project} index={idx} />
                ))}
            </div>
        </section>
    );
}

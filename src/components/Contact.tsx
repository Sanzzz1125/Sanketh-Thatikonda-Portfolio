import { motion } from "motion/react";
import { ExternalLink, Github, Linkedin, Phone } from "lucide-react";
import { CONTACT } from "../data/content";
import { useMagnetic } from "../hooks/useMagnetic";
import RevealHeading from "./RevealHeading";

export default function Contact() {
    const emailMag = useMagnetic<HTMLAnchorElement>(0.15);
    const phoneMag = useMagnetic<HTMLDivElement>(0.15);
    const githubMag = useMagnetic<HTMLAnchorElement>(0.25);
    const linkedinMag = useMagnetic<HTMLAnchorElement>(0.25);

    return (
        <>
            <section
                id="contact"
                className="py-24 sm:py-32 border-t border-white/10"
            >
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <RevealHeading className="mono-heading text-6xl sm:text-7xl md:text-9xl mb-6 sm:mb-8 leading-none">
                            LET'S <br /> CONNECT
                        </RevealHeading>
                        <p className="text-white/40 text-base sm:text-lg max-w-md leading-relaxed mb-10 sm:mb-12">
                            I'm actively looking for new opportunities and my
                            inbox is always open. Whether you have a question
                            or just want to say hi!
                        </p>
                        <div className="barcode text-base sm:text-lg">
                            SANKETH.THATIKONDA
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="space-y-6 sm:space-y-8"
                    >
                        <motion.a
                            ref={emailMag.ref}
                            href={`mailto:${CONTACT.email}`}
                            onMouseMove={emailMag.onMouseMove}
                            onMouseLeave={emailMag.onMouseLeave}
                            style={{ x: emailMag.x, y: emailMag.y }}
                            className="flex items-center justify-between border border-white/10 p-7 sm:p-10 hover:bg-white hover:text-black hover:border-transparent transition-colors group"
                            data-cursor-hover
                        >
                            <div className="flex flex-col">
                                <span className="text-xs text-white/40 group-hover:text-black/40 tracking-[0.4em] mb-2 uppercase">
                                    Email
                                </span>
                                <span className="mono-heading text-sm sm:text-lg break-all">
                                    {CONTACT.email}
                                </span>
                            </div>
                            <ExternalLink className="w-5 h-5 sm:w-6 sm:h-6 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-4" />
                        </motion.a>

                        <motion.div
                            ref={phoneMag.ref}
                            onMouseMove={phoneMag.onMouseMove}
                            onMouseLeave={phoneMag.onMouseLeave}
                            style={{ x: phoneMag.x, y: phoneMag.y }}
                            className="flex items-center justify-between border border-white/10 p-7 sm:p-10 hover:bg-white hover:text-black hover:border-transparent transition-colors group"
                        >
                            <div className="flex flex-col">
                                <span className="text-xs text-white/40 group-hover:text-black/40 tracking-[0.4em] mb-2 uppercase">
                                    Phone
                                </span>
                                <span className="mono-heading text-sm sm:text-lg">
                                    {CONTACT.phone}
                                </span>
                            </div>
                            <Phone className="w-5 h-5 sm:w-6 sm:h-6 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-4" />
                        </motion.div>

                        <div className="grid grid-cols-2 gap-4 sm:gap-8">
                            <motion.a
                                ref={githubMag.ref}
                                href={CONTACT.github}
                                target="_blank"
                                rel="noreferrer"
                                onMouseMove={githubMag.onMouseMove}
                                onMouseLeave={githubMag.onMouseLeave}
                                style={{ x: githubMag.x, y: githubMag.y }}
                                className="flex items-center justify-center border border-white/10 p-8 sm:p-10 hover:bg-white hover:text-black hover:border-transparent transition-colors"
                                data-cursor-hover
                            >
                                <Github className="w-7 h-7 sm:w-8 sm:h-8" />
                            </motion.a>
                            <motion.a
                                ref={linkedinMag.ref}
                                href={CONTACT.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                onMouseMove={linkedinMag.onMouseMove}
                                onMouseLeave={linkedinMag.onMouseLeave}
                                style={{ x: linkedinMag.x, y: linkedinMag.y }}
                                className="flex items-center justify-center border border-white/10 p-8 sm:p-10 hover:bg-white hover:text-black hover:border-transparent transition-colors"
                                data-cursor-hover
                            >
                                <Linkedin className="w-7 h-7 sm:w-8 sm:h-8" />
                            </motion.a>
                        </div>
                    </motion.div>
                </div>
            </section>

            <footer className="py-10 sm:py-12 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-8">
                <div className="mono-heading text-xs text-white/40 tracking-[0.3em]">
                    &copy; 2026 SANKETH THATIKONDA
                </div>
                <div className="marquee-wrap w-64 sm:w-80">
                    <div className="marquee-track barcode">
                        <span className="pr-8">
                            BUILD • BREAK • LEARN • REPEAT •
                        </span>
                        <span className="pr-8" aria-hidden="true">
                            BUILD • BREAK • LEARN • REPEAT •
                        </span>
                    </div>
                </div>
                <div className="mono-heading text-xs text-white/40 tracking-[0.3em]">
                    CRAFTED WITH CODE & CURIOSITY
                </div>
            </footer>
        </>
    );
}

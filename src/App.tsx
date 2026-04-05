/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "framer-motion";
import {
    Github,
    Linkedin,
    Mail,
    Download,
    ExternalLink,
    Code,
    GraduationCap,
    Briefcase,
    Award,
    ChevronRight,
    Phone,
    Globe,
    Terminal,
    Cpu,
    Database,
    Layers,
} from "lucide-react";
import { useState, useEffect } from "react";
import profile from "./assets/profile_pic.jpeg";
import resume from "./assets/Sanketh_Thatikonda_Resume.pdf";

const PROJECTS = [
    {
        title: "Digital Library Management",
        description:
            "Desktop-based system using Java Swing for browsing, borrowing, and returning books with admin management.",
        tech: ["Java", "Swing", "MySQL"],
        github: "https://github.com/Sanzzz1125/Digital-Library-Management-System",
        icon: <Layers className="w-5 h-5" />,
    },
    {
        title: "Lost And Found Portal",
        description:
            "Community platform for reuniting owners with lost belongings using a full-stack MERN architecture.",
        tech: ["React", "Node.js", "Express", "MongoDB"],
        github: "https://github.com/Sanzzz1125/Lost_And_Found",
        icon: <Cpu className="w-5 h-5" />,
    },
    {
        title: "Job Tracker Pro",
        description:
            "Full Stack system with CRUD functionality, dashboard analytics, and MVC architecture.",
        tech: ["Java Servlets", "MySQL", "JDBC"],
        github: "https://github.com/Sanzzz1125/JobTrackerPro",
        icon: <Briefcase className="w-5 h-5" />,
    },
    {
        title: "Rural Career Guide",
        description:
            "Social impact platform providing stream information and entrance exam details for rural students.",
        tech: ["HTML/CSS", "GitHub Pages"],
        github: "https://github.com/Sanzzz1125/Career-Options",
        icon: <GraduationCap className="w-5 h-5" />,
    },
    {
        title: "Shoe Mart Billing",
        description:
            "C-based inventory and billing system using custom data structures for optimized storage.",
        tech: ["C Language", "DSA"],
        github: "https://github.com/Sanzzz1125/Shoe-mart-billing-system",
        icon: <Globe className="w-5 h-5" />,
    },
    {
        title: "Tic-Tac-Toe",
        description:
            "Classic game developed to master JavaScript fundamentals and interactive DOM manipulation.",
        tech: ["JavaScript", "HTML", "CSS"],
        github: "https://github.com/Sanzzz1125/Tic-Tac-Toe",
        icon: <Terminal className="w-5 h-5" />,
    },
];

const SKILLS = {
    languages: ["C", "C++", "Java", "Python"],
    web: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "React",
        "AngularJS",
        "jQuery",
        "Ajax",
    ],
    tools: ["SpringBoot", "MySQL", "MongoDB", "Oracle", "GitHub", "Hibernate"],
};

const EDUCATION = [
    {
        school: "SR University, Warangal",
        degree: "B.Tech in Computer Science & Engineering",
        period: "2023 — 2027",
        stats: "9.66 CGPA",
        details:
            "Core: Data Structures, Operating Systems, DBMS, Design & Analysis of Algorithms.",
    },
    {
        school: "Sri Chaitanya Junior College",
        degree: "Intermediate Education (TSBIE)",
        period: "2021 — 2023",
        stats: "9.45 CGPA",
        details: "Focused on Mathematics, Physics, and Chemistry.",
    },
];

const EXPERIENCE = [
    {
        company: "EduSkills Academy",
        role: "Java Full Stack Intern",
        period: "Dec 2025 — Mar 2026",
        details: [
            "Java Full Stack development focus (Spring Boot & Hibernate).",
            "Building scalable backend systems and responsive UI.",
        ],
    },
];

export default function App() {
    const [activeTab, setActiveTab] = useState("HOME");
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const navItems = ["HOME", "ABOUT", "SKILLS", "WORK", "CONTACT"];

    return (
        <div className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-x-hidden custom-scrollbar">
            <div className="mesh-bg" />

            {/* Sidebar Navigation (Himfolio Style) */}
            <nav className="fixed left-0 top-0 h-full w-24 hidden md:flex flex-col items-center justify-between py-12 border-r border-white/10 z-50 bg-black">
                <div className="mono-heading text-2xl font-bold tracking-tighter">
                    ST.
                </div>
                <div
                    className="flex flex-col gap-12 items-center"
                    style={{ writingMode: "vertical-rl" }}
                >
                    {navItems.map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            onClick={() => setActiveTab(item)}
                            className={`mono-heading text-sm tracking-[0.4em] transition-all hover:text-white rotate-180 ${activeTab === item ? "text-white" : "text-white/30"}`}
                        >
                            {item}
                        </a>
                    ))}
                </div>
                <div className="barcode-vertical">SANKETH</div>
            </nav>

            {/* Mobile Navigation */}
            <nav className="fixed top-0 left-0 w-full md:hidden flex justify-between items-center px-6 py-6 border-b border-white/10 z-50 bg-black/80 backdrop-blur-md">
                <div className="mono-heading text-xl font-bold">ST.</div>
                <div className="flex gap-4">
                    <a
                        href="https://github.com/Sanzzz1125"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Github className="w-6 h-6" />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/sanketh-thatikonda-428197286/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Linkedin className="w-6 h-6" />
                    </a>
                </div>
            </nav>

            <main className="md:ml-24 px-6 md:px-12 lg:px-24">
                {/* Hero Section */}
                <section
                    id="home"
                    className="min-h-screen flex flex-col justify-center pt-32 md:pt-0"
                >
                    <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <div className="barcode mb-8 text-base">
                                {new Date().toLocaleDateString("en-US", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                })}
                            </div>
                            <h1 className="mono-heading text-6xl md:text-8xl lg:text-[11rem] mb-8 leading-none">
                                SANKETH <br />
                                <span className="text-white/40">
                                    THATIKONDA
                                </span>
                            </h1>
                            <div className="flex flex-wrap gap-10 items-center mb-12">
                                <div className="flex flex-col">
                                    <span className="text-sm text-white/40 tracking-[0.4em] mb-2 uppercase">
                                        Role
                                    </span>
                                    <span className="mono-heading text-lg">
                                        Full Stack Developer
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm text-white/40 tracking-[0.4em] mb-2 uppercase">
                                        Status
                                    </span>
                                    <span className="mono-heading text-lg">
                                        Available for Internships
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm text-white/40 tracking-[0.4em] mb-2 uppercase">
                                        Location
                                    </span>
                                    <span className="mono-heading text-lg">
                                        Warangal, India
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-8">
                                <a
                                    href="#work"
                                    className="border border-white px-10 py-5 mono-heading text-sm hover:bg-white hover:text-black transition-all"
                                >
                                    View Projects
                                </a>
                                <div className="flex gap-6">
                                    {/* View */}
                                    <a
                                        href={resume}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="border border-white/20 px-10 py-5 mono-heading text-sm"
                                    >
                                        View Resume
                                    </a>

                                    {/* Download */}
                                    <a
                                        href={resume}
                                        download="Sanketh_Thatikonda_Resume.pdf"
                                        className="border border-white px-10 py-5 mono-heading text-sm"
                                    >
                                        Download Resume
                                    </a>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="relative hidden lg:block"
                        >
                            <div className="w-80 h-[28rem] border border-white/10 p-4 grayscale hover:grayscale-0 transition-all duration-700">
                            </div>
                            <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-white/20 -z-10" />
                            <div className="absolute -top-6 -left-6 w-32 h-32 border border-white/20 -z-10" />
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isLoaded ? { opacity: 1 } : {}}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-12"
                    >
                        <div className="flex flex-col">
                            <span className="text-sm text-white/40 tracking-[0.4em] mb-2 uppercase">
                                CGPA
                            </span>
                            <span className="mono-heading text-5xl">9.66</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm text-white/40 tracking-[0.4em] mb-2 uppercase">
                                LeetCode
                            </span>
                            <span className="mono-heading text-5xl">300+</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm text-white/40 tracking-[0.4em] mb-2 uppercase">
                                Projects
                            </span>
                            <span className="mono-heading text-5xl">06+</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm text-white/40 tracking-[0.4em] mb-2 uppercase">
                                Experience
                            </span>
                            <span className="mono-heading text-5xl">01</span>
                        </div>
                    </motion.div>
                </section>

                {/* About Section */}
                <section id="about" className="py-32 border-t border-white/10">
                    <div className="grid lg:grid-cols-2 gap-16">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="mono-heading text-5xl mb-12">
                                Educational <br /> Journey
                            </h2>
                            <div className="space-y-16">
                                {EDUCATION.map((edu) => (
                                    <div key={edu.school} className="group">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="mono-heading text-2xl group-hover:text-white transition-colors">
                                                {edu.school}
                                            </h3>
                                            <span className="text-sm text-white/40 tracking-widest">
                                                {edu.period}
                                            </span>
                                        </div>
                                        <p className="text-lg text-white/60 mb-4">
                                            {edu.degree}
                                        </p>
                                        <div className="flex items-center gap-4">
                                            <span className="mono-heading text-3xl text-white">
                                                {edu.stats}
                                            </span>
                                            <span className="h-px bg-white/20 flex-grow" />
                                        </div>
                                        <p className="text-base text-white/40 mt-4 leading-relaxed italic">
                                            {edu.details}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="mono-heading text-5xl mb-12">
                                Internship <br /> Experience
                            </h2>
                            <div className="space-y-16">
                                {EXPERIENCE.map((exp) => (
                                    <div key={exp.company} className="group">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="mono-heading text-2xl group-hover:text-white transition-colors">
                                                {exp.company}
                                            </h3>
                                            <span className="text-sm text-white/40 tracking-widest">
                                                {exp.period}
                                            </span>
                                        </div>
                                        <p className="text-lg text-white/60 mb-6 uppercase tracking-widest">
                                            {exp.role}
                                        </p>
                                        <ul className="space-y-4">
                                            {exp.details.map((detail, i) => (
                                                <li
                                                    key={i}
                                                    className="flex items-start gap-3 text-base text-white/40 leading-relaxed"
                                                >
                                                    <ChevronRight className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                                                    {detail}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Skills Section */}
                <section id="skills" className="py-32 border-t border-white/10">
                    <h2 className="mono-heading text-5xl mb-20">
                        Technical <br /> Arsenal
                    </h2>
                    <div className="grid md:grid-cols-3 gap-16">
                        {Object.entries(SKILLS).map(
                            ([category, items], idx) => (
                                <motion.div
                                    key={category}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="space-y-8"
                                >
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm text-white/40 tracking-[0.4em] uppercase">
                                            {category}
                                        </span>
                                        <div className="h-px bg-white/10 flex-grow" />
                                    </div>
                                    <div className="flex flex-wrap gap-4">
                                        {items.map((item) => (
                                            <span
                                                key={item}
                                                className="mono-heading text-sm border border-white/10 px-5 py-3 hover:border-white transition-all cursor-default"
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            ),
                        )}
                    </div>
                </section>

                {/* Work Section */}
                <section id="work" className="py-32 border-t border-white/10">
                    <div className="flex justify-between items-end mb-20">
                        <h2 className="mono-heading text-5xl">
                            Selected <br /> Projects
                        </h2>
                        <div className="barcode hidden md:block">
                            PROJECTS-2026
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1">
                        {PROJECTS.map((project, idx) => (
                            <motion.div
                                key={project.title}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group relative border border-white/10 p-10 hover:bg-white hover:text-black transition-all duration-500"
                            >
                                <div className="flex justify-between mb-12">
                                    <div className="text-white group-hover:text-black transition-colors">
                                        {project.icon}
                                    </div>
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-white/40 group-hover:text-black/40 hover:!text-black transition-colors"
                                    >
                                        <Github className="w-7 h-7" />
                                    </a>
                                </div>
                                <h3 className="mono-heading text-3xl mb-4">
                                    {project.title}
                                </h3>
                                <p className="text-base text-white/40 group-hover:text-black/60 mb-8 leading-relaxed">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((t) => (
                                        <span
                                            key={t}
                                            className="text-xs mono-heading border border-white/20 group-hover:border-black/20 px-3 py-1.5"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Contact Section */}
                <section
                    id="contact"
                    className="py-32 border-t border-white/10"
                >
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="mono-heading text-7xl md:text-9xl mb-8 leading-none">
                                LET'S <br /> CONNECT
                            </h2>
                            <p className="text-white/40 text-lg max-w-md leading-relaxed mb-12">
                                I'm currently looking for new opportunities and
                                my inbox is always open. Whether you have a
                                question or just want to say hi!
                            </p>
                            <div className="barcode text-lg">
                                SANKETH.THATIKONDA
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <a
                                href="mailto:sanketh.thatikonda@gmail.com"
                                className="flex items-center justify-between border border-white/10 p-10 hover:bg-white hover:text-black transition-all group"
                            >
                                <div className="flex flex-col">
                                    <span className="text-sm text-white/40 group-hover:text-black/40 tracking-[0.4em] mb-2 uppercase">
                                        Email
                                    </span>
                                    <span className="mono-heading text-lg">
                                        sanketh.thatikonda@gmail.com
                                    </span>
                                </div>
                                <ExternalLink className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                            <div className="flex items-center justify-between border border-white/10 p-10 hover:bg-white hover:text-black transition-all group">
                                <div className="flex flex-col">
                                    <span className="text-sm text-white/40 group-hover:text-black/40 tracking-[0.4em] mb-2 uppercase">
                                        Phone
                                    </span>
                                    <span className="mono-heading text-lg">
                                        +91 9573530101
                                    </span>
                                </div>
                                <Phone className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div className="grid grid-cols-2 gap-8">
                                <a
                                    href="https://github.com/Sanzzz1125"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center justify-center border border-white/10 p-10 hover:bg-white hover:text-black transition-all group"
                                >
                                    <Github className="w-8 h-8" />
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/sanketh-thatikonda-428197286/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center justify-center border border-white/10 p-10 hover:bg-white hover:text-black transition-all group"
                                >
                                    <Linkedin className="w-8 h-8" />
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </section>

                <footer className="py-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="mono-heading text-xs text-white/40 tracking-[0.3em]">
                        &copy; 2026 SANKETH THATIKONDA
                    </div>
                    <div className="barcode">MADE-WITH-LOVE</div>
                    <div className="mono-heading text-xs text-white/40 tracking-[0.3em]">
                        DESIGNED FOR THE FUTURE
                    </div>
                </footer>
            </main>
        </div>
    );
}

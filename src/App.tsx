import { motion } from "motion/react";
import {
    Github,
    Linkedin,
    ExternalLink,
    Code,
    GraduationCap,
    Briefcase,
    ChevronRight,
    Phone,
    Globe,
    Cpu,
    Layers,
    Menu,
    X,
} from "lucide-react";
import { useState, useEffect } from "react";
import resume from "./assets/resume.pdf";

const PROJECTS = [
    {
        title: "SyncLeetX",
        description:
            "Real-time Chrome extension syncing accepted LeetCode & GeeksForGeeks solutions via GraphQL + GitHub REST API. Auto-generates READMEs, tracks recent solves, and organizes repos by difficulty.",
        tech: [
            "JavaScript",
            "Chrome Extension",
            "Manifest V3",
            "GitHub REST API",
            "LeetCode GraphQL",
            "Chrome Storage API",
        ],
        github: "https://github.com/Sanzzz1125/SyncLeetX",
        featured: true,
        icon: <Code className="w-5 h-5" />,
    },
    {
        title: "Lost And Found Portal",
        description:
            "MERN stack platform live on Render — enabling real-time lost item reporting with user auth and full CRUD operations.",
        tech: ["React", "Node.js", "Express", "MongoDB"],
        github: "https://github.com/Sanzzz1125/Lost_And_Found",
        live: "https://lost-and-found-1-eum5.onrender.com/",
        icon: <Cpu className="w-5 h-5" />,
    },
    {
        title: "Campus Reporting System",
        description:
            "Role-based complaint system with 4 dashboards (student/faculty/worker/admin), JWT auth, MongoDB Atlas, deployed live on Render.",
        tech: ["React", "Node.js", "Express", "MongoDB"],
        github: "https://github.com/Sanzzz1125/Campus-Reporting-System",
        live: "https://campus-frontend-7ue1.onrender.com/",
        icon: <GraduationCap className="w-5 h-5" />,
    },
    {
        title: "Job Tracker Pro",
        description:
            "Full stack job application tracker with CRUD dashboard, analytics, and clean MVC architecture using Java Servlets.",
        tech: ["Java Servlets", "MySQL", "JDBC"],
        github: "https://github.com/Sanzzz1125/JobTrackerPro",
        icon: <Briefcase className="w-5 h-5" />,
    },
    {
        title: "Digital Library Management",
        description:
            "Desktop-based system using Java Swing for browsing, borrowing, and returning books with full admin management panel.",
        tech: ["Java", "Swing", "MySQL"],
        github: "https://github.com/Sanzzz1125/Digital-Library-Management-System",
        icon: <Layers className="w-5 h-5" />,
    },
    {
        title: "Rural Career Guide",
        description:
            "Social impact platform providing stream information and entrance exam guidance for rural students. Deployed on GitHub Pages.",
        tech: ["HTML/CSS", "GitHub Pages"],
        github: "https://github.com/Sanzzz1125/Career-Options",
        live: "https://sanzzz1125.github.io/Career-Options/",
        icon: <GraduationCap className="w-5 h-5" />,
    },
    {
        title: "Shoe Mart Billing",
        description:
            "C-based inventory and billing system using custom data structures for optimized storage and fast lookup operations.",
        tech: ["C Language", "DSA"],
        github: "https://github.com/Sanzzz1125/Shoe-mart-billing-system",
        icon: <Globe className="w-5 h-5" />,
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
        stats: "9.68 CGPA",
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
            "Full Stack development with Spring Boot & Hibernate on enterprise-grade backend systems.",
            "Built scalable REST APIs and responsive UI components across 3-month engagement.",
        ],
    },
];

export default function App() {
    const [activeTab, setActiveTab] = useState("HOME");
    const [isLoaded, setIsLoaded] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        const sections = ["home", "about", "skills", "work", "contact"];
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveTab(entry.target.id.toUpperCase());
                    }
                });
            },
            { threshold: 0.3 },
        );
        sections.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    const navItems = ["HOME", "ABOUT", "SKILLS", "WORK", "CONTACT"];

    const handleNavClick = (item: string) => {
        setActiveTab(item);
        setMobileMenuOpen(false);
        const el = document.getElementById(item.toLowerCase());
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-x-hidden custom-scrollbar">
            <div className="mesh-bg" />

            <nav className="fixed left-0 top-0 h-full w-24 hidden md:flex flex-col items-center justify-between py-12 border-r border-white/10 z-50 bg-black">
                <div className="mono-heading text-2xl font-bold tracking-tighter">
                    ST.
                </div>
                <div
                    className="flex flex-col gap-10 items-center"
                    style={{ writingMode: "vertical-rl" }}
                >
                    {navItems.map((item) => (
                        <button
                            key={item}
                            onClick={() => handleNavClick(item)}
                            className={`mono-heading text-sm tracking-[0.4em] transition-all hover:text-white rotate-180 cursor-pointer bg-transparent border-none ${
                                activeTab === item
                                    ? "text-white"
                                    : "text-white/30"
                            }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>
                <div className="barcode-vertical">SANKETH</div>
            </nav>

            <nav className="fixed top-0 left-0 w-full md:hidden flex justify-between items-center px-5 py-4 border-b border-white/10 z-50 bg-black/90 backdrop-blur-md">
                <div className="mono-heading text-xl font-bold">ST.</div>
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="text-white p-1 bg-transparent border-none cursor-pointer"
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? (
                        <X className="w-6 h-6" />
                    ) : (
                        <Menu className="w-6 h-6" />
                    )}
                </button>
            </nav>

            {mobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="fixed top-[57px] left-0 w-full bg-black border-b border-white/10 z-40 md:hidden"
                >
                    <div className="flex flex-col py-4">
                        {navItems.map((item) => (
                            <button
                                key={item}
                                onClick={() => handleNavClick(item)}
                                className={`mono-heading text-sm tracking-[0.4em] px-6 py-4 text-left transition-all border-none bg-transparent cursor-pointer hover:bg-white/5 ${
                                    activeTab === item
                                        ? "text-white"
                                        : "text-white/40"
                                }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </motion.div>
            )}

            <main className="md:ml-24 px-5 sm:px-8 md:px-12 lg:px-24">
                <section
                    id="home"
                    className="min-h-screen flex flex-col justify-center pt-24 md:pt-0"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isLoaded ? { opacity: 1, y: 0 } : {}}
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
                            SANKETH <br />
                            <span className="text-white/40">THATIKONDA</span>
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
                                <span className="mono-heading text-base sm:text-lg">
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

                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => handleNavClick("WORK")}
                                className="border border-white px-8 py-4 mono-heading text-sm hover:bg-white hover:text-black transition-all cursor-pointer bg-transparent text-white"
                            >
                                View Projects
                            </button>
                            <a
                                href={resume}
                                download="Sanketh_Thatikonda_Resume.pdf"
                                className="border border-white/30 px-8 py-4 mono-heading text-sm hover:border-white transition-all inline-flex items-center gap-3"
                            >
                                Download Resume
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isLoaded ? { opacity: 1 } : {}}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="mt-16 sm:mt-24 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 border-t border-white/10 pt-10 sm:pt-12"
                    >
                        {[
                            { label: "CGPA", value: "9.68" },
                            { label: "LeetCode", value: "300+" },
                            { label: "Projects", value: "07+" },
                            { label: "Experience", value: "01" },
                        ].map((stat) => (
                            <div key={stat.label} className="flex flex-col">
                                <span className="text-xs text-white/40 tracking-[0.4em] mb-2 uppercase">
                                    {stat.label}
                                </span>
                                <span className="mono-heading text-4xl sm:text-5xl">
                                    {stat.value}
                                </span>
                            </div>
                        ))}
                    </motion.div>
                </section>

                <section
                    id="about"
                    className="py-24 sm:py-32 border-t border-white/10"
                >
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="mono-heading text-4xl sm:text-5xl mb-10 sm:mb-12">
                                Educational <br /> Journey
                            </h2>
                            <div className="space-y-12 sm:space-y-16">
                                {EDUCATION.map((edu) => (
                                    <div key={edu.school} className="group">
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
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="mono-heading text-4xl sm:text-5xl mb-10 sm:mb-12 mt-12 lg:mt-0">
                                Internship <br /> Experience
                            </h2>
                            <div className="space-y-12 sm:space-y-16">
                                {EXPERIENCE.map((exp) => (
                                    <div key={exp.company} className="group">
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
                                                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white mt-0.5 flex-shrink-0" />
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

                <section
                    id="skills"
                    className="py-24 sm:py-32 border-t border-white/10"
                >
                    <h2 className="mono-heading text-4xl sm:text-5xl mb-16 sm:mb-20">
                        Technical <br /> Arsenal
                    </h2>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 sm:gap-16">
                        {Object.entries(SKILLS).map(
                            ([category, items], idx) => (
                                <motion.div
                                    key={category}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="space-y-6 sm:space-y-8"
                                >
                                    <div className="flex items-center gap-4">
                                        <span className="text-xs text-white/40 tracking-[0.4em] uppercase">
                                            {category}
                                        </span>
                                        <div className="h-px bg-white/10 flex-grow" />
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {items.map((item) => (
                                            <span
                                                key={item}
                                                className="mono-heading text-xs sm:text-sm border border-white/10 px-4 py-2.5 hover:border-white transition-all cursor-default"
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

                <section
                    id="work"
                    className="py-24 sm:py-32 border-t border-white/10"
                >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-14 sm:mb-20 gap-4">
                        <h2 className="mono-heading text-4xl sm:text-5xl">
                            Selected <br /> Projects
                        </h2>
                        <div className="barcode hidden sm:block">
                            PROJECTS-2026
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {PROJECTS.map((project, idx) => (
                            <motion.div
                                key={project.title}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.07 }}
                                className="group relative border border-white/10 p-7 sm:p-10 hover:bg-white hover:text-black transition-all duration-500 flex flex-col"
                            >
                                {project.featured && (
                                    <span className="absolute top-4 right-4 mono-heading text-[10px] tracking-widest border border-white/30 group-hover:border-black/30 px-2 py-1 text-white/60 group-hover:text-black/60">
                                        FEATURED
                                    </span>
                                )}

                                <div className="flex justify-between mb-10">
                                    <div className="text-white group-hover:text-black transition-colors">
                                        {project.icon}
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {project.live && (
                                            <a
                                                href={project.live}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-white/40 group-hover:text-black/40 hover:!text-black transition-colors"
                                                title="Live Demo"
                                            >
                                                <ExternalLink className="w-5 h-5" />
                                            </a>
                                        )}
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-white/40 group-hover:text-black/40 hover:!text-black transition-colors"
                                            title="GitHub"
                                        >
                                            <Github className="w-6 h-6" />
                                        </a>
                                    </div>
                                </div>

                                <h3 className="mono-heading text-2xl sm:text-3xl mb-3">
                                    {project.title}
                                </h3>
                                <p className="text-sm sm:text-base text-white/40 group-hover:text-black/60 mb-6 leading-relaxed flex-grow">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.tech.map((t) => (
                                        <span
                                            key={t}
                                            className="text-xs mono-heading border border-white/20 group-hover:border-black/20 px-3 py-1.5"
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
                                        className="mt-6 inline-flex items-center gap-2 mono-heading text-xs text-white/30 group-hover:text-black/50 hover:!text-black transition-colors"
                                    >
                                        LIVE DEMO{" "}
                                        <ExternalLink className="w-3 h-3" />
                                    </a>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </section>

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
                            <h2 className="mono-heading text-6xl sm:text-7xl md:text-9xl mb-6 sm:mb-8 leading-none">
                                LET'S <br /> CONNECT
                            </h2>
                            <p className="text-white/40 text-base sm:text-lg max-w-md leading-relaxed mb-10 sm:mb-12">
                                I'm actively looking for new opportunities and
                                my inbox is always open. Whether you have a
                                question or just want to say hi!
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
                            <a
                                href="mailto:sanketh.thatikonda@gmail.com"
                                className="flex items-center justify-between border border-white/10 p-7 sm:p-10 hover:bg-white hover:text-black transition-all group"
                            >
                                <div className="flex flex-col">
                                    <span className="text-xs text-white/40 group-hover:text-black/40 tracking-[0.4em] mb-2 uppercase">
                                        Email
                                    </span>
                                    <span className="mono-heading text-sm sm:text-lg break-all">
                                        sanketh.thatikonda@gmail.com
                                    </span>
                                </div>
                                <ExternalLink className="w-5 h-5 sm:w-6 sm:h-6 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-4" />
                            </a>

                            <div className="flex items-center justify-between border border-white/10 p-7 sm:p-10 hover:bg-white hover:text-black transition-all group">
                                <div className="flex flex-col">
                                    <span className="text-xs text-white/40 group-hover:text-black/40 tracking-[0.4em] mb-2 uppercase">
                                        Phone
                                    </span>
                                    <span className="mono-heading text-sm sm:text-lg">
                                        +91 9573530101
                                    </span>
                                </div>
                                <Phone className="w-5 h-5 sm:w-6 sm:h-6 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-4" />
                            </div>

                            <div className="grid grid-cols-2 gap-4 sm:gap-8">
                                <a
                                    href="https://github.com/Sanzzz1125"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center justify-center border border-white/10 p-8 sm:p-10 hover:bg-white hover:text-black transition-all group"
                                >
                                    <Github className="w-7 h-7 sm:w-8 sm:h-8" />
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/sanketh-thatikonda-428197286/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center justify-center border border-white/10 p-8 sm:p-10 hover:bg-white hover:text-black transition-all group"
                                >
                                    <Linkedin className="w-7 h-7 sm:w-8 sm:h-8" />
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </section>

                <footer className="py-10 sm:py-12 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-8">
                    <div className="mono-heading text-xs text-white/40 tracking-[0.3em]">
                        &copy; 2026 SANKETH THATIKONDA
                    </div>
                    <div className="barcode">
                        BUILD • BREAK • LEARN • REPEAT
                    </div>
                    <div className="mono-heading text-xs text-white/40 tracking-[0.3em]">
                        CRAFTED WITH CODE & CURIOSITY
                    </div>
                </footer>
            </main>
        </div>
    );
}

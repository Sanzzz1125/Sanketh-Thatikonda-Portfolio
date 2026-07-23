import type { LucideIcon } from "lucide-react";
import {
    BookOpen,
    Code,
    Cpu,
    GraduationCap,
    Briefcase,
    Layers,
    Globe,
} from "lucide-react";

export interface Project {
    title: string;
    description: string;
    tech: string[];
    github: string;
    live?: string;
    featured?: boolean;
    icon: LucideIcon;
}

export const PROJECTS: Project[] = [
    {
        title: "FullStack Compass",
        description:
            "A comprehensive MERN stack learning platform covering HTML to deployment. Features deep-dive content, interactive practice games, curated resources, full app clone blueprints, a custom scrollbar TOC, and dark/light mode.",
        tech: [
            "React",
            "Vite",
            "Node.js",
            "Express",
            "MongoDB",
            "React Router",
        ],
        github: "https://github.com/Sanzzz1125/fullStackCompass",
        live: "https://www.fullstackcompass.in",
        featured: true,
        icon: BookOpen,
    },
    {
        title: "SyncLeetX",
        description:
            "Chrome extension that auto-syncs accepted LeetCode & GeeksForGeeks solutions to GitHub with live analytics, streak tracking, badges, heatmaps, and difficulty-wise repository organization.",
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
        icon: Code,
    },
    {
        title: "Lost And Found Portal",
        description:
            "MERN stack platform live on Render — enabling real-time lost item reporting with user auth and full CRUD operations.",
        tech: ["React", "Node.js", "Express", "MongoDB"],
        github: "https://github.com/Sanzzz1125/Lost_And_Found",
        live: "https://lost-and-found-1-eum5.onrender.com/",
        icon: Cpu,
    },
    {
        title: "Campus Reporting System",
        description:
            "Role-based complaint system with 4 dashboards (student/faculty/worker/admin), JWT auth, MongoDB Atlas, deployed live on Render.",
        tech: ["React", "Node.js", "Express", "MongoDB"],
        github: "https://github.com/Sanzzz1125/Campus-Reporting-System",
        live: "https://campus-frontend-7ue1.onrender.com/",
        icon: GraduationCap,
    },
    {
        title: "Job Tracker Pro",
        description:
            "Full stack job application tracker with CRUD dashboard, analytics, and clean MVC architecture using Java Servlets.",
        tech: ["Java Servlets", "MySQL", "JDBC"],
        github: "https://github.com/Sanzzz1125/JobTrackerPro",
        icon: Briefcase,
    },
    {
        title: "Digital Library Management",
        description:
            "Desktop-based system using Java Swing for browsing, borrowing, and returning books with full admin management panel.",
        tech: ["Java", "Swing", "MySQL"],
        github: "https://github.com/Sanzzz1125/Digital-Library-Management-System",
        icon: Layers,
    },
    {
        title: "Rural Career Guide",
        description:
            "Social impact platform providing stream information and entrance exam guidance for rural students. Deployed on GitHub Pages.",
        tech: ["HTML/CSS", "GitHub Pages"],
        github: "https://github.com/Sanzzz1125/Career-Options",
        live: "https://sanzzz1125.github.io/Career-Options/",
        icon: GraduationCap,
    },
    {
        title: "Shoe Mart Billing",
        description:
            "C-based inventory and billing system using custom data structures for optimized storage and fast lookup operations.",
        tech: ["C Language", "DSA"],
        github: "https://github.com/Sanzzz1125/Shoe-mart-billing-system",
        icon: Globe,
    },
];

export const SKILLS = {
    languages: ["C", "C++", "Java", "Python"],
    web: ["HTML5", "CSS3", "JavaScript", "React", "AngularJS", "jQuery", "Ajax"],
    tools: ["SpringBoot", "MySQL", "MongoDB", "Oracle", "GitHub", "Hibernate"],
};

// Category color keys used by the 3D skills orb + legend.
export const SKILL_CATEGORY_COLOR: Record<keyof typeof SKILLS, string> = {
    languages: "var(--accent-cyan)",
    web: "var(--accent-violet)",
    tools: "var(--accent-magenta)",
};

export const EDUCATION = [
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

export const EXPERIENCE = [
    {
        company: "Alassa Technology Solutions",
        role: "AI Intern",
        period: "Jun 2026 — Jul 2026",
        details: [
            "Engineered core feature updates and resolved critical bugs for an AI-driven viva and mock interview platform.",
            "Optimized authentication, scheduling workflows, and voice-agent functionality across Next.js, NestJS, FastAPI, and Redis.",
        ],
    },
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

export interface StatItem {
    label: string;
    value: number;
    decimals?: number;
    suffix?: string;
    pad?: number;
}

export const STATS: StatItem[] = [
    { label: "CGPA", value: 9.68, decimals: 2 },
    { label: "LeetCode", value: 400, suffix: "+" },
    { label: "Projects", value: 7, suffix: "+", pad: 2 },
    { label: "Experience", value: 2, pad: 2 },
];

export const NAV_ITEMS = ["HOME", "ABOUT", "SKILLS", "WORK", "CONTACT"] as const;

export const CONTACT = {
    email: "sanketh.thatikonda@gmail.com",
    phone: "+91 9573530101",
    github: "https://github.com/Sanzzz1125",
    linkedin: "https://www.linkedin.com/in/sanketh-thatikonda-428197286/",
};

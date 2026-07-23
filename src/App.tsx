import { useEffect, useState } from "react";
import Scene from "./components/canvas/Scene";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import Preloader from "./components/Preloader";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import SkillsSection from "./components/SkillsSection";
import Work from "./components/Work";
import Contact from "./components/Contact";
import {
    useIsCoarsePointer,
    useIsMobile,
    usePrefersReducedMotion,
} from "./hooks/useMediaQuery";
import { useSmoothScroll, scrollToSection } from "./hooks/useSmoothScroll";

export default function App() {
    const [activeTab, setActiveTab] = useState<string>("HOME");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [showPreloader, setShowPreloader] = useState(false);

    const reducedMotion = usePrefersReducedMotion();
    const mobile = useIsMobile();
    const coarsePointer = useIsCoarsePointer();

    useSmoothScroll(!reducedMotion);

    // Always plays on mount — previously skipped entirely under
    // prefers-reduced-motion, which is almost certainly why it looked like
    // it was missing (that OS setting is commonly on without realizing it).
    // Preloader itself now shortens to a near-instant version for
    // reduced-motion instead of being skipped outright.
    useEffect(() => {
        setShowPreloader(true);
    }, []);

    const handlePreloaderComplete = () => {
        setLoaded(true);
        setShowPreloader(false);
    };

    useEffect(() => {
        const ids = ["home", "about", "skills", "work", "contact"];
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
        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    const handleNavigate = (item: string) => {
        setActiveTab(item);
        setMobileMenuOpen(false);
        scrollToSection(item.toLowerCase());
    };

    return (
        <div className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-x-hidden custom-scrollbar">
            <Scene mobile={mobile} reducedMotion={reducedMotion} />
            <div className="vignette-overlay" aria-hidden="true" />

            {!coarsePointer && !reducedMotion && <CustomCursor />}

            <ScrollProgress />

            <Nav
                activeTab={activeTab}
                onNavigate={handleNavigate}
                mobileMenuOpen={mobileMenuOpen}
                onToggleMobileMenu={() => setMobileMenuOpen((o) => !o)}
            />

            <main className="relative z-10 md:ml-24 px-5 sm:px-8 md:px-12 lg:px-24">
                <Hero
                    onNavigate={handleNavigate}
                    loaded={loaded}
                    reducedMotion={reducedMotion}
                />
                <About />
                <SkillsSection reducedMotion={reducedMotion} />
                <Work />
                <Contact />
            </main>

            <div className="grain-overlay" aria-hidden="true" />

            {showPreloader && (
                <Preloader
                    onComplete={handlePreloaderComplete}
                    reducedMotion={reducedMotion}
                />
            )}
        </div>
    );
}

import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS } from "../data/content";
import { useMagnetic } from "../hooks/useMagnetic";

function Logo({ className = "" }: { className?: string }) {
    return (
        <span className={`mono-heading font-bold tracking-tighter ${className}`}>
            <span className="text-white">ST</span>
            <span style={{ color: "var(--accent-cyan)" }}>.</span>
        </span>
    );
}

interface NavLinkProps {
    item: string;
    active: boolean;
    onNavigate: (item: string) => void;
}

function DesktopNavLink({ item, active, onNavigate }: NavLinkProps) {
    const magnetic = useMagnetic<HTMLButtonElement>(0.45);
    return (
        <motion.button
            ref={magnetic.ref}
            onClick={() => onNavigate(item)}
            style={{
                x: magnetic.x,
                y: magnetic.y,
                writingMode: "vertical-rl",
            }}
            onMouseMove={magnetic.onMouseMove}
            onMouseLeave={magnetic.onMouseLeave}
            className={`mono-heading text-sm tracking-[0.4em] transition-all rotate-180 cursor-pointer bg-transparent border-none ${
                active
                    ? "text-white [text-shadow:0_0_18px_var(--accent-cyan)]"
                    : "text-white/30 hover:text-white/70"
            }`}
        >
            {item}
        </motion.button>
    );
}

interface NavProps {
    activeTab: string;
    onNavigate: (item: string) => void;
    mobileMenuOpen: boolean;
    onToggleMobileMenu: () => void;
}

export default function Nav({
    activeTab,
    onNavigate,
    mobileMenuOpen,
    onToggleMobileMenu,
}: NavProps) {
    const logoMagnetic = useMagnetic<HTMLDivElement>(0.3);

    return (
        <>
            <nav className="fixed left-0 top-0 h-full w-24 hidden md:flex flex-col items-center py-12 border-r border-white/10 z-50 bg-black">
                <motion.div
                    ref={logoMagnetic.ref}
                    onMouseMove={logoMagnetic.onMouseMove}
                    onMouseLeave={logoMagnetic.onMouseLeave}
                    style={{ x: logoMagnetic.x, y: logoMagnetic.y }}
                >
                    <Logo className="text-2xl" />
                </motion.div>
                <div className="flex-1 flex flex-col items-center justify-center gap-4">
                    {NAV_ITEMS.map((item) => (
                        <DesktopNavLink
                            key={item}
                            item={item}
                            active={activeTab === item}
                            onNavigate={onNavigate}
                        />
                    ))}
                </div>
                <div className="barcode-vertical">SANKETH</div>
            </nav>

            <nav className="fixed top-0 left-0 w-full md:hidden flex justify-between items-center px-5 py-4 border-b border-white/10 z-50 bg-black/90 backdrop-blur-md">
                <Logo className="text-xl" />
                <button
                    onClick={onToggleMobileMenu}
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

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                        className="fixed top-[57px] left-0 w-full bg-black border-b border-white/10 z-40 md:hidden"
                    >
                        <div className="flex flex-col py-4">
                            {NAV_ITEMS.map((item) => (
                                <button
                                    key={item}
                                    onClick={() => onNavigate(item)}
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
            </AnimatePresence>
        </>
    );
}

import { useEffect, useMemo, useRef, type PointerEvent as ReactPointerEvent } from "react";
import { motion } from "motion/react";
import { SKILLS, SKILL_CATEGORY_COLOR } from "../data/content";
import { useIsMobile } from "../hooks/useMediaQuery";
import RevealHeading from "./RevealHeading";

interface SkillItem {
    label: string;
    color: string;
}

function buildItems(): SkillItem[] {
    const items: SkillItem[] = [];
    (Object.keys(SKILLS) as (keyof typeof SKILLS)[]).forEach((cat) => {
        SKILLS[cat].forEach((label) => {
            items.push({ label, color: SKILL_CATEGORY_COLOR[cat] });
        });
    });
    return items;
}

function rotatePoint(x: number, y: number, z: number, rx: number, ry: number) {
    const rxRad = (rx * Math.PI) / 180;
    const ryRad = (ry * Math.PI) / 180;
    // rotate around X
    const y1 = y * Math.cos(rxRad) - z * Math.sin(rxRad);
    const z1 = y * Math.sin(rxRad) + z * Math.cos(rxRad);
    // rotate around Y
    const x2 = x * Math.cos(ryRad) + z1 * Math.sin(ryRad);
    const z2 = -x * Math.sin(ryRad) + z1 * Math.cos(ryRad);
    return { x: x2, y: y1, z: z2 };
}

interface SkillsOrbProps {
    items: SkillItem[];
    radius: number;
}

function SkillsOrb({ items, radius }: SkillsOrbProps) {
    const anchorRefs = useRef<(HTMLDivElement | null)[]>([]);
    const rotation = useRef({ x: -14, y: 0 });
    const spin = useRef(0.1);
    const dragging = useRef(false);
    const lastPointer = useRef({ x: 0, y: 0 });

    const positions = useMemo(() => {
        const n = items.length;
        const goldenAngle = Math.PI * (3 - Math.sqrt(5));
        return items.map((_, i) => {
            const yy = n > 1 ? 1 - (i / (n - 1)) * 2 : 0;
            const radiusAtY = Math.sqrt(Math.max(0, 1 - yy * yy));
            const theta = goldenAngle * i;
            return {
                x: Math.cos(theta) * radiusAtY * radius,
                y: yy * radius,
                z: Math.sin(theta) * radiusAtY * radius,
            };
        });
    }, [items, radius]);

    useEffect(() => {
        let frame: number;

        const tick = () => {
            if (!dragging.current) {
                rotation.current.y += spin.current;
                spin.current += (0.1 - spin.current) * 0.02;
            }
            const { x: rx, y: ry } = rotation.current;

            anchorRefs.current.forEach((node, i) => {
                if (!node) return;
                const p = positions[i];
                const rotated = rotatePoint(p.x, p.y, p.z, rx, ry);
                const depth = (rotated.z + radius) / (radius * 2); // 0..1
                const scale = 0.68 + depth * 0.5;
                const opacity = 0.32 + depth * 0.68;

                node.style.transform = `rotateY(${ry}deg) rotateX(${rx}deg) translate3d(${p.x}px, ${p.y}px, ${p.z}px) scale(${scale}) rotateX(${-rx}deg) rotateY(${-ry}deg)`;
                node.style.opacity = String(opacity);
                node.style.zIndex = String(Math.round(depth * 100));
            });

            frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [positions, radius]);

    const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
        dragging.current = true;
        lastPointer.current = { x: e.clientX, y: e.clientY };
        e.currentTarget.setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
        if (!dragging.current) return;
        const dx = e.clientX - lastPointer.current.x;
        const dy = e.clientY - lastPointer.current.y;
        rotation.current.y += dx * 0.4;
        rotation.current.x = Math.max(
            -80,
            Math.min(80, rotation.current.x - dy * 0.4),
        );
        spin.current = dx * 0.4;
        lastPointer.current = { x: e.clientX, y: e.clientY };
    };
    const onPointerUp = () => {
        dragging.current = false;
    };

    return (
        <div
            className="skills-orb-wrap"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
        >
            <div className="skills-orb">
                {items.map((item, i) => (
                    <div
                        key={item.label}
                        ref={(el) => {
                            anchorRefs.current[i] = el;
                        }}
                        className="orb-anchor"
                    >
                        <span
                            className="orb-item mono-heading"
                            style={{
                                borderColor: item.color,
                                color: item.color,
                            }}
                        >
                            {item.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function SkillsGridFallback() {
    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 sm:gap-16">
            {(Object.entries(SKILLS) as [keyof typeof SKILLS, string[]][]).map(
                ([category, list]) => (
                    <div key={category} className="space-y-6 sm:space-y-8">
                        <div className="flex items-center gap-4">
                            <span className="text-xs text-white/40 tracking-[0.4em] uppercase">
                                {category}
                            </span>
                            <div className="h-px bg-white/10 flex-grow" />
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {list.map((item) => (
                                <span
                                    key={item}
                                    className="mono-heading text-xs sm:text-sm border px-4 py-2.5 transition-all cursor-default"
                                    style={{
                                        borderColor: `${SKILL_CATEGORY_COLOR[category]}55`,
                                        color: SKILL_CATEGORY_COLOR[category],
                                    }}
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                ),
            )}
        </div>
    );
}

interface SkillsSectionProps {
    reducedMotion: boolean;
}

export default function SkillsSection({ reducedMotion }: SkillsSectionProps) {
    const isMobile = useIsMobile();
    const items = useMemo(buildItems, []);
    const radius = isMobile ? 118 : 190;

    return (
        <section id="skills" className="py-24 sm:py-32 border-t border-white/10">
            <RevealHeading className="mono-heading text-4xl sm:text-5xl mb-4">
                Technical <br /> Arsenal
            </RevealHeading>

            <div className="flex flex-wrap gap-x-8 gap-y-2 mb-14 sm:mb-16">
                {(Object.keys(SKILLS) as (keyof typeof SKILLS)[]).map((cat) => (
                    <div key={cat} className="flex items-center gap-2">
                        <span
                            className="w-2 h-2 rounded-full"
                            style={{ background: SKILL_CATEGORY_COLOR[cat] }}
                        />
                        <span className="barcode text-[11px]">{cat}</span>
                    </div>
                ))}
            </div>

            {reducedMotion ? (
                <SkillsGridFallback />
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <SkillsOrb items={items} radius={radius} />
                    <p className="text-center barcode text-[11px] mt-6">
                        DRAG TO ROTATE
                    </p>
                </motion.div>
            )}
        </section>
    );
}

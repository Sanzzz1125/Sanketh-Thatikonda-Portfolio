# Sanketh Thatikonda — Portfolio

React 19 + TypeScript + Vite + Tailwind v4, with a Three.js/R3F hero scene,
GSAP (ScrollTrigger/SplitText/ScrambleText) scroll choreography, Lenis smooth
scroll, and a draggable CSS-3D skills sphere.

## Run locally

```bash
npm install
npm run dev
```

Type-check + production build:

```bash
npm run lint    # tsc --noEmit
npm run build   # outputs to dist/
```

## Structure

- `src/components/canvas/` — the persistent WebGL layer (`Scene.tsx` mounts
  the `<Canvas>`; `HoloCore.tsx` is the shader-driven hero blob;
  `ParticleField.tsx` is the ambient starfield)
- `src/three/CoreMaterial.ts` — the custom GLSL shader for the hero blob
- `src/components/` — page sections (`Hero`, `About`, `SkillsSection`,
  `Work`, `Contact`) plus shared pieces (`Nav`, `Preloader`, `CustomCursor`,
  `ProjectCard`, `RevealHeading`, `ScrambleReveal`, `ScrollProgress`)
- `src/hooks/` — `useMagnetic` (magnetic buttons), `useTilt` (3D card tilt),
  `useCountUp`, `useMediaQuery` (mobile / coarse-pointer / reduced-motion),
  `useSmoothScroll` (Lenis + GSAP ticker)
- `src/data/content.ts` — all copy/data (projects, skills, education,
  experience, contact) — edit this to update content without touching layout

## Notes

- Respects `prefers-reduced-motion`: skips the preloader, the WebGL canvas,
  and the skills sphere (falls back to a plain grid).
- The custom cursor and pointer-tilt effects only activate on hover-capable,
  fine-pointer devices (i.e. not touch).
- Accent colors are CSS vars in `src/index.css` (`--accent-cyan`,
  `--accent-violet`, `--accent-magenta`) — change those in one place to
  retheme everything (shader colors are separate, in `CoreMaterial.ts`).
- The hero blob's position/intensity are tuned constants at the top of
  `HoloCore.tsx` (`baseX`, `endX`, `uIntensity`) if you want it bigger,
  smaller, or repositioned.

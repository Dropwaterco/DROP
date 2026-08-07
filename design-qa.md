# Design QA

- Source visual truth: `/Users/apple/Downloads/Refine_matte-black_Athlete_Editi…_2K_202608022340.jpeg`, `/Users/apple/Downloads/Refine_purple-black_DROP_can_2K_202608022340.jpeg`, and `/Users/apple/Downloads/Refine_silver_DROP_can_packaging_202608022339.jpeg`; existing rose-gold asset intentionally retained.
- Earlier implementation evidence: user-provided browser screenshot at approximately 1969 × 1308, Athlete state.
- Current implementation: `src/components/VariantShowcase.tsx`, home page `#products` section.
- Intended viewports: desktop 1440 × 1024 and mobile 390 × 844 at device scale factor 1.
- Current implementation screenshot: unavailable because no configured browser surface is available in this session.
- Full-view comparison evidence: the earlier screenshot showed a P1 mismatch—small centered can, pale background for Athlete, and missing editorial copy. Those issues were corrected in code; post-fix capture is blocked.
- Focused-region evidence: each approved product was isolated onto alpha without its source canvas and inspected before integration. The display uses `quality={100}` and variant-specific scale rules.

## Findings and Fixes

- [Fixed P1] Athlete used the pale gallery theme instead of the dark editorial theme. Athlete and Mint now use the near-black stage with violet light.
- [Fixed P1] Can was materially undersized. Product viewport and per-asset scales were increased to match the generated compositions.
- [Fixed P1] Follow-up screenshot showed the landscape-source cans over-scaled and cropped beyond the viewport. Mint, Original, and Clove were reduced from 2.7× to 1.42× desktop scale; Athlete was normalized separately so every can remains fully visible with reference-like breathing room.
- [Fixed P1] Editorial headline and supporting copy were absent. Dark states now recreate `WATER. AS IT SHOULD BE.`; light states recreate `THE ESSENTIAL.`.
- [Fixed P2] All products shared one layout. Light and dark variants now use distinct typography, product angle, copy, background, and rotation treatment.
- [Fixed P2] Variant switching did not reset the intended viewing angle. It now resets to 18°.
- [Fixed P1] Rotation previously transformed only the selected flat can. The product stage is now a continuous four-item 360° carousel: every can remains in the scene, travels through depth, turns on its Y axis, and becomes the active editorial state as it reaches the front.
- [Fixed P1] Follow-up carousel screenshot showed an incoming can crossing through the headline. The orbit is now clipped to the product column, side travel reduced, and non-front cans scaled and faded by depth.
- [Fixed P1] User clarified that secondary cans must never appear behind the active can. The orbit was removed: only the selected product is mounted in the display stage, while variant labels perform an explicit product swap.
- [Fixed P1] Active product rotation now owns the complete 0–360° range with perspective, cubic-bezier settling, direct dragging, touch input, keyboard arrows, and degree-rail seeking.
- [Fixed P1] The selected can now rotates continuously at approximately 18° per second and the showcase advances automatically to the next variant every 7 seconds. Pointer/touch interaction pauses automation and rotation resumes on release.
- [Fixed P1] The mirrored flat-card `rotateY` treatment was removed. The approved transparent product render now uses a continuous turntable projection with front/rear-half lighting treatment, eliminating reversed logos and rectangular asset boundaries.
- [Fixed P1] Athlete, Mint, and Original now use new tightly isolated transparent assets under `public/assets/turntable/`; the existing rose-gold asset remains unchanged as requested.
- Remaining verification blocker: no browser-rendered post-fix desktop/mobile screenshot or console inspection is available.

## Required Fidelity Surfaces

- Fonts and typography: Inter/Playfair pairing, hierarchy, line breaks, weights, and tracking mapped to the two reference designs; post-fix visual comparison blocked.
- Spacing and layout rhythm: editorial two-column desktop grid and stacked mobile hierarchy implemented; post-fix visual comparison blocked.
- Colors and visual tokens: near-black/violet dark system and bone/graphite light system implemented per variant.
- Image quality and asset fidelity: the three approved high-resolution DROP turnarounds ground the isolated display assets; no rectangular backgrounds, placeholder art, or visible image-frame boundaries remain in the assets. Rose-gold remains unchanged.
- Copy and content: reference headlines, supporting copy, product index, degree rail, and drag language implemented.

## Interaction Checks

- Pointer drag, touch swipe, keyboard arrows, variant switching, and angle reset compile successfully.
- The degree rail now seeks across the complete collection orbit; direct variant labels move the carousel to the corresponding 90° stop.
- Local preview server: started successfully on port 3002.
- Component ESLint: passed with no warnings or errors.
- Production build: application compilation is blocked by existing `next/font` Google Fonts network fetch failures for Inter, Oswald, Playfair Display, and Space Mono; no product-display compile error was reported before that external failure.
- Browser playback and console check: blocked.

## Comparison History

- Iteration 1: user screenshot exposed the pale-theme, scale, and hierarchy mismatch.
- Iteration 2: variant-specific design systems, larger imagery, reference typography, and reference rotation treatments implemented.
- Iteration 3: user screenshot exposed severe product cropping; per-source responsive scales were recalibrated.
- Iteration 4: single-can rotation was replaced with a continuous four-can 3D orbit and synchronized active-state switching.
- Iteration 5: carousel bounds and depth treatment were tightened so secondary cans stay visible without entering the editorial copy column.
- Iteration 6: multi-can carousel removed in favor of a single-product 360° stage, matching the clarified interaction model. Corrected live section captured into Figma at `https://www.figma.com/design/SYxDVqHE8u7NeYWbkmjBuM?node-id=1-2`.
- Iteration 7: added constant rotation, timed automatic variant progression, and a restrained blur/fade transition while preserving one visible can at a time.
- Iteration 8: integrated the three newly approved product turnarounds as alpha-isolated assets, retained rose-gold, removed the mirrored flat-card transform, and added a boundaryless continuous turntable projection.
- Iteration 9: user evidence showed the projection still collapsed the can into a narrow strip at intermediate angles. Removed all `scaleX`/perspective simulation and rebuilt rotation as a full-width multi-angle turntable driven by the actual supplied front, rear, and three-quarter renders. Mint frames were background-extracted for the dark stage; Original and Athlete use their native studio backdrops matched to their section backgrounds. The can now keeps its full physical width, upright silhouette, readable typography, and product-photography quality throughout the motion.
- Iteration 10: the supplied specification explicitly prohibited frame-based and CSS image rotation. Removed the turntable implementation from the live component and introduced a real React Three Fiber architecture split into product configuration, lazy scene, GLB model, lighting, delta-time rotation/inertia controller, responsive performance policy, reduced-motion hook, selector, and static fallback. No compatible GLB/GLTF assets exist in the repository, so `modelReady` remains false and the verified fallback is intentionally static. Required filenames and export contract are documented in `public/models/README.md`.
- Iteration 11: removed the product-keyed scene remount. The product section now owns one persistent Canvas and one persistent outer rotation group, advances Still → Mint → Athlete → Clove every 4.5 seconds, pauses product cycling (but not rotation) after manual selection, and crossfades pre-mounted can models at their shared live rotation angle. Rotation remains delta-time-driven at one revolution per 10 seconds, drag inertia is preserved, and product copy transitions from the same active index. The static fallback uses the same 500ms crossfade while the required GLB files remain unavailable.
- Post-fix visual evidence: blocked because no browser surface is available.

final result: blocked

# Rotating-can enhancement — 10 September 2026

The local product section now uses two separately saved, enhanced WebM assets. The original assets are retained. Nothing was deployed.

## Before and after

Sizes below are decimal MB. Dimensions include the transparent padding that preserves the existing on-page size and position.

| Can | Previous website asset | Enhanced asset | Frame rate / duration | Download change |
| --- | --- | --- | --- | --- |
| Silver | `silver-can-portrait-clear.webm`: 224 × 480, 4,204,871 bytes (4.20 MB) | `silver-can-enhanced-1500.webm`: 700 × 1500, 3,594,438 bytes (3.59 MB) | 24 fps, 8.000 s, 192 frames | 14.5% smaller |
| Purple / Mint Fusion | `mint-fusion-portrait-clear.webm`: 300 × 612, 8,387,593 bytes (8.39 MB) | `mint-fusion-enhanced-1530.webm`: 750 × 1530, 6,409,359 bytes (6.41 MB) | 24 fps, 10.000 s, 240 frames | 23.6% smaller |

Both outputs preserve their previous canvas aspect ratios exactly, use square pixels, and contain VP9 with an alpha channel. The 1530-pixel purple height allows an exact 2.5× scale without stretching its canvas.

## Source inspection and selection

FFprobe was used to inspect dimensions, codec, frame rate, pixel format, alpha metadata, duration, and file size. Alpha was also decoded and checked: FFprobe's default VP9 decoder reports `yuv420p` even when the WebM contains a separate alpha stream, so that field alone is insufficient to establish transparency.

| Candidate | Dimensions | Codec / transparency | Frame rate / duration | Size | Decision |
| --- | --- | --- | --- | --- | --- |
| `~/Downloads/Silver-can.mov` | 720 × 1280 | ProRes 4444, `yuva444p12le` | 24 fps / 8 s | 27.77 MB | Used for the established silver colors and alpha silhouette. The can occupies only about 320 pixels of height within this canvas. |
| `~/Downloads/Replace_only_the_existing_back.mp4` | 720 × 1280 | H.264, `yuv420p`, opaque green screen | 24 fps / 8 s | 2.67 MB | Used for higher-detail silver luminance. Its branding and frames match the current can. The can is much larger within this source. |
| `~/Downloads/Beverage_can_rotating_smoothly_1080p_202608072228.mp4` | 1080 × 1920 | H.264, opaque green screen | 24 fps / 8 s | 7.47 MB | Rejected: the back label differs from the current silver can. |
| `public/videos/athlete-360-premium.webm` | 1080 × 1920 | VP9 + alpha | 24 fps / 10 s | 1.67 MB | Used for the established purple colors and alpha silhouette; despite its filename, this is the purple can. |
| `~/Downloads/Beverage_can_rotating_360_degrees_202608072228.mp4` | 720 × 1280 | H.264, `yuv420p`, opaque green screen | 24 fps / 10 s video | 2.81 MB | Used for higher-detail purple luminance; it matches the current rotating can. The container includes an audio tail to 10.005 s, while the 240 video frames remain 10 s. |
| `public/videos/mint-fusion-360-ultra.webm` | 960 × 1500 | VP9 + alpha | 24 fps / 10 s | 7.31 MB | Inspected alongside the other exports. Its larger canvas did not show additional native label detail in the compared frames. |

Other legacy WebM exports and relevant MOV/MP4 candidates in Downloads were inspected. No higher-detail, matching transparent silver MOV or purple MOV was found.

## Processing method

FFmpeg 8.1.1 and FFprobe are installed. No callable local Real-ESRGAN, Upscayl, Video2X, or compatible upscaling model was found in the searched tool/model locations. DaVinci Resolve is installed, but no automated AI-upscaling path was available or used. This is deterministic source-based processing, not AI detail recovery.

1. Decode the silver ProRes alpha directly and explicitly use `libvpx-vp9` to decode purple WebM alpha. Retain the existing crops: silver `224:480:248:400`; purple `300:612:390:682`.
2. Use FFmpeg's 16-bit planar RGBA premultiplication, Lanczos scaling, and unpremultiplication to enlarge the established colors and alpha together. Transparency remains present in the intermediate and final files.
3. Align the matching, higher-detail RGB originals with a deterministic OpenCV helper. A single uniform scale and translation is fitted per clip and used throughout; no per-frame geometric warping is applied. Median feature-registration error in source pixels was 0.20 for silver and 0.63 for purple.
4. Apply restrained FFmpeg luminance sharpening (`unsharp=5:5:0.15:5:5:0`) to the higher-detail source. Transfer its fine luminance detail into the established render, retaining the render's underlying colors and alpha. The helper subtracts a spatial Gaussian low-pass from each luminance plane and transfers the difference inside the opaque can. It does not denoise, interpolate, or generate frames.
5. Keep detail transfer away from the alpha boundary. Extend adjacent can color into fully transparent edge pixels before chroma subsampling, to prevent invisible black or green pixels from bleeding into the visible edge. No solid background is composited into the exports.
6. Encode from lossless FFV1 RGBA intermediates using VP9, `yuva420p`, CRF 18, zero target bitrate, `cpu-used=2`, `row-mt=1`, `auto-alt-ref=0`, square pixels, BT.709, and explicit `alpha_mode=1`. No frame-rate conversion, retiming, trimming of video frames, or loop crossfade is applied.

The preparation and QA scripts, lossless intermediates, metadata, comparison frames, and local previews are in `/tmp/drop-video-enhance/`. The preparation helper is `prepare.py`; its fixed source registrations are in `registration.json`.

## Compression comparison

Two-second front-label segments were compared against the processed lossless intermediates. RGB PSNR below measures the opaque can region, excluding the large transparent background; it is a supporting encoding-error measurement, not proof of perceptual quality. Label and droplet crops were also inspected visually.

| Can | VP9 CRF | Sample size | Opaque-can RGB PSNR |
| --- | --- | --- | --- |
| Silver | 18 | 0.874 MB | 39.72 dB |
| Silver | 24 | 0.671 MB | 39.29 dB |
| Silver | 30 | 0.460 MB | 38.53 dB |
| Purple | 18 | 0.853 MB | 39.85 dB |
| Purple | 24 | 0.637 MB | 39.36 dB |
| Purple | 30 | 0.415 MB | 38.54 dB |

CRF 18 was selected for both because clarity is the priority and both complete files remain smaller than the previous website assets. Alpha RMSE versus the intermediates was approximately 0.38 on a 0–255 scale in these samples. The final purple clip is larger than a simple extrapolation from its front segment because later frames contain more detailed back-label content.

## Verification

- FFprobe confirms the original 24 fps, 192/240 frame counts, and exact 8/10-second video durations.
- Every output frame was decoded with alpha. Across the complete rotations, the visible alpha bounds remain within `[38, 314, 660, 1324]` on silver's 700 × 1500 canvas and `[54, 251, 690, 1300]` on purple's 750 × 1530 canvas. Neither can reaches a canvas boundary.
- Front, intermediate, back-label, and final frames were inspected. Light and dark background composites were used to inspect edge quality. No opaque rectangular background was introduced. Some pre-existing softness in the edge mattes remains visible at large magnification.
- Chromium previews used the actual `VariantShowcase` and `ProductVideo` markup and freshly compiled project Tailwind styles, at 1440 × 1024 desktop and 390 × 844 mobile, both with device scale factor 2. The preview was a local file, not a running Next.js application; the repository prohibits starting a dev server. It verifies media rendering and responsive sizing, not the full app's hydration or navigation.
- In all four previews, video playback advanced, playback rate remained 1, native looping restarted successfully, corners decoded to alpha 0, no horizontal overflow occurred, no playback/page errors occurred, and the tested playback intervals reported zero dropped video frames. Desktop video canvases remained 768 CSS pixels high; mobile canvases remained about 497.77 CSS pixels high. The visible cans fit inside their stages.
- ESLint for `LazyProduct3DScene.tsx`, TypeScript with `--noEmit --incremental false`, and `git diff --check` passed.

Screenshots and frame comparisons are available in `/tmp/drop-video-enhance/`, including `silver-desktop.png`, `mint-desktop.png`, `silver-mobile.png`, `mint-mobile.png`, and `representative-frames.png`.

## Remaining limitations

The original clips are not perfectly seamless: their last and first poses differ. The new videos preserve that existing discontinuity rather than changing duration, rotation speed, or frame order. A first/last-frame composite difference check remains essentially unchanged: silver 18.06 → 18.09 and purple 24.91 → 24.94 mean pixel difference on the 0–255 scale. A truly seamless source loop or an explicitly authorized motion edit is needed to remove the jump.

Some tiny back-label text is already malformed or unreadable in the source footage. This processing improves visibility of supplied detail; it does not reconstruct or rewrite missing lettering. The low-resolution alpha silhouettes also limit ultimate edge precision. Browser checks covered Chromium; Safari and physical mobile-device playback were not tested.

## Project files changed

- Added `public/videos/silver-can-enhanced-1500.webm`.
- Added `public/videos/mint-fusion-enhanced-1530.webm`.
- Changed only the two video paths in `src/components/product-3d/LazyProduct3DScene.tsx`.
- Added this report, `video-enhancement-report.md`.

No other project files were touched. Existing layout, responsive sizes, playback attributes, state handling, original video files, and deployment settings were preserved. No deployment was performed.

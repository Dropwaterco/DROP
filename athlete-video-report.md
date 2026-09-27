# ATHLETE EDITION video integration

Local preview: http://localhost:3002/#products — select **ATHLETE EDITION**. No deployment or remote upload was performed. Assets use the project's existing `public/videos` serving workflow.

The static-poster bug is fixed. A cached video could finish `loadeddata` before React attached the handler, leaving a playing video hidden behind the poster. Transparency is now checked on `canplay` and `playing` too. Duplicate loading events cannot skip the HEVC fallback, and video errors occurring before hydration are handled when playback starts.

## Source and outputs

Sizes below use decimal MB.

| Asset | Dimensions | Timing | Size |
| --- | --- | --- | --- |
| Original `Black_can.mov` | 3840 × 2160 | 24 fps, 8 seconds, 192 frames | 368,575,638 bytes / 368.58 MB |
| `public/videos/athlete-can.webm` | 966 × 1400 | 24 fps, 8 seconds, 192 frames | 8,583,873 bytes / 8.58 MB |
| `public/videos/athlete-can-hevc.mov` | 966 × 1400 | 24 fps, 8 seconds, 192 frames | 9,353,824 bytes / 9.35 MB |
| `public/videos/athlete-can-poster.png` | 966 × 1400, RGBA | First processed frame | 680,371 bytes / 0.68 MB |

FFprobe identified the source as ProRes 4444 XQ (`ap4x`), 12-bit `yuva444p12le`, BT.709, limited range, with alpha and no audio. The container did not specify alpha association; the supplied Resolve export information identifies it as premultiplied. Explicit alpha-association settings and comparison frames were used to avoid automatic conversions followed by accidental double unpremultiplication.

The original was only read, never overwritten, moved, or deleted by this work. At the final check it was no longer present at `/Users/apple/Downloads/Black_can.mov`; its initial ffprobe measurements are recorded above. Processed assets remain separate.

## Crop, alpha and sizing

The source contains opaque black strips on both sides. Every one of its 192 frames was scanned. Within the central 1216-pixel-wide area starting at x=1312, the can's combined alpha bounds were x=105–1133 and y=321–1856, using an alpha threshold of 4/255.

One fixed crop, **1104 × 1600 at x=1384, y=288**, removes the strips and leaves approximately 32 source pixels of safety margin around the complete motion. No moving crop, stretching, colour keying, global white-pixel removal, or alpha erosion was used.

FFmpeg 8.1.1 scaled premultiplied colour and alpha together with Lanczos, then unpremultiplied once for the straight-alpha master and VP9 export. HEVC received premultiplied input explicitly. No sharpening, denoising, AI processing, retiming, or frame interpolation was applied. This is a downscale, not detail recovery.

The can is centered inside the existing responsive portrait wrapper. Its processed canvas is 70% of that wrapper's height, matching the visible scale of the other cans while retaining the tall, slim proportions. Measured at DPR 2:

| Browser viewport | Video canvas in CSS pixels | Source pixels per CSS pixel |
| --- | --- | --- |
| 1440 × 1024 | 370.94 × 537.59 | 2.60 |
| 1920 × 1080 | 480.84 × 696.88 | 2.01 |
| 390 × 844 | 240.41 × 348.42 | 4.02 |

## Compression comparison

Three 2-second VP9 samples were compared against the lossless processed master, including lettering, droplets, rims and representative edge crops.

| VP9 CRF | Sample size | Opaque RGB PSNR | Alpha RMSE, 0–255 scale |
| --- | --- | --- | --- |
| 18 | 3,556,252 bytes | 41.02 dB | 0.61 |
| 24 | 2,916,308 bytes | 40.28 dB | 0.72 |
| **30, selected** | **2,157,305 bytes** | **39.00 dB** | **0.92** |

CRF 30 was the smallest tested setting without an apparent difference in the inspected details at the intended display size. These measurements are comparison aids, not a claim of lossless compression.

Processing commands, with the lossless intermediate kept outside the served assets:

```sh
ffmpeg -i /Users/apple/Downloads/Black_can.mov -map 0:v:0 -an \
  -vf 'crop=1104:1600:1384:288,setparams=alpha_mode=premultiplied,format=gbrap16le:alpha_modes=premultiplied,scale=966:1400:flags=lanczos,unpremultiply=inplace=1,format=bgra:alpha_modes=straight,setsar=1' \
  -c:v ffv1 -level 3 /tmp/drop-athlete/athlete-master.mkv

ffmpeg -i /tmp/drop-athlete/athlete-master.mkv -an \
  -vf 'setparams=alpha_mode=straight,format=yuva420p:alpha_modes=straight' \
  -c:v libvpx-vp9 -crf 30 -b:v 0 -deadline good -cpu-used 2 \
  -row-mt 1 -threads 4 -auto-alt-ref 0 -metadata:s:v:0 alpha_mode=1 \
  public/videos/athlete-can.webm

ffmpeg -i /tmp/drop-athlete/athlete-master.mkv -map 0:v:0 -an \
  -vf 'setparams=alpha_mode=straight,format=gbrap16le:alpha_modes=straight,premultiply=inplace=1,format=bgra:alpha_modes=premultiplied' \
  -c:v hevc_videotoolbox -allow_sw 1 -alpha_quality .9 -q:v 60 \
  -tag:v hvc1 -movflags +faststart public/videos/athlete-can-hevc.mov

ffmpeg -i /tmp/drop-athlete/athlete-master.mkv -frames:v 1 \
  -vf 'setparams=alpha_mode=straight,format=rgba:alpha_modes=straight' \
  -compression_level 9 -pred mixed public/videos/athlete-can-poster.png
```

## Browser verification

Chrome was tested against the running local products section at all three viewport sizes above. Each test switched through Still Water, Mint Fusion, Athlete Edition, Clove Water, then back to Athlete Edition. The video showed its original motion at playback rate 1, with muted autoplay, looping and inline playback enabled. The transparent poster hid once a valid video frame was available.

Each 8.4-second playback observation captured approximately 200 frame callbacks and a loop restart, with zero reported dropped frames. The can remained within both the video canvas and the product stage through its full tilt. Corner alpha remained zero throughout. No horizontal page overflow or media-induced resizing was observed. Mobile section height still varies with the existing product descriptions' line wrapping.

Representative frames were inspected against the actual dark section background and temporary white/dark backgrounds. No opaque rectangle, side stripes, clipped rims, or obvious coloured edge halos were visible at the checked sizes. Genuine silver rims, highlights, white lettering and droplets remain present. All 192 decoded WebM frames also retained a safety margin inside the output canvas.

The component checks actual decoded transparent corner pixels and an opaque can-center pixel before revealing a video. A simulated opaque WebM decoder correctly selected HEVC. Simulated failures of both videos kept the correctly framed transparent PNG visible.

The HEVC fallback was decoded through Apple's native AVFoundation API: RGBA output was confirmed, all four corners were transparent, and its first frame matched the poster closely (opaque RGB mean absolute error 1.61/255; alpha RMSE 0.36/255). HEVC also played through a loop with transparent corners in Chrome at 1920 × 1080 on this Mac. Its cumulative browser counter reported 8 dropped frames out of 239 in that automated run, which included switching and seeking; the primary VP9 runs reported zero. This follows Apple's [HEVC with alpha guidance](https://developer.apple.com/videos/play/wwdc2019/506/).

**Safari browser verification remains incomplete:** macOS denied Apple Events access to Safari (`-1743`). Native Apple decoding and Chrome checks do not substitute for a Safari browser test. The runtime alpha check and transparent PNG fallback remain in place for devices without working transparent video support.

## Remaining limitations and changed files

The supplied animation's first and last poses do not match, so its existing loop jump remains. Original duration, frame order and rotation speed were preserved. Making that boundary seamless would require editing or re-exporting the animation. Small label-text irregularities already visible in the source were preserved.

Changed application files:

- `src/components/product-3d/AthleteCanVideo.tsx`: new athlete video, transparency verification, codec fallback, matching poster, and playback fix.
- `src/components/product-3d/LazyProduct3DScene.tsx`: mounts the athlete media layer.
- `src/components/product-3d/productConfig.ts`: removes the athlete's old static fallback to prevent it showing behind the moving can.
- Three separate processed assets listed above, this report, and review screenshots under `artifacts/athlete-video/`.

The silver, mint and clove media, section styling, typography, controls and other application files were not changed. The pre-existing `next-env.d.ts` modification was left untouched. Targeted ESLint and TypeScript checks passed. Existing development CSP warnings for Figma capture and React debug evaluation were observed and left outside this task's scope.

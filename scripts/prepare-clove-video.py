"""Remove the MOV's black backdrop and build a compact clove product loop.

Run with venv/bin/python scripts/prepare-clove-video.py (OpenCV, NumPy, FFmpeg).
Only the largest outer silhouette is masked, preserving black printed lettering.
The matte matches the light product section, as with the other mobile MP4s.
"""
from pathlib import Path
import subprocess
import cv2
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/videos'
WIDTH, HEIGHT = 720, 1120
BACKGROUND = np.array([244, 241, 235], dtype=np.float32)
source = ROOT / 'public/assets/generated/Clove water.mov'
output = OUT / 'clove-can-mobile.mp4'

decoder = subprocess.Popen([
    'ffmpeg', '-v', 'error', '-i', str(source), '-vf',
    f'crop=1280:1992:1280:80,scale={WIDTH}:{HEIGHT},format=rgb24',
    '-f', 'rawvideo', '-pix_fmt', 'rgb24', 'pipe:1',
], stdout=subprocess.PIPE)
frames = []
while True:
    raw = decoder.stdout.read(WIDTH * HEIGHT * 3)
    if not raw:
        break
    if len(raw) != WIDTH * HEIGHT * 3:
        raise RuntimeError('Incomplete decoded frame')
    frame = np.frombuffer(raw, np.uint8).reshape(HEIGHT, WIDTH, 3)
    foreground = (frame.max(axis=2) > 14).astype(np.uint8) * 255
    contours, _ = cv2.findContours(foreground, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    if not contours:
        continue
    contour = max(contours, key=cv2.contourArea)
    # Discard blank/fading lead-in and tail frames.
    if cv2.contourArea(contour) < 100000 or frame.max() < 130:
        continue
    mask = np.zeros((HEIGHT, WIDTH), np.uint8)
    cv2.drawContours(mask, [contour], -1, 255, cv2.FILLED)
    # The source was rendered against black: simply blurring its outline keeps
    # black-contaminated RGB pixels and produces a dark halo on the light page.
    # Contract the matte slightly and extend clean interior colours into the
    # narrow edge band before feathering. Printed details stay untouched.
    distance = cv2.distanceTransform(mask, cv2.DIST_L2, 5)
    core = distance > 5
    _, labels = cv2.distanceTransformWithLabels(
        (~core).astype(np.uint8), cv2.DIST_L2, 5,
        labelType=cv2.DIST_LABEL_PIXEL,
    )
    clean_colours = frame[core]
    corrected = frame.copy()
    edge = (distance > 0) & ~core
    corrected[edge] = clean_colours[labels[edge] - 1]
    alpha = np.clip((distance - 1.5) / 2.5, 0, 1)
    alpha = (alpha * alpha * (3 - 2 * alpha))[..., None]
    composite = np.clip(corrected * alpha + BACKGROUND * (1 - alpha), 0, 255).astype(np.uint8)
    frames.append(composite)
if decoder.wait() != 0 or not frames:
    raise RuntimeError('Video decode failed or no can frames found')

encoder = subprocess.Popen([
    'ffmpeg', '-y', '-v', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgb24',
    '-s', f'{WIDTH}x{HEIGHT}', '-r', '24', '-i', 'pipe:0', '-an',
    '-vf', 'scale=out_color_matrix=bt709:out_range=tv',
    '-c:v', 'libx264', '-crf', '19', '-preset', 'slow', '-pix_fmt', 'yuv420p',
    '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709',
    '-movflags', '+faststart', str(output),
], stdin=subprocess.PIPE)
for frame in frames:
    encoder.stdin.write(frame.tobytes())
encoder.stdin.close()
if encoder.wait() != 0:
    raise RuntimeError('Video encode failed')
cv2.imwrite(str(OUT / 'clove-can-poster-v2.jpg'), cv2.cvtColor(frames[0], cv2.COLOR_RGB2BGR), [cv2.IMWRITE_JPEG_QUALITY, 95])
print(f'Built {output.name}: {len(frames)} frames, {output.stat().st_size // 1024} KiB')

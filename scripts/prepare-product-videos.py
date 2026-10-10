"""Build browser-safe product loops. Run from any directory with Python 3 + FFmpeg.

Decode VP9 alpha explicitly, remove green spill, then composite onto the product's
section colour before H.264 encoding. Browsers never have to decode transparency.
Light backgrounds match productConfig.ts. Mint uses a black matte that the
player's lighten blend removes without depending on colour rounding in codecs.
Originals remain untouched.
"""

from pathlib import Path
import subprocess
import argparse

ROOT = Path(__file__).resolve().parents[1]
VIDEOS = ROOT / "public/videos"
PRODUCTS = [
    ("original", "silver-can-enhanced-1500.webm", "F4F1EB", "crop=700:1160:0:240,"),
    ("mint", "mint-fusion-enhanced-1530.webm", "000000", "crop=750:1160:0:200,"),
    ("athlete", "athlete-can.webm", "0A0A0B", ""),
]

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--product', choices=[item[0] for item in PRODUCTS])
args = parser.parse_args()

for name, source, background, crop in PRODUCTS:
    if args.product and args.product != name:
        continue
    revision = '-v3' if name == 'mint' else ''
    poster_revision = '-v3' if name == 'mint' else '-v2'
    output = VIDEOS / f"{name}-can-mobile{revision}.mp4"
    filters = (
        f"[0:v]{crop}format=rgba,despill=type=green,"
        "scale=648:1008:force_original_aspect_ratio=decrease:force_divisible_by=2,"
        "pad=720:1120:(ow-iw)/2:(oh-ih)/2:color=black@0,setsar=1[can];"
        f"color=c=0x{background}:s=720x1120:r=24[bg];"
        "[bg][can]overlay=shortest=1:format=auto,"
        "scale=out_color_matrix=bt709:out_range=tv,format=yuv420p[base]"
    )
    if name == 'original':
        # This source ends at a different angle. A forward/return loop avoids the
        # jump, and optical interpolation supplies real intermediate 60fps frames.
        filters += (
            ";[base]split=3[forward][return][wrap];"
            "[return]reverse,trim=start_frame=1:end_frame=190,setpts=PTS-STARTPTS[back];"
            "[wrap]trim=end_frame=3,setpts=PTS-STARTPTS[start];"
            "[forward][back][start]concat=n=3:v=1:a=0,"
            "minterpolate=fps=60:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1,"
            "trim=duration=15.833333[out]"
        )
    else:
        filters += ";[base]null[out]"
    subprocess.run([
        "ffmpeg", "-y", "-v", "error", "-c:v", "libvpx-vp9",
        "-i", str(VIDEOS / source), "-filter_complex", filters,
        "-map", "[out]", "-an", "-c:v", "libx264", "-crf", "19",
        "-preset", "slow", "-movflags", "+faststart",
        "-color_primaries", "bt709", "-color_trc", "bt709",
        "-colorspace", "bt709", str(output),
    ], check=True)
    subprocess.run([
        "ffmpeg", "-y", "-v", "error", "-i", str(output),
        "-frames:v", "1", "-q:v", "2", str(VIDEOS / f"{name}-can-poster{poster_revision}.jpg"),
    ], check=True)
    print(f"Built {output.name} ({output.stat().st_size // 1024} KiB)", flush=True)

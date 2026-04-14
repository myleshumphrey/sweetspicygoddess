#!/usr/bin/env bash
# Creates web-safe H.264/AAC MP4s from the TikTok MOVs (run once after: brew install ffmpeg)
set -euo pipefail
cd "$(dirname "$0")"
if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "Install ffmpeg first:  brew install ffmpeg"
  exit 1
fi
convert() {
  local in="$1" out="$2"
  echo "→ $out"
  # H.264 + AAC, yuv420p + even dimensions — plays in Chrome, Safari, Firefox, Edge
  ffmpeg -y -i "$in" \
    -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 23 -preset medium \
    -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" \
    -c:a aac -b:a 128k -ac 2 \
    -movflags +faststart \
    "$out"
}
convert "v15044gf0000d69olafog65ldgo0at70.MOV" "featured-fashion.mp4"
convert "v15044gf0000d0ng84fog65stb3v5e9g.MOV" "featured-lifestyle.mp4"
convert "v15044gf0000cuqci7nog65kdh4p5s5g.MOV" "featured-ugc.mp4"
echo "Done. Add and commit featured-*.mp4, then push."

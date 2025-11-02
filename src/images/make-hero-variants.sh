# guarda como: make_hero_variants.sh NO PROBADO
#!/usr/bin/env bash
set -euo pipefail

if [ $# -lt 1 ]; then
    echo "Uso: $0 ruta/a/imagen.png"
    exit 1
fi

ORIG="$1"
BASE_DIR="$(dirname "$ORIG")"
BASE_NAME="$(basename "$ORIG")"
STEM="${BASE_NAME%.*}"

cd "$BASE_DIR"

for W in 800 1200 1600; do
    # JPG base
    convert "$BASE_NAME" -strip -resize "${W}x" -quality 82 "${STEM}-${W}.jpg"

    # WebP
    cwebp -q 82 -mt -sharp_yuv -quiet "${STEM}-${W}.jpg" -o "${STEM}-${W}.webp"

    # AVIF (sin --cq-level)
    if avifenc --version >/dev/null 2>&1; then
        avifenc --min 20 --max 30 --speed 6 "${STEM}-${W}.jpg" -o "${STEM}-${W}.avif" \
            || avifenc --min 20 --max 30 -s 6 "${STEM}-${W}.jpg" -o "${STEM}-${W}.avif"
    fi
done

echo "Listo: ${STEM}-{800,1200,1600}.{jpg,webp,avif}"

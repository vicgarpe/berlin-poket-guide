# Galería — Estado de implementación

## ✅ Hecho

- Módulo galería completo implementado en `src/galeria.njk`
- Cifrado AES-256-GCM post-build en `scripts/encrypt-galeria.mjs`
  - `npm run serve` → galería sin contraseña (dev)
  - `npm run build` → galería cifrada con password `bollagas`; incorrecto → redirige a home sin mensaje
- "Galería" añadida al nav principal (`base.njk`)
- Estilos ALA en `styles.css`: grid, thumbnails, play-button overlay para vídeos, lightbox
- Credenciales Dropbox en `.env` (ignorado por git), inyectadas en build via `dotenv`
- Carpeta Dropbox: `/Almacen-archivo/2026-berlin` — existe y accesible ✓
- Token con scopes correctos: `files.metadata.read`, `files.content.read`, `files.content.write`
- Galería carga sin errores con carpeta vacía (muestra estado "vacío")

## 🔲 Pendiente de probar

- **Subida de fotos/vídeos** desde el botón "Subir" — no testado todavía
  - Ficheros ≤150MB: upload directo
  - Ficheros >150MB: upload session por chunks
- Probar con fotos reales: miniaturas, orden por fecha EXIF, lightbox
- Probar vídeos: thumbnail con play overlay, reproducción inline en lightbox
- Build de producción (`npm run build`) y verificar que el cifrado funciona end-to-end

## Notas técnicas

- `dotenv` v17 instalado como devDependency
- Build script: `eleventy --input=src && node scripts/encrypt-galeria.mjs`
- Serve script sin cifrado (sin cambios)
- PBKDF2 250.000 iteraciones, AES-256-GCM

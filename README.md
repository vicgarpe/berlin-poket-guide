# Berlin Pocket Guide — Guía del autor

Guía de viaje estática generada con [Eleventy](https://www.11ty.dev/), desplegada en GitHub Pages.

---

## Estructura de posts

Todos los posts viven en `src/posts/`. El prefijo del fichero determina el módulo:

| Prefijo | Módulo | URL generada |
|---|---|---|
| `YYYY-MM-DD-*.md` | Agenda | `/posts/slug/` |
| `historia_*.md` | Historia | `/historia/slug/` |
| `recursos_*.md` | Recursos | `/recursos/slug/` |

---

## Módulo Agenda — fichas de día

Frontmatter mínimo:

```yaml
---
layout: post.njk
title: "Día N — Título"
excerpt: "Descripción breve."
lugar: "Berlín"
hero: "/images/nombre.jpg"
alt: "Descripción de la imagen"
templateEngineOverride: njk,md
permalink: /posts/{{ page.fileSlug }}/
---
```

### Widget Timeline

Coloca el shortcode justo después del bloque `---` del frontmatter para mostrar la línea de tiempo del día:

```
{% timeline "YYYY-MM-DD" %}
```

El widget lee automáticamente la sección `## Timetable estimado` del propio post y construye la línea de tiempo. No requiere datos adicionales.

**Formato del timetable** (sección `## Timetable estimado (orientativo)`):

```markdown
## Timetable estimado (orientativo)

- **09:20** — Salida desde el hotel          ← hito puntual (punto en el eje)
- **10:00–12:30 · Free tour Berlín**         ← evento con duración (barra)
- **12:30–13:30** — Comida / descanso        ← evento con duración (barra)
- 13:50 — Despegue VLC                       ← hito sin negrita (también válido)
- 13:50–16:15 — Vuelo VLC→DUS               ← evento con duración sin negrita
```

Reglas de parseo:
- Cualquier `HH:MM` al inicio de un `<li>` se detecta (con o sin negrita).
- `HH:MM–HH:MM` → **evento con duración** → barra coloreada en carril Gantt.
- `HH:MM` solo → **hito puntual** → línea discontinua vertical en zona inferior.
- Los eventos solapados suben de carril automáticamente (layout tipo Gantt).
- Las barras alternan entre dos estilos: sólido y outline.
- Si la fecha coincide con hoy: línea roja de "ahora" + auto-scroll al momento actual.

---

## Módulo Historia — fichas de contexto

```yaml
---
layout: post.njk
title: "Título"
excerpt: "Descripción breve."
modulo: "Historia"
hero: "/images/nombre.jpg"
alt: "..."
templateEngineOverride: njk,md
permalink: /historia/historia_slug/
---
```

---

## Módulo Recursos — fichas de referencia

```yaml
---
layout: post.njk
title: "Título"
excerpt: "Descripción breve."
modulo: "Recursos"
templateEngineOverride: njk,md
permalink: /recursos/recursos_slug/
---
```

---

## Shortcodes disponibles

### `{% gmap "query", "etiqueta" %}`
Enlace a Google Maps por búsqueda de texto.

```
{% gmap "Rotes Rathaus, Berlin", "Punto de encuentro — Rotes Rathaus" %}
```

### `{% gcoords lat, lon, "etiqueta" %}`
Enlace a Google Maps por coordenadas GPS.

```
{% gcoords 52.5186, 13.4081, "Rotes Rathaus — GPS" %}
```

### `{% wiki "slug", "etiqueta" %}`
Enlace interno entre fichas por nombre de fichero (sin extensión). Resuelve la URL según el prefijo del slug.

```
{% wiki "recursos_meteo", "→ Previsión meteorológica" %}
{% wiki "historia_muro", "El Muro de Berlín" %}
{% wiki "2026-03-19-muro-monumental", "Día 1" %}
```

### `{% traductor "Etiqueta..." %}`
Botón que enlaza al módulo de traducción OCR/texto.

```
{% traductor "Abrir Mariano..." %}
```

### `{% timeline "YYYY-MM-DD" %}`
Widget de línea de tiempo del día. Ver sección anterior.

---

## Widget TTS — pronunciación en alemán

En la ficha `recursos_idioma.md`, cualquier tabla que tenga una columna con cabecera `Alemán` añade automáticamente un icono ▶ clicable en cada celda. Al pulsar, el navegador pronuncia la frase en alemán (Web Speech API, sin conexión necesaria).

No requiere configuración. Basta con que la cabecera de la columna sea exactamente `Alemán`.

---

## Filtros de fecha

```
{{ page.date | formatDate('es-ES') }}      → "18 mar 2026"
{{ page.date | formatDateFull('es-ES') }}  → "miércoles — 18 mar 2026"
```

---

## Despliegue

El sitio se despliega automáticamente en GitHub Pages al hacer push a `main`.

- **Rama de trabajo:** `desarrollo`
- **Rama de producción:** `main`
- **URL:** `https://vicgarpe.github.io/berlin-poket-guide/`

Flujo habitual:

```bash
# Trabajar en desarrollo
git checkout desarrollo

# Probar en local
npm run serve

# Cuando esté listo: merge y push a main
git checkout main
git merge desarrollo
git push origin main
```

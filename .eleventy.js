const PATH_PREFIX = "/berlin-poket-guide/";

export default function(eleventyConfig) {
  // --- Passthrough de estáticos ---
  // Soporta ambas rutas por si usas "imagenes" o "images"
  eleventyConfig.addPassthroughCopy({ "src/imagenes": "imagenes" });
  eleventyConfig.addPassthroughCopy({ "src/images": "images" });
  eleventyConfig.addPassthroughCopy({ "src/styles.css": "styles.css" });

  // --- Colecciones por módulo ---
  // Agenda: posts con fecha (YYYY-MM-DD-*.md)
  eleventyConfig.addCollection("agenda", (api) =>
    api.getFilteredByGlob("src/posts/[0-9]*.md").sort((a, b) => a.date - b.date)
  );
  // Historia: fichas historia_*.md
  eleventyConfig.addCollection("historia", (api) =>
    api.getFilteredByGlob("src/posts/historia_*.md")
  );
  // Recursos: fichas recursos_*.md
  eleventyConfig.addCollection("recursos", (api) =>
    api.getFilteredByGlob("src/posts/recursos_*.md")
  );

  // --- Filtro de fecha para Nunjucks: {{ fecha | formatDate('es-ES') }} ---
  eleventyConfig.addFilter("formatDate", (dateObj, locale = "es-ES", opts) => {
    const options = opts || { day: "2-digit", month: "short", year: "numeric" };
    return new Intl.DateTimeFormat(locale, options).format(dateObj);
  });

  // --- Filtro de fecha con día de la semana: "miércoles — 18 mar 2026" ---
  eleventyConfig.addFilter("formatDateFull", (dateObj, locale = "es-ES") => {
    const weekday = new Intl.DateTimeFormat(locale, { weekday: "long" }).format(dateObj);
    const date = new Intl.DateTimeFormat(locale, { day: "2-digit", month: "short", year: "numeric" }).format(dateObj);
    return `${weekday} — ${date}`;
  });

  // --- Dato global (año de build) para usar en plantillas ---
  eleventyConfig.addGlobalData("build", { year: new Date().getFullYear() });

  // --- Shortcodes Nunjucks para Google Maps ---
  const _escapeHtml = (str = "") =>
    String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  eleventyConfig.addNunjucksShortcode("gmap", (q, label) => {
    const url = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q);
    const txt = _escapeHtml(label || "Ver en Google Maps");
    return `<a class="map-link" href="${url}" target="_blank" rel="noopener noreferrer"><span class="map-tag" aria-hidden="true">MAPS</span><span class="map-link-text">${txt}</span></a>`;
  });

  eleventyConfig.addNunjucksShortcode("gcoords", (lat, lon, label) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lat)},${encodeURIComponent(lon)}`;
    const txt = _escapeHtml(label || "Ver en Google Maps");
    return `<a class="map-link" href="${url}" target="_blank" rel="noopener noreferrer"><span class="map-tag" aria-hidden="true">MAPS</span><span class="map-link-text">${txt}</span></a>`;
  });

  // --- Shortcode wiki: [[slug]] enlaza entre fichas por nombre de fichero ---
  eleventyConfig.addNunjucksShortcode("wiki", (slug, label) => {
    slug = slug.replace(/\.md$/, "");
    let path;
    if (/^\d{4}-\d{2}-\d{2}-/.test(slug)) {
      path = `posts/${slug.replace(/^\d{4}-\d{2}-\d{2}-/, "")}/`;
    } else if (slug.startsWith("historia_")) {
      path = `historia/${slug}/`;
    } else if (slug.startsWith("recursos_")) {
      path = `recursos/${slug}/`;
    } else {
      path = `posts/${slug}/`;
    }
    const href = PATH_PREFIX + path;
    const txt = _escapeHtml(label || slug);
    return `<a href="${href}" class="wiki-link">${txt}</a>`;
  });

  // --- Directorios + pathPrefix para GitHub Pages (repo de proyecto) ---
  return {
    dir: { input: "src", output: "_site", includes: "_includes" },
    pathPrefix: PATH_PREFIX
  };
}

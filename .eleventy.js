export default function (eleventyConfig) {
  // Colección "paradas" (posts ordenados por fecha)
  eleventyConfig.addCollection("paradas", (collectionApi) =>
    collectionApi.getFilteredByGlob("src/posts/*.md").sort((a, b) => a.date - b.date)
  );

  // Filtro de fecha para Nunjucks: {{ fecha | formatDate('es-ES') }}
  eleventyConfig.addFilter("formatDate", (dateObj, locale = "es-ES", opts) => {
    const options = opts || { day: "2-digit", month: "short", year: "numeric" };
    return new Intl.DateTimeFormat(locale, options).format(dateObj);
  });

  // Dato global (año de build) para usar en plantillas
  eleventyConfig.addGlobalData("build", { year: new Date().getFullYear() });

  // Copiar imágenes tal cual (src/images → /images)
  eleventyConfig.addPassthroughCopy({ "src/images": "images" });

  // 🔎 Shortcodes Nunjucks para Google Maps
  eleventyConfig.addNunjucksShortcode("gmap", (q, label) => {
    const url = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q);
    return `<a href="${url}" target="_blank" rel="noopener">${label || "Ver en Google Maps"}</a>`;
  });

  eleventyConfig.addNunjucksShortcode("gcoords", (lat, lon, label) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
    return `<a href="${url}" target="_blank" rel="noopener">${label || "Ver en Google Maps"}</a>`;
  });

  return {
    dir: { input: "src", output: "_site", includes: "_includes" }
    // Si publicas en repo de proyecto, puedes añadir:
    // pathPrefix: "/berlin-poket-guide/"
  };
}

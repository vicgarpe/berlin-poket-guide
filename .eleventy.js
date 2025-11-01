export default function (eleventyConfig) {
    // Colección "paradas"
    eleventyConfig.addCollection("paradas", (collectionApi) =>
        collectionApi.getFilteredByGlob("src/posts/*.md").sort((a, b) => a.date - b.date)
    );

    // Filtro de fecha: {{ fecha | formatDate('es-ES') }}
    eleventyConfig.addFilter("formatDate", (dateObj, locale = "es-ES", opts) => {
        const options = opts || { day: "2-digit", month: "short", year: "numeric" };
        return new Intl.DateTimeFormat(locale, options).format(dateObj);
    });

    // Dato global (año)
    eleventyConfig.addGlobalData("build", {
        year: new Date().getFullYear()
    });

    // ✅ Pasar imágenes estáticas tal cual (para /images/...)
    eleventyConfig.addPassthroughCopy({ "src/images": "images" });

    return {
        dir: { input: "src", output: "_site", includes: "_includes" }
    };
}


require("dotenv").config();

export default {
    target: "static",
    strict: false,
    publicRuntimeConfig: {
        baseURL: process.env.BASE_URL || "https://nuxtjs.org",
        title: process.env.APP_TITLE || "Charley Byrne",
    },

    head: {
        meta: [
            { charset: "utf-8" },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1",
            },
            // hid is used as unique identifier. Do not use `vmid` for it as it will not work
            {
                hid: "description",
                name: "description",
                content: "Charley Byrne",
            },
        ],
        link: [
            { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
            {
                rel: "stylesheet",
                href: "https://cdn.jsdelivr.net/npm/katex@0.11.0/dist/katex.min.css",
            },
        ],
    },

    buildModules: [
        // https://go.nuxtjs.dev/typescript
        "@nuxt/typescript-build",
        // https://go.nuxtjs.dev/stylelint
        // "@nuxtjs/stylelint-module",
        "@nuxtjs/style-resources",
        "@/modules/generator",
    ],

    generate: {},

    script: [{ src: "@snapatoms/ui" }],

    styleResources: {
        scss: ["~assets/_mixins.scss", "@snapatoms/ui/styles/helpers.scss"],
    },

    css: [
        {
            src: "~assets/main.scss",
            lang: "scss",
        },
        {
            src: "@snapatoms/ui/dist/bundle.css",
            lang: "css",
        },
    ],

    components: true,
    sitemap: {
        hostname: "https://charleybyrne.com",
        gzip: true,
    },
    // Modules: https://go.nuxtjs.dev/config-modules
    modules: ["@nuxt/content", "nuxt-mermaid-string", "@nuxtjs/sitemap"],

    // PWA module configuration: https://go.nuxtjs.dev/pwa
    pwa: {
        manifest: {
            lang: "en",
        },
    },
    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    build: {
        postcss: {},
    },

    plugins: ["~/plugins/prism.js", "~/plugins/prototypes.js", "~/plugins/disqus.js"],

    content: {
        markdown: {
            prism: {
                theme: "prism-themes/themes/prism-vsc-dark-plus.css",
            },
            remarkPlugins: ["remark-math"],
            rehypePlugins: ["rehype-katex"],
        },
    },
};

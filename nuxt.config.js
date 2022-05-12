require("dotenv").config();

export default {
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    target: "static",
    strict: false,
    // Global CSS: https://go.nuxtjs.dev/config-css

    publicRuntimeConfig: {
        baseURL: process.env.BASE_URL || "https://nuxtjs.org",
        title: process.env.APP_TITLE || "Title Here",
    },

    head: {
        meta: [
            { charset: "utf-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1" },
            // hid is used as unique identifier. Do not use `vmid` for it as it will not work
            { hid: "description", name: "description", content: "Meta description" },
        ],
    },

    script: [{ src: "@snapatoms/ui" }],

    css: [
        {
            src: "~/assets/global.scss",
            lang: "scss",
        },
        {
            src: "@snapatoms/ui/dist/snapatoms.css",
            lang: "css",
        },
    ],

    components: true,

    content: {
        markdown: {
            prism: {
                theme: "prism-themes/themes/prism-vsc-dark-plus.css",
            },
        },
    },

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        "@nuxtjs/axios",
        // https://go.nuxtjs.dev/content
        "@nuxt/content",
    ],

    // PWA module configuration: https://go.nuxtjs.dev/pwa
    pwa: {
        manifest: {
            lang: "en",
        },
    },
    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/typescript
        "@nuxt/typescript-build",
        // https://go.nuxtjs.dev/stylelint
        // "@nuxtjs/stylelint-module",
    ],
    plugins: ["~/plugins/prism.js"],
};

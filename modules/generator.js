const generator = function () {
    this.nuxt.hook("generate:done", async (context) => {
        const routes = await Array.from(context.generatedRoutes);
        this.nuxt.options.sitemap.routes = await [...routes];
    });
};

export default generator;

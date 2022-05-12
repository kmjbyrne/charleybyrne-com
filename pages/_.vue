<template>
    <main class="container">
        <div class="columns columns--tight">
            <div class="column-3">
                <section class="sticky-view">
                    <ContentDirectory label="Recent Posts" :directory="files"></ContentDirectory>
                </section>
            </div>
            <div class="column-9">
                <div class="columns">
                    <div class="column-8">
                        <p>Created: {{ new Date(page.createdAt) }}</p>
                        <p>{{ page.modifiedAt }}</p>
                        <ContentBlock :title="page.title" :key="$route.fullPath">
                            <nuxt-content :document="page" />
                        </ContentBlock>
                    </div>
                    <div class="column-4">
                        <section class="sticky-view">
                            <h3>On This Page</h3>
                            <ContentToc :toc="page.toc"></ContentToc>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script lang="ts">
import Prism from "~/plugins/prism";

import Vue from "vue";

export default Vue.extend({
    layout: "blog",
    props: { directory: { type: String, default: () => "" } },
    mounted() {
        Prism.highlightAll();
    },

    head(): any {
        return {
            title: this.page.title,
            meta: [
                {
                    content: this.page.description,
                },
            ],
        };
    },
    data() {
        return {
            error: false,
            page: {} as any,
        };
    },

    async asyncData({ $content, route }) {
        const page = await $content(route.fullPath.slice(1), { deep: true }).fetch();
        const files = await $content("blog", { deep: true }).fetch();
        return { files, page: page };
    },
});
</script>

<template>
    <div class="columns columns--tight">
        <template>
            <div class="column-8">
                <section class="panel m1 content-body">
                    <h1 id="title">{{ page.title }}</h1>
                    <!-- <div class="block theme-light-text m-tb-1 flex-wrap justify-left tags">
                        <NuxtLink :to="'/wiki/category/' + page.category" class="flex-0 flex-inline align-center">
                            {{ page.category }}
                        </NuxtLink>
                    </div> -->
                    <p>Useful tool: <a href="https://coolconversion.com/cooking-volume-weight" target="blank">https://coolconversion.com/cooking-volume-weight</a></p>
                    <img class="cover" :src="page.cover" v-if="page.cover && page.cover !== ''" :alt="page.cover" />
                    <div class="block theme-light-text m-tb-1 flex-wrap justify-left tags" v-if="page.tags">
                        <NuxtLink :to="'/recipes/tag/' + tag" v-for="tag in page.tags || []" :key="tag">
                            <span>{{ tag }}</span>
                            <img class="icon-sm" src="/tag.svg" />
                        </NuxtLink>
                    </div>
                    <p v-if="page.description">{{ page.description }}<span v-if="['.', '?', '!'].indexOf(page.description[-1]) >= 0">.</span></p>
                    <nuxt-content :document="page" />
                </section>
            </div>
            <div class="column-4">
                <div
                    class="drawer-mobile mobile-z200 desktop-p1 drawer-mobile--right mobile-sticky-top-0"
                    :class="toc ? 'mobile-left-auto z200 handle--active drawer-mobile--open' : ''"
                >
                    <div class="handle z500 handle--right-edge mobile-abs-top-20pc mobile-only" @click="toggle('toc')">
                        <img class="s2" src="/document.svg" />
                    </div>

                    <div class="drawer-mobile__content">
                        <section class="panel">
                            <h3>On This Page</h3>
                            <nav class="toc">
                                <ul class="nav-items">
                                    <li v-for="item in page.toc" :key="item.id">
                                        <a
                                            class="link"
                                            :href="'#' + item.id"
                                            :class="{
                                                'toc--in-view': item.id === currentlyActiveToc,
                                            }"
                                            >{{ item.text }}</a
                                        >
                                    </li>
                                </ul>
                            </nav>
                        </section>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script lang="ts">
import Prism from "~/plugins/prism";

import Vue from "vue";

// Notes
// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API

export default Vue.extend({
    // transition: "fade",
    props: { directory: { type: String, default: () => "" } },

    data(): any {
        return {
            currentlyActiveToc: "",
            observer: null,
            observerOptions: {
                root: this.$refs.nuxtContent,
                threshold: 0,
            },
            toc: false,
            error: false,
            page: {} as any,
        };
    },

    beforeDestroy(): any {
        this.observer.disconnect();
    },

    head(): any {
        return {
            title: this.page.title || "",
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: this.page.description,
                },
                {
                    property: "og:title",
                    content: `${this.page.title}`,
                },
                {
                    property: "og:description",
                    content: `${this.page.description}`.replace(/<\/?[^>]+(>|$)/g, ""),
                },
                {
                    property: "og:image",
                    content: `${this.page.cover}`,
                },
            ],
        };
    },

    mounted(): any {
        Prism.highlightAll();

        this.observer = new IntersectionObserver((entries): any => {
            entries.forEach((entry) => {
                const id = entry.target.getAttribute("id");
                if (entry.isIntersecting) {
                    this.currentlyActiveToc = id;
                }
            });
        }, this.observerOptions);
        // Track all sections that have an `id` applied
        document.querySelectorAll(".nuxt-content h2[id], .nuxt-content h1[id]").forEach((section): any => {
            this.observer.observe(section);
        });
    },

    methods: {
        calculateReadingTime(text: any): number {
            const wpm = 225;
            const words = text.trim().split(/\s+/).length;
            const time = Math.ceil(words / wpm);
            return time;
        },
        toggle(key: string): void {
            // @ts-ignore
            this[key] = !this[key];
        },
    },

    async asyncData({ $content, route }: { $content: any; route: any }): Promise<any> {
        let url = route.fullPath.slice(1);
        if (url.endsWith("/")) {
            url = url.slice(0, url.length - 2);
        }
        const page = await $content(route.fullPath.slice(1), {
            deep: true,
        }).fetch();
        return { page };
    },
});
</script>

<style lang="scss" scoped>
.toc {
    ul li,
    ul {
        padding: 0;
        margin: 0;
        list-style: none;
    }
    ul li a {
        text-decoration: none;
    }

    .link {
        transition: color 0.5s;
        line-height: 2rem;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        transition: 200ms all;
    }

    &--in-view {
        border-left: 0.25rem solid var(--theme-anchor);
        padding-left: 1rem;
        color: #ccc;
    }
}
</style>

<template>
    <div class="columns columns--tight">
        <template>
            <div class="column-8">
                <section class="panel m1 content-body">
                    <h3 id="title">{{ page.title }}</h3>
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
    transition: "fade",
    props: { directory: { type: String, default: () => "" } },

    data(): any {
        return {
            currentlyActiveToc: "",
            observer: null,
            observerOptions: {
                root: this.$refs.nuxtContent,
                threshold: 1,
            },
            toc: false,
            error: false,
            page: {} as any,
        };
    },

    beforeDestroy(): any {
        this.observer.disconnect();
    },

    mounted(): any {
        Prism.highlightAll();

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const id = entry.target.getAttribute("id");
                if (entry.isIntersecting) {
                    this.currentlyActiveToc = id;
                }
            });
        }, this.observerOptions);

        // Track all sections that have an `id` applied
        document.querySelectorAll(".nuxt-content h2[id], .nuxt-content h3[id] .nuxt-content h1[id]").forEach((section) => {
            this.observer.observe(section);
        });
    },

    head(): any {
        return {
            title: this.page.title,
            meta: [
                {
                    content: this.page.description,
                    description: this.page.description,
                },
            ],
        };
    },
    methods: {
        calculateReadingTime(text: any) {
            const wpm = 225;
            const words = text.trim().split(/\s+/).length;
            const time = Math.ceil(words / wpm);
            return time;
        },
        toggle(key: string) {
            // @ts-ignore
            this[key] = !this[key];
        },
    },

    async asyncData({ $content, route }) {
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

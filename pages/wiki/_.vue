<template>
    <div class="row">
        <div class="col-8">
            <article class="panel">
                <h3 id="title">{{ page.title }}</h3>
                <SpaceBetween size="m">
                    <div class="block theme-light-text flex-wrap justify-left tags">
                        <NuxtLink :to="'/wiki/tag/' + tag" class="flex" v-for="tag in page.tags || []" :key="tag">
                            <span>{{ tag }}</span>
                            <img class="icon-sm" src="/tag.svg" />
                        </NuxtLink>
                    </div>

                    <nuxt-content :document="page" />
                </SpaceBetween>
            </article>
        </div>

        <div class="col-4">
            <FloatingToc :mobile="true">
                <div class="sticky">
                    <div class="handle z200 handle--right-edge mobile-abs-top-10pc mobile-only" @click="toggle('toc')">
                        <img class="s2" src="/document.svg" />
                    </div>
                    <nav class="toc">
                        <ul class="nav-items">
                            <li v-for="item in page.toc" :key="item.id">
                                <a class="link" :href="'#' + item.id" :class="{ 'toc--in-view': item.id === currentlyActiveToc }">{{ item.text }}</a>
                            </li>
                        </ul>
                    </nav>
                    <h3>Tags</h3>
                    <div class="flex"><img class="icon-sm" src="/tag.svg" /></div>
                    <Tags :tags="tags"></Tags>
                </div>
            </FloatingToc>
        </div>
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
                threshold: 1,
            },
            toc: false,
            error: false,
            page: {} as any,
        };
    },

    beforeDestroy(): any {
        if (this.observer) {
            this.observer.disconnect();
        }
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
                },
            ],
        };
    },
    methods: {
        toggle(key: string) {
            // @ts-ignore
            this[key] = !this[key];
        },
    },

    async asyncData({ $content, route }) {
        if (route.path === "/wiki/") {
            return;
        }
        const page = await $content(route.fullPath.slice(1), { deep: true }).fetch();
        const tags = await $content("/wiki", { deep: true }).only(["tags"]).fetch();

        const _tags = new Set();

        var _counter: any = new Proxy(
            {},
            {
                get: (target: any, name) => (name in target ? target[name] : 0),
            }
        );
        tags.forEach((e: any) => {
            e.tags?.map((a: any) => {
                _tags.add(a);
                _counter[a] += 1;
            });
        });

        return { page, tags: _counter };
    },
});
</script>

<style lang="scss" scoped>
.tags {
    a:hover span {
        opacity: 0.5;
    }
}
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

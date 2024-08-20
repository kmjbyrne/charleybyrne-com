<template>
    <div class="row">
        <div class="col-12 print-container">
            <section class="content-body print-content">
                <h1 id="title">{{ page.title }}</h1>

                <p v-if="page.description">
                    {{ page.description }}
                </p>

                <div class="block theme-light-text m-tb-1 flex-wrap justify-left tags" v-if="page.tags">
                    <NuxtLink :to="'/recipes/tag/' + tag" v-for="tag in page.tags || []" :key="tag">
                        <CenterAlign>
                            <span>{{ tag }}</span>
                            <img class="icon-sm" src="/tag.svg" />
                        </CenterAlign>
                    </NuxtLink>
                </div>

                <p v-for="m in messages" :key="m">{{ m }}</p>

                <template>
                    <span>Category</span>
                    <span></span>
                    <NuxtLink :to="'/recipes/category/' + page.category.toLowerCase()">/ {{ page.category }}</NuxtLink>
                </template>

                <div class="row" v-if="page.cover && page.cover !== ''">
                    <div class="col">
                        <img class="cover" :src="page.cover" :alt="page.cover" />
                    </div>
                </div>

                <div class="icon-row">
                    <img class="icon-md" v-if="page.dietary?.sugar" src="/icons/sugar-free.svg" alt="Sugar free" />
                    <img class="icon-md" v-if="page.dietary?.dairy" src="/icons/dairy-free.svg" alt="Dairy free" />
                    <img class="icon-md" v-if="page.dietary?.gluten" src="/icons/gluten-free.svg" alt="Gluten free" />
                    <img class="icon-md" v-if="page.dietary?.vegan" src="/icons/vegan.svg" alt="Vegan friendly " />

                    <template v-if="page.keto || page.dietary?.keto">
                        <img class="icon-md" src="/checked.svg" alt="Keto friendly" />
                        <span>Keto friendly</span>
                    </template>
                </div>

                <div class="row" v-if="false">
                    <div class="col">
                        <div class="flex gap-1rem">
                            <!-- <ShareBadge :url="self" text=""></ShareBadge> -->
                            <!-- <ShareBadge :url="self" type="mailto"></ShareBadge> -->
                            <!-- <ShareBadge
                                :url="self"
                                type="facebook"
                            ></ShareBadge> -->
                            <!-- <ShareBadge
                                :url="self"
                                type="whatsapp"
                            ></ShareBadge> -->
                            <!-- <ShareBadge :url="self" type="telegram"></ShareBadge> -->
                        </div>
                    </div>
                </div>

                <article class="nuxt-content">
                    <Accordion :title="key" v-for="key in Object.keys(page.data || {}) || []" :key="key">
                        <ul>
                            <li v-for="elem in page.data[key]" :key="elem">
                                <span>{{ elem }}</span>
                            </li>
                        </ul>
                    </Accordion>
                    <nuxt-content :document="page"></nuxt-content>
                </article>
            </section>
        </div>
    </div>
</template>

<script lang="ts">
import Prism from "~/plugins/prism";

import Vue from "vue";

// Notes
// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API

export default Vue.extend({
    layout: "recipes",
    props: { directory: { type: String, default: () => "" } },

    data(): any {
        return {
            hostname: "",
            messages: [],
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
        const icons = ["", "/spinach.png", "/favicon.ico", "/vegetable.png", "/food-delivery.svg"];
        const favicon = icons[Math.floor(Math.random() * icons.length - 1) + 1];
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
            link: [{ rel: "icon", type: "image/x-icon", href: favicon }],
        };
    },

    computed: {
        self(): string {
            return `${this.hostname}${this.$route.fullPath}`;
        },
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
        async hasNavigatorShare() {
            if (process.client) {
                // return navigator !== undefined;
                return true;
            }
            return false;
        },
        getPageUrl(): string {
            return `${location.protocol}//${location.host}${this.page.path}`;
        },
        async copyLink() {
            await navigator.clipboard.writeText(this.getPageUrl());

            this.messages.push("Link copied to clipboard!");
            setTimeout(() => {
                this.messages = [];
            }, 2000);
        },
        async shareLink() {
            if (navigator.share) {
                await navigator.share({
                    title: this.page.title,
                    text: this.page.description,
                    url: this.getPageUrl(),
                });
            }
        },
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

    async asyncData({ $content, route }: { $content: any; route: any; req: any }): Promise<any> {
        let url = route.path;
        if (url.endsWith("/")) {
            url = url.replace(/\/$/, "");
        }

        const page = await $content(url, {
            deep: true,
        }).fetch();

        return { page };
    },
});
</script>

<style lang="scss" scoped>
table.nutrition {
    width: 180px;
    margin-top: 10px;
    margin-left: 0;
    margin-right: 0;
    border: 1px solid black;
    border-collapse: collapse;
    table-layout: auto;
}

.nutrition th {
    background-color: transparent;
    padding: 3px;
    border: 0;
    font-family: Arial;
    font-size: large;
    font-weight: bolder;
}

.nutrition td {
    padding: 3px;
    font-family: Arial;
    font-size: x-small;
    border: 0;
    border-bottom-color: currentcolor;
    border-bottom-style: none;
    border-bottom-width: 0px;
    border-bottom: 1px solid black;
    text-align: left;
}

table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
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

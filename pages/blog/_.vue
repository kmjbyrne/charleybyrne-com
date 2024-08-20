<template>
    <main class="container">
        <div class="drawer-mobile--overlay" v-if="open"></div>
        <div class="handle z500 handle--right-edge fixed-right mobile-fixed-bottom-10pc mobile-only" @click="toggle('open')">
            <img class="s2" src="/folder.svg" />
        </div>
        <div class="row text-center" v-if="isDraft">
            <div class="col-12">
                <ImageCircle>
                    <img class="icon-md" src="/wip.svg" />
                </ImageCircle>
                <p>Right now this article is doing its best &#128149;. Please be patient while the author stops procrastinating.</p>
                <p><a href="https://www.buymeacoffee.com/charleybyrne">Coffee helps!</a></p>
            </div>
        </div>
        <header class="row row--multiline">
            <div class="col-12">
                <template v-if="page.category">
                    <NuxtLink :to="'/blog/category/' + page.category.toLowerCase()">
                        <strong>/ {{ page.category }}</strong>
                    </NuxtLink>
                </template>
                <template v-if="page.section">
                    <NuxtLink :to="'/blog/category/' + page.category.toLowerCase() + '/' + page.section.toLowerCase()">
                        <strong>/ {{ page.section }}</strong>
                    </NuxtLink>
                </template>
                <h1 class="blog__headline capitalize">{{ page.title }}</h1>
            </div>

            <template v-if="page.images">
                <img class="icon-xl" v-for="img in page.images" :key="img" :src="img" />
            </template>
            <template v-if="page.image">
                <img class="desktop--grid icon-fill" :src="page.image" />
            </template>
        </header>

        <div class="col-12">
            <p class="blog__description">
                <i>{{ page.description }}</i>
            </p>
        </div>

        <div class="row row--multiline desktop--gap-8">
            <div class="col-8">
                <article class="panel">
                    <SpaceBetween size="s">
                        <div class="blog__description">
                            <time aria-label="Created On">
                                <span>
                                    <strong>Created</strong>
                                    {{ formatDatetime(page.createdAt) }}
                                </span>
                            </time>
                            <span style="margin: 0rem 0.5rem">|</span>
                            <time aria-label="Updated On">
                                <span>
                                    <strong>Updated</strong>
                                    {{ formatDatetime(page.updatedAt) }}
                                </span>
                            </time>
                            <span style="margin: 0rem 0.5rem">|</span>
                            <NuxtLink :to="'/blog/category/' + page.category.toLowerCase()">
                                <strong>{{ page.category }}</strong>
                            </NuxtLink>
                        </div>

                        <div class="blog__tag">
                            <NuxtLink :to="'/blog/tag/' + tag" v-for="tag in [...page.tags]" :key="tag">
                                <CenterAlign>
                                    <span>{{ tag }}</span>
                                    <img class="icon-sm" src="/tag.svg" />
                                </CenterAlign>
                            </NuxtLink>
                        </div>

                        <div class="row justify-between">
                            <div class="col-6">
                                <div class="flex gap-1rem">
                                    <ShareBadge :url="page.path" text=""></ShareBadge>
                                    <ShareBadge :url="page.path" type="mailto"></ShareBadge>
                                    <ShareBadge :url="page.path" type="facebook"></ShareBadge>
                                    <ShareBadge :url="page.path" type="whatsapp"></ShareBadge>
                                    <ShareBadge :url="page.path" type="telegram" :text="page.description"></ShareBadge>
                                </div>
                            </div>
                        </div>
                    </SpaceBetween>
                    <nuxt-content :document="page"></nuxt-content>
                    <Disqus identifier="" url="" :title="page.title" />
                </article>
            </div>

            <!-- <Comments /> -->

            <aside class="col-4 right-side">
                <section class="panel panel--mobile drawer-mobile mobile-fixed-left z100 mobile-fixed-top mobile-h100 mobile-sticky-top-0" :class="open ? 'drawer-mobile--open' : ''">
                    <!-- <section class="sticky"> -->
                    <div class="blog__section">
                        <div class="flex">
                            <h2>On This Page</h2>
                            <img class="icon-sm" src="/toc.svg" />
                            <span></span>
                        </div>

                        <ul class="blog__toc">
                            <li v-for="item in page.toc" :key="item.id">
                                <a :href="'#' + item.id">
                                    {{ item.text }}
                                </a>
                            </li>
                        </ul>
                    </div>

                    <h2>Tags</h2>

                    <h2>Recent Posts</h2>
                    <ul class="blog__toc">
                        <SpaceBetween size="l">
                            <li v-for="item in files" :key="item.id">
                                <NuxtLink :to="item.path">
                                    <div class="row row--tight justify-between">
                                        <!-- <div class="grid-12 flex">
                                                <template v-if="item.images">
                                                    <img class="icon-sm" v-for="img in item.images" :key="img" :src="img" />
                                                </template>
                                                <template v-if="item.image">
                                                    <img class="icon-fill" :src="item.image" />
                                                </template>
                                            </div> -->
                                        <div class="col-12 capitalize">
                                            <h4>{{ item.title }}</h4>
                                        </div>
                                    </div>
                                    <span>
                                        <sub>
                                            <i>{{ item.description }}</i>
                                        </sub>
                                    </span>
                                </NuxtLink>
                            </li>
                        </SpaceBetween>
                    </ul>
                </section>
            </aside>
        </div>
    </main>
</template>

<script lang="ts">
import Prism from "~/plugins/prism";

import Vue from "vue";

export default Vue.extend({
    props: { directory: { type: String, default: () => "" } },
    mounted() {
        Prism.highlightAll();
    },

    computed: {
        isDraft(): boolean {
            return this.page.public === false;
        },
        hasDraftQuery(): boolean {
            return this.$route.query.public === "true";
        },
    },

    methods: {
        toggle(key: string) {
            // @ts-ignore
            this[key] = !this[key];
        },
        formatDatetime(date: Date) {
            const _date = new Date(date).toLocaleDateString("en-gb", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });
            const _time = new Date(date).toLocaleTimeString("en-gb", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
            });
            return `${_date} ${_time}`;
        },
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
            open: false,
        };
    },

    async asyncData({ $content, route }) {
        let path = route.path;
        if (path.endsWith("/")) {
            path = path.replace(/\/$/, "");
        }
        const page = await $content(path).fetch();
        const files = await $content("/blog", { deep: true }).without(["content"]).limit(5).fetch();

        return { files, page: page };
    },
});
</script>

<style lang="scss" scoped>
.blog {
    ul {
        padding: 0;
        margin: 0;
    }

    &__headline {
        font-size: 3rem;
    }

    h2:first-child {
        margin-top: 0;
    }
    &__section {
        h2:first-child {
            margin: 0;
        }
    }

    &__description {
        opacity: 0.5;
        font-size: 0.85rem;
    }

    &__toc {
        padding: 1rem 0;
        list-style: none;

        a {
            color: inherit;
        }
    }
}

.right-side {
    *,
    h1,
    h2,
    h3,
    h4,
    h5 {
        font-size: 0.85rem;
    }
}

.blog-content {
    background-color: white;
    border: 1px solid #ccc;
    padding: 3rem;
    border-radius: 2px;
}
</style>

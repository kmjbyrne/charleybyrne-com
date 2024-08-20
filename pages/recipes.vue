<template>
    <main id="recipes" class="recipes container-sm" v-if="!$fetchState.pending">
        <div class="drawer-mobile--overlay" v-if="open"></div>
        <div class="handle z500 handle--right-edge fixed-right mobile-fixed-bottom-10pc mobile-only" @click="toggle('open')">
            <img class="s2" src="/folder.svg" />
        </div>
        <div class="row">
            <div class="col-12">
                <NuxtChild keep-alive :key="$route.fullPath"></NuxtChild>
            </div>
        </div>
        <div class="row row--mobile justify-between no-print" id="tags">
            <div class="col">
                <NuxtLink class="flex align-center" to="/recipes/tags">
                    <span>View Tags</span>
                    <img class="icon-sm" src="/tag.svg" />
                </NuxtLink>
            </div>
            <div class="col">
                <div class="line-p">
                    <div class="line"></div>
                    <div class="line"></div>
                </div>
            </div>
            <div class="col text-right">
                <NuxtLink class="flex align-center justify-right" to="/recipes/search">
                    <img class="icon-sm" src="/recipe.svg" />
                    <span>Search All</span>
                </NuxtLink>

                <!-- <h3>Tags</h3> -->
                <!-- <div class="flex flex-wrap">
                    <NuxtLink :to="'/recipes/tag/' + key" v-for="[key, count] in Object.entries(tags)" :key="key">
                        <CenterAlign>
                            <span>{{ key }} [{{ count }}]</span>
                            <img class="icon-sm" src="/tag.svg" />
                        </CenterAlign>
                    </NuxtLink>
                </div> -->
            </div>
        </div>
    </main>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: {
        directory: { type: String },
        auto: { type: Boolean, default: false },
    },

    methods: {
        toggle(key: string) {
            this[key] = !this[key];
        },
    },

    data(): any {
        return {
            open: false,
            parent: "",
            categories: [],
            files: [] as any,
            search: "",
            tags: [],
        };
    },

    async fetch() {
        this.files = await this.$content("/recipes", { deep: true }).without(["body"]).fetch();
        this.categories = this.files.reduce((acc: any, e: any) => {
            return { ...acc, [e.category]: [] };
        });

        const tags = await this.$content("/recipes", { deep: true }).only(["tags"]).fetch();
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

        this.tags = _counter;
    },
});
</script>

<style lang="scss">
@include from-large {
    .mobile-sticky-top-0 {
        position: sticky;
        top: 0;
        width: 100%;
    }
}

.recipes {
    position: relative;
    padding-top: 2rem;
    padding-left: 2rem;
    padding-right: 2rem;
    @include from-large {
        padding-left: 0;
        padding-right: 0;
    }
}

.form-element {
    padding: 0.5rem 1rem;
    box-shadow: 1px 1px 1px #ccc;
    box-sizing: border-box;
    outline: none;
}

#directory span,
#tags span {
    font-size: 0.75rem;
}
</style>

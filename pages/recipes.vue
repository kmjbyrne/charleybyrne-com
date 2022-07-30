<template>
    <main class="container-fluid">
        <div class="drawer-mobile--overlay" v-if="open"></div>
        <div class="handle z500 handle--right-edge fixed-right mobile-fixed-bottom-10pc mobile-only" @click="toggle('open')">
            <img class="s2" src="/folder.svg" />
        </div>
        <div class="columns columns--tight">
            <div class="column-3">
                <div class="drawer-mobile p1 mobile-fixed-left z100 mobile-fixed-top mobile-h100 mobile-sticky-top-0" :class="open ? 'drawer-mobile--open' : ''">
                    <div class="panel">
                        <h3>Directory</h3>
                        <Directory :directory="files"></Directory>
                    </div>
                </div>
            </div>
            <div class="column-9">
                <NuxtChild keep-alive :key="$route.fullPath"></NuxtChild>
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
        };
    },

    async fetch() {
        // this.$config.title = "Charley Byrne [Recipes]";
        this.parent = this.$route.path.split("/").slice(1, 2).pop()?.toString() || "";
        this.files = await this.$content(this.parent, { deep: true }).without(["body"]).fetch();
        this.categories = this.files.reduce((acc: any, e: any) => {
            return { ...acc, [e.category]: [] };
        });
    },
});
</script>

<style lang="scss">
@import "@snapatoms/ui/styles/helpers";

@include from-large {
    .mobile-sticky-top-0 {
        position: sticky;
        top: 0;
    }
}

.form-element {
    padding: 0.5rem 1rem;
    box-shadow: 1px 1px 1px #ccc;
    box-sizing: border-box;
    outline: none;
}
</style>

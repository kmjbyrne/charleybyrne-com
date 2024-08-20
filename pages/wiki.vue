<template>
    <main class="wiki">
        <div class="handle z500 handle--right-edge fixed-right mobile-fixed-bottom-10pc mobile-only" @click="toggle('open')">
            <img class="s2" src="/folder.svg" />
        </div>
        <div class="row">
            <div class="col-3 drawer-desktop" :class="setStyles()">
                <div class="p2">
                    <template v-if="files">
                        <h3>Directory</h3>
                        <Directory :directory="files"></Directory>
                    </template>
                </div>
            </div>
            <div class="col-9">
                <div class="p2">
                    <NuxtChild :key="$route.path"></NuxtChild>
                </div>
            </div>
        </div>
    </main>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    layout: "wiki",
    props: {
        directory: { type: String },
        auto: { type: Boolean, default: false },
    },

    methods: {
        toggle(key: string) {
            this[key] = !this[key];
        },
        setStyles() {
            return this.open ? "drawer-mobile--open panel" : "";
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

    async asyncData({ route, $content }) {
        const parent = route.path.split("/").slice(1, 2).pop()?.toString() || "";
        const files = await $content(parent, { deep: true }).without(["body"]).fetch();

        return {
            parent,
            files,
            categories: {},
        };
    },
});
</script>

<style lang="scss">
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

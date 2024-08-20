<template>
    <main>
        <NuxtLink :to="item.path" v-for="item in files" :key="item.title"></NuxtLink>
        <NuxtChild keep-alive :key="$route.fullPath"></NuxtChild>
    </main>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    data(): any {
        return {
            files: [],
        };
    },
    async asyncData({ $content }) {
        const files = await $content("/blog", { deep: true }).without(["body"]).fetch();

        return {
            files,
            categories: {},
        };
    },
});
</script>

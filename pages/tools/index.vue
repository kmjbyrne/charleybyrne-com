<template>
    <div class="container">
        <h1>Available Tools</h1>
        <div class="row">
            <div class="col-4" v-for="tool in tools" :key="tool.name">
                <NuxtLink :to="tool.path">
                    <div class="panel">{{ tool.path }}</div>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    data() {
        return {
            tools: [],
        };
    },
    async fetch() {
        // @ts-ignore
        this.tools = this.$router.options.routes.filter((route: any) => {
            if (route.path.includes("/tools/")) {
                return route;
            }
        });
    },
});
</script>

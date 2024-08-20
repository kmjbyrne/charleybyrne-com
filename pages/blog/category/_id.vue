<template>
    <main>
        <div class="container">
            <h2>Articles</h2>
            <p>Categorized as {{ $route.params.id }}</p>

            <div class="row row--multiline">
                <div class="col-1" v-for="category in categories" :key="category">
                    <a :href="'/blog/category/' + category.toLowerCase()">
                        <i>{{ category }}</i>
                    </a>
                </div>
            </div>

            <div class="row row--multiline">
                <div class="col-4" v-for="item in items" :key="item.title">
                    <NuxtLink :to="'/blog/' + item.slug">
                        <img :src="item.image" />
                    </NuxtLink>
                    <sub>{{ item.description }}</sub>
                </div>
            </div>
        </div>
    </main>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    data(): any {
        return { items: [] };
    },
    computed: {
        categories(): Set<string> {
            return new Set(this.items.map((e: any) => e.category));
        },
    },
    async asyncData({ $content, route }) {
        const items = await $content("/blog", { deep: true })
            .without(["content"])
            .sortBy("createdAt", "desc")
            .where({ category: { $regex: [route.params.id, "i"] }, draft: { $ne: true } })
            .fetch();

        return { items };
    },
});
</script>

<style lang="scss" scoped>
img {
    width: 100%;
    height: 12rem;
}
</style>

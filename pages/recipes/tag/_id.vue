<template>
    <div>
        <ul class="article">
            <li v-for="item in articles" :key="item.slug">
                <nuxt-link :to="item.path">{{ item.title }}</nuxt-link>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    data(): any {
        return {};
    },
    async asyncData({ $content, route }) {
        const articles = await $content("/recipes", { deep: true })
            .where({ tags: { $containsAny: [route.params.id] } })
            .fetch();
        return { articles };
    },
});
</script>

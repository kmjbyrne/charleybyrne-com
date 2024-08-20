<template>
    <div class="">
        <h2>
            <span>Recipes</span>
        </h2>
        <CenterAlign>
            <span>Showing all recipes with [{{ $route.params.category }}] category</span>
            <img class="icon-sm" src="/tag.svg" />
        </CenterAlign>
        <ul>
            <li v-for="item in articles" :key="item.slug">
                <NuxtLink :to="item.path">
                    <RecipeItem :name="item.title" :desc="item.description" :image="item.image" fallback="/recipe.svg">
                        <NuxtLink :to="'/recipes/tag/' + tag" v-for="tag in item.tags || []" :key="tag">
                            <CenterAlign>
                                <span>{{ tag }}</span>
                                <img class="icon-sm" src="/tag.svg" />
                            </CenterAlign>
                        </NuxtLink>
                    </RecipeItem>
                </NuxtLink>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    data(): any {
        return [];
    },
    async asyncData({ $content, route }) {
        const category = route.params.category.substring(0, 1).toUpperCase() + route.params.category.substring(1);
        const articles = await $content("/recipes", { deep: true })
            .without(["content"])
            .where({ category: { $in: [category, route.params.category] } })
            .fetch();
        return { articles };
    },
});
</script>

<style lang="scss" scoped>
ul {
    margin: 2rem 0;
    padding: 0;
    h4 {
        margin: 0;
    }
}
.articles {
    margin: 1rem 0;
}
.icon-tag {
    padding: 1rem 1rem 1rem 0;
}
ul li {
    list-style: none;
}
ul li {
    margin: 1rem 0;
}
.articles > li {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    margin: 0.5rem 0;
    padding: 0.5rem 0;
    transition: border 200ms;
    &:hover {
        border-color: transparent;
    }
}
.listing {
    &__metadata {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    &__tags {
        display: flex;
        font-size: 0.75rem;
        i {
            // margin-right: 0.5rem;
        }
    }
}
</style>

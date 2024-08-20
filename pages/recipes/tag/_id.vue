<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <h2>
                    <span>Recipes</span>
                </h2>
                <CenterAlign>
                    <span>Showing all recipes tagged with [{{ $route.params.id }}]</span>
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
        </div>
        <div class="row" id="tags">
            <div class="col">
                <h3>All Tags</h3>

                <div class="flex flex-wrap">
                    <NuxtLink :to="'/recipes/tag/' + key" v-for="[key, count] in Object.entries(tags)" :key="key">
                        <CenterAlign>
                            <span>{{ key }} [{{ count }}]</span>
                            <img class="icon-sm" src="/tag.svg" />
                        </CenterAlign>
                    </NuxtLink>
                </div>
            </div>
        </div>
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
            .without(["content"])
            .where({ tags: { $containsAny: [route.params.id] } })
            .fetch();

        let tags = await $content("/recipes", { deep: true }).only(["tags"]).fetch();
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

        tags = _counter;

        return { articles, tags, _tags };
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

<template>
    <section class="">
        <h1>Recipes</h1>
        <input class="search" type="text" v-model="search" placeholder="Search recipes" />

        <div class="row is-multiline">
            <NuxtLink :to="r.path" class="col-4 hover-fade" v-for="r in filteredDirectory" :key="r.slug">
                <RecipeItem :name="r.title" :desc="r.description" :image="r.image" fallback="/recipe.svg">
                    <p>
                        <NuxtLink :to="'/recipes/tag/' + tag" v-for="tag in r.tags || []" :key="tag">
                            <CenterAlign>
                                <span>{{ tag }}</span>
                                <img class="icon-sm" src="/tag.svg" />
                            </CenterAlign>
                        </NuxtLink>
                    </p>
                </RecipeItem>
            </NuxtLink>
        </div>
    </section>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    data(): any {
        return { recipes: [], search: "", filterDirectory: [] };
    },

    computed: {
        filteredDirectory: function (): Array<any> {
            // @ts-ignore
            let files: any[] = this["recipes"];
            // @ts-ignore
            if (this["search"] !== "") {
                // @ts-ignore
                files = this["recipes"].filter((e: any) =>
                    // @ts-ignore
                    e.title.toLowerCase().includes(this["search"].toLowerCase())
                );
            }
            // @ts-ignore
            if (this["category"] && this["category"] !== "default") {
                // @ts-ignore
                files = files.filter((e: any) =>
                    e.category
                        .toLowerCase()
                        // @ts-ignore
                        .includes(this["category"].toLowerCase())
                );
            }
            // @ts-ignore
            return files.sort((a: any, b: any) => this["comparator"](a, b, "title"));
        },
    },

    methods: {
        comparator(a: any, b: any, key: string): number {
            if (!b) {
                return 0;
            }
            if (a[key].toLowerCase() > b[key].toLowerCase()) {
                return 1;
            } else if (a[key].toLowerCase() < b[key].toLowerCase()) {
                return -1;
            }
            return 0;
        },
        getPath(e: any): string {
            return `${e.path}`;
        },
    },

    async asyncData({ $content }) {
        return {
            recipes: await $content("/recipes", {
                deep: true,
            })
                .without(["content"])
                .fetch(),
        };
    },
});
</script>
<style lang="scss">
.search,
.dropdown {
    border: none;
    outline: none;
    padding: 0.5rem 0;
    margin-bottom: 0.5rem;
    color: grey;
    flex: 1;
    background-color: transparent;
}
.search {
    font-style: italic;
}

.recipe {
    border-bottom: 1px dashed #ccc;
    padding: 0.5rem 0;
    // border-top: 1px dashed #ccc;
}
</style>

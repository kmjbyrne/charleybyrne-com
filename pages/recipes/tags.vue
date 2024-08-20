<template>
    <section class="" v-if="!$fetchState.pending">
        <h1>Search</h1>
        <input class="search" type="text" v-model="search" placeholder="Search tags" />
        <h3>Tags</h3>
        <div class="flex flex-wrap" id="tags">
            <NuxtLink :to="'/recipes/tag/' + key" v-for="[key, count] in Object.entries(computedTags) || []" :key="key">
                <CenterAlign>
                    <span>{{ key }} [{{ count }}]</span>
                    <img class="icon-sm" src="/tag.svg" />
                </CenterAlign>
            </NuxtLink>
        </div>
    </section>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    data(): any {
        const tags: any[] = [];
        return {
            parent: "",
            files: [] as any,
            search: "",
            tags: tags,
        };
    },

    computed: {
        computedTags(): any[] {
            let files = [] as any;
            if (this.search !== "") {
                Object.keys(this.tags).forEach((key: string) => {
                    if (key.toLowerCase().includes(this.search.toLowerCase())) {
                        files[key] = this.tags[key] as any;
                    }
                });
            } else {
                return this.tags;
            }
            return files;
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
    },

    async fetch() {
        this.tags = [];
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

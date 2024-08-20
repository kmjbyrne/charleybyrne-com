<template>
    <section class="directory">
        <div>
            <input class="search" type="text" v-model="search" placeholder="Search files" />
        </div>
        <select class="search" type="text" v-model="categorySearch">
            <option :selected="true" value="">Select Category</option>
            <option v-for="category in getCategories" :key="category" :value="category">{{ category }}</option>
            <option :selected="true" value="">-- None --</option>
        </select>

        <ul class="directory-items">
            <li v-for="item in filteredDirectory" :key="item.path">
                <nuxt-link class="link" :to="item.path">
                    <span>{{ item.title }}</span>
                    <span class="side-text">[{{ item.category }}]</span>
                </nuxt-link>
            </li>
        </ul>
    </section>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    props: {
        directory: { type: Array, default: () => [] },
        prefix: { type: String },
        label: { type: String, default: "Directory" },
    },
    data(): any {
        return {
            search: "",
            categorySearch: "",
            categories: undefined,
            category: "default",
        };
    },
    computed: {
        getCategories: function () {
            const categories = this.directory.map((file: any) => {
                return file.category;
            });
            return Array.from(new Set(categories)).sort();
        },
        filteredDirectory: function (): Array<any> {
            // @ts-ignore
            let files: any[] = this["directory"];
            // @ts-ignore
            if (this["search"] !== "") {
                // @ts-ignore
                files = this["directory"].filter((e: any) =>
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
            const preCategory = files.sort((a: any, b: any) => this["comparator"](a, b, "title"));
            if (this.categorySearch !== "") {
                return preCategory.filter((file: any) => {
                    return file.category === this.categorySearch;
                });
            }
            return preCategory;
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
});
</script>

<style lang="scss" scoped>
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
.dropdown {
    background-color: transparent;
}
.directory-items {
    padding: 0;
    margin: 0;

    li {
        list-style-type: none;
    }
    li a {
        display: block;
        text-decoration: none;
        color: inherit;
        // line-height: 2rem;

        &:hover {
            color: grey;
        }
    }
}
.side-text {
    font-style: italic;
    color: rgb(126, 126, 126);
}
</style>

<template>
    <section>
        <input class="x-form-control" type="text" v-model="search" placeholder="Filter tags ..." />
        <div class="nav-items flex flex-wrap pad-all-right text-italic">
            <div class="flex-1" v-for="key in filteredTags" :key="key">
                <NuxtLink :to="'/wiki/tag/' + key">{{ key }} [{{ tags[key] }}]</NuxtLink>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    props: ["tags"],
    data() {
        return {
            search: "",
        };
    },
    computed: {
        filteredTags(): string[] {
            if (this.search) {
                return Object.keys(this.tags).filter((key: string) => {
                    return key.includes(this.search.toLowerCase());
                });
            }
            return Object.keys(this.tags);
        },
    },
});
</script>

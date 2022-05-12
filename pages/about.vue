<template>
    <section class="container-sm">
        <div class="columns">
            <div class="column">
                <ContentBlock :title="page.title" :key="$route.fullPath">
                    <nuxt-content :document="page" />
                </ContentBlock>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    data() {
        return { page: {} };
    },
    async fetch() {
        this.page = await this.$content("bio").fetch();
    },
});
</script>

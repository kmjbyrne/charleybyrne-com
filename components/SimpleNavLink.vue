<template>
    <NuxtLink class="simple-nav-link" :to="link" :hidden="hidden"><slot></slot></NuxtLink>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    props: ["link", "label", "hidden"],
});
</script>

<style lang="scss" scoped>
.simple-nav-link {
    text-decoration: none;
    color: inherit;
    display: block;
    padding: 1.25rem;

    &:hover {
        color: grey;
    }
}
</style>

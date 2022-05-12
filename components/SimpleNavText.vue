<template>
    <span class="simple-nav-text"><slot></slot></span>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    props: ["link", "label"],
});
</script>

<style lang="scss" scoped>
.simple-nav-text {
    text-decoration: none;
    color: inherit;
    display: block;
    padding: 1.25rem;

    &:hover {
        cursor: default;
    }
}
</style>

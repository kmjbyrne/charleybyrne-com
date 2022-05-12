<template>
    <li class="simple-nav-item" v-if="!hidden"><slot></slot></li>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    name: "SimpleNavItem",
    props: ["link", "label", "hidden"],
});
</script>

<style lang="scss" scoped>
.simple-nav-item {
    list-style: none;
}
</style>

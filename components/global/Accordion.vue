<template>
    <div class="x-accordion" @click="toggle()" :class="{ 'x-accordion--collapse': collapse }">
        <h2>{{ title }}</h2>
        <slot />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    props: ["title"],
    data() {
        return {
            collapse: false,
        };
    },
    methods: {
        toggle() {
            this.collapse = !this.collapse;
        },
    },
});
</script>

<style lang="scss">
.x-accordion {
    & > h2 {
        position: relative;
        text-transform: capitalize;
    }
    & > h2::after {
        content: "\002B";
        position: absolute;
        color: #888;
        margin: 0 1rem;
        transform: rotate(45deg);
        transition: transform 300ms;
        transform-origin: center;
    }
    &--collapse {
        & > h2::after {
            transform: rotate(360deg);
            color: #c9c9c9;
        }
        & > ul,
        & > div {
            max-height: 0;
            overflow: hidden;
        }
    }
    ul {
        padding-left: 1rem;
    }
}
</style>

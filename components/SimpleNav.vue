<template>
    <nav class="simple-nav">
        <div class="simple-nav__inner">
            <slot></slot>
        </div>
    </nav>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    name: "SimpleNav",
});
</script>

<style lang="scss" scoped>
.simple-nav {
    top: 0;
    width: 100%;
    // overflow: hidden;
    // position: sticky;
    border-bottom: 1px solid #cecece;
    background-color: rgb(243, 243, 243);
    z-index: 100;

    &__inner {
        display: flex;
        margin: 0 1rem;
        padding: 0;
        flex-direction: row;
        justify-content: space-between;
    }
}
</style>

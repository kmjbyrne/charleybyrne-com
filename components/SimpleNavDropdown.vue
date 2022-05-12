<template>
    <div class="simple-nav-dropdown">
        <div class="simple-nav-dropdown__label" @click="toggle()">
            <SimpleNavText><slot name="label"></slot></SimpleNavText>
        </div>
        <ul class="simple-nav-dropdown__items">
            <slot name="items"></slot>
        </ul>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    methods: {
        toggle() {
            this.$el.classList.toggle("simple-nav-dropdown--toggle");
        },
    },
});
</script>

<style lang="scss" scoped>
.simple-nav-dropdown {
    position: relative;

    &__items {
        display: none;
        position: absolute;
        background-color: #f9f9f9;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        padding: 12px 16px;
        z-index: 1;
        top: 100%;
        padding: 0.5rem 0 0 0;
        border: 1px solid #ccc;
    }

    &__label::after {
        content: "\25BE";
        position: absolute;
        right: 0;
        color: #ccc;
        position: absolute;
        top: 50%;
        font-family: Cambria, sans-serif;
        transform: translateY(-50%);
        transition: 200ms all;
    }

    &--toggle > &__label::after,
    &:hover > &__label::after {
        content: "\2212";
        transform: translateY(-50%) rotate(180deg);
    }

    &--toggle > &__items,
    &:hover > &__items {
        display: block !important;
    }
}
</style>

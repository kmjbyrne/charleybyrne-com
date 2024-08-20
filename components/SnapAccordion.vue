<template>
    <div class="accordion">
        <h2 class="accordion__heading" @click="toggle()">{{ title }}</h2>
        <div class="accordion__items">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    props: ["title"],
    methods: {
        toggle() {
            this.$el.classList.toggle("accordion--toggle");
        },
    },
});
</script>

<style lang="scss" scoped>
.accordion {
    overflow: hidden;

    &__heading {
        position: relative;
    }

    &__heading::after {
        content: "\002B";
        right: 0rem;
        transform: rotate(90deg);
        transition: 0.3s transform;
        position: absolute;
        top: 50%;
        color: #ccc;
        transform: translateY(-50%) rotate(0deg);
    }

    &__items {
        transition: all 200ms;
        max-height: 0;
    }

    &--toggle &__items {
        opacity: 1;
        max-height: 1000px;
        transition: all 200ms;
    }

    &--toggle &__heading::after {
        content: "\2212";
        color: rgb(104, 104, 104);
        transform: translateY(-50%) rotate(180deg);
    }

    @include from-large() {
        &__items {
            transition: all 200ms;
            max-height: 1000px;
        }

        &--toggle &__items {
            max-height: 0;
            transition: all 200ms;
        }

        &__heading::after {
            content: "\2212";
        }

        &--toggle &__heading::after {
            content: "\002B";
            color: rgb(104, 104, 104);
            transform: translateY(-50%) rotate(180deg);
        }
    }
}
</style>

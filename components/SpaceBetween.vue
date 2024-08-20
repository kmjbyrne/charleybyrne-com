<template>
    <div class="space-between"><slot></slot></div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    props: {
        size: {
            type: String,
            default: "m",
            validator: (value: string) => {
                return ["s", "m", "l", "xl"].includes(value);
            },
        },
    },
    mounted() {
        this.$el.classList.add(`space-between--size-${this.size}`);
    },
});
</script>

<style lang="scss" scoped>
.space-between {
    width: 100%;
    display: inherit;

    > * {
        margin-top: 1rem;
        margin-bottom: 1rem;
    }

    &--size-s > * {
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
    }
    &--size-m > * {
        margin-top: 1rem;
        margin-bottom: 1rem;
    }
    &--size-l > * {
        margin-top: 2rem;
        margin-bottom: 2rem;
    }
    &--size-xl > * {
        margin-top: 3rem;
        margin-bottom: 3rem;
    }
}
</style>

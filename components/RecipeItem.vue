<template>
    <div class="recipe-item">
        <!-- <img v-if="image" class="recipe-item__image" :src="image" /> -->
        <!-- <img v-else class="recipe-item__fallback" :src="fallback" /> -->
        <h3 class="recipe-item__name">{{ name }}</h3>
        <div class="recipe-item__desc">
            <p>{{ desc }}</p>
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    props: ["name", "desc", "image", "fallback"],
});
</script>

<style lang="scss" scoped>
.recipe-item {
    &__image {
        max-height: 12rem;
        width: 100%;
        box-shadow: 0 0 3px #646464;
        border: 0.01rem solid #7b7b7b;
    }
    &__name {
        font-size: 0.85rem;
    }
    &__fallback {
        display: block;
        // margin: auto;
        text-align: center;
        width: 4rem;
    }
    &__tags,
    &__desc {
        font-size: 0.75rem;
    }
}
</style>

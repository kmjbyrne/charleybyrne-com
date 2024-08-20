<template>
    <div class="floaty-toc" :class="{ 'floaty-toc--is-mobile': mobile }">
        <div class="floaty-toc__header" @click="show()">
            <h3>On This Page</h3>
        </div>
        <div class="floaty-toc__slot" :class="{ 'floaty-toc--show': isShow }">
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    props: ["mobile"],
    data() {
        return {
            isShow: false,
        };
    },
    methods: {
        show() {
            this.isShow = !this.isShow;
        },
    },
});
</script>

<style lang="scss">
// .floaty-toc {
//     position: fixed;
//     overflow: hidden;
//     z-index: 999;

//     &--is-mobile {
//         position: inherit;
//         @include responsive("large", "max") {
//             position: fixed;
//             left: 0;
//             right: 0;
//             margin: auto;
//             top: 0;
//             padding: 1rem 2rem;
//             background-color: white;
//             border: 1px solid #ccc;
//             border-radius: 1rem;
//             margin: 2rem;
//         }
//     }

//     &--is-mobile &__slot {
//         @include responsive("large", "max") {
//             max-height: 0;
//         }
//     }

//     &--is-mobile &--show {
//         @include responsive("large", "max") {
//             max-height: none;
//         }
//     }
// }
//
</style>

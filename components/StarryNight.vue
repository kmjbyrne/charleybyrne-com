<template>
    <div class="starry-night-container">
        <div v-for="idx in iters" :key="idx" :class="setup(idx)"></div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    props: {
        density: {
            type: Number,
            default: 1,
            validator: (value: any) => {
                const valid = value < 4;
                if (!valid) {
                    console.error("Density prop value invalid. Must be less than 3.");
                }
                return valid;
            },
        },
    },
    data() {
        return { iters: [...Array(this.density).keys()] };
    },
    methods: {
        setup(idx: number) {
            const key = `stars-${idx}`;
            return key;
        },
    },
});
</script>

<style lang="scss" scoped>
.starry-night-container {
    display: block;
    position: fixed;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, #201c2f 0%, #100751 100%);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    background: #005aa7; /* fallback for old browsers */
    background: -webkit-linear-gradient(to bottom, #005aa7, #100751); /* Chrome 10-25, Safari 5.1-6 */
    // background: linear-gradient(to bottom, #100751, #3d3403); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    background: linear-gradient(to bottom, #05021c, #03073d); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

// Animated stars

$starFieldWidth: 2560;
$starFieldHeight: 2560;
$starStartOffset: 600px;

$starOneScrollDuration: 500s;
$starTwoScrollDuration: 1000s;
$starThreeScrollDuration: 2000s;
$numStarOneStars: 1700;
$numStarTwoStars: 700;
$numStarThreeStars: 200;
$numComet: 10;

@function create-stars($n) {
    $stars: "#{random($starFieldWidth)}px #{random($starFieldHeight)}px #FFF";

    @for $i from 2 through $n {
        $stars: "#{$stars} , #{random($starFieldWidth)}px #{random($starFieldHeight)}px #FFF";
    }
    @return unquote($stars);
}

@keyframes animate-star {
    from {
        transform: translateY(0px);
    }
    to {
        transform: translateY(-#{$starFieldHeight}px) translateX(-#{$starFieldWidth}px);
    }
}

@mixin star-template($numStars, $starSize, $scrollSpeed) {
    z-index: 10;
    width: $starSize;
    height: $starSize;
    border-radius: 50%;
    background: transparent;
    box-shadow: create-stars($numStars);
    animation: animate-star $scrollSpeed linear infinite;
    &:after {
        content: " ";
        top: -$starStartOffset;
        width: $starSize;
        height: $starSize;
        border-radius: 50%;
        position: absolute;
        background: transparent;
        box-shadow: create-stars($numStars);
    }
}

.stars-0 {
    @include star-template($numStarOneStars, 1px, $starOneScrollDuration);
}
.stars-1 {
    @include star-template($numStarTwoStars, 2px, $starTwoScrollDuration);
}
.stars-2 {
    @include star-template($numStarThreeStars, 3px, $starThreeScrollDuration);
}
.stars-3 {
    @include star-template($numStarThreeStars, 4px, $starThreeScrollDuration);
}
.stars-4 {
    @include star-template($numStarThreeStars, 5px, $starThreeScrollDuration);
}
</style>

<template>
    <StarryNight :density="3"></StarryNight>
</template>

<script lang="ts">
import Vue from "vue";
import StarryNight from "~/components/StarryNight.vue";
export default Vue.extend({
    components: { StarryNight },
    layout: "blank",
});
</script>

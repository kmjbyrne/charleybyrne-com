<template>
    <ul class="simple-nav-group">
        <slot></slot>
    </ul>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    name: "SimpleNavGroup",
});
</script>
<style lang="scss" scoped>
.simple-nav-group {
    display: flex;
    flex-direction: row;
    padding: 0;
    margin: 0;
}
</style>

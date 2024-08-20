<template>
    <textarea class="x-form-textarea" @input="$emit('input', $event.target.value)"></textarea>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    data() {
        return {};
    },
});
</script>

<style lang="scss">
.x-form-textarea {
    font-family: Menlo, Monaco, Consolas, "Andale Mono", "Ubuntu Mono", "Courier New", monospace;
    resize: none;
    margin: 1rem 0;
    height: 300px;
    width: 100%;
    max-width: 100%;
    outline: none;
    border: 1px solid #ccc;
    border-radius: 0;
}
</style>

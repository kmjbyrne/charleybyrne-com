<template>
    <div class="search-table">
        <input type="text" v-model="search" />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    data() {
        return {
            search: "",
        };
    },
    mounted() {},
});
</script>

<template>
    <div class="mermaid">
        <slot></slot>
    </div>
</template>

<script lang="js">
export default {
    mounted() {
        // import("mermaid/dist/mermaid").then((m) => {
        //     m.initialize({
        //         startOnLoad: true,
        //     });
        //     m.init();
        // });
    },
};
</script>

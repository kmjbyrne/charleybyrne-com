<template>
    <a :href="share()" target="_blank">
        <img :src="getChannel" />
    </a>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    props: ["url", "text", "type"],
    computed: {
        getChannel(): string {
            const _: string = this.type ?? "share";
            return {
                telegram: "/telegram.svg",
                whatsapp: "/whatsapp.svg",
                facebook: "/facebook.svg",
                mailto: "/email.svg",
                share: "/share.svg",
            }[_] as string;
        },
    },
    methods: {
        /**
         * @param string $url Absolute URL to share, e.g. "https://example.com/path/to/article?with=params"
         * @param string $text Optional comment to share URL with, e.g. "Check out this article!"
         * @return string Button HTML markup, feel free to modify to your taste
         */
        share() {
            if (process.client) {
                const share = `https://t.me/share/url?url=${window.location}&text=${this.text}`;
                return share;
            }
        },
    },
});
</script>

<style lang="scss" scoped>
img {
    width: 2rem;
    display: block;
}
</style>

<template>
    <main>
        <div class="container">
            <div class="row text-center">
                <div class="col">
                    <div class="mv2">
                        <ImageCircle>
                            <img class="icon-lg" src="/wip.svg" />
                        </ImageCircle>
                    </div>
                    <p>Right now this page and underlying project is progressing &#128149;. More to come soon.</p>
                    <p><a href="https://www.buymeacoffee.com/charleybyrne">Coffee helps!</a></p>
                    <p>It is my 2023 imperative to add more content to here!</p>
                </div>
            </div>
            <nuxt-content :document="data"></nuxt-content>
            <div class="row text-center">
                <div class="col">
                    <p>Projects are ongoing. However, here is a sample of the current work in progress.</p>
                    <div class="mv2">
                        <audio src="/audio/utangatta-sample-premix-premaster.mp3" controls></audio>
                    </div>
                </div>
            </div>
            <h2>Some YouTube Highlights</h2>
            <div class="row row--multiline">
                <div class="col-6">
                    <iframe
                        height="315px"
                        width="100%"
                        src="https://www.youtube.com/embed/J1Kr8LNJI0E"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;
                        picture-in-picture; web-share"
                        allowfullscreen></iframe>
                </div>
                <div class="col-6">
                    <iframe
                        height="315px"
                        width="100%"
                        src="https://www.youtube.com/embed/Br5tbtzbCGY"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;
                        picture-in-picture; web-share"
                        allowfullscreen></iframe>
                </div>
                <div class="col-6">
                    <iframe
                        height="315px"
                        width="100%"
                        src="https://www.youtube.com/embed/eG4i6TuesIk"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen></iframe>
                </div>
                <div class="col-6">
                    <iframe
                        height="315px"
                        width="100%"
                        src="https://www.youtube.com/embed/fbYJ3GyaXp4"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen></iframe>
                </div>
            </div>
        </div>
    </main>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    head() {
        return {
            title: "Music Stuff",
        };
    },
    data() {
        return {
            data: {},
        };
    },
    async fetch() {
        this.data = await this.$content("/music").fetch();
    },
});
</script>

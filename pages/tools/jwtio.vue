<template>
    <div class="container">
        <div class="panel">
            <h1>JWT Checking Tool</h1>
            <p>All operations are handled by browser directly, no network connections made.</p>
            <hr />
            <div class="row">
                <div class="col-6">
                    <div class="row">
                        <div class="col">
                            <p>Enter raw JWT JSON string below</p>

                            <FormTextarea v-model="data"></FormTextarea>
                            <button class="button" @click="submit">Submit</button>
                        </div>
                    </div>
                </div>
                <div class="col-6">
                    <template v-if="jwt.header">
                        <div class="row">
                            <div class="col">
                                <p>Decoded JWT</p>
                                <button class="button" @click="copy">Copy Output</button>
                            </div>
                        </div>

                        {{ output }}
                        <div class="nuxt-content" v-for="block in blocks" :key="block">
                            <h2>{{ block.capitalize() }}</h2>
                            <div class="nuxt-content-highlight">
                                <div class="code-toolbar">
                                    <pre class="line-numbers language-javascript"><code class="language-javascript"><div v-html="jwt[block]"></div></code></pre>
                                    <div class="toolbar"></div>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
// @ts-ignore
import * as Prism from "prismjs";
import "prismjs/components/prism-json";

import "prismjs/plugins/toolbar/prism-toolbar";
import "prismjs/components/prism-java";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-python";
// import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard";

// Include the line numbers plugin: (optional)
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

// Include the line highlight plugin: (optional)
import "prismjs/plugins/line-highlight/prism-line-highlight";
import "prismjs/plugins/line-highlight/prism-line-highlight.css";

// Include some other plugins: (optional)
import "prismjs/plugins/highlight-keywords/prism-highlight-keywords";

import Vue from "vue";
export default Vue.extend({
    meta: {
        index: "JWT Utils",
    },
    data() {
        return {
            data: "",
            formatted: "",
            output: "",
            singleLine: false,
            jwt: {
                header: "",
                payload: "",
                signature: "",
            },
            raw: "",
            blocks: ["header", "payload", "signature"],
        };
    },
    methods: {
        copy() {
            navigator.clipboard.writeText(this.raw);
        },
        submit() {
            try {
                const blocks = this.data.split(".");

                this.jwt.header = JSON.stringify(JSON.parse(atob(blocks[0])), undefined, 2).toString();
                this.jwt.payload = JSON.stringify(JSON.parse(atob(blocks[1])), undefined, 2).toString();
                this.jwt.signature = blocks[2];

                this.jwt.header = Prism.highlight(this.jwt.header, Prism.languages.javascript, "json");
                this.jwt.payload = Prism.highlight(this.jwt.payload, Prism.languages.javascript, "json");

                this.raw = `${this.jwt.header}\n${this.jwt.payload}\nSignature: ${this.jwt.signature}`;

                setTimeout(() => {
                    Prism.highlightAll();
                }, 500);
            } catch (err: Error | any) {
                this.output = err;
            }
        },
    },
    watch: {
        data() {
            this.submit();
        },
    },
});
</script>

<style lang="scss" scoped>
pre[class*="language-"] > code {
    position: relative;
    display: block;
}
</style>

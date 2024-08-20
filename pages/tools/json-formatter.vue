<template>
    <div class="container">
        <div class="panel">
            <h1>JSON Formatting Tool</h1>
            <div class="row">
                <div class="col">
                    <p>Enter raw JSON below</p>
                    <input type="checkbox" name="checkbox" v-model="singleLine" :checked="singleLine" />
                    <label for="checkbox">Format as single line</label>
                    <FormTextarea v-model="data"></FormTextarea>
                    <button class="button" @click="submit">Submit</button>
                </div>
            </div>
            <div class="row" v-if="output">
                <div class="col">
                    <p>Tidy JSON</p>
                    <button class="button" @click="copy">Copy Output</button>

                    <div class="nuxt-content">
                        <div class="nuxt-content-highlight">
                            <div class="code-toolbar">
                                <pre class="line-numbers language-javascript"><code class="language-javascript" contenteditable="true"><div v-html="output" contenteditable="true"></div></code></pre>
                                <div class="toolbar"></div>
                            </div>
                        </div>
                    </div>
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
        index: "JSON Formatter",
    },
    head() {
        return {
            meta: [{ hid: "description", name: "description", content: "My custom description" }],
        };
    },
    data() {
        return {
            data: "",
            formatted: "",
            output: "",
            singleLine: false,
        };
    },
    methods: {
        copy() {
            navigator.clipboard.writeText(this.formatted);
        },
        submit() {
            try {
                this.formatted = JSON.stringify(JSON.parse(this.data), undefined, this.singleLine ? undefined : 2).toString();
                this.output = Prism.highlight(this.formatted, Prism.languages.javascript, "json");

                setTimeout(() => {
                    Prism.highlightAll();
                }, 500);
            } catch (err: Error | any) {
                this.output = err;
            }
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

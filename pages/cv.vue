<template>
    <div class="container cv" v-if="!$fetchState.pending">
        <div class="row">
            <div class="col-6">
                <h1>{{ bio.title }}</h1>
                <p>{{ bio.description }}</p>
            </div>
            <div class="col-6">
                <table class="cv-table">
                    <tr>
                        <td><b>Address</b></td>
                        <td>{{ bio.data.address }}</td>
                    </tr>
                    <tr>
                        <td><b>Phone</b></td>
                        <td>{{ bio.data.phone }}</td>
                    </tr>
                    <tr>
                        <td><b>Email</b></td>
                        <td>{{ bio.data.email }}</td>
                    </tr>
                </table>
            </div>
        </div>
        <nuxt-content :document="bio" />
        <div class="row">
            <div class="col-4">
                <nuxt-content :document="left" />
            </div>
            <div class="col-8">
                <nuxt-content :document="exp" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    data() {
        return {
            bio: {},
            exp: {},
            left: {},
        };
    },
    async fetch() {
        const bio = await this.$content("_partial/cv-bio").fetch();
        const exp = await this.$content("_partial/cv-experience").fetch();
        const left = await this.$content("_partial/cv-left").fetch();
        this.bio = bio;
        this.exp = exp;
        this.left = left;
    },
});
</script>
<style lang="scss" scoped>
.col-4 {
    border-right: 2px solid #2144de;
}
.cv {
    .nuxt-content {
        h2 {
            text-transform: uppercase;
        }
    }
    .cv-table {
        table-layout: auto;
        border-collapse: collapse;
        text-align: left;
        width: 100%;

        tr td:not(:first-child) {
            text-align: right;
        }
    }
}
</style>

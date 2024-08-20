<template>
    <main>
        <section class="container">
            <div class="row text-center">
                <div class="col">
                    <ImageCircle>
                        <img class="icon-md" src="/wip.svg" />
                    </ImageCircle>
                    <p>Right now this website is doing its best &#128149;. Please be patient while the author stops procrastinating.</p>
                    <p><a href="https://www.buymeacoffee.com/charleybyrne">Coffee helps!</a></p>
                    <p>It is my 2023 imperative to add more content to here!</p>
                </div>
            </div>
        </section>

        <section class="section-contrast">
            <div class="container">
                <div class="bio row text-center">
                    <div class="image col-4">
                        <img class="icon-xl" src="/personal.svg" />
                    </div>

                    <div class="col">
                        <nuxt-content :document="bio"></nuxt-content>
                    </div>
                </div>
            </div>
        </section>

        <section class="container">
            <div class="row text-center justify-center">
                <div class="col">
                    <NuxtLink to="/blog">
                        <img class="icon-lg" src="/blog.svg" />
                        <p>Blog and other such ramblings. Content to come, cathartic and otherwise.</p>
                    </NuxtLink>
                </div>
                <div class="col">
                    <NuxtLink to="/recipes">
                        <img class="icon-lg" src="/recipes.svg" />
                        <p>Curated repository of my favourite foods and cooking thoughts. Good brain needs good food!</p>
                    </NuxtLink>
                </div>
                <div class="col">
                    <NuxtLink to="/wiki">
                        <img class="icon-lg" src="/reading.svg" />
                        <p>My technical wiki for tips, notes and jot down ideas from all things such as language level to AWS.</p>
                    </NuxtLink>
                </div>
            </div>
        </section>

        <section class="container">
            <div class="row text-center justify-center">
                <div class="col">
                    <h2>Recent Activity</h2>
                </div>
            </div>

            <div class="row text-center justify-center">
                <div class="col">
                    <h3>Recipes</h3>
                </div>
            </div>

            <div class="row text-center is-multiline">
                <div class="col-4" v-for="recipe in recentRecipes" :key="recipe.slug">
                    <NuxtLink :to="recipe.path">
                        <div class="row">
                            <div class="col">
                                <img class="icon-lg" src="/recipe-book.svg" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <span>{{ recipe.title }}</span>
                            </div>
                        </div>
                    </NuxtLink>
                    <div class="row small-tags">
                        <div class="tag" v-for="tag in recipe.tags" :key="tag">
                            <img src="/tag.svg" />
                            <NuxtLink :to="'/recipes/tag/' + tag">
                                <span>{{ tag }}</span>
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    head() {
        return {
            title: "Home",
        };
    },
    async asyncData({ $content }) {
        const recentRecipes = await $content("recipes", { deep: true }).sortBy("createdAt", "desc").only(["path", "title", "slug", "tags"]).limit(6).fetch();

        const bio = await $content("bio").fetch();
        return {
            recentRecipes,
            bio,
        };
    },
});
</script>

<style lang="scss" scoped>
.bio {
    margin-top: 3rem;
    margin-bottom: 3rem;
    .image {
        align-items: center;
        display: flex;
        justify-content: center;
    }
}

.xbox {
    border: 1px solid #ccc;
}

.small-tags {
    font-size: 0.65rem;

    flex-direction: row;
    display: flex;
    justify-content: center;

    img {
        margin: 0 0.5rem;
        width: 0.75rem;
    }
    .tag {
        display: flex;
    }
}
</style>

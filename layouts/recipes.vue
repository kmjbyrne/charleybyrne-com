<template>
    <div class="page" :class="theme">
        <div id="background">
            <StarryNight v-if="theme === 'theme-dark'" :density="3"></StarryNight>
        </div>
        <div class="dock z500 no-print" :class="{ 'dock--open': dock }">
            <div class="dock__toggle expand expand--center" @click="setDockToggle" :class="{ 'expand--active': dock }"></div>
            <div class="dock__content"></div>
        </div>
        <header class="header mobile-only z100 no-print">
            <div class="row row--mobile mt0 align-center">
                <div class="col-5">
                    <a class="ph075" href="/"><span>Charley Byrne</span></a>
                </div>
                <div class="col-7 flex align-center justify-between">
                    <div class="flex">
                        <img class="header-icon" src="/sun.svg" v-show="theme === 'theme-dark'" @click="update('theme', 'theme-light')" />
                        <img class="header-icon" src="/moon.svg" v-show="theme === 'theme-light'" @click="update('theme', 'theme-dark')" />
                    </div>

                    <a class="flex" href="https://github.com/kmjbyrne" target="_blank">
                        <img class="header-icon" src="/github.svg" />
                    </a>
                    <a class="flex" href="https://soundcloud.com/charleybyrne" target="_blank">
                        <img class="header-icon" src="/soundcloud.svg" />
                    </a>
                    <a class="flex" href="https://discord.gg/BAYSQE9u" target="_blank">
                        <img class="header-icon" src="/discord.svg" />
                    </a>
                    <a class="flex" href="https://www.linkedin.com/in/keith-byrne-88ab01a1/" target="_blank">
                        <img class="header-icon" src="/linkedin.svg" />
                    </a>
                    <div class="flex hamburger" :class="navbar ? 'hamburger--active' : ''" @click="set('navbar')">
                        <span></span>
                    </div>
                </div>
            </div>
            <!-- <div class="header__group flex-row icons">
              <div class="header__item mobile-only">
                  <img class="header__link" src="/sun.svg" v-if="theme === 'theme-dark'" @click="update('theme', 'theme-light')" />
                  <img class="header__link" src="/moon.svg" v-if="theme === 'theme-light'" @click="update('theme', 'theme-dark')" />
              </div>
          </div> -->
            <!-- <div class="p1 flex justify-right align-center mobile-only">
              <div class="hamburger" :class="navbar ? 'hamburger--active' : ''" @click="set('navbar')">
                  <span></span>
              </div>
          </div> -->
        </header>
        <div class="navbar z200 mobile-h100 mobile-fixed-top-0 mobile-charcoal no-print" :class="navbar ? 'mobile-right-left-50pc' : 'mobile-fixed-right-m100pc'">
            <div class="navbar__inner">
                <div class="navbar__group">
                    <div class="navbar__item">
                        <NuxtLink to="/">
                            <span class="navbar__link">Charley Byrne</span>
                        </NuxtLink>
                        <img class="icon-md" src="/badge.svg" />
                    </div>
                </div>
                <div class="navbar__group justify-right">
                    <div class="navbar__item desktop-only">
                        <img class="icon-md" src="/sun.svg" v-show="theme === 'theme-dark'" @click="update('theme', 'theme-light')" />
                        <img class="icon-md" src="/moon.svg" v-show="theme === 'theme-light'" @click="update('theme', 'theme-dark')" />
                    </div>

                    <a href="https://soundcloud.com/charleybyrne" target="_blank">
                        <div class="navbar__item desktop-only">
                            <img class="icon-md" src="/soundcloud.svg" />
                        </div>
                    </a>

                    <a href="https://discord.gg/BAYSQE9u" target="_blank">
                        <div class="navbar__item desktop-only">
                            <img class="icon-md" src="/discord.svg" />
                        </div>
                    </a>

                    <a href="https://www.linkedin.com/in/keith-byrne-88ab01a1/" target="_blank">
                        <div class="navbar__item desktop-only">
                            <img class="icon-md" src="/linkedin.svg" />
                        </div>
                    </a>

                    <a href="https://github.com/kmjbyrne" target="_blank">
                        <div class="navbar__item desktop-only">
                            <img class="icon-md" src="/github.svg" />
                        </div>
                    </a>
                </div>
                <div class="navbar__item">
                    <NuxtLink class="navbar__link" to="/blog">Blog</NuxtLink>
                </div>
                <div class="navbar__item">
                    <NuxtLink class="navbar__link" to="/recipes">Recipes</NuxtLink>
                </div>
                <div class="navbar__item">
                    <NuxtLink class="navbar__link" to="/wiki">Wiki</NuxtLink>
                </div>
                <div class="navbar__item">
                    <NuxtLink class="navbar__link" to="/music">Music</NuxtLink>
                </div>
                <div class="navbar__item">
                    <a class="navbar__link expand" @click="toggle($event, '')">Theme</a>
                    <div class="navbar__nested panel desktop-abs-right-0">
                        <div class="navbar__item">
                            <div class="navbar__link" @click="setTheme('light')">Light</div>
                        </div>
                        <div class="navbar__item">
                            <div class="navbar__link" @click="setTheme('dark')">Dark</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Nuxt></Nuxt>

        <Footer />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    head() {
        return {
            link: [{ rel: "icon", type: "image/x-icon", href: "/diary.svg" }],
        };
    },
    data(): any {
        return {
            dock: false,
            theme: "theme-light",
            navbar: false,
        };
    },
    mounted() {
        this.theme = localStorage.getItem("theme") || "theme-light";
        const queryTheme = this.$route.query?.theme;
        if (queryTheme) {
            this.theme = queryTheme;
            localStorage.setItem("theme", queryTheme);
        }
    },
    methods: {
        update(key: string, value: any) {
            this[key] = value;
            localStorage.setItem("theme", this.theme);
            this.$router.push({ query: { theme: this.theme } });
        },
        setDockToggle() {
            this.dock = !this.dock;
        },
        set(e: string) {
            // @ts-ignore;
            this[e] = !this[e];
        },
        toggle(e: any) {
            e.target.classList.toggle("navbar--show");
            e.target.classList.toggle("expand--active");
        },
        setTheme(name: string) {
            this.theme = `theme-${name}`;
            localStorage.setItem("theme", this.theme);
        },
    },
});
</script>

<style lang="scss">
.page {
    --theme-anchor: #009fff;
    --theme-bg: #1a1a1a;
    --theme-fg: white;
    --theme-header-anchor: white;
    --menu-bg-color: transparent;
    --menu-fg-color: black;
    --snapatoms-panel-bg: #1a1a1a;
    --snapatoms-panel-fg: inherit;
    --page-outer: 1.5rem;
    --page-inner: 1.5rem;
    --page-side-padding: 1rem;

    color: var(--theme-fg, white);

    scroll-behavior: smooth;
    margin: 0;
    width: 100%;

    // background: #005aa7; /* fallback for old browsers */
    // background: -webkit-linear-gradient(to bottom, #005aa7, #565325); /* Chrome 10-25, Safari 5.1-6 */
    // background: linear-gradient(to bottom, #005aa7, #696530); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.content {
    @include from-large {
        padding: 0 var(--page-outer);
    }
}

.page,
html,
body,
#__nuxt,
#__layout {
    height: 100%;
}

.icons {
    img {
        width: 1.5rem;
    }
}

.main-container {
    display: block;
    position: fixed;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, #201c2f 0%, #100751 100%);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    background: #005aa7; /* fallback for old browsers */
    background: -webkit-linear-gradient(to bottom, #005aa7, #100751); /* Chrome 10-25, Safari 5.1-6 */
    // background: linear-gradient(to bottom, #100751, #3d3403); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    background: linear-gradient(to bottom, #09042f, #03073d); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.sub {
    color: var(--theme-fg, black);
    opacity: 0.7;
}

.toc--in-view {
    color: var(--theme-secondary-fg);
}

.theme-dark {
    --theme-anchor-base: #009fff;
    --theme-anchor: #f7ff00;
    --theme-bg: #1a1a1a;
    --theme-fg: white;
    --menu-bg-color: white;
    --menu-fg-color: transparent;
    --theme-pre-bg: #cdcdcd;
    --theme-pre-fg: #4fcc57;

    --snapatoms-panel-bg: #1a1a1a;
    --snapatoms-panel-fg: inherit;
    --theme-light-text: #9d9d9d;
    --theme-image-circle: rgb(245, 245, 245);

    .navbar {
        a {
            color: var(--theme-fg);
            font-weight: 600;
        }
    }

    .read-content {
        background-color: var(--menu-bg-color);
        color: var(--theme-bg);
        border-color: #777;

        a {
            color: var(--theme-anchor-base);
        }
    }
}

.navbar {
    --snapatoms-panel-bg: transparent;
    --snapatoms-panel-shadow: none;
}

.theme-light {
    --theme-anchor: #009fff;
    --theme-bg: rgb(245, 245, 245);
    --theme-fg: black;
    --menu-bg-color: black;
    --menu-fg-color: white;
    --theme-light-text: #9d9d9d;
    --snapatoms-panel-bg: white;
    --theme-pre-bg: rgba(226, 226, 226, 0.56);
    --theme-pre-fg: rgb(255, 36, 0);
    --theme-image-circle: var(--theme-bg);

    .navbar {
        a {
            color: var(--theme-fg);
            font-weight: 500;
        }
    }

    .footer p {
        color: var(--theme-bg);
    }

    .toc--in-view {
        border-left: 3px solid var(--theme-anchor) !important;
    }
}

.theme-light-text {
    color: var(--theme-light-text);
}

.navbar__item {
    display: flex;
}
</style>

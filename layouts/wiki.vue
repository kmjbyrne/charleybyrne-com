<template>
    <div class="wiki" :class="theme">
        <div class="dock z500" :class="{ 'dock--open': dock }">
            <div class="dock__toggle expand expand--center" @click="setDockToggle" :class="{ 'expand--active': dock }"></div>
            <div class="dock__content"></div>
        </div>
        <div class="mobile-only header z100">
            <div class="header__group flex-row">
                <div class="header__item">
                    <a class="header__link">{{ $config.title }}</a>
                </div>
                <div class="header__item mobile-only icons">
                    <img class="header__link" src="/sun.svg" v-if="theme === 'theme-dark'" @click="update('theme', 'theme-light')" />
                    <img class="header__link" src="/moon.svg" v-if="theme === 'theme-light'" @click="update('theme', 'theme-dark')" />
                </div>
            </div>
            <div class="p1 flex justify-right align-center mobile-only">
                <div class="hamburger" :class="navbar ? 'hamburger--active' : ''" @click="set('navbar')">
                    <span></span>
                </div>
            </div>
        </div>
        <div class="navbar z200 mobile-h100 mobile-fixed-top-0 mobile-charcoal" :class="navbar ? 'mobile-right-left-50pc' : 'mobile-fixed-right-m100pc'">
            <div class="navbar__inner">
                <div class="navbar__group">
                    <div class="navbar__item">
                        <a class="navbar__link">{{ $config.title }}</a>
                    </div>
                </div>
                <div class="navbar__group justify-right">
                    <div class="navbar__item desktop-only icons">
                        <img class="navbar__link" src="/sun.svg" v-show="theme === 'theme-dark'" @click="update('theme', 'theme-light')" />
                        <img class="navbar__link" src="/moon.svg" v-show="theme === 'theme-light'" @click="update('theme', 'theme-dark')" />
                    </div>
                    <div class="navbar__item">
                        <NuxtLink class="navbar__link" to="/recipes">Recipes</NuxtLink>
                    </div>
                    <div class="navbar__item">
                        <NuxtLink class="navbar__link" to="/wiki">Wiki</NuxtLink>
                    </div>
                    <div class="navbar__item">
                        <a class="navbar__link expand" @click="toggle($event, '')">Theme</a>
                        <div class="navbar__nested panel desktop-abs-right-0">
                            <div class="navbar__item"><div class="navbar__link" @click="setTheme('light')">Light</div></div>
                            <div class="navbar__item"><div class="navbar__link" @click="setTheme('dark')">Dark</div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Nuxt></Nuxt>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    data(): any {
        return {
            dock: false,
            theme: "theme-light",
            navbar: false,
        };
    },
    mounted() {
        this.theme = localStorage.getItem("theme") || "theme-light";
    },
    methods: {
        update(key: string, value: any) {
            this[key] = value;
            localStorage.setItem("theme", this.theme);
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
@import url("https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&family=Roboto:wght@300;400&display=swap");

.wiki {
    --theme-anchor: #009fff;
    --theme-bg: #1a1a1a;
    --theme-fg: white;
    --menu-bg-color: transparent;
    --menu-fg-color: black;
    --snapatoms-panel-bg: #1a1a1a;
    --snapatoms-panel-fg: inherit;

    background-color: var(--theme-bg, white);
    color: var(--theme-fg, black);
    // font-size: 16px;
    padding: 0;
    scroll-behavior: smooth;
    margin: 0;
    width: 100%;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: Outfit, sans-serif;
    text-rendering: optimizeLegibility;
    -moz-osx-font-smoothing: grayscale;
}

.icons {
    img {
        width: 1.5rem;
        margin: 0 1rem;
    }
}

.sub {
    color: var(--theme-fg, black);
    opacity: 0.7;
}

.toc--in-view {
    color: var(--theme-secondary-fg);
}
.theme-dark {
    --theme-anchor: #009fff;
    --theme-bg: #1a1a1a;
    --theme-fg: white;
    --menu-bg-color: white;
    --menu-fg-color: transparent;
    --theme-pre-bg: #4d4d4d;
    --theme-pre-fg: #4fcc57;

    --snapatoms-panel-bg: #1a1a1a;
    --snapatoms-panel-fg: inherit;
    --theme-light-text: #9d9d9d;
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

    .toc--in-view {
        border-left: 3px solid var(--theme-anchor) !important;
    }
}

.theme-light-text {
    color: var(--theme-light-text);
}
</style>

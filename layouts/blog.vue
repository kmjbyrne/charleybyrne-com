<template>
    <main>
        <SimpleNav>
            <SimpleNavGroup>
                <SimpleNavItem>
                    <SimpleNavText link="">Charley Byrne <span class="light">Blog</span></SimpleNavText>
                </SimpleNavItem>
                <SimpleNavItem :hidden="true">
                    <SimpleNavLink link="/about">About</SimpleNavLink>
                </SimpleNavItem>
            </SimpleNavGroup>
            <SimpleNavGroup>
                <SimpleNavItem>
                    <SimpleNavDropdown>
                        <template #label>Content</template>
                        <template #items>
                            <SimpleNavItem>
                                <SimpleNavLink link="/recipes">Recipes</SimpleNavLink>
                            </SimpleNavItem>
                            <SimpleNavItem>
                                <SimpleNavLink link="/wiki">Wiki</SimpleNavLink>
                            </SimpleNavItem>
                            <SimpleNavItem>
                                <!-- <SimpleNavLink link="/contact">Contact</SimpleNavLink> -->
                            </SimpleNavItem>
                        </template>
                    </SimpleNavDropdown>
                </SimpleNavItem>
                <SimpleNavItem>
                    <SimpleNavLink link="/recipes">Recipes</SimpleNavLink>
                </SimpleNavItem>
                <SimpleNavItem>
                    <SimpleNavLink link="/wiki">Wiki</SimpleNavLink>
                </SimpleNavItem>
                <SimpleNavItem :hidden="true">
                    <SimpleNavLink link="/contact">Contact</SimpleNavLink>
                </SimpleNavItem>
            </SimpleNavGroup>
        </SimpleNav>
        <nuxt />
    </main>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    data() {
        return { title: "" };
    },
});
</script>

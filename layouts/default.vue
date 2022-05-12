<template>
    <main class="uni-headings h1-rulers">
        <SimpleNav>
            <SimpleNavGroup>
                <SimpleNavItem>
                    <SimpleNavLink link="">Charley Byrne</SimpleNavLink>
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
export default Vue.extend({});
</script>

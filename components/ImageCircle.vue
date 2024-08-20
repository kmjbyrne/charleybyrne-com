<template>
    <div class="circle">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
.circle {
    background-color: var(--theme-image-circle, white);
    padding: 2rem;
    border-radius: 50%;
    margin: auto;
    width: 3rem;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
}
</style>

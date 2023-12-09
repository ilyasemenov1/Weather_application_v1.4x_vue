<script setup>
    import { ref } from "vue"; 

    const props = defineProps(["linkHref"]);
    let href = ref(props.linkHref);
</script>
<template>
    <a :href="href" class="link">
        <div class="link__icon">
            <slot name="icon"></slot>
        </div>
        <span  class="link__text">
            <slot name="text"></slot>
        </span>
    </a>
</template>
<style>
    .link {
        display: flex;
        align-items: center;
        gap: 6px;
        width: fit-content;
        padding: 4px 10px;
        border-radius: 12px;
        color: var(--text-color-1);
        text-decoration: none;
        font-weight: 600;
        transition: .2s ease;
    }
    .link:hover,
    .link:focus-visible {
        background: var(--bg-color-12);
    }
    .link__icon {
        position: relative;
        width: 18px;
        height: 18px;
    }
    .link__icon svg {
        position: absolute;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        fill: var(--text-color-1);
    }
</style>
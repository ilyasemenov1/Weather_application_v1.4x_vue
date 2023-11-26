<template>
    <div class="error-notification">
        <div class="error-notification__label">
            <slot name="label-content"></slot>
        </div>
        <slot name="button" class="error-notification__button"></slot>
    </div>
</template>
<style scoped>
    .error-notification {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
        width: 100%;
        height: 100%;
        z-index: 6;
        overflow-x: hidden;
        overflow-y: visible;
        animation: info-block-add .3s ease forwards;
    }
    .error-notification::-webkit-scrollbar {
        display: none;
    }
    .error-notification__label {
        display: flex;
        flex-direction: column;
        gap: 5px;
        max-width: 400px;
        text-align: center;
        color: var(--text-color-1);
    }
</style>
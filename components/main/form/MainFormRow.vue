<template>
    <div :class="['form__row', {'double': isDouble}]" v-observe-visibility="{
                callback: visibilityChanged,
                once: true,
                throttle: 250 * index,
            }" :style="visibleStyle">
        <slot>

        </slot>
    </div>
</template>

<script>
import blockShow from "@/mixins/blockShow";

export default {
    name: "MainFormRow",
    props: {
        index: {
            type: Number,
            required: false,
            default: 0
        },
        isDouble: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    mixins: [blockShow]
}
</script>

<style lang="scss" scoped>
.form__row {
    transition: $animTime;

    &.double {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr;
        grid-gap: 1.04rem;
    }
}

@media screen and (max-width: 480px) {
    .form__row {

        &.double {
            grid-template-columns: 1fr;
            grid-auto-rows: auto;
        }
    }
}
</style>
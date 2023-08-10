<template>
    <div class="col" v-observe-visibility="{
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
    name: "MainFooterCol",
    props: {
        index: {
            type: Number,
            required: false,
            default: 0
        }
    },
    mixins: [blockShow]
}
</script>

<style lang="scss" scoped>
.col {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    transition: $animTime;
}

@media screen and (max-width: 480px) {

}
</style>
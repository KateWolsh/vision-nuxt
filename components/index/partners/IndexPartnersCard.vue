<template>
    <article v-observe-visibility="{
                callback: visibilityChanged,
                once: false,
                throttle: 250 * index,
            }" :style="visibleStyle" :class="{'light': getIsLightTheme}">
        <img :src="getReplacedUrl(partner.image)">
    </article>
</template>

<script>
import blockShow from "@/mixins/blockShow";
import replaceUrl from "@/mixins/replaceUrl";

export default {
    name: "IndexPartnersCard",
    props: {
        partner: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: false,
            default: 0
        }
    },
    computed: {
        getIsLightTheme() {
            return this.$store.getters['theme/getIsLightTheme']
        },
    },
    mixins: [blockShow, replaceUrl]
}
</script>

<style lang="scss" scoped>
article {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    transition: $animTime;

    > img {
        width: 10rem;
        height: 100%;
        object-fit: contain;
        object-position: center;
        filter: brightness(0) invert(1);
        transition: $animTime;

        &:hover {
            filter: none;
        }
    }

    &.light {
        > img {
            filter: brightness(0);

            &:hover {
                filter: none;
            }
        }
    }
}

@media screen and (max-width: 480px) {
    article {
        > img {
            width: 8rem;
        }
    }
}
</style>

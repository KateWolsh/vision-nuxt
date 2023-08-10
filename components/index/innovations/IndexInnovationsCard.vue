<template>
    <article v-observe-visibility="{
                callback: visibilityChanged,
                once: false,
                throttle: 250 * index,
            }" :style="visibleStyle" :class="{'is-visible': isVisible}">
        <img :src="getReplacedUrl(innovation.image)" class="blur">
        <img :src="getReplacedUrl(innovation.image)">
        <p>
            {{ innovation.text }}
        </p>
    </article>
</template>

<script>
import blockShow from "@/mixins/blockShow";
import replaceUrl from "@/mixins/replaceUrl";

export default {
    name: "IndexInnovationsCard",
    props: {
        innovation: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: false,
            default: 0
        }
    },
    mixins: [blockShow, replaceUrl]
}
</script>

<style lang="scss" scoped>
article {
    position: relative;
    width: 40%;
    display: flex;
    flex-direction: column;
    margin-bottom: 5rem;
    overflow: hidden;

    > img {
        height: 8rem;
        width: 8rem;
        object-fit: contain;
        object-position: center;
        margin-bottom: 2rem;
    }

    > p {
        line-height: 1.6em;
        font-weight: 300;
        width: 80%;
    }

    > .blur {
        position: absolute;
        top: 17%;
        left: 17%;
        width: 7rem;
        height: 7rem;
        filter: blur(2.6rem);
    }

    &.is-visible {
        transition: $animTime;
    }
}

@media screen and (max-width: 991px) {
    article {
        > .blur {
            left: 22%;
        }
    }
}

@media screen and (max-width: 480px) {
    article {
        width: 100%;
        margin-bottom: 4rem;

        > img {
            height: 9rem;
            width: 9rem;
            object-fit: contain;
            object-position: center;
            margin-bottom: 1rem;
        }

        > p {
            font-size: 1.07rem;
        }

        > .blur {
            width: 8rem;
            height: 8rem;
            left: 10%;
            top: 18%;
        }
    }
}

</style>

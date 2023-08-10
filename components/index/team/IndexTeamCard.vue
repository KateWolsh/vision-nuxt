<template>
    <article :class="{'main-card': isMain, 'light': getIsLightTheme}"
             v-observe-visibility="{
                callback: visibilityChanged,
                once: true,
                throttle: 500 * index,
            }" :style="visibleStyle">
        <img v-if="card.image" :src="getReplacedUrl(card.image)">
        <img v-else src="@/assets/img/temp/avatar.png">

        <h3>
            {{ card.name }}
        </h3>

        <p>
            {{ card.position }}
        </p>

        <blockquote>
            «{{ card.text }}»
        </blockquote>
    </article>
</template>

<script>
import blockShow from "@/mixins/blockShow";
import replaceUrl from "@/mixins/replaceUrl";

export default {
    name: "IndexTeamCard",
    props: {
        card: {
            type: Object,
            required: true
        },
        isMain: {
            type: Boolean,
            required: false,
            default: false
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
    flex-direction: column-reverse;
    align-items: flex-start;
    justify-content: flex-end;
    transition: $animTime;

    > img {
        display: none;
    }

    > h3 {
        display: none;
    }

    > p {
        margin-bottom: 1.04rem;
        line-height: 1.5em;
        font-weight: 300;
        color: hsla(0, 0%, 100%, 0.6);
    }

    > blockquote {
        font-style: italic;
        font-weight: 300;
        margin-bottom: .83rem;
        font-size: 0.93rem;
        line-height: 150%;
    }

    &.light {
        > p {
            color: black;
            opacity: .5;
        }
    }

    &.main-card {
        flex-direction: column;
        position: relative;

        > img {
            display: block;
            width: 100%;
            height: 28.12rem;
            object-position: center;
            object-fit: contain;
            border-radius: .5rem;
            margin-bottom: 3rem;
        }

        > h3 {
            display: block;
            margin-bottom: .52rem;
            font-size: 1.87rem;
            line-height: 120%;
        }

        > blockquote {
            margin-bottom: 0;
        }

        &:before {
            //content: '';
            position: absolute;
            left: 0;
            top: 14.06rem;
            width: 100%;
            height: 20rem;
            transform: translateY(-50%);
            opacity: .7;
            filter: blur(13rem);
            background-color: $accentBlue;
            z-index: -1;
        }
    }
}

@media screen and (max-width: 480px) {
    article {

        > blockquote {
            margin-bottom: .83rem;
            font-size: 1.07rem;
        }

        &.main-card {

            > img {
                margin-bottom: 1rem;
            }

            > h3 {
                font-size: 1.35rem;
            }
        }
    }
}
</style>

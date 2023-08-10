<template>
    <article>
        <div class="info">
            <h4>
                {{ interfaces.title }}
            </h4>
            <p>
                {{ interfaces.text }}
            </p>
            <button @click="formScroll" class="blue__button">
                Попробовать продукт
            </button>
        </div>
        <img :src="getReplacedUrl(interfaces.image)">
    </article>
</template>

<script>
import scrollToRef from "@/mixins/scrollToRef";
import replaceUrl from "@/mixins/replaceUrl";

export default {
    name: "ProjectDetailInterfaceCard",
    props: {
        interfaces: {
            type: Object,
            required: true
        },
    },
    mixins: [scrollToRef, replaceUrl]
}
</script>

<style lang="scss" scoped>
article {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: space-between;

    > .info {
        padding-top: 2rem;
        width: 22rem;

        > h4 {
            font-size: 1.8rem;
            line-height: 1.4em;
            margin-bottom: 1rem;
        }

        > p {
            line-height: 1.6em;
            font-weight: 300;
            margin-bottom: 3rem;
        }
    }

    > img {
        width: 60%;
        height: 27.77rem;
        object-fit: contain;
        object-position: center;
        border-radius: 1.38rem;
    }

    &:before {
        content: '';
        position: absolute;
        width: 50%;
        height: 19.16rem;
        right: 3.54rem;
        top: 3.54rem;
        background: $accentBlue;
        filter: blur(8.64rem);
        opacity: .5;
        z-index: -1;
        pointer-events: none;
    }
}


@media screen and (max-width: 991px) {
    article {
        flex-direction: column-reverse;

        > .info {
            padding-top: 5rem;
            width: 100%;

            > h4 {
                margin-bottom: 1.2rem;
            }

            > p {
                font-size: 1.2rem;
                margin-bottom: 3.5rem;
            }
        }

        > img {
            width: 100%;
            height: 30rem;
            border-radius: 1.38rem;
        }

        &:before {
            width: 90%;
            height: 20rem;
            right: 5vw;
            left: 5vw;
            top: 5rem;
        }
    }
}

@media screen and (max-width: 480px) {
    article {

        > .info {
            padding-top: 4rem;

            > h4 {
                font-size: 1.64rem;
                margin-bottom: .8rem;
            }

            > p {
                font-size: 1.08rem;
                margin-bottom: 2.5rem;
            }

            > .blue__button {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 1.35rem 2.14rem;
                font-size: .78rem;
                font-weight: bold;
            }
        }

        > img {
            width: 100%;
            height: 13.5rem;
            border-radius: 1.38rem;
        }

        &:before {
            height: 10rem;
        }
    }
}
</style>

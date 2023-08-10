<template>
    <section>
        <div class="preview">
            <img :src="getReplacedUrl(project.image)">
        </div>

        <div class="info">
            <h1>
                {{ project.title }}
            </h1>
            <p>
                {{ project.polls }}
            </p>
            <button @click="formScroll" class="blue__button">
                Попробовать продукт
            </button>
        </div>
    </section>
</template>

<script>
import scrollToRef from "@/mixins/scrollToRef";
import replaceUrl from "@/mixins/replaceUrl";

export default {
    name: "ProjectDetailTitle",
    props: {
        project: {
            type: Object,
            required: true
        }
    },
    mixins: [scrollToRef, replaceUrl]
}
</script>

<style lang="scss" scoped>
section {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    padding: 5rem;
    padding-left: 0;

    .preview {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 55rem;
        height: 40rem;
        margin-left: -10vw;
        background-image: url("./assets/img/background/mockup.png");
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
        overflow: hidden;
        margin-bottom: 2rem;

        > img {
            width: 90%;
            height: 90%;
            object-fit: cover;
            object-position: center;
        }
    }

    > .info {
        width: 40vw;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        position: relative;

        > h1 {
            width: 100%;
            font-size: 2.7rem;
            margin-bottom: 2rem;
            word-wrap: break-word;
        }

        > p {
            margin-bottom: 2rem;
            font-size: 1.2rem;
            line-height: 1.6em;
        }
    }
}

@media screen and (max-width: 991px) {
    section {
        flex-direction: column;
        align-items: flex-start;
        padding: 0;
        padding-top: 9rem;
        margin-bottom: 5rem;

        > img {
            margin-left: -23vw;
            margin-bottom: 2rem;
        }

        > .info {
            width: 90vw;
            margin: auto;

            > h1 {
                font-size: 2.35rem;
                margin-bottom: 2rem;
            }

            > p {
                margin-bottom: 3rem;
            }
        }
    }
}

@media screen and (max-width: 480px) {
    section {
        padding-top: 7rem;
        margin-bottom: 0;

        .preview {
            height: 18.6rem;
            width: 26rem;
            margin-left: -5rem;
        }

        > .info {
            width: 90vw;
            margin: auto;

            > h1 {
                font-size: 1.85rem;
                margin-bottom: 1.7rem;
            }

            > p {
                font-size: 1.08rem;
                margin-bottom: 3.2rem;
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
    }
}
</style>

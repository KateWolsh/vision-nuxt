<template>
    <a :href="documentModel.file" target="_blank">
        <article :class="{'light': getIsLightTheme}">
            <p>
                {{ documentModel.title }}
            </p>
            <p>
                {{ documentModel.section }}
            </p>
            <div class="info">
                <span class="size">
                {{ documentModel.size }}
                </span>
                <span class="ext">
                    {{ getExt }}
                </span>
            </div>
        </article>
    </a>
</template>

<script>
export default {
    name: "ProjectDetailDocumentsCard",
    props: {
        documentModel: {
            type: Object,
            required: true
        }
    },
    methods: {
        download() {
            fetch(this.documentModel.file)
                .then(response => response.blob())
                .then(blob => {
                    const link = document.createElement('a')
                    link.href = URL.createObjectURL(blob)
                    link.download = `${this.documentModel.title}.pdf`
                    link.click()
                })
                .catch(console.error);
        }
    },
    computed: {
        getExt() {
            const splitted = this.documentModel.file.split('.')
            return `.${splitted[splitted.length - 1]}`
        },
        getIsLightTheme() {
            return this.$store.getters['theme/getIsLightTheme']
        },
    }
}
</script>

<style lang="scss" scoped>
article {
    width: 22.91rem;
    height: 11.45rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    padding: 1.56rem;
    border-radius: .52rem;
    border: 2px solid rgba(255, 255, 255, 0.2);
    position: relative;

    > p {
        font-size: .93rem;
        line-height: 1.19rem;
        margin-bottom: 1.04rem;
    }

    > .info {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;

        > .size {
            padding: .2rem .41rem;
            background-color: $accentBlue;
            color: white;
            border-radius: 3.12rem;
            margin-right: .62rem;
            font-size: .62rem;
            line-height: 120%;
            letter-spacing: .03em;
        }

        > .ext {
            font-size: .72rem;
            line-height: 120%;
            letter-spacing: .03em;
            opacity: .5;
            text-transform: uppercase;
        }
    }

    &.light {
        border-color: $greyColor;

        &:before {
            background-color: $lightBackgroundColor;
        }

        &:after {
            background-color: $greyColor;
            opacity: 1;
        }
    }

    &:before {
        content: '';
        position: absolute;
        right: -2px;
        top: -2px;
        width: 2.3rem;
        height: 2.2rem;
        background-color: $darkBackgroundColor;
        z-index: 1;
    }

    &:after {
        z-index: 2;
        content: '';
        position: absolute;
        right: 2.1rem;
        top: -2px;

        width: 2px;
        height: 3rem;
        background-color: white;
        opacity: .2;
        transform: rotateZ(-45deg);
        transform-origin: top right;
    }
}

@media screen and (max-width: 991px) {
    article {
        width: 40vw;
    }
}

@media screen and (max-width: 480px) {
    article {
        width: 90vw;
    }
}
</style>

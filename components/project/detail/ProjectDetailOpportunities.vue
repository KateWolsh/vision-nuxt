<template>
    <section :class="['main__container', {'light': getIsLightTheme}]">
        <article v-for="(opportunity, index) in opportunities" :key="`opportunity-${index}`">
            <span>
                {{ index + 1 < 10 ? `0${index + 1}` : index + 1 }}
            </span>

            <div class="line"></div>

            <p>
                {{ opportunity.text }}
            </p>
        </article>
    </section>
</template>

<script>
export default {
    name: "ProjectDetailOpportunities",
    props: {
        opportunities: {
            type: Array,
            required: true
        }
    },
    computed: {
        getIsLightTheme() {
            return this.$store.getters['theme/getIsLightTheme']
        },
    }
}
</script>

<style lang="scss" scoped>
section {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;

    > article {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 30%;
        margin-right: 5%;
        margin-bottom: 5rem;

        > span {
            font-weight: bold;
            font-size: 4.12rem;
            background: linear-gradient(206.57deg, #0D59D1 16.64%, #54AEFF 83.29%);
            -webkit-background-clip: text !important;
            -webkit-text-fill-color: transparent;
        }

        > .line {
            width: 4.16rem;
            height: 2px;
            background-color: white;
            opacity: .2;
            margin-top: 2.08rem;
            margin-bottom: 3.12rem;
        }

        > p {
            line-height: 1.6em;
            font-size: 1.25rem;
            font-weight: 300;
        }

        &:nth-of-type(3n) {
            margin-right: 0;
        }
    }

    &.light {
        > article {
            > .line {
                background-color: $greyColor;
            }
        }
    }
}

@media screen and (max-width: 991px) {
    section {
        justify-content: space-between;

        > article {
            width: 45%;
            margin-bottom: 4rem;
            margin-right: 0;

            > span {
                font-size: 4.6rem;
            }

            > .line {
                margin-top: 1.8rem;
                margin-bottom: 3rem;
            }
        }
    }
}

@media screen and (max-width: 480px) {
    section {

        > article {
            width: 100%;
            margin-bottom: 4rem;

            > span {
                font-size: 4.6rem;
            }

            > .line {
                margin-top: 1.8rem;
                margin-bottom: 3rem;
            }
        }
    }
}

</style>

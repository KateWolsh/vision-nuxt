<template>
    <section class="main__container">
        <div class="col info">
            <h2>
                Нам доверяют
            </h2>

            <p v-if="description">
                {{ description }}
            </p>

            <button @click="formScroll" class="blue__button">
                Попробовать продукт
            </button>
        </div>
        <div class="col statistics" ref="statisticWrapper">
            <article v-for="(statistic, index) in dynamicStatistics" :key="`statistic-${index}`">
                <number animationPaused
                        class="counter"
                        :ref="`counter-${index}`"
                        :to="+statistic.value"
                        :duration="1"/>
                <p class="title">
                    {{ statistic.title }}
                </p>
                <p class="text">
                    {{ statistic.text }}
                </p>
            </article>
        </div>
    </section>
</template>

<script>
import scrollToRef from "@/mixins/scrollToRef";

export default {
    name: "IndexStatisticsLib",
    props: {
        description: {
            type: String,
            required: false,
            default: ''
        },
        statistics: {
            type: Array,
            required: false,
            default: () => []
        }
    },
    data() {
        return {
            dynamicStatistics: [],
            isCounterRunning: false,
        }
    },
    watch: {
        statistics: {
            deep: true,
            immediate: true,
            handler() {
                this.dynamicStatistics = this.statistics.map((statistic) => {
                    return {
                        ...statistic,
                        currentValue: 0
                    }
                })
            }
        }
    },
    mounted() {
        window.addEventListener('scroll', this.onScroll)
    },
    methods: {
        onScroll(e) {
            const bounding = this.$refs.statisticWrapper.getBoundingClientRect()
            if ((bounding.y - (window.innerHeight / 2)) < 0 && !this.isCounterRunning && this.dynamicStatistics.length) {
                this.isCounterRunning = true
                this.dynamicStatistics.forEach((statistic, index) => {
                    const ref = `counter-${index}`
                    this.$refs[ref][0].play()
                })
            }
        },
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.onScroll)
    },
    mixins: [scrollToRef]
}
</script>

<style lang="scss" scoped>
section {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    > .col {
        width: 50%;
    }

    > .info {
        position: sticky;
        top: 10rem;

        > p {
            width: 90%;
            margin-bottom: 3.12rem;
            font-size: 1.2rem;
            line-height: 1.6em;
            font-weight: 400;
            white-space: pre-line;
        }
    }

    > .statistics {
        width: 35%;

        > article {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin-bottom: 10rem;

            > .counter {
                display: inline-flex;
                position: relative;
                font-size: 11rem;
                line-height: 1.2em;
                font-weight: 600;
                background: -webkit-linear-gradient(#eee, #333);
                -webkit-background-clip: text !important;
                -webkit-text-fill-color: transparent;

                &:before {
                    content: '';
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    filter: blur(7.29rem);
                    opacity: .2;
                    z-index: -1;
                }
            }

            > .title {
                line-height: 1.4em;
                font-weight: 700;
                margin-bottom: .5rem;
                font-size: 1.4rem;
            }

            > .text {
                font-size: 1.2rem;
                line-height: 1.5em;
                font-weight: 300;
            }

            &:last-of-type {
                margin-bottom: 0;
            }
        }

        > :nth-child(1n + 1) {
            > .counter {
                background: -webkit-linear-gradient(-90deg, #3DD99B, #EDFF22);

                &:before {
                    background: linear-gradient(206.57deg, #3DD99B 16.64%, #EDFF22 83.29%);
                }
            }
        }

        > :nth-child(2n + 1) {
            > .counter {
                background: -webkit-linear-gradient(-90deg, #B617A0, #F9AA40);

                &:before {
                    background: linear-gradient(206.57deg, #B617A0 16.64%, #F9AA40 83.29%);
                }
            }
        }

        > :nth-child(3n + 1) {
            > .counter {
                background: -webkit-linear-gradient(-90deg, #2CCF8B, #64ABFF);

                &:before {
                    background: #269BC0;
                }
            }
        }
    }
}

@media screen and (max-width: 991px) {
    section {
        flex-direction: column;

        > .col {
            width: 100%;
        }

        > .info {
            position: relative;
            top: auto;
            margin-bottom: 5rem;
        }
    }
}

@media screen and (max-width: 480px) {
    section {

        > .info {


            > p {
                width: 100%;
                margin-bottom: 3.12rem;
                font-size: 1.07rem;
            }

            > .blue__button {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                padding: 1.3rem 2.14rem;
                font-size: .78rem;
            }
        }

        > .statistics {
            width: 100%;

            > article {
                margin-bottom: 7rem;

                > .counter {
                    font-size: 8rem;

                    &:before {
                        content: '';
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                        filter: blur(7.29rem);
                        opacity: .2;
                        z-index: -1;
                    }
                }

                > .title {
                    font-size: 1.4rem;
                }

                > .text {
                    width: 85%;
                    font-size: 1.07rem;
                }
            }
        }
    }
}

@media not all and (min-resolution: .001dpcm) {
    section {
        > .statistics {
            > :nth-child(1n + 1) {
                > .counter {
                    color: #93EB5F;
                    background: transparent;
                    -webkit-background-clip: unset !important;
                    -webkit-text-fill-color: unset !important;

                    &:before {
                        content: unset;
                    }
                }
            }

            > :nth-child(2n + 1) {
                > .counter {
                    color: #D75E72;
                    background: transparent;
                    -webkit-background-clip: unset !important;
                    -webkit-text-fill-color: unset !important;

                    &:before {
                        content: unset;
                    }
                }
            }

            > :nth-child(3n + 1) {
                > .counter {
                    color: #48BDC5;
                    background: transparent;
                    -webkit-background-clip: unset !important;
                    -webkit-text-fill-color: unset !important;

                    &:before {
                        content: unset;
                    }
                }
            }
        }
    }
}

</style>

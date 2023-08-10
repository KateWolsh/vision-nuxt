<template>
    <section class="main__container" v-if="team.length">
        <h2>
            Наша команда
        </h2>

        <div class="team__wrapper">
            <div class="col">
                <index-team-card v-for="(card, index) in team.slice(0, 1)"
                                 :index="index"
                                 :card="card"
                                 :key="`card-0-${index}`"
                                 :is-main="true"/>
            </div>

            <div class="col">
                <index-team-card v-for="(card, index) in team.slice(1)"
                                 :index="index"
                                 :card="card"
                                 :key="`card-1-${index}`"/>

                <div class="counter" v-if="count">
                    <span>{{ count }}+</span>
                    <p>Человек в команде</p>
                </div>

                <p class="info">
                    Мы всегда в поиске новых талантов в области аналитики, программирования и Data Science
                </p>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "IndexTeam",
    props: {
        count: {
            type: Number,
            required: false,
            default: 0
        },
        team: {
            type: Array,
            required: false,
            default: () => []
        }
    },
}
</script>

<style lang="scss" scoped>
.main__container {

    > h2 {
        margin-bottom: 3.12rem;
    }

    .team__wrapper {
        display: grid;
        grid-template-rows: 1fr;
        grid-template-columns: 1fr 2fr;
        grid-gap: 6.25rem;

        > .col {
            &:not(:first-of-type) {
                display: grid;
                grid-auto-rows: auto;
                grid-template-columns: 1fr 1fr;
                grid-gap: 2.08rem;

                > .counter {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;

                    > span {
                        margin-top: -2rem;
                        font-size: 10rem;
                        color: $accentBlue;
                        font-weight: 600;
                    }

                    > p {
                        margin-top: -1rem;
                        font-size: 1.4rem;
                        line-height: 1.4em;
                        font-weight: 700;
                    }
                }

                > .info {
                    font-weight: 300;
                    width: 100%;
                    font-style: italic;
                    font-size: .93rem;
                    line-height: 150%;
                }
            }
        }
    }
}

@media screen and (max-width: 991px) {
    .main__container {

        .team__wrapper {
            grid-template-rows: 1fr;
            grid-template-columns: 1fr;
        }
    }
}

@media screen and (max-width: 480px) {
    .main__container {

        .team__wrapper {

            > .col {
                &:not(:first-of-type) {
                    grid-auto-rows: auto;
                    grid-template-columns: 1fr;

                    // TODO bottom
                    > .counter {

                        > span {
                            font-size: 8rem;
                        }

                        > p {
                            font-size: 1.07rem;
                        }
                    }

                    > .info {
                        font-size: 1.07rem;
                    }
                }
            }
        }
    }
}
</style>

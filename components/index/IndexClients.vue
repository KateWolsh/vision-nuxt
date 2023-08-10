<template>
    <section :class="{'light': getIsLightTheme}">
        <div v-for="(row, index) in rows"
             class="row"
             :style="{left: row.position + 'px'}"
             :ref="row.ref"
             :id="row.ref"
             :key="`row-${index}`">
            <article v-for="(client, j) in clients" :key="`client-${index}-${j}`">
                <img :src="client.image" alt="">
            </article>
        </div>
    </section>
</template>

<script>
export default {
    name: "IndexClients",
    props: {
        clients: {
            type: Array,
            required: false,
            default: () => []
        }
    },
    data() {
        return {
            rows: [
                {
                    position: 0,
                    ref: 'clientRow0',
                    element: null,
                    bounding: null,
                },
                {
                    position: 0,
                    ref: 'clientRow1',
                    element: null,
                    bounding: null,
                },
                {
                    position: 0,
                    ref: 'clientRow2',
                    element: null,
                    bounding: null,
                }
            ],
            intervalId: null
        }
    },
    mounted() {
        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

        setTimeout(() => {
            this.rows.forEach((row, index) => {
                row.element = this.$refs[row.ref][0]
                row.bounding = row.element.getBoundingClientRect()

                if (index && this.rows[index - 1].bounding) {
                    const prevRowBounding = this.rows[index - 1].bounding
                    row.position = index * prevRowBounding.width
                }
            })
            window.requestAnimationFrame(this.moveClientsRows)
        }, 500)
    },
    beforeDestroy() {
        clearInterval(this.intervalId)
    },
    methods: {
        moveClientsRows() {
            this.rows.forEach((row, index) => {
                row.position -= 3
                row.bounding = row.element.getBoundingClientRect()

                if (row.position < -row.bounding.width) {
                    if (index) {
                        const prevRowBounding = this.rows[index - 1].bounding
                        row.position = prevRowBounding.left + prevRowBounding.width
                    } else {
                        const nextRowBounding = this.rows[this.rows.length - 1].bounding
                        row.position = nextRowBounding.left + nextRowBounding.width
                    }
                }
            })
            window.requestAnimationFrame(this.moveClientsRows)
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
    width: 100%;
    height: 4.21rem;
    position: relative;
    display: flex;
    overflow: hidden;

    > .row {
        display: flex;
        position: absolute;
        left: 0;
        top: 0;

        > article {
            position: relative;
            padding: 1rem 4rem;

            img {
                height: 2rem;
            }

            &:before {
                content: '';
                position: absolute;
                transform: translateY(-50%);
                top: 50%;
                right: 0;
                width: 2px;
                height: 1.66rem;
                background-color: white;
            }
        }
    }

    &.light {
        > .row {
            > article {
                img {
                    -webkit-filter: invert(100%); /* Safari/Chrome */
                    filter: invert(100%);
                }

                &:before {
                    background-color: black;
                }
            }
        }
    }
}
</style>

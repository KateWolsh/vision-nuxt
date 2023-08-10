<template>
    <section class="main__container">
        <h2>
            Инновационные решения
        </h2>

        <p v-if="description">
            {{ description }}
        </p>

        <main-tabs :tabs="getTabs" @changeTab="changeTab" :is-active="isButtonActive"/>

        <div class="innovations__wrapper" v-for="(tab, i) in getTabs"
             :key="`innovation-tab-${i}`"
             v-show="i === current">
            <index-innovations-card v-for="(innovation, j) in tab.innovations"
                                    :innovation="innovation"
                                    :index="j"
                                    :key="`${i}-innovation-${j}`"/>
        </div>
    </section>
</template>

<script>
// TODO : grid template in wrapper

export default {
    name: "IndexInnovations",
    props: {
        description: {
            type: String,
            required: false,
            default: ''
        },
        innovations: {
            type: Array,
            required: false,
            default: () => []
        }
    },
    data() {
        return {
            current: 0,
            isButtonActive: true
        }
    },
    methods: {
        changeTab(event) {
            if (this.isButtonActive) {
                this.current = event.current
                this.isButtonActive = false
                setTimeout(() => {
                    this.isButtonActive = true
                }, (this.innovations.length - 1) * 250)
            }
        }
    },
    computed: {
        getTabs() {
            return [
                {
                    title: 'Государственному сектору',
                    innovations: this.innovations.filter(innovation => innovation.type === 'GOVERNMENT')
                },
                {
                    title: 'Бизнесу и стартапам',
                    innovations: this.innovations.filter(innovation => innovation.type === 'BUSINESS')
                },
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.main__container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    > p {
        margin-bottom: 3.12rem;
        width: 50%;
        font-size: 1.25rem;
        line-height: 140%;
    }

    > .innovations__wrapper {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        flex-wrap: wrap;
        margin-top: 5rem;

        > article {
            margin-top: -7%;
            margin-left: -7%;
            padding: 7%;
        }
    }
}

@media screen and (max-width: 480px) {
    .main__container {

        > p {
            margin-bottom: 3.12rem;
            width: 100%;
            font-size: 1.07rem;
        }

        > .innovations__wrapper {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin-top: 2.5rem;
        }
    }
}
</style>

<template>
    <section class="main__container">
        <h2>
            Наши партнеры
        </h2>
        <div class="partners__wrapper">
            <index-partners-card v-for="(partner, index) in partners"
                                 :index="index"
                                 :partner="partner"
                                 :key="`partner-${index}`"/>
        </div>
    </section>
</template>

<script>
export default {
    name: "IndexPartners",
    props: {
        partners: {
            type: Array,
            required: false,
            default: () => []
        }
    },
}
</script>

<style lang="scss" scoped>
section {
    h2 {
        margin-bottom: 5rem !important;
    }

    .partners__wrapper {
        display: grid;
        grid-template-rows: 1fr 1fr;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-gap: 2rem;
    }
}

@media screen and (max-width: 480px) {
    section {
        h2 {
            margin-bottom: 3rem !important;
        }

        .partners__wrapper {
            grid-auto-rows: auto;
            grid-template-columns: 1fr 1fr;
        }
    }
}
</style>
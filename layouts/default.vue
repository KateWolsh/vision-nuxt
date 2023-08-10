<template>
    <main class="layout__wrapper">
        <main-header/>

        <transition name="fade" mode="out-in">
            <Nuxt @formScroll="onFormScroll"/>
        </transition>

        <main-form ref="mainForm"/>

        <main-footer/>
    </main>
</template>

<script>
import scrollToRef from "@/mixins/scrollToRef";

export default {
    name: "default",
    head() {
        return {
            bodyAttrs: {
                class: `with__fade ${this.getIsLightTheme ? 'light' : ''}`
            }
        }
    },
    watch: {
        $route() {
            window.scrollTo(0, 0)
        }
    },
    mounted() {
        this.$store.commit('theme/setIsLightTheme', localStorage.getItem('isLightTheme'))
    },
    methods: {
        onFormScroll() {
            this.scrollToElement(this.$refs.mainForm.$el)
        }
    },
    computed: {
        getIsLightTheme() {
            return this.$store.getters['theme/getIsLightTheme']
        }
    },
    mixins: [scrollToRef]
}
</script>

<style lang="scss">

@import "../assets/scss/main";

.layout__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 5rem;
}

</style>

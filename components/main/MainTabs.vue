<template>
    <section :class="['tabs__wrapper scroll_dark', {'light': getIsLightTheme, 'sub-tabs': isSubTabs}]" ref="tabsWrapper">
        <button v-for="(tab, index) in tabs"
                :disabled="!isActive"
                :ref="`tab${index}`"
                :key="`tab-${index}`"
                :class="['outline__button',{'active': index === current}]"
                @click="setCurrentTab(index)">
            {{ tab.title }}
        </button>
    </section>
</template>

<script>
export default {
    name: "MainTabs",
    props: {
        tabs: {
            type: Array,
            required: true
        },
        isActive: {
            type: Boolean,
            required: false,
            default: true
        },
        isSubTabs: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    data() {
        return {
            current: 0,
            tabsScrollIntervalId: null
        }
    },
    watch: {
        current() {
            this.tabsScrollIntervalId = clearInterval(this.tabsScrollIntervalId)
        }
    },
    mounted() {
        window.addEventListener('scroll', this.onScroll)
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.onScroll)
    },
    methods: {
        onScroll() {
            const wrapperDom = this.$refs.tabsWrapper
            if (wrapperDom.scrollWidth > wrapperDom.clientWidth && !this.tabsScrollIntervalId) {
                this.tabsScrollIntervalId = setInterval(() => {
                    const wrapperPadding = window.innerWidth / 20
                    const currentTabBounding = this.$refs[`tab${this.current}`][0].getBoundingClientRect()

                    if (currentTabBounding.x > wrapperPadding * 2) {
                        wrapperDom.scrollBy(3, 0)
                    } else if (currentTabBounding.x < wrapperPadding) {
                        wrapperDom.scrollBy(-3, 0)
                    } else {
                        this.tabsScrollIntervalId = clearInterval(this.tabsScrollIntervalId)
                    }

                    if (wrapperDom.scrollLeft === wrapperDom.scrollWidth - wrapperDom.clientWidth) {
                        this.tabsScrollIntervalId = clearInterval(this.tabsScrollIntervalId)
                    }
                }, 10)
            }
        },
        outerSetCurrentTab(index) {
            this.current = index
        },
        setCurrentTab(index) {
            this.current = index
            this.$emit('changeTab', {
                current: this.current
            })
        }
    },
    computed: {
        getIsLightTheme() {
            return this.$store.getters['theme/getIsLightTheme']
        }
    }
}
</script>

<style lang="scss" scoped>
.tabs__wrapper {
    display: flex;
    overflow-x: auto;

    > button {
        margin-right: .5rem;
        white-space: nowrap;

        &.active {
            background-color: $accentBlue;
            border: 2px solid $accentBlue;
        }
    }

    &.light {
        > button {
            &.active {
                color: white;
            }
        }
    }

    &.sub-tabs {
        border-bottom: 1px solid rgba(255, 255, 255, .3);

        > button {
            margin-right: 2rem;
            border: none;
            border-bottom: 2px solid transparent;
            padding: 1.25rem 0;
            border-radius: 0;
            font-size: 1rem;
            opacity: .5;

            &.active {
                opacity: 1;
                background: transparent;
                border-color: $accentBlue;
            }

            &:hover {
                background: transparent !important;
            }
        }
    }
}
</style>

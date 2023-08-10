<template>
    <section class="main__container">
        <main-slider-controls :slides="interfaces"
                              :current-slide="currentSlide"
                              @slide="slideInterface"/>

        <transition name="slide-left-small" mode="out-in">
            <project-detail-interface-card :key="`interface-card-${currentSlide}`"
                                           :interfaces="interfaces[currentSlide]"/>
        </transition>
    </section>
</template>

<script>
export default {
    name: "ProjectDetailInterface",
    props: {
        interfaces: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            currentSlide: 0
        }
    },
    methods: {
        slideInterface(event) {
            if (event.direction && this.currentSlide < this.interfaces.length - 1) {
                this.currentSlide++
            } else if (!event.direction && this.currentSlide > 0) {
                this.currentSlide--
            }
        }
    }
}
</script>

<style lang="scss" scoped>
section {
    display: flex;
    align-items: center;
    justify-content: center;

    > .controls {
        position: absolute;
        bottom: 1rem;
        left: 0;
        z-index: 10;
    }
}

@media screen and (max-width: 991px) {
    section {
        > .controls {
            bottom: auto;
            top: 31rem;
            left: 50%;
            transform: translateX(-50%);
        }
    }
}

@media screen and (max-width: 480px) {
    section {
        > .controls {
            top: 14rem;
        }
    }
}
</style>

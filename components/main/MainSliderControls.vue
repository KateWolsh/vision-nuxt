<template>
    <div :class="['controls', {'light': getIsLightTheme}]">
        <button @click="slide(false)">
            <img src="@/assets/img/icons/arrow_light.svg" v-if="getIsLightTheme">
            <img src="@/assets/img/icons/arrow.svg" v-else>
        </button>

        <div class="points">
                <span v-for="(slide, index) in slides"
                      :class="{'active': index === currentSlide}"
                      :key="`slider-point-${index}`">
                </span>
        </div>

        <button @click="slide(true)">
            <img src="@/assets/img/icons/arrow_light.svg" v-if="getIsLightTheme">
            <img src="@/assets/img/icons/arrow.svg" v-else>
        </button>
    </div>
</template>

<script>
export default {
    name: "MainSliderControls",
    props: {
        slides: {
            type: Array,
            required: true
        },
        currentSlide: {
            type: Number,
            required: true
        }
    },
    methods: {
        slide(direction) {
            this.$emit('slide', {
                direction
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
.controls {
    display: flex;

    > button {
        border: none;
        background: none;
        padding: 1rem;

        > img {
            width: .67rem;
            height: .67rem;
            object-fit: contain;
            object-position: center;
        }

        &:first-of-type {
            > img {
                transform: rotateZ(180deg);
            }
        }
    }

    > .points {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 0 2.85rem;

        > span {
            width: .5rem;
            height: .5rem;
            background-color: transparent;
            margin-right: 1rem;
            border-radius: 50%;
            border: 1px solid white;
            opacity: .5;
            transition: $animTime;

            &.active {
                opacity: 1;
                border-color: $accentBlue;
                background-color: $accentBlue;
            }

            &:last-of-type {
                margin-right: 0;
            }
        }
    }

    &.light {
        > .points {
            > span {
                border-color: black;
            }
        }
    }
}
</style>

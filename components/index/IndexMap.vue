<template>
    <section ref="mainWrapper" :class="{'light': getIsLightTheme}">
        <h2 class="main__container">
            Охват регионов
        </h2>

        <div v-if="popup" id="popup" ref="popup" :style="getPopupPosition">
            <h3>
                {{ popup.title }}
            </h3>
            <h4 v-if="popup.subTitle">
                {{ popup.subTitle }}
            </h4>

            <div class="row" v-if="'statistics' in popup && popup.statistics.length">
                <div class="col" v-for="(statistic, index) in popup.statistics"
                     :key="`popup-statistic-${index}`">
                    <label>
                        {{ statistic.title }}
                    </label>
                    <p>
                        {{ statistic.value }}
                    </p>
                </div>
            </div>
            <div class="features" v-if="'features' in popup && popup.features.length">
                <p v-for="(feature, index) in popup.features" :key="`popup-feature-${index}`">
                    {{ feature }}
                </p>
            </div>
        </div>

        <canvas :style="getCanvasScale" id="canvas" ref="canvas"></canvas>
    </section>
</template>

<script>
export default {
    name: "IndexMap",
    props: {
        map: {
            type: Array,
            required: false,
            default: () => []
        }
    },
    data() {
        return {
            canvas: null,
            ctx: null,
            background: null,

            cities: [
                {
                    x: 185,
                    y: 230,
                    title: 'Москва',
                    subTitle: 'Московская область',
                    statistics: [],
                },
                {
                    x: 210,
                    y: 120,
                    title: 'Санкт-Петербург',
                    subTitle: 'Ленинградская область',
                    statistics: [],
                },
                {
                    x: 105,
                    y: 205,
                    title: 'Брянск',
                    subTitle: 'Брянская область',
                    statistics: [],
                },
                {
                    x: 125,
                    y: 245,
                    title: 'Орел',
                    subTitle: 'Орловская область',
                    statistics: [],
                },
                {
                    x: 285,
                    y: 225,
                    title: 'Вологда',
                    subTitle: 'Вологодская область',
                    statistics: [],
                    features: []
                },
                {
                    x: 25,
                    y: 335,
                    title: 'Ростов-на-дону',
                    subTitle: 'Краснодарский край',
                    statistics: [],
                    features: []
                },
                {
                    x: 15,
                    y: 365,
                    title: 'Сочи',
                    subTitle: 'Краснодарский край',
                    statistics: [],
                    features: []
                },
                {
                    x: 55,
                    y: 390,
                    title: 'Ставрополь',
                    subTitle: 'Ставропольский край',
                    statistics: [],
                    features: []
                },
                {
                    x: 175,
                    y: 350,
                    title: 'Саратов',
                    subTitle: 'Саратовская область',
                    statistics: [],
                    features: []
                },
                {
                    x: 225,
                    y: 350,
                    title: 'Самара',
                    subTitle: 'Самарская область',
                    statistics: [],
                    features: [],
                },
                {
                    x: 365,
                    y: 245,
                    title: 'Сыктывкар',
                    subTitle: 'Республика Коми',
                    statistics: [],
                    features: []
                },
                {
                    x: 400,
                    y: 235,
                    title: 'Ухта',
                    subTitle: 'Республика Коми',
                    statistics: [],
                    features: []
                },
                {
                    x: 490,
                    y: 235,
                    title: 'Воркута',
                    subTitle: 'Республика Коми',
                    statistics: [],
                    features: []
                },
                {
                    x: 510,
                    y: 265,
                    title: 'Салехард',
                    subTitle: 'Ямало-Ненецкий АО',
                    statistics: [],
                    features: []
                },
                {
                    x: 325,
                    y: 335,
                    title: 'Пермь',
                    subTitle: 'Пермский край',
                    statistics: [],
                    features: []
                },
                {
                    x: 390,
                    y: 335,
                    title: 'Нижний тагил',
                    subTitle: 'Свердловская область',
                    statistics: [],
                    features: []
                },
                {
                    x: 380,
                    y: 355,
                    title: 'Екатеринбург',
                    subTitle: 'Свердловская область',
                    statistics: [],
                    features: []
                },
                {
                    x: 480,
                    y: 350,
                    title: 'Ханты-Мансийск',
                    subTitle: 'Ханты-Мансийский АО',
                    statistics: [],
                    features: []
                },
                {
                    x: 430,
                    y: 390,
                    title: 'Тюмень',
                    subTitle: 'Тюменская область',
                    statistics: [],
                    features: []
                },
                {
                    x: 545,
                    y: 540,
                    title: 'Барнаул',
                    subTitle: 'Алтайский край',
                    statistics: [],
                    features: []
                },
                {
                    x: 600,
                    y: 510,
                    title: 'Новокузнецк',
                    subTitle: 'Кемеровская область',
                    statistics: [],
                    features: []
                },
                {
                    x: 1000,
                    y: 410,
                    title: 'Якутия',
                    subTitle: 'Республика Саха',
                    statistics: [],
                    features: []
                },
            ],
            citiesPoints: [],
            citiesAreas: [],

            regions: [
                {
                    x: 185,
                    y: 200,
                    path: [
                        [160, 200],
                        [180, 200],
                        [200, 210],
                        [200, 240],
                        [170, 240],
                        [165, 230],
                        [170, 225],
                    ],
                    title: 'Московская область',
                    statistics: [],
                    features: [],
                    hoverImage: {
                        path: require("../../assets/img/background/msc.png"),
                        x: 162,
                        y: 195,
                        w: 42,
                        h: 49,
                    }
                },
                {
                    x: 250,
                    y: 110,
                    path: [
                        [200, 105],
                        [240, 95],
                        [270, 150],
                        [230, 170],
                        [225, 140],
                        [190, 130],
                    ],
                    title: 'Ленинградская область',
                    statistics: [],
                    features: [],
                    hoverImage: {
                        path: require("../../assets/img/background/leningrad.png"),
                        x: 193,
                        y: 95,
                        w: 73,
                        h: 70,
                    }
                },
                {
                    x: 130,
                    y: 210,
                    path: [
                        [90, 190],
                        [130, 190],
                        [130, 225],
                        [95, 235],
                    ],
                    title: 'Брянская область',
                    statistics: [],
                    features: [],
                    hoverImage: {
                        path: require("../../assets/img/background/bryansk.png"),
                        x: 88,
                        y: 188,
                        w: 42,
                        h: 42,
                    }
                },
                {
                    x: 140,
                    y: 240,
                    path: [
                        [110, 230],
                        [140, 225],
                        [140, 260],
                        [115, 260],
                    ],
                    title: 'Орловская область',
                    statistics: [],
                    features: [],
                    hoverImage: {
                        path: require("../../assets/img/background/orel.png"),
                        x: 109,
                        y: 224,
                        w: 29,
                        h: 35,
                    }
                },
                {
                    x: 280,
                    y: 170,
                    path: [
                        [225, 170],
                        [270, 150],
                        [275, 155],
                        [320, 235],
                        [290, 245],
                        [240, 210],
                        [230, 180],
                    ],
                    title: 'Вологодская область',
                    statistics: [],
                    features: [],
                    hoverImage: {
                        path: require("../../assets/img/background/vologda.png"),
                        x: 223,
                        y: 150,
                        w: 95,
                        h: 96,
                    }
                },
                {
                    x: 60,
                    y: 340,
                    path: [
                        [0, 320],
                        [50, 320],
                        [50, 355],
                        [25, 385],
                        [0, 385],
                        [0, 335],
                    ],
                    title: 'Краснодарский край',
                    statistics: [],
                    features: [],
                    hoverImage: {
                        path: require("../../assets/img/background/krasnodar.png"),
                        x: 0,
                        y: 320,
                        w: 51,
                        h: 68,
                    }
                },
                {
                    x: 60,
                    y: 340,
                    path: [
                        [30, 395],
                        [45, 365],
                        [65, 375],
                        [70, 420],
                        [50, 430],
                    ],
                    title: 'Ставропольский край',
                    statistics: [],
                    features: [],
                    hoverImage: {
                        path: require("../../assets/img/background/stavropol.png"),
                        x: 29,
                        y: 363,
                        w: 42,
                        h: 65,
                    }
                },
                {
                    x: 200,
                    y: 330,
                    path: [
                        [140, 310],
                        [160, 300],
                        [205, 345],
                        [210, 375],
                        [165, 385],
                    ],
                    title: 'Саратовская область',
                    statistics: [],
                    features: [],
                    hoverImage: {
                        path: require("../../assets/img/background/saratov.png"),
                        x: 142,
                        y: 302,
                        w: 67,
                        h: 80,
                    }
                },
                {
                    x: 250,
                    y: 350,
                    path: [
                        [205, 345],
                        [210, 330],
                        [260, 340],
                        [260, 350],
                        [215, 375],
                    ],
                    title: 'Самарская область',
                    statistics: [],
                    features: [],
                    hoverImage: {
                        path: require("../../assets/img/background/samara.png"),
                        x: 205,
                        y: 330,
                        w: 55,
                        h: 43,
                    }
                },
                {
                    x: 450,
                    y: 220,
                    path: [
                        [310, 260],
                        [365, 185],
                        [445, 185],
                        [490, 230],
                        [530, 225],
                        [530, 240],
                        [450, 250],
                        [410, 290],
                        [365, 265],
                    ],
                    title: 'Республика Коми',
                    statistics: [],
                    features: [],
                    hoverImage: {
                        path: require("../../assets/img/background/komi.png"),
                        x: 311,
                        y: 184,
                        w: 220,
                        h: 110,
                    }
                },
                {
                    x: 650,
                    y: 220,
                    path: [
                        [480, 250],
                        [530, 240],
                        [540, 210],
                        [610, 170],
                        [655, 210],
                        [640, 340],
                        [625, 380],
                        [535, 330],
                        [475, 270],
                    ],
                    title: 'Ямало-Ненецкий АО',
                    statistics: [],
                    features: [],
                    hoverImage: {
                        path: require("../../assets/img/background/yamalo.png"),
                        x: 470,
                        y: 170,
                        w: 185,
                        h: 212,
                    }
                },
                {
                    x: 400,
                    y: 300,
                    path: [
                        [300, 330],
                        [350, 265],
                        [410, 295],
                        [340, 350],
                        [325, 355],

                    ],
                    title: 'Пермский край',
                    statistics: [],
                    features: [],
                    hoverImage: {
                        path: require("../../assets/img/background/perm.png"),
                        x: 302,
                        y: 265,
                        w: 107,
                        h: 92,
                    }
                },
                {
                    x: 420,
                    y: 320,
                    path: [
                        [340, 350],
                        [415, 290],
                        [425, 320],
                        [425, 370],
                        [400, 395],
                        [340, 370],
                    ],
                    title: 'Свердловская область',
                    statistics: [],
                    features: [],
                    hoverImage: {
                        path: require("../../assets/img/background/sverdlovk.png"),
                        x: 340,
                        y: 292,
                        w: 88,
                        h: 102,
                    }
                },
                {
                    x: 520,
                    y: 320,
                    path: [
                        [415, 285],
                        [460, 250],
                        [480, 250],
                        [470, 270],
                        [520, 320],
                        [630, 390],
                        [620, 410],
                        [550, 390],
                        [510, 410],
                        [475, 370],
                        [425, 375],
                        [425, 315],
                    ],
                    title: 'Ханты-Мансийский АО',
                    statistics: [],
                    features: [],
                    hoverImage: {
                        path: require("../../assets/img/background/hantimansi.png"),
                        x: 415,
                        y: 250,
                        w: 210,
                        h: 160,
                    }
                },
                {
                    x: 520,
                    y: 320,
                    path: [
                        [395, 400],
                        [425, 375],
                        [465, 375],
                        [475, 370],
                        [500, 410],
                        [430, 445],
                    ],
                    title: 'Тюменская область',
                    statistics: [],
                    features: [],
                    hoverImage: {
                        path: require("../../assets/img/background/tymen.png"),
                        x: 395,
                        y: 368,
                        w: 112,
                        h: 78,
                    }
                },
                {
                    x: 570,
                    y: 525,
                    path: [
                        [490, 510],
                        [540, 510],
                        [580, 520],
                        [595, 534],
                        [590, 550],
                        [550, 575],
                        [500, 560],
                    ],
                    title: 'Алтайский край',
                    statistics: [],
                    features: [],
                    hoverImage: {
                        path: require("../../assets/img/background/altay.png"),
                        x: 492,
                        y: 506,
                        w: 104,
                        h: 70,
                    }
                },
                {
                    x: 620,
                    y: 515,
                    path: [
                        [580, 515],
                        [585, 485],
                        [640, 485],
                        [615, 560],
                        [595, 555],
                        [595, 535],
                    ],
                    title: 'Кемеровская область',
                    statistics: [],
                    features: [],
                    hoverImage: {
                        path: require("../../assets/img/background/cemerovo.png"),
                        x: 578,
                        y: 483,
                        w: 55,
                        h: 79,
                    }
                },
                {
                    x: 1060,
                    y: 200,
                    path: [
                        [840, 200],
                        [950, 190],
                        [970, 220],
                        [1020, 190],
                        [1010, 170],
                        [1160, 130],
                        [1180, 210],
                        [1150, 270],
                        [1150, 320],
                        [1120, 350],
                        [1120, 380],
                        [1100, 400],
                        [1090, 480],
                        [960, 490],
                        [950, 450],
                        [855, 455],
                        [815, 345],
                        [815, 280],
                        [850, 250],
                    ],
                    title: 'Республика Саха',
                    statistics: [],
                    features: [],
                    hoverImage: {
                        path: require("../../assets/img/background/jakutiya.png"),
                        x: 812,
                        y: 133,
                        w: 377,
                        h: 359,
                    }
                },
            ],
            regionsPoints: [],

            isCanEntry: true,
            defaultScale: 1,
            isScaling: false,
            scalingPosition: {
                x: 0,
                y: 0
            },
            isTransition: false,

            popup: null,
            popupPosition: {
                x: window?.innerWidth / 2,
                y: window?.innerHeight / 2
            }
        }
    },
    watch: {
        getIsLightTheme() {
            this.background = new Image();
            this.background.src = require(`../../assets/img/background/main-map${this.getIsLightTheme ? '-light' : ''}.png`);
            this.background.onload = () => {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                this.ctx.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height);
            }
        },
        map: {
            deep: true,
            immediate: true,
            handler() {
                this.map.forEach((point) => {
                    const cityIndex = this.cities.findIndex(city => city.title === point.title)
                    if (cityIndex >= 0) {
                        this.cities[cityIndex].statistics = point.statistic
                        this.cities[cityIndex].features = point.project
                    }

                    const regionIndex = this.regions.findIndex(region => region.title === point.title)
                    if (regionIndex >= 0) {
                        this.regions[regionIndex].statistics = point.statistic
                        this.regions[regionIndex].features = point.project
                    }
                })
            }
        }
    },
    mounted() {
        this.onResize()
        window.addEventListener('resize', this.onResize)

        this.canvas = this.$refs.canvas
        this.ctx = this.canvas.getContext("2d")
        this.canvas.width = 1400
        this.canvas.height = 700

        // CREATE BACKGROUND
        this.background = new Image();
        this.background.src = require(`../../assets/img/background/main-map${this.getIsLightTheme ? '-light' : ''}.png`);
        this.background.onload = () => {
            this.ctx.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height);
        }


        // CREATE CITIES POINTS
        this.cities.forEach((city) => {
            this.citiesAreas.push(this.createPoint(city, 11, 'rgba(255,255,255,0)'))
            this.citiesPoints.push(this.createPoint(city, 4, 'white'))
        })

        // CREATE REGIONS POINTS
        this.regions.forEach((region, index) => {
            this.regionsPoints.push(this.createRegion(region))
            const image = new Image();
            image.src = region.hoverImage.path;
            this.regions[index].hoverImage.image = image;
        })

        this.$refs.mainWrapper.addEventListener('mouseenter', this.onMouseEnter)
        this.$refs.mainWrapper.addEventListener('mouseleave', this.onMouseLeave)
        this.canvas.addEventListener('mouseleave', this.onCanvasMouseLeave)

        /*this.canvas.addEventListener('mouseenter', this.onMouseEnter)
        this.canvas.addEventListener('mouseleave', this.onMouseLeave)*/
        this.canvas.addEventListener('mousemove', this.onMouseMove)
    },
    beforeDestroy() {
        this.$refs.mainWrapper.removeEventListener('mouseenter', this.onMouseEnter)
        this.$refs.mainWrapper.removeEventListener('mouseleave', this.onMouseLeave)
        this.canvas.removeEventListener('mouseleave', this.onCanvasMouseLeave)

        /*this.canvas.removeEventListener('mouseenter', this.onMouseEnter)
        this.canvas.removeEventListener('mouseleave', this.onMouseLeave)*/
        this.canvas.removeEventListener('mousemove', this.onMouseMove)
        window.removeEventListener('resize', this.onResize)
    },
    methods: {
        onMouseEnter() {
            this.isTransition = true
            setTimeout(() => {
                this.isTransition = false
            }, 500)
            this.isScaling = true
        },
        onMouseLeave() {
            this.isTransition = true
            setTimeout(() => {
                this.isTransition = false
            }, 500)
            this.isScaling = false
            this.popup = null
        },
        onCanvasMouseLeave() {
            this.popup = null
        },
        onResize() {
            this.defaultScale = window.innerWidth / 2000
        },
        onMouseMove(event) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height);
            let isPopup = false

            this.regionsPoints.forEach((regionPoint, index) => {
                const region = this.regions[index]
                if (this.ctx.isPointInPath(regionPoint, event.offsetX, event.offsetY)) {
                    isPopup = true
                    this.popup = region
                    this.ctx.fillStyle = 'rgba(0, 255, 0, .3)';
                    this.ctx.drawImage(
                        region.hoverImage.image,
                        region.hoverImage.x,
                        region.hoverImage.y,
                        region.hoverImage.w,
                        region.hoverImage.h
                    );
                } else {
                    this.ctx.fillStyle = 'rgba(255, 0, 0, .3)';
                }
            })

            this.citiesAreas.forEach((cityPoint, index) => {
                const city = this.cities[index]
                if (this.ctx.isPointInPath(cityPoint, event.offsetX, event.offsetY)) {
                    isPopup = true
                    this.popup = city
                    this.ctx.fillStyle = 'red';
                } else {
                    this.ctx.fillStyle = 'green';
                }
            })

            this.citiesPoints.forEach((cityPoint, index) => {
                this.ctx.fillStyle = 'white';
                this.ctx.fill(cityPoint);
            })

            // page client screen

            this.popupPosition.x = event.clientX
            this.popupPosition.y = event.clientY

            if (!isPopup) {
                this.popup = null
            }
        },
        createPoint(city, radius, color) {
            const circle = new Path2D();
            circle.arc(city.x, city.y, radius, 0, 2 * Math.PI);
            this.ctx.fillStyle = color;
            this.ctx.fill(circle);
            return circle
        },
        createRegion(region) {
            const polygon = new Path2D();

            region.path.forEach((coordinate, index) => {
                if (!index) {
                    polygon.moveTo(coordinate[0], coordinate[1]);
                }
                polygon.lineTo(coordinate[0], coordinate[1]);
            })

            return polygon
        }
    },
    computed: {
        getIsLightTheme() {
            return this.$store.getters['theme/getIsLightTheme']
        },
        getCanvasScale() {
            let offset = {
                x: 0,
                y: 0,
            }

            if (this.isScaling) {
                const center = {
                    x: window ? window.innerWidth / 2 : 800,
                    y: window ? window.innerHeight / 2 : 800,
                }

                offset.x = (center.x - this.popupPosition.x) / 50
                offset.y = (center.y - this.popupPosition.y) / 50
            }
            const translate = `translate(${offset.x}%, ${offset.y}%)`
            const scale = `scale(${this.isScaling ? this.defaultScale * 1.15 : this.defaultScale})`
            return {
                transform: `${translate} ${scale}`,
                transition: this.isTransition ? '.5s' : '.1s'
            }
        },
        getPopupPosition() {
            return {
                left: (this.popupPosition.x + 20) + 'px',
                top: (this.popupPosition.y + 20) + 'px',
            }
        }
    }
}
</script>

<style lang="scss" scoped>
section {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 100vh;
    overflow: hidden;

    > h2 {
        justify-content: flex-start;
        z-index: 50;
        background-color: $darkBackgroundColor;
    }

    &.light {
        > h2 {
            background-color: $lightBackgroundColor;
        }
    }

    > .wrapper {
        height: 1400px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;


    }

    > #canvas {
        transform-origin: center;
        transition: .1s;
    }

    > #popup {
        position: fixed;
        width: 19.79rem;
        padding: 1.56rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        background: rgba(255, 255, 255, 0.12);
        backdrop-filter: blur(1.56rem);
        border-radius: 0 .52rem .52rem .52rem;
        pointer-events: none;
        z-index: 100;

        > h3 {
            font-size: 1.25rem;
            line-height: 1.56rem;
        }

        > h4 {
            font-size: 1rem;
            opacity: .7;
            font-weight: normal;
        }

        > .row {
            display: flex;
            flex-direction: row;
            align-items: flex-end;
            justify-content: space-between;
            flex-wrap: wrap;
            margin-top: 1.04rem;
            border-top: 1px solid $greyColor;
            padding-top: 1.04rem;
            width: 100%;

            > .col {
                width: 40%;
                display: flex;
                align-items: flex-start;
                flex-direction: column;

                > label {
                    font-size: .83rem;
                    margin-bottom: .62rem;
                    line-height: 150%;
                }

                > p {
                    font-size: 1.56rem;
                    line-height: 120%;
                    font-weight: bold;
                }
            }
        }

        > .features {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            margin-top: 1.04rem;
            border-top: 1px solid $greyColor;
            padding-top: 1.04rem;
            width: 100%;

            > p {
                font-size: .83rem;
                line-height: 1.04rem;
                font-weight: bold;
                margin-bottom: 1rem;

                &:last-of-type {
                    margin-bottom: 0;
                }
            }
        }
    }
}

@media screen and (max-width: 991px) {
    section {
        display: none;
    }
}
</style>

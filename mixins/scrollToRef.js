export default {
    data() {
        return {
            scrollOptions: {
                intervalId: null,
                offset: 300,
                speed: 20
            },
        }
    },
    methods: {
        formScroll() {
            const children = this.$root.$children
            children[children.length - 1].onFormScroll()
        },
        scrollToElement(element) {
            this.scrollOptions.offset = window.innerHeight / 3
            const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
            if (isSafari) {
                this.scrollOptions.speed = 75
            }

            if (!this.scrollOptions.intervalId) {
                this.scrollOptions.intervalId = setInterval(() => {
                    const bounding = element.getBoundingClientRect().y

                    if (bounding > this.scrollOptions.offset) {
                        window.scrollBy(0, this.scrollOptions.speed)
                    } else if (bounding < this.scrollOptions.offset - (isSafari ? 100 : 50)) {
                        window.scrollBy(0, -this.scrollOptions.speed)
                    } else {
                        this.scrollOptions.intervalId = clearInterval(this.scrollOptions.intervalId)
                    }
                }, 2)
            }
        }
    }
}

export default {
    data() {
        return {
            isVisible: false
        }
    },

    methods: {
        visibilityChanged(isVisible, entry) {
            this.isVisible = isVisible
        }
    },

    computed: {
        visibleStyle() {
            return {
                opacity: this.isVisible ? 1 : 0,
                transform: `translateY(${this.isVisible ? '0' : '25%'})`
            }
        }
    }
}

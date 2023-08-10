import Vue from 'vue'
import VueNoty from 'vuejs-noty'
import {cookier} from "./cookier.min";
import VShowSlide from 'v-show-slide'
import { VueMaskDirective } from 'v-mask'
import VueObserveVisibility from 'vue-observe-visibility'
import VueNumber from 'vue-number-animation'
import MarqueeText from 'vue-marquee-text-component'

Vue.use(VShowSlide)
Vue.use(VueNumber)
Vue.use(VueObserveVisibility)
Vue.directive('mask', VueMaskDirective);
Vue.component('marquee-text', MarqueeText)

Vue.use({
    install(Vue, options) {
        Vue.prototype.cookier = cookier
    }
})

Vue.use(VueNoty, {
    timeout: 5000,
    progressBar: true,
    layout: 'topRight'
})


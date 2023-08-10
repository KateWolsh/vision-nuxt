import Vue from 'vue'
import {api, url} from './api.js'

Vue.use({
    install(Vue, options) {
        Vue.prototype.api = api
        Vue.prototype.apiUrl = url
    }
})


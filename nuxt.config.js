import {extendRoutes} from "./router/router";

export default {

    env: {
        backendUrl: process.env.BACKEND_URL || 'http://localhost:3001/',
        filesUrl: process.env.FILES_URL || 'http://localhost/'
    },

    // Custom routes
    router: {
        extendRoutes
    },

    server: {
        host: process.env.HOST || '127.0.0.1',
        port: process.env.PORT || 3000
    },

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'Netvision',
        htmlAttrs: {
            lang: 'ru'
        },
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: ''},
            {name: 'format-detection', content: 'telephone=no'}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        {
            src: '@/plugins/vueExpansion.js',
            ssr: false
        },
        {
            src: '@/plugins/vueExpansionSsr.js',
            ssr: true
        },
        {
            src: '@/plugins/metrika.js',
            ssr: false
        },
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        '@nuxtjs/style-resources',
        'cookie-universal-nuxt',
        '@nuxtjs/yandex-metrika'
    ],

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},

    styleResources: {
        scss: [
            '~/assets/scss/vars.scss',
            '~/assets/scss/fonts.scss',
            '~/assets/scss/anims.scss',
        ]
    },

    yandexMetrika: {
      id: 88145303,
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true
    }
}

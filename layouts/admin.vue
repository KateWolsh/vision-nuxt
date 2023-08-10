<template>
    <div class="main__wrapper">
        <section class="left-bar">
            <nuxt-link to="/">
                На сайт
            </nuxt-link>

            <nuxt-link v-for="link in this.$options.LINKS_LIST"
                       :to="link.uri"
                       :class="{'active': $route.path.includes(link.uri)}"
                       :key="`link-${link.uri}`">
                {{ link.title }}
            </nuxt-link>
        </section>

        <section>
            <Nuxt/>
        </section>
    </div>
</template>

<script>
import {AuthService} from "@/services/AuthService";

export default {
    name: "admin",
    LINKS_LIST: [
        {
            title: 'Главная',
            uri: '/admin/main'
        },
        {
            title: 'Проекты',
            uri: '/admin/project'
        },
        {
            title: 'Карта',
            uri: '/admin/map'
        },
        {
            title: 'Ответы формы',
            uri: '/admin/form'
        },
    ],
    mounted() {
        AuthService.me().then(({data, res}) => {
            if (res.status === 200) {
                this.$store.commit('auth/setEmail', data.email)
                this.$store.commit('auth/setRole', data.role)
                if (data.role !== 'admin') {
                    this.$router.push('/')
                }
            } else {
                this.$cookies.remove('token');
                this.$router.push('/auth/login')
            }
        })
    }
}
</script>

<style lang="scss">

@import "../assets/scss/main";
@import "../assets/scss/admin";

</style>
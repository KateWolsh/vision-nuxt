<template>
    <main>
        <form @submit.prevent="loginUser">
            <input type="text" placeholder="Логин" v-model="login">
            <input type="password" placeholder="Пароль" v-model="password">
            <input type="submit" value="Войти">
        </form>
    </main>
</template>

<script>
import {AuthService} from "~/services/AuthService";

export default {
    name: "login",
    data() {
        return {
            login: null,
            password: null
        }
    },
    methods: {
        loginUser() {
            AuthService.login({
                login: this.login,
                password: this.password
            }).then(({data, res}) => {
                if (!!res && res.status === 201) {
                    this.$store.commit('auth/setEmail', data.email)
                    this.$router.push('/admin')
                    this.$cookies.set('token', data.token, {
                        maxAge: 60 * 60 * 24 * 7,
                        path: '/'
                    })
                } else {
                    this.$noty.error('Неправильный логин/пароль')
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
main {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    > form {
        display: flex;
        flex-direction: column;
        align-items: stretch;

        > input {
            margin-bottom: 1rem;
            background: none;
            border: none;
            border-bottom: 1px solid $greyFontColor;
            padding: .25rem;
        }

        > input[type="submit"] {
            background: $accentBlue;
            border: none;
            border-radius: .25rem;
        }
    }
}
</style>
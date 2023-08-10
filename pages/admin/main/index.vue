<template>
    <main>
        <header>
            <h1>Главная</h1>

            <nuxt-link to="/admin/main/create">
                Создать другую версию
            </nuxt-link>
        </header>

        <admin-entities-list v-if="entities.length"
                             :fields="$options.FIELDS"
                             :link="'main'"
                             :is-editing="true"
                             :is-deleting="true"
                             :entities="entities"
                             @updateList="getList"/>
    </main>
</template>

<script>
import {MainPageService} from "@/services/MainPageService";

export default {
    name: "index",
    layout: "admin",
    middleware: "authUser",
    FIELDS: [
        {
            name: '_id',
            label: '#'
        },
        {
            name: 'title',
            label: 'Заголовок'
        },
        {
            name: 'polls',
            label: 'Описание'
        },
    ],
    data() {
        return {
            entities: []
        }
    },
    mounted() {
        this.getList()
    },
    methods: {
        getList() {
            this.entities = []
            MainPageService.getAll().then(({data, res}) => {
                this.entities = data ?? []
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
<template>
    <main>
        <header>
            <h1>Карта</h1>

            <nuxt-link to="/admin/map/create">
                Создать
            </nuxt-link>
        </header>

        <admin-entities-list v-if="entities.length"
                             :fields="$options.FIELDS"
                             :link="'map'"
                             :is-editing="true"
                             :is-deleting="true"
                             :entities="entities"
                             @updateList="getList"/>
    </main>
</template>

<script>
import {MapService} from "@/services/MapService";

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
            name: 'subTitle',
            label: 'Подзаголовок'
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
            MapService.getAll().then(({data, res}) => {
                this.entities = data ?? []
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>

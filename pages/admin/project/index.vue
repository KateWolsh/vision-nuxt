<template>
    <main>
        <header>
            <h1>Проекты</h1>

            <nuxt-link to="/admin/project/create">
                Создать
            </nuxt-link>
        </header>

        <admin-entities-list v-if="entities.length"
                             :fields="$options.FIELDS"
                             :link="'project'"
                             :is-editing="true"
                             :is-deleting="true"
                             :entities="entities"
                             @updateList="getList"/>
    </main>
</template>

<script>
import {ProjectService} from "@/services/ProjectService";

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
        }
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
            ProjectService.getAll().then(({data, res}) => {
                this.entities = data ?? []
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
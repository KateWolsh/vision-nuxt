<template>
    <main>
        <header>
            <h1>Ответы формы</h1>
        </header>

        <admin-entities-list v-if="entities.length"
                             :fields="$options.FIELDS"
                             :link="'form'"
                             :is-editing="false"
                             :is-deleting="false"
                             :entities="entities"
                             @updateList="getList"/>
    </main>
</template>

<script>
import {ProjectFormService} from "@/services/ProjectFormService";

export default {
    name: "index",
    layout: "admin",
    middleware: "authUser",
    FIELDS: [
        {
            name: 'email',
            label: 'E-mail'
        },
        {
            name: 'fio',
            label: 'ФИО'
        },
        {
            name: 'phone',
            label: 'Телефон'
        },
        {
            name: 'product',
            label: 'Продукт'
        },
        {
            name: 'text',
            label: 'Комментарий'
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
            ProjectFormService.getAll().then(({data, res}) => {
                this.entities = data ?? []
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
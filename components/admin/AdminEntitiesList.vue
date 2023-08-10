<template>
    <table cellpadding="0" cellspacing="0">
        <thead>
        <tr>
            <td v-for="field in fields" :key="`thead-${field.name}`">
                {{ field.label }}
            </td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="entity in entities" :key="`entity-${entity._id}`">
            <td v-for="field in fields"
                :key="`entity-${entity._id}-${field.name}`">
                {{ entity[field.name] }}
            </td>
            <td>
                <nuxt-link :to="`/admin/${link}/${entity._id}`" v-if="isEditing">
                    &#9998;
                </nuxt-link>
                <button @click="deleteEntity(entity._id)" v-if="isDeleting">
                    &#10006;
                </button>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: "AdminEntitiesList",
    props: {
        fields: {
            type: Array,
            required: true
        },
        entities: {
            type: Array,
            required: true
        },
        link: {
            type: String,
            required: true
        },
        isEditing: {
            type: Boolean,
            required: false,
            default: false
        },
        isDeleting: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    methods: {
        deleteEntity(id) {
            if (confirm(`Вы уверены, что хотите удалить №${id}?`)) {
                this.api(`${this.link}/${id}`, 'DELETE').then(({data, res}) => {
                    if (res.status === 200) {
                        this.$emit('updateList')
                        this.$noty.success('Удаление успешно')
                    }
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>

table {
    width: 100%;

    * {
        font-size: 1rem;
    }

    tr {

        td {
            padding: 1rem;

            a, button {
                font-size: 1.5rem;
                transition: $animTime;
                background: none;
                border: none;

                &:hover {
                    color: $accentBlue;
                }
            }
        }
    }

    thead {
        tr {
            background-color: black;

            td {
                font-weight: bold;
                color: white;
            }
        }
    }
}

</style>

<template>
    <main>
        <header>
            <h1>
                Редактирование проекта {{ map.title }}
            </h1>
        </header>

        <form @submit.prevent="update">
            <h2>
                Основное
            </h2>
            <div class="row first__row">
                <article>
                    <label for="title">
                        Заголовок
                    </label>
                    <input type="text" v-model="map.title" id="title">
                </article>

                <article>
                    <label for="subTitle">
                        Подзаголовок
                    </label>
                    <input type="text" v-model="map.subTitle" id="subTitle">
                </article>
            </div>

            <div class="row"></div>

            <h2>
                Статистика
                <span class="append__entity" @click="appendEntity('statistic', {
                    title: null,
                    value: null,
                })">+</span>
            </h2>
            <div class="row">
                <article v-for="(statistic, index) in map.statistic" :key="`statistic-${index}`">
                    <button type="button" @click="removeEntity('statistic', index)">
                        <img src="@/assets/img/icons/close.svg">
                    </button>

                    <label>
                        Заголовок
                    </label>
                    <input type="text" v-model="map.statistic[index].title">

                    <label>
                        Значение
                    </label>
                    <input type="text" v-model="map.statistic[index].value">
                </article>
            </div>

            <h2>
                Проекты
                <span class="append__entity" @click="appendEntity('project', '')">+</span>
            </h2>
            <div class="row">
                <article v-for="(project, index) in map.project" :key="`project-${index}`">
                    <button type="button" @click="removeEntity('project', index)">
                        <img src="@/assets/img/icons/close.svg">
                    </button>

                    <label>
                        Заголовок
                    </label>
                    <input type="text" v-model="map.project[index]">
                </article>
            </div>

            <div class="row">
                <input type="submit" value="Обновить">
            </div>
        </form>
    </main>
</template>

<script>
import {MapService} from "~/services/MapService";

export default {
    name: "index",
    layout: "admin",
    middleware: "authUser",
    data() {
        return {
            map: {
                title: null,
                subTitle: '',
                statistic: [],
                project: [],
            }
        }
    },
    mounted() {
        MapService.getOneById(this.$route.params.id).then(({data, res}) => {
            if (res && res.status === 200) {
                this.map = data
            }
        })
    },
    methods: {
        removeEntity(key, index) {
            this.map[key].splice(index, 1)
        },
        appendEntity(key, entity) {
            this.map[key].push(entity)
        },

        update() {
            MapService.update(this.map._id, this.map).then(({data, res}) => {
                if (res.status === 200) {
                    this.$noty.success('Обновление прошло успешно')
                    setTimeout(() => {
                        this.$router.push('/admin/map')
                    }, 300)
                } else {
                    this.$noty.error('Ошибка обновления')
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
main {
    form {
        display: flex;
        flex-direction: column;

        > h2 {
            > .append__entity {
                cursor: pointer;
                background-color: $accentBlue;
                width: 3rem;
                height: 3rem;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                margin-left: 2rem;
            }
        }

        > .row {
            display: flex;
            align-items: flex-start;
            margin-bottom: 5rem;
            width: 100%;
            flex-wrap: wrap;

            > article {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                margin-right: 2rem;
                margin-bottom: 2rem;
                background-color: #1c2329;
                padding: 2rem;
                border-radius: 1rem;
                width: 30%;
                position: relative;

                > button {
                    padding: 1rem;
                    position: absolute;
                    top: 0;
                    right: 0;
                    background-color: $accentBlue;
                    color: white;
                    border: none;
                    width: 2rem;
                    height: 2rem;

                    > img {
                        width: 1rem;
                        height: 1rem;
                        position: absolute;
                        object-position: center;
                        object-fit: contain;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%, -50%);
                    }
                }

                > * {
                    width: 100%;
                }

                > label {
                    margin-bottom: .5rem;
                }

                > input, > select, > textarea {
                    resize: vertical;
                    width: 100%;
                    border: 1px solid $greyFontColor;
                    background: none;
                    padding: .5rem;
                    outline: none;
                    margin-bottom: 1rem;
                }

                > textarea {
                    min-height: 2.5rem;
                }
            }
        }

        > .first__row {
            flex-direction: column;
            margin-bottom: 0;

            > article {
                width: 50%;
            }
        }
    }
}
</style>

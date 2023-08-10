<template>
    <main>
        <header>
            <h1>
                Редактирование версии главной страницы №{{ $route.params.id }}
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
                    <input type="text" v-model="main.title" id="title">
                </article>

                <article>
                    <label for="polls">
                        Описание
                    </label>
                    <textarea v-model="main.polls" id="polls"></textarea>
                </article>
            </div>

            <div class="row"></div>

            <h2>
                Инновационные решения
                <span class="append__entity" @click="appendEntity('innovativeSolutions', {
                    text: null,
                    image: null,
                    type: $options.INNOVATIVE_SOLUTIONS_TYPES[0].value
                })">+</span>
            </h2>
            <div class="row first__row">
                <article>
                    <label>
                        Описание
                    </label>
                    <textarea v-model="main.innovativeSolutionsDescription"></textarea>
                </article>
            </div>
            <div class="row">
                <article v-for="(solution, index) in main.innovativeSolutions" :key="`solution-${index}`">
                    <button type="button" @click="removeEntity('innovativeSolutions', index)">
                        <img src="@/assets/img/icons/close.svg">
                    </button>
                    <label>
                        Текст
                    </label>
                    <input type="text" v-model="main.innovativeSolutions[index].text">

                    <label>
                        Тип
                    </label>
                    <select v-model="main.innovativeSolutions[index].type">
                        <option v-for="(type, j) in $options.INNOVATIVE_SOLUTIONS_TYPES"
                                :value="type.value"
                                :key="`${index}-solution-select-${j}`">
                            {{ type.label }}
                        </option>
                    </select>

                    <label>
                        Изображение
                    </label>
                    <admin-file-input @fileUpload="uploadEntityPreview($event, 'innovativeSolutions', index)"
                                      :uploaded-file="main.innovativeSolutions[index].image"
                                      :name="`solution-image-${index}`"/>
                </article>
            </div>

            <h2>
                Нам доверяют: статистика
                <span class="append__entity" @click="appendEntity('trust', {
                    value: null,
                    title: null,
                    text: null,
                })">+</span>
            </h2>
            <div class="row first__row">
                <article>
                    <label>
                        Описание
                    </label>
                    <textarea v-model="main.trustDescription"></textarea>
                </article>
            </div>
            <div class="row">
                <article v-for="(trust, index) in main.trust" :key="`trust-${index}`">
                    <button type="button" @click="removeEntity('trust', index)">
                        <img src="@/assets/img/icons/close.svg">
                    </button>
                    <label>
                        Число
                    </label>
                    <input type="number" v-model="main.trust[index].value">

                    <label>
                        Заголовок
                    </label>
                    <input type="text" v-model="main.trust[index].title">

                    <label>
                        Текст
                    </label>
                    <input type="text" v-model="main.trust[index].text">

                </article>
            </div>

            <h2>
                Лого клиентов
                <span class="append__entity" @click="appendEntity('clients', {
                    image: null
                })">+</span>
            </h2>
            <div class="row">
                <article v-for="(client, index) in main.clients" :key="`client-${index}`">
                    <button type="button" @click="removeEntity('clients', index)">
                        <img src="@/assets/img/icons/close.svg">
                    </button>
                    <label>
                        Лого
                    </label>
                    <admin-file-input @fileUpload="uploadEntityPreview($event, 'clients', index)"
                                      :uploaded-file="main.clients[index].image"
                                      :name="`client-image-${index}`"/>
                </article>
            </div>

            <h2>
                Наша команда
                <span class="append__entity" @click="appendEntity('team', {
                    image: null,
                    name: null,
                    position: null,
                    text: null,
                })">+</span>
            </h2>
            <div class="row first__row">
                <article>
                    <label>
                        Количество членов команды
                    </label>
                    <input type="text" v-model="main.teamOtherCount">
                </article>
            </div>
            <div class="row">
                <article v-for="(team, index) in main.team" :key="`team-${index}`">
                    <button type="button" @click="removeEntity('team', index)">
                        <img src="@/assets/img/icons/close.svg">
                    </button>
                    <label>
                        Изображение
                    </label>
                    <admin-file-input @fileUpload="uploadEntityPreview($event, 'team', index)"
                                      :uploaded-file="main.team[index].image"
                                      :name="`team-image-${index}`"/>

                    <label>
                        ФИО
                    </label>
                    <input type="text" v-model="main.team[index].name">

                    <label>
                        Должность
                    </label>
                    <input type="text" v-model="main.team[index].position">

                    <label>
                        Текст
                    </label>
                    <input type="text" v-model="main.team[index].text">
                </article>
            </div>

            <h2>
                Лого партнеров
                <span class="append__entity" @click="appendEntity('partners', {
                    image: null
                })">+</span>
            </h2>
            <div class="row">
                <article v-for="(partner, index) in main.partners" :key="`partner-${index}`">
                    <button type="button" @click="removeEntity('partners', index)">
                        <img src="@/assets/img/icons/close.svg">
                    </button>
                    <label>
                        Лого
                    </label>
                    <admin-file-input @fileUpload="uploadEntityPreview($event, 'partners', index)"
                                      :uploaded-file="main.partners[index].image"
                                      :name="`partner-image-${index}`"/>
                </article>
            </div>

            <div class="row">
                <input type="submit" value="Обновить">
            </div>
        </form>
    </main>
</template>

<script>
import {MainPageService} from "~/services/MainPageService";

export default {
    name: "create",
    layout: "admin",
    middleware: "authUser",
    INNOVATIVE_SOLUTIONS_TYPES: [
        {
            label: 'Государственному сектору',
            value: 'GOVERNMENT'
        },
        {
            label: 'Бизнесу и стартапам',
            value: 'BUSINESS'
        }
    ],
    data() {
        return {
            main: {
                title: null,
                polls: null,

                innovativeSolutionsDescription: null,
                innovativeSolutions: [],

                trustDescription: null,
                trust: [],

                clients: [],

                teamOtherCount: null,
                team: [],

                partners: [],
            }
        }
    },
    mounted() {
        MainPageService.getOneById(this.$route.params.id).then(({data, res}) => {
            if (res && res.status === 200) {
                this.main = data
                this.main.teamOtherCount = `${this.main.teamOtherCount}`
            }
        })
    },
    methods: {
        removeEntity(key, index) {
            this.main[key].splice(index, 1)
        },
        appendEntity(key, entity) {
            this.main[key].push(entity)
        },
        uploadEntityPreview(file, key, index) {
            this.main[key][index].image = file.url
            this.$forceUpdate()
        },

        update() {
            MainPageService.update(this.$route.params.id, this.main).then(({data, res}) => {
                if ([201,200].includes(res.status)) {
                    this.$noty.success('Обновление прошло успешно')
                    setTimeout(() => {
                        this.$router.push('/admin/main')
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

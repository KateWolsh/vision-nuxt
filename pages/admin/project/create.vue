<template>
    <main>
        <header>
            <h1>
                Создание проекта
            </h1>
        </header>

        <form @submit.prevent="create">
            <h2>
                Основное
            </h2>
            <div class="row first__row">
                <article>
                    <label for="title">
                        Заголовок
                    </label>
                    <input type="text" v-model="project.title" id="title">
                </article>

                <article>
                    <label for="polls">
                        Описание
                    </label>
                    <textarea v-model="project.polls" id="polls"></textarea>
                </article>

                <article>
                    <label>
                        Превью
                    </label>
                    <admin-file-input @fileUpload="uploadPreview"
                                      :uploaded-file="project.image"
                                      :name="`main-preview-input`"/>
                </article>
            </div>
            <div class="row"></div>


            <h2>
                Возможности
                <span class="append__entity" @click="appendEntity('opportunities', {
                    text: null
                })">+</span>
            </h2>
            <div class="row">
                <article v-for="(opportunity, index) in project.opportunities" :key="`opportunity-${index}`">
                    <button type="button" @click="removeEntity('opportunities', index)">
                        <img src="@/assets/img/icons/close.svg">
                    </button>
                    <label>
                        {{ index + 1 < 10 ? '0' : '' }}{{ index + 1 }}
                    </label>
                    <input type="text" v-model="project.opportunities[index].text">
                </article>
            </div>


            <h2>
                Модули
                <span class="append__entity" @click="appendEntity('modules', {
                    image: null,
                    title: null,
                    text: null
                })">+</span>
            </h2>
            <div class="row">
                <article v-for="(module, index) in project.modules" :key="`module-${index}`">
                    <button type="button" @click="removeEntity('modules', index)">
                        <img src="@/assets/img/icons/close.svg">
                    </button>
                    <label>
                        Заголовок
                    </label>
                    <input type="text" v-model="project.modules[index].title">

                    <label>
                        Описание
                    </label>
                    <input type="text" v-model="project.modules[index].text">

                    <label>
                        Изображение
                    </label>
                    <admin-file-input @fileUpload="uploadEntityPreview($event, 'modules', index)"
                                      :uploaded-file="project.modules[index].image"
                                      :name="`module-image-${index}`"/>
                </article>
            </div>


            <h2>
                Интерфейс
                <span class="append__entity" @click="appendEntity('interfaces', {
                    image: null,
                    title: null,
                    text: null
                })">+</span>
            </h2>
            <div class="row">
                <article v-for="(interfaces, index) in project.interfaces" :key="`interface-${index}`">
                    <button type="button" @click="removeEntity('interfaces', index)">
                        <img src="@/assets/img/icons/close.svg">
                    </button>
                    <label>
                        Заголовок
                    </label>
                    <input type="text" v-model="project.interfaces[index].title">

                    <label>
                        Описание
                    </label>
                    <input type="text" v-model="project.interfaces[index].text">

                    <label>
                        Изображение
                    </label>

                    <admin-file-input @fileUpload="uploadEntityPreview($event, 'interfaces', index)"
                                      :uploaded-file="project.interfaces[index].image"
                                      :name="`interface-image-${index}`"/>
                </article>
            </div>


            <h2>
                Системные требования: Операционные системы
                <span class="append__entity" @click="appendEntity('os', {
                    image: null,
                    title: null,
                })">+</span>
            </h2>
            <div class="row">
                <article v-for="(os, index) in project.os" :key="`os-${index}`">
                    <button type="button" @click="removeEntity('os', index)">
                        <img src="@/assets/img/icons/close.svg">
                    </button>
                    <label>
                        Заголовок
                    </label>
                    <input type="text" v-model="project.os[index].title">

                    <label>
                        Изображение
                    </label>
                    <admin-file-input @fileUpload="uploadEntityPreview($event, 'os', index)"
                                      :uploaded-file="project.os[index].image"
                                      :name="`os-image-${index}`"/>
                </article>
            </div>


            <h2>
                Системные требования: Веб-доступ через браузеры
                <span class="append__entity" @click="appendEntity('web', {
                    image: null,
                    title: null,
                })">+</span>
            </h2>
            <div class="row">
                <article v-for="(web, index) in project.web" :key="`web-${index}`">
                    <button type="button" @click="removeEntity('web', index)">
                        <img src="@/assets/img/icons/close.svg">
                    </button>
                    <label>
                        Заголовок
                    </label>
                    <input type="text" v-model="project.web[index].title">

                    <label>
                        Изображение
                    </label>
                    <admin-file-input @fileUpload="uploadEntityPreview($event, 'web', index)"
                                      :uploaded-file="project.web[index].image"
                                      :name="`web-image-${index}`"/>
                </article>
            </div>


            <h2>
                Защита и хранение данных
                <span class="append__entity" @click="appendEntity('dataProtection', {
                    image: null,
                    text: null
                })">+</span>
            </h2>
            <div class="row">
                <article v-for="(dataProtection, index) in project.dataProtection" :key="`dataProtection-${index}`">
                    <button type="button" @click="removeEntity('dataProtection', index)">
                        <img src="@/assets/img/icons/close.svg">
                    </button>
                    <label>
                        Заголовок
                    </label>
                    <input type="text" v-model="project.dataProtection[index].text">

                    <label>
                        Изображение
                    </label>
                    <admin-file-input @fileUpload="uploadEntityPreview($event, 'dataProtection', index)"
                                      :uploaded-file="project.dataProtection[index].image"
                                      :name="`dataProtection-image-${index}`"/>
                </article>
            </div>


            <h2>
                Документы
                <span class="append__entity" @click="appendEntity('documents', {
                    section: null,
                    file: null,
                    size: null,
                    title: null
                })">+</span>
            </h2>
            <div class="row">
                <article v-for="(document, index) in project.documents" :key="`document-${index}`">
                    <button type="button" @click="removeEntity('documents', index)">
                        <img src="@/assets/img/icons/close.svg">
                    </button>

                    <label>
                        Секция
                    </label>
                    <input type="text" v-model="project.documents[index].section">

                    <label>
                        Заголовок
                    </label>
                    <input type="text" v-model="project.documents[index].title">

                    <label>
                        Размер
                    </label>
                    <input type="text" v-model="project.documents[index].size">

                    <label>
                        Файл
                    </label>
                    <admin-file-input @fileUpload="uploadEntityPreview($event, 'documents', index, 'file')"
                                      :uploaded-file="project.documents[index].file"
                                      :name="`documents-file-${index}`"/>
                </article>
            </div>


            <div class="row">
                <input type="submit" value="Создать">
            </div>
        </form>
    </main>
</template>

<script>
import {ProjectService} from "~/services/ProjectService";

export default {
    name: "create",
    layout: "admin",
    middleware: "authUser",
    data() {
        return {
            project: {
                title: null,
                polls: null,
                image: null,
                opportunities: [],
                modules: [],
                interfaces: [],
                os: [],
                web: [],
                dataProtection: [],
                documents: [],
            }
        }
    },
    methods: {
        removeEntity(key, index) {
            this.project[key].splice(index, 1)
        },
        appendEntity(key, entity) {
            this.project[key].push(entity)
        },
        uploadEntityPreview(file, key, index, field) {
            this.project[key][index][field ?? 'image'] = file.url
            this.$forceUpdate()
        },
        uploadPreview(file) {
            this.project.image = file.url
        },

        create() {
            ProjectService.create(this.project).then(({data, res}) => {
                if (res.status === 201) {
                    this.$noty.success('Создание прошло успешно')
                    setTimeout(() => {
                        this.$router.push('/admin/project')
                    }, 300)
                } else {
                    this.$noty.error('Ошибка создания')
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

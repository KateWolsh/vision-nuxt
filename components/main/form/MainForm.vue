<template>
    <form :class="['main__container', {'light': getIsLightTheme}]" @submit.prevent="submit">
        <div class="col">
            <h2>
                Попробуйте сами
            </h2>
            <p>
                Закажите демо-версию любого продукта, чтобы убедиться в преимуществах системы самостоятельно. Задайте вопрос о стоимости решения и условиях лицензионного соглашения нашему менеджеру
            </p>
        </div>

        <div class="col">
            <main-form-row :index="0" :is-double="true">
                <input v-model="form.name" type="text" placeholder="Имя*" required autocomplete="none">
                <input v-model="form.fio" type="text" placeholder="Фамилия*" required autocomplete="none">
            </main-form-row>

            <main-form-row :index="1" :is-double="true">
                <input v-model="form.phone"
                       required
                       type="text"
                       v-mask="`+7(###)###-##-##`"
                       placeholder="+7 (_ _ _) _ _ _ - _ _ - _ _*" autocomplete="none">
                <input v-model="form.email" type="text" placeholder="E-mail*" required autocomplete="none">
            </main-form-row>

            <main-form-row :index="2">
                <select v-model="form.product" required>
                    <option disabled selected :value="null">
                        Выберите продукт*
                    </option>
                    <option v-for="project in getProjects"
                            :value="project.title"
                            :key="`form-project-select-${project._id}`">
                        {{ project.title }}
                    </option>
                </select>
            </main-form-row>

            <main-form-row :index="3">
                <textarea v-model="form.text" placeholder="Комментарий"></textarea>
            </main-form-row>

            <main-form-row :index="4" :is-double="true">
                <button class="blue__button" v-if="!isSubmitted">
                    Отправить
                </button>
                <p v-else>
                    Форма успешно отправлена
                </p>
                <p>
                    Нажимая на кнопку, вы соглашаетесь
                    на обработку ваших персональных данных
                </p>
            </main-form-row>
        </div>
    </form>
</template>

<script>
import {ProjectFormService} from "@/services/ProjectFormService";

export default {
    name: "MainForm",
    data() {
        return {
            form: {
                name: null,
                fio: null,
                phone: null,
                email: null,
                product: null,
                text: null,
            },
            isSubmitted: false
        }
    },
    methods: {
        submit() {
            ProjectFormService.submit(this.form).then(({data, res}) => {
                if (res && [200, 201].includes(res.status)) {
                    this.isSubmitted = true
                } else {
                    this.$noty.error('Ошибка отправки формы')
                }
            }).catch((e) => {
                console.debug(e)
                this.$noty.error('Ошибка отправки формы')
            })
        }
    },
    computed: {
        getProjects() {
            return this.$store.getters['project/getProjects']
        },
        getIsLightTheme() {
            return this.$store.getters['theme/getIsLightTheme']
        },
    }
}
</script>

<style scoped lang="scss">
form {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    > .col {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 50%;

        &:first-of-type {
            position: relative;
            width: 40%;
            background-image: url("../../../assets/img/background/map.png");
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;

            > h2 {
                margin-bottom: 1.04rem;
                font-size: 2.7rem;
                line-height: 1.4em;
            }

            > p {
                font-size: 1.25rem;
                line-height: 140%;
            }

            &:before {
                content: '';
                position: absolute;
                width: 12rem;
                height: 12rem;
                top: 50%;
                left: 53%;
                transform: translate(-50%, -50%);
                z-index: -1;
                opacity: .3;
                filter: blur(3rem);
                border-radius: 50%;
                background-color: $accentBlue;
            }
        }

        &:last-of-type {
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
            grid-gap: 1.56rem;
            margin-bottom: 10.4rem;

            > .form__row {

                > input, > select, > textarea {
                    width: 100%;
                    padding: 1.56rem 0;
                    height: 5rem;
                    resize: none;
                    background: transparent;
                    border: none;
                    border-bottom: 1px solid rgba(255, 255, 255, .2);
                    outline: none;
                    transition: border $animTime;
                    font-size: 1.14rem;
                    line-height: 1.45rem;

                    &:focus {
                        border-color: white;
                    }

                    > option {
                        color: white;
                    }
                }

                > .blue__button {
                    display: inline-block;
                    margin-right: 7rem;
                }

                > p {
                    font-size: .83rem;
                    line-height: 120%;
                    opacity: .5;
                    margin: auto;
                }
            }
        }
    }

    &.light {
        > .col {
            &:last-of-type {
                > .form__row {
                    > input, > select, > textarea {
                        border-color: $greyColor;
                    }
                }
            }
        }
    }
}

@media screen and (max-width: 991px) {
    form {
        flex-direction: column;
        padding-bottom: 10rem;
        margin-bottom: 5rem;
        background-image: url("../../../assets/img/background/map.png");
        background-size: 40%;
        background-position: bottom right;
        background-repeat: no-repeat;
        position: relative;

        &:before {
            content: '';
            position: absolute;
            width: 10%;
            height: 10%;
            bottom: 5%;
            right: 7%;
            transform: translate(-50%, -50%);
            z-index: -1;
            opacity: .3;
            filter: blur(3rem);
            border-radius: 50%;
            background-color: $accentBlue;
        }

        > .col {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            width: 100%;

            &:first-of-type {
                width: 100%;
                background: none;
                margin-bottom: 2.64rem;

                > h2 {
                    margin-bottom: 1.07rem;
                    font-size: 1.6rem;
                }

                > p {
                    font-size: 1.07rem;
                }

                &:before {
                    display: none;
                }
            }

            &:last-of-type {
                grid-template-columns: 1fr;
                grid-template-rows: repeat(5, 1fr);
                margin-bottom: 5rem;

                > .form__row {

                    > input, > select, > textarea {
                        padding: 1.3rem 0;
                    }

                    > .blue__button {
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        width: 100%;
                        margin-right: 0;
                        padding: 1.35rem 2.14rem;
                    }

                    > p {
                        font-size: .92rem;
                    }
                }
            }
        }
    }
}

@media screen and (max-width: 480px) {
    form {
        background-size: 80%;
        background-position: 140% 0;
        background-repeat: no-repeat;
        margin-bottom: 0;
        padding-bottom: 0;

        &:before {
            bottom: auto;
            top: 10%;
            right: 15%;
        }
    }
}

</style>

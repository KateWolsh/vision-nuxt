<template>
    <div :class="['menu__wrapper', {'light': getIsLightTheme}]">
        <div class="col">
            <nuxt-link v-for="project in getProjects"
                       class="project__link"
                       :to="`/project/${project._id}`"
                       :key="`menu-project-${project._id}`">
                {{ project.title }}
            </nuxt-link>
            <span class="line"></span>
            <nuxt-link to="/normative-documents" class="project__link">
                Нормативная документация
            </nuxt-link>
        </div>

        <div class="col">
            <article class="contact__block">
                <p class="label">
                    Наши контакты
                </p>
                <a href="tel:84951977383">
                    +7 (495) 197-73-83
                </a>
                <a href="mailto:info@net-vision.pro">
                  info@net-vision.pro
                </a>
            </article>

            <article class="contact__block">
                <p class="label">
                    Наш адрес
                </p>
                <p>
                    г. Москва, наб. Тараса Шевченко, д. 23А, сектор В, 4 этаж
                </p>
            </article>

            <a href="https://yandex.ru/maps/-/CCUFzJdl0C" class="outline__button">
                Смотреть на карте
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: "MainMenu",
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

<style lang="scss" scoped>
.menu__wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    background-color: $darkBackgroundColor;
    background-image: url("../../assets/img/background/menu-bg.jpg");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    z-index: -1;
    box-sizing: border-box;

    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 10rem 25rem 10rem 17rem;

    > .col {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        > .project__link {
            font-size: 2rem;
            margin-bottom: 2rem;
            line-height: 1.2em;
            font-weight: 600;
            text-decoration: none;
            transition: opacity $animTime;

            &:hover {
                opacity: .7;
            }
        }

        > .line {
            width: 10rem;
            height: 1px;
            margin-top: 1rem;
            margin-bottom: 3rem;
            background-color: #404951;
        }

        > .contact__block {
            display: flex;
            flex-direction: column;
            margin-bottom: 1rem;

            > .label {
                margin-bottom: .8rem;
                color: rgba(255, 255, 255, 0.6);
                font-size: .8rem;
                line-height: 1.4em;
                font-weight: 300;
                text-decoration: none;
            }

            > a, > p {
                font-size: 1rem;
                margin-bottom: 1rem;
                color: #fff;
                line-height: 1.4em;
                font-weight: 500;
                text-decoration: none;
            }

            &:first-of-type {
                margin-bottom: 3rem;
            }
        }
    }

    &.light {
        background-color: $lightBackgroundColor;
        background-image: none;

        > .col {
            > .project__link {
                &:hover {
                    opacity: .5;
                }
            }

            > .contact__block {
                > .label {
                    color: black;
                    opacity: .5;
                }

                > a, > p {
                    color: black;
                }
            }
        }
    }
}

@media screen and (max-width: 991px) {
    .menu__wrapper {
        justify-content: space-between;
        padding: 6rem 3.2rem 7.14rem 3.2rem;

        > .col {
            width: 45%;

            > .project__link {
                font-size: 1.75rem;
                margin-bottom: 2.2rem;
            }

            > .line {
                width: 6rem;
            }

            > .contact__block {
                width: 100%;

                > .label {
                    margin-bottom: 1.17rem;
                    font-size: 1.17rem;
                    width: 100%;
                }

                > a, > p {
                    font-size: 1.17rem;
                    width: 70%;
                }

                &:first-of-type {
                    margin-bottom: 3rem;
                }
            }
        }
    }
}

@media screen and (max-width: 480px) {
    .menu__wrapper {
        flex-direction: column;
        justify-content: flex-start;
        padding: 7.7rem 3.5rem 7.14rem 3.5rem;
        overflow-y: auto;

        > .col {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            width: 100%;

            > .project__link {
                font-size: 1.35rem;
                margin-bottom: 2.14rem;
            }

            > .contact__block {
                margin-bottom: 1rem;

                > .label {
                    margin-bottom: .78rem;
                    font-size: .92rem;
                }

                > a, > p {
                    font-size: 1.07rem;
                }

                &:first-of-type {
                    margin-bottom: 2rem;
                }
            }

            > .outline__button {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                padding: 1.35rem 2.14rem;
                margin-top: 1rem;
            }
        }
    }
}

</style>

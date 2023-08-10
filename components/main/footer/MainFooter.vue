<template>
    <footer class="main__container">
        <section>
            <main-footer-col :index="0">
                <main-logo/>
            </main-footer-col>

            <main-footer-col :index="1">
                <nuxt-link v-for="project in getEvenProjects"
                           class="project__link"
                           :to="`/project/${project._id}`"
                           :key="`footer-project-0-${project._id}`">
                    {{ project.title }}
                </nuxt-link>
            </main-footer-col>

            <main-footer-col :index="2">
                <nuxt-link v-for="project in getOddProjects"
                           class="project__link"
                           :to="`/project/${project._id}`"
                           :key="`footer-project-1-${project._id}`">
                    {{ project.title }}
                </nuxt-link>
            </main-footer-col>

            <main-footer-col :index="3">
                <p class="label">
                    Наш телефон
                </p>
                <a class="info" href="tel:84952494916">
                  +7 (495) 249-49-16
                </a>

                <p class="label second__label">
                    Служба поддержки
                </p>
                <a class="info" href="mailto:hd@net-vision.pro">
                    hd@net-vision.pro
                </a>
                <a class="info" href="tel:88001019576">
                    +7 (800) 101-95-76
                </a>
            </main-footer-col>

            <main-footer-col :index="4">
                <p class="label">
                    Наш адрес
                </p>
                <div class="info">
                  Россия, Москва, 1-й Магистральный тупик, д.5 А, пом.4/5
                </div>
                <a href="https://yandex.ru/maps/-/CCUwJTdMGA" class="outline__button">
                    Смотреть на карте
                </a>
            </main-footer-col>
        </section>

        <div class="line"></div>

        <section class="links__wrapper">
            <p class="company__label">
                ООО Нетвижн © 2022
            </p>

            <div class="links">
                <a href="/Политика_конфиденциальности_персональных_данных.pdf" target="_blank">
                    Политика конфиденциальности
                </a>

                <div class="line"></div>

                <a href="/Пользовательское_соглашение.pdf" target="_blank">
                    Условия соглашения
                </a>
            </div>
        </section>
    </footer>
</template>

<script>
export default {
    name: "MainFooter",
    computed: {
        getProjects() {
            return this.$store.getters['project/getProjects']
        },
        getEvenProjects() {
            return this.getProjects.filter((project, index) => {
                return !(index % 2)
            })
        },
        getOddProjects() {
            return this.getProjects.filter((project, index) => {
                return index % 2
            })
        },
    }
}
</script>

<style lang="scss" scoped>
footer {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 5fr 1px 2fr;
    grid-gap: 2rem;

    > .line {
        background-color: #404951;
    }

    > section {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: 1fr;

        > .col {

            .project__link {
                font-size: .93rem;
                line-height: 1.19rem;
                margin-bottom: 1.04rem;
            }

            .label {
                font-size: .93rem;
                line-height: 150%;
                opacity: .5;
                margin-bottom: .41rem;
            }

            .second__label {
                margin-top: 1.04rem;
            }

            .info {
                font-weight: 500;
                font-size: .88rem;
                line-height: 120%;
                letter-spacing: .02em;
                margin-bottom: .41rem;
            }

            .outline__button {
                margin-top: 1.56rem;
            }
        }

        &:last-of-type {
            margin-bottom: 2rem;
        }
    }

    > .links__wrapper {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;

        > .company__label {
            opacity: .5;
        }

        > .links {
            display: flex;
            align-items: center;
            justify-content: flex-start;

            > a {
                font-size: .93rem;
                line-height: 1.2rem;
                opacity: .5;
            }

            > .line {
                display: block;
                height: .78rem;
                width: 1px;
                background-color: white;
                opacity: .1;
                margin: 0 .93rem;
            }
        }
    }
}

@media screen and (max-width: 991px) {
    footer {

        > section {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-auto-rows: auto;
            grid-gap: 2rem;

            > .col {

                .project__link {
                    font-size: 1.18rem;
                    margin-bottom: 1.18rem;
                }

                .label {
                    font-size: 1.18rem;
                    margin-bottom: 1.18rem;
                }

                .info {
                    font-size: 1.18rem;
                }

                .outline__button {
                    margin-top: 1.7rem;
                }
            }

            > .company__label {
                font-size: 1.18rem;
            }

            &:last-of-type {
                margin-bottom: 2rem;
            }
        }
    }
}

@media screen and (max-width: 480px) {
    footer {
        grid-template-rows: 5fr 1px 10rem;

        > section {
            grid-template-columns: 1fr;
            grid-auto-rows: auto;

            > .col {
                margin-bottom: 3rem;

                .project__link {
                    font-size: .93rem;
                    margin-bottom: .78rem;
                }

                .label {
                    font-size: .93rem;
                    margin-bottom: .78rem;
                }

                .info {
                    font-size: 1.07rem;
                    width: 70%;
                }

                .outline__button {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    margin-right: 0;
                    padding: 1.35rem 2.14rem;
                    margin-top: 2.14rem;
                }

                &:last-of-type {
                    margin-bottom: 0;
                }
            }
        }

        > .links__wrapper {
            flex-direction: column;

            > .links {
                display: flex;
                flex-direction: column;
                align-items: center;

                > a {
                    margin-bottom: 1rem;
                }

                > .line {
                    display: none;
                }
            }
        }
    }
}
</style>

<template>
    <main>
        <project-detail-title v-if="project"
                              :project="project"/>

        <main-tabs v-if="project && getTabs.length"
                   ref="tabs"
                   :tabs="getTabs"
                   @changeTab="onTabChange"
                   class="main__container"/>

        <div class="sticky__wrapper" v-if="project && project.opportunities.length">
            <project-detail-opportunities ref="opportunities"
                                          :opportunities="project.opportunities"/>
        </div>

        <div class="sticky__wrapper" v-if="project && project.modules.length">
            <project-detail-modules ref="modules"
                                    :modules="project.modules"/>
        </div>

        <div class="sticky__wrapper" v-if="project && project.interfaces.length">
            <project-detail-interface ref="interfaces"
                                      :interfaces="project.interfaces"/>
        </div>

        <div class="sticky__wrapper" v-if="project && (project.os.length || project.web.length || project.dataProtection.length)">
            <project-detail-system
                ref="system"
                :requirements-os="project.os"
                :requirements-web="project.web"
                :protections="project.dataProtection"/>
        </div>

        <div class="sticky__wrapper" v-if="project && project.documents.length">
            <project-detail-documents ref="documents"
                                      :documents="project.documents"/>
        </div>
    </main>
</template>

<script>
import {ProjectService} from "~/services/ProjectService";
import scrollToRef from "@/mixins/scrollToRef";

export default {
    name: "index",
    data() {
        return {
            project: null,
            currentTab: 0,
            tabs: [
                {
                    title: 'Возможности',
                    ref: 'opportunities',
                    checkVisibility(project) {
                        return !!project.opportunities.length
                    },
                    onClick(parent) {
                        parent.scrollToElement(parent.$refs[this.ref].$el)
                    },
                    isVisible: false
                },
                {
                    title: 'Модули',
                    ref: 'modules',
                    checkVisibility(project) {
                        return !!project.modules.length
                    },
                    onClick(parent) {
                        parent.scrollToElement(parent.$refs[this.ref].$el)
                    },
                    isVisible: false
                },
                {
                    title: 'Интерфейс',
                    ref: 'interfaces',
                    checkVisibility(project) {
                        return !!project.interfaces.length
                    },
                    onClick(parent) {
                        parent.scrollToElement(parent.$refs[this.ref].$el)
                    },
                    isVisible: false
                },
                {
                    title: 'Характеристики',
                    ref: 'system',
                    checkVisibility(project) {
                        return !!(project.os.length || project.web.length || project.dataProtection.length)
                    },
                    onClick(parent) {
                        parent.scrollToElement(parent.$refs[this.ref].$el)
                    },
                    isVisible: false
                },
                {
                    title: 'Документы',
                    ref: 'documents',
                    checkVisibility(project) {
                        return !!project.documents.length
                    },
                    onClick(parent) {
                        parent.scrollToElement(parent.$refs[this.ref].$el)
                    },
                    isVisible: false
                },
                {
                    title: 'Оставить заявку',
                    ref: 'mainForm',
                    checkVisibility(project) {
                        return true
                    },
                    onClick(parent) {
                        parent.scrollToElement(parent.$parent.$parent.$refs.mainForm.$el)
                    },
                    isVisible: false
                }
            ]
        }
    },
    watch: {
        currentTab() {
            this.$refs.tabs.outerSetCurrentTab(this.currentTab)
        }
    },
    mounted() {
        ProjectService.getAll().then(({data, res}) => {
            if (res && res.status === 200) {
                this.$store.commit('project/setProjects', data)
            }
        })

        ProjectService.getOneById(this.$route.params.id).then(({data, res}) => {
            if (res && res.status === 200) {
                this.project = data

                this.tabs = this.tabs.map((tab) => {
                    return {
                        ...tab,
                        isVisible: tab.checkVisibility(this.project),
                    }
                })
            }
        })

        window.addEventListener('scroll', this.onScroll)
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.onScroll)
    },
    methods: {
        onScroll(e) {
            if (this.$refs.tabs) {
                this.setCurrentTabByScroll()
            }
        },
        setCurrentTabByScroll() {
            this.getTabs.forEach((tab, index) => {
                if (this.$refs[tab.ref]) {
                    const bounding = this.$refs[tab.ref].$el.getBoundingClientRect().top
                    if (bounding < window.innerHeight - window.innerHeight / 10) {
                        this.currentTab = index
                    }
                }
            })
        },
        onTabChange(event) {
            this.getTabs[event.current].onClick(this)
        }
    },
    computed: {
        getTabs() {
            return this.tabs.filter(tab => tab.isVisible)
        }
    },
    mixins: [scrollToRef]
}
</script>

<style lang="scss" scoped>
main {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 5rem;

    &::v-deep {
        .tabs__wrapper {
            margin: 3rem 0;
            position: sticky;
            top: 7rem;
            z-index: 1100;
        }
    }

    > .sticky__wrapper {
        min-height: 150vh;

        &::v-deep {
            section {
                position: sticky;
                top: 14rem;
                margin-bottom: 10rem;
            }
        }
    }
}

@media screen and (max-width: 991px) {
    main {

        &::v-deep {
            .tabs__wrapper {
                position: sticky;
                top: 5rem;
                width: 100%;
                padding-left: 5vw;
                padding-right: 5vw;
            }
        }

        > .sticky__wrapper {
            min-height: auto;

            &::v-deep {
                section {
                    position: relative;
                    top: auto;
                }
            }
        }
    }
}

</style>

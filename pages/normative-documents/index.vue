<template>
    <main class="main__container">
        <h1>
            Нормативная документация
        </h1>

        <main-tabs v-if="tabs.length"
                   :tabs="tabs"
                   @changeTab="onTabChange"/>

        <main-tabs v-if="getProjectSections.length && currentTab"
                   :tabs="getProjectSections"
                   :is-sub-tabs="true"
                   @changeTab="onSectionChange"/>

        <div class="wrapper">
            <project-detail-documents-card v-for="(documentModel, index) in getDocumentsBySection"
                                           :key="`document-${index}`"
                                           :ref="`document-${index}`"
                                           :document-model="documentModel"/>
        </div>

        <button class="outline__button" @click="downloadAll">
            Скачать все
        </button>
    </main>
</template>

<script>
import replaceUrl from "@/mixins/replaceUrl";
import {ProjectService} from "@/services/ProjectService";
import {api, url} from "../../plugins/api";

export default {
    name: "index",
    data() {
        return {
            currentTab: 0,
            currentSectionTab: 0,
            tabs: [
                {
                    title: 'Все',
                }
            ]
        }
    },
    mounted() {
        ProjectService.getAll().then(({data, res}) => {
            if (res && res.status === 200) {
                this.$store.commit('project/setProjects', data)
                data.forEach((project, index) => {
                    if (project.documents.length) {
                        this.tabs.push({
                            title: project.title,
                            index
                        })
                    }
                })
            }
        })
    },
    methods: {
        downloadAll() {
            ProjectService.exportZip(this.getDocumentsBySection.map(document => this.getReplacedFileUrl(document.file)))
                .then(({data, res}) => {
                    if (res && [200, 201].includes(res.status)) {
                      Object.assign(document.createElement('a'), {
                        target: '_blank',
                        href: `${url}${data.zip}`,
                      }).click();
                      /*fetch(url + data.zip)
                          .then(response => response.blob())
                          .then(blob => {
                              const link = document.createElement('a')
                              link.href = URL.createObjectURL(blob)
                              link.download = `netvision.zip`
                              link.click()
                          })
                          .catch(console.error);*/
                    }
                })
        },
        onTabChange(event) {
            this.currentSectionTab = 0
            this.currentTab = event.current
        },
        onSectionChange(event) {
            this.currentSectionTab = event.current
        },
    },
    computed: {
        getProjects() {
            return this.$store.getters['project/getProjects']
        },
        getDocuments() {
            const current = this.tabs[this.currentTab]
            if ('index' in current) {
                return this.getProjects[current.index].documents
            }
            let documents = []
            this.getProjects.forEach((project) => {
                documents = [...documents, ...project.documents]
            })
            return documents
        },
        getDocumentsBySection() {
            if (this.getProjectSections.length && this.currentTab) {
                return this.getDocuments.filter((document) => {
                    return document.section === this.getProjectSections[this.currentSectionTab].title
                })
            }

            return this.getDocuments
        },
        getProjectSections() {
            return [...new Set(this.getDocuments
                .filter(document => document.section)
                .map(document => document.section))
            ].map(tab => {
                return {
                    title: tab
                }
            })
        }
    },
    mixins: [replaceUrl]
}
</script>

<style lang="scss" scoped>
.main__container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    > h1 {
        margin: 3.12rem 0;
    }

    > .tabs__wrapper {
        margin-bottom: 3.12rem;
        width: 100%;

        &:last-of-type {
            width: 100%;
        }
    }

    > .wrapper {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: flex-start;
        flex-wrap: wrap;

        > a {
            margin-right: 5%;
            margin-bottom: 5%;

            &:nth-of-type(3n) {
                margin-right: 0;
            }
        }
    }

    > .outline__button {
        margin: 0 auto;
        margin-bottom: 10.41rem;
    }
}
</style>

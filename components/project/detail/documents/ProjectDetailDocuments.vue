<template>
    <section class="main__container">
        <main-tabs v-if="getProjectSections.length"
                   :tabs="getProjectSections"
                   :is-sub-tabs="true"
                   @changeTab="onSectionChange"/>

        <project-detail-documents-card v-for="(documentModel, index) in getDocumentsBySection"
                                       :key="`document-${index}`"
                                       :document-model="documentModel"/>

        <div class="button__wrapper">
            <button class="outline__button" @click="downloadAll">
                Скачать все
            </button>
        </div>
    </section>
</template>

<script>
import {ProjectService} from "@/services/ProjectService";
import {url} from "@/plugins/api";
import replaceUrl from "@/mixins/replaceUrl";

export default {
    name: "ProjectDetailDocuments",
    props: {
        documents: {
            type: Array,
            required: false,
            default: []
        }
    },
    data() {
        return {
            currentSectionTab: 0,
        }
    },
    methods: {
        onSectionChange(event) {
            this.currentSectionTab = event.current
        },
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
    },
    computed: {
        getProjectSections() {
            return [...new Set(this.documents
                .filter(document => document.section)
                .map(document => document.section))
            ].map(tab => {
                return {
                    title: tab
                }
            })
        },
        getDocumentsBySection() {
            if (this.getProjectSections.length) {
                return this.documents.filter((document) => {
                    return document.section === this.getProjectSections[this.currentSectionTab].title
                })
            }

            return this.documents
        },
    },
    mixins: [replaceUrl]
}
</script>

<style lang="scss" scoped>
.main__container {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;

    > .tabs__wrapper {
        width: 100%;
        margin: 0 0 2rem;
        position: relative;
        top: auto;
    }

    > a {
        margin-right: 5%;
        margin-bottom: 3rem;

        &:nth-of-type(3n) {
            margin-right: 0;
        }
    }

    > .button__wrapper {
        width: 100%;
        margin-top: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

@media screen and (max-width: 991px) {
    .main__container {
        justify-content: space-between;

        > a {
            margin-right: 0 !important;
        }
    }
}
</style>

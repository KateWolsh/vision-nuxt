<template>
    <main>
        <index-title :title="mainPage.title"
                     :polls="mainPage.polls"/>

<!--        <index-innovations :description="mainPage.innovativeSolutionsDescription"
                           :innovations="mainPage.innovativeSolutions"/>

        <index-statistics-lib :description="mainPage.trustDescription"
                              :statistics="mainPage.trust"/>

        <index-clients-lib v-if="'clients' in mainPage && mainPage.clients.length"
                           :clients="mainPage.clients"/>

        <index-map v-if="map.length" :map="map"/>

        <index-team :count="mainPage.teamOtherCount"
                    :team="mainPage.team"/>

        <index-partners v-if="'partners' in mainPage && mainPage.partners.length"
                        :partners="mainPage.partners"/>-->
    </main>
</template>

<script>
import {ProjectService} from "@/services/ProjectService";
import {MainPageService} from "@/services/MainPageService";
import {MapService} from "@/services/MapService";

export default {
    name: 'IndexPage',
    data() {
        return {
            mainPage: {},
            map: []
        }
    },
    mounted() {
        MainPageService.getAll().then(({data, res}) => {
            if (res && res.status === 200 && data.length) {
                this.mainPage = data[data.length - 1]
            }
        })

        ProjectService.getAll().then(({data, res}) => {
            if (res && res.status === 200) {
                this.$store.commit('project/setProjects', data)
            }
        })

        MapService.getAll().then(({data, res}) => {
            if (res && res.status === 200) {
                this.map = data
            }
        })
    },
}
</script>

<style lang="scss" scoped>
main {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    &::v-deep {
        > section {
            margin-bottom: 12rem;
        }

        h2 {
            margin-bottom: 2.1rem;
            font-size: 2.7rem;
            line-height: 1.4em;
        }
    }
}

@media screen and (max-width: 480px) {
    main {

        &::v-deep {
            > section {
                margin-bottom: 5rem;
            }

            h2 {
                margin-bottom: 1.07rem;
                font-size: 1.6rem;
                line-height: 1.4em;
            }
        }
    }
}

</style>

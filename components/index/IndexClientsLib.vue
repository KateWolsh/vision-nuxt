<template>
  <section :class="{'light': getIsLightTheme}">
    <marquee-text :repeat="3" class="row" :duration="10">
      <article v-for="(client, j) in clients" :key="`client-${j}`">
        <img :src="getReplacedUrl(client.image)" alt="">
      </article>
    </marquee-text>
  </section>
</template>

<script>
import replaceUrl from "@/mixins/replaceUrl";

export default {
  name: "IndexClientsLib",
  props: {
    clients: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  computed: {
    getIsLightTheme() {
      return this.$store.getters['theme/getIsLightTheme']
    },
  },
  mixins: [replaceUrl]
}
</script>

<style lang="scss" scoped>
section {
  width: 100%;
  height: 4.21rem;
  position: relative;
  display: flex;
  overflow: hidden;

  > .row {
    display: flex;
    position: absolute;
    left: 0;
    top: 0;

    .marquee-text-text {
      display: flex;
      align-items: center;
    }

    article {
      position: relative;
      padding: 1rem 4rem;

      img {
        height: 2rem;
      }

      &:before {
        content: '';
        position: absolute;
        transform: translateY(-50%);
        top: 50%;
        right: 0;
        width: 2px;
        height: 1.66rem;
        background-color: white;
      }
    }
  }

  &.light {
    > .row {
      article {
        img {
          -webkit-filter: invert(100%); /* Safari/Chrome */
          filter: invert(100%);
        }

        &:before {
          background-color: black;
        }
      }
    }
  }
}
</style>

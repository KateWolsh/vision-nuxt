<template>
  <section class="main__container">
    <article v-for="(module, index) in modules" :key="`module-${index}`">
      <img class="blur" :src="getReplacedUrl(module.image)">
      <img :src="getReplacedUrl(module.image)">
      <div class="info">
        <h4>
          {{ module.title }}
        </h4>
        <p>
          {{ module.text }}
        </p>
      </div>
    </article>
  </section>
</template>

<script>
import replaceUrl from "@/mixins/replaceUrl";

export default {
  name: "ProjectDetailModules",
  props: {
    modules: {
      type: Array,
      required: true
    }
  },
  mixins: [replaceUrl]
}
</script>

<style lang="scss" scoped>
section {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  > article {
    width: 45%;
    display: flex;
    align-items: flex-start;
    margin-bottom: 4rem;
    position: relative;

    > img {
      width: 5.2rem;
      object-fit: contain;
      object-position: left center;
      margin-right: 3rem;
    }

    > .blur {
      position: absolute;
      left: 0;
      top: 0;
      filter: blur(3rem);
    }

    > .info {
      display: flex;
      flex-direction: column;

      > h4 {
        font-size: 1.35rem;
        margin-bottom: .4rem;
      }

      > p {
        font-size: 1.14rem;
        line-height: 1.6em;
        font-weight: 300;
      }
    }
  }
}

@media screen and (max-width: 991px) {
  section {

    > article {
      width: 100%;
      margin-bottom: 6.4rem;

      > img {
        width: 7rem;
        object-fit: contain;
        object-position: left center;
        margin-right: 3.8rem;
      }

      > .info {

        > h4 {
          font-size: 1.45rem;
          margin-bottom: .5rem;
        }

        > p {
          font-size: 1.2rem;
        }
      }
    }
  }
}

@media screen and (max-width: 480px) {
  section {

    > article {
      margin-bottom: 6.4rem;
      flex-direction: column;

      > img {
        width: 5rem;
        margin-bottom: 2rem;
      }

      > .info {

        > h4 {
          font-size: 1.21rem;
          margin-bottom: .5rem;
        }

        > p {
          font-size: 1.08rem;
        }
      }
    }
  }
}

</style>

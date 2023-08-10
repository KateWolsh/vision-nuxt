<template>
  <section :class="['main__container', {'light': getIsLightTheme}]">
    <h2 v-if="requirementsOs.length || requirementsWeb.length">
      Системные требования
    </h2>
    <div class="requirements__line" v-if="requirementsOs.length">
      <div class="col">
        <p>
          Операционные системы
        </p>
        <span class="line"></span>
      </div>
      <div class="col">
        <article v-for="(os, index) in requirementsOs" :key="`requirement-${index}`">
          <img :src="getReplacedUrl(os.image)">
          <span>
                        {{ os.title }}
                    </span>
        </article>
      </div>
    </div>
    <div class="requirements__line" v-if="requirementsWeb.length">
      <div class="col">
        <p>
          Веб-доступ через браузеры
        </p>
        <span class="line"></span>
      </div>
      <div class="col">
        <article v-for="(web, index) in requirementsWeb" :key="`requirement-web-${index}`">
          <img :src="getReplacedUrl(web.image)">
          <span>
                        {{ web.title }}
                    </span>
        </article>
      </div>
    </div>

    <h2 class="protections__title" v-if="protections.length">
      Защита и хранение данных
    </h2>
    <div class="protections__wrapper" v-if="protections.length">
      <article v-for="(protection, index) in protections">
        <img :src="getReplacedUrl(protection.image)">
        <p>
          {{ protection.text }}
        </p>
      </article>
    </div>
  </section>
</template>

<script>
import replaceUrl from "@/mixins/replaceUrl";

export default {
  name: "ProjectDetailSystem",
  props: {
    requirementsOs: {
      type: Array,
      required: false,
      default: []
    },
    requirementsWeb: {
      type: Array,
      required: false,
      default: []
    },
    protections: {
      type: Array,
      required: false,
      default: []
    },
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
  display: flex;
  flex-direction: column;

  > h2 {
    margin-bottom: 2.08rem;
    font-size: 1.35rem;
    line-height: 140%;
  }

  > .requirements__line {
    display: flex;
    margin-bottom: 3.38rem;

    > .col {
      width: 35vw;
      display: flex;
      justify-content: stretch;
      align-items: flex-end;

      > p {
        line-height: 150%;
        font-weight: 400;
        opacity: .5;
        font-size: 1.04rem;
        width: auto;
        margin-right: 1.04rem;
      }

      .line {
        flex: 1;
        border-bottom: 1px dashed hsla(0, 0%, 100%, 0.2);
        width: 100%;
      }

      > article {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: auto;

        > img {
          height: 2.6rem;
          width: 2.6rem;
          object-fit: contain;
          object-position: center;
          margin: 0 2rem;
        }

        > span {
          max-width: 5rem;
          text-align: center;
          margin-top: .93rem;
          font-size: .83rem;
          line-height: 150%;
          text-transform: capitalize;
        }
      }
    }

    &:last-of-type {
      margin-bottom: 7rem;
    }
  }

  > .protections__title {
    margin-top: 7.29rem;
    margin-bottom: 4.16rem;
  }

  > .protections__wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;

    > article {
      width: 30%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 6rem;
      margin-right: 5%;

      > img {
        width: 6.04rem;
        height: 6.04rem;
        object-fit: contain;
        object-position: center;
        margin-bottom: 2rem;
      }

      > p {
        text-align: center;
        line-height: 1.6em;
        font-weight: 300;
      }

      &:nth-of-type(3n) {
        margin-right: 0;
      }
    }
  }

  &.light {
    > .requirements__line {
      > .col {
        > .line {
          border-color: $greyColor;
        }
      }
    }
  }
}

@media screen and (max-width: 991px) {
  section {

    > h2 {
      margin-bottom: 2.3rem;
      font-size: 1.75rem;
    }

    > .requirements__line {

      > .col {
        width: 37vw;

        > p {
          font-size: 1.18rem;
        }

        > article {

          > img {
            height: 2.4rem;
            width: 2.4rem;
          }
        }
      }
    }

    > .protections__title {
      margin-top: 1rem;
    }

    > .protections__wrapper {
      justify-content: space-between;

      > article {
        width: 45%;
        margin-right: 0;

        > img {
          width: 4.04rem;
          height: 4.04rem;
        }

        > p {
          font-size: 1.18rem;
        }
      }
    }
  }
}

@media screen and (max-width: 480px) {
  section {

    > h2 {
      margin-bottom: 2.3rem;
      font-size: 1.35rem;
    }

    > .requirements__line {
      flex-direction: column;

      > .col {
        width: 100%;

        > .line {
          display: none;
        }

        > p {
          font-size: 1.08rem;
          margin-bottom: .8rem;
        }

        > article {
          min-width: 4.28rem;
          margin-right: 1rem;

          > img {
            margin: 0;
            height: 2.4rem;
            width: 2.4rem;
          }
        }
      }
    }

    > .protections__title {
      margin-top: 1rem;
    }

    > .protections__wrapper {

      > article {
        width: 100%;
        align-items: flex-start;

        > img {
          width: 5.5rem;
          height: 5.5rem;
        }

        > p {
          text-align: left;
          font-size: 1.18rem;
        }

        &:last-of-type {
          margin-bottom: 0;
        }
      }
    }
  }
}

</style>

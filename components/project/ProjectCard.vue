<template>
  <article :class="{'light': getIsLightTheme}">
    <div class="info">
      <h3>
        {{ project.title }}
      </h3>
      <p>
        {{ project.polls }}
      </p>

      <div class="links">
        <button @click="formScroll" class="white__button">
          Попробовать продукт
        </button>
        <nuxt-link :to="`/project/${project._id}`">
          Подробнее
        </nuxt-link>
      </div>
    </div>
    <div class="preview">
      <img :src="getReplacedUrl(project.image)">
    </div>
  </article>
</template>

<script>
import scrollToRef from "@/mixins/scrollToRef";
import replaceUrl from "@/mixins/replaceUrl";

export default {
  name: "ProjectCard",
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  computed: {
    getIsLightTheme() {
      return this.$store.getters['theme/getIsLightTheme']
    }
  },
  mixins: [scrollToRef, replaceUrl]
}
</script>

<style lang="scss" scoped>
article {
  box-sizing: border-box;
  padding: 4.15rem 0 4.15rem 4.15rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgba(73, 73, 73, 0.67);
  border-radius: .52rem;
  width: 54vw;
  min-height: 27.77rem;
  overflow: hidden;
  background: linear-gradient(0deg, rgba(68, 68, 68, 0.32), rgba(68, 68, 68, 0.32));
  backdrop-filter: blur(1.56rem);

  // TODO : REMOVE MARGIN
  margin-bottom: 2rem;

  > .info {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 23rem;

    > h3 {
      margin-bottom: .67rem;
      font-weight: bold;
      font-size: 1.5rem;
      line-height: 120%;
      word-wrap: break-word;
    }

    > p {
      font-weight: 300;
      font-size: 1.14rem;
      line-height: 150%;
      margin-bottom: 1rem;
    }

    > .links {
      margin-top: auto;
      display: flex;
      align-items: center;

      &::v-deep {
        .white__button {
          margin-right: 1.56rem;
        }
      }
    }
  }

  > .preview {
    position: relative;
    width: 29rem;
    height: 21rem;
    margin-right: -5rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-image: url("./assets/img/background/mockup.png");
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    overflow: hidden;

    > img {
      width: 90%;
      height: 90%;
      object-fit: cover;
      object-position: center;
    }
  }

  &.light {
    background: rgba(255, 255, 255, 0.53);
    border-color: white;
  }
}

@media screen and (max-width: 1024px) {
  article {
    height: auto;

    > .info {
      padding-right: 1rem;

      > .links {
        margin-top: 1rem;
        flex-direction: column;

        .white__button {
          margin-right: 0;
          margin-bottom: 1rem;
        }
      }
    }
  }
}

@media screen and (max-width: 480px) {
  article {
    padding: 2rem 0;
    display: flex;
    flex-direction: column;
    width: 90vw;
    overflow: hidden;

    > .info {
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 0 1.42rem;
      margin-bottom: 5rem;
      height: auto;

      > h3 {
        margin-bottom: .67rem;
        font-size: 1.57rem;
      }

      > p {
        font-size: .92rem;
        margin-bottom: 2rem;
      }

      > .links {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        &::v-deep {
          .white__button {
            margin-right: 0;
            margin-bottom: 1.5rem;
          }
        }
      }
    }

    > .preview {
      width: 20rem;
      height: 14.28rem;
      margin-right: -35vw;
    }
  }
}
</style>

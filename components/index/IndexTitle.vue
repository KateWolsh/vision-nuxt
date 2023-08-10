<template>
  <section :class="['index-title__wrapper', {'light': getIsLightTheme}]">
    <div class="info main__container" v-if="title || polls">
      <h1 v-if="title && getSplittedTitle.length">
                <span>
                    {{ getSplittedTitle[0] }}
                </span>
        <p v-if="getSplittedTitle.length > 1">
          {{ getSplittedTitle[1] }}
        </p>

        <div class="include">
          <div class="label">
            Входит в:
          </div>
          <div class="logo">
            <img src="@/assets/img/icons/arpp_logo.png" alt="АРПП Отечественный софт">
            <span>
              АРПП<br/>
              Отечественный софт
            </span>
          </div>
        </div>
      </h1>
      <p v-if="polls">
        {{ polls }}
      </p>
    </div>

    <div class="hooper__wrapper">
      <button @click="slideProjects({direction: false})"></button>
      <hooper :settings="$options.HOOPER_SETTINGS"
              ref="slider"
              v-if="getProjects.length"
              @slide="afterSlide">
        <slide v-for="project in getProjects" :key="`project-card-${project._id}`">
          <project-card :project="project"/>
        </slide>
      </hooper>
      <button @click="slideProjects({direction: true})"></button>
    </div>

    <main-slider-controls v-if="getProjects.length"
                          :slides="getProjects"
                          :current-slide="currentSlide"
                          @slide="slideProjects"/>
  </section>
</template>

<script>
import {Hooper, Slide} from 'hooper';
import 'hooper/dist/hooper.css';

export default {
  name: "IndexTitle",
  HOOPER_SETTINGS: {
    itemsToShow: 2,
    centerMode: true,
    infiniteScroll: true,
    wheelControl: false,
    mouseDrag: false,
    breakpoints: {
      0: {
        itemsToShow: 1,
      },
      770: {
        itemsToShow: 2,
      }
    }
  },
  props: {
    title: {
      type: String,
      required: false,
      default: ''
    },
    polls: {
      type: String,
      required: false,
      default: ''
    },
  },
  data() {
    return {
      currentSlide: 0
    }
  },
  methods: {
    slideProjects(event) {
      if (event.direction) {
        this.$refs.slider.slideNext()
      } else {
        this.$refs.slider.slidePrev()
      }
    },
    afterSlide(event) {
      this.currentSlide = event.currentSlide
    }
  },
  computed: {
    getProjects() {
      return this.$store.getters['project/getProjects']
    },
    getSplittedTitle() {
      if (this.title) {
        const splitted = this.title.split(' ')
        let firstWord = splitted[0]
        return [
          firstWord,
          splitted.slice(1).join(' ')
        ]
      }
      return []
    },
    getIsLightTheme() {
      return this.$store.getters['theme/getIsLightTheme']
    }
  },
  components: {
    Hooper,
    Slide
  }
}
</script>

<style lang="scss" scoped>
.index-title__wrapper {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 3rem;
  background-image: url("./assets/img/background/main-bg.jpg");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;

  > .info {
    z-index: 1;
    display: flex;
    justify-content: space-between;
    margin-bottom: 7.5rem;

    > h1 {
      font-size: 2.81rem;

      > span {
        color: $accentBlue;
      }

      > .include {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        margin-top: 2.08rem;

        > .label {
          font-weight: 400;
          font-size: 1.25rem;
          line-height: 1.25rem;
          opacity: .5;
          margin-bottom: 1.04rem;
        }

        > .logo {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;

          > img {
            width: 3.64rem;
          }

          > span {
            margin-left: .78rem;
            font-size: 1.25rem;
            line-height: 1.25rem;
            font-weight: 400;
          }
        }
      }
    }

    > p {
      width: 40%;
      line-height: 1.6em;
      font-weight: 400;
      font-size: 1.4rem;
      padding-top: 1rem;
    }
  }

  &.light {
    background-image: url("./assets/img/background/main-bg-light.png");
  }

  .hooper__wrapper {
    display: flex;
    width: 100%;
    position: relative;

    button {
      background-color: transparent;
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 20%;
      border: none;
      z-index: 100;

      &:last-of-type {
        left: auto;
        right: 0;
      }
    }
  }

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url("./assets/img/background/light.png");
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    pointer-events: none;
  }

  &::v-deep {
    .hooper {
      height: auto;

      .hooper-slide {
        display: flex;
        align-items: center;
        flex-direction: column;
        transition: $animTime;

        article {
          opacity: .5;
          transform: scale(.85);
        }

        &.is-current {
          article {
            opacity: 1;
            transform: scale(1);
            z-index: 100;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 1024px) {
  .index-title__wrapper {
    min-height: 50vh;

    .hooper__wrapper {
      button {
        display: none;
      }
    }
  }
}

@media screen and (max-width: 480px) {
  .index-title__wrapper {
    min-height: auto;
    padding-top: 5rem;
    background-size: cover;
    margin-bottom: 3rem !important;

    > .info {
      flex-direction: column;
      justify-content: space-between;
      margin-bottom: 8rem;

      > h1 {
        font-size: 1.85rem;
      }

      > p {
        width: 100%;
        font-size: 1.08rem;
      }
    }

    &::after {
      width: 100%;
      height: 100%;
      background-size: cover;
    }

    &::v-deep {
      .hooper {
        .hooper-slide {
          article {
            opacity: 1;
            transform: scale(1);
          }
        }
      }
    }
  }
}

</style>

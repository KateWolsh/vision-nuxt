<template>
  <header :class="['main__container', {'light': getIsLightTheme}]">
    <main-logo @closeMenu="closeMenu"/>

    <button @click="toggleTheme">
      <img :src="getMoonIcon">
    </button>

    <button @click="toggleMenu">
      <transition name="rotate-fade" mode="out-in">
        <img :src="getOpenIcon" v-if="!isOpen" key="open">
        <img :src="getCloseIcon" v-else key="close">
      </transition>
    </button>

    <transition name="fade" mode="out-in">
      <main-menu v-show="isOpen"/>
    </transition>
  </header>
</template>

<script>
export default {
  name: "MainHeader",
  data() {
    return {
      isOpen: false
    }
  },
  watch: {
    $route() {
      this.isOpen = false
    }
  },
  methods: {
    closeMenu() {
      this.isOpen = false
    },
    toggleTheme() {
      this.$store.commit('theme/setIsLightTheme', `${!this.$store.getters['theme/getIsLightTheme']}`)
    },
    toggleMenu() {
      this.isOpen = !this.isOpen
    }
  },
  computed: {
    getIsLightTheme() {
      return this.$store.getters['theme/getIsLightTheme']
    },
    getCloseIcon() {
      return this.getIsLightTheme ?
        require('../../assets/img/icons/close_light.svg') :
        require('../../assets/img/icons/close.svg')
    },
    getOpenIcon() {
      return this.getIsLightTheme ?
        require('../../assets/img/icons/open_light.svg') :
        require('../../assets/img/icons/open.svg')
    },
    getMoonIcon() {
      return this.getIsLightTheme ?
        require('../../assets/img/icons/moon_light.svg') :
        require('../../assets/img/icons/moon.svg')
    },
  }
}
</script>

<style lang="scss" scoped>
header {
  top: 0;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5rem;
  z-index: 5000;

  > button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: .75rem 1rem;
    background: linear-gradient(90deg, #31383E, #20262C);
    border: none;
    border-radius: .75rem;
    margin-right: 1.04rem;

    img {
      width: 1.8rem;
      height: 1.8rem;
      object-fit: contain;
      object-position: center;
      transition: $animTime;
    }

    &:hover {
      img {
        transform: scale(1.05);
      }
    }

    &:last-of-type {
      margin-right: 0;
    }
  }

  &.light {
    > button {
      background: white;
    }
  }

  &::v-deep {
    .logo {
      margin-right: auto;
    }
  }
}
</style>

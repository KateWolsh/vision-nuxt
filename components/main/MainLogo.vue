<template>
  <nuxt-link to="/" class="logo" @click.native="onLogoClick">
    <img src="@/assets/img/icons/logo_light.png" v-if="getIsLightTheme">
    <img src="@/assets/img/icons/logo.svg" v-else>
  </nuxt-link>
</template>

<script>
export default {
  name: "MainLogo",
  methods: {
    onLogoClick() {
      this.$router.push('/')
      window.scrollTo(0, 0)
      this.$emit('closeMenu')
    }
  },
  computed: {
    getIsLightTheme() {
      return this.$store.getters['theme/getIsLightTheme']
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  > img {
    width: 9rem;
  }
}
</style>

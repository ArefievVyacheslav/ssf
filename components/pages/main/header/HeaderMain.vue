<template lang="pug">
  div
    MenuTop
    MenuLinks
    HeaderMiddleFirstView(v-if="isShowHeaderFirstView")
    HeaderFilters

</template>

<script>
import MenuTop from '@/components/pages/main/header/header-top/MenuTop.vue'
import MenuLinks from "@/components/pages/main/header/header-second-line/MenuLinks.vue";
import HeaderMiddleFirstView from "@/components/pages/main/header/HeaderMiddleFirstView.vue";
import HeaderFilters from "@/components/pages/main/header/header-filters/HeaderFilters.vue";

export default {
  name: 'HeaderMain',
  components: { HeaderFilters, HeaderMiddleFirstView, MenuLinks, MenuTop },
  computed: {
    isShowHeaderFirstView () {
      return this.$store.state.statistic.isFirstView || this.$route.path === '/'
    }
  }
}
</script>

<style scoped>

</style>

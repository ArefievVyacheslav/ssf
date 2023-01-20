<template lang="pug">
  div
    MenuTop
    MenuLinks
    HeaderMiddleFirstView(v-if="$store.state.statistic.numberOfViews === 1")

</template>

<script>
import MenuTop from '@/components/pages/main/header/header-top/MenuTop.vue'
import MenuLinks from "@/components/pages/main/header/header-second-line/MenuLinks.vue";
import HeaderMiddleFirstView from "@/components/pages/main/header/HeaderMiddleFirstView.vue";

export default {
  name: 'HeaderMain',
  components: { HeaderMiddleFirstView, MenuLinks, MenuTop }
}
</script>

<style scoped>

</style>

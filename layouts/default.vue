<template lang="pug">
  .layout-default
    HeaderMain
    MenuLinks

</template>

<script>
import HeaderMain from '@/components/pages/main/header/HeaderMain.vue'
import MenuLinks from "@/components/pages/main/header/header-second-line/MenuLinks.vue";

export default {
  name: 'default',
  components: { MenuLinks, HeaderMain }
}
</script>

<style scoped>

</style>

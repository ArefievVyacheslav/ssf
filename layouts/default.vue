<template lang="pug">
  .layout-default
    HeaderMain
    Nuxt
    ExtraFilterSidebar

</template>

<script>
import HeaderMain from '@/components/pages/main/header/HeaderMain.vue'
import ExtraFilterSidebar from "@/components/pages/main/header/header-filters/ExtraFilterSidebar.vue";

export default {
  name: 'default',
  components: { ExtraFilterSidebar, HeaderMain }
}
</script>

<style lang="scss">

</style>

<template lang="pug">
  .header
    MenuTop
    MenuLinks

</template>

<script>
import MenuTop from '@/components/pages/main/header/header-top/MenuTop.vue'
import MenuLinks from "@/components/pages/main/header/header-second-line/MenuLinks.vue";

export default {
  name: 'HeaderMain',
  components: { MenuLinks, MenuTop }
}
</script>

<style scoped>

</style>

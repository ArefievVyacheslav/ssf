<template lang="pug">
  .filter__wrapper.m0auto.pb20px(:class="{ pt30px: $store.state.statistic.isFirstView || $route.path === '/' }")
    .container.df.jcc
      GenderFilter
      SubcategoryFilter(:disabled="isDisabled")

</template>

<script>
import GenderFilter from "@/components/pages/main/header/header-filters/GenderFilter.vue";
import SubcategoryFilter from "@/components/pages/main/header/header-filters/SubcategoryFilter.vue";

export default {
  name: "HeaderFilters",
  components: { SubcategoryFilter, GenderFilter },
  computed: {
    isDisabled () {
      return this.$store.state.filters.isDisabled
    }
  }
};
</script>

<style lang="scss">
  .filter__wrapper {
    background: #EAECF1;
  }

</style>

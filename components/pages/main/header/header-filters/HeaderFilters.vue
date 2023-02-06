<template lang="pug">
  .filter__wrapper.m0auto.pb20px(:class="{ pt30px: $store.state.statistic.isFirstView || $route.path === '/' }")
    .container.df.jcc
      GenderFilter
      SubcategoryFilter(:disabled="isDisabled")
      BrandFilter(:disabled="isDisabled")
      SizeFilter(:disabled="isDisabled")
      PriceFilter(:disabled="isDisabled")
      ExtraFilter(:disabled="isDisabled")

</template>

<script>
import GenderFilter from "@/components/pages/main/header/header-filters/GenderFilter.vue";
import SubcategoryFilter from "@/components/pages/main/header/header-filters/SubcategoryFilter.vue";
import BrandFilter from "@/components/pages/main/header/header-filters/BrandFilter.vue";
import SizeFilter from "@/components/pages/main/header/header-filters/SizeFilter.vue";
import PriceFilter from "@/components/pages/main/header/header-filters/PriceFilter.vue";
import ExtraFilter from "@/components/pages/main/header/header-filters/ExtraFilter.vue";

export default {
  name: "HeaderFilters",
  components: { ExtraFilter, PriceFilter, SizeFilter, BrandFilter, SubcategoryFilter, GenderFilter },
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

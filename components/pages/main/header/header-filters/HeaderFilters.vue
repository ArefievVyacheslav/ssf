<template lang="pug">
  .filter__wrapper.m0auto.pb20px(:class="{ pt30px: $store.state.statistic.isFirstView || $route.path === '/' }")
    .container.df.jcc
      GenderFilter
      SubcategoryFilter(:disabled="isDisabled")
      BrandFilter(:disabled="isDisabled")
      SizeFilter(:disabled="isDisabled")
      PriceFilter(:disabled="isDisabled")
      ExtraFilter(:disabled="isDisabled")
      button.filter__btn-search.ml16px.cp(@click="toProductPage") Найти

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
  },
  methods: {
    async toProductPage () {
      await this.$store.dispatch('products/FETCH_PRODUCTS')
      await this.$router.push(this.$store.getters[ "catalog/GET_URL" ])
    }
  }
};
</script>

<style lang="scss">
  .filter__wrapper {
    background: #EAECF1;

    .filter__btn-search {
      width: 130px;
      height: 60px;
      background: #2D78EA;
      border-radius: 10px;
      font-family: 'Inter',serif;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 19px;
      letter-spacing: 0.02em;
      color: #FFFFFF;
      border: none;
      outline: none;
    }
  }

</style>

<template lang="pug">
  .filter__wrapper.m0auto
    .container.df.jcc
      GenderFilter(@change-gender="setDisabled")
      SubcategoryFilter(:disabled="isDisabled")

</template>

<script>
import GenderFilter from "@/components/pages/main/header/header-filters/GenderFilter.vue";
import SubcategoryFilter from "@/components/pages/main/header/header-filters/SubcategoryFilter.vue";

export default {
  name: "HeaderFilters",
  components: { SubcategoryFilter, GenderFilter },
  data: () => ({ isDisabled: true }),
  methods: {
    setDisabled (genderObj) {
      this.isDisabled = !genderObj
    }
  }
};
</script>

<style lang="scss">
  .filter__wrapper {
    padding-top: 30px;
    padding-bottom: 20px;
    background: #EAECF1;
  }

</style>

<template lang="pug">
  .filter__wrapper.m0auto
    .container.df.jcc
      GenderFilter

</template>

<script>
import GenderFilter from "@/components/pages/main/header/header-filters/GenderFilter.vue";

export default {
  name: "HeaderFilters",
  components: { GenderFilter }
};
</script>

<style lang="scss">
  .filter__wrapper {
    padding-top: 30px;
    padding-bottom: 20px;
    background: #EAECF1;
  }

</style>

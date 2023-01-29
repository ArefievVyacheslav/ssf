<template lang="pug">
  .my-data.df.aic
    .container.df.mt22px.mb16px.p0
      Switcher(@switch-my-data="")
      span.my-data__text.mt3px.ml10px Мои данные
      span.my-data__text.my-data__text_setting.mt3px.ml10px.cp(@click="isModalMyFiltersSetShowing = !isModalMyFiltersSetShowing") Настроить

</template>

<script>
import Switcher from "@/components/ui/blocks/Switcher.vue";

export default {
  name: "HeaderMyData",
  components: { Switcher },
  data: () => ({ isModalMyFiltersSetShowing: false }),
  methods: {
    setMyFilters () {}
  }
};
</script>

<style lang="scss">
  .my-data {
    gap: 10px;
    background: #EAECF1;

    .my-data__text {
      font-family: 'Inter', serif;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      letter-spacing: 0.02em;
      color: #303030
    }

    .my-data__text_setting {
      color: #2D78EA;
    }
  }

</style>

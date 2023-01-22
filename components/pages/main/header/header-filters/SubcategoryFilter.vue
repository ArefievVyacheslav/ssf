<template lang="pug">
  .filter__item.filter__item_subcategory.pos-rel.df.jcsb.aic.cp(@click="isShowSubcategoryList = !isShowSubcategoryList")
    h3.filter__name.filter__name_gender(:class="{ disabled }") Категория
    .number-selected-options.ml6px(v-if="currentSubcategory") 1
    IconArrowDownGreyMedium.menu-links__icon-arrow-down.ml19px(
      :active="isShowSubcategoryList" :class="{ 'menu-links__icon-arrow-down-active': isShowSubcategoryList }"
    )

</template>

<script>
import IconArrowDownGreyMedium from "@/components/ui/icons/arrows/IconArrowDownGreyMedium.vue";

export default {
  name: "SubcategoryFilter",
  components: { IconArrowDownGreyMedium },
  props: [ 'disabled' ],
  data: () => ({
    // genderOptions: [
    //   { name: 'Мужской', url: 'muzhchinam', param: { gender: 'Мужской', age: 'Взрослый' } },
    //   { name: 'Женский', url: 'zhenshchinam', param: { gender: 'Женский', age: 'Взрослый' } },
    //   // { name: 'Мальчики', url: 'muzhchinam', param: { gender: 'Мужской', age: 'Детский' } },
    //   // { name: 'Девочки', url: 'zhenshchinam', param: { gender: 'Женский', age: 'Детский' } },
    //   // { name: 'Детский', url: 'detyam', param: { age: 'Детский' } }
    // ],
    currentSubcategory: null,
    isShowSubcategoryList: false,
    isDisabled: true
  }),

};
</script>

<style lang="scss">
  .disabled {
    color: #B3B3B3 !important;
  }

  .filter__item_subcategory {
    width: 129px;
  }

</style>

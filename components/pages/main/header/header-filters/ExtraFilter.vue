<template lang="pug">
  .filter__item.filter__item_extra.pos-rel.df.jcsb.aic.cp(
    v-b-toggle.sidebar-extra-filters :class="{ 'filter__item_hover': !disabled, 'cnd': disabled }"
  )
    h3.filter__name.filter__name_gender(:class="{ disabled }") Доп. параметры
    .number-selected-options.pos-abs.ml122px(v-if="countExtraFilters") {{ countExtraFilters }}
    IconArrowDownGreyMedium.menu-links__icon-arrow-down.ml19px(
      :disabled="disabled" :class="{ 'menu-links__icon-arrow-down-active': isShowExtraSidebar && !disabled }"
    )

</template>

<script>
import IconArrowDownGreyMedium from "@/components/ui/icons/arrows/IconArrowDownGreyMedium.vue";

export default {
  name: "ExtraFilter",
  components: { IconArrowDownGreyMedium },
  props: [ 'disabled' ],
  data: () => ({ isShowExtraSidebar: false, countExtraFilters: 0 }),
  created () {
    this.$root.$on('show-extra-filters', condition => this.isShowExtraSidebar = condition)
    this.$root.$on('count-extra-filters', count => {
      this.countExtraFilters = count
    })
  }
};
</script>

<style lang="scss">
  .filter__item_extra {
    width: 172px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  .filter__item_extra:before {
    content: '';
    position: absolute;
    left: 0;
    display: block;
    height: 36px;
    width: 1px;
    background: #EAECF1;
  }
  .filter__item_extra:after {
    display: none;
  }

</style>

<template lang="pug">
  b-sidebar(
    v-show="$store.state.filters.filterObj.gender" id="sidebar-extra-filters" v-model="conditionExtraFilters"
    @change="isShowExtraFilters = !isShowExtraFilters" no-header-close right :shadow="true" sidebar-class="extra-filters"
  )
    .df
      h4.extra-filters__header.ttu дополнительные параметры
      div.mr3px(@click="conditionExtraFilters = false")
        IconCloseModal.extra-filters__icon-close.cp

    InstallmentFilter(@is-installment="toggleFilterCount")
    SaleSizeFilter(@is-sale-size="toggleFilterCount")
    ShopFilter(@is-shop="toggleFilterCount")
    ColorFilter

</template>

<script>
import IconCloseModal from "@/components/ui/icons/IconCloseModal.vue";
import InstallmentFilter from "@/components/pages/main/header/header-filters/sidebar-filters/InstallmentFilter.vue";
import SaleSizeFilter from "@/components/pages/main/header/header-filters/sidebar-filters/SaleSizeFilter.vue";
import BrandFilter from "@/components/pages/main/header/header-filters/BrandFilter.vue";
import ShopFilter from "@/components/pages/main/header/header-filters/sidebar-filters/ShopFilter.vue";
import ColorFilter from "@/components/pages/main/header/header-filters/sidebar-filters/ColorFilter.vue";

export default {
  name: "ExtraFilterSidebar",
  components: { ColorFilter, ShopFilter, BrandFilter, SaleSizeFilter, InstallmentFilter, IconCloseModal },
  data: () => ({ isShowExtraFilters: false, conditionExtraFilters: null, filterCount: 0 }),
  watch: {
    isShowExtraFilters (nV) {
      nV
        ? this.showExtraFilters()
        : this.hideExtraFilters()
    },
    conditionExtraFilters (nV) {
      this.$root.$emit('show-extra-filters', nV)
       nV
         ? document.addEventListener('click', this.handleClick)
         : document.removeEventListener('click', this.handleClick)
    },
    filterCount (nV) {
      this.$root.$emit('count-extra-filters', nV)
    }
  },
  methods: {
    handleClick (event) {
      if (event?.target?.className?.includes('b-sidebar-outer')) this.conditionExtraFilters = false
    },
    showExtraFilters () {
      document.querySelector('.b-sidebar-outer').classList.add('b-open-sidebar-right')
      document.body.style.overflow = 'hidden'
    },
    hideExtraFilters () {
      document.querySelector('.b-sidebar-outer').classList.remove('b-open-sidebar-right')
      document.body.style.overflow = 'initial'
    },
    toggleFilterCount (count) {
      count
        ? this.filterCount ? this.filterCount += 1 : this.filterCount = 1
        : this.filterCount ? this.filterCount -= 1 : this.filterCount = 0
    }
  }
};
</script>

<style lang="scss">
  .b-open-sidebar-right {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
  }

  .b-sidebar-right {
    position: absolute;
    top: 0;
    right: 0;
    height: 100vh;
    overflow-y: auto;
  }

  .extra-filters {
    max-width: 410px;
    padding: 40px 30px;
    background: #FFFFFF;

    .extra-filters__header {
      font-family: 'Inter', serif;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 19px;
      letter-spacing: 0.02em;
      text-transform: uppercase;
      color: #B3B3B3;
    }

    .extra-filters__icon-close {
      margin-top: -10px;
      margin-left: 34px;
    }

    .extra-filters__filter {
      padding-top: 16px;
      padding-bottom: 16px;
      border-bottom: 1px solid #EAECF1;

      .extra-filters__filter-name {
        font-family: 'Inter' ,serif  ;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        letter-spacing: 0.02em;
        color: #616161;
      }
    }
  }

</style>

<template lang="pug">
  b-sidebar(
    v-show="$store.state.filters.filterObj.gender" id="sidebar-extra-filters" v-model="conditionExtraFilters" sidebar-class="extra-filters"
    @change="isShowExtraFilters = !isShowExtraFilters" no-header-close right :shadow="true" body-class="extra-filters-body"
  )
    .extra-filters__wrap
      .df.oh.wsn
        h4.extra-filters__header.ttu.toe дополнительные параметры
        div.mr3px(@click="conditionExtraFilters = false")
          IconCloseModal.extra-filters__icon-close.cp

      InstallmentFilter(@is-installment="toggleFilterCount")
      SaleSizeFilter(@is-sale-size="toggleFilterCount" :reset="reset")
      ShopFilter(@is-shop="toggleFilterCount" :reset="reset")
      ColorFilter(@is-color="toggleFilterCount" :reset="reset")
      BrandCountryFilter(@is-brand-country="toggleFilterCount" :reset="reset")
      CountyManufactureFilter(@is-country-manufacture="toggleFilterCount" :reset="reset")
      SeasonFilter(@is-season="toggleFilterCount" :reset="reset")
      StyleFilter(@is-style="toggleFilterCount" :reset="reset")

    .df.g10.mr25px
      button.filter__dropdown-btn.filter__dropdown-btn-disagree.df.jcc.aic.mt12px.cp(
        v-if="filterCount" @click.stop="filterCount = 0; reset = true; resetFilter()"
      ) Сбросить
      button.filter__dropdown-btn.filter__dropdown-btn-agree.df.jcc.aic.mt12px.cp(@click.stop="hideExtraFilters; conditionExtraFilters = false") Готово

</template>

<script>
import { computed } from "vue";
import { mapActions } from "vuex";
import IconCloseModal from "@/components/ui/icons/IconCloseModal.vue";
import InstallmentFilter from "@/components/pages/main/header/header-filters/sidebar-filters/InstallmentFilter.vue";
import SaleSizeFilter from "@/components/pages/main/header/header-filters/sidebar-filters/SaleSizeFilter.vue";
import BrandFilter from "@/components/pages/main/header/header-filters/BrandFilter.vue";
import ShopFilter from "@/components/pages/main/header/header-filters/sidebar-filters/ShopFilter.vue";
import ColorFilter from "@/components/pages/main/header/header-filters/sidebar-filters/ColorFilter.vue";
import BrandCountryFilter from "@/components/pages/main/header/header-filters/sidebar-filters/BrandCountryFilter.vue";
import CountyManufactureFilter
  from "@/components/pages/main/header/header-filters/sidebar-filters/CountyManufactureFilter.vue";
import SeasonFilter from "@/components/pages/main/header/header-filters/sidebar-filters/SeasonFilter.vue";
import StyleFilter from "@/components/pages/main/header/header-filters/sidebar-filters/StyleFilter.vue";

export default {
  name: "ExtraFilterSidebar",
  components: { StyleFilter, SeasonFilter, CountyManufactureFilter, BrandCountryFilter, ColorFilter, ShopFilter, BrandFilter, SaleSizeFilter, InstallmentFilter, IconCloseModal },
  data: () => ({ isShowExtraFilters: false, conditionExtraFilters: null, filterCount: 0, reset: false }),
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
  provide () {
    return {
      reset: computed(() => this.reset)
    }
  },
  methods: {
    ...mapActions('selects', [ 'FETCH_SELECTS' ]),
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
    resetFilter () {
      setTimeout(() => this.reset = false, 0)
      this.$store.commit('filters/RESET_EXTRA_FILTERS')
      this.FETCH_SELECTS()
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
    width: 375px !important;
    padding: 40px 5px 40px 30px;
    background: #FFFFFF;

    .extra-filters__wrap {
      height: 94%;
      padding-right: 25px;
      overflow-y: auto;

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

    .extra-filters-body {
      height: calc(100vh - 73px);
    }
  }

</style>

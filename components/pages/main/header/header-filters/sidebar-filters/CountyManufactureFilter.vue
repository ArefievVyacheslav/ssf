<template lang="pug">
  .extra-filters__filter
    .df.jcsb.aic.cp(@click="isShowCountyManufactureFilter = !isShowCountyManufactureFilter")
      .df
        span.extra-filters__filter-name Страна производства
        IconTooltipInfo#tooltip-country-manufacture.ml6px.mt-1px
        b-tooltip(target="tooltip-country-manufacture" placement="right" delay="100")
          | Не у всех товаров указана страна производства <br> на странице в магазине. При выборе фильтра &nbsp;<br> некоторые товары подходящие под фильтр <br> могут быть скрыты.

      .df.aic
        span.extra-filters__filter-reset.mr25px(v-if="currentCountyManufacture.length > 0" @click.stop="currentCountyManufacture = []; resetFilter()") Сбросить
        IconArrowDownGreyMedium.mt-2px(
          :color="`${ isShowCountyManufactureFilter ? '#616161' : '#B3B3B3' }`" :class="{ 'menu-links__icon-arrow-down-active': isShowCountyManufactureFilter }"
        )

    .extra-filters__choices(v-if="isShowCountyManufactureFilter")
      .dropdown-choice-count.mt12px.mb10px Выбрано: {{ currentCountyManufacture.length }}
      .extra-filters__options-wrapper
        .filter__options-item.filter__options-item-subcategory.df.aic.cp(
          v-for="countyManufactureStr,idx in countyManufactureArr" :key="countyManufactureStr" @click="toggleCountyManufacture(countyManufactureStr)"
          :class="{ 'filter__options-item_active': currentCountyManufacture.includes(countyManufactureStr), 'mt12px mt7px': idx !== 0 }"
        )
          .df.aic.pl10px
            Checkbox(:is-checked="currentCountyManufacture.includes(countyManufactureStr)" styles="top: 3px; left: 3px;")
            span.gender__name.ml8px {{ countyManufactureStr.charAt(0).toUpperCase() + countyManufactureStr.slice(1) }}

      .dropdown-choice-count.mt12px.mb10px(v-if="currentCountyManufacture.length === countyManufactureArr.length") Чтобы увидеть другие страны производства нажмите «Сбросить»

</template>

<script>
import { mapActions, mapMutations } from "vuex";
import IconArrowDownGreyMedium from "@/components/ui/icons/arrows/IconArrowDownGreyMedium.vue";
import Checkbox from "@/components/ui/blocks/Checkbox.vue";
import IconSearchMenuLinks from "@/components/ui/icons/menu-links/IconSearchMenuLinks.vue";
import IconTooltipInfo from "@/components/ui/icons/IconTooltipInfo.vue";

export default {
  name: "CountyManufactureFilter",
  components: { IconTooltipInfo, IconSearchMenuLinks, Checkbox, IconArrowDownGreyMedium },
  props: [ 'reset' ],
  data: () => ({
    currentCountyManufacture: [],
    isShowCountyManufactureFilter: false,
    isChangeCountyManufacture: false,
    init: false
  }),
  computed: {
    countyManufactureArr () {
      return this.$store.state.selects?.selects?.country.concat().sort()
    }
  },
  watch: {
    currentCountyManufacture (nV) {
      if (nV.length) {
        this.setFilterParam()
        this.setFindParam()
        this.setUrlParam()
        this.isChangeCountyManufacture = true
      } else {
        this.unsetFilterParam()
        this.unsetFindParam()
        this.unsetUrlParam()
        this.isChangeCountyManufacture = false
      }
    },
    reset (nV) {
      if (nV) this.currentCountyManufacture = []
    },
    isChangeCountyManufacture (nV) {
      this.$emit('is-country-manufacture', nV ? 1 : 0)
    },
    '$store.state.filters.collection': {
      handler () {
        if (this.init) this.currentCountyManufacture = []
      }
    },
    '$store.state.filters.filterObj': {
      handler () {
        if (this.init) this.currentCountyManufacture = []
      },
      deep: true
    }
  },
  methods: {
    ...mapActions('selects', [ 'FETCH_SELECTS' ]),
    ...mapMutations('filters', [ 'SET_FILTER_PARAM', 'UNSET_FILTER_PARAM', 'SET_FIND_PARAM', 'UNSET_FIND_PARAM' ]),
    ...mapMutations('catalog', [ 'SET_URL_PARAM', 'UNSET_URL_PARAM' ]),
    setFilterParam () {
      this.SET_FILTER_PARAM({
        param: 'country',
        value: this.currentCountyManufacture
      })
    },
    unsetFilterParam () {
      this.UNSET_FILTER_PARAM({ param: 'country' })
    },
    setFindParam () {
      this.SET_FIND_PARAM({
        param: 'country',
        value: { $in: this.currentCountyManufacture }
      })
    },
    unsetFindParam () {
      this.UNSET_FIND_PARAM({ param: 'country' })
    },
    setUrlParam () {
      this.SET_URL_PARAM({
        param: 'k-country',
        value: this.currentCountyManufacture.reduce((acc, countyManufactureStr, idx) => {
          if (idx !== this.currentCountyManufacture.length - 1) acc += countyManufactureStr.toLowerCase() + '--'
          else acc += countyManufactureStr.toLowerCase()
          return acc
        }, '')
      })
    },
    unsetUrlParam () {
      this.UNSET_URL_PARAM({ param: 'k-country' })
    },
    resetFilter () {
      this.unsetFilterParam()
      this.unsetFindParam()
      this.unsetUrlParam()
      this.FETCH_SELECTS()
    },
    getColor () {
      const countyManufactureArr = []
      setTimeout(() => {
        this.$store.state.selects?.selects?.country.forEach(countyManufactureStr => {
          if (this.$route.path.includes(countyManufactureStr.toLowerCase())) {
            countyManufactureArr.push(countyManufactureStr)
          }
        })
        if (!countyManufactureArr.length) countyManufactureArr.push(...this.currentCountyManufacture)
        else {
          this.currentCountyManufacture = countyManufactureArr
          this.isChangeCountyManufacture = true
        }
        if (this.currentCountyManufacture.length) this.SET_FIND_PARAM({ param: 'country', value: { $in: this.currentCountyManufacture } })
      }, 1000)
    },
    toggleCountyManufacture (countyManufactureStr) {
      this.currentCountyManufacture.includes(countyManufactureStr)
        ? this.currentCountyManufacture.splice(this.currentCountyManufacture.indexOf(countyManufactureStr), 1)
        : this.currentCountyManufacture.push(countyManufactureStr)
    }
  },
  created () {
    this.getColor()
  },
  mounted () {
    setTimeout(() => this.init = true, 1000)
  }
};
</script>

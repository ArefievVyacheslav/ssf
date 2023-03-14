<template lang="pug">
  .extra-filters__filter
    .df.jcsb.aic.cp(@click="isShowBrandCountryFilter = !isShowBrandCountryFilter")
      .df
        span.extra-filters__filter-name Страна бренда

      .df.aic
        span.extra-filters__filter-reset.mr25px(v-if="currentBrandCountry.length > 0" @click.stop="currentBrandCountry = []; resetFilter()") Сбросить
        IconArrowDownGreyMedium.mt-2px(
          :color="`${ isShowBrandCountryFilter ? '#616161' : '#B3B3B3' }`" :class="{ 'menu-links__icon-arrow-down-active': isShowBrandCountryFilter }"
        )

    .extra-filters__choices(v-if="isShowBrandCountryFilter")
      .dropdown-choice-count.mt12px.mb10px Выбрано: {{ currentBrandCountry.length }}
      .extra-filters__options-wrapper
        .filter__options-item.filter__options-item-subCategory.df.aic.cp(
          v-for="brandCountryStr,idx in brandCountryArr" :key="brandCountryStr" @click="toggleBrandCountry(brandCountryStr)"
          :class="{ 'filter__options-item_active': currentBrandCountry.includes(brandCountryStr), 'mt12px mt7px': idx !== 0 }"
        )
          .df.aic.pl10px
            Checkbox(:is-checked="currentBrandCountry.includes(brandCountryStr)" styles="top: 3px; left: 3px;")
            span.gender__name.ml8px {{ brandCountryStr.charAt(0).toUpperCase() + brandCountryStr.slice(1) }}

      .dropdown-choice-count.mt12px.mb10px(v-if="currentBrandCountry.length === brandCountryArr.length") Чтобы увидеть другие страны брендов нажмите «Сбросить»

</template>

<script>
import { mapActions, mapMutations } from "vuex";
import IconArrowDownGreyMedium from "@/components/ui/icons/arrows/IconArrowDownGreyMedium.vue";
import Checkbox from "@/components/ui/blocks/Checkbox.vue";
import IconSearchMenuLinks from "@/components/ui/icons/menu-links/IconSearchMenuLinks.vue";
import IconTooltipInfo from "@/components/ui/icons/IconTooltipInfo.vue";

export default {
  name: "BrandCountryFilter",
  components: { IconTooltipInfo, IconSearchMenuLinks, Checkbox, IconArrowDownGreyMedium },
  props: [ 'reset' ],
  data: () => ({
    currentBrandCountry: [],
    isShowBrandCountryFilter: false,
    isChangeBrandCountry: false,
    init: false
  }),
  computed: {
    brandCountryArr () {
      return this.$store.state.selects?.selects?.brandCountry.concat().sort()
    },
    currentBrandCountryForWatcher () {
      return [ ...this.currentBrandCountry ]
    }
  },
  watch: {
    currentBrandCountryForWatcher (nV, oV) {
      if (this.init && JSON.stringify(nV) !== JSON.stringify(oV)) this.fetchEntriesDebounced()
    },
    currentBrandCountry (nV) {
      if (nV.length) {
        this.setFilterParam()
        this.setFindParam()
        this.setUrlParam()
        this.isChangeBrandCountry = true
      } else {
        this.unsetFilterParam()
        this.unsetFindParam()
        this.unsetUrlParam()
        this.isChangeBrandCountry = false
      }
    },
    reset (nV) {
      if (nV) this.currentBrandCountry = []
    },
    isChangeBrandCountry (nV) {
      this.$emit('is-brand-country', nV ? 1 : 0)
    },
    '$store.state.filters.collection': {
      handler () {
        if (this.init) this.currentBrandCountry = []
      }
    },
    '$store.state.filters.filterObj': {
      handler () {
        if (this.init) this.currentBrandCountry = []
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
        param: 'brandCountry',
        value: this.currentBrandCountry
      })
    },
    unsetFilterParam () {
      this.UNSET_FILTER_PARAM({ param: 'brandCountry' })
    },
    setFindParam () {
      this.SET_FIND_PARAM({
        param: 'brandCountry',
        value: { $in: this.currentBrandCountry }
      })
    },
    unsetFindParam () {
      this.UNSET_FIND_PARAM({ param: 'brandCountry' })
    },
    setUrlParam () {
      this.SET_URL_PARAM({
        param: 'j-brandCountry',
        value: this.currentBrandCountry.reduce((acc, brandCountryStr, idx) => {
          if (idx !== this.currentBrandCountry.length - 1) acc += brandCountryStr.toLowerCase() + '--'
          else acc += brandCountryStr.toLowerCase()
          return acc
        }, 'brand-country-')
      })
    },
    unsetUrlParam () {
      this.UNSET_URL_PARAM({ param: 'j-brandCountry' })
    },
    resetFilter () {
      this.unsetFilterParam()
      this.unsetFindParam()
      this.unsetUrlParam()
      this.FETCH_SELECTS()
    },
    getBrandCountry () {
      const brandCountryArr = []
      setTimeout(() => {
        this.$store.state.selects?.selects?.brandCountry.forEach(brandCountryStr => {
          if (this.$route.path.includes(brandCountryStr.toLowerCase())) {
            brandCountryArr.push(brandCountryStr)
          }
        })
        if (!brandCountryArr.length) brandCountryArr.push(...this.currentBrandCountry)
        else {
          this.currentBrandCountry = brandCountryArr
          this.isChangeBrandCountry = true
        }
        if (this.currentBrandCountry.length) this.SET_FIND_PARAM({ param: 'brandCountry', value: { $in: this.currentBrandCountry } })
      }, 1000)
    },
    toggleBrandCountry (brandCountryStr) {
      this.currentBrandCountry.includes(brandCountryStr)
        ? this.currentBrandCountry.splice(this.currentBrandCountry.indexOf(brandCountryStr), 1)
        : this.currentBrandCountry.push(brandCountryStr)
    },
    fetchEntriesDebounced () {
      clearTimeout(this._timerId)
      this._timerId = setTimeout(this.FETCH_SELECTS, 1000)
    }
  },
  created () {
    this.getBrandCountry()
  },
  mounted () {
    setTimeout(() => this.init = true, 1000)
  }
};
</script>

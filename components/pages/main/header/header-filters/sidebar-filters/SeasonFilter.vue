<template lang="pug">
  .extra-filters__filter
    .df.jcsb.aic.cp(@click="isShowSeasonFilter = !isShowSeasonFilter")
      .df
        span.extra-filters__filter-name Сезон
        IconTooltipInfo#tooltip-season-filter.ml6px.mt-1px
        b-tooltip(target="tooltip-season-filter" placement="right" delay="100")
          | Не у всех товаров указан сезон <br> на странице в магазине. При выборе фильтра <br> некоторые товары подходящие под фильтр <br> могут быть скрыты.

      .df.aic
        span.extra-filters__filter-reset.mr25px(v-if="currentSeason.length > 0" @click.stop="currentSeason = []; resetFilter()") Сбросить
        IconArrowDownGreyMedium.mt-2px(
          :color="`${ isShowSeasonFilter ? '#616161' : '#B3B3B3' }`" :class="{ 'menu-links__icon-arrow-down-active': isShowSeasonFilter }"
        )

    .extra-filters__choices(v-if="isShowSeasonFilter")
      .dropdown-choice-count.mt12px.mb10px Выбрано: {{ currentSeason.length }}
      .extra-filters__options-wrapper
        .filter__options-item.filter__options-item-subcategory.df.aic.cp(
          v-for="seasonStr,idx in seasonArr" :key="seasonStr" @click="toggleSeason(seasonStr)"
          :class="{ 'filter__options-item_active': currentSeason.includes(seasonStr), 'mt12px mt7px': idx !== 0 }"
        )
          .df.aic.pl10px
            Checkbox(:is-checked="currentSeason.includes(seasonStr)" styles="top: 3px; left: 3px;")
            span.gender__name.ml8px {{ seasonStr.charAt(0).toUpperCase() + seasonStr.slice(1) }}

      .dropdown-choice-count.mt12px.mb10px(v-if="currentSeason.length === seasonArr.length") Чтобы увидеть другие варианты сезона нажмите «Сбросить»

</template>

<script>
import { mapActions, mapMutations } from "vuex";
import IconArrowDownGreyMedium from "@/components/ui/icons/arrows/IconArrowDownGreyMedium.vue";
import Checkbox from "@/components/ui/blocks/Checkbox.vue";
import IconSearchMenuLinks from "@/components/ui/icons/menu-links/IconSearchMenuLinks.vue";
import IconTooltipInfo from "@/components/ui/icons/IconTooltipInfo.vue";

export default {
  name: "SeasonFilter",
  components: { IconTooltipInfo, IconSearchMenuLinks, Checkbox, IconArrowDownGreyMedium },
  props: [ 'reset' ],
  data: () => ({
    currentSeason: [],
    isShowSeasonFilter: false,
    isChangeSeason: false,
    init: false
  }),
  computed: {
    seasonArr () {
      return this.$store.state.selects?.selects?.season.concat().sort()
    }
  },
  watch: {
    currentSeason (nV) {
      if (nV.length) {
        this.setFilterParam()
        this.setFindParam()
        this.setUrlParam()
        this.isChangeSeason = true
      } else {
        this.unsetFilterParam()
        this.unsetFindParam()
        this.unsetUrlParam()
        this.isChangeSeason = false
      }
    },
    reset (nV) {
      if (nV) this.currentSeason = []
    },
    isChangeSeason (nV) {
      this.$emit('is-season', nV ? 1 : 0)
    },
    '$store.state.filters.collection': {
      handler () {
        if (this.init) this.currentSeason = []
      }
    },
    '$store.state.filters.filterObj': {
      handler () {
        if (this.init) this.currentSeason = []
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
        param: 'season',
        value: this.currentSeason
      })
    },
    unsetFilterParam () {
      this.UNSET_FILTER_PARAM({ param: 'season' })
    },
    setFindParam () {
      this.SET_FIND_PARAM({
        param: 'season',
        value: { $in: this.currentSeason }
      })
    },
    unsetFindParam () {
      this.UNSET_FIND_PARAM({ param: 'season' })
    },
    setUrlParam () {
      this.SET_URL_PARAM({
        param: 'l-season',
        value: this.currentSeason.reduce((acc, seasonStr, idx) => {
          if (idx !== this.currentSeason.length - 1) acc += seasonStr.toLowerCase() + '--'
          else acc += seasonStr.toLowerCase()
          return acc
        }, '')
      })
    },
    unsetUrlParam () {
      this.UNSET_URL_PARAM({ param: 'l-season' })
    },
    resetFilter () {
      this.unsetFilterParam()
      this.unsetFindParam()
      this.unsetUrlParam()
      this.FETCH_SELECTS()
    },
    getSeason () {
      const seasonArr = []
      setTimeout(() => {
        this.$store.state.selects?.selects?.season.forEach(seasonStr => {
          if (this.$route.path.includes(seasonStr.toLowerCase())) {
            seasonArr.push(seasonStr)
          }
        })
        if (!seasonArr.length) seasonArr.push(...this.currentSeason)
        else {
          this.currentSeason = seasonArr
          this.isChangeSeason = true
        }
        if (this.currentSeason.length) this.SET_FIND_PARAM({ param: 'season', value: { $in: this.currentSeason } })
      }, 1000)
    },
    toggleSeason (seasonStr) {
      this.currentSeason.includes(seasonStr)
        ? this.currentSeason.splice(this.currentSeason.indexOf(seasonStr), 1)
        : this.currentSeason.push(seasonStr)
    }
  },
  created () {
    this.getSeason()
  },
  mounted () {
    setTimeout(() => this.init = true, 1000)
  }
};
</script>

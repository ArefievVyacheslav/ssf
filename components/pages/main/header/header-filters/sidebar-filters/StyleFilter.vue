<template lang="pug">
  .extra-filters__filter
    .df.jcsb.aic.cp(@click="isShowStyleFilter = !isShowStyleFilter")
      .df
        span.extra-filters__filter-name Стиль
        IconTooltipInfo#tooltip-style-filter.ml6px.mt-1px
        b-tooltip(target="tooltip-style-filter" placement="right" delay="100")
          | Не у всех товаров указан стиль <br> на странице в магазине. При выборе фильтра <br> некоторые товары подходящие под фильтр <br> могут быть скрыты.

      .df.aic
        span.extra-filters__filter-reset.mr25px(v-if="currentStyle.length > 0" @click.stop="currentStyle = []; resetFilter()") Сбросить
        IconArrowDownGreyMedium.mt-2px(
          :color="`${ isShowStyleFilter ? '#616161' : '#B3B3B3' }`" :class="{ 'menu-links__icon-arrow-down-active': isShowStyleFilter }"
        )

    .extra-filters__choices(v-if="isShowStyleFilter")
      .dropdown-choice-count.mt12px.mb10px Выбрано: {{ currentStyle.length }}
      .extra-filters__options-wrapper
        .filter__options-item.filter__options-item-subcategory.df.aic.cp(
          v-for="styleStr,idx in styleArr" :key="styleStr" @click="toggleStyle(styleStr)"
          :class="{ 'filter__options-item_active': currentStyle.includes(styleStr), 'mt12px mt7px': idx !== 0 }"
        )
          .df.aic.pl10px
            Checkbox(:is-checked="currentStyle.includes(styleStr)" styles="top: 3px; left: 3px;")
            span.gender__name.ml8px {{ styleStr.charAt(0).toUpperCase() + styleStr.slice(1) }}

      .dropdown-choice-count.mt12px.mb10px(v-if="currentStyle.length === styleArr.length") Чтобы увидеть другие варианты стиля нажмите «Сбросить»

</template>

<script>
import { mapActions, mapMutations } from "vuex";
import IconArrowDownGreyMedium from "@/components/ui/icons/arrows/IconArrowDownGreyMedium.vue";
import Checkbox from "@/components/ui/blocks/Checkbox.vue";
import IconSearchMenuLinks from "@/components/ui/icons/menu-links/IconSearchMenuLinks.vue";
import IconTooltipInfo from "@/components/ui/icons/IconTooltipInfo.vue";

export default {
  name: "StyleFilter",
  components: { IconTooltipInfo, IconSearchMenuLinks, Checkbox, IconArrowDownGreyMedium },
  props: [ 'reset' ],
  data: () => ({
    currentStyle: [],
    isShowStyleFilter: false,
    isChangeStyle: false,
    init: false
  }),
  computed: {
    styleArr () {
      return this.$store.state.selects?.selects?.style.concat().sort()
    }
  },
  watch: {
    currentStyle (nV) {
      if (nV.length) {
        this.setFilterParam()
        this.setFindParam()
        this.setUrlParam()
        this.isChangeStyle = true
      } else {
        this.unsetFilterParam()
        this.unsetFindParam()
        this.unsetUrlParam()
        this.isChangeStyle = false
      }
    },
    reset (nV) {
      if (nV) this.currentStyle = []
    },
    isChangeStyle (nV) {
      this.$emit('is-style', nV ? 1 : 0)
    },
    '$store.state.filters.collection': {
      handler () {
        if (this.init) this.currentStyle = []
      }
    },
    '$store.state.filters.filterObj': {
      handler () {
        if (this.init) this.currentStyle = []
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
        param: 'style',
        value: this.currentStyle
      })
    },
    unsetFilterParam () {
      this.UNSET_FILTER_PARAM({ param: 'style' })
    },
    setFindParam () {
      this.SET_FIND_PARAM({
        param: 'style',
        value: { $in: this.currentStyle }
      })
    },
    unsetFindParam () {
      this.UNSET_FIND_PARAM({ param: 'style' })
    },
    setUrlParam () {
      this.SET_URL_PARAM({
        param: 'm-style',
        value: this.currentStyle.reduce((acc, styleStr, idx) => {
          if (idx !== this.currentStyle.length - 1) acc += styleStr.toLowerCase() + '--'
          else acc += styleStr.toLowerCase()
          return acc
        }, '')
      })
    },
    unsetUrlParam () {
      this.UNSET_URL_PARAM({ param: 'm-style' })
    },
    resetFilter () {
      this.unsetFilterParam()
      this.unsetFindParam()
      this.unsetUrlParam()
      this.FETCH_SELECTS()
    },
    getStyle () {
      const styleArr = []
      setTimeout(() => {
        this.$store.state.selects?.selects?.style.forEach(styleStr => {
          if (this.$route.path.includes(styleStr.toLowerCase())) {
            styleArr.push(styleStr)
          }
        })
        if (!styleArr.length) styleArr.push(...this.currentStyle)
        else {
          this.currentStyle = styleArr
          this.isChangeStyle = true
        }
        if (this.currentStyle.length) this.SET_FIND_PARAM({ param: 'style', value: { $in: this.currentStyle } })
      }, 1000)
    },
    toggleStyle (styleStr) {
      this.currentStyle.includes(styleStr)
        ? this.currentStyle.splice(this.currentStyle.indexOf(styleStr), 1)
        : this.currentStyle.push(styleStr)
    }
  },
  created () {
    this.getStyle()
  },
  mounted () {
    setTimeout(() => this.init = true, 1000)
  }
};
</script>

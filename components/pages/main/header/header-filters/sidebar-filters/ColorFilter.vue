<template lang="pug">
  .extra-filters__filter
    .df.jcsb.aic.cp(@click="isShowColorFilter = !isShowColorFilter")
      .df
        span.extra-filters__filter-name Цвет
        IconTooltipInfo#tooltip-dropdown-language.ml6px.mt-1px
        b-tooltip(target="tooltip-dropdown-language" placement="right" delay="100")
          | Не у всех товаров указан цвет на сайте магазина. <br> При выборе фильтра некоторые товары этих цветов <br> могут быть скрыты.

      .df.aic
        span.extra-filters__filter-reset.mr25px(v-if="currentColor.length > 0" @click.stop="currentColor = []; resetFilter()") Сбросить
        IconArrowDownGreyMedium.mt-2px(
          :color="`${ isShowColorFilter ? '#616161' : '#B3B3B3' }`" :class="{ 'menu-links__icon-arrow-down-active': isShowColorFilter }"
        )

    .extra-filters__choices(v-if="isShowColorFilter")
      .dropdown-choice-count.mt12px.mb10px Выбрано: {{ currentColor.length }}
      .extra-filters__options-wrapper
        .filter__options-item.filter__options-item-subCategory.df.aic.cp(
          v-for="colorStr,idx in colorArr" :key="colorStr" @click="toggleColor(colorStr)"
          :class="{ 'filter__options-item_active': currentColor.includes(colorStr), 'mt12px mt7px': idx !== 0 }"
        )
          .df.aic.pl10px
            Checkbox(:is-checked="currentColor.includes(colorStr)" styles="top: 3px; left: 3px;")
            span.gender__name.ml8px {{ colorStr.charAt(0).toUpperCase() + colorStr.slice(1) }}

      .dropdown-choice-count.mt12px.mb10px(v-if="currentColor.length === colorArr.length") Чтобы увидеть другие варианты цвета нажмите «Сбросить»

</template>

<script>
import { mapActions, mapMutations } from "vuex";
import IconArrowDownGreyMedium from "@/components/ui/icons/arrows/IconArrowDownGreyMedium.vue";
import Checkbox from "@/components/ui/blocks/Checkbox.vue";
import IconSearchMenuLinks from "@/components/ui/icons/menu-links/IconSearchMenuLinks.vue";
import IconTooltipInfo from "@/components/ui/icons/IconTooltipInfo.vue";

export default {
  name: "ColorFilter",
  components: { IconTooltipInfo, IconSearchMenuLinks, Checkbox, IconArrowDownGreyMedium },
  props: [ 'reset' ],
  data: () => ({
    currentColor: [],
    isShowColorFilter: false,
    isChangeColor: false,
    init: false
  }),
  computed: {
    colorArr () {
      return this.$store.state.selects?.selects?.color.concat().sort()
    },
    currentColorForWatcher () {
      return [ ...this.currentColor ]
    }
  },
  watch: {
    currentColorForWatcher (nV, oV) {
      if (this.init && JSON.stringify(nV) !== JSON.stringify(oV)) this.fetchEntriesDebounced()
    },
    currentColor (nV) {
      if (nV.length) {
        this.setFilterParam()
        this.setFindParam()
        this.setUrlParam()
        this.isChangeColor = true
      } else {
        this.unsetFilterParam()
        this.unsetFindParam()
        this.unsetUrlParam()
        this.isChangeColor = false
      }
    },
    reset (nV) {
      if (nV) this.currentColor = []
    },
    isChangeColor (nV) {
      this.$emit('is-color', nV ? 1 : 0)
    },
    '$store.state.filters.collection': {
      handler () {
        if (this.init) this.currentColor = []
      }
    },
    '$store.state.filters.filterObj': {
      handler () {
        if (this.init) this.currentColor = []
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
        param: 'color',
        value: this.currentColor
      })
    },
    unsetFilterParam () {
      this.UNSET_FILTER_PARAM({ param: 'color' })
    },
    setFindParam () {
      this.SET_FIND_PARAM({
        param: 'color',
        value: { $in: this.currentColor }
      })
    },
    unsetFindParam () {
      this.UNSET_FIND_PARAM({ param: 'color' })
    },
    setUrlParam () {
      this.SET_URL_PARAM({
        param: 'i-color',
        value: this.currentColor.reduce((acc, colorStr, idx) => {
          if (idx !== this.currentColor.length - 1) acc += colorStr.toLowerCase() + '--'
          else acc += colorStr.toLowerCase()
          return acc
        }, '')
      })
    },
    unsetUrlParam () {
      this.UNSET_URL_PARAM({ param: 'i-color' })
    },
    resetFilter () {
      this.unsetFilterParam()
      this.unsetFindParam()
      this.unsetUrlParam()
      this.FETCH_SELECTS()
    },
    getColor () {
      const colorArr = []
      setTimeout(() => {
        this.$store.state.selects?.selects?.color.forEach(colorStr => {
          if (this.$route.path.includes(colorStr)) {
            colorArr.push(colorStr)
          }
        })
        if (!colorArr.length) colorArr.push(...this.currentColor)
        else {
          this.currentColor = colorArr
          this.isChangeColor = true
        }
        if (this.currentColor.length) this.SET_FIND_PARAM({ param: 'color', value: { $in: this.currentColor } })
      }, 1000)
    },
    toggleColor (colorStr) {
      this.currentColor.includes(colorStr)
        ? this.currentColor.splice(this.currentColor.indexOf(colorStr), 1)
        : this.currentColor.push(colorStr)
    },
    fetchEntriesDebounced () {
      clearTimeout(this._timerId)
      this._timerId = setTimeout(this.FETCH_SELECTS, 1000)
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

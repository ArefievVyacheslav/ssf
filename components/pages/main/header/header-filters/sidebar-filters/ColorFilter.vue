<template lang="pug">
  .extra-filters__filter
    .df.jcsb.aic.cp(@click="isShowColorFilter = !isShowColorFilter")
      .df
        span.extra-filters__filter-name Цвет
        IconTooltip#tooltip-dropdown-language.ml6px
        b-tooltip(target="tooltip-dropdown-language" placement="right" delay="100")
          | Не у всех товаров указан цвет на сайте магазина. <br> При выборе фильтра некоторые товары этого цвета <br> будут скрыты.

      .df.aic
        span.extra-filters__filter-reset.mr25px(v-if="currentColor.length > 0" @click.stop="currentColor = []; resetFilter()") Сбросить
        IconArrowDownGreyMedium.mt-2px(
          :color="`${ isShowColorFilter ? '#616161' : '#B3B3B3' }`" :class="{ 'menu-links__icon-arrow-down-active': isShowColorFilter }"
        )

    .extra-filters__choices(v-if="isShowColorFilter")
      .dropdown-choice-count.mt12px.mb10px Выбрано: {{ currentColor.length }}
      .extra-filters__options-wrapper
        .filter__options-item.filter__options-item-subcategory.df.aic.cp(
          v-for="colorStr,idx in colorArr" :key="colorStr" @click="toggleColor(colorStr)"
          :class="{ 'filter__options-item_active': currentColor.includes(colorStr), 'mt12px mt7px': idx !== 0 }"
        )
          .df.aic.pl10px
            Checkbox(:is-checked="currentColor.includes(colorStr)" styles="top: 3px; left: 3px;")
            span.gender__name.ml8px {{ colorStr.charAt(0).toUpperCase() + colorStr.slice(1) }}

      .dropdown-choice-count.mt12px.mb10px(v-if="currentColor.length === colorArr.length") Чтобы увидеть другие магазины нажмите «Сбросить»

</template>

<script>
import { mapActions, mapMutations } from "vuex";
import IconArrowDownGreyMedium from "@/components/ui/icons/arrows/IconArrowDownGreyMedium.vue";
import Checkbox from "@/components/ui/blocks/Checkbox.vue";
import IconSearchMenuLinks from "@/components/ui/icons/menu-links/IconSearchMenuLinks.vue";
import IconTooltip from "@/components/ui/icons/IconTooltip.vue";

export default {
  name: "ColorFilter",
  components: { IconTooltip, IconSearchMenuLinks, Checkbox, IconArrowDownGreyMedium },
  data: () => ({
    currentColor: [],
    isShowColorFilter: false,
    init: false
  }),
  computed: {
    colorArr () {
      return this.$store.state.selects?.selects?.color.concat().sort()
    }
  },
  watch: {
    currentColor (nV) {
      this.$emit('is-color', nV.length ? 1 : 0)
      if (nV.length) {
        this.setFilterParam()
        this.setFindParam()
        this.setUrlParam()
      } else {
        this.unsetFilterParam()
        this.unsetFindParam()
        this.unsetUrlParam()
      }
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
        param: '8color',
        value: this.currentColor.reduce((acc, colorStr, idx) => {
          if (idx !== this.currentColor.length - 1) acc += colorStr.toLowerCase() + '--'
          else acc += colorStr.toLowerCase()
          return acc
        }, '')
      })
    },
    unsetUrlParam () {
      this.UNSET_URL_PARAM({ param: '8color' })
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
        else this.currentColor = colorArr
        if (this.currentColor.length) this.SET_FIND_PARAM({ param: 'color', value: { $in: this.currentColor } })
      }, 1000)
    },
    toggleColor (colorStr) {
      this.currentColor.includes(colorStr)
        ? this.currentColor.splice(this.currentColor.indexOf(colorStr), 1)
        : this.currentColor.push(colorStr)
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

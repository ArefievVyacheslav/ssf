<template lang="pug">
  .extra-filters__filter
    .df.jcsb.aic.cp(@click="isShowShopFilter = !isShowShopFilter")
      span.extra-filters__filter-name Магазин
      .df.aic
        span.extra-filters__filter-reset.mr25px(v-if="currentShop.length > 0" @click.stop="currentShop = []; resetFilter()") Сбросить
        IconArrowDownGreyMedium.mt-2px(
          :color="`${ isShowShopFilter ? '#616161' : '#B3B3B3' }`" :class="{ 'menu-links__icon-arrow-down-active': isShowShopFilter }"
        )

    .extra-filters__choices(v-if="isShowShopFilter")
      .dropdown-choice-count.mt12px.mb10px Выбрано: {{ currentShop.length }}
      .extra-filters__options-wrapper
        .filter__options-item.filter__options-item-subcategory.df.aic.cp(
          v-for="shopStr,idx in shopArr" :key="shopStr" @click="toggleShop(shopStr)"
          :class="{ 'filter__options-item_active': currentShop.includes(shopStr), 'mt12px mt7px': idx !== 0 }"
        )
          .df.aic.pl10px
            Checkbox(:is-checked="currentShop.includes(shopStr)" styles="top: 3px; left: 3px;")
            span.gender__name.ml8px {{ shopStr.charAt(0).toUpperCase() + shopStr.slice(1) }}

      .dropdown-choice-count.mt12px.mb10px(v-if="currentShop.length === shopArr.length") Чтобы увидеть другие магазины нажмите «Сбросить»

</template>

<script>
import { mapActions, mapMutations } from "vuex";
import IconArrowDownGreyMedium from "@/components/ui/icons/arrows/IconArrowDownGreyMedium.vue";
import Checkbox from "@/components/ui/blocks/Checkbox.vue";
import IconSearchMenuLinks from "@/components/ui/icons/menu-links/IconSearchMenuLinks.vue";

export default {
  name: "ShopFilter",
  components: { IconSearchMenuLinks, Checkbox, IconArrowDownGreyMedium },
  data: () => ({
    currentShop: [],
    isShowShopFilter: false,
    init: false
  }),
  computed: {
    shopArr () {
      return this.$store.state.selects?.selects?.shop.concat().sort()
    }
  },
  watch: {
    currentShop (nV) {
      this.$emit('is-shop', nV.length ? 1 : 0)
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
        if (this.init) this.currentShop = []
      }
    },
    '$store.state.filters.filterObj': {
      handler () {
        if (this.init) this.currentShop = []
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
        param: 'shop',
        value: this.currentShop
      })
    },
    unsetFilterParam () {
      this.UNSET_FILTER_PARAM({ param: 'shop' })
    },
    setFindParam () {
      this.SET_FIND_PARAM({
        param: 'shop',
        value: { $in: this.currentShop }
      })
    },
    unsetFindParam () {
      this.UNSET_FIND_PARAM({ param: 'shop' })
    },
    setUrlParam () {
      this.SET_URL_PARAM({
        param: '8shop',
        value: this.currentShop.reduce((acc, shopStr, idx) => {
          if (idx !== this.currentShop.length - 1) acc += shopStr.toLowerCase() + '--'
          else acc += shopStr.toLowerCase()
          return acc
        }, '')
      })
    },
    unsetUrlParam () {
      this.UNSET_URL_PARAM({ param: '8shop' })
    },
    resetFilter () {
      this.unsetFilterParam()
      this.unsetFindParam()
      this.unsetUrlParam()
      this.FETCH_SELECTS()
    },
    getShop () {
      const shopArr = []
      setTimeout(() => {
        this.$store.state.selects?.selects?.shop.forEach(shopStr => {
          if (this.$route.path.includes(shopStr)) {
            shopArr.push(shopStr)
          }
        })
        if (!shopArr.length) shopArr.push(...this.currentShop)
        else this.currentShop = shopArr
        this.SET_FIND_PARAM({ param: 'shop', value: { $in: this.currentShop } })
      }, 1000)
    },
    toggleShop (shopStr) {
      this.currentShop.includes(shopStr)
        ? this.currentShop.splice(this.currentShop.indexOf(shopStr), 1)
        : this.currentShop.push(shopStr)
    }
  },
  created () {
    this.getShop()
  },
  mounted () {
    setTimeout(() => this.init = true, 1000)
  }
};
</script>

<style lang="scss">
  .extra-filters__filter {
    .extra-filters__filter-reset {
      font-family: 'Inter', serif;
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 15px;
      text-align: right;
      letter-spacing: 0.02em;
      color: #B3B3B3;
    }

    .extra-filters__choices {

      .menu-search_filter-shop {
        height: 21px !important;
        width: 300px;
        background: #F6F7F9;
      }

      .extra-filters__options-wrapper {
        max-height: 261px;
        padding-right: 8px;
        overflow-y: auto;

        .filter__options-item {
          height: 32px;
          font-family: 'Inter', serif;
          font-style: normal;
          font-weight: 500;
          font-size: 12px;
          line-height: 15px;
          letter-spacing: 0.02em;
          color: #616161;
        }

        .filter__options-item:hover {
          background: #F6F7F9;
          border-radius: 6px;
        }
        .filter__options-item:hover .checkbox {
          outline: 2px solid #2D78EA;
        }
        .filter__options-item:hover .gender__name {
          color: #2D78EA;
        }
        .filter__options-item_active:hover .checkbox {
          outline: 2px solid #6BA0F0;
          background: #6BA0F0;
        }
        .filter__options-item_active:hover .gender__name {
          color: #6BA0F0;
        }
      }
    }
  }
</style>

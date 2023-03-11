<template lang="pug">
  .filter__item.filter__item_price.pos-rel(@click="editMode = true" :class="{ 'cnd': disabled }")
    .filter__item-price.pos-abs(:class="{ 'grey': disabled }") Цена, ₽
    .filter__item-price-wrapper.pos-abs.df
      p.filter__item-start-price от
      input.filter__item-price-field(v-model="startPrice" :disabled="disabled" :class="{ 'cnd': disabled }")
      p.filter__item-end-price до
      input.filter__item-price-field(v-model="endPrice" :disabled="disabled" :class="{ 'cnd': disabled }")

</template>

<script>
import { mapActions, mapMutations } from "vuex";

export default {
  name: "PriceFilter",
  props: [ 'disabled' ],
  data: () => ({ startPrice: 0, endPrice: 0, editMode: false, init: false }),
  computed: {
    priceArr () {
      return [ this.startPrice, this.endPrice ]
    }
  },
  watch: {
    startPrice (nV) {
      if (this.init) {
        if (nV) {
          const priceArr = nV.toString().split('')
          if (priceArr[0] === '0') priceArr.splice(0, 1)
          this.startPrice = +priceArr.filter(symbol => !isNaN(symbol)).join('').substring(0, 6)
        } else this.startPrice = 1
      }
    },
    endPrice (nV) {
      if (this.init) {
        if (nV) {
          nV.toString()
          const priceArr = nV.toString().split('')
          if (priceArr[0] === '0') priceArr.splice(0, 1)
          this.endPrice = +priceArr.filter(symbol => !isNaN(symbol)).join('').substring(0, 6)
        }
      }
    },
    priceArr (nV) {
      if (this.$store.state.selects.selects.price[0] && this.$store.state.selects.selects.price[0] !== nV[0]
        || this.$store.state.selects.selects.price[1] && this.$store.state.selects.selects.price[1] !== nV[1]) this.fetchEntriesDebounced()
    },
    editMode (nV) {
      if (nV === true) setTimeout(() => {
        this.editMode = false
        this.$bvToast.toast("Если мало вариантов в фильтрах - измените диапазон цены.", {
          title: "BootstrapVue Toast",
          variant: "info",
          autoHideDelay: 10000
        });
      }, 15 * 1000)
    },
    '$store.state.selects.selects.price': {
      handler () {
        if (this.init && !this.editMode) setTimeout(() => [ this.startPrice, this.endPrice ] = this.$store.state.selects.selects.price, 1000)
      },
      deep: true
    }
  },
  methods: {
    ...mapActions('selects', [ 'FETCH_SELECTS' ]),
    ...mapMutations('filters', [ 'SET_FILTER_PARAM', 'UNSET_FILTER_PARAM', 'SET_FIND_PARAM', 'UNSET_FIND_PARAM' ]),
    ...mapMutations('catalog', [ 'SET_URL_PARAM', 'UNSET_URL_PARAM' ]),
    fetchEntriesDebounced () {
      clearTimeout(this._timerId)
      this._timerId = setTimeout(async () => {
        if (!this.endPrice && !this.editMode) this.endPrice = 999999
        if (this.startPrice && this.endPrice) {
          if (this.startPrice > this.endPrice) {
            this.endPrice = 999999
            this.$bvToast.toast("Максимальная цена меньше минимальной, мы установим максимальное значение.", {
              title: "BootstrapVue Toast",
              variant: "info",
              autoHideDelay: 5000
            });
          }
          if (!this.endPrice) this.endPrice = 999999
          await this.setPrice()
        }
        if (!this.startPrice && !this.endPrice) this.resetFilter()
      }, 5000)
    },
    setFilterParam () {
      this.SET_FILTER_PARAM({
        param: 'price',
        value: [ this.startPrice, this.endPrice ]
      })
    },
    unsetFilterParam () {
      this.UNSET_FILTER_PARAM({ param: 'price' })
    },
    setFindParam () {
      this.SET_FIND_PARAM({
        param: 'price',
        value: { $in: [ this.startPrice, this.endPrice ] }
      })
    },
    unsetFindParam () {
      this.UNSET_FIND_PARAM({ param: 'price' })
    },
    setUrlParam () {
      this.SET_URL_PARAM({
        param: 'e-price',
        value: `from-${ this.startPrice }-to-${ this.endPrice }`
      })
    },
    unsetUrlParam () {
      this.UNSET_URL_PARAM({ param: 'e-price' })
    },
    async setPrice () {
      this.setFilterParam()
      this.setFindParam()
      this.setUrlParam()
      await this.FETCH_SELECTS()
    },
    resetFilter () {
      this.unsetFilterParam()
      this.unsetFindParam()
      this.unsetUrlParam()
      this.FETCH_SELECTS()
    },
    getPrice () {
      const priceArr = []
      setTimeout(() => {
        const pathArr = this.$route.path.split('/')
        pathArr.forEach(pathStr => {
          if (pathStr.includes('from-') && pathStr.includes('-to-')) {
            priceArr.push(...pathStr.replace('from-', '').split('-to-'))
          }
        })
        if (priceArr.length) [ this.startPrice, this.endPrice ] = priceArr
        else [ this.startPrice, this.endPrice ] = this.$store.state.selects.selects.price
        this.SET_FILTER_PARAM({ param: 'price', value: [ this.startPrice, this.endPrice ] })
      }, 1000)
    }
  },
  created () {
    this.getPrice()
  },
  mounted () {
    setTimeout(() => this.init = true, 1000)
  }
};
</script>

<style lang="scss">
  .filter__item_price:after {
    display: none;
  }

  .filter__item_price {
    width: 195px;

    .filter__item-price {
      top: 13px;
      left: 16px;
      font-family: 'Inter', serif;
      font-style: normal;
      font-weight: 400;
      font-size: 10px;
      line-height: 12px;
      letter-spacing: 0.02em;
      color: #303030;
    }

    .filter__item-price-wrapper {
      top: 15px;

      .filter__item-start-price,
      .filter__item-end-price {
        font-family: 'Inter', serif;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        letter-spacing: 0.02em;
        color: #B3B3B3;
      }

      .filter__item-price-field {
        max-width: 67px;
        max-height: 15px;
        margin-top: 14px;
        margin-left: 6px;
        border: none;
        outline: none;
        font-family: 'Inter', serif;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        letter-spacing: 0.02em;
        color: #303030;
      }
      .filter__item-price-field:disabled {
        background-color: white;
      }
    }

    .grey,
    .filter__item-start-price {
      color: #B3B3B3;
    }
  }

</style>

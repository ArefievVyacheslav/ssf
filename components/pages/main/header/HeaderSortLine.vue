<template lang="pug">
  .sort-wrapper
    .container.df.jcsb
      .sort-line
        .df
          span.sort-line__text.sort-line__text_light-grey.mr16px Сортировать по:
          .sort-line__text.sort-line__text_dark-grey.cp(
            v-for="sortKey,idx in Object.keys(sort)" :key="sortKey" @click="setSortParam(sortKey)"
            :class="{ ml18px: idx !== 0, 'sort-line__text_active-grey': sortKey in currentSort }"
          ) {{ sort[ sortKey ][ 'name' ] }}
            IconSortArrow.sort-line__icon-arrow.ml6px(
              v-if="sortKey in currentSort"
              :class="{ 'sort-line__icon-arrow-down': isShowIconArrowDown }"
            )

      .show-line
        .df
          span.sort-line__text.sort-line__text_light-grey.mr16px Показывать по:
          .sort-line__text.sort-line__text_dark-grey.cp(
            v-for="showCount,idx in show" :key="showCount" @click="setShowCount(showCount)"
            :class="{ ml12px: idx !== 0, 'sort-line__text_active-grey': showCount === currentShow }"
          ) {{ showCount }}

</template>

<script>
import { mapActions, mapMutations } from "vuex";
import IconSortArrow from "@/components/ui/icons/IconSortArrow.vue";

export default {
  name: "HeaderSortLine",
  components: { IconSortArrow },
  data: () => ({
    sort: {
      price: { name: 'Цене', url: 'sort-price' },
      rating: { name: 'Рейтингу', url: '' },
      sale: { name: 'Скидке', url: 'sort-sale' },
      deliveryPrice: { name: 'Бесплатная доставка', url: 'sort-delivery' }
    },
    show: [ 60, 120, 240 ],
    currentSort: { rating: 1 },
    currentShow: 60
  }),
  computed: {
    isShowIconArrowDown () {
      if (Object.keys(this.currentSort)[0] === 'deliveryPrice') {
        return this.currentSort[ 'deliveryPrice' ] === -1
      } else {
        return Object.values(this.currentSort)[0] === 1
      }
    }
  },
  watch: {
    currentSort: {
      handler (nV) {
        this.SET_SORT_PARAM(nV)
      },
      deep: true
    },
    currentShow (nV) {
      this.SET_SHOW_PARAM(nV)
      this.SET_URL_PARAM({
        param: 'o-show',
        value: this.currentShow !== 60 ? `show-${this.currentShow}` : ''
      })
      setTimeout(this.FETCH_PRODUCTS, 500)
    }
  },
  methods: {
    ...mapActions('products', ['FETCH_PRODUCTS']),
    ...mapMutations('filters', ['SET_SORT_PARAM', 'SET_SHOW_PARAM']),
    ...mapMutations('catalog', [ 'SET_URL_PARAM', 'UNSET_URL_PARAM' ]),
    setSortParam (sortKey) {
      if (sortKey in this.currentSort) {
        this.currentSort = {}
        this.UNSET_URL_PARAM({ param: 'n-sort' })
      }
      else {
        this.currentSort = {}
        if (sortKey === 'deliveryPrice') {
          this.$set(this.currentSort, sortKey, -1)
          this.SET_URL_PARAM({
            param: 'n-sort',
            value: this.sort[ sortKey ][ 'url' ]
          })
        } else {
          this.$set(this.currentSort, sortKey, 1)
          this.SET_URL_PARAM({
            param: 'n-sort',
            value: this.sort[ sortKey ][ 'url' ]
          })
        }
        setTimeout(this.FETCH_PRODUCTS, 500)
      }
    },
    setShowCount (showCount) {
      this.currentShow = showCount
    },
    getSortParam () {
      Object.keys(this.sort).forEach(sortParamKey => {
        if (this.sort[ sortParamKey ][ 'url' ] !== '' && this.$route.path.includes(this.sort[ sortParamKey ][ 'url' ])) {
          this.currentSort = {}
          this.currentSort[ sortParamKey ] = 1;
        }
      })
    },
    getShowParam () {
      [ 120, 240 ].forEach(showCount => {
        if (this.$route.path.includes(`show-${showCount}`)) this.currentShow = showCount
      })
    }
  },
  created () {
    this.getSortParam()
    this.getShowParam()
  }
};
</script>

<style lang="scss">
  .sort-wrapper {
    background: #EAECF1;
    padding-bottom: 21px;

    .sort-line__text {
      font-family: 'Inter', serif;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      letter-spacing: 0.02em;

      .sort-line__icon-arrow-down {
        transform: rotateX(180deg);
        transition: .3s;
      }
    }

    .sort-line__text_light-grey {
      color: #7F7F7F;
    }

    .sort-line__text_dark-grey {
      color: #616161;
    }

    .sort-line__text_active-grey {
      color: #303030;
      font-weight: 500;
    }
  }

</style>

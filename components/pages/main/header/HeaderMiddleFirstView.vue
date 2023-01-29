<template lang="pug">
  .header-fv
    .container.df.fdc.jcc
      h1.header-fv__h1.m0.p0 Поиск скидок на бренды
      h2.header-fv__desc.p0 Вещи собраны из разделов скидок официальных магазинов
       //ПЕРЕНЕСТИ В ОТДЕЛЬНЫЙ КОМПОНЕНТ КАК БУДЕТ ГОТОВА ВЁРСТКА
      .tabs.m0auto
        .category-tab.cp(
          v-for="categoryKey,idx in Object.keys(categories)" :key="categoryKey"
          :class="{ 'category-tab-active': categoryKey === currentCategory }" @click="currentCategory = categoryKey"
        )
          span.category-tab__category(:class="{ 'category-tab__category-active': categoryKey === currentCategory }") {{ categoryKey }}

</template>

<script>
import { mapActions, mapMutations } from "vuex";

export default {
  name: "HeaderMiddleFirstView",
  data: () => ({
    categories: {
      'Одежда': 'clothes',
      'Обувь': 'shoes',
      'Аксессуары': 'accessories'
    },
    currentCategory: null
  }),
  watch: {
    async currentCategory (nV) {
      this.SET_COLLECTION(this.categories[this.currentCategory])
      this.SET_FILTER_PARAM({ param: 'category', value: nV })
      this.SET_URL_PARAM({ param: '1category', value: this.categories[this.currentCategory] })
      this.RESET_FILTERS()
      await this.FETCH_SELECTS()
    }
  },
  methods: {
    ...mapActions('selects', [ 'FETCH_SELECTS' ]),
    ...mapMutations('filters', ['SET_COLLECTION', 'SET_FILTER_PARAM', 'RESET_FILTERS']),
    ...mapMutations('catalog', ['SET_URL_PARAM']),
    getCategory () {
      const cats = this.categories
      Object.keys(cats).forEach(catKey => {
        if (this.$route.path.includes(cats[ catKey ])) this.SET_FILTER_PARAM({ param: 'category', value: catKey })
      })
      if (!this.$store.state.filters.filterObj.category) this.SET_FILTER_PARAM({ param: 'category', value: 'Одежда' })
      this.currentCategory = this.$store.state.filters.filterObj.category
    }
  },
  created () {
    this.getCategory()
  }
};
</script>

<style lang="scss">
  .header-fv {
    padding-top: 113px;
    background: #EAECF1;

    .header-fv__h1 {
      text-align: center;
      font-family: 'Inter', serif;
      font-style: normal;
      font-weight: 700;
      font-size: 32px;
      line-height: 39px;
      color: #000000;
    }

    .header-fv__desc {
      margin-top: 25px;
      font-family: 'Inter', serif;
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 22px;
      text-align: center;
      color: #6C6C6C;
    }

    .tabs {
      display: flex;
      align-items: flex-start;
      max-width: 384px;
      margin-top: 30px;
      padding: 4px;
      gap: 10px;
      background: #E8E8E8;
      border-radius: 10px;

      .category-tab {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 6px 29px;
        gap: 10px;
        border-radius: 6px;

        .category-tab__category {
          font-family: 'Inter', serif;
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 17px;
          letter-spacing: 0.02em;
          color: #666666;
        }

        .category-tab__category-active {
          color: #000000;
        }
      }

      .category-tab-active {
        background: #FFFFFF;
      }
    }
  }

  ::-webkit-scrollbar {
    width: 6px;               /* ширина scrollbar */
  }
  ::-webkit-scrollbar-track {
    background: transparent;        /* цвет дорожки */
  }
  ::-webkit-scrollbar-thumb {
    background-color: #F0F0F0;    /* цвет плашки */
    border-radius: 30px;       /* закругления плашки */
  }

</style>

<template lang="pug">
  .menu-links.df.jcsb.aic
    .container
      .df
        nuxt-link.menu-links__logo.tdn(to="/") Sales Search
        .menu-links__category-choice.ml32px.cp.pos-rel(@click="isShowCategoryList = !isShowCategoryList") {{ currentCategory }}
          IconArrowDownGreyMedium.menu-links__icon-arrow-down.pos-abs(:class="{ 'menu-links__icon-arrow-down-active': isShowCategoryList }")



</template>

<script>
import { mapMutations } from "vuex";
import IconArrowDownGreyMedium from "@/components/ui/icons/IconArrowDownGreyMedium.vue";

export default {
  name: "MenuLinks",
  components: { IconArrowDownGreyMedium },
  data: () => ({
    categories: {
      'Одежда': 'clothes',
      'Обувь': 'shoes',
      'Аксессуары': 'accessories'
    },
    currentCategory: null,
    isShowCategoryList: false
  }),
  watch: {
    currentCategory (nV) {
      this.SET_COLLECTION(this.categories[this.currentCategory])
      this.SET_FILTER_PARAM({ param: 'category', value: nV })
      this.SET_URL_PARAM({ param: '1category', value: this.categories[this.currentCategory] })
    }
  },
  methods: {
    ...mapMutations('filters', ['SET_COLLECTION', 'SET_FILTER_PARAM']),
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
  .menu-links {
    height: 36px;
    padding-top: 24px;
    padding-bottom: 26px;
    background: #EAECF1;

    .menu-links__logo {
      font-family: 'Inter', serif;
      font-style: normal;
      font-weight: 500;
      font-size: 24px;
      line-height: 29px;
      color: #212121;
    }

    .menu-links__category-choice {
      width: 134px;
      padding-top: 9px;
      padding-left: 12px;
      padding-bottom: 10px;
      background: #FFFFFF;
      border-radius: 6px;
      font-family: 'Inter', serif;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      letter-spacing: 0.02em;
      color: #303030;

      .menu-links__icon-arrow-down {
        top: 15px;
        right: 13px;
        transition: .3s;
      }

      .menu-links__icon-arrow-down-active {
        transform: rotateX(180deg);
        transition: .3s;
      }
    }
  }

  .ml32px {
    margin-left: 32px;
  }

  .tdn {
    text-decoration: none;
  }

</style>

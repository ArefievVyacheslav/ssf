<template lang="pug">
  .menu-links.df.jcsb.aic
    .container.df.jcsb
      .df
        nuxt-link.menu-links__logo.tdn(to="/") Sales Search
        .menu-links__category-choice.ml32px.cp.pos-rel(@click="isShowCategoryList = !isShowCategoryList") {{ currentCategory }}
          IconArrowDownGreyMedium.menu-links__icon-arrow-down.pos-abs(:active="isShowCategoryList" :class="{ 'menu-links__icon-arrow-down-active': isShowCategoryList }")
          .pos-abs.t37px.l0px(v-if="isShowCategoryList" @click.stop)
            DropDown(@close="isShowCategoryList = false" :styles="{ padding: '16px 20px 20px 20px', width: '130px' }")
              span.category-header.toe.wsn.oh Выбор типа товаров
              .category-item.cp(
                v-for="categoryKey,idx in Object.keys(categories)" :key="categoryKey" @click="currentCategory = categoryKey"
                :class="{ 'category-item-active': categoryKey === currentCategory, mt12px: idx === 0, mt3px: idx !== 0 }"
              )
                span.category-item__category(:class="{ 'category-item__category-active': categoryKey === currentCategory }") {{ categoryKey }}
                IconCheckMarkBlue.ml-auto(v-if="categoryKey === currentCategory")

      .df.pos-rel
        input.menu-search.mr25px
        IconSearchMenuLinks.pos-abs.t6px.l8px
        IconJournalMenuLinks.cp
        IconDreamboxMenuLinks.cp
        IconLkMenuLinks.cp
        IconAllMenuLinks.cp





</template>

<script>
import { mapMutations } from "vuex";
import IconArrowDownGreyMedium from "@/components/ui/icons/arrows/IconArrowDownGreyMedium.vue";
import DropDown from "@/components/ui/blocks/DropDown.vue";
import IconCheckMarkBlue from "@/components/ui/icons/IconCheckMarkBlue.vue";
import IconSearchMenuLinks from "@/components/ui/icons/menu-links/IconSearchMenuLinks.vue";
import IconJournalMenuLinks from "@/components/ui/icons/menu-links/IconJournalMenuLinks.vue";
import IconDreamboxMenuLinks from "@/components/ui/icons/menu-links/IconDreamboxMenuLinks.vue";
import IconLkMenuLinks from "@/components/ui/icons/menu-links/IconLkMenuLinks.vue";
import IconAllMenuLinks from "@/components/ui/icons/menu-links/IconAllMenuLinks.vue";

export default {
  name: "MenuLinks",
  components: { IconAllMenuLinks, IconLkMenuLinks, IconDreamboxMenuLinks, IconJournalMenuLinks, IconSearchMenuLinks, IconCheckMarkBlue, DropDown, IconArrowDownGreyMedium },
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

      .category-header {
        font-family: 'Inter',serif;
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 15px;
        letter-spacing: 0.02em;
        color: #303030;
      }

      .category-item {
        display: flex;
        align-items: center;
        height: 16px;
        padding: 10px 12px;
        gap: 6px;

        .category-item__category {
          font-family: 'Inter', serif;
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 15px;
          letter-spacing: 0.02em;
          color: #303030;
        }

        .category-item__category-active {
          font-family: 'Inter', serif;
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 15px;
          letter-spacing: 0.02em;
          color: #2D78EA;
        }
      }

      .category-item-active,
      .category-item:hover {
        background: #F6F7F9;
        border-radius: 6px;
      }
    }

    .menu-links__category-choice:hover svg .icon-arrow-down-grey-medium {
      fill: #303030 !important;
    }

    .menu-search {
      width: 240px;
      padding: 10px 12px 10px 38px;
      background: #FFFFFF;
      border: none;
      border-radius: 50px;
      font-family: 'Inter', serif;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      letter-spacing: 0.02em;
      color: #303030;
      outline: none;
    }
  }

  .t37px {
    top: 37px;
  }
  .t6px {
    top: 6px;
  }
  .l8px {
    left: 8px;
  }
  .l0px {
    left: 0;
  }
  .mr25px {
    margin-right: 25px;
  }
  .ml32px {
    margin-left: 32px;
  }
  .tdn {
    text-decoration: none;
  }

</style>

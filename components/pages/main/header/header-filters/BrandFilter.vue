<template lang="pug">
  .filter__item.filter__item_brand.pos-rel.df.jcsb.aic.cp(
    @click="isShowBrandList = !isShowBrandList" :class="{ 'filter__item_hover': !disabled, 'cnd': disabled }"
  )
    h3.filter__name.filter__name_gender(:class="{ disabled }") Бренд
    //.number-selected-options.ml6px(v-if="currentBrandArr.length") {{ currentBrandArr.length }}
    IconArrowDownGreyMedium.menu-links__icon-arrow-down.ml19px(
      :disabled="disabled" :class="{ 'menu-links__icon-arrow-down-active': isShowBrandList && !disabled }"
    )
    .filter__dropdown.pos-abs(v-if="isShowBrandList && !disabled")
      DropDown(@close="isShowBrandList = false" :styles="{ padding: '16px 20px 20px 20px', 'width': '263px' }")
        .df.aic
          span.dropdown-header.toe.wsn.oh Выбор бренда
          IconTooltip#tooltip-dropdown-language.ml6px
          b-tooltip(target="tooltip-dropdown-language" placement="right" delay="100")
            | Чтобы не выбирать одни и те же <br> данные каждый раз, вы можете <br> настроить их у &nbsp
            nuxt-link.tooltip-link(to="/lk") себя в профиле

        .df.pos-rel.mt14px(@click.stop)
          input.menu-search.menu-search_filter(v-model="query" placeholder="Поиск")
          IconSearchMenuLinks.pos-abs.t6px.l8px(color="#B3B3B3")
          div(v-if="query" @click="query = ''")
            IconCloseSearch.pos-abs.t7px.r8px

        .dropdown-choice-count.mt12px.mb10px(v-if="query && !subcategoryOptionsSearch.length") Ничего не найдено
        .dropdown-choice-count.mt12px.mb10px(v-else) Выбрано: {{ currentBrandArr.length }}
    //
    //    .filter__options-wrapper(v-if="!query")
    //      .filter__letter.mb12px(v-for="subcatKey,idx in Object.keys(subcategoryOptions)" :key="subcatKey") {{ subcatKey }}
    //        .filter__options-item.filter__options-item-subcategory.df.aic.mt7px.cp(
    //          v-for="subcatObj,idx in subcategoryOptions[ subcatKey ]" :key="idx" @click.stop="toggleSubcategory(subcatObj)"
    //          :class="{ 'filter__options-item_active': currentBrandArrNameRus.includes(subcatObj.subcategory) }"
    //        )
    //          .df.aic
    //            Checkbox(
    //              :is-checked="currentBrandArrNameRus.includes(subcatObj.subcategory)"
    //              styles="top: 3px; left: 3px;"
    //            )
    //            span.gender__name.ml8px(
    //              :class="{ 'gender__name_active': currentBrandArrNameRus.includes(subcatObj.subcategory) }"
    //            ) {{ subcatObj.subcategory }}
    //
    //    .filter__options-wrapper(v-else)
    //      .filter__options-item.filter__options-item-subcategory.df.aic.mt7px.pl10px.cp(
    //        v-for="subcatObj in subcategoryOptionsSearch" :key="subcatObj.subcategory" @click.stop="toggleSubcategory(subcatObj)"
    //        :class="{ 'filter__options-item_active': currentBrandArrNameRus.includes(subcatObj.subcategory) }"
    //      )
    //        .df.aic
    //          Checkbox(
    //            :is-checked="currentBrandArrNameRus.includes(subcatObj.subcategory)"
    //            styles="top: 3px; left: 3px;"
    //          )
    //          span.gender__name.ml8px(
    //            :class="{ 'gender__name_active': currentBrandArrNameRus.includes(subcatObj.subcategory) }"
    //          ) {{ subcatObj.subcategory }}
    //
    //    .df.g10
    //      button.filter__dropdown-btn.filter__dropdown-btn-disagree.df.jcc.aic.mt12px.cp(
    //        v-if="currentBrandArr.length" @click.stop="currentBrandArr = []"
    //      ) Сбросить
    //      button.filter__dropdown-btn.filter__dropdown-btn-agree.df.jcc.aic.mt12px.cp(@click.stop="isShowBrandList = false; FETCH_SELECTS()") Готово

</template>

<script>
// import { mapActions, mapMutations } from "vuex";
import IconArrowDownGreyMedium from "@/components/ui/icons/arrows/IconArrowDownGreyMedium.vue";
import DropDown from "@/components/ui/blocks/DropDown.vue";
import IconTooltip from "@/components/ui/icons/IconTooltip.vue";
import IconSearchMenuLinks from "@/components/ui/icons/menu-links/IconSearchMenuLinks.vue";
import IconCloseSearch from "@/components/ui/icons/IconCloseSearch.vue";

export default {
  name: "BrandFilter",
  components: { IconCloseSearch, IconSearchMenuLinks, IconTooltip, DropDown, IconArrowDownGreyMedium },
  props: [ 'disabled' ],
  data: () => ({
    query: '',
    currentBrandArr: [],
    isShowBrandList: false,
    isDisabled: true
  }),
  // computed: {
  //   subcategoryOptions () {
  //     const subcat = this.$store.state.selects.selects.subcat.concat()
  //     const collator = new Intl.Collator('ru')
  //     const subcatSort = subcat.sort((x, y) => collator.compare(x.subcategory, y.subcategory))
  //     return subcatSort.reduce((acc, subcatObj) => {
  //       const firstLetter = subcatObj.subcategory[ 0 ]
  //       if (!acc[firstLetter]) acc[firstLetter] = [ subcatObj ]
  //       else acc[firstLetter].push(subcatObj)
  //       return acc
  //     }, {})
  //   },
  //   subcategoryOptionsSearch () {
  //     return this.$store.state.selects.selects.subcat.filter(subcatObj => subcatObj.subcategory.toLowerCase().includes(this.query.toLowerCase()))
  //   },
  //   currentBrandArrNameRus () {
  //     return this.currentBrandArr.map(currentSubcatObj => currentSubcatObj.subcategory)
  //   },
  //   currentBrandArrNameEn () {
  //     return this.currentBrandArr.map(currentSubcatObj => currentSubcatObj?.subcategory_t.toLowerCase())
  //   }
  // },
  // watch: {
  //   currentBrandArr (nV) {
  //     if (nV.length) {
  //       this.setFilterParam()
  //       this.setFindParam()
  //       this.setUrlParam()
  //     } else {
  //       this.unsetFilterParam()
  //       this.unsetFindParam()
  //       this.unsetUrlParam()
  //     }
  //   },
  //   '$store.state.selects.selects.subcat': {
  //     handler (nV) {
  //       if (nV) this.getSubcategory()
  //     }
  //   },
  //   '$store.state.filters.collection': {
  //     handler () {
  //       this.currentBrandArr = []
  //     }
  //   },
  //   '$store.state.filters.filterObj': {
  //     handler () {
  //       this.currentBrandArr = []
  //     },
  //     deep: true
  //   }
  // },
  // methods: {
  //   ...mapActions('selects', [ 'FETCH_SELECTS' ]),
  //   ...mapMutations('filters', [ 'SET_FILTER_PARAM', 'UNSET_FILTER_PARAM', 'SET_FIND_PARAM', 'UNSET_FIND_PARAM' ]),
  //   ...mapMutations('catalog', [ 'SET_URL_PARAM', 'UNSET_URL_PARAM' ]),
  //   setFilterParam () {
  //     this.SET_FILTER_PARAM({
  //       param: 'subcategory',
  //       value: this.currentBrandArr.length ? this.currentBrandArrNameRus : []
  //     })
  //   },
  //   unsetFilterParam () {
  //     this.UNSET_FILTER_PARAM({ param: 'subcategory' })
  //   },
  //   setFindParam () {
  //     this.SET_FIND_PARAM({
  //       param: 'subcategory',
  //       value: { $in: this.currentBrandArrNameRus }
  //     })
  //   },
  //   unsetFindParam () {
  //     this.UNSET_FIND_PARAM({ param: 'subcategory' })
  //   },
  //   setUrlParam () {
  //     this.SET_URL_PARAM({
  //       param: '3subcategory',
  //       value: this.currentBrandArrNameEn.reduce((acc, subcatT, idx) => {
  //         if (idx !== this.currentBrandArrNameEn.length - 1) acc += subcatT + '--'
  //         else acc += subcatT
  //         return acc
  //       }, '')
  //     })
  //   },
  //   unsetUrlParam () {
  //     this.UNSET_URL_PARAM({ param: '3subcategory' })
  //   },
  //   getSubcategory () {
  //     const subcatArr = []
  //     this.$store.state.selects.selects.subcat.forEach(subcatObj => {
  //       if (this.$route.path.includes(subcatObj?.subcategory_t.toLowerCase())) {
  //         subcatArr.push(subcatObj)
  //       }
  //     })
  //     if (!subcatArr.length) subcatArr.push(...this.currentBrandArr)
  //     else this.currentBrandArr = subcatArr
  //     this.SET_FILTER_PARAM({ param: 'subcategory', value: subcatArr })
  //   },
  //   toggleSubcategory (subcatObj) {
  //     this.currentBrandArr.includes(subcatObj)
  //       ? this.currentBrandArr.splice(this.currentBrandArr.indexOf(subcatObj), 1)
  //       : this.currentBrandArr.push(subcatObj)
  //   }
  // }
};
</script>

<style lang="scss">
  .filter__item_brand {
    width: 99px;
  }

</style>

<template lang="pug">
  .filter__item.filter__item_subcategory.pos-rel.df.jcsb.aic.cp(
    @click="isShowSubcategoryList = !isShowSubcategoryList" :class="{ 'filter__item_hover': !disabled, 'cnd': disabled }"
  )
    h3.filter__name.filter__name_gender(:class="{ disabled }") Категория
    .number-selected-options.pos-abs.ml78px(v-if="currentSubcategoryArr.length") {{ currentSubcategoryArr.length }}
    IconArrowDownGreyMedium.menu-links__icon-arrow-down.ml19px(
      :disabled="disabled" :class="{ 'menu-links__icon-arrow-down-active': isShowSubcategoryList && !disabled }"
    )
    .filter__dropdown.pos-abs(v-if="isShowSubcategoryList && !disabled")
      DropDown(@close="isShowSubcategoryList = false" :styles="{ padding: '16px 20px 20px 20px', 'width': '263px' }")
        .df.aic
          span.dropdown-header.toe.wsn.oh Выбор категории
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
        .dropdown-choice-count.mt12px.mb10px(v-else) Выбрано: {{ currentSubcategoryArr.length }}

        .filter__options-wrapper(v-if="!query")
          .filter__letter.mb12px(v-for="letterKey,idx in Object.keys(subcategoryOptions)" :key="letterKey") {{ letterKey }}
            .filter__options-item.filter__options-item-subcategory.df.aic.mt7px.cp(
              v-for="subcatObj,idx in subcategoryOptions[ letterKey ]" :key="idx" @click.stop="toggleSubcategory(subcatObj)"
              :class="{ 'filter__options-item_active': currentSubcategoryArrNameRus.includes(subcatObj.subcategory) }"
            )
              .df.aic
                Checkbox(:is-checked="currentSubcategoryArrNameRus.includes(subcatObj.subcategory)" styles="top: 3px; left: 3px;")
                span.gender__name.ml8px(:class="{ 'gender__name_active': currentSubcategoryArrNameRus.includes(subcatObj.subcategory) }") {{ subcatObj.subcategory }}

          .dropdown-choice-count.mt12px.mb10px(v-if="isActiveFilter && $store.state.selects.selects?.subcat.length") Чтобы увидеть другие категории нажмите «Сбросить»

        .filter__options-wrapper(v-else)
          .filter__options-item.filter__options-item-subcategory.df.aic.mt7px.pl10px.cp(
            v-for="subcatObj in subcategoryOptionsSearch" :key="subcatObj.subcategory" @click.stop="toggleSubcategory(subcatObj)"
            :class="{ 'filter__options-item_active': currentSubcategoryArrNameRus.includes(subcatObj.subcategory) }"
          )
            .df.aic
              Checkbox(:is-checked="currentSubcategoryArrNameRus.includes(subcatObj.subcategory)" styles="top: 3px; left: 3px;")
              span.gender__name.ml8px(:class="{ 'gender__name_active': currentSubcategoryArrNameRus.includes(subcatObj.subcategory) }") {{ subcatObj.subcategory }}

        .df.g10
          button.filter__dropdown-btn.filter__dropdown-btn-disagree.df.jcc.aic.mt12px.cp(
            v-if="currentSubcategoryArr.length" @click.stop="currentSubcategoryArr = []; resetFilter()"
          ) Сбросить
          button.filter__dropdown-btn.filter__dropdown-btn-agree.df.jcc.aic.mt12px.cp(@click.stop="acceptParameters") Готово

</template>

<script>
import { mapActions, mapMutations } from "vuex";
import IconArrowDownGreyMedium from "@/components/ui/icons/arrows/IconArrowDownGreyMedium.vue";
import DropDown from "@/components/ui/blocks/DropDown.vue";
import IconTooltip from "@/components/ui/icons/IconTooltip.vue";
import Checkbox from "@/components/ui/blocks/Checkbox.vue";
import IconSearchMenuLinks from "@/components/ui/icons/menu-links/IconSearchMenuLinks.vue";
import IconCloseSearch from "@/components/ui/icons/IconCloseSearch.vue";

export default {
  name: "SubcategoryFilter",
  components: { IconCloseSearch, IconSearchMenuLinks, Checkbox, IconTooltip, DropDown, IconArrowDownGreyMedium },
  props: [ 'disabled' ],
  data: () => ({
    query: '',
    currentSubcategoryArr: [],
    isShowSubcategoryList: false,
    isDisabled: true,
    init: false
  }),
  computed: {
    subcategoryOptions () {
      const subcat = this.$store.state.selects.selects.subcat.concat()
      const collator = new Intl.Collator('ru')
      const subcatSort = subcat.sort((x, y) => collator.compare(x.subcategory, y.subcategory))
      return subcatSort.reduce((acc, subcatObj) => {
        const firstLetter = subcatObj.subcategory[ 0 ]
        if (!acc[firstLetter]) acc[firstLetter] = [ subcatObj ]
        else acc[firstLetter].push(subcatObj)
        return acc
      }, {})
    },
    subcategoryOptionsSearch () {
      return this.$store.state.selects.selects.subcat.filter(subcatObj => subcatObj.subcategory.toLowerCase().includes(this.query.toLowerCase()))
    },
    currentSubcategoryArrNameRus () {
      return this.currentSubcategoryArr.map(currentSubcatObj => currentSubcatObj.subcategory)
    },
    currentSubcategoryArrNameEn () {
      return this.currentSubcategoryArr.map(currentSubcatObj => currentSubcatObj?.subcategory_t.toLowerCase())
    },
    isActiveFilter () {
      return this.$store.state.selects.selects?.subcat
        ? (this.currentSubcategoryArr.length === this.$store.state.selects.selects.subcat.length)
          && this.currentSubcategoryArr.map(subcatObj => subcatObj.subcategory)
            .every(el => this.$store.state.selects.selects.subcat.map(subcatObj => subcatObj.subcategory).includes(el))
        : false
    }
  },
  watch: {
    currentSubcategoryArr (nV) {
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
        if (this.init) this.currentSubcategoryArr = []
      }
    },
    '$store.state.filters.filterObj': {
      handler () {
        if (this.init) this.currentSubcategoryArr = []
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
        param: 'subcategory',
        value: this.currentSubcategoryArr.length ? this.currentSubcategoryArrNameRus : []
      })
    },
    unsetFilterParam () {
      this.UNSET_FILTER_PARAM({ param: 'subcategory' })
    },
    setFindParam () {
      this.SET_FIND_PARAM({
        param: 'subcategory',
        value: { $in: this.currentSubcategoryArrNameRus }
      })
    },
    unsetFindParam () {
      this.UNSET_FIND_PARAM({ param: 'subcategory' })
    },
    setUrlParam () {
      this.SET_URL_PARAM({
        param: '3subcategory',
        value: this.currentSubcategoryArrNameEn.reduce((acc, subcatT, idx) => {
          if (idx !== this.currentSubcategoryArrNameEn.length - 1) acc += subcatT + '--'
          else acc += subcatT
          return acc
        }, '')
      })
    },
    unsetUrlParam () {
      this.UNSET_URL_PARAM({ param: '3subcategory' })
    },
    resetFilter () {
      this.query = ''
      this.unsetFilterParam()
      this.unsetFindParam()
      this.unsetUrlParam()
      this.SET_FIND_PARAM({ param: 'price', value: { $in: [ 1, 999999 ] } })
      this.FETCH_SELECTS()
    },
    acceptParameters () {
      this.isShowSubcategoryList = false
      this.FETCH_SELECTS()
      this.SET_FIND_PARAM({ param: 'price', value: { $in: [ 1, 999999 ] } })
    },
    getSubcategory () {
      const subcatArr = []
      setTimeout(() => {
        this.$store.state.selects?.selects?.subcat.forEach(subcatObj => {
          if (this.$route.path.includes(subcatObj?.subcategory_t.toLowerCase())) {
            subcatArr.push(subcatObj)
          }
        })
        if (!subcatArr.length) subcatArr.push(...this.currentSubcategoryArr)
        else this.currentSubcategoryArr = subcatArr
        this.SET_FILTER_PARAM({ param: 'subcategory', value: subcatArr })
      }, 1000)
    },
    toggleSubcategory (subcatObj) {
      this.currentSubcategoryArr.map(currentSubcatObj => currentSubcatObj.subcategory).includes(subcatObj.subcategory)
        ? this.currentSubcategoryArr.splice(this.currentSubcategoryArr.map(currentSubcatObj => currentSubcatObj.subcategory).indexOf(subcatObj.subcategory), 1)
        : this.currentSubcategoryArr.push(subcatObj)
    }
  },
  created () {
    this.getSubcategory()
  },
  mounted () {
    setTimeout(() => this.init = true, 1000)
  }
};
</script>

<style lang="scss">
  .disabled {
    color: #B3B3B3 !important;
  }

  .dropdown-choice-count {
    font-family: 'Inter', serif;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    letter-spacing: 0.02em;
    color: #B3B3B3;
  }

  .filter__item_subcategory {
    width: 129px;
  }

  .filter__options-wrapper {
    height: 267px;
    overflow-x: auto;
  }

  .filter__letter {
    font-family: 'Inter', serif;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.02em;
    color: #B3B3B3;

    .filter__options-item-subcategory {
      width: 235px;
      padding-left: 12px;
    }
  }

  .filter__dropdown-allow {
    padding: 12px 24px;
    background: #2D78EA;
    border-radius: 10px;
  }

  .filter__dropdown-btn {
    border-radius: 10px;
    font-family: 'Inter', serif;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.02em;
    border: none;
  }

  .filter__dropdown-btn-agree {
    width: 100%;
    padding: 12px 0;
    color: #FFFFFF;
    background: #2D78EA;
  }

  .filter__dropdown-btn-disagree {
    width: 100%;
    padding: 12px 0;
    color: #616161;
    background: #F6F7F9;
  }

</style>

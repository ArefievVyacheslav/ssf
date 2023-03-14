<template lang="pug">
  .filter__item.filter__item_subcategory.pos-rel.df.jcsb.aic.cp(
    @click="isShowsubcategoryList = !isShowsubcategoryList" :class="{ 'filter__item_hover': !disabled, 'cnd': disabled }"
  )
    h3.filter__name.filter__name_gender(:class="{ disabled }") Категория
    .number-selected-options.pos-abs.ml78px(v-if="currentsubcategoryArr.length") {{ currentsubcategoryArr.length }}
    IconArrowDownGreyMedium.menu-links__icon-arrow-down.ml19px(
      :disabled="disabled" :class="{ 'menu-links__icon-arrow-down-active': isShowsubcategoryList && !disabled }"
    )
    .filter__dropdown.pos-abs(v-if="isShowsubcategoryList && !disabled")
      DropDown(@close="isShowsubcategoryList = false" :styles="{ padding: '16px 20px 20px 20px', 'width': '263px' }")
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
        .dropdown-choice-count.mt12px.mb10px(v-else) Выбрано: {{ currentsubcategoryArr.length }}

        .filter__options-wrapper(v-if="!query")
          .filter__letter.mb12px(v-for="letterKey,idx in Object.keys(subcategoryOptions)" :key="letterKey") {{ letterKey }}
            .filter__options-item.filter__options-item-subcategory.df.aic.mt7px.cp(
              v-for="subCatObj,idx in subcategoryOptions[ letterKey ]" :key="idx" @click.stop="togglesubcategory(subCatObj)"
              :class="{ 'filter__options-item_active': currentsubcategoryArrNameRus.includes(subCatObj.subcategory) }"
            )
              .df.aic
                Checkbox(:is-checked="currentsubcategoryArrNameRus.includes(subCatObj.subcategory)" styles="top: 3px; left: 3px;")
                span.gender__name.ml8px(:class="{ 'gender__name_active': currentsubcategoryArrNameRus.includes(subCatObj.subcategory) }") {{ subCatObj.subcategory }}

          .dropdown-choice-count.mt12px.mb10px(v-if="isActiveFilter && $store.state.selects.selects?.subCat.length") Чтобы увидеть другие категории нажмите «Сбросить»

        .filter__options-wrapper(v-else)
          .filter__options-item.filter__options-item-subcategory.df.aic.mt7px.pl10px.cp(
            v-for="subCatObj in subcategoryOptionsSearch" :key="subCatObj.subcategory" @click.stop="togglesubcategory(subCatObj)"
            :class="{ 'filter__options-item_active': currentsubcategoryArrNameRus.includes(subCatObj.subcategory) }"
          )
            .df.aic
              Checkbox(:is-checked="currentsubcategoryArrNameRus.includes(subCatObj.subcategory)" styles="top: 3px; left: 3px;")
              span.gender__name.ml8px(:class="{ 'gender__name_active': currentsubcategoryArrNameRus.includes(subCatObj.subcategory) }") {{ subCatObj.subcategory }}

        .df.g10
          button.filter__dropdown-btn.filter__dropdown-btn-disagree.df.jcc.aic.mt12px.cp(
            v-if="currentsubcategoryArr.length" @click.stop="currentsubcategoryArr = []; resetFilter()"
          ) Сбросить
          button.filter__dropdown-btn.filter__dropdown-btn-agree.df.jcc.aic.mt12px.cp(@click.stop="acceptParameters") Готово

</template>

<script>
import { mapActions, mapMutations } from "vuex";
import IconArrowDownGreyMedium from "@/components/ui/icons/arrows/IconArrowDownGreyMedium.vue";
import DropDown from "@/components/ui/blocks/DropDown.vue";
import IconTooltip from "@/components/ui/icons/IconTooltipQuestion.vue";
import Checkbox from "@/components/ui/blocks/Checkbox.vue";
import IconSearchMenuLinks from "@/components/ui/icons/menu-links/IconSearchMenuLinks.vue";
import IconCloseSearch from "@/components/ui/icons/IconCloseSearch.vue";

export default {
  name: "subcategoryFilter",
  components: { IconCloseSearch, IconSearchMenuLinks, Checkbox, IconTooltip, DropDown, IconArrowDownGreyMedium },
  props: [ 'disabled' ],
  data: () => ({
    query: '',
    currentsubcategoryArr: [],
    isShowsubcategoryList: false,
    isDisabled: true,
    init: false
  }),
  computed: {
    subcategoryOptions () {
      const subCat = this.$store.state.selects.selects.subCat.concat()
      const collator = new Intl.Collator('ru')
      const subCatSort = subCat.sort((x, y) => collator.compare(x.subcategory, y.subcategory))
      return subCatSort.reduce((acc, subCatObj) => {
        const firstLetter = subCatObj.subcategory[ 0 ]
        if (!acc[firstLetter]) acc[firstLetter] = [ subCatObj ]
        else acc[firstLetter].push(subCatObj)
        return acc
      }, {})
    },
    subcategoryOptionsSearch () {
      return this.$store.state.selects.selects.subCat.filter(subCatObj => subCatObj.subcategory.toLowerCase().includes(this.query.toLowerCase()))
    },
    currentsubcategoryArrNameRus () {
      return this.currentsubcategoryArr.map(currentSubcatObj => currentSubcatObj.subcategory)
    },
    currentsubcategoryArrNameEn () {
      return this.currentsubcategoryArr.map(currentSubcatObj => currentSubcatObj?.subcategory_t.toLowerCase())
    },
    isActiveFilter () {
      return this.$store.state.selects.selects?.subCat
        ? (this.currentsubcategoryArr.length === this.$store.state.selects.selects.subCat.length)
          && this.currentsubcategoryArr.map(subCatObj => subCatObj.subcategory)
            .every(el => this.$store.state.selects.selects.subCat.map(subCatObj => subCatObj.subcategory).includes(el))
        : false
    }
  },
  watch: {
    currentsubcategoryArr (nV) {
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
        if (this.init) this.currentsubcategoryArr = []
      }
    },
    '$store.state.filters.filterObj': {
      handler () {
        if (this.init) this.currentsubcategoryArr = []
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
        value: this.currentsubcategoryArr.length ? this.currentsubcategoryArrNameRus : []
      })
    },
    unsetFilterParam () {
      this.UNSET_FILTER_PARAM({ param: 'subcategory' })
    },
    setFindParam () {
      this.SET_FIND_PARAM({
        param: 'subcategory',
        value: { $in: this.currentsubcategoryArrNameRus }
      })
    },
    unsetFindParam () {
      this.UNSET_FIND_PARAM({ param: 'subcategory' })
    },
    setUrlParam () {
      this.SET_URL_PARAM({
        param: 'b-subcategory',
        value: this.currentsubcategoryArrNameEn.reduce((acc, subCatT, idx) => {
          if (idx !== this.currentsubcategoryArrNameEn.length - 1) acc += subCatT + '--'
          else acc += subCatT
          return acc
        }, '')
      })
    },
    unsetUrlParam () {
      this.UNSET_URL_PARAM({ param: 'b-subcategory' })
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
      this.isShowsubcategoryList = false
      this.FETCH_SELECTS()
      this.SET_FIND_PARAM({ param: 'price', value: { $in: [ 1, 999999 ] } })
    },
    getsubcategory () {
      const subCatArr = []
      setTimeout(() => {
        this.$store.state.selects?.selects?.subCat.forEach(subCatObj => {
          if (this.$route.path.includes(subCatObj?.subcategory_t.toLowerCase())) {
            subCatArr.push(subCatObj)
          }
        })
        if (!subCatArr.length) subCatArr.push(...this.currentsubcategoryArr)
        else this.currentsubcategoryArr = subCatArr
        this.SET_FILTER_PARAM({ param: 'subcategory', value: subCatArr })
      }, 1000)
    },
    togglesubcategory (subCatObj) {
      this.currentsubcategoryArr.map(currentSubcatObj => currentSubcatObj.subcategory).includes(subCatObj.subcategory)
        ? this.currentsubcategoryArr.splice(this.currentsubcategoryArr.map(currentSubcatObj => currentSubcatObj.subcategory).indexOf(subCatObj.subcategory), 1)
        : this.currentsubcategoryArr.push(subCatObj)
    }
  },
  created () {
    this.getsubcategory()
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
    max-height: 41px;
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

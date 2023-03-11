<template lang="pug">
  .filter__item.filter__item_brand.pos-rel.df.jcsb.aic.cp(
    @click="isShowBrandList = !isShowBrandList" :class="{ 'filter__item_hover': !disabled, 'cnd': disabled }"
  )
    h3.filter__name.filter__name_gender(:class="{ disabled }") Бренд
    .number-selected-options.pos-abs.ml50px(v-if="currentBrandArr.length") {{ currentBrandArr.length }}
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
          input.menu-search.menu-search_filter(v-model.trim="query" placeholder="Поиск")
          IconSearchMenuLinks.pos-abs.t6px.l8px(color="#B3B3B3")
          div(v-if="query" @click="query = ''")
            IconCloseSearch.pos-abs.t7px.r8px

        .dropdown-choice-count.mt12px.mb10px(v-if="!query && brandOptionsSearch.length") Выбрано: {{ currentBrandArr.length }}

        .filter__options-wrapper(v-if="!query")
          .filter__letter.mb12px(v-for="letterKey,idx in Object.keys(brandOptions)" :key="letterKey") {{ letterKey }}
            .filter__options-item.filter__options-item-subcategory.df.aic.mt7px.cp(
              v-for="brandStr,idx in brandOptions[ letterKey ]" :key="idx" @click.stop="toggleSubcategory(brandStr)"
              :class="{ 'filter__options-item_active': currentBrandArr.includes(brandStr) }"
            )
              .df.aic
                Checkbox(:is-checked="currentBrandArr.includes(brandStr)" styles="top: 3px; left: 3px;") {{ brandStr }}
                span.gender__name.ml8px(:class="{ 'gender__name_active': currentBrandArr.includes(brandStr) }") {{ brandStr }}

          .dropdown-choice-count.mt12px.mb10px(v-if="isActiveFilter") Чтобы увидеть другие бренды нажмите «Сбросить»

        .filter__options-wrapper(v-else :class="{ mt37px: query }")
          .filter__options-item.filter__options-item-subcategory.df.aic.mt7px.pl10px.cp(
            v-for="brandStr in brandOptionsSearch" :key="brandStr" @click.stop="toggleSubcategory(brandStr)"
            :class="{ 'filter__options-item_active': currentBrandArr.includes(brandStr) }"
          )
            .df.aic
              Checkbox(:is-checked="currentBrandArr.includes(brandStr)" styles="top: 3px; left: 3px;")
              span.gender__name.ml8px(:class="{ 'gender__name_active': currentBrandArr.includes(brandStr) }") {{ brandStr }}

          .brand-offer.df.fdc.pt90px(v-if="query && !brandOptionsSearch.length")
            .dropdown-choice-count.mt12px.mb10px.tac Ничего не найдено
            .brand-offer-text.tac(@click.stop v-b-modal.add-brand-modal) Предложить добавить бренд

        .df.g10
          button.filter__dropdown-btn.filter__dropdown-btn-disagree.df.jcc.aic.mt12px.cp(
            v-if="currentBrandArr.length" @click.stop="currentBrandArr = []; resetFilter()"
          ) Сбросить
          button.filter__dropdown-btn.filter__dropdown-btn-agree.df.jcc.aic.mt12px.cp(@click.stop="acceptParameters") Готово

    Modal(@modal-ok="addBrands" ident="add-brand-modal" title="Добавление бренда" okTitle="Предложить" cancelTitle="Отменить")
      template(v-slot:modal-desc)
        span.modal-desc Если вы не нашли бренд, который искали, то вы можете предложить добавить его.
        input(v-model="userBrandsStr" placeholder="Названия брендов через ,").menu-search.modal-brand-search

</template>

<script>
import { mapActions, mapMutations } from "vuex";
import IconArrowDownGreyMedium from "@/components/ui/icons/arrows/IconArrowDownGreyMedium.vue";
import DropDown from "@/components/ui/blocks/DropDown.vue";
import IconTooltip from "@/components/ui/icons/IconTooltipQuestion.vue";
import IconSearchMenuLinks from "@/components/ui/icons/menu-links/IconSearchMenuLinks.vue";
import IconCloseSearch from "@/components/ui/icons/IconCloseSearch.vue";
import Checkbox from "@/components/ui/blocks/Checkbox.vue";
import Modal from "@/components/ui/Modal.vue";

export default {
  name: "BrandFilter",
  components: { Modal, Checkbox, IconCloseSearch, IconSearchMenuLinks, IconTooltip, DropDown, IconArrowDownGreyMedium },
  props: [ 'disabled' ],
  data: () => ({
    query: '',
    currentBrandArr: [],
    userBrandsStr: '',
    isShowBrandList: false,
    isDisabled: true,
    isDisabledAddFilter: false,
    init: false
  }),
  computed: {
    brandOptions () {
      const brand = this.$store.state.selects.selects.brand.concat()
      const brandSort = brand.sort()
      return brandSort.reduce((acc, brandStr) => {
        const firstLetter = brandStr[ 0 ]
        if (!acc[firstLetter]) acc[firstLetter] = [ brandStr ]
        else acc[firstLetter].push(brandStr)
        return acc
      }, {})
    },
    brandOptionsSearch () {
      return this.$store.state.selects.selects.brand.filter(brandStr => brandStr.toLowerCase().includes(this.query.toLowerCase()))
    },
    isActiveFilter () {
      return this.$store.state.selects.selects?.brand
        ? (this.currentBrandArr.length === this.$store.state.selects.selects.brand.length)
        && this.currentBrandArr.every(el => this.$store.state.selects.selects.brand.includes(el))
        : false
    },
    userBrandsArr () {
      return this.userBrandsStr.split(',')
        .map(brandStr => brandStr.replaceAll(' ', '').toLowerCase())
        .filter(brandStr => brandStr)
    }
  },
  watch: {
    currentBrandArr (nV) {
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
        if (this.init) this.currentBrandArr = []
      }
    },
    '$store.state.filters.filterObj': {
      handler () {
        if (this.init) this.currentBrandArr = []
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
        param: 'brand',
        value: this.currentBrandArr.length ? this.currentBrandArr : []
      })
    },
    unsetFilterParam () {
      this.UNSET_FILTER_PARAM({ param: 'brand' })
    },
    setFindParam () {
      this.SET_FIND_PARAM({
        param: 'brand',
        value: { $in: this.currentBrandArr }
      })
    },
    unsetFindParam () {
      this.UNSET_FIND_PARAM({ param: 'brand' })
    },
    setUrlParam () {
      this.SET_URL_PARAM({
        param: 'c-brand',
        value: this.currentBrandArr.reduce((acc, brand, idx) => {
          if (idx !== this.currentBrandArr.length - 1) acc += brand.toLowerCase().replaceAll(' ', '-') + '--'
          else acc += brand.toLowerCase().replaceAll(' ', '-')
          return acc
        }, '')
      })
    },
    unsetUrlParam () {
      this.UNSET_URL_PARAM({ param: 'c-brand' })
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
      this.isShowBrandList = false
      this.FETCH_SELECTS()
      this.SET_FIND_PARAM({ param: 'price', value: { $in: [ 1, 999999 ] } })
    },
    getBrand () {
      const brandArr = []
      setTimeout(() => {
        this.$store.state.selects.selects.brand.forEach(brandStr => {
          if (this.$route.path.includes(brandStr.toLowerCase().replaceAll(' ', '-'))) {
            brandArr.push(brandStr)
          }
        })
        if (!brandArr.length) brandArr.push(...this.currentBrandArr)
        else this.currentBrandArr = brandArr
        this.SET_FILTER_PARAM({ param: 'brand', value: brandArr })
      }, 1000)
    },
    toggleSubcategory (brandStr) {
      this.currentBrandArr.includes(brandStr)
        ? this.currentBrandArr.splice(this.currentBrandArr.indexOf(brandStr), 1)
        : this.currentBrandArr.push(brandStr)
    },
    async addBrands () {
      if (this.isDisabledAddFilter) this.$bvToast.toast('Возможность добавить появится через минуту', {
        title: 'BootstrapVue Toast',
        variant: 'warning',
        autoHideDelay: 5000
      })
      else if (this.userBrandsArr.length) {
        try {
          this.isDisabledAddFilter = true
          const { data } = await this.$axios.put('service', { userBrands: this.userBrandsArr })
          this.$bvToast.toast(data.msg, {
            title: 'BootstrapVue Toast',
            variant: data.type,
            autoHideDelay: 5000
          })
          this.query = ''
          setTimeout(() => this.isDisabledAddFilter = false, 60 * 1000)
        } catch (e) {}
      }
    }
  },
  created () {
    this.getBrand()
  },
  mounted () {
    setTimeout(() => this.init = true, 1000)
  }
};
</script>

<style lang="scss">
  .filter__item_brand {
    width: 99px;

    .brand-offer-text {
      font-family: 'Inter', serif;
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 15px;
      text-align: center;
      letter-spacing: 0.02em;
      color: #2D78EA;
    }
  }

  .modal-brand-search {
    margin-top: 30px;
    width: 100% !important;
    max-width: 331px !important;
    padding: 14px !important;
    border-radius: 10px !important;
    background: #F6F7F9 !important;
  }

</style>

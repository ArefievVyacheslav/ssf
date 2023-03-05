<template lang="pug">
  .filter__item.filter__item_size.pos-rel.df.jcsb.aic.cp(
    @click="isShowSizeList = !isShowSizeList" :class="{ 'filter__item_hover': !disabled, 'cnd': disabled }"
  )
    h3.filter__name.filter__name_gender(:class="{ disabled }") Размер
    .number-selected-options.pos-abs.ml58px(v-if="currentSizeArr.length") {{ currentSizeArr.length }}
    IconArrowDownGreyMedium.menu-links__icon-arrow-down.ml19px(
      :disabled="disabled" :class="{ 'menu-links__icon-arrow-down-active': isShowSizeList && !disabled }"
    )
    .filter__dropdown.pos-abs(v-if="isShowSizeList && !disabled")
      DropDown(@close="isShowSizeList = false" :styles="{ padding: '16px 20px 20px 20px', 'width': '214px' }")
        .df.aic
          span.dropdown-header.toe.wsn.oh Выбор размера
          IconTooltip#tooltip-dropdown-language.ml6px
          b-tooltip(target="tooltip-dropdown-language" placement="right" delay="100")
            | Чтобы не выбирать одни и те же <br> данные каждый раз, вы можете <br> настроить их у &nbsp
            nuxt-link.tooltip-link(to="/lk") себя в профиле

        .filter__options-wrapper.mt12px.pr12px
          .filter__options-item.filter__options-item-size.df.aic.mt7px.cp(
            v-for="sizeStr,idx in sizeArr" :key="sizeStr" @click.stop="toggleSubcategory(sizeStr)"
              :class="{ 'filter__options-item_active': currentSizeArr.includes(sizeStr) }"
            )
              .df.aic
                Checkbox(:is-checked="currentSizeArr.includes(sizeStr)" styles="top: 3px; left: 3px;") {{ sizeStr }}
                span.gender__name.ml8px(:class="{ 'gender__name_active': currentSizeArr.includes(sizeStr) }") {{ sizeStr }}

          .dropdown-choice-count.mt12px.mb10px(v-if="isActiveFilter") Чтобы увидеть другие размеры нажмите «Сбросить»

        .df.g10
          button.filter__dropdown-btn.filter__dropdown-btn-disagree.df.jcc.aic.mt12px.cp(
            v-if="currentSizeArr.length" @click.stop="currentSizeArr = []; resetFilter()"
          ) Сбросить
          button.filter__dropdown-btn.filter__dropdown-btn-agree.df.jcc.aic.mt12px.cp(@click.stop="acceptParameters") Готово

</template>

<script>
import { mapActions, mapMutations } from "vuex";
import IconArrowDownGreyMedium from "@/components/ui/icons/arrows/IconArrowDownGreyMedium.vue";
import DropDown from "@/components/ui/blocks/DropDown.vue";
import IconTooltip from "@/components/ui/icons/IconTooltip.vue";
import Checkbox from "@/components/ui/blocks/Checkbox.vue";

export default {
  name: "SizeFilter",
  components: { Checkbox, IconTooltip, DropDown, IconArrowDownGreyMedium },
  props: [ 'disabled' ],
  data: () => ({
    currentSizeArr: [],
    isShowSizeList: false,
    init: false
  }),
  computed: {
    sizeArr () {
      return this.$store.state.selects.selects.size
    },
    isActiveFilter () {
      return this.$store.state.selects.selects?.size
        ? (this.currentSizeArr.length === this.$store.state.selects.selects.size.length)
        && this.currentSizeArr.every(el => this.$store.state.selects.selects.size.includes(el))
        : false
    }
  },
  watch: {
    currentSizeArr (nV) {
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
        if (this.init) this.currentSizeArr = []
      }
    },
    '$store.state.filters.filterObj': {
      handler () {
        if (this.init) this.currentSizeArr = []
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
        param: 'sizes',
        value: this.currentSizeArr.length ? this.currentSizeArr : []
      })
    },
    unsetFilterParam () {
      this.UNSET_FILTER_PARAM({ param: 'sizes' })
    },
    setFindParam () {
      this.SET_FIND_PARAM({
        param: 'sizes',
        value: { $in: this.currentSizeArr }
      })
    },
    unsetFindParam () {
      this.UNSET_FIND_PARAM({ param: 'sizes' })
    },
    setUrlParam () {
      this.SET_URL_PARAM({
        param: '5size',
        value: this.currentSizeArr.reduce((acc, size, idx) => {
          if (idx !== this.currentSizeArr.length - 1) acc += '-' + size.toLowerCase() + '-'
          else acc += '-' + size.toLowerCase() + '-'
          return acc
        }, '')
      })
    },
    unsetUrlParam () {
      this.UNSET_URL_PARAM({ param: '5size' })
    },
    resetFilter () {
      this.unsetFilterParam()
      this.unsetFindParam()
      this.unsetUrlParam()
      this.SET_FIND_PARAM({ param: 'price', value: { $in: [ 1, 999999 ] } })
      this.FETCH_SELECTS()
    },
    acceptParameters () {
      this.isShowSizeList = false
      this.FETCH_SELECTS()
      this.SET_FIND_PARAM({ param: 'price', value: { $in: [ 1, 999999 ] } })
    },
    getSize () {
      const sizesArr = []
      setTimeout(() => {
        this.$store.state.selects.selects.size.forEach(sizeStr => {
          if (this.$route.path.includes('/-' + sizeStr.toLowerCase() + '-') || this.$route.path.includes('-' + sizeStr.toLowerCase() + '-')) {
            sizesArr.push(sizeStr)
          }
        })
        if (!sizesArr.length) sizesArr.push(...this.currentSizeArr)
        else this.currentSizeArr = sizesArr
        this.SET_FILTER_PARAM({ param: 'sizes', value: sizesArr })
      }, 1000)
    },
    toggleSubcategory (sizeStr) {
      this.currentSizeArr.includes(sizeStr)
        ? this.currentSizeArr.splice(this.currentSizeArr.indexOf(sizeStr), 1)
        : this.currentSizeArr.push(sizeStr)
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
          setTimeout(() => this.isDisabledAddFilter = false, 60 * 1000)
        } catch (e) {}
      }
    }
  },
  created () {
    this.getSize()
  },
  mounted () {
    setTimeout(() => this.init = true, 1000)
  }
};
</script>

<style lang="scss">
  .filter__item_size {
    width: 111px;

    .dropdown {
      max-height: 330px;

      .filter__options-wrapper {
        max-height: 213px;

        .filter__options-item-size {
          padding-left: 12px;
        }
      }
    }
  }

</style>

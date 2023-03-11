<template lang="pug">
  .filter__item.filter__item_hover.filter__item_gender.pos-rel.df.jcsb.aic.cp(@click="isShowGenderList = !isShowGenderList")
    h3.filter__name.filter__name_gender Пол
    .number-selected-options.pos-abs.ml32px(v-if="currentGender") 1
    IconArrowDownGreyMedium.menu-links__icon-arrow-down.ml19px(
      :active="isShowGenderList" :class="{ 'menu-links__icon-arrow-down-active': isShowGenderList }"
    )
    .filter__dropdown.pos-abs(v-if="isShowGenderList")
      DropDown(@close="isShowGenderList = false" :styles="{ padding: '16px 20px 20px 20px', 'min-width': '166px' }")
        .df.aic
          span.dropdown-header.toe.wsn.oh Выбор пола
          IconTooltip#tooltip-dropdown-language.ml6px
          b-tooltip(target="tooltip-dropdown-language" placement="right" delay="100")
            | Чтобы не выбирать одни и те же <br> данные каждый раз, вы можете <br> настроить их у &nbsp
            nuxt-link.tooltip-link(to="/lk") себя в профиле

        .filter__options-wrapper.filter__options-wrapper_gender
          .filter__options-item.filter__options-item-gender.df.aic.pl10px.cp(
            v-for="genderObj,idx in genderOptions" :key="idx" @click.stop="toggleGender(genderObj)"
            :class="{ 'filter__options-item_active': genderObj.name === currentGender?.name, mt12px: idx === 0, mt3px: idx !== 0 }"
          )
            .df.aic
              Checkbox(:is-checked="genderObj.name === currentGender?.name", styles="top: 3px; left: 3px;")
              span.gender__name.ml8px(:class="{ 'gender__name_active': genderObj.name === currentGender?.name }") {{ genderObj.name }}

</template>

<script>
import { mapActions, mapMutations } from "vuex";
import IconArrowDownGreyMedium from "@/components/ui/icons/arrows/IconArrowDownGreyMedium.vue";
import DropDown from "@/components/ui/blocks/DropDown.vue";
import IconTooltip from "@/components/ui/icons/IconTooltipQuestion.vue";
import Checkbox from "@/components/ui/blocks/Checkbox.vue";

export default {
  name: "GenderFilter",
  components: { Checkbox, IconTooltip, DropDown, IconArrowDownGreyMedium },
  data: () => ({
    genderOptions: [
      { name: 'Мужской', url: 'muzhchinam', param: { gender: 'Мужской', age: 'Взрослый' } },
      { name: 'Женский', url: 'zhenshchinam', param: { gender: 'Женский', age: 'Взрослый' } },
      // { name: 'Мальчики', url: 'muzhchinam', param: { gender: 'Мужской', age: 'Детский' } },
      // { name: 'Девочки', url: 'zhenshchinam', param: { gender: 'Женский', age: 'Детский' } },
      // { name: 'Детский', url: 'detyam', param: { age: 'Детский' } }
    ],
    currentGender: null,
    isShowGenderList: false,
    init: false
  }),
  watch: {
    async currentGender (nV) {
      this.RESET_FILTERS()
      if (nV) {
        this.setFilterParam()
        this.setFindParam()
        this.setUrlParam()
        this.SET_FIND_PARAM({ param: 'price', value: { $in: [ 1, 999999 ] } })
        this.$bvToast.toast('Загружаю фильтры... Подождите.', {
          title: 'BootstrapVue Toast',
          variant: 'info',
          autoHideDelay: 2000
        })
        if (this.init) await this.FETCH_SELECTS()
      } else {
        this.unsetFilterParam()
        this.unsetFindParam()
        this.unsetUrlParam()
        this.SET_SELECTS(null)
      }
      this.TOGGLE_DISABLED(!!nV)
    }
  },
  methods: {
    ...mapActions('selects', [ 'FETCH_SELECTS' ]),
    ...mapMutations('filters', [ 'SET_FILTER_PARAM', 'UNSET_FILTER_PARAM', 'SET_FIND_PARAM', 'UNSET_FIND_PARAM', 'TOGGLE_DISABLED', 'RESET_FILTERS' ]),
    ...mapMutations('catalog', [ 'SET_URL_PARAM', 'UNSET_URL_PARAM' ]),
    ...mapMutations('selects', [ 'SET_SELECTS' ]),
    setFilterParam () {
      this.SET_FILTER_PARAM({
        param: 'gender',
        value: this.currentGender?.param.gender
      })
      this.SET_FILTER_PARAM({
        param: 'age',
        value: this.currentGender?.param.age
      })
    },
    unsetFilterParam () {
      this.UNSET_FILTER_PARAM({ param: 'age' })
      this.UNSET_FILTER_PARAM({ param: 'gender' })
    },
    setFindParam () {
      if (this.currentGender?.param.age) this.SET_FIND_PARAM({
        param: 'age',
        value: this.currentGender?.param.age || null
      })
      if (this.currentGender?.param.gender) this.SET_FIND_PARAM({
        param: 'gender',
        value: this.currentGender?.param.gender || null
      })
    },
    unsetFindParam () {
      this.UNSET_FIND_PARAM({ param: 'age' })
      this.UNSET_FIND_PARAM({ param: 'gender' })
    },
    setUrlParam () {
      this.SET_URL_PARAM({
        param: 'a-gender',
        value: this.currentGender?.url
      })
    },
    unsetUrlParam () {
      this.UNSET_URL_PARAM({ param: 'a-gender' })
    },
    getGender () {
      setTimeout(() => {
        this.genderOptions.forEach(genderObj => {
          if (this.$route.path.includes(genderObj.url)) {
            this.SET_FILTER_PARAM({ param: 'gender', value: genderObj.name })
            this.currentGender = genderObj
          }
        })
      }, 1000)
    },
    toggleGender (genderObj) {
      this.currentGender === genderObj
        ? this.currentGender = null
        : this.currentGender = genderObj
      if (this.currentGender) this.isShowGenderList = false
    }
  },
  created () {
    this.getGender()
    this.setFilterParam()
    this.setFindParam()
    this.setUrlParam()
  },
  mounted () {
    setTimeout(() => this.init = true, 1000)
  }
};
</script>

<style lang="scss">
  .filter__item {
    padding: 18px 16px 19px;
    background: #FFFFFF;

    .filter__name {
      font-family: 'Inter', serif;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 23px;
      color: #303030;
    }

    .filter__name_gender {
      letter-spacing: 0.02em;
    }

    .number-selected-options {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 4px 8px;
      gap: 10px;
      background: #EAECF1;
      border-radius: 100px;
      font-family: 'Inter', serif;
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 15px;
      text-align: center;
      letter-spacing: 0.02em;
      color: #303030;
    }

    .filter__dropdown {
      top: 61px;
      left: 0;

      .dropdown-header {
        font-family: 'Inter', serif;
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 15px;
        letter-spacing: 0.02em;
        text-transform: uppercase;
        color: #B3B3B3;
      }

      .filter__options-wrapper_gender {
        height: auto;
      }

      .filter__options-item {
        height: 32px;
        font-family: 'Inter', serif;
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 15px;
        letter-spacing: 0.02em;
        color: #616161;

        .gender__name_active {
          color: #2D78EA;
        }
      }

      .filter__options-item-gender {
        width: 166px;
      }

      .filter__options-item:hover {
        background: #F6F7F9;
        border-radius: 6px;
      }
      .filter__options-item:hover .checkbox {
        outline: 2px solid #2D78EA;
      }
      .filter__options-item:hover .gender__name {
        color: #2D78EA;
      }
      .filter__options-item_active:hover .checkbox {
        outline: 2px solid #6BA0F0;
        background: #6BA0F0;
      }
      .filter__options-item_active:hover .gender__name {
        color: #6BA0F0;
      }
    }
  }

  .filter__item_hover:hover svg .icon-arrow-down-grey-medium {
    fill: #303030 !important;
  }

  .filter__item:after {
    content: '';
    position: absolute;
    right: 0;
    display: block;
    height: 36px;
    width: 1px;
    background: #EAECF1;
  }

  .filter__item_gender {
    width: 84px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

</style>

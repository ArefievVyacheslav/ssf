<template lang="pug">
  .position-relative
    .df.aic.cp(@click="isShowDropdown = !isShowDropdown")
      component(:is="getIconLanguage(currentLanguage)")
      .language.ml6px {{ currentLanguage.reduction }}

    .position-absolute.t25(v-if="isShowDropdown")
      DropDown(@close="isShowDropdown = false" :styles="{ padding: '8px 12px 12px 12px', display: 'inline-block' }")
        .df.aic
          span.language-header.toe.wsn.oh Выбор страны
          IconTooltip#tooltip-dropdown-language.ml6px.pt2px
          b-tooltip(target="tooltip-dropdown-language" placement="right" delay="100")
            | Чтобы не выбирать одни и те же <br> данные каждый раз, вы можете <br> настроить их у &nbsp
            nuxt-link.tooltip-link(to="/lk") себя в профиле


        .language-item.cp(
          v-for="langObj,idx in languages" :key="idx" @click="currentLanguage = langObj"
          :class="{ 'language-item-active': langObj.reduction === currentLanguage.reduction, mt12px: idx === 0, 'mt3px': idx !== 0 }"
        )
          component(:is="getIconLanguage(langObj)")
          span.country(:class="{ 'country-active': langObj.reduction === currentLanguage.reduction }") {{ langObj.country }}
          IconCheckMarkBlue.ml-auto(v-if="langObj.reduction === currentLanguage.reduction")

</template>

<script>
import { mapMutations } from 'vuex'
import IconRuCountry from "@/components/ui/icons/IconRuCountry.vue";
import IconKzCountry from "@/components/ui/icons/IconKzCountry.vue";
import IconRbCountry from "@/components/ui/icons/IconRbCountry.vue";
import DropDown from "@/components/ui/blocks/DropDown.vue";
import IconTooltip from "@/components/ui/icons/IconTooltip.vue";
import IconCheckMarkBlue from "@/components/ui/icons/IconCheckMarkBlue.vue";

export default {
  name: "choosingCountryProducts",
  components: { IconCheckMarkBlue, IconTooltip, DropDown, IconRbCountry, IconKzCountry, IconRuCountry },
  data () {
    return {
      languages: [
        { country: 'Россия', reduction: 'ru' },
        { country: 'Беларусь', reduction: 'rb' },
        { country: 'Казахстан', reduction: 'kz' },
        { country: 'Армения', reduction: 'am' },
        { country: 'Кыргызстан', reduction: 'kg' },
        { country: 'Азербайджан', reduction: 'az' },
        { country: 'Молдова', reduction: 'md' },
        { country: 'Таджикистан', reduction: 'tj' },
        { country: 'Узбекистан', reduction: 'uz' },
        { country: 'Туркменистан', reduction: 'tm' }
      ],
      currentLanguage: { country: 'Россия', reduction: 'ru' },
      isShowDropdown: false
    }
  },
  watch: {
    currentLanguage: {
      handler () {
        this.setFindParam()
        this.setUrlParam()
      },
      deep: true
    }
  },
  methods: {
    ...mapMutations('productFilters', ['SET_FIND_PARAM']),
    ...mapMutations('categoryUrl', ['SET_URL_PARAM']),
    getIconLanguage: langObj => `Icon${langObj.reduction.charAt(0).toUpperCase() + langObj.reduction.slice(1)}Country`,
    setFindParam () {
      this.SET_FIND_PARAM({
        param: 'delivery',
        value: { $in: [ this.currentLanguage.reduction ] }
      })
    },
    setUrlParam () {
      this.SET_URL_PARAM({
        idx: 'end',
        value: this.currentLanguage.reduction === 'ru' ? '' : this.currentLanguage.reduction
      })
    }
  },
  mounted () {
    this.setFindParam()
    this.setUrlParam()
  }
};
</script>

<style lang="scss">
  .language {
    font-family: 'Inter', serif;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    text-transform: uppercase;
    line-height: 15px;
    letter-spacing: 0.02em;
    color: #616161;
  }

  .language-header {
    font-family: 'Inter',serif;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    letter-spacing: 0.02em;
    color: #303030;
  }

  .language-item {
    display: flex;
    align-items: center;
    min-width: 166px;
    height: 24px;
    padding: 6px 8px;
    gap: 6px;

    .country {
      font-family: 'Inter', serif;
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 15px;
      letter-spacing: 0.02em;
      color: #303030;
    }

    .country-active {
      font-family: 'Inter', serif;
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 15px;
      letter-spacing: 0.02em;
      color: #2D78EA;
    }
  }

  .language-item-active,
  .language-item:hover {
    background: #F6F7F9;
    border-radius: 6px;
  }

  .position-relative {
    position: relative;
  }

  .position-absolute {
    position: absolute;
  }

  .t25 {
    top: 25px;
  }

  .aic {
    align-items: center;
  }

  .mt12px {
    margin-top: 12px;
  }

  .mt3px {
    margin-top: 3px;
  }

  .mt-2px {
    margin-top: -2px;
  }

  .mb12px {
    margin-bottom: 12px;
  }

  .ml-auto {
    margin-left: auto;
  }

  .ml6px {
    margin-left: 6px;
  }

  .ml8px {
    margin-left: 8px;
  }

  .pt2px {
    padding-top: 2px;
  }

  .toe {
    text-overflow: ellipsis;
  }

  .wsn {
    white-space: nowrap;
  }

  .oh {
    overflow: hidden;
  }

</style>

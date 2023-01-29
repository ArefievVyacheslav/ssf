<template lang="pug">
  .menu-top
    .container.df.jcsb
      ChoosingCountryProducts
      .menu-top__link-wrapper.df.aic.pos-rel
        nuxt-link.menu-top__links.hover-text-dark(
          v-for="link,idx in links.slice(0,2)" :key="link.anchor" :to="link.href"
          :class="{ 'mr16px': idx !== links.length - 1, 'help-dropdown': idx === links.length - 1 }"
        ) {{ link.anchor }}
        .df.aic.cp.hover-text-dark(@click="isShowDropdown = !isShowDropdown")
          span.menu-top__links.hover-text-dark {{ links[links.length - 1].anchor }}
          IconArrowDownGreyMini.cp.ml7px(:class="{ 'icon-arrow-down-grey-mini-active': isShowDropdown }")

        .pos-abs.t27px.r237px(v-if="isShowDropdown" @click="isShowDropdown = false")
          DropDown(@close="isShowDropdown = false" :styles="{ padding: '8px 12px 12px 12px', width: '213px' }")
            span.help-dropdown__header.toe.wsn.oh Помощь
            nuxt-link.help-dropdown__link.db.tdn.cp(
              v-for="linkObj,idx in helpLinks" :key="linkObj.href" :to="linkObj.href"
              :class="{ mt12px: idx === 0, 'mt3px': idx !== 0 }"
            ) {{ linkObj.anchor }}

</template>

<script>
import IconArrowDownGreyMini from "@/components/ui/icons/arrows/IconArrowDownGreyMini.vue";
import ChoosingCountryProducts from "@/components/pages/main/header/header-top/ChoosingCountryProducts.vue";
import DropDown from "@/components/ui/blocks/DropDown.vue";

export default {
  name: 'MenuTop',
  components: { DropDown, ChoosingCountryProducts, IconArrowDownGreyMini },
  data: () => ({
    links: [
      { anchor: 'Способы оплаты', href: '/sposoby-oplaty' },
      { anchor: 'Доставка', href: '/dostavka' },
      { anchor: 'Помощь' },
    ],
    helpLinks: [
      { anchor: 'Центр поддержки SalesSearch', href: '/tsentr-podderzhki-sales-search' },
      { anchor: 'Качество товаров', href: '/kachestvo-tovarov' },
      { anchor: 'Как выбрать размер', href: '/kak-vybrat-razmer' },
      { anchor: 'Публичная оферта', href: '/publichnaya-oferta' },
      { anchor: 'Часто задаваемые вопросы', href: '/chasto-zadavayemyye-voprosy' }
    ],
    isShowDropdown: false
  })
}
</script>

<style lang="scss">
  .menu-top {
    padding-top: 8px;
    padding-bottom: 8px;
    background-color: $color-blue;

    .menu-top__link-wrapper {
      margin-top: -2px;

      .menu-top__links {
        font-family: 'Inter', serif;
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 15px;
        letter-spacing: 0.02em;
        color: #616161;
        text-decoration: none;
      }

      .icon-arrow-down.grey-mini {
        transition: .4s;
      }

      .icon-arrow-down-grey-mini-active {
        transform: rotateX(180deg);
        transition: .4s;
      }

      .help-dropdown__header {
        font-family: 'Inter',serif;
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 15px;
        letter-spacing: 0.02em;
        color: #303030;
      }

      .help-dropdown__link {
        display: flex;
        align-items: center;
        min-width: 166px;
        height: 19px;
        padding: 6px 8px;
        gap: 6px;
        font-family: 'Inter', serif;
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 15px;
        letter-spacing: 0.02em;
        color: #303030;
      }

      .help-dropdown__link:hover {
        color: #2D78EA;
        background: #F6F7F9;
        border-radius: 6px;
      }
    }
  }

</style>

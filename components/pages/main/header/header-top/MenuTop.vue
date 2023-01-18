<template lang="pug">
  .menu-top
    .container.df.jcsb
      ChoosingCountryProducts
      .menu-top__link-wrapper.df.aic
        nuxt-link.menu-top__links.hover-text-dark(
          v-for="link,idx in links.slice(0,2)" :key="link.anchor" :to="link.href" :class="{ 'mr16px': idx !== links.length - 1, 'help-dropdown': idx === links.length - 1 }"
        ) {{ link.anchor }}
        .df.aic.cp
          span.menu-top__links.hover-text-dark {{ links[links.length - 1].anchor }}
          IconArrowDownGreyMini.cp.ml7px

</template>

<script>
import IconArrowDownGreyMini from "@/components/ui/icons/IconArrowDownGreyMini.vue";
import ChoosingCountryProducts from "@/components/pages/main/header/header-top/ChoosingCountryProducts.vue";

export default {
  name: 'MenuTop',
  components: { ChoosingCountryProducts, IconArrowDownGreyMini },
  data: () => ({
    links: [
      { anchor: 'Способы оплаты', href: '/sposoby-oplaty' },
      { anchor: 'Доставка', href: '/dostavka' },
      { anchor: 'Помощь' },
    ]
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
    }
  }

  .df {
    display: flex;
  }

  .jcsb {
    justify-content: space-between;
  }

  .mr16px {
    margin-right: 16px;
  }

  .ml7px {
    margin-left: 7px;
  }

  .cp {
    cursor: pointer;
  }

  .hover-text-dark:hover {
    color: #303030 !important;
  }

</style>

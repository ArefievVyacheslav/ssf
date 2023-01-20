<template lang="pug">
  .menu-links.df.jcsb.aic
    .container.df.jcsb
      .df
        nuxt-link.menu-links__logo.tdn(to="/") Sales Search
        MenuLinksCategoryChoice(v-if="$store.state.statistic.numberOfViews !== 1")
      .df.pos-rel
        input.menu-search.mr25px
        IconSearchMenuLinks.pos-abs.t6px.l8px
        component(v-for="componentName in iconsComponents" :key="componentName" :is="componentName").cp.h36px-t1.hover-size-30px-t1

</template>

<script>
import IconSearchMenuLinks from "@/components/ui/icons/menu-links/IconSearchMenuLinks.vue";
import IconJournalMenuLinks from "@/components/ui/icons/menu-links/IconJournalMenuLinks.vue";
import IconDreamboxMenuLinks from "@/components/ui/icons/menu-links/IconDreamboxMenuLinks.vue";
import IconLkMenuLinks from "@/components/ui/icons/menu-links/IconLkMenuLinks.vue";
import IconAllMenuLinks from "@/components/ui/icons/menu-links/IconAllMenuLinks.vue";
import MenuLinksCategoryChoice from "@/components/pages/main/header/header-second-line/MenuLinksCategoryChoice.vue";

export default {
  name: "MenuLinks",
  components: { MenuLinksCategoryChoice, IconAllMenuLinks, IconLkMenuLinks, IconDreamboxMenuLinks, IconJournalMenuLinks, IconSearchMenuLinks },
  data: () => ({ iconsComponents: [ 'IconJournalMenuLinks', 'IconDreamboxMenuLinks', 'IconLkMenuLinks', 'IconAllMenuLinks' ] })
};
</script>

<style lang="scss">
  .menu-links {
    height: 36px;
    padding-top: 24px;
    background: #EAECF1;

    .menu-links__logo {
      font-family: 'Inter', serif;
      font-style: normal;
      font-weight: 500;
      font-size: 24px;
      line-height: 29px;
      color: #212121;
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

  .t38px {
    top: 38px;
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
  .hover-size-30px-t1:hover {
    height: 30px;
    transition: 1s;
  }
  .h36px-t1 {
    height: 36px;
    transition: 1s;
  }

</style>

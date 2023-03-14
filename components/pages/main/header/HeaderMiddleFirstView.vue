<template lang="pug">
  .header-fv
    .container.df.fdc.jcc
      h1.header-fv__h1.m0.p0 Поиск скидок на бренды
      h2.header-fv__desc.p0 Вещи собраны из разделов скидок официальных магазинов
      HeaderCategoryTabLine

</template>

<script>
import HeaderCategoryTabLine from "@/components/pages/main/header/HeaderCategoryTabLine.vue";

export default {
  name: "HeaderMiddleFirstView",
  components: { HeaderCategoryTabLine }
};
</script>

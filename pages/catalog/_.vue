<template lang="pug">
  h6 {{ $store.state.products.products }}

</template>

<script>
// import { mapActions } from "vuex";

export default {
  name: "subCategory",
  layout: 'default'
  // async fetch () {
  //   await this.FETCH_SELECTS()
  // },
  // methods: {
  //   ...mapActions('selects', [ 'FETCH_SELECTS' ])
  // }
};
</script>

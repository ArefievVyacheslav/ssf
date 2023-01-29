export const actions = {
  nuxtServerInit({ commit }, { req }) {
    if (this.$cookies.get('numberOfViews')) commit('statistic/SET_FIRST_VIEW')
  },
  // nuxtClientInit({ state, dispatch, commit }, context) {
  //   // dispatch('selects/FETCH_SELECTS')
  // }
}

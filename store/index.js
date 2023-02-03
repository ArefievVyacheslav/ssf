export const actions = {
  async nuxtServerInit({ commit, dispatch }, ctx) {
    const path = ctx.app.router.history.current.path
    await dispatch('selects/FETCH_SELECTS', path)
    if (this.$cookies.get('numberOfViews')) commit('statistic/SET_FIRST_VIEW')
  },
  // nuxtClientInit({ state, dispatch, commit }, context) {
  //   // console.log(state.filters.filterObj);
  //   // console.log(true);
  //   // dispatch('selects/FETCH_SELECTS')
  // }
}

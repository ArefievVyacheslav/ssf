export const state = () => ({
  selects: null
})

export const actions = {
  async FETCH_SELECTS ({ rootGetters, commit }) {
    const { data } = await this.$axios.post('http://localhost:3004/selects', rootGetters["filters/GET_TOTAL_FILTERS"])
    commit('SET_SELECTS', data)
  }
}

export const mutations = {
  SET_SELECTS: (state, selectsObj) => state.selects = selectsObj
}

// export const getters = {
// }

export const state = () => ({
  products: null,
  quantity: null
})

export const actions = {
  async FETCH_PRODUCTS ({ commit, rootGetters }) {
    const { data } = await this.$axios.post('/products', rootGetters['filters/GET_TOTAL_FILTERS']);
    commit('SET_PRODUCTS_DATA', data)
  }
}

export const mutations = {
  SET_PRODUCTS_DATA: (state, productsData) => Object.keys(productsData).forEach(key => state[ key ] = productsData[ key ])
}

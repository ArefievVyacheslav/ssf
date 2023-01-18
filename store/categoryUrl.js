export const state = () => ({
  url: []
})

// export const actions = {
// }

export const mutations = {
  SET_URL_PARAM: (state, paramObj) => {
    const urlLen = state.url.length
    paramObj.idx === 'end'
      ? state.url.splice(urlLen === 0 ? urlLen : urlLen - 1, 1, paramObj.value)
      : state.url.splice(paramObj.idx, 1, paramObj.value)
  }
}

export const getters = {
  GET_URL: state => '/' + state.url.join('/')
}

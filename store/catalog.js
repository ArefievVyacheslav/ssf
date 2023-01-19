export const state = () => ({
  urlObj: {}
})

// export const actions = {
// }

export const mutations = {
  SET_URL_PARAM: (state, paramObj) => state.urlObj = {
    ...state.urlObj,
    [ paramObj.param ]: paramObj.value
  }
}

export const getters = {
  GET_URL: state => {
    return Object.keys(state.urlObj).sort().reduce((acc, param) => {
      return acc += state.urlObj[ param ] + '/'
    }, '/catalog/').replaceAll('//', '')
  }
}

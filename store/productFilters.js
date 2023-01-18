export const state = () => ({
  findObj: {},
  sortObj: {}
})

// export const actions = {
// }

export const mutations = {
  SET_FIND_PARAM: (state, paramObj) => state.findObj[paramObj.param] = paramObj.value
}

// export const getters = {}

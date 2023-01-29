export const state = () => ({
  collection: null,
  filterObj: {},
  // myFilterObj: {},
  findObj: {},
  sortObj: {},
  isDisabled: true
})

// export const actions = {
// }

export const mutations = {
  SET_COLLECTION: (state, collection) => state.collection = collection,
  SET_FILTER_PARAM: (state, paramObj) => state.filterObj[paramObj.param] = paramObj.value,
  UNSET_FILTER_PARAM: (state, paramObj) => delete state.filterObj[paramObj.param],
  // SET_MY_FILTER_PARAM: (state, paramObj) => state.myFilterObj[paramObj.param] = paramObj.value,
  // UNSET_MY_FILTER_PARAM: (state, paramObj) => delete state.myFilterObj[paramObj.param],
  SET_FIND_PARAM: (state, paramObj) => state.findObj[paramObj.param] = paramObj.value,
  UNSET_FIND_PARAM: (state, paramObj) => delete state.findObj[paramObj.param],
  TOGGLE_DISABLED: (state, condition) =>  state.isDisabled = !condition
}

export const getters = {
  GET_TOTAL_FILTERS: state => ({
    collection: state.collection,
    findObj: state.findObj,
    sortObj: state.sortObj
  })
}

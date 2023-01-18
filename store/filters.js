export const state = () => ({
  collection: null,
  filterObj: {},
  findObj: {},
  sortObj: {}
})

// export const actions = {
// }

export const mutations = {
  SET_COLLECTION: (state, collection) => state.collection = collection,
  SET_FILTER_PARAM: (state, paramObj) => state.filterObj[paramObj.param] = paramObj.value,
  SET_FIND_PARAM: (state, paramObj) => state.findObj[paramObj.param] = paramObj.value
}

export const getters = {
  GET_TOTAL_FILTERS: state => ({
    collection: state.collection,
    findObj: state.findObj,
    sortObj: state.sortObj
  })
}
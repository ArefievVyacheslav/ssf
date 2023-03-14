export const state = () => ({
  collection: null,
  filterObj: {},
  // myFilterObj: {},
  findObj: {},
  sortObj: {},
  pagination: { page: 1, show: 60 },
  currency: 'rub',
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
  SET_SORT_PARAM: (state, sortObj) => state.sortObj = { ...sortObj },
  SET_SHOW_PARAM: (state, showCount) => state.pagination.show = showCount,
  TOGGLE_DISABLED: (state, condition) =>  state.isDisabled = !condition,
  RESET_FILTERS: state => {
    [ state.filterObj, state.findObj ].forEach(filterState => Object.keys(filterState).forEach(key => {
      if (key !== 'category' && key !== 'country' && key !== 'delivery' && key !== 'gender' && key !== 'age') delete filterState[ key ]
    }))
  },
  RESET_EXTRA_FILTERS: state => {
    [ state.filterObj, state.findObj ].forEach(filterState => Object.keys(filterState).forEach(key => {
      const extraFilters = [ 'installment', 'sale', 'shop', 'color', 'brandCountry', 'county', 'season', 'style' ]
      extraFilters.forEach(filterKey => {
        if (Object.keys(filterState).includes(filterKey)) delete filterState[ filterKey ]
      })
    }))
  }
}

export const getters = {
  GET_TOTAL_FILTERS: state => ({
    collection: state.collection,
    findObj: state.findObj,
    sortObj: state.sortObj,
    pagination: state.pagination,
    currency: state.currency
  })
}

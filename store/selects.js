export const state = () => ({
  selects: null
})

export const actions = {
  async FETCH_SELECTS ({ rootState, rootGetters, commit }, path) {
    // запросы на получение селектов из компонентов
    if (!path)  {
      const { data } = await this.$axios.post('/selects', rootGetters["filters/GET_TOTAL_FILTERS"])
      commit('SET_SELECTS', data)
      // если передал путь (только при инициализации проекта на сервере)
    } else {
      if (path === '/') {
        const { data } = await this.$axios.post('/selects', { collection: 'clothes' })
        commit('SET_SELECTS', data)
      }
      // если первая инициализация на категории - отправляю запрос на получение продуктов - (распаршиваю из урла получив селекты)
      if (path.includes('/catalog/')) {
        // стандартные главные параметры
        const languages = [ '/rb', '/kz', '/am', '/kg', '/az', '/md', '/tj', '/uz', '/tm' ]
        const collections = [ 'clothes', 'shoes', 'accessories' ]
        const genders = [ { name: 'Мужской', url: 'muzhchinam' }, { name: 'Женский', url: 'zhenshchinam' } ]
        // формирую объект фильтров
        let collection
        const findObj = { age: 'Взрослый' }
        const sortObj = {}
        const filtersObj = { collection, findObj, sortObj, pagination: { page: 1, show: 60 } }
        // формирую первичный объект фильтров для запроса на селекты
        if (path.includes('/page-')) {
          path.split('/').forEach(paramStr => {
            if (paramStr.includes('page-')) filtersObj.pagination.page = +paramStr.replace('page-', '')
          })
        }
        if (path.includes('/show-')) {
          path.split('/').forEach(paramStr => {
            if (paramStr.includes('show-')) filtersObj.pagination.page = +paramStr.replace('show-', '')
          })
        }
        languages.forEach(lang => path.includes(lang) ? filtersObj.findObj.delivery = { $in: [ lang.replace('/', '') ] } : filtersObj.findObj.delivery = { $in: [ 'ru' ] })
        collections.forEach(collect =>  path.includes(collect) ? filtersObj.collection = collect : null)
        genders.map(genderObj => genderObj.url).forEach((genderUrl,idx) => path.includes(genderUrl) ? filtersObj.findObj.gender = genders[ idx ].name : null)

        const { data } = await this.$axios.post('/selects', filtersObj)
        // получаю категории если есть
        const subcatArr = []
        data.subcat.forEach(subcatObj => {
          if (path.includes(subcatObj?.subcategory_t.toLowerCase())) {
            subcatArr.push(subcatObj)
          }
        })
        if (subcatArr.length) filtersObj.findObj.subcategory = { $in: subcatArr.map(currentSubcatObj => currentSubcatObj.subcategory) }
        // получаю бренды если есть
        const brandArr = []
        data.brand.forEach(brandStr => {
          if (path.includes(brandStr.toLowerCase().replaceAll(' ', '-'))) {
            brandArr.push(brandStr)
          }
        })
        if (brandArr.length) filtersObj.findObj.brand = { $in: brandArr }

        // запрос на получение продуктов
        const products = await this.$axios.post('/products', filtersObj)
        rootState.products.products = products.data.products
        // устанавливаю селекты
        const selects = await this.$axios.post('/selects', filtersObj)
        commit('SET_SELECTS', selects.data)
      }
    }
  }
}

export const mutations = {
  SET_SELECTS: (state, selectsObj) => state.selects = selectsObj
}

// export const getters = {
// }

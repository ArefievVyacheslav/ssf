export const state = () => ({
  numberOfViews: 0,
  isFirstView: true
})

// export const actions = {
// }

export const mutations = {
  SET_NUMBER_VIEWS: state => {
    state.numberOfViews += 1
    if (state.numberOfViews > 0) state.isFirstView = false

    // console.log(this.app.context)
    // this.app.context.$cookies.set('numberOfViews', state.numberOfViews)
    // setCookies(`numberOfViews=${state.numberOfViews};expires=31536000000;path=/`)

  },
  SET_FIRST_VIEW: state => state.isFirstView = false
}

// export const getters = {
// }

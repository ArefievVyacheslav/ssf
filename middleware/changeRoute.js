// export default function({ isServer, store }) {
export default function({ store }) {
    if (!process.server) {
      store.commit('statistic/SET_NUMBER_VIEWS')
      document.cookie = `numberOfViews=${store.state.statistic.numberOfViews};max-age=473040000000;path=/`
    }
}

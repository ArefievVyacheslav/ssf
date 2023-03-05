export default function({ store }) {
    if (!process.server) {
      store.commit('statistic/SET_NUMBER_VIEWS')
      document.cookie = `numberOfViews=${store.state.statistic.numberOfViews};max-age=86400000;path=/`
    }
}

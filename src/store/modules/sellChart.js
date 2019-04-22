const state = {
  seriesData: [],
  xAxisData: [],
  websites: []
}
const mutations = {
  refreshChart(state, chart) {
    state.seriesData = chart.data
    state.xAxisData = chart.xAxis
    state.websites = chart.websites
  }
}
export default {
  namespaced: true,
  state,
  mutations
}

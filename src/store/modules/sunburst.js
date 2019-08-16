const state = {
    sunburst: []

}
const mutations = {
    refreshChart(state, chart) {
        state.sunburst = chart.sunburst
    }
}
export default {
    namespaced: true,
    state,
    mutations
}

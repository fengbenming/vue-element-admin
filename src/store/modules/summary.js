const state = {
    summary: []

}
const mutations = {
    refreshChart(state, chart) {
        state.summary = chart.summary
    }
}
export default {
    namespaced: true,
    state,
    mutations
}

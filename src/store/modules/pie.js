const state = {
    pieData: [],
    pieData1: []

}
const mutations = {
    refreshChart(state, chart) {
        state.pieData = chart.pie
        state.pieData1 = chart.pie1
    }
}
export default {
    namespaced: true,
    state,
    mutations
}

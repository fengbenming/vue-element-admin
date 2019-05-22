const state = {
    list:[],
    date:[],
    listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id",
        websiteName: "aiyaku",
        dateDimension: "d",
        date: [],
        productName: null,
        brand: null,
        cursor: 0,
        total: 0
    },
}
const mutations = {
    refreshChart(state, list) {
        state.list = list
    },
    refreshDate(state,date){
        state.date = date
    },
    refreshPagination(state, listQuery) {
        state.listQuery = listQuery
    }
}
export default {
    namespaced: true,
    state,
    mutations
}

const state = {
  list: [],
  listQuery: {
    page: 1,
    limit: 8,
    importance: undefined,
    title: undefined,
    type: undefined,
    sort: "+id",
    websiteName: "",
    dateDimension: "d",
    productName: "",
    productCode: "",
    keywords: "",
    cursor: 0,
    plusType: "1500",
    greatOrLow: "10",
    websiteNameFilter: ""
  },
}
const mutations = {
  refreshData(state, list) {
    state.list = list
  },
  refreshParam(state,param){
    state.listQuery = param
  }
}
export default {
  namespaced: true,
  state,
  mutations
}

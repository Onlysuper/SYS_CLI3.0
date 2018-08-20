

export default {
  state: {
    list: {}
  },
  getters: {
  },
  mutations: {
    //初始化store orderQuery
    ["MCTTRADINNGORDERSPC_QUERY_INIT"](state) {
      state.rowData = {};
    },
    //设置商品列表profitBilling
    ["MCTTRADINNGORDERSPC_SERROW"](state, list) {
      state.list = list || [];
    }
  },
  actions: {
  }
};

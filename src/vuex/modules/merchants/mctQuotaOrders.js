
import { postAddMctQuotaOrders } from "@src/apis";
import { Toast } from "mint-ui";
import utils from "@src/common/utils";
export default {
  state: {
    list: [],
    //搜索条件
    searchQuery: {},
    //是否搜索操作，便于刷新
    isSearch: false,
    //合计
    sumData: {}
  },
  getters: {
  },
  mutations: {
    //初始化store orderQuery

    ["MCTQUOTAQRDERS_QUERY_INIT"](state) {
      state.list = [];
      state.isSearch = false;
      state.searchQuery = {
        customerNo: "",
        status: ""
      };
    },
    //设置商品列表profitBilling
    ["MCTQUOTAQRDERS_QUERY_SET_LIST"](state, list) {
      state.list = list || [];
    },
    //设置搜索条件
    ["MCTQUOTAQRDERS_QUERY_SET_SEARCH"](state, searchObj) {
      state.searchQuery = Object.assign(state.searchQuery, searchObj)
    },
    //是否开始搜索
    ["MCTQUOTAQRDERS_QUERY_IS_SEARCH"](state, flag) {
      state.isSearch = flag;
    },
    ['MCTQUOTAQRDERS_EDIT'](state, data) {
      state.list = state.list.map(item => {
        if (data.customerNo == item.customerNo) {
          return Object.assign(item, data);
        }
        else return item;
      })
    }
  },
  actions: {
    // 数据列表中获取当前编辑得数据
    getMctQuotaOrders({ commit, dispatch, getters, rootGetters, rootState, state }, obj) {
      return state.list.find(item => item.customerNo == obj.customerNo);
    },
    //编辑
    postEditMctQuotaOrders({ commit, dispatch, getters, rootGetters, rootState, state }, sendData) {
      return postAddMctQuotaOrders()({ ...sendData }).then(data => {
        if (data.code == "00") {
          Toast("操作成功");
          commit("MCTQUOTAQRDERS_EDIT", { ...sendData });
          return true;
        } else {
          Toast(data.msg);
          return false;
        }
      })
    },

  }
};

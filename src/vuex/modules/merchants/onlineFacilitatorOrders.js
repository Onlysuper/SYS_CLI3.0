
import { postUptateFacilitatorOrders } from "@src/apis";
import { Toast } from "mint-ui";
import { todayStr } from "@src/common/dateSerialize";
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

    ["ONLINEFACILITATORORDERS_QUERY_INIT"](state) {
      state.list = [];
      state.isSearch = false;
      state.searchQuery = {
        startTime: "",
        endTime: todayStr + " 23:59:59",
        agentNo: "",
        agentName: "",
        status: ""
      };
      state.sumData = {
        amountCount: 0,
        amountSum: 0,
      }
    },
    //设置商品列表profitBilling
    ["ONLINEFACILITATORORDERS_QUERY_SET_LIST"](state, list) {
      state.list = list || [];
    },
    //设置搜索条件
    ["ONLINEFACILITATORORDERS_QUERY_SET_SEARCH"](state, searchObj) {
      state.searchQuery = Object.assign(state.searchQuery, searchObj)
    },
    //是否开始搜索
    ["ONLINEFACILITATORORDERS_QUERY_IS_SEARCH"](state, flag) {
      state.isSearch = flag;
    },
    ['ONLINEFACILITATORORDERS_EDIT'](state, data) {
      state.list = state.list.map(item => {
        if (data.agentNo == item.agentNo) {
          return Object.assign(item, data);
        }
        else return item;
      })
    },
    //合计
    ["ONLINEFACILITATORORDERS_SUM"](state, data) {
      state.sumData = data;
    }
  },
  actions: {
    // 数据列表中获取当前编辑得数据
    getOnlineFacilitatorOrders({ commit, dispatch, getters, rootGetters, rootState, state }, itemobj) {
      return state.list.find(item => item.agentNo == itemobj.agentNo);
    },
    //编辑
    postOnlineFacilitatorOrders({ commit, dispatch, getters, rootGetters, rootState, state }, sendData) {
      return postUptateFacilitatorOrders()({ ...sendData }).then(data => {
        if (data.code == "00") {
          Toast("操作成功");
          commit("ONLINEFACILITATORORDERS_EDIT", { ...sendData });
          return true;
        } else {
          Toast(data.msg);
          return false;
        }
      })
    },
  }
};


import { getMctManageOrdersSum } from "@src/apis";
import { Toast } from "mint-ui";
import { todayStr, yesterdayStr, today_ } from "@src/common/dateSerialize";
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

    ["MCTMANAGEORDERS_QUERY_INIT"](state) {
      state.list = [];
      state.isSearch = false;
      state.searchQuery = {
        startTime: todayStr + " 00:00:00",
        endTime: todayStr + " 23:59:59",
        customerNo: "",
        comCustomerNo: "",
        phoneNo: "",
        status: "",
        taxNo: "",
        agentNo: "",
        type: "",
        idCard: ""
      };
      state.sumData = {
        amountCount: 0,
        amountSum: 0,
      }
    },
    //设置商品列表profitBilling
    ["MCTMANAGEORDERS_QUERY_SET_LIST"](state, list) {
      state.list = list || [];
    },
    //设置搜索条件
    ["MCTMANAGEORDERS_QUERY_SET_SEARCH"](state, searchObj) {
      state.searchQuery = Object.assign(state.searchQuery, searchObj)
    },
    //是否开始搜索
    ["MCTMANAGEORDERS_QUERY_IS_SEARCH"](state, flag) {
      state.isSearch = flag;
    },
    //合计
    ["MCTMANAGEORDERS_SUM"](state, data) {
      state.sumData = data;
    }
  },
  actions: {
    // 数据列表中获取当前编辑得数据
    getMctManageOrders({ commit, dispatch, getters, rootGetters, rootState, state }, itemobj) {
      return state.list.find(item => (item.createTime == itemobj.createTime) && (item.customerNo == itemobj.customerNo));
    },
    // 合计
    getMctManageOrdersSum({ commit, dispatch, getters, rootGetters, rootState, state }, good) {
      return getMctManageOrdersSum()({ ...state.searchQuery }).then(data => {
        if (data.code == "00") {
          commit("MCTMANAGEORDERS_SUM", data.data);
          return true;
        } else {
          Toast(data.msg);
        }
      })
    }
  }
};

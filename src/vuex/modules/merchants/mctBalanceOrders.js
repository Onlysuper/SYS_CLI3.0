
import { getMctBalanceOrdersOne, getMctManageOrdersSum } from "@src/apis";
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
    //余额查询
    ["MCTBALANCEORDERS_BALANCE"](state, sendObj) {
      let { rowdata, sendata } = sendObj;
      let searchIndex = state.list.findIndex(item => item.customerNo == rowdata.customerNo);
      let searchObj = state.list.find(item => item.customerNo == rowdata.customerNo);
      let newObj = Object.assign(searchObj, {
        accStatus: sendata.accStatus,
        money: sendata.money,
      });
      state.list.splice(searchIndex, 1, newObj)
    },
    //初始化store orderQuery
    ["MCTBALANCEORDERS_QUERY_INIT"](state) {
      state.list = [];
      state.isSearch = false;
      state.searchQuery = {
        customerNo: "",
        startTime: todayStr + " 00:00:00", // 开始时间
        endTime: todayStr + " 23:59:59" // 结束时间
      };
      state.sumData = {
        amountCount: 0,
        amountSum: 0,
      }
    },
    //设置商品列表profitBilling
    ["MCTBALANCEORDERS_QUERY_SET_LIST"](state, list) {
      state.list = list || [];
    },
    //设置搜索条件
    ["MCTBALANCEORDERS_QUERY_SET_SEARCH"](state, searchObj) {
      state.searchQuery = Object.assign(state.searchQuery, searchObj)
    },
    //是否开始搜索
    ["MCTBALANCEORDERS_QUERY_IS_SEARCH"](state, flag) {
      state.isSearch = flag;
    },

    //合计
    ["MCTBALANCEORDERS_SUM"](state, rowdata, sendata) {
      state.sumData = data;
    }
  },
  getters: {
    listget: state => {
      return state.list;
    }
  },
  actions: {
    // 数据列表中获取当前编辑得数据
    getBalanceOrders({ commit, dispatch, getters, rootGetters, rootState, state }, itemobj) {
      return state.list.find(item => item.customerNo == itemobj.customerNo);
    },
    getMctBalanceOrdersOne({ commit, dispatch, getters, rootGetters, rootState, state }, rowdata) {
      return getMctBalanceOrdersOne()({
        customerNo: rowdata.customerNo
      }).then(data => {
        if (data.code == "00") {
          let sendata = JSON.parse(data.data);
          let sendObj = {
            rowdata: rowdata,
            sendata: sendata,
          }
          commit("MCTBALANCEORDERS_BALANCE", sendObj);
          return true;
        } else {
          Toast(data.msg);
        }
      })
    }
  }
};


import { postEditMctPoolOrder, postBatchUpdateMctPoolOrder } from "@src/apis";
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
    ["MCTPOOLORDERS_QUERY_INIT"](state) {
      state.list = [];
      state.isSearch = false;
      state.searchQuery = {
        bussinessType: "",
        customerNo: "",
        orgCode: "",
        payAmount: "",
        status: "",
        startTime: todayStr + " 00:00:00", // 开始时间
        endTime: todayStr + " 23:59:59" // 结束时间
      };
      state.sumData = {
        amountCount: 0,
        amountSum: 0,
      }
    },
    //设置商品列表profitBilling
    ["MCTPOOLORDERS_QUERY_SET_LIST"](state, list) {
      state.list = list || [];
    },
    //设置搜索条件
    ["MCTPOOLORDERS_QUERY_SET_SEARCH"](state, searchObj) {
      state.searchQuery = Object.assign(state.searchQuery, searchObj)
    },
    //是否开始搜索
    ["MCTPOOLORDERS_QUERY_IS_SEARCH"](state, flag) {
      state.isSearch = flag;
    },
    //添加商户
    ["EDITMCTPOOLORDER_ADD"](state, data) {
      state.list.push(data)
    },
    //更新
    ["EDITMCTPOOLORDER_UPDATE"](state, data) {
      state.list = state.list.map(item => {
        if (data.customerNo == item.customerNo && data.createTime == item.createTime) return data;
        else return item;
      })
    },
    //批量修改
    ["EDITMCTPOOLORDER_UPDATE"](state, data) {
      state.list = state.list.map(item => {
        if (data.customerNo == item.customerNo && data.createTime == item.createTime) return data;
        else return item;
      })
    }
  },
  actions: {
    // 数据列表中获取当前编辑得数据
    getPoolOrders({ commit, dispatch, getters, rootGetters, rootState, state }, itemobj) {
      return state.list.find(item => (item.createTime == itemobj.createTime) && (item.customerNo == itemobj.customerNo));
    },
    postEditMctPoolOrder({ commit, dispatch, getters, rootGetters, rootState, state }, rowdata) {
      return postEditMctPoolOrder()({
        ...rowdata
      }).then(data => {
        if (data.code == "00") {
          commit("EDITMCTPOOLORDER_UPDATE", rowdata);
          return true;
        } else {
          Toast(data.msg);
        }
      })
    },
    postAddMctPoolOrder({ commit, dispatch, getters, rootGetters, rootState, state }, rowdata) {
      return postEditMctPoolOrder()({
        ...rowdata
      }).then(data => {
        if (data.code == "00") {
          commit("EDITMCTPOOLORDER_Add", rowdata);
          return true;
        } else {
          Toast(data.msg);
        }
      })
    },
    postBatchUpdateMctPoolOrder({ commit, dispatch, getters, rootGetters, rootState, state }, rowdata) {
      return postBatchUpdateMctPoolOrder()({
        ...rowdata
      }).then(data => {
        if (data.code == "00") {
          commit("EDITMCTPOOLORDER_UPDATE", rowdata);
          return true;
        } else {
          Toast(data.msg);
        }
      })
    },
    // postBatchUpdateMctPoolOrder

  }
};

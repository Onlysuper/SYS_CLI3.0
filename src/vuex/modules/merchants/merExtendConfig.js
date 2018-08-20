
import { postUpdateMerExtendConfigs } from "@src/apis";
import { Toast } from "mint-ui";
import { todayStr } from "@src/common/dateSerialize";
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

    ["MEREXTENDCONFIG_QUERY_INIT"](state) {
      state.list = [];
      state.isSearch = false;
      state.searchQuery = {
        customerNo: "",
        jumpCustomer: "",
        startTime: "",
        endTime: todayStr + " 23:59:59",
      };
    },
    //设置商品列表profitBilling
    ["MEREXTENDCONFIG_QUERY_SET_LIST"](state, list) {
      state.list = list || [];
    },
    //设置搜索条件
    ["MEREXTENDCONFIG_QUERY_SET_SEARCH"](state, searchObj) {
      state.searchQuery = Object.assign(state.searchQuery, searchObj)
    },
    //是否开始搜索
    ["MEREXTENDCONFIG_QUERY_IS_SEARCH"](state, flag) {
      state.isSearch = flag;
    },
    ['MEREXTENDCONFIG_EDIT'](state, data) {
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
    getMerExtendConfigs({ commit, dispatch, getters, rootGetters, rootState, state }, obj) {
      return state.list.find(item => item.customerNo == obj.customerNo);
    },
    //编辑
    postUpdateMerExtendConfigs({ commit, dispatch, getters, rootGetters, rootState, state }, sendData) {
      return postUpdateMerExtendConfigs()({ ...sendData }).then(data => {
        if (data.code == "00") {
          Toast("操作成功");
          commit("MEREXTENDCONFIG_EDIT", { ...sendData });
          return true;
        } else {
          Toast(data.msg);
          return false;
        }
      })
    },

  }
};

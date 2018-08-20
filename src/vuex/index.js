import Vue from "vue";
import Vuex from "vuex";
import userInfoAndMenu from "@src/vuex/userInfoAndMenu/userInfoAndMenu"
// import topSearch from "@src/vuex/topSearch/topSearch"
import Base from "@src/vuex/base/base"
import tagsView from "@src/vuex/tagsView/tagsView"
import fullScreen from "@src/vuex/fullScreen/fullScreen"
import acceptMessage from "@src/vuex/acceptMessage/acceptMessage"

import company from "./company"
// 以下为手机端的vuex
import {
    customerGoods, customerManage, profitBilling, convergePayComm, agent, billCount, billRecord, billDay, billStandard,
    empowerCheck, empowerManage, empowerPurchase, empowerTransfer, customerProduct, enterpriseSupply, orderQuery, customerVersion,
    settle, customerSettle, buriedPoint, bankCustomer, changeBill, email,
    mctPayforOrders, mctTradingOrders, mctManageOrders, onlineFacilitatorOrders, mctQuotaOrders, merExtendConfig, mctBalanceOrders,
    mctPoolOrders
} from "./modules";

import {
    mctTradingOrders_Pc,
    mctManageOrders_Pc
} from "./modulesPc";
Vue.use(Vuex);

const store = new Vuex.Store({
    strict: true,
    state: {
        scrollTop: {

        }
    },
    getters: {
    },
    mutations: {
        ["SAVE_SCROLLTOP"](state, page) {
            state.scrollTop[page.name] = page.scrollTopVal;
        },
    },
    actions: {
        delete() {
        }
    },
    modules: {
        userInfoAndMenu: userInfoAndMenu,
        // topSearch: topSearch,
        // InputValidation: InputValidation,
        Base: Base,
        tagsView: tagsView,
        customerGoods,
        customerManage,
        profitBilling,
        convergePayComm,
        fullScreen,
        agent,
        billCount,
        billRecord,
        billDay,
        billStandard,
        empowerCheck,
        empowerManage,
        empowerPurchase,
        empowerTransfer,
        customerProduct,
        enterpriseSupply,
        orderQuery,
        customerVersion,
        settle,
        customerSettle,
        buriedPoint,
        acceptMessage,
        bankCustomer,
        changeBill,
        email,
        mctPayforOrders,
        mctTradingOrders,
        mctManageOrders,
        onlineFacilitatorOrders,
        mctQuotaOrders,
        merExtendConfig,
        mctPoolOrders,
        // pc端
        mctTradingOrders_Pc,
        mctManageOrders_Pc,
        mctBalanceOrders,
        company
    }
})
export default store;

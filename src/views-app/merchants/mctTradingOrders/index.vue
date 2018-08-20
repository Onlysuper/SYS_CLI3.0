<template>
  <div class="page">
    <full-page ref="FullPage">
      <mt-header slot="header" :title="$route.meta.pageTitle">
        <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
        <mt-button slot="right" v-if="adminFilter('mer_trading_orders_total')" style="float:left" :disabled="false" type="danger" @click="sumHandle()">合计</mt-button>
        <mt-button slot="right" :disabled="false" type="danger" @click="$router.push({path:'./search'})">搜索</mt-button>
      </mt-header>
      <myp-popup-actions slot="header" :actions="popupActions" v-model="popupActionsVisible"></myp-popup-actions>
      <slider-nav v-model="routeMenuCode" slot="header" :munes="munes"></slider-nav>
      <myp-loadmore-api class="list" ref="MypLoadmoreApi" :api="api" @watchDataList="watchDataList">
        <myp-cell-pannel class="spacing-20" v-for="(item,index) in list" :key="index" :title="item.customerName">
          <mt-badge slot="badge" class="g-min-badge" size="small" :color="filterColor(item.status,'mctTradingStatus')">{{item.status | statusFilter('mctTradingStatus')}}</mt-badge>
          <myp-cell class="list-item" @click="detail(item)">
            <!-- 详情 -->
            <table>
              <myp-tr title="创建时间">{{item.createTime}}</myp-tr>
              <myp-tr title="系统订单编号">{{item.orderNo}}</myp-tr>
              <myp-tr title="商户订单号">{{item.companyOrderNo}}</myp-tr>
              <myp-tr v-if="!isCustomer" title="商户编号">{{item.customerNo}}</myp-tr>
              <myp-tr v-if="!isCustomer" title="商户名称">{{item.customerName}}</myp-tr>
              <myp-tr title="订单金额（元）">{{utils.accMul(item.amount, 0.01)}}</myp-tr>
              <myp-tr title="交易类型">
                {{item.payType | statusFilter("mctTradingPayType")}}
              </myp-tr>
              <myp-tr title="订单类型">
                {{item.transType | statusFilter("mctTradingTransType")}}
              </myp-tr>
              <!-- <myp-tr title="交易金额">{{utils.accMul(item.amount, 0.01)}}元</myp-tr>-->
            </table>
          </myp-cell>
        </myp-cell-pannel>
      </myp-loadmore-api>
    </full-page>
    <sum ref="sum"></sum>
  </div>
</template>

<script>
import sum from "./sum";
import SliderNav from "@src/components-app/SliderNav";
import MypPopupActions from "@src/components-app/MypPopupActions";
import { scrollBehavior, filterColor } from "@src/common/mixins";
import { getMctTradingOrders } from "@src/apis";
import { mapState, mapActions } from "vuex";
import utils from "@src/common/utils";
export default {
  mixins: [scrollBehavior, filterColor],
  components: { SliderNav, MypPopupActions, sum },
  data() {
    return {
      popupActionsVisible: false,
      popupActions: [
        {
          name: "合计",
          icon: "icon-admin",
          method: () => {
            this.sum();
          }
        }
      ],
      munes: this.$store.state.userInfoAndMenu.menuList[
        this.$route.query["menuIndex"]
      ].child,
      routeMenuCode: "",
      api: getMctTradingOrders
    };
  },
  created() {
    this.$store.commit("MCTTRADINGORDERS_QUERY_INIT");
  },
  computed: {
    ...mapState({
      list: state => state.mctTradingOrders.list,
      isSearch: state => state.mctTradingOrders.isSearch,
      searchQuery: state => state.mctTradingOrders.searchQuery,
      sumData: state => state.mctTradingOrders.sumData
    }),
    isCustomer() {
      return this.$store.state.userInfoAndMenu.isCustomer;
    }
  },
  mounted() {
    this.$refs.MypLoadmoreApi.load(this.searchQuery);
  },
  watch: {
    isSearch(flag) {
      flag && this.$refs.MypLoadmoreApi.load(this.searchQuery);
    }
  },
  methods: {
    ...mapActions(["getMctTradingOrdersSum"]),
    sumHandle() {
      this.getMctTradingOrdersSum().then(isSuccess => {
        isSuccess && this.$refs.sum.open(this.sumData);
      });
    },
    watchDataList(watchDataList) {
      this.$store.commit("MCTTRADINGORDERS_QUERY_SET_LIST", watchDataList);
      this.$store.commit("MCTTRADINGORDERS_QUERY_IS_SEARCH", false);
    },
    toUrl(type, itemId, rowdata) {
      if (type == "DETAIL") {
        this.$router.push({
          path: "./detail/" + itemId,
          query: {
            type: type,
            createTime: rowdata.createTime
          }
        });
      }
    },
    detail(rowdata) {
      this.toUrl("DETAIL", rowdata.customerNo, rowdata);
    }
  },
  activated() {
    this.routeMenuCode = this.$route.name;
  }
};
</script>

<style lang="scss" scoped>
</style>

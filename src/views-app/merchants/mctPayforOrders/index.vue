<template>
  <div class="page">
    <full-page ref="FullPage">
      <mt-header slot="header" :title="$route.meta.pageTitle">
        <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
        <mt-button v-if="adminFilter('mer_payfor_orders_total')" slot="right" style="float:left" :disabled="false" type="danger" @click="sumHandle()">合计</mt-button>
        <mt-button slot="right" :disabled="false" type="danger" @click="$router.push({path:'./search'})">搜索</mt-button>
      </mt-header>
      <slider-nav v-model="routeMenuCode" slot="header" :munes="munes"></slider-nav>
      <myp-loadmore-api class="list" ref="MypLoadmoreApi" :api="api" @watchDataList="watchDataList">
        <myp-cell-pannel class="spacing-20" v-for="(item,index) in list" :key="index" :title="item.customerName">
          <mt-badge slot="badge" class="g-min-badge" size="small" :color="filterColor(item.status,'mctPayforStatus')">{{item.status | statusFilter('mctPayforStatus')}}</mt-badge>
          <mt-badge slot="badge" class="g-min-badge" size="small" :color="filterColor(item.accountType,'mctPayforAccountType')">{{item.accountType | statusFilter('mctPayforAccountType')}}</mt-badge>
          <myp-cell class="list-item" @click="detail(item)">
            <!-- 详情 -->
            <table>
              <myp-tr title="创建时间">{{item.createTime}}</myp-tr>
              <myp-tr title="系统订单号">{{item.orderNo}}</myp-tr>
              <myp-tr :title="isCustomer?'订单号':'商户订单号'">{{item.companyOrderNo}}</myp-tr>
              <myp-tr v-if="!isCustomer" title="商户编号">{{item.customerNo}}</myp-tr>
              <myp-tr title="代付金额">
                {{utils.accMul(item.settleAmount,0.01)}}
              </myp-tr>
              <myp-tr title="账户名称">{{item.accountName}}</myp-tr>
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
import { getMctPayforOrders } from "@src/apis";
import { mapState, mapActions } from "vuex";
import utils from "@src/common/utils";
export default {
  mixins: [scrollBehavior, filterColor],
  components: { SliderNav, MypPopupActions, sum },
  data() {
    return {
      popupActionsVisible: false,
      munes: this.$store.state.userInfoAndMenu.menuList[
        this.$route.query["menuIndex"]
      ].child,
      routeMenuCode: "",
      api: getMctPayforOrders
    };
  },
  created() {
    this.$store.commit("MCTPAYfORORDERS_QUERY_INIT");
  },
  computed: {
    ...mapState({
      list: state => state.mctPayforOrders.list,
      isSearch: state => state.mctPayforOrders.isSearch,
      searchQuery: state => state.mctPayforOrders.searchQuery,
      sumData: state => state.mctPayforOrders.sumData
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
    ...mapActions(["getMctPayforOrdersSum"]),
    sumHandle() {
      this.getMctPayforOrdersSum().then(isSuccess => {
        isSuccess && this.$refs.sum.open(this.sumData);
      });
    },
    watchDataList(watchDataList) {
      this.$store.commit("MCTPAYfORORDERS_QUERY_SET_LIST", watchDataList);
      this.$store.commit("MCTPAYfORORDERS_QUERY_IS_SEARCH", false);
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
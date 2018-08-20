<template>
  <!-- 商户池 -->
  <div class="page">
    <full-page ref="FullPage">
      <mt-header slot="header" :title="$route.meta.pageTitle">
        <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
        <mt-button slot="right" style="float:left" :disabled="false" type="danger" @click="$router.push({path:'./search'})">搜索</mt-button>
        <mt-button slot="right" type="danger" @click="popupActionsVisible = !popupActionsVisible">...</mt-button>
      </mt-header>
      <myp-popup-actions slot="header" :actions="popupActions" v-model="popupActionsVisible"></myp-popup-actions>
      <slider-nav v-model="routeMenuCode" slot="header" :munes="munes"></slider-nav>
      <myp-loadmore-api class="list" ref="MypLoadmoreApi" :api="api" @watchDataList="watchDataList">
        <myp-cell-pannel class="spacing-20" v-for="(item,index) in list" :key="index" :title="item.customerName">
          <div slot="btn" v-if="adminFilter('mer_pool_orders_edit')" @click="edit(item)">编辑</div>
          <mt-badge v-if="item.status?true:false" slot="badge" class="g-min-badge" size="small" :color="filterColor(item.status,'mctPoolStatus')">{{item.status | statusFilter('mctPoolStatus')}}</mt-badge>
          <myp-cell class="list-item" @click="detail(item)">
            <!-- 详情 -->
            <table>
              <myp-tr title="创建时间">{{item.createTime}}</myp-tr>
              <myp-tr title="更新时间">{{item.lastUpdateTime}}</myp-tr>
              <myp-tr title="商户编号">{{item.customerNo}}</myp-tr>
              <myp-tr title="业务类型"> {{item.bussinessType | statusFilter("mctPoolBussinessType")}}</myp-tr>
              <myp-tr title="交易金额等级"> {{item.payAmount | statusFilter("mctPoolPayAmount")}}</myp-tr>
              <myp-tr title="是否万能商户"> {{item.universalFlag | statusFilter("mctUniversalFlagtatus")}}</myp-tr>
              <myp-tr title="地区编码"> {{item.orgCode?utils.findCity(item.orgCode).resultAddr:""}}</myp-tr>
              <myp-tr title="经营开始时间"> {{item.timeBegin}}</myp-tr>
              <myp-tr title="经营结束时间"> {{item.timeEnd}}</myp-tr>
              <myp-tr title="日交易限额(分)"> {{item.dayAmountLimit}}</myp-tr>
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
import { getMctBalanceOrders, getMctPoolOrders } from "@src/apis";
import { mapState, mapActions, mapGetters } from "vuex";
import utils from "@src/common/utils";
export default {
  mixins: [scrollBehavior, filterColor],
  components: { SliderNav, MypPopupActions, sum },
  data() {
    return {
      searchBalanceNow: {},
      popupActionsVisible: false,
      popupActions: [],
      munes: this.$store.state.userInfoAndMenu.menuList[
        this.$route.query["menuIndex"]
      ].child,
      routeMenuCode: "",
      api: getMctPoolOrders
    };
  },
  created() {
    if (this.adminFilter('mer_pool_orders_add')) {
      this.popupActions.push(
        {
          name: "新增",
          icon: "icon-admin",
          method: () => {
            this.toUrl('ADD', '')
          }
        }
      )
    }
    if (this.adminFilter('mer_pool_orders_add')) {
      this.popupActions.push(
        {
          name: "批量修改",
          icon: "icon-admin",
          method: () => {
            this.toUrl('UPDATE', '')
          }
        }
      )
    }
    this.$store.commit("MCTPOOLORDERS_QUERY_INIT");
  },
  computed: {
    ...mapState({
      list: state => state.mctPoolOrders.list,
      isSearch: state => state.mctPoolOrders.isSearch,
      searchQuery: state => state.mctPoolOrders.searchQuery,
      sumData: state => state.mctPoolOrders.sumData
    }),
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
    ...mapActions(["getMctManageOrdersSum", "getMctBalanceOrdersOne"]),
    // 查询余额
    searchBalance(rowdata) {
      // let
      this.searchBalanceNow = { ...rowdata };
      this.getMctBalanceOrdersOne(rowdata).then((isSuccess) => {
        if (isSuccess) {
          console.log(this.list);
          // Object.assign(this.list, this.list);
        }
      });
    },
    sumHandle() {
      this.getMctManageOrdersSum().then(isSuccess => {
        isSuccess && this.$refs.sum.open(this.sumData);
      });
    },
    watchDataList(watchDataList) {
      this.$store.commit("MCTPOOLORDERS_QUERY_SET_LIST", watchDataList);
      this.$store.commit("MCTPOOLORDERS_QUERY_IS_SEARCH", false);
    },
    edit(item) {
      this.toUrl("EDIT", item.customerNo, item)
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
      if (type == "EDIT") {
        this.$router.push({
          path: "./edit/" + itemId,
          query: {
            type: type,
            createTime: rowdata.createTime
          }
        });
      }
      if (type == "ADD") {
        this.$router.push({
          path: "./add",
          query: {
            type: type
          }
        });
      }
      if (type == "UPDATE") {
        this.$router.push({
          path: "./batchupdate",
          query: {
            type: type
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
<template>
  <div class="page">
    <full-page ref="FullPage">
      <mt-header slot="header" :title="$route.meta.pageTitle">
        <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
        <mt-button v-if="adminFilter('mct_quotas_orders_add')" slot="right" style="float:left" :disabled="false" type="danger" @click="toUrl('ADD','')">新增</mt-button>
        <mt-button slot="right" :disabled="false" type="danger" @click="$router.push({path:'./search'})">搜索</mt-button>
      </mt-header>
      <slider-nav v-model="routeMenuCode" slot="header" :munes="munes"></slider-nav>
      <myp-loadmore-api class="list" ref="MypLoadmoreApi" :api="api" @watchDataList="watchDataList">
        <myp-cell-pannel class="spacing-20" v-for="(item,index) in list" :key="index" :title="item.customerNo">
          <mt-badge slot="badge" class="g-min-badge" size="small" :color="filterColor(item.status,'mctQuotaOrdersStatus')">{{item.status | statusFilter('mctQuotaOrdersStatus')}}</mt-badge>
          <div slot="btn" v-if="adminFilter('mct_quotas_orders_add')" @click="toUrl('EDIT',item.customerNo)">编辑</div>
          <myp-cell class="list-item" @click="detail(item)">
            <!-- 详情 -->
            <table>
              <myp-tr title="创建时间">{{item.createTime}}</myp-tr>
              <myp-tr title="更新时间">{{item.lastUpdateTime}}</myp-tr>
              <myp-tr title="商户编号">{{item.customerNo}}</myp-tr>
              <myp-tr title="单笔交易限额(分)">{{item.singleAmountLimit}}</myp-tr>
              <myp-tr title="日交易限额(分)">{{item.dayAmountLimit}}</myp-tr>
              <myp-tr title="当前额度(分)">{{item.currentAmount}}</myp-tr>
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
import { getMctQuotaOrders } from "@src/apis";
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
      api: getMctQuotaOrders
    };
  },
  created() {
    this.$store.commit("MCTQUOTAQRDERS_QUERY_INIT");
  },
  computed: {
    ...mapState({
      list: state => state.mctQuotaOrders.list,
      isSearch: state => state.mctQuotaOrders.isSearch,
      searchQuery: state => state.mctQuotaOrders.searchQuery,
    })
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
    watchDataList(watchDataList) {
      this.$store.commit("MCTQUOTAQRDERS_QUERY_SET_LIST", watchDataList);
      this.$store.commit("MCTQUOTAQRDERS_QUERY_IS_SEARCH", false);
    },
    toUrl(type, itemId) {
      if (type == "DETAIL") {
        this.$router.push({
          path: "./detail/" + itemId,
          query: {
            type: type
          }
        });
      }
      if (type == "EDIT") {
        this.$router.push({
          path: "./edit/" + itemId,
          query: {
            type: type
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
    },
    detail(rowdata) {
      this.toUrl("DETAIL", rowdata.customerNo);
    }
  },
  activated() {
    this.routeMenuCode = this.$route.name;
  }
};
</script>

<style lang="scss" scoped>
</style>
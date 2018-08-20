<template>
  <div class="page">
    <full-page ref="FullPage">
      <mt-header slot="header" :title="$route.meta.pageTitle">
        <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
        <mt-button slot="right" v-if="adminFilter('online_facilitator_orders_add')" style="float:left" :disabled="false" type="danger" @click="toUrl('ADD','')">新增</mt-button>
        <mt-button slot="right" :disabled="false" type="danger" @click="$router.push({path:'./search'})">搜索</mt-button>
      </mt-header>
      <slider-nav v-model="routeMenuCode" slot="header" :munes="munes"></slider-nav>
      <myp-loadmore-api class="list" ref="MypLoadmoreApi" :api="api" @watchDataList="watchDataList">
        <myp-cell-pannel class="spacing-20" v-for="(item,index) in list" :key="index" :title="item.customerName">
          <div slot="btn" v-if="adminFilter('online_facilitator_orders_add')" @click="toUrl('EDIT',item.agentNo)">编辑</div>
          <mt-badge slot="badge" class="g-min-badge" size="small" :color="filterColor(item.status,'onlineFacilitatorOrdersStatus')">{{item.status | statusFilter('onlineFacilitatorOrdersStatus')}}</mt-badge>
          <myp-cell class="list-item" @click="detail(item)">
            <!-- 详情 -->
            <table>
              <myp-tr title="创建时间">{{item.createTime}}</myp-tr>
              <myp-tr title="服务商名称">{{item.agentName}}</myp-tr>
              <myp-tr title="服务商编号">{{item.agentNo}}</myp-tr>
              <myp-tr title="中付代理商编号">{{item.zfAgentNo}}</myp-tr>
              <myp-tr title="中付签名Key">{{item.zfSignKey}}</myp-tr>
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
import { getOnlineFacilitatorOrders } from "@src/apis";
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
      api: getOnlineFacilitatorOrders
    };
  },
  created() {
    this.$store.commit("ONLINEFACILITATORORDERS_QUERY_INIT");
  },
  computed: {
    ...mapState({
      list: state => state.onlineFacilitatorOrders.list,
      isSearch: state => state.onlineFacilitatorOrders.isSearch,
      searchQuery: state => state.onlineFacilitatorOrders.searchQuery,
      sumData: state => state.onlineFacilitatorOrders.sumData
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
    sumHandle() {
      this.getMctPayforOrdersSum().then(isSuccess => {
        isSuccess && this.$refs.sum.open(this.sumData);
      });
    },
    watchDataList(watchDataList) {
      this.$store.commit("ONLINEFACILITATORORDERS_QUERY_SET_LIST", watchDataList);
      this.$store.commit("ONLINEFACILITATORORDERS_QUERY_IS_SEARCH", false);
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
      this.toUrl("DETAIL", rowdata.agentNo, rowdata);
    }
  },
  activated() {
    this.routeMenuCode = this.$route.name;
  }
};
</script>

<style lang="scss" scoped>
</style>
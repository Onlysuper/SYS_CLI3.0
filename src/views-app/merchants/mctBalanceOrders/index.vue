<template>
  <div class="page">
    <full-page ref="FullPage">
      <mt-header slot="header" :title="$route.meta.pageTitle">
        <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
        <!-- <mt-button slot="right" style="float:left" :disabled="false" type="danger" @click="sumHandle()">合计</mt-button> -->
        <!-- <mt-button v-if="adminFilter('mct_quotas_orders_add')" slot="right" style="float:left" :disabled="false" type="danger" @click="toUrl('ADD','')">新增</mt-button> -->
        <mt-button v-if="!isCustomer" slot="right" :disabled="false" type="danger" @click="$router.push({path:'./search'})">搜索</mt-button>
      </mt-header>

      <myp-popup-actions slot="header" :actions="popupActions" v-model="popupActionsVisible"></myp-popup-actions>
      <slider-nav v-model="routeMenuCode" slot="header" :munes="munes"></slider-nav>
      <div class="customerBalance-box" v-show="isCustomer">
        <div class="container">
          <p class="text">
            {{customerBalance}}
          </p>
          <p>
            <mt-badge v-if="customerBalanceStatus" slot="badge" class="g-min-badge" size="small" :color="filterColor(customerBalanceStatus,'merBalanceAccStatus')">{{customerBalanceStatus | statusFilter('merBalanceAccStatus')}}</mt-badge>
          </p>
        </div>
        <mt-button @click="customerBalanceSc" v-if="isCustomer&&adminFilter('mer_balance_orders_search_balance')" type="primary">查询余额</mt-button>
      </div>
      <myp-loadmore-api v-show="!isCustomer" class="list" ref="MypLoadmoreApi" :api="api" @watchDataList="watchDataList">
        <myp-cell-pannel class="spacing-20" v-for="(item,index) in list" :key="index" :title="item.customerName">
          <div v-if="adminFilter('mer_balance_orders_search_balance')" slot="btn" @click="searchBalance(item)">查询余额</div>
          <mt-badge v-if="item.accStatus?true:false" slot="badge" class="g-min-badge" size="small" :color="filterColor(item.accStatus,'merBalanceAccStatus')">{{item.accStatus | statusFilter('merBalanceAccStatus')}}</mt-badge>
          <myp-cell class="list-item" @click="detail(item)">
            <!-- 详情 -->
            <table>
              <myp-tr title="创建时间">{{item.createTime}}</myp-tr>
              <myp-tr title="更新时间">{{item.lastUpdateTime}}</myp-tr>
              <myp-tr title="商户编号">{{item.customerNo}}</myp-tr>
              <myp-tr title="代付账号">{{item.accountNo}}</myp-tr>
              <myp-tr title="商户秘钥">{{item.customerKey}}</myp-tr>
              <myp-tr title="账户余额">{{item.money}}</myp-tr>
            </table>
          </myp-cell>
        </myp-cell-pannel>
      </myp-loadmore-api>
    </full-page>
    <sum ref="sum"></sum>
  </div>
</template>
<style lang="scss" scoped>
@import "../../../assets/scss/base.scss";
.customerBalance-box {
  padding: 20 * $rem;
  text-align: center;
  background: #fff;
  .container {
    height: 300 * $rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    span {
      flex: 0;
    }
    .text {
      font-size: 56 * $rem;
      padding: 20 * $rem;
    }
  }
  button {
    width: 100%;
  }
}
</style>

<script>
import sum from "./sum";
import SliderNav from "@src/components-app/SliderNav";
import MypPopupActions from "@src/components-app/MypPopupActions";
import { scrollBehavior, filterColor } from "@src/common/mixins";
import { getMctBalanceOrders, getMctBalanceOrdersOne } from "@src/apis";
import { mapState, mapActions, mapGetters } from "vuex";
import utils from "@src/common/utils";
export default {
  mixins: [scrollBehavior, filterColor],
  components: { SliderNav, MypPopupActions, sum },
  data() {
    var isCustomer = this.$store.state.userInfoAndMenu.isCustomer;
    return {
      customerBalance: "",
      customerBalanceStatus: "",
      searchBalanceNow: {},
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
      api: getMctBalanceOrders
    };
  },
  created() {
    this.$store.commit("MCTBALANCEORDERS_QUERY_INIT");
  },
  computed: {
    ...mapState({
      list: state => state.mctBalanceOrders.list,
      isSearch: state => state.mctBalanceOrders.isSearch,
      searchQuery: state => state.mctBalanceOrders.searchQuery,
      sumData: state => state.mctBalanceOrders.sumData
    }),
    isCustomer() {
      return this.$store.state.userInfoAndMenu.isCustomer
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
    ...mapActions(["getMctManageOrdersSum", "getMctBalanceOrdersOne"]),
    //商户查询余额
    customerBalanceSc() {
      getMctBalanceOrdersOne()({}).then(res => {
        if (res.code == "00") {
          let getData = JSON.parse(res.data);
          if (getData.money != "" && getData.money != null && getData.money != undefined) {
            this.customerBalance = "¥" + utils.accMul(getData.money, 0.01);
          } else {
            this.customerBalance = getData.money
          }
          this.customerBalanceStatus = getData.accStatus;
        }
      })
    },
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
      this.$store.commit("MCTBALANCEORDERS_QUERY_SET_LIST", watchDataList);
      this.$store.commit("MCTBALANCEORDERS_QUERY_IS_SEARCH", false);
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
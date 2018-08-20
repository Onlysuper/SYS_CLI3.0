<template>
  <!-- 物料入库 -->
  <full-page>
    <mt-header slot="header" :title="$route.meta.pageTitle + pageTitle[pageType]">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
    </mt-header>
    <view-radius class="split-box">
      <input-wrapper>
        <mt-cell value="" title="商户订单号">
          <span>{{dataList.companyOrderNo}}</span>
        </mt-cell>
        <mt-cell value="" title="系统订单号">
          <span>{{dataList.orderNo}}</span>
        </mt-cell>
        <mt-cell title="订单状态">
          <span>
            {{dataList.status | statusFilter("mctTradingStatus")}}
          </span>
        </mt-cell>
        <mt-cell title="订单金额(元)">
          <span>
            {{utils.accMul(dataList.amount, 0.01)}}
          </span>
        </mt-cell>
        <mt-cell title="订单手续费(元):">
          <span>
            {{utils.accMul(dataList.fee, 0.01)}}元
          </span>
        </mt-cell>
        <mt-cell title="费率:">
          <span>
            {{utils.accMul(dataList.feeRate, 100)+'%'}}
          </span>
        </mt-cell>
        <mt-cell title="币种">
          <span>{{dataList.currency}}</span>
        </mt-cell>
        <mt-cell title="结算类型">
          <span>
            {{dataList.settleMode}}
          </span>
        </mt-cell>
        <mt-cell title="交易类型">
          <span>
            {{dataList.payType | statusFilter("mctTradingPayType")}}
          </span>
        </mt-cell>
        <mt-cell title="订单类型">
          <span>
            {{dataList.transType | statusFilter("mctTradingTransType")}}
          </span>
        </mt-cell>
        <mt-cell v-if="dataList.status=='SUCCESS'" title="支付成功时间">
          <span>{{dataList.paySuccTime}}</span>
        </mt-cell>
      </input-wrapper>
    </view-radius>
    <view-radius class="split-box">
      <input-wrapper>
        <mt-cell title="商户编号">
          <span>{{dataList.customerNo}}</span>
        </mt-cell>
        <mt-cell title="支付类型">
          <span>
            {{dataList.payTypeDetail}}
          </span>
        </mt-cell>
        <mt-cell title="目标商户">
          <span>{{dataList.targetCustomerNo}}</span>
        </mt-cell>
        <mt-cell title="商户名称">
          <span>{{dataList.customerName}}</span>
        </mt-cell>
        <mt-cell title="机构编号">
          <span>{{dataList.companyNo}}</span>
        </mt-cell>
      </input-wrapper>
    </view-radius>
    <view-radius class="split-box">
      <input-wrapper>
        <mt-cell title="交易来源">
          <span>{{dataList.payFrom}}</span>
        </mt-cell>
        <mt-cell title="通道编号">
          <span>{{dataList.channelNo}}</span>
        </mt-cell>
        <mt-cell title="渠道订单号">
          <span>{{dataList.channelOrderNo}}</span>
        </mt-cell>
        <mt-cell title="渠道商编">
          <span>{{dataList.channelCustNo}}</span>
        </mt-cell>
        <mt-cell title="渠道费率">
          <span>
            {{utils.accMul(dataList.chFeeRate, 100)+'%'}}
          </span>
        </mt-cell>
        <mt-cell title="渠道手续费">
          <span>
            {{utils.accMul(dataList.chFee,0.01)}}元
          </span>
        </mt-cell>
      </input-wrapper>
    </view-radius>
    <view-radius class="split-box">
      <input-wrapper>
        <mt-cell title="通道返回码">
          <span>{{dataList.respCode}}</span>
        </mt-cell>
        <mt-cell title="交易同步标识">
          <span>{{dataList.syncFlag}}</span>
        </mt-cell>
        <mt-cell title="借贷标识">
          <span>{{dataList.bankType}}</span>
        </mt-cell>
        <mt-cell title="抹零金额">
          <span>
            {{utils.accMul(dataList.ignoreAmount,0.01)}}元
          </span>
        </mt-cell>
        <mt-cell title="折扣金额">
          <span>
            {{utils.accMul(dataList.discountAmount,0.01)}}元
          </span>
        </mt-cell>
        <mt-cell title="原始金额">
          <span>
            {{utils.accMul(dataList.originalAmount,0.01)}}元
          </span>
        </mt-cell>
        <mt-cell title="交易账户">
          <span>{{dataList.account}}</span>
        </mt-cell>
        <mt-cell title="交易授权码">
          <span>{{dataList.authCode}}</span>
        </mt-cell>
        <mt-cell title="原始订单号">
          <span>{{dataList.originalOrderNo}}</span>
        </mt-cell>
        <mt-cell title="接入机构原始订单号">
          <span>{{dataList.comOriginalOrderNo}}</span>
        </mt-cell>
      </input-wrapper>
    </view-radius>
  </full-page>
</template>
<style lang="scss">
.myp-chek-list {
  display: flex;
  flex-wrap: wrap;
  padding: 1px;
  .mint-cell {
    background-image: none;
    background-color: #fcfcfc;
    width: 33.333%;
  }
  .mint-radiolist-label,
  .mint-checklist-label {
    padding: 0;
  }
  .mint-radiolist-title,
  .mint-checklist-title {
    margin: 0;
  }
  .mint-cell-wrapper {
    padding: 5px;
  }
}
.split-box {
  margin-bottom: 10px;
}
</style>
<script>
import { mapActions } from "vuex";
import Picker from "@src/components-app/SelectPicker/Picker";
import utils from "@src/common/utils"
export default {
  components: { Picker },
  data() {
    return {
      pageType: this.$route.query["type"] || "DETAIL",
      customerNo: this.$route.params["customerNo"],
      createTime: this.$route.query["createTime"],
      surePage: false,
      statusObj: {},
      type: {},
      btnDisabled: false,
      dataList: {},
      pageTitle: {
        DETAIL: "详情",
      },
    };
  },
  computed: {},

  watch: {
  },
  created() {
    this.init();
  },
  methods: {
    ...mapActions(["getMctTradingOrders"]),
    init() {
      if (this.pageType == "DETAIL") {
        this.surePage = false;
        this.getMctTradingOrders({
          customerNo: this.customerNo,
          createTime: this.createTime
        }).then(datalist => {
          console.log(datalist);
          this.dataList = { ...datalist }
        });
      }
    }
  }
};
</script>

<style>
</style>

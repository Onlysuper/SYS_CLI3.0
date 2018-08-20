<template>
  <!-- 物料入库 -->
  <full-page>
    <mt-header slot="header" :title="$route.meta.pageTitle + pageTitle[pageType]">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
    </mt-header>
    <view-radius>
      <input-wrapper>
        <mt-cell value="" title="商户订单号">
          <span>{{dataList.companyOrderNo}}</span>
        </mt-cell>
        <mt-cell title="系统订单号">
          <span>{{dataList.orderNo}}</span>
        </mt-cell>
        <mt-cell title="账户类型">
          <span>
            {{dataList.accountType | statusFilter("mctPayforAccountType")}}
          </span>
        </mt-cell>
        <mt-cell title="商户编号">
          <span>{{dataList.customerNo}}</span>
        </mt-cell>
        <mt-cell title="代理商编号">
          <span>{{dataList.agentNo}}</span>
        </mt-cell>
        <mt-cell title="代付金额">
          <span>
            {{utils.accMul(dataList.settleAmount, 0.01)}}
          </span>
        </mt-cell>
        <mt-cell title="代付手续费">
          <span>
            {{utils.accMul(dataList.fee, 0.01)}}
          </span>
        </mt-cell>
        <mt-cell title="代付状态">
          <span>
            {{dataList.status | statusFilter("mctPayforStatus")}}
          </span>
        </mt-cell>
        <mt-cell title="银行帐号">
          <span>{{dataList.accountNo}}</span>
        </mt-cell>
        <mt-cell title="账户名称">
          <span>{{dataList.accountName}}</span>
        </mt-cell>
        <mt-cell title="身份证号">
          <span>{{dataList.idCard}}</span>
        </mt-cell>
        <mt-cell title="银行名称">
          <span>{{dataList.bankName}}</span>
        </mt-cell>
        <mt-cell title="银行编码">
          <span>{{dataList.bankCode}}</span>
        </mt-cell>
        <mt-cell title="代付成功时间">
          <span>{{dataList.proxyConfirmTime}}</span>
        </mt-cell>
        <mt-cell title="订单创建时间">
          <span>{{dataList.createTime}}</span>
        </mt-cell>
        <mt-cell title="备注信息">
          <span>{{dataList.postScript}}</span>
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
    ...mapActions(["getMctPayforOrders"]),
    init() {
      if (this.pageType == "DETAIL") {
        this.surePage = false;
        this.getMctPayforOrders({
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

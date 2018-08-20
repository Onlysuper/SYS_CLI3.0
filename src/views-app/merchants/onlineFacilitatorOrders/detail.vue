<template>
  <!-- 物料入库 -->
  <full-page>
    <mt-header slot="header" :title="$route.meta.pageTitle + pageTitle[pageType]">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
    </mt-header>
    <view-radius>
      <input-wrapper>
        <mt-cell value="" title="代理商名称">
          <span>{{dataList.agentName}}</span>
        </mt-cell>
        <mt-cell title="代理商编号">
          <span>{{dataList.agentNo}}</span>
        </mt-cell>
        <mt-cell title="商户审核通知url">
          <span>{{dataList.auditNotifyUrl}}</span>
        </mt-cell>

        <mt-cell title="t0交易通知Url">
          <span>{{dataList.t0remitNotifyUrl}}</span>
        </mt-cell>
        <mt-cell title="交易通知Url">
          <span>{{dataList.tradeNotifyUrl}}</span>
        </mt-cell>
        <mt-cell title="代付状态">
          <span>
            {{dataList.status | statusFilter("onlineFacilitatorOrdersStatus")}}
          </span>
        </mt-cell>
        <mt-cell title="签名key">
          <span>{{dataList.signKey}}</span>
        </mt-cell>
        <mt-cell title="加密key">
          <span>{{dataList.encryptKey}}</span>
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
      agentNo: this.$route.params["agentNo"],
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
    ...mapActions(["getOnlineFacilitatorOrders"]),
    init() {
      if (this.pageType == "DETAIL") {
        this.surePage = false;
        this.getOnlineFacilitatorOrders({
          agentNo: this.agentNo,
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

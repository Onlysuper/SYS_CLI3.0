<template>
  <!-- 物料入库 -->
  <full-page>
    <mt-header slot="header" :title="$route.meta.pageTitle + pageTitle[pageType]">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
    </mt-header>
    <view-radius class="split-box">
      <input-wrapper>
        <mt-cell title="商户编号">
          <span>
            {{dataList.customerNo}}
          </span>
        </mt-cell>

        <mt-cell title="代付账号">
          <span>
            {{dataList.accountNo}}
          </span>
        </mt-cell>
        <mt-cell title="商户秘钥">
          <span>
            {{dataList.customerKey}}
          </span>
        </mt-cell>
        <!-- <mt-cell value="" title="商户状态">
          <span>{{dataList.accStatus | statusFilter("merBalanceAccStatus")}}</span>
        </mt-cell> -->
        <!-- <mt-cell title="账户余额">
          <span>
            {{dataList.money}}
          </span>
        </mt-cell> -->

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
    ...mapActions(["getBalanceOrders"]),
    init() {
      if (this.pageType == "DETAIL") {
        this.surePage = false;
        this.getBalanceOrders({
          customerNo: this.customerNo,
        }).then(datalist => {
          this.dataList = { ...datalist };
        });
      }
    }
  }
};
</script>

<style>
</style>

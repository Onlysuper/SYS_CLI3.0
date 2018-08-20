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
        <mt-cell title="创建时间">
          <span>
            {{dataList.createTime}}
          </span>
        </mt-cell>
        <mt-cell title="更新时间">
          <span>
            {{dataList.lastUpdateTime}}
          </span>
        </mt-cell>
        <mt-cell title="业务类型">
          <span>
            {{dataList.bussinessType | statusFilter("mctPoolBussinessType")}}
          </span>
        </mt-cell>
        <mt-cell title="交易金额等级">
          <span>
            {{dataList.payAmount | statusFilter("mctPoolPayAmount")}}
          </span>
        </mt-cell>
        <mt-cell title="是否万能商户">
          <span>
            {{dataList.universalFlag | statusFilter("mctUniversalFlagtatus")}}
          </span>
        </mt-cell>
        <mt-cell title="地区">
          <span>
            {{dataList.orgCode?utils.findCity(dataList.orgCode).resultAddr:""}}
          </span>
        </mt-cell>
        <mt-cell title="经营开始时间">
          <span>
            {{dataList.timeBegin}}
          </span>
        </mt-cell>
        <mt-cell title="经营结束时间">
          <span>
            {{dataList.timeEnd}}
          </span>
        </mt-cell>
        <mt-cell title="日交易限额(分)">
          <span>
            {{dataList.dayAmountLimit}}
          </span>
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
    ...mapActions(["getPoolOrders"]),
    init() {
      if (this.pageType == "DETAIL") {
        this.surePage = false;
        this.getPoolOrders({
          customerNo: this.customerNo,
          createTime: this.createTime
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

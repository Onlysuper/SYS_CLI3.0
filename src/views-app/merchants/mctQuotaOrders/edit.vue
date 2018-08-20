<template>
  <full-page class="page">
    <mt-header slot="header" :title="$route.meta.pageTitle">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
      <mt-button slot="right" :disabled="btnDisabled" type="danger" @click="save">保存</mt-button>
    </mt-header>
    <view-radius>
      <input-wrapper>
        <!-- 编辑表单 -->
        <mt-field :disabled="pageType == 'EDIT'?true:false" type="text" label="商户编号" placeholder="请输入商户编号" v-model="good.customerNo"></mt-field>
        <mt-field type="text" label="单笔交易限额" placeholder="单笔交易限额(分)" v-model="good.singleAmountLimit"></mt-field>
        <mt-field type="text" label="日交易限额" placeholder="日交易限额(分)" v-model="good.dayAmountLimit"></mt-field>
        <mt-field @click.native="$refs.statusPicker.open" type="text" label="状态" placeholder="请选择状态" :value="statusModle.name" v-readonly-ios :readonly="true" :disableClear="true">
          <i class="icon-arrow"></i>
        </mt-field>
        <!-- </template> -->
      </input-wrapper>
    </view-radius>
    <picker ref="statusPicker" v-model="statusModle" :slotsActions="emailStatusOptions" @confirm="statusPickerChange"></picker>
  </full-page>
</template>
<style  lang='scss' scoped>
.inputoption-box {
  display: flex;
  padding: 0 10px;
  box-sizing: border-box;
  font-size: 1.28rem;
  .inputoption_title {
    line-height: 3;
    width: 8.8rem;
  }
  input {
    color: #666;
    opacity: 1;
    &::-webkit-input-placeholder {
      font-size: 1.28rem;
    }
  }
}
</style>

<script>
import { mapState, mapActions } from "vuex";
import Picker from "@src/components-app/SelectPicker/Picker";
import SearchModle from "@src/components-app/SearchModle";
import utils from "@src/common/utils";
import { statusFilterQuery } from "@src/common/mixins";
export default {
  mixins: [statusFilterQuery],
  components: {
    Picker,
    SearchModle
  },
  data() {
    return {
      btnDisabled: false,
      customerNo: this.$route.params["customerNo"],
      pageType: this.$route.query["type"] || "ADD",
      bussinessTypeModle: {},
      emailStatusOptions: [],
      statusModle: {},
      good: {
        customerNo: "",
        status: "",
        dayAmountLimit: "",
        singleAmountLimit: ""
      },
      pageTitle: {
        ADD: "添加",
        EDIT: "修改"
      }
    };
  },
  created() {
    this.emailStatusOptions = this.statusFilterQuery('mctQuotaOrdersStatus');
    this.pageType == "EDIT" &&
      this.getMctQuotaOrders({ customerNo: this.customerNo }).then(good => {
        let newGood = utils.pickObj(good, [
          "customerNo",
          "singleAmountLimit",
          "dayAmountLimit",
          "status"
        ]);
        this.good = Object.assign(this.good, newGood);
        this.echoForm(this.good);
      });
  },
  methods: {
    ...mapActions(["getMctQuotaOrders", "postEditMctQuotaOrders"]),
    changeName(val) {
      this.good.goodsName = val;
    },
    //回显信息
    echoForm(good) {
      //状态
      let status = this.emailStatusOptions.find(item => item.code == good.status);
      this.statusPickerChange(status || {});
    },
    //设置费率
    bussinessTypePickerChange(obj) {
      this.bussinessTypeModle = obj;
      this.good.bussinessType = obj.code;
    },
    //状态
    statusPickerChange(obj) {
      this.statusModle = obj;
      this.good.status = obj.code;
    },
    save() {
      if (!this.validator.isEmpty(this.good.customerNo)) {
        this.MessageBox.alert("商户编号不能为空！");
        return;
      }
      if (!this.validator.isEmpty(this.good.singleAmountLimit)) {
        this.MessageBox.alert("单笔交易限额不能为空！");
        return;
      }
      if (!this.validator.isEmpty(this.good.dayAmountLimit)) {
        this.MessageBox.alert("日交易限额不能为空！");
        return;
      }
      let sendata = { ...this.good };
      this.btnDisabled = true;
      if (this.pageType == "EDIT") {
        this.postEditMctQuotaOrders({ ...sendata }).then(flag => {
          this.btnDisabled = false;
          if (flag) {
            this.$router.back();
          }
        })
      }
      if (this.pageType == "ADD") {
        this.postEditMctQuotaOrders({ ...sendata }).then(flag => {
          this.btnDisabled = false;
          if (flag) {
            this.$store.commit("MCTQUOTAQRDERS_QUERY_IS_SEARCH", true);
            this.$router.back();
          }
        });
      }
    }
  }
};
</script>

<style>
</style>

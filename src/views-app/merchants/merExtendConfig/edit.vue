<template>
  <full-page class="page">
    <mt-header slot="header" :title="$route.meta.pageTitle + pageTitle[pageType]">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
      <mt-button slot="right" :disabled="btnDisabled" type="danger" @click="save">保存</mt-button>
    </mt-header>
    <view-radius>
      <input-wrapper>
        <!-- 编辑表单 -->
        <mt-field :disabled="pageType == 'EDIT'?true:false" type="text" label="商户编号" placeholder="请输入商户编号" v-model="good.customerNo"></mt-field>
        <mt-field @click.native="$refs.statusPicker.open" type="text" label="	是否跳码商户" placeholder="请选择是否跳码商户" :value="statusModle.name" v-readonly-ios :readonly="true" :disableClear="true">
          <i class="icon-arrow"></i>
        </mt-field>
        <!-- </template> -->
      </input-wrapper>
    </view-radius>
    <picker ref="statusPicker" v-model="statusModle" :slotsActions="jumpOptions" @confirm="statusPickerChange"></picker>
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
import { getsmartgoodscodeCustomerGood } from "@src/apis";
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
        jumpCustomer: ""
      },
      pageTitle: {
        ADD: "添加",
        EDIT: "修改"
      }
    };
  },
  created() {
    this.jumpOptions = this.statusFilterQuery('merExtendConfigJump');
    this.pageType == "EDIT" &&
      this.getMerExtendConfigs({
        customerNo: this.customerNo
      }).then(good => {
        let newGood = utils.pickObj(good, [
          "customerNo",
          "jumpCustomer"
        ]);
        this.good = Object.assign(this.good, newGood);
        this.echoForm(this.good);
      });
  },
  methods: {
    ...mapActions(["getMerExtendConfigs", "postUpdateMerExtendConfigs"]),
    changeName(val) {
      this.good.goodsName = val;
    },
    //回显信息
    echoForm(good) {
      //状态
      let jumpCustomer = this.jumpOptions.find(item => item.code == good.jumpCustomer);
      this.statusPickerChange(jumpCustomer || {});
    },

    //状态
    statusPickerChange(obj) {
      this.statusModle = obj;
      this.good.jumpCustomer = obj.code;
    },
    save() {
      if (!this.validator.isEmpty(this.good.customerNo)) {
        this.MessageBox.alert("商户编号不能为空！");
        return;
      }

      if (!this.validator.isEmpty(this.good.jumpCustomer)) {
        this.MessageBox.alert("请选择是否跳码");
        return;
      }
      let sendata = { ...this.good };
      this.btnDisabled = true;
      if (this.pageType == "EDIT") {
        this.postUpdateMerExtendConfigs({ ...sendata }).then(flag => {
          this.btnDisabled = false;
          if (flag) {
            this.$router.back();
          }
        })
      }
      if (this.pageType == "ADD") {
        this.postUpdateMerExtendConfigs({ ...sendata }).then(flag => {
          this.btnDisabled = false;
          if (flag) {
            this.$store.commit("MEREXTENDCONFIG_QUERY_IS_SEARCH", true);
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

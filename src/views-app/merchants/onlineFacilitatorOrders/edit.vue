<template>
  <full-page class="page">
    <mt-header slot="header" :title="$route.meta.pageTitle + pageTitle[pageType]">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
      <mt-button slot="right" :disabled="btnDisabled" type="danger" @click="save">保存</mt-button>
    </mt-header>
    <view-radius>
      <input-wrapper>
        <!-- 编辑表单 -->
        <mt-field :disabled="pageType == 'EDIT'?true:false" type="text" label="代理商编号" placeholder="请输入代理商编号" v-model="good.agentNo"></mt-field>
        <mt-field type="text" label="代理商名称" placeholder="请输入代理商名称" v-model="good.agentName"></mt-field>
        <mt-field type="text" label="中付代理商编号" placeholder="请输入中付代理商编号" v-model="good.zfAgentNo"></mt-field>
        <mt-field type="text" label="中付签名Key" placeholder="请输入中付签名Key" v-model="good.zfSignKey"></mt-field>
        <mt-field type="text" label="商户审核通知Url" placeholder="请输入商户审核通知Url" v-model="good.auditNotifyUrl"></mt-field>
        <mt-field type="text" label="t0交易通知Url" placeholder="请输入t0交易通知Url" v-model="good.t0remitNotifyUrl"></mt-field>
        <mt-field type="text" label="交易通知Url" placeholder="请输入交易通知Url" v-model="good.tradeNotifyUrl"></mt-field>
        <!-- </template> -->
      </input-wrapper>
    </view-radius>
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
import { mapActions } from "vuex";
import Picker from "@src/components-app/SelectPicker/Picker";
import { } from "@src/apis";
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
      agentNo: this.$route.params["agentNo"],
      pageType: this.$route.query["type"] || "ADD",
      bussinessTypeModle: {},
      emailStatusOptions: [],
      statusModle: {},
      good: {
        agentNo: ""
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
      this.getOnlineFacilitatorOrders({
        agentNo: this.agentNo,
        createTime: this.createTime
      }).then(good => {
        let newGood = utils.pickObj(good, [
          'agentNo', 'agentName', 'zfAgentNo', 'zfSignKey', 'auditNotifyUrl', 't0remitNotifyUrl',
          'tradeNotifyUrl'
        ]);
        this.good = Object.assign(this.good, newGood);
        this.echoForm(this.good);
      });
  },
  methods: {
    ...mapActions(["getOnlineFacilitatorOrders", "postOnlineFacilitatorOrders"]),
    changeName(val) {
      this.good.goodsName = val;
    },
    //回显信息
    echoForm(good) {
    },

    save() {
      if (!this.validator.isEmpty(this.good.agentNo)) {
        this.MessageBox.alert("代理商编号不能为空！");
        return;
      }
      if (!this.validator.isEmpty(this.good.agentName)) {
        this.MessageBox.alert("请输入代理商名称");
        return;
      }
      if (!this.validator.isEmpty(this.good.zfAgentNo)) {
        this.MessageBox.alert("请输入中付代理商编号");
        return;
      }
      if (!this.validator.isEmpty(this.good.zfSignKey)) {
        this.MessageBox.alert("请输入中付签名Key");
        return;
      }
      let sendata = { ...this.good };
      this.btnDisabled = true;
      if (this.pageType == "EDIT") {
        this.postOnlineFacilitatorOrders({ ...sendata }).then(flag => {
          this.btnDisabled = false;
          if (flag) {
            this.$router.back();
          }
        })
      }
      if (this.pageType == "ADD") {
        this.postOnlineFacilitatorOrders({ ...sendata }).then(flag => {
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

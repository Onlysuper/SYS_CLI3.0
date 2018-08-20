<template>
  <full-page class="page">
    <mt-header slot="header" :title="$route.meta.pageTitle">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
      <mt-button slot="right" :disabled="btnDisabled" type="danger" @click="save">保存</mt-button>
    </mt-header>
    <view-radius class="split-box">
      <input-wrapper>
        <mt-field :disabled="customerNoDis" :readonly="customerNoDis" type="text" label="商户编号" placeholder="商户编号" v-model="addForm.customerNo"></mt-field>
        <mt-field @click.native="customerNoDis?false:$refs['bussinessTypePicker'].open()" type="text" label="经营类型" placeholder="请选择经营类型" :value="bussinessTypeModle.name" v-readonly-ios :disableClear="true">
          <i class="icon-arrow"></i>
        </mt-field>
        <mt-field @click.native="customerNoDis?false:$refs['payAmountPicker'].open()" type="text" label="交易金额等级" placeholder="交易金额等级" :value="payAmountModle.name" v-readonly-ios :disableClear="true">
          <i class="icon-arrow"></i>
        </mt-field>
        <mt-field @click.native="$refs.statusPicker.open" type="text" label="状态" placeholder="请选择状态" :value="statusModle.name" v-readonly-ios>
          <i class="icon-arrow"></i>
        </mt-field>
        <mt-field label="地区:" type="text" v-model="city.resultAddr" @click.native="customerNoDis? false:cityVisible = true" placeholder="选择地区" v-readonly-ios>
          <i class="icon-arrow"></i>
        </mt-field>
        <mt-field class="addpay-long-title" label="营业执照期限:" type="text" v-model="addForm.timeBegin" @click.native="customerNoDis? false:$refs.timeBegin.open()" placeholder="开始日期" v-readonly-ios>
          <i class="icon-arrow"></i>
        </mt-field>
        <mt-field class="addpay-long-title" label="营业执照期限:" type="text" v-model="addForm.timeEnd" @click.native="customerNoDis? false:$refs.timeEnd.open()" placeholder="结束日期" v-readonly-ios>
          <i class="icon-arrow"></i>
        </mt-field>
      </input-wrapper>
    </view-radius>
    <picker ref="statusPicker" v-model="statusModle" :slotsActions="statusOptions" @confirm="statusChange"></picker>
    <picker ref="bussinessTypePicker" v-model="bussinessTypeModle" :slotsActions="bussinessTypeOptions" @confirm="bussinessTypeChange"></picker>
    <picker ref="payAmountPicker" v-model="payAmountModle" :slotsActions="payAmountOptions" @confirm="payAmountChange"></picker>
    <mt-datetime-picker v-model="bussinessLicenseEffectiveBeginVal" type="date" :startDate="new Date('2000-01-01')" :endDate="new Date()" @confirm="setStartDate" ref="timeBegin" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日"></mt-datetime-picker>
    <mt-datetime-picker v-model="bussinessLicenseEffectiveEndVal" type="date" :endDate="new Date('2199-12-31')" @confirm="setEndDate" ref="timeEnd" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日"></mt-datetime-picker>
    <city-picher ref="CityPicher" v-model="cityVisible" :resultCallback="resultCallback"></city-picher>
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
.split-box {
  margin-bottom: 10px;
}
</style>

<script>
import CityPicher from "@src/components-app/CityPicher";
import { mapState, mapActions } from "vuex";
import Picker from "@src/components-app/SelectPicker/Picker";
import enjoyJson from "@src/data/enjoy.json";
import { } from "@src/apis";
import SearchModle from "@src/components-app/SearchModle";
import utils from "@src/common/utils";
import { statusFilterQuery } from "@src/common/mixins";
export default {
  mixins: [statusFilterQuery],
  components: {
    Picker,
    SearchModle,
    CityPicher
  },
  data() {
    return {
      cityVisible: false,
      city: {},
      btnDisabled: false,
      customerNoDis: false,
      bussinessLicenseEffectiveBeginVal: new Date(),
      bussinessLicenseEffectiveEndVal: new Date(),
      customerNo: this.$route.params["customerNo"],
      createTime: this.$route.query["createTime"],
      pageType: this.$route.query["type"] || "ADD",
      bussinessTypeModle: {},
      payAmountModle: {},
      statusModle: {},
      addForm: {
        timeBegin: "",
        timeEnd: "",
        customerNo: "",
        bussinessType: "",
        status: "",
        payAmount: ""
      },
      pageTitle: {
        ADD: "添加",
        EDIT: "修改"
      }
    };
  },
  created() {
    if (this.pageType == "EDIT") {
      this.getPoolOrders({
        customerNo: this.customerNo,
        createTime: this.createTime
      }).then(data => {
        let city = this.$refs.CityPicher.findCity(data.orgCode);
        this.resultCallback(city);
        this.addForm = Object.assign(this.addForm, data);
        this.echoForm(data);
      });
      this.customerNoDis = true;
    }
    if (this.pageType == "ADD") {
      this.customerNoDis = false;
    }
  },
  methods: {
    ...mapActions(["getPoolOrders", "postEditMctPoolOrder", "postAddMctPoolOrder"]),
    //地区选择回调函数
    resultCallback(obj) {
      this.city = obj;
      this.addForm.orgCode = this.city.resultCode
    },
    setStartDate(date) {
      console.log(date);
      this.addForm.timeBegin = utils.formatDate(date, "yyyy-MM-dd");
      this.bussinessLicenseEffectiveBeginVal = date;
    },
    setEndDate(date) {
      console.log(date);
      this.addForm.timeEnd = utils.formatDate(date, "yyyy-MM-dd");
      this.bussinessLicenseEffectiveEndVal = date;
    },

    //状态
    statusChange(obj) {
      console.log(obj);
      this.statusModle = obj;
      this.addForm.status = obj.code;
    },
    //业务类型
    bussinessTypeChange(obj) {
      console.log(obj);
      this.bussinessTypeModle = obj;
      this.addForm.bussinessType = obj.code;
    },
    // 交易金额等级
    payAmountChange(obj) {
      console.log(obj);
      this.payAmountModle = obj;
      this.addForm.payAmount = obj.code;
    },
    //回显信息
    echoForm(data) {
      console.log(data);
      //状态
      let status = this.statusOptions.find(item => item.code == data.status);
      this.statusChange(status || {});

      let payAmount = this.payAmountOptions.find(item => item.code == data.payAmount);
      this.payAmountChange(payAmount || {});

      let bussinessType = this.bussinessTypeOptions.find(item => item.code == data.bussinessType);
      this.bussinessTypeChange(bussinessType || {});

    },
    save() {
      // let sendata = { ...this.addForm };
      let sedData = utils.pickObj(this.addForm, [
        "customerNo", "bussinessType", "payAmount", "timeBegin", "timeEnd", "status", "orgCode"
      ])
      this.btnDisabled = true;
      if (this.pageType == "EDIT") {
        this.postEditMctPoolOrder({ ...sedData }).then(flag => {
          this.btnDisabled = false;
          if (flag) {
            this.$router.back();
          }
        })
      }
      if (this.pageType == "ADD") {
        this.postAddMctPoolOrder({ ...sedData }).then(flag => {
          this.btnDisabled = false;
          if (flag) {
            this.$store.commit("MCTPOOLORDERS_QUERY_IS_SEARCH", true);
            this.$router.back();
          }
        });
      }

    }
  },
  computed: {
    bussinessTypeOptions() {
      return this.statusFilterQuery('mctPoolBussinessType')
    },
    payAmountOptions() {
      return this.statusFilterQuery('mctPoolPayAmount')
    },
    statusOptions() {
      return this.statusFilterQuery('mctPoolStatus')
    }
  }
};
</script>

<style>
</style>

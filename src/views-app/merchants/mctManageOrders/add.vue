<template>
  <full-page class="page">
    <mt-header slot="header" :title="$route.meta.pageTitle">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
      <mt-button slot="right" :disabled="btnDisabled" type="danger" @click="save">保存</mt-button>
    </mt-header>
    <view-radius class="split-box">
      <input-wrapper>
        <mt-field type="text" label="版本号" placeholder="版本号" v-model="addForm.version"></mt-field>
        <mt-field type="text" label="服务商编号" placeholder="服务商编号" v-model="addForm.companyNo"></mt-field>
        <mt-field type="text" label="接入机构商户编号" placeholder="接入机构商户编号" v-model="addForm.comCustomerNo"></mt-field>
        <mt-field type="text" label="服务信息" placeholder="版本号" v-model="addForm.service"></mt-field>
      </input-wrapper>
    </view-radius>
    <view-radius class="split-box">
      <input-wrapper>
        <mt-radio title="商户类型" v-model="addForm.accountType" :options="[{ label: '个人',value: '0' },{ label: '企业/个体户',value: '1' }]" class="mint-radiolist-row border-1px"></mt-radio>
        <mt-field type="text" label="商户全称" placeholder="商户全称" v-model="addForm.enterpriseName"></mt-field>
        <mt-field type="text" label="商户简称" placeholder="商户简称" v-model="addForm.bussinessName"></mt-field>
        <mt-field type="text" label="法人姓名" placeholder="法人姓名" v-model="addForm.legalPerson"></mt-field>
        <mt-field type="text" label="注册地址" placeholder="注册地址" v-model="addForm.registerAddress"></mt-field>
        <mt-field type="text" label="客服电话" placeholder="客服电话" v-model="addForm.servicePhone"></mt-field>
        <mt-field @click.native="$refs.categoryPicker.open" type="text" label="经营类型" placeholder="请选择经营类型" :value="categoryModle.name" v-readonly-ios :readonly="true" :disableClear="true">
          <i class="icon-arrow"></i>
        </mt-field>
        <mt-field label="所在地区:" type="text" v-model="city.resultAddr" @click.native="cityVisible = true" placeholder="选择地区" v-readonly-ios :readonly="true">
          <i class="icon-arrow"></i>
        </mt-field>
        <mt-field class="addpay-long-title" label="营业执照起始日期:" type="text" v-model="addForm.bussinessLicenseEffectiveBegin" @click.native="$refs.bussinessLicenseEffectiveBegin.open" placeholder="请选择日期" v-readonly-ios :readonly="true">
          <i class="icon-arrow"></i>
        </mt-field>
        <mt-field class="addpay-long-title" label="营业执照到期日期:" type="text" v-model="addForm.bussinessLicenseEffectiveEnd" @click.native="$refs.bussinessLicenseEffectiveEnd.open" placeholder="请选择日期" v-readonly-ios :readonly="true">
          <i class="icon-arrow"></i>
        </mt-field>
      </input-wrapper>
    </view-radius>
    <picker ref="categoryPicker" v-model="categoryModle" :slotsActions="categoryOptions" @confirm="categoryChange"></picker>
    <picker ref="statusPicker" v-model="statusModle" :slotsActions="emailStatusOptions" @confirm="statusPickerChange"></picker>
    <city-picher ref="CityPicher" v-model="cityVisible" :resultCallback="resultCallback"></city-picher>
    <mt-datetime-picker v-model="bussinessLicenseEffectiveBeginVal" type="date" :startDate="new Date('2000-01-01')" :endDate="new Date()" @confirm="setStartDate" ref="bussinessLicenseEffectiveBegin" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日"></mt-datetime-picker>
    <mt-datetime-picker v-model="bussinessLicenseEffectiveEndVal" type="date" :endDate="new Date('2199-12-31')" @confirm="setEndDate" ref="bussinessLicenseEffectiveEnd" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日"></mt-datetime-picker>
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
import { getsmartgoodscodeCustomerGood } from "@src/apis";
import SearchModle from "@src/components-app/SearchModle";
import utils from "@src/common/utils";
import { statusFilterQuery } from "@src/common/mixins";
import bussinessTypeJson from "@src/data/bussinessType.json";
export default {
  mixins: [statusFilterQuery],
  components: {
    Picker,
    SearchModle,
    CityPicher
  },
  data() {
    return {
      bussinessLicenseEffectiveBeginVal: new Date(),
      bussinessLicenseEffectiveEndVal: new Date(),
      cityVisible: false,
      city: {},
      btnDisabled: false,
      customerNo: this.$route.params["customerNo"],
      pageType: this.$route.query["type"] || "ADD",
      bussinessTypeModle: {},
      categoryOptions: [],
      emailStatusOptions: [],
      statusModle: {},
      categoryModle: {},
      addForm: {
        version: "",
        service: "customer.register",
        companyNo: "",
        encryptData: "",
        signData: "",
        comCustomerNo: "",
        enterpriseName: "",
        bussinessName: "",
        customerType: "1",
        legalPerson: "",
        bussinessAddress: "",
        registerAddress: "",
        servicePhone: "",
        contactName: "",
        contactPhone: "",
        contactMobile: "",
        contactEmail: "",
        idType: "",
        idCard: "",
        idNoEffectiveBegin: "",
        idNoEffectiveEnd: "",
        taxNo: "",
        bussinessLicenseEffectiveBegin: "",
        bussinessLicenseEffectiveEnd: "",
        orgCode: [],
        accountName: "",
        accountNo: "",
        accountType: "",
        unionCode: "",
        reservedPhoneNo: "",
        settleIdCard: "",
        category: "",
        wechatScansRate: "",
        alipayScansRate: "",
        wechatAppRate: "",
        alipayAppRate: "",
        wechatH5Rate: "",
        alipayH5Rate: "",
        t0CashCostFixed: "",
        settleMode: "",
        // 图片
        bussinessLicenseImg: "",//商户营业执照照片
        accountLicenseImg: "",//开户许可证照片
        identityFrontImg: "",//法人身份证人像面
        identityBackImg: "",//法人身份证国徽面
        identityHolderImg: "",//法人手持身份证合影照片
        storeImg: "",//店内照片
        placeImg: "",//门头照片
        cashSpaceImg: "",//收银台照片
        settleCardImg: "",//结算卡照片
        certificateImg: "",//授权照片
        holdCertificateImg: "",//法人手持授权照片
        cardHolderFrontImg: "",//持卡人身份证人像面照片
        cardHolderBackImg: "",//持卡人身份证国徽面照片
        cardHolderIdImg: "",//持卡人手持身份证合影照片
        othersImg: ""//其他照片
      },
      pageTitle: {
        ADD: "添加",
        EDIT: "修改"
      }
    };
  },
  created() {
    this.emailStatusOptions = this.statusFilterQuery('mctQuotaOrdersStatus');
    this.categoryOptions = bussinessTypeJson;
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
    setStartDate(date) {
      this.addForm.bussinessLicenseEffectiveBegin = utils.formatDate(date, "yyyy-MM-dd");
      this.bussinessLicenseEffectiveBeginVal = date;
    },
    setEndDate(date) {
      this.addForm.bussinessLicenseEffectiveEnd = utils.formatDate(date, "yyyy-MM-dd");
      this.bussinessLicenseEffectiveEndVal = date;
    },
    //地区选择回调函数
    resultCallback(obj) {
      this.city = obj;
    },
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
    //经营类型
    categoryChange(obj) {
      this.categoryModle = obj;
      this.addForm.category = obj.code;
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

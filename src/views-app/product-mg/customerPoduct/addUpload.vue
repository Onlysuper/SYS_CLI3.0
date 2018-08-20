<template>
  <full-page class="add-goods-container page">
    <mt-header slot="header" :title="$route.meta.pageTitle" class="re-mint-header">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
    </mt-header>
    <div class="add-playinfo">
      <view-radius class="uploads">
        <upload-view :label="'营业执照'" class="item" :customerNo="customerNo" :upType="'BUSSINESS_LICENSE'" @result="resultMediaId" :dataKey="'bussinessLicenseImg'" ref="bussinessLicenseImg"></upload-view>
        <upload-view :label="'门头照片'" class="item" :customerNo="customerNo" :upType="'PLACE_IMG'" @result="resultMediaId" :dataKey="'placeImg'" ref="placeImg"></upload-view>
        <upload-view :label="'收银台照片'" class="item" :customerNo="customerNo" :upType="'CASH_SPACE_IMG'" @result="resultMediaId" :dataKey="'cashSpaceImg'" ref="cashSpaceImg"></upload-view>
        <upload-view :label="'法人身份证人像面'" class="item" :customerNo="customerNo" :upType="'LEGAL_PERSON_ID_POSITIVE'" @result="resultMediaId" :dataKey="'identityFrontImg'" ref="identityFrontImg"></upload-view>
        <upload-view :label="'法人身份证国徽面'" class="item" :customerNo="customerNo" :upType="'LEGAL_PERSON_ID_BACK'" @result="resultMediaId" :dataKey="'identityBackImg'" ref="identityBackImg"></upload-view>
        <upload-view :label="'法人手持身份证'" v-show="corporatePerson" class="item" :customerNo="customerNo" :upType="'APPLICANT_WITH_ID'" @result="resultMediaId" :dataKey="'identityHolderImg'" ref="identityHolderImg"></upload-view>
        <upload-view :label="'法人手持身份证与授权书'" v-show="unCorporatePerson" class="item" :customerNo="customerNo" :upType="'HOLD_CERTIFICATE_IMG'" @result="resultMediaId" :dataKey="'holdCertificateImg'" ref="holdCertificateImg"></upload-view>
        <upload-view :label="'授权书加盖公章'" v-show="unCorporatePerson" class="item" :customerNo="customerNo" :upType="'CERTIFICATE_IMG'" @result="resultMediaId" :dataKey="'certificateImg'" ref="certificateImg"></upload-view>
        <upload-view :label="'店内照片'" class="item" :customerNo="customerNo" :upType="'STORE_IMG'" @result="resultMediaId" :dataKey="'storeImg'" ref="storeImg"></upload-view>
        <upload-view :label="'开户许可证'" v-show="publicPerson" class="item" :customerNo="customerNo" :upType="'ACCOUNT_OPENING_LICENSE'" @result="resultMediaId" :dataKey="'accountLicenseImg'" ref="accountLicenseImg"></upload-view>
        <upload-view :label="'结算卡正面'" v-show="corporatePerson || unCorporatePerson" class="item" :customerNo="customerNo" :upType="'SETTLE_CARD_IMG'" @result="resultMediaId" :dataKey="'settleCardImg'" ref="settleCardImg"></upload-view>
        <upload-view :label="'结算人身份证人面像'" v-show="unCorporatePerson" class="item" :customerNo="customerNo" :upType="'CARDHOLDER_ID_POSITIVE'" @result="resultMediaId" :dataKey="'cardHolderFrontImg'" ref="cardHolderFrontImg"></upload-view>
        <upload-view :label="'结算人身份证国徽面'" v-show="unCorporatePerson" class="item" :customerNo="customerNo" :upType="'CARDHOLDER_ID_BACK'" @result="resultMediaId" :dataKey="'cardHolderBackImg'" ref="cardHolderBackImg"></upload-view>
        <upload-view :label="'结算人手持身份证'" v-show="unCorporatePerson" class="item" :customerNo="customerNo" :upType="'CARDHOLDER_WITH_ID'" @result="resultMediaId" :dataKey="'cardHolderIdImg'" ref="cardHolderIdImg"></upload-view>
        <!-- 非法人添加end -->
         <!-- 美食行业 -->
          <upload-view :label="'微信标示前台照'" v-show="category=='food'"  class="item" :customerNo="customerNo" :upType="'WECHATLOGO_CASHSPACE'"  @result="resultMediaId" :dataKey="'wechatLogoCashSpaceImg'"  ref="cardHolderIdImg"></upload-view>
          <upload-view  :label="'支付宝标示前台照'" v-show="category=='food'" class="item" :customerNo="customerNo" :upType="'ALIPAYLOGO_CASHSPACE'" :dataKey="'alipayLogoCashSpaceImg'"  ref="alipayLogoCashSpaceImg" @result="resultMediaId"></upload-view>
          <upload-view  :label="'三方平台凭证'" v-show="category=='food'" class="item" :customerNo="customerNo" :upType="'CATERIMG_PLATFORM_CERTIFICATE'" :dataKey="'caterimgPlatformCertificateImg'"  ref="caterimgPlatformCertificateImg" @result="resultMediaId"></upload-view>
          <upload-view v-show="category=='food'" :label="'BD与门头合影'" class="item" :customerNo="customerNo" :upType="'PROVIDER_STOREDOOR'" :dataKey="'providerStoredoorImg'" ref="providerStoredoorImg"   @result="resultMediaId"></upload-view>
          <upload-view v-show="category=='food'" :label="'BD与微信所有物料'" class="item" :customerNo="customerNo" :upType="'PROVIDER_WECHAT_SCAN'" :dataKey="'providerWechatScanImg'" ref="providerWechatScanImg"   @result="resultMediaId"></upload-view>
          <upload-view v-show="category=='food'" :label="'BD与支付宝所有物料'" class="item" :customerNo="customerNo" :upType="'PROVIDER_ALIPAY_SCAN'" :dataKey="'providerAlipayScanImg'" ref="providerAlipayScanImg"   @result="resultMediaId"></upload-view>
          <upload-view v-show="category=='food'" :label="'餐饮许可证'" class="item" :customerNo="customerNo" :upType="'CATERIMG_PERMIT'" :dataKey="'caterimgPermitImg'" ref="caterimgPermitImg"   @result="resultMediaId"></upload-view>
      </view-radius>
      <mt-radio v-show="notQrcode" v-model="value" v-targetTo style="text-align: center;" @click.native="visible = true" :options="['同意《支付开通协议》']"></mt-radio>
    </div>
    <mt-button v-show="notQrcode" class="btn" size="large" :disabled="value?false:true" type="primary" @click="submit">开通</mt-button>
    <myp-popup v-model="visible">
      <full-page class="agree">
        <div slot="header" class="border-bottom-1px clear">
          <span class="mint-datetime-action mint-datetime-cancel" @click="isAgree(false)">不同意</span>
          <span class="mint-datetime-action mint-datetime-confirm" @click="isAgree(true)">同意</span>
        </div>
        <customer-contract></customer-contract>
      </full-page>
    </myp-popup>
  </full-page>
</template>

<script>
import UploadView from "@src/components-app/Upload/UploadView";
import MypPopup from "@src/components-app/MypPopup";
import PullDownTip from "@src/components-app/PullDownTip";

import { completeBussinessImg, getCustomerEchoProduct } from "@src/apis";
import CustomerContract from "@src/components-app/CompanyContract/CustomerContract";
export default {
  components: {
    UploadView,
    MypPopup,
    PullDownTip,
    CustomerContract
  },
  data() {
    return {
      category:"",// 行业类型
      notQrcode: true, // 非快速开票
      // 图片显示隐藏start
      pageType: this.$route.query["type"],
      publicPerson: true,//对公
      corporatePerson: true,//对私法人
      unCorporatePerson: true,//对私非法人
      // 图片显示隐藏end
      visible: false,
      value: "",
      customerNo: this.$route.query["customerNo"],
      phoneNo: "",
      accountType: "",
      imgs: {},
      accountName: "",
      legalPerson: ""
    };
  },
  created() {
    getCustomerEchoProduct()({
      customerNo: this.customerNo,
      featureType: "CONVERGE_PAY"
    }).then(data => {
      if (data.code == "00") {
        //回显信息
        this.echoForm(data.data);
      } else {
        this.Toast(data.msg);
      }
    });
    // 判断来源
    if (this.pageType == 'pay') {
      this.notQrcode = true;
    } else if (this.pageType == 'Qrcode') {
      this.notQrcode = false;
    }
  },
  directives: {
    targetTo: {
      // 指令的定义
      inserted: function (el) {
        // console.log(el);
      }
    }
  },
  methods: {
    echoForm(data) {
      let { customer, imgs, settleCard } = data;
      if (customer instanceof Object) {
        this.legalPerson = customer.legalPerson;
      }
      if (imgs instanceof Object) {
        for (let key in imgs) {
          if (imgs[key] instanceof Object) {
            if(this.$refs[key]){
            this.$refs[key].setImg(imgs[key].url);
            this.resultMediaId(key, imgs[key].id);
            }
          }
        }
      }
      if (settleCard instanceof Object) {
        this.phoneNo = settleCard.phoneNo;
        this.accountType = settleCard.accountType;
        this.accountName = settleCard.accountName;
      }
      if (this.accountType == "0") {
        // 对公:
        this.publicPerson = true;
        this.corporatePerson = false;
        this.unCorporatePerson = false;
      } else if (this.accountType == "1") {
        // 对私
        if (this.accountName == this.legalPerson) {
          // 法人
          this.corporatePerson = true;
          this.publicPerson = false;
          this.unCorporatePerson = false;
        } else {
          // 非法人
          this.unCorporatePerson = true;
          this.publicPerson = false;
          this.corporatePerson = false;
        }
      }
      if (customer.category == '2015050700000000') {
        // 美食行业
        this.category = "food"
      }
    },
    //图片上传结果
    resultMediaId(dataKey, mediaId) {
      this.imgs[dataKey] = mediaId;
    },
    isAgree(bool) {
      this.visible = false;
      if (bool) this.value = "同意《支付开通协议》";
      else this.value = "";
    },
    submit() {
      completeBussinessImg()({
        ...this.imgs,
        customerNo: this.customerNo
      }).then(data => {
        if (data.code == "00") {
          this.$router.push({ path: "./addSuccess", query: { phoneNo: this.phoneNo } });
        } else {
          this.Toast(data.msg);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/base.scss";
.add-goods-container {
  .add-playinfo {
    padding: 20 * $rem;
    box-sizing: border-box;
  }
  .btn {
    margin: 30 * $rem auto;
    width: 95%;
  }
  .uploads {
    padding: 20 * $rem;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    .item {
      // float: left;
      width: 33%;
      // flex: 1;
    }
  }
  .agree {
    height: 400px;
  }
  .agree-text {
    padding: 20 * $rem;
    box-sizing: border-box;
  }
  .indent {
    text-indent: 25px;
  }
}
</style>

<template>
  <full-page class="costomerpro-qrcodeupload-page">
    <mt-header slot="header" :title="$route.meta.pageTitle" class="re-mint-header">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
    </mt-header>

    <div class="add-playinfo">
      <mt-cell title="商户编号">{{customerNo}}</mt-cell>
      <mt-cell title="快速开票">{{qrcodeStatus | statusFilter('handleProductOpenStatus')}}</mt-cell>
      <mt-cell title="更新时间">{{customer.lastUpdateTime}}</mt-cell>
      <mt-cell title="商户名称">{{customerName}}</mt-cell>
      <view-radius class="uploads">
        <template>
          <upload-view :label="'营业执照'" class="item" :customerNo="customerNo" :upType="'BUSSINESS_LICENSE'" @result="resultMediaId" :dataKey="'bussinessLicenseImg'" ref="bussinessLicenseImg"></upload-view>
          <upload-view :label="'门头照片'" class="item" :customerNo="customerNo" :upType="'PLACE_IMG'" @result="resultMediaId" :dataKey="'placeImg'" ref="placeImg"></upload-view>
          <upload-view :label="'收银台照片'" class="item" :customerNo="customerNo" :upType="'CASH_SPACE_IMG'" @result="resultMediaId" :dataKey="'cashSpaceImg'" ref="cashSpaceImg"></upload-view>
        </template>
      </view-radius>
      <mt-radio v-show="notQrcode" v-model="value" v-targetTo style="text-align: center;" @click.native="visible = true" :options="['同意《支付开通协议》']"></mt-radio>
    </div>
    <mt-button class="btn" size="large" type="primary" @click="submit">确定并返回</mt-button>
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
import CustomerContract from "@src/components-app/CompanyContract/CustomerContract";

import { completeBussinessImg, getCustomerEchoProduct } from "@src/apis";
export default {
  components: {
    UploadView,
    MypPopup,
    PullDownTip,
    CustomerContract
  },
  data() {
    return {
      notQrcode: true, // 非快速开票
      // 图片显示隐藏start
      pageType: this.$route.query["type"],
      qrcodeStatus: this.$route.query["qrcodeStatus"],
      customerName: this.$route.query["customerName"],
      publicPerson: false,//对公
      corporatePerson: false,//对私法人
      unCorporatePerson: false,//对私非法人
      // 图片显示隐藏end
      visible: false,
      value: "",
      customerNo: this.$route.query["customerNo"],
      phoneNo: "",
      accountType: "",
      imgs: {},
      accountName: "",
      legalPerson: "",
      customer: {}
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
        console.log(data.data);
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
        this.customer = customer;
      }
      if (imgs instanceof Object) {
        for (let key in imgs) {
          if (imgs[key] instanceof Object) {
            if (key == "cashSpaceImg" || key == "placeImg" || key == "bussinessLicenseImg") {
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
      } else if (this.accountType == "1") {
        // 对私
        if (this.accountName == this.legalPerson) {
          // 法人
          this.corporatePerson = true;
        } else {
          // 非法人
          this.unCorporatePerson = true;
        }
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
      this.$router.back(-1)
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/base.scss";
.costomerpro-qrcodeupload-page {
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

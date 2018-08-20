<template>
  <!-- 线上商户查询 -->
  <div class="detail-box">
    <div class="detail-left">
      <div class="detail-full">
        <div class="block-box">
          <div class="title">机构信息</div>
          <ul class="content">
            <li>
              <span class="label">服务商编号: </span>
              {{detailsForm.agentNo}}
            </li>
            <li>
              <span class="label">机构商户号: </span>
              {{detailsForm.comCustomerNo}}
            </li>
            <li>
              <span class="label">服务信息: </span>
              {{detailsForm.service}}
            </li>
            <!-- <li>
              <span class="label">商户来源:</span>
              {{statusFilter(detailsForm.customerFrom,'customerFrom').text}}
            </li> -->

          </ul>
        </div>
        <div class="block-box">
          <div class="title">商户分类</div>
          <ul class="content">
            <li>
              <span class="label">商户类型: </span>
              {{statusFilter(detailsForm.customerType,'mctManageType').text}}
            </li>
            <li>
              <span class="label">开通代付:</span>
              {{detailsForm.proxyFlag=='1'?'是':'否'}}
            </li>
          </ul>
        </div>
        <div class="block-box">
          <div class="title">联系人方式</div>
          <ul>
            <li>
              <span class="label">联系人名称:</span> {{detailsForm.contactName}}</li>
            <li>
              <span class="label">联系人座机:</span> {{detailsForm.contactPhone}}</li>
            <li>
              <span class="label">联系人手机号:</span> {{detailsForm.contactMobile}}</li>
            <li>
              <span class="label">联系人邮箱:</span> {{detailsForm.contactEmail}}</li>
          </ul>
        </div>
        <div class="block-box">
          <div class="title">基本信息</div>
          <ul>
            <li>
              <span class="label">企业名称:</span> {{detailsForm.enterpriseName}}</li>
            <li v-if="enterprise">
              <span class="label">企业简称:</span> {{detailsForm.bussinessName}}</li>
            <li v-if="enterprise">
              <span class="label">经营地址:</span> {{detailsForm.bussinessAddress}}</li>
            <li v-if="enterprise">
              <span class="label">企业税号:</span> {{detailsForm.taxNo}}</li>
            <li v-if="enterprise">
              <span class="label">营业执照期限:</span> {{detailsForm.bussinessLicenseEffectiveBegin}} 至 {{detailsForm.bussinessLicenseEffectiveEnd}}</li>
            <li>
              <span class="label">法人证件类型:</span>
              {{statusFilter(detailsForm.idType,'idType').text}}
            </li>
            <li>
              <span class="label">注册地址:</span> {{detailsForm.registerAddress}}</li>
            <li>
              <span class="label">经营类型:</span> {{detailsForm.category}}</li>
          </ul>
        </div>
        <div class="block-box">
          <div class="title">结算信息</div>
          <ul>
            <li>
              <span class="label">账户类型:</span>
              {{statusFilter(detailsForm.accountType,'accountType').text}}
            </li>
            <li>
              <span class="label">结算方式:</span> {{detailsForm.settleMode}}</li>
            <li>
              <span class="label">联行号:</span> {{detailsForm.unionCode}}</li>
            <li>
              <span class="label">账户名称:</span> {{detailsForm.accountName}}</li>
            <li>
              <span class="label">收款人账户号:</span> {{detailsForm.accountNo}}</li>
            <li v-if="enterprise&&privateperson&&unCorporatePerson">
              <span class="label">预留手机号:</span> {{detailsForm.reservedPhoneNo}}</li>
            <li v-if="enterprise&&privateperson">
              <span class="label">持卡人证件号:</span> {{detailsForm.settleIdCard}}</li>
          </ul>
        </div>
        <div class="block-box">
          <div class="title">费率信息</div>
          <ul>
            <li>
              <span class="label">微信扫码费率:</span> {{utils.accMul(detailsForm.wechatScansRate,100)}}%</li>
            <li>
              <span class="label">支付宝扫码费率:</span> {{utils.accMul(detailsForm.alipayScansRate,100)}}%</li>
            <li>
              <span class="label">微信APP费率:</span> {{utils.accMul(detailsForm.wechatAppRate,100)}}%</li>
            <li>
              <span class="label">支付宝APP费率:</span> {{utils.accMul(detailsForm.alipayAppRate,100)}}%</li>
            <li>
              <span class="label">微信H5费率:</span> {{utils.accMul(detailsForm.wechatH5Rate,100)}}%</li>
            <li>
              <span class="label">支付宝H5费率:</span> {{utils.accMul(detailsForm.alipayH5Rate,100)}}%</li>
            <li v-if="detailsForm.settleMode=='T0'">
              <span class="label">T0提现手续费:</span>{{detailsForm.t0CashCostFixed}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="detail-right">
      <!-- 图片详情start -->
      <div class="imgs-scroll-box">
        <!-- {{imgsArray}} -->

        <div class="small-but pre" @click="preFn('scrollPane')" slot="preBut">《</div>
        <div class="small-but next" @click="preNext('scrollPane')" slot="nextBut">》</div>
        <scroll-pane class='imgs-view-wrapper' ref='scrollPane'>
          <div class="imgs-group">
            <div class="img-box" v-for="(item,index) in detailImgArr" :key="index">
              <p class="img-title">{{item[1].imgname}}:</p>
              <div class="img-back">
                <img @click="showImg(item[1].url,item[1],'pay',item[1].imgname,item[1].imgname,index,'carousel')" class="img-size" :src="item[1].url" alt="">
              </div>
            </div>
          </div>
        </scroll-pane>
      </div>
      <div class="large-img-box">
        <el-carousel ref="carousel" :autoplay='false' :initial-index="initialIndex" :interval="5000" trigger='click' arrow="always" height="100%">
          <el-carousel-item v-for="(item,index) in detailImgArr" :key="index" :label="item.imgname">
            <div class="large-img">
              <img @click="largeImageShow(item[1].url,'payStatus',item)" :src="item[1].url" alt="">
            </div>
            <p class="large-imgname">{{item[1].imgname}}</p>
          </el-carousel-item>
        </el-carousel>
      </div>
      <!-- 图片详情end -->
    </div>
    <transition name="slide-fade" class="fadeView">
      <largeimg-view :payStatusDetails="payStatusDetails" ref="largeImg" :imgsArr="detailImgArr" :largeImg="largeImg" :largeImgUrl="largeImgUrl" :largeImgArt="largeImgArt" :rotateClass="rotateClass" @hideImageView="hideImageView" @rotateFn="rotateFn" @rotateInit="rotateInit" :fadeViewVisible="fadeViewVisible">
      </largeimg-view>
    </transition>
  </div>
</template>
<style lang="scss">
@import "../../../../src/assets/scss-pc/payDetail.scss";
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
import Vue from "vue";
import IScrollView from "vue-iscroll-view";
import IScroll from "iscroll";
Vue.use(IScrollView, IScroll);
import imageView from 'vue-imageview'
import LargeimgView from '@src/components/LargeimgView'
import ScrollPane from "@src/components/ScrollPane";
// 组件end
import "@src/common/filters";
// table页与搜索页公用功能
import { mixinsPc } from "@src/common/mixinsPc";
import utils from "@src/common/utils";
import secret from "@src/common/secret";
import {
  getOnlineFacilitatorOrders,
  getMctManageOrdersAdd,
} from "@src/apis";
import UploadImg from "@src/components/UploadImg";
import bussinessTypeJson from "@src/data/bussinessType.json";
import { banks } from "@src/common/bank";
import settleMode from "@src/data/settleMode.json";
import { } from "@src/common/regexp";
export default {
  name: "mer_manage_orders",
  props: {
    getData: {
      type: Object
    },
    imgsArray: {
      type: Array
    }
  },
  components: {
    UploadImg,
    ScrollPane,
    ImageView: imageView,
    LargeimgView
  },
  mixins: [mixinsPc],
  data() {
    return {
      corporatePerson: false,// 法人
      unCorporatePerson: false,//非法人
      enterprise: true,//企业
      personal: true,// 个人
      public: true,// 对公
      privateperson: true,// 对私
      detailsFormDefault: {
        wechatScansRate: "",
        alipayScansRate: "",
        wechatAppRate: "",
        alipayAppRate: "",
        wechatH5Rate: "",
        alipayH5Rate: "",
        t0CashCostFixed: ""
      },
      detailsForm: {},
      detailImgArr: [],
      //图片查看器start
      payStatusDetails: {},
      rotateCurrent: 0,
      rotateClass: "",
      largeImgUrl: "",
      largeImg: {},
      initialIndex: 0,//图片滚动滚动索引
      newarr: [],
      senImgAll: {
        BUSSINESS_LICENSE: { //商户营业执照照片
          id: 'bussinessLicenseImgId'
        },
        ACCOUNT_OPENING_LICENSE: { //开户许可证照片
          id: 'accountLicenseImgId'
        },
        LEGAL_PERSON_ID_POSITIVE: { //法人身份证人像面
          id: 'identityFrontImgId'
        },
        LEGAL_PERSON_ID_BACK: { //法人身份证国徽面
          id: 'identityBackImgId'
        },
        APPLICANT_WITH_ID: { // 法人手持身份证合影照片
          id: 'identityHolderImgId'
        },
        STORE_IMG: { // 店内照片
          id: 'storeImgId'
        },
        PLACE_IMG: { // 门头照片
          id: 'placeImgId'
        },
        CASH_SPACE_IMG: { // 收银台照片
          id: 'cashSpaceImgId'
        },
        SETTLE_CARD_IMG: { // 结算卡照片
          id: 'settleCardImgId'
        },
        CERTIFICATE_IMG: { // 授权照片
          id: 'certificateImgId'
        },
        HOLD_CERTIFICATE_IMG: { // 法人手持授权照片
          id: 'holdCertificateImgId'
        },
        CARDHOLDER_ID_POSITIVE: { // 持卡人身份证人像面照片
          id: 'cardHolderFrontImgId'
        },
        CARDHOLDER_ID_BACK: { // 持卡人身份证国徽面照片
          id: 'cardHolderBackImgId'
        },
        CARDHOLDER_WITH_ID: { // 持卡人手持身份证合影照片
          id: 'cardHolderIdImgId'
        },
        OTHERS: { // 其他照片
          id: 'othersImgId'
        }
      },
      imgAll: {
        bussinessLicenseImg: {
          id: "",
          imgname: "商户营业执照照片",
          url: "",
          imgKey: "BUSSINESS_LICENSE"
        },//商户营业执照照片
        accountLicenseImg: {
          id: "",
          imgname: "开户许可证照片",
          url: "",
          imgKey: "ACCOUNT_OPENING_LICENSE"
        },//开户许可证照片
        identityFrontImg: {
          id: "",
          imgname: "法人身份证人像面",
          url: "",
          imgKey: "LEGAL_PERSON_ID_POSITIVE"
        },//法人身份证人像面
        identityBackImg: {
          id: "",
          imgname: "法人身份证国徽面",
          url: "",
          imgKey: "LEGAL_PERSON_ID_BACK"
        },//法人身份证国徽面
        identityHolderImg: {
          id: "",
          imgname: "法人手持身份证合影照片",
          url: "",
          imgKey: "APPLICANT_WITH_ID"
        },//法人手持身份证合影照片
        storeImg: {
          id: "",
          imgname: "店内照片",
          url: "",
          imgKey: "STORE_IMG"
        },//店内照片
        placeImg: {
          id: "",
          imgname: "门头照片",
          url: "",
          imgKey: "PLACE_IMG"
        },//门头照片
        cashSpaceImg: {
          id: "",
          imgname: "收银台照片",
          url: "",
          imgKey: "CASH_SPACE_IMG"
        },//收银台照片
        settleCardImg: {
          id: "",
          imgname: "结算卡照片",
          url: "",
          imgKey: "SETTLE_CARD_IMG"
        },//结算卡照片
        certificateImg: {
          id: "",
          imgname: "授权照片",
          url: "",
          imgKey: "CERTIFICATE_IMG"
        },//授权照片
        holdCertificateImg: {
          id: "",
          imgname: "法人手持授权照片",
          url: "",
          imgKey: "HOLD_CERTIFICATE_IMG"
        },//法人手持授权照片
        cardHolderFrontImg: {
          id: "",
          imgname: "持卡人身份证人像面照片",
          url: "",
          imgKey: "CARDHOLDER_ID_POSITIVE"
        },//持卡人身份证人像面照片
        cardHolderBackImg: {
          id: "",
          imgname: "持卡人身份证国徽面照片",
          url: "",
          imgKey: "CARDHOLDER_ID_BACK"
        },//持卡人身份证国徽面照片
        cardHolderIdImg: {
          id: "",
          imgname: "持卡人手持身份证合影",
          url: "",
          imgKey: "CARDHOLDER_WITH_ID"
        },//持卡人手持身份证合影照片
        othersImg: {
          id: "",
          imgname: "其他照片",
          url: "",
          imgKey: "OTHERS"
        }//其他照片
      },
      largeImgRow: [],
      largeImgArt: "",
      fadeViewVisible: false,
      //图片查看器end
      settleModeOption: settleMode,
      encryptKey: "",// 加密key
      signKey: "",// 签名key
      customerType: "enterprise",// 商户类型
      optionsArea: utils.areaPicherOptions(), //省市县数据
      labelPosition: "top",
      bankOptions: banks,
      slotsActions: bussinessTypeJson,
      bankAreaVisible: false,
      branchNameVisible: true,
      bankCity: "",
      bankCode: "",
      branchBankOptions: [],
      // 身份证正面
      uploadApi: "",
      addStep: "add",
      stepTab: {
      },
      customerNoDisabled: false,
      backForm: {},
      defaultData: {
        myarea: [],
        version: "1.0.0",
        service: "customer.register",
        companyNo: "",
        comCustomerNo: "",
        enterpriseName: "",
        bussinessName: "",
        customerType: "1",
        proxyFlag: "",
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
        accountType: "0",
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
        settleMode: "T1",
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
      formLabelWidth: "150px"
    };
  },
  methods: {
    // 配置图片显示
    configShowImg(imgType, imgString) {
      let newarr = this.newarr;
      for (var i in this.imgAll) {
        if (this.imgAll[i].imgKey == imgType) {
          newarr[i] = {
            id: i,
            imgname: this.imgAll[i].imgname,
            url: 'data:image/png;base64,' + imgString
          }
        }
        this.detailImgArr = Object.entries(newarr);
      }
    },
    // 查询图片
    searchImg(agentNo, imgId) {
      this.getEncryptKey(agentNo).then((res) => {
        let encryptKey = res.encryptKey;
        let signKey = res.signKey;
        let queryEncryptData = secret.Encrypt({ // 加密数据块
          id: imgId,
        }, encryptKey);
        getMctManageOrdersAdd()(
          {
            key: signKey,
            version: "1.0.0",
            service: 'img.download',
            companyNo: agentNo,
            encryptData: queryEncryptData
          }
        ).then((res) => {
          if (res.code == "00") {
            let encryptData = res.encryptData;
            let getImages = secret.Decrypt(encryptData, encryptKey);
            getImages = JSON.parse(getImages);
            this.configShowImg(getImages.imgType, getImages.imgString)
          } else {
            this.$message({
              message: res.msg,
              type: "warning",
              center: true
            });
          }
        })
      }).catch((error) => {
        console.log(error)
      })
    },
    initFn() {
      let dialogLoading = this.$loading({
        target: document
          .querySelector("#detailsLoding")
          .querySelector(".el-dialog")
      });
      let agentNo = this.getData.agentNo;// 服务商编号为加密key
      this.getEncryptKey(agentNo).then((res) => {
        let encryptKey = res.encryptKey;
        let signKey = res.signKey;
        let queryEncryptData = secret.Encrypt({ // 加密数据块
          customerNo: this.getData.customerNo,
        }, encryptKey);
        //查询基本信息文字
        getMctManageOrdersAdd()({
          key: signKey,
          version: "1.0.0",
          service: 'customer.query',
          companyNo: agentNo,
          encryptData: queryEncryptData
        }).then((res) => {
          if (res.code == '00' && res.encryptData) {
            let encryptData = res.encryptData;
            let getData = secret.Decrypt(encryptData, encryptKey);
            getData = JSON.parse(getData);
            let newForm = {};
            Object.assign(newForm, { ...this.detailsFormDefault }, { ...getData });
            console.log(getData);
            this.$set(this.$data, "detailsForm", newForm);
            // 查询图片start
            this.$set(this.$data, 'newarr', []);
            for (let [imgObj] of Object.entries(this.senImgAll)) {
              let imgId = imgObj.id;
              if (getData[imgId]) {
                this.searchImg(agentNo, getData[imgId])
              }
            }
            // 查询图片end
            // 判断状态start
            this.enterprise = false;//企业
            this.personal = false;//个人
            this.public = false;// 对公
            this.privateperson = false;// 对私
            this.corporatePerson = false;// 法人
            this.unCorporatePerson = false;//非法人
            let accountType = getData.accountType; //结算类型
            let customerType = getData.customerType; //商户类型
            let accountName = getData.accountName;// 账户名称
            if (customerType == 0) {
              // 个人 只能对私 并且结算人身份证等于法人身份证
              this.personal = true;
            }
            if (customerType == 1) {
              // 企业
              this.enterprise = true;
              if (accountType == 0) {
                // 对公
                this.public = true;
              }
              if (accountType == 1) {
                // 对私
                this.privateperson = true;
                if (accountName == getData.legalPerson) {
                  // 法人
                  this.corporatePerson = true;
                } else {
                  // 非法人
                  this.unCorporatePerson = true;
                }
              }
            }
            // 判断状态end



            dialogLoading.close();
          } else {
            dialogLoading.close();
          }
        })
      }).catch((error) => {
        console.log(error)
      });
    },
    largeImageShow(url, type, item) {
      this.rotateCurrent = 0
      this.rotateClass = "";
      this.largeImgUrl = url;
      this.$set(this.$data, "largeImg", { imgname: item[1].imgname, url: url, name: item.id });
      this.largeImgRow = this.detailImgArr;
      this.$refs['largeImg'].imgInit();
      this.fadeViewVisible = true;
    },
    // 图片查看器start
    showImg(url, item, imgname, type, name, initialIndex, refname) {
      this.rotateCurrent = 0
      this.rotateClass = "";
      this.largeImgUrl = url;
      this.largeImg = { imgname: item.id, url: url, name: name };
      this.setActiveItem(refname, initialIndex);
    },
    hideImageView() {
      this.fadeViewVisible = false;
    },
    setActiveItem(refname, index) {
      this.$refs[refname].setActiveItem(index)
    },
    rotateInit() {
      this.rotateCurrent = 0
      this.rotateClass = "";
    },
    rotateFn() {
      this.rotateCurrent = (this.rotateCurrent + 90) % 360;
      this.rotateClass = "rotate" + this.rotateCurrent;
    },
    preFn(refname) {
      this.$refs[refname].preFn(90)
    },
    preNext(refname) {
      this.$refs[refname].preNext(90)
    },
    resetScrollViewHeight() {
      this.$nextTick(() => {
        this.$refs.iscroll.refresh();
      })
    },
    // 图片查看器end
    getEncryptKey(agentNo) {
      // 得到加密key
      return new Promise(function (resolve, reject) {
        getOnlineFacilitatorOrders()({
          agentName: "",
          endTime: "",
          limit: 1,
          page: 1,
          startTime: "",
          status: "",
          agentNo: agentNo
        }).then((res) => {
          if (res.code == "00") {
            if (res.data.length > 0) {
              resolve({
                encryptKey: res.data[0].encryptKey,
                signKey: res.data[0].signKey,
              })
            }
          } else {
            this.$message({
              message: res.msg,
              type: "warning",
              center: true
            });
            reject('error');
          }
        })
      }).catch(() => {
        console.log("UserMenulistFetch--UnhandledPromiseRejectionWarning")
      });
    }
  },
  computed: {

  },
  mounted() { },
  watch: {

  },

  created() {

  }
};
</script>
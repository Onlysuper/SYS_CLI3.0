<template>
  <!-- 物料入库 -->
  <full-page>
    <mt-header slot="header" :title="$route.meta.pageTitle + pageTitle[pageType]">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
    </mt-header>
    <view-radius class="split-box">
      <input-wrapper>
        <!-- <mt-cell title="商户信息"></mt-cell> -->
        <mt-cell title="商户编号">
          <span>
            {{dataList.customerNo}}
          </span>
        </mt-cell>
        <mt-cell value="" title="商户状态">
          <span>{{dataList.status | statusFilter("mctManageStatus")}}</span>
        </mt-cell>
        <mt-cell title="商户来源">
          <span>
            {{dataList.customerFrom | statusFilter("customerFrom")}}
          </span>
        </mt-cell>
        <mt-cell title="商户类型">
          <span>
            {{dataList.customerType | statusFilter("mctManageType")}}
          </span>
        </mt-cell>
        <mt-cell title="经营名称">
          <span>{{dataList.bussinessName}}</span>
        </mt-cell>
        <mt-cell title="经营类目">
          <span>{{dataList.category}}</span>
        </mt-cell>
        <mt-cell title="经营电话">
          <span>{{dataList.bussinessPhone}}</span>
        </mt-cell>
        <mt-cell title="经营类型">
          <span>{{dataList.bussinessType}}</span>
        </mt-cell>
        <mt-cell title="地区编码">
          <span>{{dataList.orgCode}}</span>
        </mt-cell>
        <mt-cell title="经营地址">
          <span>{{dataList.bussinessAddress}}</span>
        </mt-cell>
      </input-wrapper>
    </view-radius>
    <view-radius class="split-box">
      <input-wrapper>
        <!-- <mt-cell title="联系方式"></mt-cell> -->
        <mt-cell title="联系人">
          <span>{{dataList.linkMan}}</span>
        </mt-cell>
        <mt-cell title="手机号">
          <span>{{dataList.phoneNo}}</span>
        </mt-cell>
        <mt-cell title="联系邮箱">
          <span>{{dataList.contactEmail}}</span>
        </mt-cell>
        <mt-cell title="客服电话">
          <span>{{dataList.servicePhone}}</span>
        </mt-cell>
      </input-wrapper>
    </view-radius>
    <view-radius class="split-box">
      <input-wrapper>
        <!-- <mt-cell title="企业信息"></mt-cell> -->
        <mt-cell title="企业名称">
          <span>{{dataList.enterpriseName}}</span>
        </mt-cell>
        <mt-cell title="企业税号">
          <span>{{dataList.taxNo}}</span>
        </mt-cell>
        <mt-cell title="注册资金">
          <span>{{dataList.registMoney}}</span>
        </mt-cell>
        <mt-cell title="注册地址">
          <span>{{dataList.registerAddress}}</span>
        </mt-cell>
        <mt-cell title="营业执照有效期开始">
          <span>{{dataList.bussinessLicenseEffectiveBegin}}</span>
        </mt-cell>
        <mt-cell title="营业执照有效期结束">
          <span>{{dataList.bussinessLicenseEffectiveEnd}}</span>
        </mt-cell>
        <mt-cell title="法人姓名">
          <span>
            {{dataList.legalPerson}}
          </span>
        </mt-cell>
        <mt-cell title="法人身份证号">
          <span>
            {{dataList.idCard}}
          </span>
        </mt-cell>
        <mt-cell title="证件类型">
          <span>{{dataList.idType | statusFilter("idType")}}</span>
        </mt-cell>
        <mt-cell title="证件有效期开始时间">
          <span>{{dataList.idNoEffectiveBegin}}</span>
        </mt-cell>
        <mt-cell title="证件有效期结束时间">
          <span>{{dataList.idNoEffectiveEnd}}</span>
        </mt-cell>
      </input-wrapper>
    </view-radius>
    <view-radius class="split-box">
      <input-wrapper>
        <!-- <mt-cell title="商户信息"></mt-cell> -->
        <mt-cell title="机构商户号">
          <span>
            {{dataList.comCustomerNo}}
          </span>
        </mt-cell>
        <mt-cell title="服务商编号">
          <span>{{dataList.agentNo}}</span>
        </mt-cell>
        <mt-cell title="服务商等级">
          <span>
            {{dataList.level}}
          </span>
        </mt-cell>
        <mt-cell title="服务商等级详情">
          <span>
            {{dataList.levelDetail}}
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
    ...mapActions(["getMctManageOrders"]),
    init() {
      if (this.pageType == "DETAIL") {
        this.surePage = false;
        this.getMctManageOrders({
          customerNo: this.customerNo,
          createTime: this.createTime
        }).then(datalist => {
          console.log(datalist);
          this.dataList = { ...datalist }
        });
      }
    }
  }
};
</script>

<style>
</style>

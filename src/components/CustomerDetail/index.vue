<template>
  <!-- 商户信息详情 -->
<div class="detail-content">
      <div class="line-label-box cross-back">
          <span class="line-label">企业名称:</span>{{customerDetail.enterpriseName || ""}}
        </div>
        <div class="line-label-box cross-back">
          <span class="line-label">企业税号:</span>{{customerDetail.taxNo}}
        </div>
        <div class="line-label-box cross-back">
          <span class="line-label">企业法人:</span>{{customerDetail.legalPerson}}
        </div>
        <div class="line-label-box cross-back">
          <span class="line-label">身份证:</span>{{customerDetail.idCard}}
        </div>
        <div class="line-label-box cross-back">
          <span class="line-label">联系人:</span>{{customerDetail.linkMan}}
        </div>
        <div class="line-label-box cross-back">
          <span class="line-label">手机号:</span>{{customerDetail.phoneNo}}
        </div>
        <div class="line-label-box cross-back">
          <span class="line-label">商户编号:</span>{{customerDetail.customerNo}}
        </div>
        <div class="line-label-box cross-back">
          <span class="line-label">商户来源:</span>{{customerDetail.customerFrom | statusFilter("customerFrom")}}
        </div>
        <div class="line-label-box cross-back">
          <span class="line-label">公司电话:</span>{{customerDetail.bussinessPhone}}
        </div>
        <div class="line-label-box cross-back">
          <span class="line-label">经营名称:</span>{{customerDetail.bussinessName}}
        </div>
        <div class="line-label-box cross-back">
          <span class="line-label">经营地址:</span>{{customerDetail.bussinessAddress}}
        </div>
      </div>
</template>
<style lang="scss" scoped>
 
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
  import { mapState } from 'vuex'
  // table页与搜索页公用功能
  import { mixinsPc } from "@src/common/mixinsPc";
  import utils from "@src/common/utils";
  // import {
  //   getMctManageOrders
  // } from "@src/apis";
  export default {
    name: "customer_detail",
    // props:['customerNo'],
    components: {
    },
    mixins: [mixinsPc],
    data() {
      return {
        customerDetail:{}
      }
    },
    methods: {
      init(customerNo,api){
        api()({
          page: 1,
          limit: 10,
          customerNo: customerNo,
          taxNo: "",
          enterpriseName: "",
          createTimeStart: "",
          createTimeEnd: "",
          agentNo: "",
          customerFrom: "",
          containChild: ''
        }).then((res) => {
          if (res.code == '00') {
            if (customerNo) {
              if(res.data.length>0){
                this.customerDetail = { ...res.data[0] };
              }
              // this.showCustomerDetail();
            }
          }
        })
      },
      goback() {
        this.$emit("showIndex");
      },
      showCustomerDetail(){
         this.$emit("showCustomerDetail");
      }
    },
    computed: {
      ...mapState({
        detailsForm: state => state.customer_detail.list
      })
    },
    mounted() {
      // this.init(); 
     },
    watch: {
     
    }
  };
</script>
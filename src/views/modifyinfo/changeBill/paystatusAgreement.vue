<template>
  <div class="agreement-box">
    <div class="agreement-content">
      <!-- 协议写这里start -->
      <customer-server></customer-server>
      <!-- 协议end -->
    </div>
    <div center slot="footer" class="dialog-footer">
      <el-button @click="goback()">返回</el-button>
    </div>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang='scss'>
@media screen and (min-width: 500px) {
  .agreement-box {
    .section-box {
      .title {
        text-align: center;
      }
      .section {
        padding-bottom: 24px;
        p {
          padding-bottom: 10px;
        }
      }
    }
    .agreement-content {
      width: 100%;
      height: 600px;
      overflow-y: auto;
      overflow-x: hidden;
    }
    .dialog-footer {
      text-align: center;
    }
  }
}
</style>
<script>
import { mixinsPc } from "@src/common/mixinsPc";
import CustomerServer from "@src/components/CompanyContract/CustomerContract";
// table页与搜索页公用功能
export default {
  name: "changeBillPaystatusAgreement",
  components: { CustomerServer },
  mixins: [mixinsPc],
  data() {
    return {};
  },
  methods: {
    goback() {
      this.$emit("goback_c");
    }
  },
  created() { },
  computed: {},
  watch: {}
};
</script>


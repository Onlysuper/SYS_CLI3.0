<template>
  <search-page v-model="searchVisible" :config="searchConfig" @result="searchPanelResult" title=""></search-page>
</template>

<script>
import SearchPage from "@src/components-app/Search/SearchPage";
import { mapState } from "vuex";
import { statusFilterQuery } from "@src/common/mixins";
export default {
  components: { SearchPage },
  mixins: [statusFilterQuery],
  data() {
    return {
      searchVisible: true,
      searchConfig: []
    };
  },
  computed: {
    ...mapState({
      searchQuery: state => state.mctManageOrders.searchQuery
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.searchConfig.push({
        title: "开始日期",
        type: "myp-date-time",
        defaultValue: this.searchQuery.startTime,
        cb: value => {
          this.$store.commit("MCTMANAGEORDERS_QUERY_SET_SEARCH", {
            startTime: value.substring(0, value.length - 2) + "00"
          });
        }
      });
      this.searchConfig.push({
        title: "结束日期",
        type: "myp-date-time",
        defaultValue: this.searchQuery.endTime,
        cb: value => {
          this.$store.commit("MCTMANAGEORDERS_QUERY_SET_SEARCH", {
            endTime: value.substring(0, value.length - 2) + "59"
          });
        }
      });
      this.searchConfig.push({
        title: "商户编号",
        placeholder: "商户编号",
        type: "myp-text",
        defaultValue: this.searchQuery.customerNo,
        cb: value => {
          this.$store.commit("MCTMANAGEORDERS_QUERY_SET_SEARCH", {
            customerNo: value
          });
        }
      });
      this.searchConfig.push({
        title: "机构商户号",
        type: "myp-text",
        defaultValue: this.searchQuery.comCustomerNo,
        cb: value => {
          this.$store.commit("MCTMANAGEORDERS_QUERY_SET_SEARCH", {
            comCustomerNo: value
          });
        }
      });
      this.searchConfig.push({
        title: "手机号",
        type: "myp-text",
        defaultValue: this.searchQuery.phoneNo,
        cb: value => {
          this.$store.commit("MCTMANAGEORDERS_QUERY_SET_SEARCH", {
            phoneNo: value
          });
        }
      });
      this.searchConfig.push({
        title: "法人身份证号",
        type: "myp-text",
        defaultValue: this.searchQuery.idCard,
        cb: value => {
          this.$store.commit("MCTMANAGEORDERS_QUERY_SET_SEARCH", {
            idCard: value
          });
        }
      });
      this.searchConfig.push({
        title: "状态",
        type: "myp-select",
        defaultValue: this.searchQuery.status,
        values:
          [
            {
              name: "全部",
              code: ""
            },
            ...this.statusFilterQuery('mctManageStatus')
          ],
        cb: value => {
          this.$store.commit("MCTMANAGEORDERS_QUERY_SET_SEARCH", {
            status: value
          });
        }
      });
      this.searchConfig.push({
        title: "企业税号",
        type: "myp-text",
        defaultValue: this.searchQuery.taxNo,
        cb: value => {
          this.$store.commit("MCTMANAGEORDERS_QUERY_SET_SEARCH", {
            taxNo: value
          });
        }
      });
      this.searchConfig.push({
        title: "服务商编号",
        type: "myp-text",
        defaultValue: this.searchQuery.agentNo,
        cb: value => {
          this.$store.commit("MCTMANAGEORDERS_QUERY_SET_SEARCH", {
            agentNo: value
          });
        }
      });
      this.searchConfig.push({
        title: "商户类型",
        type: "myp-select",
        defaultValue: this.searchQuery.type,
        values:
          [
            {
              name: "全部",
              code: ""
            },
            ...this.statusFilterQuery('mctManageType')
          ],
        cb: value => {
          this.$store.commit("MCTMANAGEORDERS_QUERY_SET_SEARCH", {
            type: value
          });
        }
      });
    });
  },
  methods: {
    searchPanelResult() {
      this.$store.commit("MCTMANAGEORDERS_QUERY_IS_SEARCH", true);
      this.$router.back();
    }
  }
};
</script>

<style>
</style>

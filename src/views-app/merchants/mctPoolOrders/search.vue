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
      searchQuery: state => state.mctPoolOrders.searchQuery
    }),
    isCustomer() {
      this.$store.state.userInfoAndMenu.isCustomer
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.searchConfig.push({
        title: "开始日期",
        type: "myp-date-time",
        defaultValue: this.searchQuery.startTime,
        cb: value => {
          this.$store.commit("MCTPOOLORDERS_QUERY_SET_SEARCH", {
            startTime: value.substring(0, value.length - 2) + "00"
          });
        }
      });
      this.searchConfig.push({
        title: "结束日期",
        type: "myp-date-time",
        defaultValue: this.searchQuery.endTime,
        cb: value => {
          this.$store.commit("MCTPOOLORDERS_QUERY_SET_SEARCH", {
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
          this.$store.commit("MCTPOOLORDERS_QUERY_SET_SEARCH", {
            customerNo: value
          });
        }
      });
      this.searchConfig.push({
        title: "业务类型",
        type: "myp-select",
        defaultValue: this.searchQuery.bussinessType,
        values:
          [
            {
              name: "全部",
              code: ""
            },
            ...this.statusFilterQuery('mctPoolBussinessType')
          ],
        cb: value => {
          this.$store.commit("MCTPOOLORDERS_QUERY_SET_SEARCH", {
            bussinessType: value
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
            ...this.statusFilterQuery('mctPoolStatus')
          ],
        cb: value => {
          this.$store.commit("MCTPOOLORDERS_QUERY_SET_SEARCH", {
            status: value
          });
        }
      });
      this.searchConfig.push({
        title: "交易金额等级",
        type: "myp-select",
        defaultValue: this.searchQuery.payAmount,
        values:
          [
            {
              name: "全部",
              code: ""
            },
            ...this.statusFilterQuery('mctPoolPayAmount')
          ],
        cb: value => {
          this.$store.commit("MCTPOOLORDERS_QUERY_SET_SEARCH", {
            payAmount: value
          });
        }
      });
      this.searchConfig.push({
        title: "地区编码",
        placeholder: "地区编码",
        type: "myp-text",
        defaultValue: this.searchQuery.orgCode,
        cb: value => {
          this.$store.commit("MCTPOOLORDERS_QUERY_SET_SEARCH", {
            orgCode: value
          });
        }
      });
    });
  },
  methods: {
    searchPanelResult() {
      this.$store.commit("MCTPOOLORDERS_QUERY_IS_SEARCH", true);
      this.$router.back();
    }
  }
};
</script>

<style>
</style>

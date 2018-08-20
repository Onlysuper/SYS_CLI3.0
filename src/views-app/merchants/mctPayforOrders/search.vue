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
      searchQuery: state => state.mctPayforOrders.searchQuery
    }),
    isCustomer() {
      return this.$store.state.userInfoAndMenu.isCustomer;
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.searchConfig.push({
        title: "开始日期",
        type: "myp-date-time",
        defaultValue: this.searchQuery.startTime,
        cb: value => {
          this.$store.commit("MCTPAYfORORDERS_QUERY_SET_SEARCH", {
            startTime: value.substring(0, value.length - 2) + "00"
          });
        }
      });
      this.searchConfig.push({
        title: "结束日期",
        type: "myp-date-time",
        defaultValue: this.searchQuery.endTime,
        cb: value => {
          let newtime = value.substring(0, value.length - 2) + "59";
          console.log(newtime);
          this.$store.commit("MCTPAYfORORDERS_QUERY_SET_SEARCH", {
            endTime: newtime
          });
        }
      });
      this.searchConfig.push({
        title: "商户订单号",
        type: "myp-text",
        defaultValue: this.searchQuery.merOrderNo,
        cb: value => {
          this.$store.commit("MCTPAYfORORDERS_QUERY_SET_SEARCH", {
            merOrderNo: value
          });
        }
      });
      this.searchConfig.push({
        title: "系统订单号",
        type: "myp-text",
        defaultValue: this.searchQuery.plaOrderNo,
        cb: value => {
          this.$store.commit("MCTPAYfORORDERS_QUERY_SET_SEARCH", {
            plaOrderNo: value
          });
        }
      });

      this.searchConfig.push({
        title: "代付类型",
        type: "myp-select",
        defaultValue: this.searchQuery.payType,
        values:
          [
            {
              name: "全部",
              code: ""
            },
            ...this.statusFilterQuery('mctPayforAccountType')
          ],
        cb: value => {
          this.$store.commit("MCTPAYfORORDERS_QUERY_SET_SEARCH", {
            payType: value
          });
        }
      });
      this.searchConfig.push({
        title: "代付状态",
        type: "myp-select",
        defaultValue: this.searchQuery.status,
        values:
          [
            {
              name: "全部",
              code: ""
            },
            ...this.statusFilterQuery('mctPayforStatus')
          ],
        cb: value => {
          this.$store.commit("MCTPAYfORORDERS_QUERY_SET_SEARCH", {
            status: value
          });
        }
      });
      if (!this.isCustomer) {
        this.searchConfig.push({
          title: "商户编号",
          type: "myp-text",
          defaultValue: this.searchQuery.customerNo,
          cb: value => {
            this.$store.commit("MCTPAYfORORDERS_QUERY_SET_SEARCH", {
              customerNo: value
            });
          }
        });
      }
    });
  },
  methods: {
    searchPanelResult() {
      this.$store.commit("MCTPAYfORORDERS_QUERY_IS_SEARCH", true);
      this.$router.back();
    }
  }
};
</script>

<style>
</style>

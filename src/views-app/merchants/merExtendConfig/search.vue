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
      searchQuery: state => state.merExtendConfig.searchQuery
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.searchConfig.push({
        title: "开始日期",
        type: "myp-date-time",
        defaultValue: this.searchQuery.startTime,
        cb: value => {
          this.$store.commit("MEREXTENDCONFIG_QUERY_SET_SEARCH", {
            startTime: value.substring(0, value.length - 2) + "00"
          });
        }
      });
      this.searchConfig.push({
        title: "结束日期",
        type: "myp-date-time",
        defaultValue: this.searchQuery.endTime,
        cb: value => {
          this.$store.commit("MEREXTENDCONFIG_QUERY_SET_SEARCH", {
            endTime: value.substring(0, value.length - 2) + "59"
          });
        }
      });
      this.searchConfig.push({
        title: "商户编号",
        type: "myp-text",
        defaultValue: this.searchQuery.customerNo,
        cb: value => {
          this.$store.commit("MEREXTENDCONFIG_QUERY_SET_SEARCH", {
            customerNo: value
          });
        }
      });

      this.searchConfig.push({
        title: "是否跳码商户",
        type: "myp-select",
        defaultValue: this.searchQuery.jumpCustomer,
        values:
          [
            {
              name: "全部",
              code: ""
            },
            ...this.statusFilterQuery('merExtendConfigJump')
          ],
        cb: value => {
          this.$store.commit("MEREXTENDCONFIG_QUERY_SET_SEARCH", {
            jumpCustomer: value
          });
        }
      })
    });
  },
  methods: {
    searchPanelResult() {
      this.$store.commit("MEREXTENDCONFIG_QUERY_IS_SEARCH", true);
      this.$router.back();
    }
  }
};
</script>

<style>
</style>

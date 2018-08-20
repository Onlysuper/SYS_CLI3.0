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
      searchQuery: state => state.onlineFacilitatorOrders.searchQuery
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.searchConfig.push({
        title: "开始日期",
        type: "myp-date-time",
        defaultValue: this.searchQuery.startTime,
        cb: value => {
          this.$store.commit("ONLINEFACILITATORORDERS_QUERY_SET_SEARCH", {
            startTime: value.substring(0, value.length - 2) + "00"
          });
        }
      });
      this.searchConfig.push({
        title: "结束日期",
        type: "myp-date-time",
        defaultValue: this.searchQuery.endTime,
        cb: value => {
          this.$store.commit("ONLINEFACILITATORORDERS_QUERY_SET_SEARCH", {
            endTime: value.substring(0, value.length - 2) + "59"
          });
        }
      });
      this.searchConfig.push({
        title: "服务商编号",
        type: "myp-text",
        defaultValue: this.searchQuery.agentNo,
        cb: value => {
          this.$store.commit("ONLINEFACILITATORORDERS_QUERY_SET_SEARCH", {
            agentNo: value
          });
        }
      });
      this.searchConfig.push({
        title: "服务商名称",
        type: "myp-text",
        defaultValue: this.searchQuery.agentName,
        cb: value => {
          this.$store.commit("ONLINEFACILITATORORDERS_QUERY_SET_SEARCH", {
            agentName: value
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
            ...this.statusFilterQuery('onlineFacilitatorOrdersStatus')
          ],
        cb: value => {
          this.$store.commit("ONLINEFACILITATORORDERS_QUERY_SET_SEARCH", {
            status: value
          });
        }
      })
    });
  },
  methods: {
    searchPanelResult() {
      this.$store.commit("ONLINEFACILITATORORDERS_QUERY_IS_SEARCH", true);
      this.$router.back();
    }
  }
};
</script>

<style>
</style>

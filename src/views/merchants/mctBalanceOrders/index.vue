<template>
  <!-- 商户代付订单 -->
  <div class="admin-page">
    <div class="admin-main-box" style="background:#f0f0f0" v-if="isCustomer">
      <div class="myp-card">
        <div class="header">
          <div class="title">代付账户余额</div>
        </div>
        <div class="container">
          <div>
            {{customerBalance}}
          </div>
          <el-tag v-if="customerBalanceStatus" :type="customerBalanceStatus==1?'success':''"> {{customerBalanceStatus | statusFilter('merBalanceAccStatus')}}</el-tag>
        </div>
        <div class="footer">
          <el-button @click="customerBalanceSc" size="small" type="primary">查询余额</el-button>
        </div>
      </div>
    </div>
    <div class="admin-main-box" v-if="!isCustomer">
      <!-- search form start -->
      <myp-search-form @changeform="callbackformHandle" @resetInput="resetSearchHandle" @visiblesome="visiblesomeHandle" @changeSearchVisible="changeSearchVisible" @seachstart="seachstartHandle" :searchOptions="searchOptions"></myp-search-form>
      <!-- search form end -->
      <div class="operation-box">
        <el-button-group class="button-group">
          <!-- <el-button v-if="adminFilter('mer_balance_orders_search_balance')" class="mybutton" @click="searchMoney" :loading="sumLoading" size="small" type="primary">批量查询余额</el-button> -->
        </el-button-group>
      </div>
      <myp-data-page :actionUrl="actionUrl" @pagecount="pagecountHandle" @pagelimit="pagelimitHandle" @operation="operationHandle" ref="dataTable" :tableDataInit="tableData" :page="postPage" :limit="postLimit" :search="searchCondition"></myp-data-page>
    </div>

    <!-- 商户start -->
    <el-dialog v-dialogDrag title="商户信息" center :visible.sync="customerDetailVisible" width="400px">
      <customer-detail ref="customerDetail" @showIndex="showIndex" @showCustomerDetail="showCustomerDetail"></customer-detail>
    </el-dialog>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.myp-card {
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 250px;
  background: #fff;
  padding: 20px;
  margin-top: 20px;
  margin-left: 10px;
  .header {
    flex: 0 0 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .title {
      flex: 1;
      color: rgba(0, 0, 0, 0.45);
    }
  }
  .container {
    flex: 1;
    font-size: 30px;
    .small-text {
      font-size: 12px;
    }
  }
  .footer {
    flex: 0 1 0;
    padding: 10px;
    text-align: right;
    border-top: 1px solid #e8e8e8;
  }
}
</style>

<script>
import "@src/common/filters";
import SearchForm from "@src/components/SearchForm";
import DataPage from "@src/components/DataPage";
import CustomerDetail from "@src/components/CustomerDetail";
// table页与搜索页公用功能
import { mixinsPc } from "@src/common/mixinsPc";
import { mixinDataTable } from "@src/components/DataPage/dataPage";
import { todayStr } from "@src/common/dateSerialize";
import { } from "@src/common/regexp";
import utils from "@src/common/utils";
import {
  getMctBalanceOrders,
  getMctBalanceOrdersOne,
  getMctPayforOrdersSum
} from "@src/apis";

export default {
  name: "mer_balance_orders",
  components: {
    "myp-search-form": SearchForm, // 搜索组件
    "myp-data-page": DataPage, // 数据列表组件
    CustomerDetail
  },
  mixins: [mixinDataTable, mixinsPc],
  data() {
    return {
      customerBalance: "",
      customerBalanceStatus: "",
      customerDetail: {},
      customerDetailVisible: false,
      amountSum: "0",
      amountCount: "0",
      sumVisible: false,
      sumLoading: false,
      detailsFormVisible: false, // 详情框
      editFormVisible: false, // 编辑框
      formLabelWidth: "100px",
      editFormRules: {}, // 编辑单个规则
      editForm: {}, // 编辑单个表单
      detailsForm: {}, // 详情单个表单
      // 查询条件数据
      searchCondition: {
        customerNo: "",
        startTime: "", // 开始时间
        endTime: todayStr + " 23:59:59" // 结束时间
      },
      // 顶部搜索表单信息
      searchOptions: {
        lableWidth: "100px",
        searchList: []
      },
      // 列表数据
      actionUrl: getMctBalanceOrders,
      tableData: {
        havecheck: false, //是否显示选择框
        addKeys: [
          {
            key: "账户余额",
            width: "155px",
            word: "money",
            val: "",
          }, {
            key: "账户状态",
            width: "155px",
            word: "accStatus",
            val: "",
          }
        ],
        dataHeader: [
          // table列信息 key=>表头标题，word=>表内容信息

        ],
        operation: {
          width: "80px",
          options: [
            // 操作按钮
            {
              text: "查询余额",
              color: "#1890ff",
              loading: true,
              visibleFn: () => {
                return this.adminFilter('mer_balance_orders_search_balance')
              },
              cb: (rowdata, operationLoading, index) => {
                this.getMctBalanceOrdersOneFn(rowdata, operationLoading, index);
              }
            }
          ]
        }
      }
    };
  },
  created() {
    this.$nextTick(() => {
      let isCustomer = this.isCustomer;
      this.searchOptions.searchList.push(
        // 请注意 该数组里对象的corresattr属性值与searchCondition里面的属性是一一对应的 不可少
        {
          corresattr: "startTime",
          type: "dateTime",
          label: "起始时间",
          clearable: true,
          show: true, // 普通搜索显示
          defaultVlue: "",
          visible: isCustomer ? "TRUE" : "FALSE",
          value: "",
          cb: value => {
            this.searchCondition.startTime = value;
          }
        },
        {
          corresattr: "endTime",
          type: "dateTime",
          label: "结束时间",
          visible: isCustomer ? "TRUE" : "FALSE",
          clearable: true,
          show: true, // 普通搜索显示
          defaultVlue: todayStr + " 23:59:59",
          value: todayStr + " 23:59:59",
          cb: value => {
            this.searchCondition.endTime = value;
          }
        },
        {
          corresattr: "customerNo",
          type: "text",
          label: "商户编号",
          show: true, // 普通搜索显示
          defaultVlue: "",
          value: "",
          visible: isCustomer ? "TRUE" : "FALSE",
          cb: value => {
            this.searchCondition.customerNo = value;
          }
        }
      )

      // 搜索条件end
      // table start
      this.tableData.dataHeader.push( // table列信息 key=>表头标题，word=>表内容信息
        {
          key: "创建时间",
          width: "155px",
          word: "createTime"
        },
        {
          key: "更新时间",
          width: "155px",
          word: "lastUpdateTime"
        },
        {
          key: "商户编号",
          width: "155px",
          word: "customerNo",
          hidden: isCustomer
        },
        {
          key: "代付账号",
          width: "100px",
          word: "accountNo"
        },
        {
          key: "商户秘钥",
          width: "155px",
          word: "customerKey"
        },
        {
          key: "账户余额(元)",
          width: "155px",
          word: "money",
          type: data => {
            if (data != "") {
              return {
                text: utils.accMul(data, 0.01),
                type: ""
              };
            } else {
              return {
                text: data,
                type: ""
              };
            }
          }
        },
        {
          key: "账户状态",
          width: "100px",
          word: "accStatus",
          status: true,
          type: data => {
            return this.statusFilter(data, 'merBalanceAccStatus')
          }
        }
      )
      // table end
    })
  },
  methods: {
    //商户查询余额
    customerBalanceSc() {
      getMctBalanceOrdersOne()({}).then(res => {
        if (res.code == "00") {
          let getData = JSON.parse(res.data);
          if (getData.money != "" && getData.money != null && getData.money != undefined) {
            this.customerBalance = "¥" + utils.accMul(getData.money, 0.01);
          } else {
            this.customerBalance = getData.money
          }
          this.customerBalanceStatus = getData.accStatus;
        } else {
          this.$message({
            message: res.msg,
            type: "warning",
            center: true
          });
        }
      })
    },
    //非商户
    getMctBalanceOrdersOneFn(rowdata, operationLoading, index) {
      getMctBalanceOrdersOne()({
        customerNo: rowdata.customerNo
      }).then((res) => {
        if (res.code == "00") {
          let data = JSON.parse(res.data);
          rowdata.accStatus = data.accStatus + "";
          rowdata.money = data.money + "";
        } else {
          this.$message({
            message: res.msg,
            type: "warning",
            center: true
          });
        }
        operationLoading[index] = false;
      })
    },
    // 批量查询余额
    searchMoney() {
      this.$nextTick(() => {

      })
    },
    showIndex() {
      this.customerDetailVisible = false;
    },
    showCustomerDetail() {
      this.customerDetailVisible = 'show';
    },
    seachstartHandle() {
      // 开始搜索
      this.reloadData();
      this.sumVisible = false;
    },
    // 合计
    SumHandle() {
      this.sumVisible = true;
      this.sumLoading = true;
      var searchCondition = this.searchCondition;
      getMctPayforOrdersSum()({
        ...searchCondition
      }).then(res => {
        if (res.code == "00") {
          var data = res.data;
          this.amountCount = data.amountCount ? data.amountCount : 0;
          this.amountSum = data.amountSum ? data.amountSum : 0;
          this.sumVisible = true;
        } else {
          this.$message({
            message: res.msg,
            type: "warning",
            center: true
          });
        }
        this.sumLoading = false;
      });
    },
    resetAddForm(formName) {
      this.$refs[formName].resetFields();
    },


  },
  computed: {
    isCustomer() {
      return this.$store.state.userInfoAndMenu.isCustomer;
    }
  },
  mounted() { },
  watch: {
    detailsFormVisible(val) {
      this.saveLoadingStop(val);
    },
    editFormVisible(val) {
      this.saveLoadingStop(val);
    },
  }
};
</script>
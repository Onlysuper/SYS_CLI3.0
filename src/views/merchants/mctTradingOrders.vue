<template>
  <!-- 交易订单查询 -->
  <div class="admin-page">
    <div class="admin-main-box">
      <!-- search form start -->
      <myp-search-form @changeform="callbackformHandle" @resetInput="resetSearchHandle" @visiblesome="visiblesomeHandle" @changeSearchVisible="changeSearchVisible" @seachstart="seachstartHandle" :searchOptions="searchOptions"></myp-search-form>
      <div class="operation-box">
        <el-button-group class="button-group">
          <el-button v-if="adminFilter('mer_trading_orders_export')" size="small" @click="exportDialog" type="primary" icon="el-icon-upload">导出</el-button>
          <el-button v-if="adminFilter('mer_trading_orders_total')" class="mybutton" @click="SumHandle" :loading="sumLoading" size="small" type="primary" icon="el-icon-plus">合计</el-button>
          <span v-if="sumVisible" class="sumtext">
            <span>交易金额:{{utils.accMul(amountSum,0.01)}}元</span>
            <span class="split-line-v"></span>
            <span>交易笔数:{{amountCount}}笔</span>
          </span>
        </el-button-group>
      </div>
      <!-- search form end -->
      <myp-data-page :actionUrl="actionUrl" @pagecount="pagecountHandle" @pagelimit="pagelimitHandle" @operation="operationHandle" ref="dataTable" :tableDataInit="tableData" :page="postPage" :limit="postLimit" :search="searchCondition"></myp-data-page>
    </div>
    <!-- 详情 start -->
    <el-dialog class="detail-full-dialog" width="90%" height="90%" top="5%" title="交易订单详情" center :visible.sync="detailsFormVisible">
      <div class="detail-full">
        <div class="block-box">
          <div class="title">商户信息</div>
          <ul class="content">
            <li>
              <span class="label">商户编号: </span>
              {{detailsForm.customerNo}}
            </li>
            <li>
              <span class="label">支付类型: </span>
              {{detailsForm.payTypeDetail}}
            </li>
            <li>
              <span class="label">目标商户: </span>
              {{detailsForm.targetCustomerNo}}
            </li>
            <li>
              <span class="label">商户名称: </span>
              {{detailsForm.customerName}}
            </li>
            <li>
              <span class="label">机构编号: </span>
              {{detailsForm.companyNo}}
            </li>
          </ul>
        </div>
        <div class="block-box">
          <div class="title">渠道信息</div>
          <ul class="content">
            <li>
              <span class="label">交易来源: </span>
              {{detailsForm.payFrom}}
            </li>
            <li>
              <span class="label">通道编号: </span>
              {{detailsForm.channelNo}}
            </li>
            <li>
              <span class="label">渠道订单号: </span>
              {{detailsForm.channelOrderNo}}
            </li>
            <li>
              <span class="label">渠道商编: </span>
              {{detailsForm.channelCustNo}}
            </li>
            <li>
              <span class="label">渠道费率: </span>
              {{utils.accMul(detailsForm.chFeeRate, 100)+'%'}}
            </li>
            <li>
              <span class="label">渠道手续费: </span>
              {{utils.accMul(detailsForm.chFee,0.01)}}元
            </li>
          </ul>
        </div>
        <div class="block-box">
          <div class="title">订单信息</div>
          <ul class="content">
            <li v-if="isCustomer">
              <span class="label">{{isCustomer ? "订单号" : "商户订单号"}}: </span>
              {{detailsForm.companyOrderNo}}
            </li>
            <li>
              <span class="label">系统订单号: </span>
              {{detailsForm.orderNo}}
            </li>
            <li>
              <span class="label">订单状态: </span>
              {{statusFilter(detailsForm.status,'mctTradingStatus').text}}
            </li>
            <li>
              <span class="label">订单金额:</span>
              {{utils.accMul(detailsForm.amount, 0.01)}}元
            </li>
            <li>
              <span class="label">订单手续费: </span>
              {{utils.accMul(detailsForm.fee, 0.01)}}元
            </li>
            <li>
              <span class="label">费率: </span>
              {{utils.accMul(detailsForm.feeRate, 100)+'%'}}
            </li>
            <li>
              <span class="label">币种: </span>
              {{detailsForm.currency}}
            </li>
            <li>
              <span class="label">结算类型: </span>
              {{detailsForm.settleMode}}
            </li>
            <li>
              <span class="label">交易类型: </span>
              {{statusFilter(detailsForm.payType,'mctTradingPayType').text}}
              <!-- {{ mctTradingPayType}} -->
            </li>
            <li>
              <span class="label">订单类型: </span>
              {{statusFilter(detailsForm.transType,'mctTradingTransType').text}}
            </li>
            <li v-if="detailsForm.status=='SUCCESS'">
              <span class="label">支付成功时间: </span>
              {{detailsForm.paySuccTime}}
            </li>
          </ul>
        </div>
        <div class="block-box">
          <div class="title">其他信息</div>
          <ul class="content">
            <li>
              <span class="label">通道返回码: </span>
              {{detailsForm.respCode}}
            </li>
            <li>
              <span class="label">交易同步标识: </span>
              {{detailsForm.syncFlag}}
            </li>
            <li>
              <span class="label">借贷标识: </span>
              {{detailsForm.bankType}}
            </li>
            <li>
              <span class="label">抹零金额: </span>
              {{utils.accMul(detailsForm.ignoreAmount,0.01)}}元
            </li>
            <li>
              <span class="label">折扣金额: </span>
              {{utils.accMul(detailsForm.discountAmount,0.01)}}元
            </li>
            <li>
              <span class="label">原始金额: </span>
              {{utils.accMul(detailsForm.originalAmount,0.01)}}元
            </li>
            <li>
              <span class="label">交易账户: </span>
              {{detailsForm.account}}
            </li>
            <li>
              <span class="label">交易授权码: </span>
              {{detailsForm.authCode}}
            </li>
            <li>
              <span class="label">原始订单号: </span>
              {{detailsForm.originalOrderNo}}
            </li>
            <li>
              <span class="label">接入机构原始订单号: </span>
              {{detailsForm.comOriginalOrderNo}}
            </li>
          </ul>
        </div>

      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="detailsFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 详情 end -->
  </div>
</template>
<style lang="scss">
@import "../../assets/scss-pc/dialog-detail.scss";
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
import "@src/common/filters";
import SearchForm from "@src/components/SearchForm";
import DataPage from "@src/components/DataPage";
// table页与搜索页公用功能
import { mixinsPc } from "@src/common/mixinsPc";
import { mixinDataTable } from "@src/components/DataPage/dataPage";
import { todayStr, yesterdayStr, ThisWeekStr, LastWeekStr } from "@src/common/dateSerialize";
import { } from "@src/common/regexp";
import utils from "@src/common/utils";
import {
  getMctTradingOrders,
  getMctTradingOrdersSum,
  getMctTradingOrdersGw,
  getMctTradingOrdersSumGw,
} from "@src/apis";
export default {
  name: "mer_trading_orders",
  components: {
    "myp-search-form": SearchForm, // 搜索组件
    "myp-data-page": DataPage // 数据列表组件
  },
  mixins: [mixinDataTable, mixinsPc],
  data() {
    var isZf1500 = this.$store.state.userInfoAndMenu.isZf1500;
    // 是否为商户角色
    return {
      exportForm: {
        page: 1,
        limit: 99999999999,
        merOrderNo: "",
        plaOrderNo: "",
        customerNo: "",
        payType: "",
        status: "",
        transType: "",
      },
      amountSum: "0",
      amountCount: "0",
      sumVisible: false,
      sumLoading: false,
      addForm: {},
      addFormRules: {
        name: [{ required: true, message: "请输入资质名称", trigger: "blur,change" }],
        tax: [{ required: true, message: "请输入税号", trigger: "blur,change" }]
      },
      detailsFormVisible: false, // 详情框
      editFormVisible: false, // 编辑框
      formLabelWidth: "100px",
      editFormRules: {}, // 编辑单个规则
      editForm: {}, // 编辑单个表单
      detailsForm: {}, // 详情单个表单
      // 查询条件数据
      searchCondition: {
        startTime: todayStr + " 00:00:00", // 开始时间
        endTime: todayStr + " 23:59:59", // 结束时间
        merOrderNo: "",
        plaOrderNo: "",
        customerNo: "",
        payType: "",
        status: "SUCCESS",
        transType: "TRADE"
      },
      // 顶部搜索表单信息
      searchOptions: {
        lableWidth: "100px",
        searchList: []
      },
      // 列表数据
      actionUrl: isZf1500 ? getMctTradingOrdersGw : getMctTradingOrders,
      tableData: {
        havecheck: false, //是否显示选择框
        dataHeader: [],
        operation: {
          width: "60px",
          options: [
            // 操作按钮
            {
              text: "查看",
              color: "#1890ff",
              cb: rowdata => {
                this.detailsForm = rowdata;
                this.detailsFormVisible = true;
              }
            }
          ]
        }
      }
    };
  },
  created() {
    if (this.isZf1500) {
      this.actionUrl = getMctTradingOrdersGw
    } else {
      this.actionUrl = getMctTradingOrders
    }
    this.$nextTick(() => {
      let isCustomer = this.isCustomer;
      // this.actionUrl = isZf1500 ? getMctTradingOrdersGw : getMctTradingOrders;
      // this.$set(this.data, "actionUrl", isZf1500 ? getMctTradingOrdersGw : getMctTradingOrders);
      this.searchOptions.searchList.push(
        {
          corresattr: "startTime",
          type: "dateTime",
          label: "起始时间",
          show: true, // 普通搜索显示
          clearable: false,
          defaultVlue: todayStr + " 00:00:00",
          value: todayStr + ' 00:00:00',
          definiTime: true,
          cb: value => {
            this.$set(this.searchCondition, 'startTime', value)
            // this.searchCondition.startTime = value;
          }
        },
        {
          corresattr: "endTime",
          type: "dateTime",
          label: "结束时间",
          clearable: false,
          definiTime: true,
          show: true, // 普通搜索显示
          defaultVlue: todayStr + " 23:59:59",
          value: todayStr + ' 23:59:59',
          // defaultTime:"23:59:59",
          cb: value => {
            this.$set(this.searchCondition, 'endTime', value)
            // this.searchCondition.endTime = value;
          }
        },
        {
          type: "checkTimeBut",
          visible: isCustomer ? "TRUE" : "FALSE",
          show: true, // 普通搜索显示
          buttonlist: [
            {
              label: "今天",
              cb: () => {
                this.$set(this.searchOptions.searchList[0], 'value', todayStr + " 00:00:00");
                this.$set(this.searchCondition, 'startTime', todayStr + " 00:00:00")
                this.$set(this.searchOptions.searchList[1], 'value', todayStr + " 23:59:59");
                this.$set(this.searchCondition, 'endTime', todayStr + " 23:59:59")
              }
            },
            {
              label: "昨天",
              cb: () => {
                this.$set(this.searchOptions.searchList[0], 'value', yesterdayStr + " 00:00:00");
                this.$set(this.searchCondition, 'startTime', yesterdayStr + " 00:00:00")
                this.$set(this.searchOptions.searchList[1], 'value', yesterdayStr + " 23:59:59");
                this.$set(this.searchCondition, 'endTime', yesterdayStr + " 23:59:59")
              }
            },
            {
              label: "本周",
              cb: () => {
                this.$set(this.searchOptions.searchList[0], 'value', ThisWeekStr().split(',')[0]);
                this.$set(this.searchCondition, 'startTime', ThisWeekStr().split(',')[0])
                this.$set(this.searchOptions.searchList[1], 'value', ThisWeekStr().split(',')[1]);
                this.$set(this.searchCondition, 'endTime', ThisWeekStr().split(',')[1])
              }
            },
            {
              label: "上周",
              cb: () => {
                this.$set(this.searchOptions.searchList[0], 'value', LastWeekStr().split(',')[0]);
                this.$set(this.searchCondition, 'startTime', LastWeekStr().split(',')[0])
                this.$set(this.searchOptions.searchList[1], 'value', LastWeekStr().split(',')[1]);
                this.$set(this.searchCondition, 'endTime', LastWeekStr().split(',')[1])
              }
            }
          ]
        },
        {
          corresattr: "merOrderNo",
          type: "text",
          label: isCustomer ? "订单号" : "商户订单号",
          placeholder: isCustomer ? "订单号" : "商户订单号",
          show: true, // 普通搜索显示
          defaultVlue: "",
          value: "",
          cb: value => {
            this.searchCondition.merOrderNo = value;
          }
        },
        {
          corresattr: "plaOrderNo",
          type: "text",
          label: "系统订单号",
          show: true, // 普通搜索显示
          defaultVlue: "",
          value: "",
          cb: value => {
            this.searchCondition.plaOrderNo = value;
          }
        },
        {
          corresattr: "payType",
          type: "select",
          label: "交易类型",
          show: true, // 普通搜索显示
          defaultVlue: "",
          value: "",
          options: [
            {
              value: "",
              label: "全部"
            },
            ...this.statusFilterQuery('mctTradingPayType')
          ],
          cb: value => {
            this.searchCondition.payType = value;
          }
        },
        {
          corresattr: "status",
          type: "select",
          label: "交易状态",
          show: true, // 普通搜索显示
          defaultVlue: "SUCCESS",
          value: "SUCCESS",
          options: [
            {
              value: "",
              label: "全部"
            },
            ...this.statusFilterQuery('mctTradingStatus')
          ],
          cb: value => {
            this.searchCondition.status = value;
          }
        },
        {
          corresattr: "transType",
          type: "select",
          label: "订单类型",
          show: false, // 普通搜索显示
          defaultVlue: "TRADE",
          value: "TRADE",
          options: [
            {
              value: "",
              label: "全部"
            },
            ...this.statusFilterQuery('mctTradingTransType')
          ],
          cb: value => {
            this.searchCondition.transType = value;
          }
        },
        {
          corresattr: "customerNo",
          type: "text",
          label: "商户编号",
          show: false, // 普通搜索显示
          defaultVlue: "",
          value: "",
          visible: isCustomer ? "TRUE" : "FALSE",
          cb: value => {
            this.searchCondition.customerNo = value;
          }
        }
      )
      this.tableData.dataHeader.push(
        // table列信息 key=>表头标题，word=>表内容信息
        {
          key: "创建时间",
          width: "160px",
          word: "createTime",
          hidden: false
        },
        {
          key: "系统订单编号",
          width: "140px",
          word: "orderNo"
        },
        {
          key: "商户订单编号",
          width: "140px",
          word: "companyOrderNo"
          // hidden: isCustomer
        },

        {
          key: "商户编号",
          width: "100px",
          word: "customerNo",
          hidden: isCustomer
        },
        {
          key: "商户名称",
          width: "100px",
          word: "customerName",
          hidden: isCustomer
        },
        {
          key: "订单金额",
          width: "80px",
          word: "amount",
          type: data => {
            return {
              text: utils.accMul(data, 0.01),
              type: "success"
            };
          }
        },
        {
          key: "交易状态",
          width: "90px",
          word: "status",
          status: true,
          type: data => {
            return this.statusFilter(data, 'mctTradingStatus')
          }
        },
        {
          key: "交易类型",
          width: "100px",
          word: "payType",
          status: true,
          type: data => {
            return this.statusFilter(data, 'mctTradingPayType')
          }
        },
        {
          key: "订单类型",
          width: "100px",
          word: "transType",
          status: true,
          type: data => {
            return this.statusFilter(data, 'mctTradingTransType')
          }
        },
        {
          key: "通道返回码",
          width: "300px",
          word: "respCode"
        }
      )
    })
  },
  methods: {
    exportDialog() {
      // 导出
      var searchCondition = { ...this.searchCondition };
      let startMonth = searchCondition.startTime.split("-")[0] + searchCondition.startTime.split("-")[1];
      let endMonth = searchCondition.endTime.split("-")[0] + searchCondition.endTime.split("-")[1];
      if (startMonth != endMonth) {
        this.$message({
          message: "不支持跨月份导出，请重新选择查询时间",
          type: "warning",
          center: true
        });
        return false;
      }
      searchCondition.page = 1;
      searchCondition.limit = 999999999;
      let param = "";
      for (var i in searchCondition) {
        param += i + "=" + searchCondition[i] + "&"
      }
      param = param.substr(0, param.length - 1);
      let exporturl = "";
      if (this.isZf1500) {
        exporturl = this.$store.state.Base.merIp + "/customer/payOrder/gwExcel?" + param;
      } else {
        exporturl = this.$store.state.Base.merIp + "/customer/payOrder/excel?" + param;
      }
      this.$refs.dataTable.ExportExcelDIR(exporturl);
    },
    // 合计
    SumHandle() {
      this.sumVisible = true;
      this.sumLoading = true;
      var searchCondition = this.searchCondition;
      let sumApi = "";
      if (this.isZf1500) {
        sumApi = getMctTradingOrdersSumGw
      } else {
        sumApi = getMctTradingOrdersSum
      }
      sumApi()({
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
    seachstartHandle() {
      // 开始搜索
      this.reloadData();
      this.sumVisible = false;
    }
  },
  computed: {
    isCustomer() {
      return this.$store.state.userInfoAndMenu.isCustomer;
    },
    isZf1500() {
      return this.$store.state.userInfoAndMenu.isZf1500;
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
<template>
  <!-- 商户代付订单 -->
  <div class="admin-page">
    <div class="admin-main-box">
      <!-- search form start -->
      <myp-search-form @changeform="callbackformHandle" @resetInput="resetSearchHandle" @visiblesome="visiblesomeHandle" @changeSearchVisible="changeSearchVisible" @seachstart="seachstartHandle" :searchOptions="searchOptions"></myp-search-form>
      <!-- search form end -->
      <div class="operation-box">
        <el-button-group class="button-group">
          <el-button v-if="adminFilter('mer_payfor_orders_total')" class="mybutton" @click="SumHandle" :loading="sumLoading" size="small" type="primary" icon="el-icon-plus">合计</el-button>
          <el-button v-if="adminFilter('mer_trading_orders_export')" size="small" @click="exportDialog" type="primary" icon="el-icon-upload">导出</el-button>
          <span v-if="sumVisible" class="sumtext">
            <span>代付金额:{{utils.accMul(amountSum,0.01)}}元</span>
            <span class="split-line-v"></span>
            <span>交易笔数:{{amountCount}}笔</span>
          </span>
        </el-button-group>
      </div>
      <myp-data-page :actionUrl="actionUrl" @pagecount="pagecountHandle" @pagelimit="pagelimitHandle" @operation="operationHandle" ref="dataTable" :tableDataInit="tableData" :page="postPage" :limit="postLimit" :search="postSearch"></myp-data-page>
    </div>
    <!-- 新增start -->
    <el-dialog v-dialogDrag center title="新增资质" :visible.sync="addFormVisible">
      <el-form size="small" :model="addForm" ref="addForm" :rules="addFormRules">
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="资质名称" prop="name" :label-width="formLabelWidth">
                <el-input v-model="addForm.name" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="税号" prop="tax" :label-width="formLabelWidth">
                <el-input v-model="addForm.tax" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="地址" prop="address" :label-width="formLabelWidth">
                <el-input v-model="addForm.address" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="电话" prop="tel" :label-width="formLabelWidth">
                <el-input v-model="addForm.tel" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="开户银行名称" prop="bank" :label-width="formLabelWidth">
                <el-input v-model="addForm.bank" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="银行帐号" prop="account" :label-width="formLabelWidth">
                <el-input v-model="addForm.account" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('addForm')">重置</el-button>
        <el-button :loading="saveLoading" type="primary" @click="addSave('addForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增end -->
    <!-- 详情 start -->
    <el-dialog v-dialogDrag title="代付订单详情" center :visible.sync="detailsFormVisible">
      <div class="detail-full">
        <div class="block-box">
          <div class="title">基本信息</div>
          <ul class="content">
            <li>
              <span class="label">订单创建时间: </span>{{detailsForm.createTime}}
            </li>
            <li>
              <span class="label">{{isCustomer ? "订单号" : "商户订单号"}}: </span>{{detailsForm.companyOrderNo}}
            </li>
            <li>
              <span class="label">系统订单号: </span>{{detailsForm.orderNo}}
            </li>
            <li>
              <span class="label">商户编号: </span>{{detailsForm.customerNo}}
            </li>
            <li>
              <span class="label">代理商编号: </span>{{detailsForm.agentNo}}
            </li>
            <li>
              <span class="label">备注信息: </span>{{detailsForm.postScript}}
            </li>
          </ul>
        </div>
        <div class="block-box">
          <div class="title">代付信息</div>
          <ul class="content">
            <li>
              <span class="label">账户类型: </span> {{detailsForm.accountType | statusFilter('mctPayforAccountType')}}
            </li>
            <li>
              <span class="label">银行名称: </span>{{detailsForm.bankName}}
            </li>
            <li>
              <span class="label">银行编号码: </span>{{detailsForm.bankCode}}
            </li>
            <li>
              <span class="label">代付金额: </span> {{utils.accMul(detailsForm.settleAmount, 0.01)}}
            </li>
            <li>
              <span class="label">代付状态: </span> {{detailsForm.status | statusFilter('mctPayforStatus')}}
            </li>
            <li>
              <span class="label">代付手续费: </span> {{utils.accMul(detailsForm.fee, 0.01)}}
            </li>
            <li>
              <span class="label">账户名称: </span> {{detailsForm.accountName}}
            </li>
            <li>
              <span class="label">银行卡: </span> {{detailsForm.accountNo}}
            </li>
            <li>
              <span class="label">身份证号: </span> {{detailsForm.idCard}}
            </li>
            <li>
              <span class="label">代付成功时间: </span> {{detailsForm.proxyConfirmTime}}
            </li>
          </ul>
        </div>
      </div>
      <!-- <div class="detail-content">
        <el-row class="line-label-box cross-back">

        </el-row>
        <el-row class="line-label-box cross-back">

        </el-row>
        <el-row class="line-label-box cross-back">
          <el-col :span="24">
            <div class="grid-content bg-purple-light">
              <span class="line-label">代理商编号:</span>
              <span class="line-label-last">{{detailsForm.agentNo}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line-label-box cross-back">

          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <span class="line-label">代付手续费:</span>
              <span class="line-label-last">
                {{utils.accMul(detailsForm.fee, 0.01)}}
              </span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line-label-box cross-back">
          <el-col :span="24">
            <div class="grid-content bg-purple-light">
              <span class="line-label">代付状态:</span>
              <span class="line-label-last">{{detailsForm.status | statusFilter('mctPayforStatus')}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line-label-box cross-back">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <span class="line-label">银行帐号:</span>
              <span class="line-label-last">{{detailsForm.accountNo}}</span>
            </div>
          </el-col>

        </el-row>
        <el-row class="line-label-box cross-back">

          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <span class="line-label">银行名称:</span>
              <span class="line-label-last">{{detailsForm.bankName}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line-label-box cross-back">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <span class="line-label">银行编码:</span>
              <span class="line-label-last">{{detailsForm.bankCode}}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <span class="line-label">代付成功时间:</span>
              <span class="line-label-last">{{detailsForm.proxyConfirmTime}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line-label-box cross-back">
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <span class="line-label">订单创建时间:</span>
              <span class="line-label-last">{{detailsForm.createTime}}</span>
            </div>
          </el-col>
          </el-col>
        </el-row>

      </div> -->

      <div slot="footer" class="dialog-footer">
        <el-button @click="detailsFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 详情 end -->
    <!-- 商户start -->
    <el-dialog v-dialogDrag title="商户信息" center :visible.sync="customerDetailVisible" width="400px">
      <customer-detail ref="customerDetail" @showIndex="showIndex" @showCustomerDetail="showCustomerDetail"></customer-detail>
    </el-dialog>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
import "@src/common/filters";
import SearchForm from "@src/components/SearchForm";
import DataPage from "@src/components/DataPage";
import CustomerDetail from "@src/components/CustomerDetail";
// table页与搜索页公用功能
import { mixinsPc } from "@src/common/mixinsPc";
import { mixinDataTable } from "@src/components/DataPage/dataPage";
import { todayStr, yesterdayStr, today_ } from "@src/common/dateSerialize";
import { taxNumVerify, idCardVerify, phoneNumVerify } from "@src/common/regexp";
import utils from "@src/common/utils";
import {
  getMctPayforOrders,
  getMctPayforOrdersSum,
  getMctManageOrders
} from "@src/apis";

export default {
  name: "mer_payfor_orders",
  components: {
    "myp-search-form": SearchForm, // 搜索组件
    "myp-data-page": DataPage, // 数据列表组件
    CustomerDetail
  },
  mixins: [mixinDataTable, mixinsPc],
  data() {
    // 是否为商户角色
    var isCustomer = this.$store.state.userInfoAndMenu.isCustomer;
    var searchConditionVar = {
      startTime: todayStr + " 00:00:00", // 开始时间
      endTime: todayStr + " 23:59:59", // 结束时间
      customerNo: "",
      companyOrderNo: "",
      plaOrderNo: "",
      accountType: "",
      status: ""
    };
    return {
      customerDetail: {},
      customerDetailVisible: false,
      amountSum: "0",
      amountCount: "0",
      sumVisible: false,
      sumLoading: false,
      addFormVisible: false,
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
      searchCondition: searchConditionVar,
      // 顶部搜索表单信息
      searchOptions: {
        lableWidth: "100px",
        searchList: [
          // 请注意 该数组里对象的corresattr属性值与searchCondition里面的属性是一一对应的 不可少

          {
            corresattr: "startTime",
            type: "dateTime",
            label: "起始时间",
            clearable: false,
            show: true, // 普通搜索显示
            defaultVlue: todayStr + " 00:00:00",
            value: todayStr + " 00:00:00",
            cb: value => {
              this.searchCondition.startTime = value;
            }
          },
          {
            corresattr: "endTime",
            type: "dateTime",
            label: "结束时间",
            clearable: false,
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
          },
          {
            corresattr: "companyOrderNo",
            type: "text",
            label: isCustomer ? "订单号" : "商户订单号",
            show: true, // 普通搜索显示
            defaultVlue: "",
            value: "",
            cb: value => {
              this.searchCondition.companyOrderNo = value;
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
            corresattr: "accountType",
            type: "select",
            label: "账户类型",
            show: true, // 普通搜索显示
            defaultVlue: "",
            value: "",
            options: [
              {
                value: "",
                label: "全部"
              },
              ...this.statusFilterQuery('mctPayforAccountType')
            ],
            cb: value => {
              this.searchCondition.accountType = value;
            }
          },
          {
            corresattr: "status",
            type: "select",
            label: "代付状态",
            show: true, // 普通搜索显示
            defaultVlue: "",
            value: "",
            options: [
              {
                value: "",
                label: "全部"
              },
              ...this.statusFilterQuery('mctPayforStatus')
            ],
            cb: value => {
              this.searchCondition.status = value;
            }
          }
        ]
      },
      // 列表数据
      actionUrl: getMctPayforOrders,
      postSearch: searchConditionVar,
      tableData: {
        havecheck: false, //是否显示选择框
        dataHeader: [
          // table列信息 key=>表头标题，word=>表内容信息
          {
            key: "创建时间",
            width: "155px",
            word: "createTime"
          },
          {
            key: "系统订单号",
            width: "100px",
            word: "orderNo"
          },
          {
            key: isCustomer ? "订单号" : "商户订单号",
            width: "100px",
            word: "companyOrderNo"
          },
          {
            key: "商户编号",
            width: "130px",
            word: "customerNo",
            hidden: isCustomer,
            event: true,
            cb: value => {
              this.customerDetailVisible = true
              this.$nextTick(() => {
                this.$refs['customerDetail'].init(value.customerNo, getMctManageOrders);
              })
            }
          },
          {
            key: "代付金额",
            width: "90px",
            word: "settleAmount",
            type: data => {
              return {
                text: utils.accMul(data, 0.01),
                type: "success"
              };
            }
          },
          {
            key: "代付状态",
            width: "100px",
            word: "status",
            status: true,
            type: data => {
              return this.statusFilter(data, 'mctPayforStatus')
            }
          },
          {
            key: "账户名称",
            width: "120px",
            word: "accountName"
          },
          {
            key: "账户类型",
            width: "100px",
            word: "accountType",
            status: true,
            type: data => {
              return this.statusFilter(data, 'mctPayforAccountType')
            }
          },
          {
            key: "通道返回",
            width: "130px",
            word: "dealMsg"
          }
        ],
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
  methods: {
    showIndex() {
      this.customerDetailVisible = false;
    },
    showCustomerDetail() {
      this.customerDetailVisible = show;
    },
    seachstartHandle() {
      // 开始搜索
      this.reloadData();
      this.sumVisible = false;
    },
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
      let exporturl = this.$store.state.Base.merIp + "/customer/proxyPay/excel?" + param;
      this.$refs.dataTable.ExportExcelDIR(exporturl);
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
    addSave(formName) {
      // 新增内容保存
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.saveLoading = true;
          var addForm = this.addForm;
          // this.resetSearchHandle();
          postAddEnterpriseSupply()({ ...addForm }).then(data => {
            if (data.code === "00") {
              this.$message({
                message: "恭喜你，新增数据成功",
                type: "success",
                center: true
              });
              this.addFormVisible = false;
              this.resetForm("addForm");
              this.reloadData();
            } else {
              this.$message({
                message: data.msg,
                type: "warning",
                center: true
              });
            }
            this.saveLoading = false;
          });
        }
      });
    },
    editSave(formName) {
      // 编辑内容保存
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.saveLoading = true;
          let editForm = this.editForm;
          // this.resetSearchHandle();
          postEditBillrecord()({
            billRecordNo: editForm.billRecordNo,
            orderNo: editForm.orderNo,
            status: editForm.status,
            invoiceCode: editForm.invoiceCode,
            invoiceNo: editForm.invoiceNo,
            totalTax: editForm.totalTax,
            phoneNo: editForm.phoneNo,
            enterpriseName: editForm.phoneNo,
            taxNo: editForm.taxNo,
            enterpriseAddress: editForm.enterpriseAddress,
            bankName: editForm.bankName,
            bankAccountNo: editForm.bankAccountNo,
            companyPhone: editForm.companyPhone,
            bussinessName: editForm.bussinessName,
            billAmount: editForm.billAmount
          }).then(data => {
            if (data.code === "00") {
              this.$message({
                message: "恭喜你，修改数据成功",
                type: "success",
                center: true
              });
              this.editFormVisible = false;
              this.reloadData();
            } else {
              this.$message({
                message: data.msg,
                type: "warning",
                center: true
              });
            }
            this.saveLoading = false;
            console.log(data);
          });
        }
      });
    }
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
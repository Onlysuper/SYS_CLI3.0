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
              <span class="label">代理商编号: </span>{{detailsForm.customerNo}}
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
import { todayStr, yesterdayStr, today_ } from "@src/common/dateSerialize";
import { taxNumVerify, idCardVerify, phoneNumVerify } from "@src/common/regexp";
import utils from "@src/common/utils";
import {
  getMctBalanceOrders,
  getMctBalanceOrdersOne,
  getMctPayforOrdersSum,
  getMctManageOrders
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
          }, , {
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
              visibleFn: rowdata => {
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
      this.customerDetailVisible = show;
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
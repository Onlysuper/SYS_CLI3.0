<template>
  <!-- 商户代付订单 -->
  <div class="admin-page">
    <div class="admin-main-box">
      <!-- search form start -->
      <myp-search-form @changeform="callbackformHandle" @resetInput="resetSearchHandle" @visiblesome="visiblesomeHandle" @changeSearchVisible="changeSearchVisible" @seachstart="seachstartHandle" :searchOptions="searchOptions"></myp-search-form>
      <!-- search form end -->
      <div class="operation-box">
        <el-button-group class="button-group">
          <el-button v-if="adminFilter('mer_pool_orders_add')" class="mybutton" @click="addDialog" size="small" type="primary">新增</el-button>
          <el-button @click="showDialog('batchUpdateVisible')" size="small" type="primary">批量修改</el-button>
        </el-button-group>
      </div>
      <myp-data-page :actionUrl="actionUrl" @pagecount="pagecountHandle" @pagelimit="pagelimitHandle" @operation="operationHandle" ref="dataTable" :tableDataInit="tableData" :page="postPage" :limit="postLimit" :search="searchCondition"></myp-data-page>
    </div>
    <!-- 新增start -->
    <el-dialog v-dialogDrag center :title="formType == 'EDIT'?'编辑':'新增'" :visible.sync="addFormVisible" width="750px">
      <div class="form-container">
        <component :formType="formType" ref="addEditComponent" class="my-form-box" :is="addStep" :rowData="rowData" @addSuccess="addSuccess"></component>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible=false">关闭</el-button>
        <el-button :loading="saveLoading" type="primary" @click="addSave">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增end -->
    <!-- 批量修改start -->
    <el-dialog v-dialogDrag center title="批量修改" :visible.sync="batchUpdateVisible" width="600px">
      <el-form size="small" :model="batchUpdateForm" ref="batchUpdateForm" :rules="batchUpdateRules">
        <el-form-item label="商户编号" prop="customerNo" :label-width="formLabelWidth">
          <el-input v-model="batchUpdateForm.customerNo" type="textarea" :rows="2" placeholder="请输入商户编号,可用空格/逗号分割">
          </el-input>
        </el-form-item>
        <el-form-item class="full-width" label="业务类型" prop="bussinessType" :label-width="formLabelWidth">
          <el-select placeholder="业务类型" size="small" v-model="batchUpdateForm.bussinessType">
            <el-option v-for="item in bussinessTypeOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="full-width" label="状态" prop="status" :label-width="formLabelWidth">
          <el-select placeholder="状态" size="small" v-model="batchUpdateForm.status">
            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="batchUpdateVisible=false">关闭</el-button>
        <el-button :loading="saveLoading" type="primary" @click="batchUpdateSave('batchUpdateForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 批量修改end -->
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
import add from "./add";
// table页与搜索页公用功能
import { mixinsPc } from "@src/common/mixinsPc";
import { mixinDataTable } from "@src/components/DataPage/dataPage";
import { todayStr, yesterdayStr, today_ } from "@src/common/dateSerialize";
import { taxNumVerify, idCardVerify, phoneNumVerify } from "@src/common/regexp";
import utils from "@src/common/utils";
import {
  getMctPoolOrders,
  postBatchUpdateMctPoolOrder
} from "@src/apis";
export default {
  name: "mer_pool_orders",
  components: {
    "myp-search-form": SearchForm, // 搜索组件
    "myp-data-page": DataPage, // 数据列表组件
    add,
    CustomerDetail
  },
  mixins: [mixinDataTable, mixinsPc],
  data() {
    // 是否为商户角色
    return {
      batchUpdateVisible: false,
      addStep: "add",
      formType: "",// 新增或是编辑
      rowData: {},// 传给子组件
      customerDetail: {},
      customerDetailVisible: false,
      amountSum: "0",
      amountCount: "0",
      sumVisible: false,
      sumLoading: false,
      addFormVisible: false,
      batchUpdateForm: {},
      batchUpdateRules: {
      },
      detailsFormVisible: false, // 详情框
      editFormVisible: false, // 编辑框
      formLabelWidth: "100px",
      editFormRules: {}, // 编辑单个规则
      editForm: {}, // 编辑单个表单
      detailsForm: {}, // 详情单个表单

      // 列表数据
      actionUrl: getMctPoolOrders,
      tableData: {
        havecheck: false, //是否显示选择框
        dataHeader: [],
        operation: {
          width: "80px",
          options: [
            // 操作按钮
            {
              text: "编辑",
              color: "#1890ff",
              ref: "editbut",
              loading: false,
              visibleFn: rowdata => {
                return this.adminFilter('mer_pool_orders_edit')
              },
              cb: (rowdata, operationLoading, index) => {
                this.editTitle = "线上商户修改";
                this.rowData = rowdata;
                this.addFormVisible = true;
                this.formType = "EDIT";
                this.$nextTick(() => {
                  this.$refs['addEditComponent'].checkIn();
                })
              }
            }
          ]
        }
      },
      // 顶部搜索表单信息 查询条件数据
      searchCondition: {
        customerNo: "",
        bussinessType: "",
        payAmount: "",
        orgCode: "",
        status: "",
        startTime: "",
        endTime: todayStr + " 23:59:59" // 结束时间
      },
      searchOptions: {
        lableWidth: "100px",
        searchList: []
      },
    };
  },
  created() {
    this.$nextTick(() => {
      let isCustomer = this.isCustomer;
      // 搜索条件start
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
        },
        {
          corresattr: "bussinessType",
          type: "select",
          label: "业务类型",
          show: true, // 普通搜索显示
          defaultVlue: "",
          value: "",
          options: [
            {
              value: "",
              label: "全部"
            },
            ...this.statusFilterQuery('mctPoolBussinessType')
          ],
          cb: value => {
            this.searchCondition.bussinessType = value;
          }
        },
        {
          corresattr: "payAmount",
          type: "select",
          label: "交易金额等级",
          show: true, // 普通搜索显示
          defaultVlue: "",
          value: "",
          options: [
            {
              value: "",
              label: "全部"
            },
            ...this.statusFilterQuery('mctPoolPayAmount')
          ],
          cb: value => {
            this.searchCondition.payAmount = value;
          }
        },
        {
          corresattr: "status",
          type: "select",
          label: "状态",
          show: true, // 普通搜索显示
          defaultVlue: "",
          value: "",
          options: [
            {
              value: "",
              label: "全部"
            },
            ...this.statusFilterQuery('mctPoolStatus')
          ],
          cb: value => {
            this.searchCondition.status = value;
          }
        },
        {
          corresattr: "orgCode",
          type: "text",
          label: "地区编码",
          show: true, // 普通搜索显示
          defaultVlue: "",
          value: "",
          // visible: isCustomer ? "TRUE" : "FALSE",
          cb: value => {
            this.searchCondition.orgCode = value;
          }
        }
      )
      // 搜索条件end
      // table start
      this.tableData.dataHeader.push(
        // table列信息 key=>表头标题，word=>表内容信息
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
          key: "业务类型",
          width: "100px",
          word: "bussinessType",
          status: true,
          type: data => {
            return this.statusFilter(data, 'mctPoolBussinessType')
          }
        },
        {
          key: "交易金额等级",
          width: "120px",
          word: "payAmount",
          status: true,
          type: data => {
            return this.statusFilter(data, 'mctPoolPayAmount')
          }
        },
        {
          key: "地区编码",
          width: "120px",
          word: "orgCode",
        },
        {
          key: "状态",
          width: "100px",
          word: "status",
          status: true,
          type: data => {
            return this.statusFilter(data, 'mctPoolStatus')
          }
        },
        {
          key: "经营开始时间",
          width: "155px",
          word: "timeBegin",
        },
        {
          key: "经营结束时间",
          width: "155px",
          word: "timeEnd",
        },
        {
          key: "日交易限额(分)",
          width: "155px",
          word: "dayAmountLimit",
        },
        {
          key: "是否万能商户",
          width: "155px",
          word: "universalFlag",
          status: true,
          type: data => {
            return this.statusFilter(data, 'mctUniversalFlagtatus')
          }
        })
      // table end
    })
  },
  methods: {
    //批量修改保存
    batchUpdateSave(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let customerNosArr = [];
          let customerNos = "";
          let customerNo = this.batchUpdateForm.customerNo;
          if (customerNo) {
            customerNosArr = customerNo.split(/\s+|\,|[，]/).filter(item => item != "" && item != null);
          }
          customerNos = customerNosArr.join(',');
          let sedData = Object.assign({}, utils.pickObj(this.batchUpdateForm, ["status", "bussinessType"]), { customerNos: customerNos })
          postBatchUpdateMctPoolOrder()({
            ...sedData
          }).then((res) => {
            if (res.code == "00") {
              this.$message({
                message: "恭喜您," + res.msg,
                type: "warning",
                center: true
              });
              this.reloadData();
              this.batchUpdateVisible = false;
            } else {
              this.$message({
                message: res.msg,
                type: "warning",
                center: true
              });
            }
          })
        }
      })
    },
    // 新增
    addDialog() {
      this.editTitle = "线上商户新增";
      this.addFormVisible = true;
      this.formType = "ADD";
      this.$nextTick(() => {
        this.$refs['addEditComponent'].checkIn();
      })
    },
    // 批量查询余额
    searchMoney() {
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

    resetAddForm(formName) {
      this.$refs[formName].resetFields();
    },
    addSave() {
      this.$nextTick(() => {
        console.log(this.$refs['addEditComponent']);
        this.$refs['addEditComponent'].addSave()
      })
    },
    addSuccess() {
      this.addFormVisible = false;
      this.seachstartHandle()
    }
  },
  computed: {
    isCustomer() {
      return this.$store.state.userInfoAndMenu.isCustomer;
    },
    // 类型
    bussinessTypeOptions() {
      return this.statusFilterQuery('mctPoolBussinessType')
    },
    // 状态
    statusOptions() {
      return this.statusFilterQuery('mctPoolStatus')
    }
  },
  mounted() { },
  watch: {
    detailsFormVisible(val) {
      this.saveLoadingStop(val);
    },
    batchUpdateVisible(val) {
      if (!val) {
        this.$refs['batchUpdateForm'].resetFields();
      }
    },
    editFormVisible(val) {
      this.saveLoadingStop(val);
    },
  }
};
</script>
<template>
  <!-- 商户限额管理 -->
  <div class="admin-page">
    <div class="admin-main-box">
      <!-- search form start -->
      <myp-search-form @changeform="callbackformHandle" @resetInput="resetSearchHandle" @visiblesome="visiblesomeHandle" @changeSearchVisible="changeSearchVisible" @seachstart="seachstartHandle" :searchOptions="searchOptions"></myp-search-form>
      <!-- search form end -->
      <div class="operation-box">
        <el-button-group class="button-group">
          <el-button v-if="adminFilter('mct_quotas_orders_add')" class="mybutton" @click="addDialog" size="small" type="primary" icon="el-icon-plus">新增</el-button>
        </el-button-group>
      </div>
      <myp-data-page :actionUrl="actionUrl" @pagecount="pagecountHandle" @pagelimit="pagelimitHandle" @operation="operationHandle" ref="dataTable" :tableDataInit="tableData" :page="postPage" :limit="postLimit" :search="postSearch"></myp-data-page>
    </div>
    <!-- 新增start -->
    <el-dialog v-dialogDrag center title="新增" :visible.sync="addFormVisible" width="430px">
      <el-form size="small" :model="addForm" ref="addForm" :rules="addFormRules">
        <el-form-item label="商户编号" prop="customerNo" :label-width="formLabelWidth">
          <el-input @input="nospace($event,'customerNo')" :disabled="customerNoDisabled" v-model="addForm.customerNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="单笔交易限额(分)" prop="singleAmountLimit" :label-width="formLabelWidth">
          <el-input @input="nospace($event,'singleAmountLimit')" v-model="addForm.singleAmountLimit" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="日交易限额(分)" prop="dayAmountLimit" :label-width="formLabelWidth">
          <el-input @input="nospace($event,'dayAmountLimit')" v-model="addForm.dayAmountLimit" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item class="full-width" label="状态" prop="status" :label-width="formLabelWidth">
          <el-select v-model="addForm.status" placeholder="请选择">
            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible=false">取消</el-button>
        <el-button :loading="saveLoading" type="primary" @click="addSave('addForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增end -->
    <!-- 详情 start -->
    <el-dialog v-dialogDrag title="服务商详情" center :visible.sync="detailsFormVisible">
      <div class="detail-content">
        <el-row class="line-label-box cross-back">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <span class="line-label">服务商名称:</span>
              <span class="line-label-last">{{detailsForm.agentName}}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <span class="line-label">服务商编号:</span>
              <span class="line-label-last">{{detailsForm.agentNo}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line-label-box cross-back">
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <span class="line-label">商户审核通知url:</span>
              <span class="line-label-last">{{detailsForm.auditNotifyUrl}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line-label-box cross-back">
          <el-col :span="24">
            <div class="grid-content bg-purple-light">
              <span class="line-label">t0交易通知Url:</span>
              <span class="line-label-last">{{detailsForm.t0remitNotifyUrl}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line-label-box cross-back">
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <span class="line-label">交易通知Url:</span>
              <span class="line-label-last">
                {{detailsForm.tradeNotifyUrl}}
              </span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line-label-box cross-back">
          <el-col :span="24">
            <div class="grid-content bg-purple-light">
              <span class="line-label">签名key:</span>
              <span class="line-label-last">{{detailsForm.signKey}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line-label-box cross-back">
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <span class="line-label">加密key:</span>
              <span class="line-label-last">{{detailsForm.encryptKey}}</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="detailsFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 详情 end -->
    <!-- 商户start -->
    <el-dialog v-dialogDrag title="商户信息" center :visible.sync="customerDetailVisible" width="400px">
      <div class="detail-content">
        <div class="line-label-box cross-back">
          <span class="line-label">企业名称:</span>{{customerDetail.enterpriseName || ""}}
        </div>
        <div class="line-label-box cross-back">
          <span class="line-label">企业税号:</span>{{customerDetail.taxNo}}
        </div>
        <div class="line-label-box cross-back">
          <span class="line-label">企业法人:</span>{{customerDetail.legalPerson}}
        </div>
        <div class="line-label-box cross-back">
          <span class="line-label">身份证:</span>{{customerDetail.idCard}}
        </div>
        <div class="line-label-box cross-back">
          <span class="line-label">联系人:</span>{{customerDetail.linkMan}}
        </div>
        <div class="line-label-box cross-back">
          <span class="line-label">手机号:</span>{{customerDetail.phoneNo}}
        </div>
        <div class="line-label-box cross-back">
          <span class="line-label">商户编号:</span>{{customerDetail.customerNo}}
        </div>
        <div class="line-label-box cross-back">
          <span class="line-label">商户来源:</span>{{customerDetail.customerFrom | statusFilter("customerFrom")}}
        </div>
        <div class="line-label-box cross-back">
          <span class="line-label">公司电话:</span>{{customerDetail.bussinessPhone}}
        </div>
        <div class="line-label-box cross-back">
          <span class="line-label">经营名称:</span>{{customerDetail.bussinessName}}
        </div>
        <div class="line-label-box cross-back">
          <span class="line-label">经营地址:</span>{{customerDetail.bussinessAddress}}
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
import "@src/common/filters";
import SearchForm from "@src/components/SearchForm";
import DataPage from "@src/components/DataPage";
// table页与搜索页公用功能
import { mixinsPc } from "@src/common/mixinsPc";
import { mixinDataTable } from "@src/components/DataPage/dataPage";
import { } from "@src/common/dateSerialize";
import { } from "@src/common/regexp";
import utils from "@src/common/utils";
import {
  getMctQuotaOrders,
  postAddMctQuotaOrders
} from "@src/apis";

export default {
  name: "online_facilitator_orders",
  components: {
    "myp-search-form": SearchForm, // 搜索组件
    "myp-data-page": DataPage // 数据列表组件
  },
  mixins: [mixinDataTable, mixinsPc],
  data() {
    var searchConditionVar = {
      customerNo: "",
      status: ""
    };
    return {
      customerNoDisabled: false,
      statusOptions: [],
      customerDetail: {},
      customerDetailVisible: false,
      addFormVisible: false,
      addForm: {
      },
      addFormRules: {
        customerNo: [{ required: true, message: "请输入商户编号", trigger: "blur,change" }],
        singleAmountLimit: [
          { required: true, message: "请输入单笔交易限额", trigger: "blur,change" },
          {
            validator: (rule, value, callback) => {
              if (value > 99999999999) {
                callback(new Error('输入金额不可大于99999999999'));
              } else {
                callback();
              }
            }, trigger: 'blur,change'
          }
        ],
        dayAmountLimit: [
          { required: true, message: "请输入日交易限额", trigger: "blur,change" },
          {
            validator: (rule, value, callback) => {
              if (value > 99999999999) {
                callback(new Error('输入金额不可大于99999999999'));
              } else {
                callback();
              }
            }, trigger: 'blur,change'
          }
        ],
        status: [{}]
      },
      detailsFormVisible: false, // 详情框
      editFormVisible: false, // 编辑框
      formLabelWidth: "130px",
      editFormRules: {}, // 编辑单个规则
      editForm: {}, // 编辑单个表单
      detailsForm: {}, // 详情单个表单
      // 查询条件数据
      searchCondition: searchConditionVar,
      // 顶部搜索表单信息
      searchOptions: {
        lableWidth: "100px",
        searchList: [
          {
            corresattr: "customerNo",
            type: "text",
            label: "商户编号",
            show: true, // 普通搜索显示
            defaultVlue: "",
            value: "",
            cb: value => {
              this.searchCondition.customerNo = value;
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
              ...this.statusFilterQuery('mctQuotaOrdersStatus')
            ],
            cb: value => {
              this.searchCondition.status = value;
            }
          }
        ]
      },
      // 列表数据
      actionUrl: getMctQuotaOrders,
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
            key: "更新时间",
            width: "155px",
            word: "lastUpdateTime"
          },
          {
            key: "商户编号",
            width: "100px",
            word: "customerNo"
          },
          {
            key: "单笔交易限额(分)",
            width: "130px",
            word: "singleAmountLimit"
          },

          {
            key: "日交易限额(分)",
            width: "130px",
            word: "dayAmountLimit"
          },
          {
            key: "当前已用额度(分)",
            width: "126px",
            word: "currentAmount"
          },
          {
            key: "状态",
            width: "120px",
            word: "status",
            status: true,
            type: data => {
              return this.statusFilter(data, 'mctQuotaOrdersStatus')
            }
          }
        ],
        operation: {
          width: "60px",
          options: [
            // 操作按钮
            {
              text: "编辑",
              color: "#1890ff",
              visibleFn: () => {
                return this.adminFilter('mct_quotas_orders_add')
              },
              cb: rowdata => {
                this.customerNoDisabled = true;
                let newRow = utils.pickObj(rowdata, [
                  'customerNo', 'singleAmountLimit', 'dayAmountLimit', 'status'
                ]);
                this.addForm = { ...newRow };
                this.addFormVisible = true;

              }
            }
          ]
        }
      }
    };
  },
  methods: {
    nospace(val, where) {
      let newval = val ? val.replace(/\D/ig, "") : "";
      this.$nextTick(() => {
        this.addForm[where] = newval
      })
    },
    addDialog() {
      this.addForm = {
        status: "TRUE"
      };
      this.customerNoDisabled = false;
      this.addFormVisible = true;
      this.clearValidate();
    },
    clearValidate() {
      this.$nextTick(() => {
        this.$refs.addForm.clearValidate()
      })
    },
    seachstartHandle() {
      // 开始搜索
      this.reloadData();
      this.sumVisible = false;
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
          postAddMctQuotaOrders()({ ...addForm }).then(data => {
            if (data.code === "00") {
              this.$message({
                message: "恭喜你，新增数据成功",
                type: "success",
                center: true
              });
              this.addFormVisible = false;
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
    }
  },
  computed: {

  },
  mounted() { },
  watch: {
    detailsFormVisible(val) {
      this.saveLoadingStop(val);
    },
    editFormVisible(val) {
      this.saveLoadingStop(val);
    },
    addFormVisible() {
      if (!this.addFormVisible) {
        this.clearValidate();
      }
    }
  },
  created() {
    this.statusOptions = this.statusFilterQuery('mctQuotaOrdersStatus')
  }
};
</script>
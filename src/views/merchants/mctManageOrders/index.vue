<template>
  <!-- 线上商户查询 -->
  <div class="admin-page">
    <div class="admin-main-box">
      <!-- search form start -->
      <myp-search-form @changeform="callbackformHandle" @resetInput="resetSearchHandle" @visiblesome="visiblesomeHandle" @changeSearchVisible="changeSearchVisible" @seachstart="seachstartHandle" :searchOptions="searchOptions"></myp-search-form>
      <div class="operation-box">
        <el-button-group class="button-group">
          <el-button v-if="adminFilter('mer_manage_orders_add')" class="mybutton" @click="addDialog" size="small" type="primary" icon="el-icon-plus">新增</el-button>
        </el-button-group>
      </div>
      <!-- search form end -->
      <myp-data-page :actionUrl="actionUrl" @pagecount="pagecountHandle" @pagelimit="pagelimitHandle" @operation="operationHandle" ref="dataTable" :tableDataInit="tableData" :page="postPage" :limit="postLimit" :search="postSearch"></myp-data-page>
    </div>
    <!-- <el-dialog class="special-dialog-new" v-dialogDrag center :title="editTitle" :visible.sync="addFormVisible"> -->
    <!-- 商户新增 -->
    <el-dialog v-loading="true" id="dialogLoding" width="850px" :title="editTitle" center :visible.sync="addFormVisible">
      <div class="form-container">
        <component :formType="formType" ref="stepComponent" class="my-form-box" :is="addStep" :rowData="rowData" @addSuccess="addSuccess" @stopLoad="addSuccess"></component>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible=false">关闭</el-button>
        <el-button :loading="saveLoading" type="primary" @click="addSave">确定</el-button>
      </div>
    </el-dialog>
    <!-- 详情 start -->
    <el-dialog id="detailsLoding" class="special-dialog-new" bottom="10px" title="商户管理详情" center :visible.sync="detailsFormVisible">
      <detail :getData="detailsForm" :imgsArray="imgsArray" ref="detail"></detail>
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
<style lang="scss">
@import "../../../assets/scss-pc/dialog-detail.scss";
.special-dialog-new {
  // height: 100%;
  top: 20px !important;
  left: 20px !important;
  right: 20px !important;
  bottom: 20px !important;
  position: fixed;
  align-items: stretch;
  overflow: hidden;
  flex-direction: column;
  .form-container {
    margin-top: 30px;
    width: 100%;
    display: flex;
    flex-direction: column;
    .el-steps {
      flex: 0 0 auto;
    }
    .my-form-box {
      width: 100%;
      overflow-y: auto;
      flex: 1;
      // margin-top: 20px;
    }
  }

  .el-dialog__headerbtn {
    z-index: 999;
  }
  .dialog-title-box {
    display: flex;
    padding: 4px 0;
    padding-bottom: 10px;
    position: relative;
    flex-shrink: 0;
    box-sizing: border-box;
    .title-box {
      flex: 1;
      align-self: center;
      text-align: center;
      font-size: 20px;
      padding-right: 120px;
    }
  }
  .el-dialog {
    margin: 0px !important;
    width: 100%;
    flex: 1;
    flex-direction: column;
    height: 100%;
    align-items: stretch;
    display: flex;
  }
  .el-dialog__header {
    width: 100%;
    flex: 1;
    flex-grow: 0;
    margin: 0;
    padding: 0;
    height: 0;
    // height: 30px;
  }
  .el-dialog__body {
    padding-top: 0px;
    padding-bottom: 0px;
    flex: 1;
    display: flex;
    height: 100%;
  }
  .el-dialog__footer {
    flex-grow: 0;
    flex-shrink: 0;
  }
  .detail-box {
    width: 100%;
    display: flex;
    flex-direction: row;
    // overflow: auto;
    margin-top: 20px;
    .detail-left {
      flex: 1;
      overflow: auto;
    }
    .detail-right {
      // flex: 1;

      flex: 1;
      display: flex;
      flex-direction: column;
      border-left: 1px solid #ebeef5;
      align-items: stretch;
      position: relative;
      padding-left: 20px;
    }
  }
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
import Vue from "vue";
import IScrollView from "vue-iscroll-view";
import IScroll from "iscroll";
Vue.use(IScrollView, IScroll);
import imageView from 'vue-imageview'
import LargeimgView from '@src/components/LargeimgView'
import ScrollPane from "@src/components/ScrollPane";
// 组件end
import "@src/common/filters";
import SearchForm from "@src/components/SearchForm";
import DataPage from "@src/components/DataPage";
import add from "./add";
import detail from "./detail";
// table页与搜索页公用功能
import { mixinsPc } from "@src/common/mixinsPc";
import { mixinDataTable } from "@src/components/DataPage/dataPage";
import { todayStr } from "@src/common/dateSerialize";
import { } from "@src/common/regexp";
import {
  getMctManageOrders,
} from "@src/apis";
export default {
  name: "mer_manage_orders",
  components: {
    "myp-search-form": SearchForm, // 搜索组件
    "myp-data-page": DataPage, // 数据列表组件
    add,
    ScrollPane,
    ImageView: imageView,
    LargeimgView,
    detail
  },

  mixins: [mixinDataTable, mixinsPc],
  data() {
    var searchConditionVar = {
      startTime: todayStr + " 00:00:00", // 开始时间
      endTime: todayStr + " 23:59:59", // 结束时间
      customerNo: "",
      comCustomerNo: "",
      phoneNo: "",
      status: "",
      taxNo: "",
      agentNo: "",
      type: "",
      idCard: ""
    };
    return {
      dialogLoading: "",
      imgsArray: [],
      editTitle: "",
      formType: "",// 新增或是编辑
      rowData: {},// 传给子组件
      addFormVisible: false,
      addStep: "add",
      stepTab: {},
      exportForm: {
        page: 1,
        limit: 99999999999,
        merOrderNo: "",
        plaOrderNo: "",
        customerNo: "",
        payType: "",
        status: ""
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
      customerDetail: {},
      customerDetailVisible: false,
      // 查询条件数据
      searchCondition: searchConditionVar,
      // 顶部搜索表单信息
      searchOptions: {
        lableWidth: "100px",
        searchList: []
      },
      // 列表数据
      actionUrl: getMctManageOrders,
      postSearch: searchConditionVar,
      tableData: {
        havecheck: false, //是否显示选择框
        dataHeader: [],
        operation: {
          width: "120px",
          options: [
            // 操作按钮
            {
              text: "查看",
              color: "#1890ff",
              cb: rowdata => {
                this.imgsArray = [];
                this.detailsForm = { ...rowdata };
                this.detailsFormVisible = true;
                this.$nextTick(() => {
                  this.$refs['detail'].initFn();
                })
              }
            },
            {
              text: "编辑",
              color: "#1890ff",
              visibleFn: () => {
                return this.adminFilter('mer_manage_orders_edit')
              },
              cb: rowdata => {
                this.editTitle = "线上商户修改";
                this.rowData = rowdata;
                this.addFormVisible = true;
                this.formType = "EDIT";
                this.$nextTick(() => {
                  this.$refs['stepComponent'].checkIn()
                })
              }
            }
          ]
        }
      }
    };
  },
  created() {
    this.$nextTick(() => {
      // 搜索条件start
      let screenSearchVisible = false;
      if (document.documentElement.clientWidth > 1600) {
        screenSearchVisible = true
      }
      this.searchOptions.searchList.push(
        // 请注意 该数组里对象的corresattr属性值与searchCondition里面的属性是一一对应的 不可少
        {
          corresattr: "startTime",
          type: "dateTime",
          label: "起始时间",
          show: true, // 普通搜索显示
          clearable: true,
          defaultVlue: todayStr + " 00:00:00",
          // defaultTime:"00:00:00",
          value: todayStr + ' 00:00:00',
          cb: value => {
            this.searchCondition.startTime = value;
          }
        },
        {
          corresattr: "endTime",
          type: "dateTime",
          label: "结束时间",
          clearable: true,
          show: true, // 普通搜索显示
          defaultVlue: todayStr + " 23:59:59",
          value: todayStr + ' 23:59:59',
          // defaultTime:"23:59:59",
          cb: value => {
            this.searchCondition.endTime = value;
          }
        },
        {
          corresattr: "customerNo",
          type: "text",
          label: "商户编号",
          placeholder: "商户编号",
          show: true, // 普通搜索显示
          defaultVlue: "",
          value: "",
          cb: value => {
            this.searchCondition.customerNo = value;
          }
        },
        {
          corresattr: "comCustomerNo",
          type: "text",
          label: "机构商户号",
          show: true, // 普通搜索显示
          defaultVlue: "",
          value: "",
          cb: value => {
            this.searchCondition.comCustomerNo = value;
          }
        },
        {
          corresattr: "phoneNo",
          type: "text",
          label: "手机号",
          show: true, // 普通搜索显示
          defaultVlue: "",
          value: "",
          cb: value => {
            this.searchCondition.phoneNo = value;
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
            ...this.statusFilterQuery('mctManageStatus')
          ],
          cb: value => {
            this.searchCondition.status = value;
          }
        },
        {
          corresattr: "agentNo",
          type: "text",
          label: "服务商编号",
          show: true, // 普通搜索显示
          defaultVlue: "",
          value: "",
          cb: value => {
            this.searchCondition.agentNo = value;
          }
        },

        {
          corresattr: "taxNo",
          type: "text",
          label: "企业税号",
          show: screenSearchVisible, // 普通搜索显示
          defaultVlue: "",
          value: "",
          cb: value => {
            this.searchCondition.taxNo = value;
          }
        },
        {
          corresattr: "type",
          type: "select",
          label: "商户类型",
          show: screenSearchVisible, // 普通搜索显示
          defaultVlue: "",
          value: "",
          options: [
            {
              value: "",
              label: "全部"
            },
            ...this.statusFilterQuery('mctManageType')
          ],
          cb: value => {

            this.searchCondition.type = value;
          }
        },
        {
          corresattr: "idCard",
          type: "text",
          label: "法人身份证号",
          show: screenSearchVisible, // 普通搜索显示
          defaultVlue: "",
          value: "",
          cb: value => {
            this.searchCondition.idCard = value;
          }
        }
      )
      // 搜索条件end
      // table start
      this.tableData.dataHeader.push(
        // table列信息 key=>表头标题，word=>表内容信息
        {
          key: "创建时间",
          width: "160px",
          word: "createTime",
          hidden: true
        },
        {
          key: "商户编号",
          width: "100px",
          word: "customerNo"
        },

        {
          key: "企业名称",
          width: "140px",
          word: "enterpriseName"
        },
        {
          key: "联系人",
          width: "100px",
          word: "linkMan"
        },
        {
          key: "手机号",
          width: "100px",
          word: "phoneNo"
        },
        {
          key: "商户来源",
          width: "100px",
          word: "customerFrom",
          status: true,
          type: data => {
            return this.statusFilter(data, 'customerFrom')
          }
          // customerFrom
        },
        {
          key: "状态",
          width: "90px",
          word: "status",
          status: true,
          type: data => {
            return this.statusFilter(data, 'mctManageStatus')
          }
        },
        {
          key: "机构商户号",
          width: "135px",
          word: "comCustomerNo"
        },
        {
          key: "服务商编号",
          width: "100px",
          word: "agentNo"
        }
      )
      // table end
    })
  },
  methods: {
    addSave() {
      this.$nextTick(() => {
        this.$refs['stepComponent'].addSave()
      })
    },
    // getEncryptKey(agentNo) {
    //   // 得到加密key
    //   return new Promise(function (resolve, reject) {
    //     getOnlineFacilitatorOrders()({
    //       agentName: "",
    //       endTime: "",
    //       limit: 1,
    //       page: 1,
    //       startTime: "",
    //       status: "",
    //       agentNo: agentNo
    //     }).then((res) => {
    //       if (res.code == "00") {
    //         if (res.data.length > 0) {
    //           console.log()
    //           resolve({
    //             encryptKey: res.data[0].encryptKey,
    //             signKey: res.data[0].signKey,
    //           })
    //         }
    //       } else {
    //         this.$message({
    //           message: data.msg,
    //           type: "warning",
    //           center: true
    //         });
    //         reject(data.msg);
    //       }
    //     })
    //   })
    // },
    addSuccess() {
      this.addFormVisible = false;
      this.seachstartHandle()
    },
    // 新增
    addDialog() {
      this.editTitle = "线上商户新增";
      this.addFormVisible = true;

      this.formType = "ADD";
      this.$nextTick(() => {
        this.$refs['stepComponent'].checkIn();
      })
    },
    stopLoad() {
      this.$nextTick(() => {
        // this.dialogLoading.close();
      })
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
  },
  mounted() { },
  watch: {
    detailsFormVisible(val) {
      this.saveLoadingStop(val);
    },
    editFormVisible(val) {
      this.saveLoadingStop(val);
    },
    addFormVisible(val) {
      if (!val) {
        this.$refs['stepComponent'].clearValidate()
      }
    }
  }
};
</script>
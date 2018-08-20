<template>
  <!-- 线上商户新增或编辑 -->
  <el-form size="small" :model="addForm" ref="addForm" :rules="addFormRules">
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <el-form-item label="商户编号" prop="customerNo" :label-width="formLabelWidth">
            <el-input :disabled="customerNoDis" v-model="addForm.customerNo" auto-complete="off"></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="12">
        <el-form-item class="full-width" label="业务类型" prop="bussinessType" :label-width="formLabelWidth">
          <el-select :disabled="customerNoDis" placeholder="业务类型" size="small" v-model="addForm.bussinessType">
            <el-option v-for="item in bussinessTypeOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <el-form-item class="full-width" label="交易金额等级" prop="payAmount" :label-width="formLabelWidth">
            <el-select :disabled="customerNoDis" placeholder="交易金额等级" size="small" v-model="addForm.payAmount">
              <el-option v-for="item in payAmountOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">
          <el-form-item prop="myarea" label="所在地区" :label-width="formLabelWidth">
            <el-cascader :disabled="customerNoDis" class="full-width" placeholder="所在地区" :options="optionsArea" v-model="myarea">
            </el-cascader>
          </el-form-item>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item class="timestartandend-group" label="营业执照期限" :label-width="formLabelWidth">
          <div>
            <el-col :span="11">
              <el-form-item prop="bussinessLicenseEffectiveBegin">
                <el-date-picker :disabled="customerNoDis" :clearable="false" placeholder="开始日期" value-format="yyyy-MM-dd" class="full-width" v-model="addForm.timeBegin" type="date">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item prop="bussinessLicenseEffectiveEnd">
                <el-date-picker :disabled="customerNoDis" :clearable="false" placeholder="结束日期" value-format="yyyy-MM-dd" class="full-width" v-model="addForm.timeEnd" type="date">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </div>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">
          <el-form-item class="full-width" label="状态" prop="status" :label-width="formLabelWidth">
            <el-select placeholder="状态" size="small" v-model="addForm.status">
              <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-col>
    </el-row>
  </el-form>

</template>
<style lang="scss">
// @import "../../../assets/scss-pc/dialog-detail.scss";
.upload-group {
  display: flex;
  justify-content: space-around;
  // align-content: flex-start;
  flex-wrap: wrap;
  border-right: 1px solid #ebeef5;
  border-bottom: 1px solid #ebeef5;
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
.paystatusSuccess {
  text-align: center;
  .msgbox {
    width: 100%;
    display: flex;
    .icon-box {
      width: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #67c23a;
    }
    .row {
      width: 100%;
      color: #67c23a;
      padding: 30px 20px;
      h2 {
        padding: 10px;
        font-size: 22px;
      }
      p {
        font-size: 14px;
      }
    }
  }
}
.add-form-box {
  border: 1px solid #e6ebf5;
  margin-bottom: 10px;
  .title-back {
    border-bottom: 1px solid #e6ebf5;
    background: #f0f0f0;
    font-weight: bold;
    padding: 5px 10px;
  }
  .content {
    padding: 10px 20px;
    overflow: hidden;
    .block-box {
      display: flex;
      flex-wrap: wrap;
    }
    .group-box {
      flex: 1;
      flex: 0 0 378px;
      .timestartandend-group {
        
        width: 378px;
      }
      // max-width: 400px;
    }
  }
  .el-form-item__label {
    padding-bottom: 0px;
  }
}
.span-box-2 {
  display: flex;
  & > div {
    flex: 1;
  }
  // & > div:nth-child(1) {
  //   margin-left: 10px;
  // }
  & > div:nth-child(2) {
    margin-left: 10px;
  }
}

.timestartandend-group {
  width: 100%;
  display: flex;
  background-image: none;
  flex-direction: row;
  overflow:hidden;
  & > .el-form-item__label {
    position: absolute;
  }
  // &.full-width {
  & > .el-form-item__content {
    width: 100%;
    display: flex;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background-color: #fff;
    width: 100%;
    // width: -moz-calc(100% - 130px);
    // width: -webkit-calc(100% - 130px);
    // width: calc(100% - 130px);
    .el-form-item {
      margin-bottom: 0px;
    }
    .el-input__inner {
      border: 0px;
    }
  }
  // }
  .el-form-item__label {
    white-space: nowrap;
    // margin-left: 20px;
  }
  .el-date-editor {
    display: flex;
  }
  .el-date-editor .el-range__close-icon {
    position: absolute;
    top: 0;
    right: 3px;
  }
  input {
    padding-right: 0px;
    border: 0px;
    background: none;
  }
  .el-input__suffix {
    right: 0;
  }
  .el-date-editor .el-input__inner {
    padding-left: 8px;
  }
  .el-date-editor .el-input__prefix {
    display: none;
  }
  .el-input__icon {
    width: 12px;
  }

  .el-date-editor {
    position: relative;
  }
}
.mcp-upload {
  margin: 0 auto;
  .avatar-uploader-icon {
    width: 100px;
    height: 100px;
    line-height: 100px;
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
import { areaOrgcode } from "@src/common/orgcode";
import add from "./add";
// table页与搜索页公用功能
import { mixinsPc } from "@src/common/mixinsPc";
import utils from "@src/common/utils";
import secret from "@src/common/secret";
import { mapState } from 'vuex'
import {
  postEditMctPoolOrder
} from "@src/apis";
import qs from "qs";
import UploadImg from "@src/components/UploadImg";
import { banks } from "@src/common/bank";
import settleMode from "@src/data/settleMode.json";
import { taxNumVerify, idCardVerify, phoneNumVerify, idCardVerify_r } from "@src/common/regexp";
export default {
  name: "mer_manage_orders",
  props: {
    rowData: {
      type: Object
    },
    stepActive: {
      type: Number
    },
    formType: {
      type: String
    }
  },
  components: {
    UploadImg
  },
  mixins: [mixinsPc],
  data() {
    return {
      myarea: [],
      optionsArea: utils.areaPicherOptions(), //省市县数据
      customerNoDis: false,
      dialogLoading: "",
      corporatePerson: false,// 法人
      unCorporatePerson: false,//非法人
      enterprise: true,//企业
      personal: true,// 个人
      public: true,// 对公
      private: true,// 对私
      restaurants: [],
      encryptKey: "",// 加密key
      signKey: "",// 签名key
      labelPosition: "right",
      // 身份证正面
      addStep: "add",
      defaultData: {

      },
      addForm: {
      },
      addFormRules: {
      },
      formLabelWidth: "130px"
    };
  },
  methods: {
    // 保存
    addSave() {
      let successMsg = "";
      // 新增内容保存
      if (this.formType == 'ADD') {
        successMsg = "新增数据";
      }
      if (this.formType == 'EDIT') {
        successMsg = "修改数据";
      }

      this.$refs['addForm'].validate(valid => {
        if (valid) {
          this.saveLoading = true;
          // var addForm = this.addForm;
          let sedData = utils.pickObj(this.addForm, [
            "customerNo","bussinessType","payAmount","timeBegin","timeEnd","status","orgCode"
          ])
          postEditMctPoolOrder()({ ...sedData }).then(data => {
            if (data.code === "00") {
              this.$message({
                message: "恭喜你，" + successMsg + "保存成功",
                type: "success",
                center: true
              });
              this.$emit("addSuccess");
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
    clearValidate() {
      this.$nextTick(() => {
        this.$refs['addForm'].clearValidate();
      })
    },

    addDialog() {
      this.customerNoDis = false;
      this.addFormVisible = true;
      this.clearValidate();
    },
    //持卡人证件号显示隐藏
    checkIn() {
      if (this.formType == 'ADD') {
        //新增
        this.customerNoDis = false;
        this.myarea = [];
        this.$set(this.$data, "addForm", {});
        this.clearValidate();
      }
      if (this.formType == 'EDIT') {
        //编辑
        areaOrgcode(this.rowData.orgCode);
        this.customerNoDis = true;
        this.myarea = areaOrgcode(this.rowData.orgCode);
        this.$set(this.$data, "addForm", this.rowData);
        this.clearValidate();
      }
    },
  },
  computed: {
    bussinessTypeOptions() {
      return this.statusFilterQuery('mctPoolBussinessType')
    },
    statusOptions() {
      return this.statusFilterQuery('mctPoolStatus')
    },
    payAmountOptions() {
      return this.statusFilterQuery('mctPoolPayAmount')
    }
  },
  mounted() { },
  watch: {
    'myarea'(val) {
      this.addForm.orgCode = val[2]
    },
  },
  created() { }
};
</script>
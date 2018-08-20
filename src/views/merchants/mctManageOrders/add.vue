<template>
  <!-- 线上商户查询 -->
  <el-form id="dialogLoding" size="small" :model="addForm" ref="addForm" :rules="addFormRules" :label-position="labelPosition">
    <div class="span-box-2">
      <div class="add-form-box">
        <div class="title-back">机构信息</div>
        <div class="content">
          <el-row :gutter="30">
            <el-form-item label="服务商编号" prop="companyNo" :label-width="formLabelWidth">
              <el-input :disabled="companyNoDisabled" placeholder="服务商编号" @blur="companyNoBlur" v-model="addForm.companyNo" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="机构商户号" prop="comCustomerNo" :label-width="formLabelWidth">
              <el-input placeholder="接入机构商户编号" v-model="addForm.comCustomerNo" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item v-if="false" label="服务信息" prop="service" :label-width="formLabelWidth">
              <el-input placeholder="服务信息" v-model="addForm.service" auto-complete="off"></el-input>
            </el-form-item>
          </el-row>
        </div>
      </div>
      <div class="add-form-box">
        <div class="title-back">商户分类</div>
        <div class="content">
          <el-form-item class="full-width" label="商户类型" prop="customerType" :label-width="formLabelWidth">
            <el-radio-group @change="customerTypeSelect" v-model="addForm.customerType">
              <el-radio label="1">企业/个体户</el-radio>
              <el-radio label="0">个人</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item class="full-width" label="开通代付" prop="customerType" :label-width="formLabelWidth">
            <el-switch v-model="addForm.proxyFlag" active-text="是" inactive-text="否" active-value="1" inactive-value="0">
            </el-switch>
          </el-form-item>
        </div>
      </div>
    </div>
    <div class="add-form-box">
      <div class="title-back">联系人方式</div>
      <div class="content">
        <div class="block-box">
          <div class="group-box">
            <el-form-item label="联系人名称" prop="contactName" :label-width="formLabelWidth">
              <el-input placeholder="联系人名称" v-model="addForm.contactName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="联系人座机" prop="contactPhone" :label-width="formLabelWidth">
              <el-input placeholder="联系人座机" v-model="addForm.contactPhone" auto-complete="off"></el-input>
            </el-form-item>
          </div>
          <div class="group-box">
            <el-form-item label="联系人手机号" prop="contactMobile" :label-width="formLabelWidth">
              <el-input placeholder="联系人手机号" v-model="addForm.contactMobile" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="联系人邮箱" prop="contactEmail" :label-width="formLabelWidth">
              <el-input placeholder="联系人邮箱" v-model="addForm.contactEmail" auto-complete="off"></el-input>
            </el-form-item>
          </div>
        </div>

      </div>
    </div>
    <div class="add-form-box">
      <div class="title-back">基本信息</div>
      <div class="content">
        <div class="block-box">
          <div class="group-box">
            <el-form-item label="企业名称" prop="enterpriseName" :label-width="formLabelWidth">
              <el-input :placeholder="enterpriseNameHolder" @blur="enterpriseNameBlur" v-model="addForm.enterpriseName" auto-complete="off"></el-input>
            </el-form-item>
          </div>
          <div class="group-box" v-if="enterprise">
            <el-form-item label="企业简称" prop="bussinessName" :label-width="formLabelWidth">
              <el-input :placeholder="bussinessNameHolder" v-model="addForm.bussinessName" auto-complete="off"></el-input>
            </el-form-item>
          </div>
          <div class="group-box" v-if="enterprise">
            <el-form-item label="经营地址" prop="bussinessAddress" :label-width="formLabelWidth">
              <el-input placeholder="经营地址" v-model="addForm.bussinessAddress" auto-complete="off"></el-input>
            </el-form-item>
          </div>
          <div class="group-box" v-if="enterprise">
            <el-form-item label="社会信用代码" prop="taxNo" :label-width="formLabelWidth">
              <el-input placeholder="营业执照号/统一社会信用代码" v-model="addForm.taxNo" auto-complete="off"></el-input>
            </el-form-item>
          </div>
          <div class="group-box" v-if="enterprise">
            <el-form-item class="timestartandend-group" label="营业执照期限" :label-width="formLabelWidth">
              <div>
                <el-col :span="11">
                  <el-form-item prop="bussinessLicenseEffectiveBegin">
                    <el-date-picker :clearable="false" placeholder="开始日期" value-format="yyyy-MM-dd" class="full-width" v-model="addForm.bussinessLicenseEffectiveBegin" type="date">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-form-item prop="bussinessLicenseEffectiveEnd">
                    <el-date-picker :clearable="false" placeholder="结束日期" value-format="yyyy-MM-dd" class="full-width" v-model="addForm.bussinessLicenseEffectiveEnd" type="date">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </div>

            </el-form-item>
          </div>
          <div class="group-box">
            <el-form-item class="full-width" label="法人证件类型" prop="idType" :label-width="formLabelWidth">
              <el-select placeholder="法人证件类型" size="small" v-model="addForm.idType">
                <el-option v-for="item in idTypeOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="group-box">
            <el-form-item label="注册地址" prop="registerAddress" :label-width="formLabelWidth">
              <el-input placeholder="注册地址" v-model="addForm.registerAddress" auto-complete="off"></el-input>
            </el-form-item>
          </div>
          <div class="group-box">
            <el-form-item label="经营类型" prop="category" :label-width="formLabelWidth">
              <el-select placeholder="经营类型" class="full-width" size="small" v-model="addForm.category">
                <el-option v-for="item in slotsActions" :key="item.code" :label="item.name" :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
          </div>

          <div class="group-box">
            <el-form-item prop="myarea" label="所在地区" :label-width="formLabelWidth">
              <el-cascader class="full-width" placeholder="所在地区" :options="optionsArea" v-model="myarea">
              </el-cascader>
            </el-form-item>
          </div>

          <div class="group-box">
            <el-form-item label="客服电话" prop="servicePhone" :label-width="formLabelWidth">
              <el-input placeholder="客服电话" v-model="addForm.servicePhone" auto-complete="off"></el-input>
            </el-form-item>
          </div>
          <div class="group-box">
            <el-form-item label="法人证件号" prop="idCard" :label-width="formLabelWidth">
              <el-input placeholder="法人证件号" v-model="addForm.idCard" auto-complete="off"></el-input>
            </el-form-item>
          </div>
          <div class="group-box">
            <el-form-item class="timestartandend-group" label="证件有效期" :label-width="formLabelWidth">
              <div>
                <el-col :span="11">
                  <el-form-item prop="idNoEffectiveBegin">
                    <el-date-picker :clearable="false" placeholder="开始日期" value-format="yyyy-MM-dd" class="full-width" v-model="addForm.idNoEffectiveBegin" type="date">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-form-item prop="idNoEffectiveEnd">
                    <el-date-picker :clearable="false" placeholder="结束日期" value-format="yyyy-MM-dd" class="full-width" v-model="addForm.idNoEffectiveEnd" type="date">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </div>
            </el-form-item>
          </div>
          <div class="group-box">
            <el-form-item v-if="enterprise" label="法人姓名" prop="legalPerson" :label-width="formLabelWidth">
              <el-input placeholder="法人姓名" @blur="legalPersonBlur" v-model="addForm.legalPerson" auto-complete="off"></el-input>
            </el-form-item>
          </div>
        </div>
      </div>
    </div>
    <div class="add-form-box">
      <div class="title-back">结算信息</div>
      <div class="content">
        <div class="block-box">
          <div class="group-box">
            <el-form-item label="账户类型" prop="accountType" :label-width="formLabelWidth">
              <el-radio :disabled="personal" v-model="addForm.accountType" label="0">对公</el-radio>
              <el-radio v-model="addForm.accountType" label="1">对私</el-radio>
            </el-form-item>
          </div>
          <div class="group-box">
            <el-form-item label="结算方式" prop="settleMode" :label-width="formLabelWidth">
              <el-radio v-model="addForm.settleMode" label="T1">T1</el-radio>
              <el-radio v-model="addForm.settleMode" label="T0">T0</el-radio>
            </el-form-item>
          </div>
          <div class="group-box">
            <el-form-item class="full-width" label="开户银行" prop="bankCode" :label-width="formLabelWidth">
              <el-select placeholder="开户银行" filterable @input="banksChange" size="small" v-model="backForm.bankCode">
                <el-option v-for="item in bankOptions" :key="item.code" :label="item.name" :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="group-box">
            <el-form-item class="full-width" :prop="isBankAreaRule" label="开户行地区" :label-width="formLabelWidth">
              <el-cascader placeholder="开户行地区(需先选择开户银行)" @change="bankhandleChangeArea" :options="optionsArea" v-model="backForm.bankArea">
              </el-cascader>
            </el-form-item>
          </div>
          <div class="group-box">
            <el-form-item class="full-width" :label-width="formLabelWidth" :prop="addForm.unionCode?'':'unionCode'" label="选择支行">
              <el-input v-if="branchNameVisible" v-model="backForm.branchName" auto-complete="off"></el-input>
              <el-select placeholder="选择支行(需先选择开户行地区)" filterable v-if="bankAreaVisible" prop="unionCode" v-model="addForm.unionCode" clearable>
                <el-option v-for="item in branchBankOptions" :key="item.branchName" :label="item.branchName" :value="item.unionCode">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="group-box">
            <el-form-item label="联行号" prop="unionCode" :label-width="formLabelWidth">
              <el-input placeholder="需要先选择支行" :disabled="true" v-model="addForm.unionCode" auto-complete="off"></el-input>
            </el-form-item>
          </div>
          <div class="group-box">
            <el-form-item label="账户名称" prop="accountName" :label-width="formLabelWidth">
              <el-input @change="accountNameChange" placeholder="账户名称" :disabled="accountNameDis" v-model="addForm.accountName" auto-complete="off"></el-input>
            </el-form-item>
          </div>
          <div class="group-box">
            <el-form-item label="收款人账户号" prop="accountNo" :label-width="formLabelWidth">
              <el-input placeholder="收款人账户号" v-model="addForm.accountNo" auto-complete="off"></el-input>
            </el-form-item>
          </div>
          <div v-if="enterprise&&privateperson&&unCorporatePerson" class="group-box">
            <el-form-item label="预留手机号" prop="reservedPhoneNo" :label-width="formLabelWidth">
              <el-input placeholder="预留手机号" v-model="addForm.reservedPhoneNo" auto-complete="off"></el-input>
            </el-form-item>
          </div>
          <div v-if="enterprise&&privateperson" class="group-box">
            <el-form-item label="持卡人证件号" prop="settleIdCard" :label-width="formLabelWidth">
              <el-input placeholder="持卡人证件号" v-model="addForm.settleIdCard" auto-complete="off"></el-input>
            </el-form-item>
          </div>
          <div class="group-box">
          </div>
        </div>
      </div>
    </div>
    <div class="add-form-box">
      <div class="title-back">费率信息</div>
      <div class="content">
        <el-row :gutter="30">
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="微信扫码费率" prop="wechatScansRate" :label-width="formLabelWidth">
              <el-autocomplete class="full-width" v-model="addForm.wechatScansRate" :fetch-suggestions="querySearch" placeholder="请输入微信扫码费率%">
                <template slot="append">%</template>
              </el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="支付宝扫码费率" prop="alipayScansRate" :label-width="formLabelWidth">
              <el-autocomplete class="full-width" v-model="addForm.alipayScansRate" :fetch-suggestions="querySearch" placeholder="请输入支付宝扫码费率%">
                <template slot="append">%</template>
              </el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="微信APP费率" prop="wechatAppRate" :label-width="formLabelWidth">
              <el-autocomplete class="full-width" v-model="addForm.wechatAppRate" :fetch-suggestions="querySearch" placeholder="请输入微信APP费率%">
                <template slot="append">%</template>
              </el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="支付宝APP费率" prop="alipayAppRate" :label-width="formLabelWidth">
              <el-autocomplete class="full-width" v-model="addForm.alipayAppRate" :fetch-suggestions="querySearch" placeholder="请输入支付宝APP费率%">
                <template slot="append">%</template>
              </el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="微信H5费率" prop="wechatH5Rate" :label-width="formLabelWidth">
              <el-autocomplete class="full-width" v-model="addForm.wechatH5Rate" :fetch-suggestions="querySearch" placeholder="请输入微信H5费率%">
                <template slot="append">%</template>
              </el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="支付宝H5费率" prop="alipayH5Rate" :label-width="formLabelWidth">
              <el-autocomplete class="full-width" v-model="addForm.alipayH5Rate" :fetch-suggestions="querySearch" placeholder="支付宝H5费率%">
                <template slot="append">%</template>
              </el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col v-if="addForm.settleMode=='T0'" :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="T0提现手续费" prop="t0CashCostFixed" :label-width="formLabelWidth">
              <el-input v-model="addForm.t0CashCostFixed" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 照片 -->
    <div class="add-form-box">
      <div class="title-back">上传图片</div>
      <div class="content">
        <div class="upload-group mcp-upload" ref="upImgBox">
          <upload-img v-if="privateperson" :label="'结算卡照'" :upType="'SETTLE_CARD_IMG'" :imgKey="'settleCardImg'" :defaultImg='imgUrlList.settleCardImg' ref="settleCardImg" :sendData="allImgData" :action="imgUploadAction" :uploadApi="false" @result="saveOneImg"></upload-img>
          <upload-img v-if="enterprise&&(company)" :label="'开户许可证'" :upType="'ACCOUNT_OPENING_LICENSE'" :imgKey="'accountLicenseImg'" :defaultImg='imgUrlList.accountLicenseImg' ref="accountLicenseImg" :sendData="allImgData" :action="imgUploadAction" :uploadApi="false" @result="saveOneImg"></upload-img>
          <upload-img v-if="enterprise&&(company||privateperson)" :label="'法人身份证人像面'" :upType="'LEGAL_PERSON_ID_POSITIVE'" :imgKey="'identityFrontImg'" :defaultImg='imgUrlList.identityFrontImg' ref="identityFrontImg" :sendData="allImgData" :action="imgUploadAction" :uploadApi="false" @result="saveOneImg"></upload-img>
          <upload-img v-if="enterprise&&(company||privateperson)" :label="'法人身份证国徽面'" :upType="'LEGAL_PERSON_ID_BACK'" :imgKey="'identityBackImg'" :defaultImg='imgUrlList.identityBackImg' ref="identityBackImg" :sendData="allImgData" :action="imgUploadAction" :uploadApi="false" @result="saveOneImg"></upload-img>
          <upload-img v-if="enterprise&&privateperson&&corporatePerson" :label="'法人手持身份证照'" :upType="'APPLICANT_WITH_ID'" :imgKey="'identityHolderImg'" :defaultImg='imgUrlList.identityHolderImg' ref="identityHolderImg" :sendData="allImgData" :action="imgUploadAction" :uploadApi="false" @result="saveOneImg"></upload-img>
          <upload-img v-if="enterprise&&privateperson&&unCorporatePerson" :label="'法人手持授权书照'" :upType="'HOLD_CERTIFICATE_IMG'" :imgKey="'holdCertificateImg'" :defaultImg='imgUrlList.holdCertificateImg' ref="holdCertificateImg" :sendData="allImgData" :action="imgUploadAction" :uploadApi="false" @result="saveOneImg"></upload-img>
          <upload-img v-if="enterprise&&(company||privateperson)" :label="'商户营业执照'" :upType="'BUSSINESS_LICENSE'" :imgKey="'bussinessLicenseImg'" :defaultImg='imgUrlList.bussinessLicenseImg' ref="bussinessLicenseImg" :sendData="allImgData" :action="imgUploadAction" :uploadApi="false" @result="saveOneImg"></upload-img>

          <upload-img v-if="enterprise&&privateperson&&unCorporatePerson" :label="'持卡人身份证人像面照'" :upType="'CARDHOLDER_ID_POSITIVE'" :imgKey="'cardHolderFrontImg'" :defaultImg='imgUrlList.cardHolderFrontImg' ref="cardHolderFrontImg" :sendData="allImgData" :action="imgUploadAction" :uploadApi="false" @result="saveOneImg"></upload-img>
          <upload-img v-if="enterprise&&privateperson&&unCorporatePerson" :label="'持卡人身份证国徽面照'" :upType="'CARDHOLDER_ID_BACK'" :imgKey="'cardHolderBackImg'" :defaultImg='imgUrlList.cardHolderBackImg' ref="cardHolderBackImg" :sendData="allImgData" :action="imgUploadAction" :uploadApi="false" @result="saveOneImg"></upload-img>
          <upload-img v-if="enterprise&&privateperson&&unCorporatePerson" :label="'持卡人手持身份证合影照'" :upType="'CARDHOLDER_WITH_ID'" :imgKey="'cardHolderIdImg'" :defaultImg='imgUrlList.cardHolderIdImg' ref="cardHolderIdImg" :sendData="allImgData" :action="imgUploadAction" :uploadApi="false" @result="saveOneImg"></upload-img>
          <upload-img v-if="enterprise&&privateperson&&unCorporatePerson" :label="'授权书加公章照'" :upType="'CERTIFICATE_IMG'" :imgKey="'certificateImg'" :defaultImg='imgUrlList.certificateImg' ref="certificateImg" :sendData="allImgData" :action="imgUploadAction" :uploadApi="false" @result="saveOneImg"></upload-img>

          <upload-img v-if="enterprise&&(company||privateperson)" :label="'店内照'" :upType="'STORE_IMG'" :imgKey="'storeImg'" :defaultImg='imgUrlList.storeImg' ref="storeImg" :sendData="allImgData" :action="imgUploadAction" :uploadApi="false" @result="saveOneImg"></upload-img>
          <upload-img v-if="enterprise&&(company||privateperson)" :label="'门头照'" :upType="'PLACE_IMG'" :imgKey="'placeImg'" :defaultImg='imgUrlList.placeImg' ref="placeImg" :sendData="allImgData" :action="imgUploadAction" :uploadApi="false" @result="saveOneImg"></upload-img>
          <upload-img v-if="enterprise&&(company||privateperson)" :label="'收银台照'" :upType="'CASH_SPACE_IMG'" :imgKey="'cashSpaceImg'" :defaultImg='imgUrlList.cashSpaceImg' ref="cashSpaceImg" :sendData="allImgData" :action="imgUploadAction" :uploadApi="false" @result="saveOneImg"></upload-img>

          <upload-img :label="'其他照片'" :upType="'OTHERS'" :imgKey="'othersImg'" :defaultImg='imgUrlList.othersImg' ref="othersImg" :sendData="allImgData" :action="imgUploadAction" :uploadApi="false" @result="saveOneImg"></upload-img>
        </div>
      </div>
    </div>

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
// 组件end
import "@src/common/filters";
import { areaOrgcode } from "@src/common/orgcode";
// table页与搜索页公用功能
import { mixinsPc } from "@src/common/mixinsPc";
import utils from "@src/common/utils";
import secret from "@src/common/secret";
import { mapState } from 'vuex'
import {
  getOnlineFacilitatorOrders,
  getMctManageOrdersAdd,
  getBankList
} from "@src/apis";
import UploadImg from "@src/components/UploadImg";
import bussinessTypeJson from "@src/data/bussinessType.json";
import { banks } from "@src/common/bank";
import settleMode from "@src/data/settleMode.json";
import { } from "@src/common/regexp";
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
      dialogLoading: "",
      corporatePerson: false,// 法人
      unCorporatePerson: false,//非法人
      enterprise: true,//企业
      personal: true,// 个人
      company: true,// 对公
      privateperson: true,// 对私
      companyNoDisabled: false,
      settleIdCardVisible: true,
      restaurants: [],
      accountNameDis: true,
      settleModeOption: settleMode,
      encryptKey: "",// 加密key
      signKey: "",// 签名key
      optionsArea: utils.areaPicherOptions(), //省市县数据
      labelPosition: "right",
      bankOptions: banks,
      slotsActions: bussinessTypeJson,
      bankAreaVisible: false,
      branchNameVisible: true,
      bankCity: "",
      bankCode: "",
      branchBankOptions: [],
      // 身份证正面
      uploadApi: "",
      addStep: "add",
      stepTab: {
      },
      customerNoDisabled: false,
      backForm: {},
      senImgAll: {
        BUSSINESS_LICENSE: { //商户营业执照照片
          id: 'bussinessLicenseImgId',
          ref: 'bussinessLicenseImg'
        },
        ACCOUNT_OPENING_LICENSE: { //开户许可证照片
          id: 'accountLicenseImgId',
          ref: 'accountLicenseImg'
        },
        LEGAL_PERSON_ID_POSITIVE: { //法人身份证人像面
          id: 'identityFrontImgId',
          ref: 'identityFrontImg'
        },
        LEGAL_PERSON_ID_BACK: { //法人身份证国徽面
          id: 'identityBackImgId',
          ref: 'identityBackImg'
        },
        APPLICANT_WITH_ID: { // 法人手持身份证合影照片
          id: 'identityHolderImgId',
          ref: 'identityHolderImg',
        },
        STORE_IMG: { // 店内照片
          id: 'storeImgId',
          ref: 'storeImg',
        },
        PLACE_IMG: { // 门头照片
          id: 'placeImgId',
          ref: 'placeImg',
        },
        CASH_SPACE_IMG: { // 收银台照片
          id: 'cashSpaceImgId',
          ref: 'cashSpaceImg',
        },
        SETTLE_CARD_IMG: { // 结算卡照片
          id: 'settleCardImgId',
          ref: 'settleCardImg',
        },
        CERTIFICATE_IMG: { // 授权照片
          id: 'certificateImgId',
          ref: 'certificateImg',
        },
        HOLD_CERTIFICATE_IMG: { // 法人手持授权照片
          id: 'holdCertificateImgId',
          ref: 'holdCertificateImg',
        },
        CARDHOLDER_ID_POSITIVE: { // 持卡人身份证人像面照片
          id: 'cardHolderFrontImgId',
          ref: 'cardHolderFrontImg',
        },
        CARDHOLDER_ID_BACK: { // 持卡人身份证国徽面照片
          id: 'cardHolderBackImgId',
          ref: 'cardHolderBackImg',
        },
        CARDHOLDER_WITH_ID: { // 持卡人手持身份证合影照片
          id: 'cardHolderIdImgId',
          ref: 'cardHolderIdImg',
        },
        OTHERS: { // 其他照片
          id: 'othersImgId',
          ref: 'othersImg',
        }
      },
      myarea: [],
      addForm: {
        version: "1.0.0",
        customerType: "1",
        accountType: "0",
        settleMode: "T1",

        service: "",
        companyNo: "",
        comCustomerNo: "",
        enterpriseName: "",
        bussinessName: "",
        proxyFlag: "",
        legalPerson: "",
        bussinessAddress: "",
        registerAddress: "",
        servicePhone: "",
        contactName: "",
        contactPhone: "",
        contactMobile: "",
        contactEmail: "",
        idType: "",
        idCard: "",
        idNoEffectiveBegin: "",
        idNoEffectiveEnd: "",
        taxNo: "",
        bussinessLicenseEffectiveBegin: "",
        bussinessLicenseEffectiveEnd: "",
        orgCode: [],
        accountName: "",
        accountNo: "",
        unionCode: "",
        reservedPhoneNo: "",
        settleIdCard: "",
        category: "",
        wechatScansRate: "",
        alipayScansRate: "",
        wechatAppRate: "",
        alipayAppRate: "",
        wechatH5Rate: "",
        alipayH5Rate: "",
        t0CashCostFixed: "",
        bussinessLicenseImgId: "",//商户营业执照照片
        accountLicenseImgId: "",//开户许可证照片
        identityFrontImgId: "",//法人身份证人像面
        identityBackImgId: "",//法人身份证国徽面
        identityHolderImgId: "",//法人手持身份证合影照片
        storeImgId: "",//店内照片
        placeImgId: "",//门头照片
        cashSpaceImgId: "",//收银台照片
        settleCardImgId: "",//结算卡照片
        certificateImgId: "",//授权照片
        holdCertificateImgId: "",//法人手持授权照片
        cardHolderFrontImgId: "",//持卡人身份证人像面照片
        cardHolderBackImgId: "",//持卡人身份证国徽面照片
        cardHolderIdImgId: "",//持卡人手持身份证合影照片
        othersImgId: ""//其他照片
      },
      addFormRules: {
        // version: [{ required: true, message: "请输入版本号", trigger: "blur,change" }],
        // registerAddress: [{ required: true, message: "请输入注册地址", trigger: "blur,change" }],
        // contactName: [{ required: true, message: "请输入联系人名称", trigger: "blur,change" }],
        // contactPhone: [{ required: true, message: "请输入联系人座机", trigger: "blur,change" }],
        // contactEmail: [{ required: true, message: "请输入联系人邮箱", trigger: "blur,change" }],
        // taxNo: [{ required: true, message: "请输入统一社会信用代码", trigger: "blur,change" }],
        // service: [{ required: true, message: "请输入服务号", trigger: "blur,change" }],
        // companyNo: [{ required: true, message: "请输入机构编号", trigger: "blur,change" }],
        // comCustomerNo: [{ required: true, message: "请输入接入机构商户编号", trigger: "blur,change" }],
        // enterpriseName: [{ required: true, message: "请输入商户企业名称", trigger: "blur,change" }],
        // bussinessName: [{ required: true, message: "请输入商户简称", trigger: "blur,change" }],
        // customerType: [{ required: true, message: "请选择商户类型", trigger: "blur,change" }],
        // legalPerson: [{ required: true, message: "请输入法人姓名", trigger: "blur,change" }],
        // bussinessAddress: [{ required: true, message: "请输入商户经营地址", trigger: "blur, change" }],
        // servicePhone: [{ required: true, message: "请输入客服电话", trigger: "blur,change" }],
        // contactMobile: [{ required: true, message: "请输入联系人手机号", trigger: "blur,change" }],
        // idType: [{ required: true, message: "请选择证件类型", trigger: "blur,change" }],
        // idCard: [
        //   { required: true, message: "请输入证件号码", trigger: "blur,change" }
        //   // { required: true, validator: idCardVerify, trigger: "blur" }
        // ],
        // orgCode: [{ required: true, message: "地区编码", trigger: "blur,change" }],
        // myarea: [{ required: true, type: 'array', message: "请输入", trigger: "blur,change" }],
        // accountName: [{ required: true, message: "请输入收款人账户名", trigger: "blur,change" }],
        // accountNo: [{ required: true, message: "请输入收款人账户号", trigger: "blur,change" }],
        // accountType: [{ required: true, message: "请选择账户类型", trigger: "blur,change" }],
        // unionCode: [{ required: true, message: "请先选择支行", trigger: "blur,change" }],
        // // unionCode: [{ required: true, message: "请选择支行", trigger: "blur,change" }],
        // reservedPhoneNo: [{ required: true, message: "请输入银行预留手机号", trigger: "blur,change" }],
        // settleIdCard: [{ required: true, message: "请输入持卡人证件号", trigger: "blur,change" }],
        // category: [{ required: true, message: "请输入经营类目编号", trigger: "blur,change" }],
        // wechatScansRate: [{ required: true, message: "请输入微信扫码费率", trigger: "blur,change" }],
        // alipayScansRate: [{ required: true, message: "请输入支付宝扫码费率", trigger: "blur,change" }],
        // wechatAppRate: [{ required: true, message: "请输入微信APP费率", trigger: "blur,change" }],
        // alipayAppRate: [{ required: true, message: "请输入支付宝APP费率", trigger: "blur,change" }],
        // wechatH5Rate: [{ required: true, message: "请输入微信H5费率", trigger: "blur,change" }],
        // alipayH5Rate: [{ required: true, message: "请输入支付宝H5费率", trigger: "blur,change" }],
        // t0CashCostFixed: [{ required: true, message: "请输入T0提现手续费", trigger: "blur,change" }],
        // settleMode: [{ required: true, message: "请选择结算方式", trigger: "blur,change" }],
        // idNoEffectiveBegin: [{ required: true, message: "请选择开始日期", trigger: "blur,change" }],
        // idNoEffectiveEnd: [{ required: true, message: "请选择结束日期", trigger: "blur,change" }],
        // bussinessLicenseEffectiveBegin: [{ required: true, message: "请选择开始日期", trigger: "blur,change" }],
        // bussinessLicenseEffectiveEnd: [{ required: true, message: "请选择结束日期", trigger: "blur,change" }],
      },
      formLabelWidth: "130px"
    };
  },
  methods: {
    senImgAllHandle(agentNo, getData) {
      for (let [imgObj] of Object.entries(this.senImgAll)) {
        let imgId = imgObj.id;
        if (getData[imgId]) {
          this.searchImg(agentNo, getData[imgId])
        }
      }
    },
    // 查询图片
    searchImg(agentNo, imgId) {
      console.log('加载图片');
      this.getEncryptKey(agentNo).then((res) => {
        let encryptKey = res.encryptKey;
        let signKey = res.signKey;
        let queryEncryptData = secret.Encrypt({ // 加密数据块
          id: imgId,
        }, encryptKey);
        getMctManageOrdersAdd()(
          {
            key: signKey,
            version: "1.0.0",
            service: 'img.download',
            companyNo: agentNo,
            encryptData: queryEncryptData
          }
        ).then((res) => {
          if (res.code == "00") {
            let encryptData = res.encryptData;
            let getImages = secret.Decrypt(encryptData, encryptKey);
            getImages = JSON.parse(getImages);
            let imgType = getImages.imgType;
            let imgString = getImages.imgString;
            let imgRef = this.senImgAll[imgType].ref;
            this.$nextTick(() => {
              this.$refs[imgRef].setImg('data:image/png;base64,' + imgString);
            })
          } else {
            console.log(res);
            this.$message({
              message: res.msg,
              type: "warning",
              center: true
            });
          }
        })

      }).catch((error) => {
        console.log(error);
      })
    },
    saveImgId(sendUpType, sendId) {
      let imgTypes = { ...this.senImgAll };
      for (let [imgType, imgObj] of Object.entries(imgTypes)) {
        let imgId = imgObj.id;
        if (sendUpType == imgType) {
          this.$set(this.addForm, imgId, sendId)
        }
      }
    },
    saveOneImg(imgkey, data, upType) {
      let imgbase64 = data.split(';base64,')[1];
      let encryptKey = this.encryptKey;
      let sendForm = utils.pickObj(this.addForm, [
        "version",//版本号
        "companyNo"//机构编号
      ])
      // console.log(sendForm);
      let changeObj = {
        imgType: upType,
        imgString: imgbase64,
      }
      let encryptData = secret.Encrypt({ ...changeObj }, encryptKey)// 加密数据块
      getMctManageOrdersAdd()({
        key: this.signKey,
        service: "img.upload",
        encryptData: encryptData,
        ...sendForm
      }).then((res) => {
        if (res.code == "00") {
          let getData = JSON.parse(secret.Decrypt(res.encryptData, encryptKey));
          this.saveImgId(upType, getData.id);
        } else {
          console.log(res);
          this.$message({
            message: res.msg,
            type: "warning",
            center: true
          });
        }
      })
    },
    // 保存
    addSave() {
      // this.$refs['addForm'].validate((valid) => {
      //   if (valid) {
      let encryptKey = this.encryptKey;
      if (encryptKey) {
        // let newAddForm = {};
        let newAddForm = { ...this.addForm };

        // allSendForm = utils.pickObj(this.addForm, [
        //   'accountName',//账户名称
        //   "version",//版本号
        //   "service",//服务信息号
        //   "companyNo",//机构编号
        //   "comCustomerNo",//接入机构商户编号
        //   "enterpriseName",//商户企业名称/申请人姓名
        //   "bussinessName",//商户简称/店铺名称
        //   "customerType",//商户类型
        //   "servicePhone",//客服电话
        //   "contactName",//联系人名称
        //   "contactPhone",//联系人电话
        //   "contactMobile",//联系人手机号
        //   "contactEmail",//联系人邮箱
        //   "idType",//证件类型
        //   "idCard",//证件号码
        //   "idNoEffectiveBegin",//证件有效期开始时间
        //   "idNoEffectiveEnd",//证件有效期结束时间
        //   "accountType",//账户类型
        //   "wechatScansRate",//微信扫码费率
        //   "alipayScansRate",//支付宝扫码费率
        //   "wechatAppRate",//微信APP费率
        //   "alipayAppRate",//支付宝APP费率
        //   "wechatH5Rate",//微信H5费率
        //   "alipayH5Rate",//支付宝H5费率
        //   "t0CashCostFixed",//T0提现手续费
        //   "settleMode",//结算方式
        //   "accountNo",// 收款人账户号
        //   "orgCode",//地区编码
        //   "unionCode",//联行号
        //   "category",//经营类目编号
        //   "proxyFlag",//开通代付
        //   'unionCode',//联行号
        // ]);
        // if (this.enterprise) {
        //   // 企业
        //   newAddForm = Object.assign(newAddForm, utils.pickObj(this.addForm, [
        //     "taxNo",//法人姓名
        //     "bussinessAddress",//商户经营地址
        //     "registerAddress",//商户注册地址
        //     "bussinessLicenseEffectiveBegin",//营业执照有效期开始时间
        //     "bussinessLicenseEffectiveEnd",//营业执照有效期结束时间
        //     "legalPerson",//法人姓名
        //   ]))
        //   newAddForm = Object.assign(newAddForm, utils.pickObj(this.addForm, [
        //     // 图片
        //     'bussinessLicenseImgId',//商户营业执照照片
        //     'accountLicenseImgId',//开户许可证照片
        //     'storeImgId',//店内照片
        //     'placeImgId',//门头照片
        //     'cashSpaceImgId',//收银台照片
        //     'settleCardImgId',//结算卡照片
        //   ]));
        //   if (this.company) {
        //     //对公
        //     newAddForm = Object.assign(newAddForm, utils.pickObj(this.addForm, [
        //       "bussinessAddressId",//商户经营地址
        //       "registerAddressId",//商户注册地址
        //       'identityFrontImgId',//法人身份证人像面
        //       'identityBackImgId',//法人身份证国徽面
        //       'identityHolderImgId',//法人手持身份证合影照片
        //       // 图片
        //     ]))
        //   }
        //   if (this.privateperson) {
        //     //对私
        //     newAddForm = Object.assign(newAddForm, utils.pickObj(this.addForm, [
        //       "settleIdCard" //持卡人证件号
        //     ]))
        //     if (this.unCorporatePerson) {
        //       //对私非法人
        //       newAddForm = Object.assign(newAddForm, utils.pickObj(this.addForm, [
        //         "reservedPhoneNoId",//预留手机号
        //         //图片
        //         'certificateImgId',//非法人授权书
        //         'holdCertificateImgId',//法人手持授权照片
        //         'cardHolderFrontImgId',//持卡人身份证人像面照片
        //         'cardHolderBackImgId',//持卡人身份证国徽面照片
        //         'cardHolderIdImgId',//持卡人手持身份证合影照片
        //       ]))
        //     }
        //   }
        //   newAddForm = Object.assign(newAddForm, allSendForm)
        // } else {
        //   // 个人
        //   newAddForm = Object.assign(newAddForm, utils.pickObj(this.addForm, [
        //     "registerAddress",//商户注册地址
        //     'settleCardImg',//结算卡照片
        //     'othersImg'//其他照片
        //   ]));
        //   newAddForm = Object.assign(newAddForm, allSendForm)
        // }
        newAddForm.wechatScansRate = newAddForm.wechatScansRate ? utils.accMul(newAddForm.wechatScansRate, 0.01) : newAddForm.wechatScansRate;
        newAddForm.alipayScansRate = newAddForm.alipayScansRate ? utils.accMul(newAddForm.alipayScansRate, 0.01) : newAddForm.alipayScansRate;
        newAddForm.wechatAppRate = newAddForm.wechatAppRate ? utils.accMul(newAddForm.wechatAppRate, 0.01) : newAddForm.wechatAppRate;
        newAddForm.alipayAppRate = newAddForm.alipayAppRate ? utils.accMul(newAddForm.alipayAppRate, 0.01) : newAddForm.alipayAppRate;
        newAddForm.wechatH5Rate = newAddForm.wechatH5Rate ? utils.accMul(newAddForm.wechatH5Rate, 0.01) : newAddForm.wechatH5Rate;
        newAddForm.alipayH5Rate = newAddForm.alipayH5Rate ? utils.accMul(newAddForm.alipayH5Rate, 0.01) : newAddForm.alipayH5Rate;
        // newAddForm.comCustomerNo = this.comCustomerNoFn();
        if (this.formType == 'ADD') {
          // 'comCustomerNo',
          console.log(newAddForm);
          let secretData = secret.Encrypt({
            comCustomerNo: this.addForm.comCustomerNo,
            customerFrom: 'LOCAL',
            linkMan: this.addForm.contactName,
            phoneNo: this.addForm.contactMobile,
            ...newAddForm
          }, encryptKey)// 加密数据块
          let sendData = utils.pickObj(this.addForm, [
            'version', 'companyNo'
          ]);
          getMctManageOrdersAdd()({
            encryptData: secretData,
            key: this.signKey,
            service: "customer.register",
            ...sendData
          }).then((res) => {
            if (res.code == "00") {
              this.$message({
                message: "恭喜你，新增数据成功",
                type: "success",
                center: true
              });
              this.$emit("addSuccess");
            } else {
              this.$message({
                message: res.msg,
                type: "warning",
                center: true
              });
            }
          })
        }
        if (this.formType == 'EDIT') {
          let secretData = secret.Encrypt({
            customerNo: this.addForm.comCustomerNo,
            ...newAddForm
          }, encryptKey)// 加密数据块
          let sendData = utils.pickObj(this.addForm, [
            'version', 'companyNo'
          ]);
          getMctManageOrdersAdd()({
            encryptData: secretData,
            key: this.signKey,
            service: "customer.modify",
            ...sendData
          }).then((res) => {
            if (res.code == "00") {
              this.$message({
                message: "恭喜你，修改数据保存成功",
                type: "success",
                center: true
              });
              this.$emit("addSuccess");
            } else {
              this.$message({
                message: res.msg,
                type: "warning",
                center: true
              });
            }
          })
        }
      } else {
        this.$message({
          message: "未找到该服务商的加密key",
          type: "warning",
          center: true
        });
      }

    },
    // 费率搜索
    querySearch(queryString, cb) {
      var restaurants = this.settleModeOption;
      restaurants = restaurants.map((item) => {
        return {
          value: utils.accMul(item.code, 100) + ""
          // address: item.code
        }
      })
      cb(restaurants);
    },
    clearValidate() {
      this.$nextTick(() => {
        this.$refs['addForm'].clearValidate();
      })
    },
    getEncryptKey(agentNo) {
      // 得到加密key
      return new Promise(function (resolve, reject) {
        getOnlineFacilitatorOrders()({
          agentName: "",
          endTime: "",
          limit: 1,
          page: 1,
          startTime: "",
          status: "",
          agentNo: agentNo
        }).then((res) => {
          if (res.code == "00") {
            if (res.data.length > 0) {
              resolve({
                encryptKey: res.data[0].encryptKey,
                signKey: res.data[0].signKey,
              })
            }
          } else {
            this.$message({
              message: res.msg,
              type: "warning",
              center: true
            });
            reject('error');
          }
        })
      }).catch(() => {
        console.log("UserMenulistFetch--UnhandledPromiseRejectionWarning")
      });
    },
    // 获取加密key
    companyNoBlur() {
      let companyNo = this.addForm.companyNo;
      this.getEncryptKey(companyNo).then((res) => {
        this.encryptKey = res.encryptKey;
        this.signKey = res.signKey;
      }).catch((error) => {
        console.log(error)
      });
    },
    // 商户全称失去焦点
    enterpriseNameBlur() {
      let enterpriseName = this.addForm.enterpriseName;
      if (!this.addForm.bussinessName) {
        this.addForm.bussinessName = enterpriseName
      }
      this.relationship();
    },
    enterpriseNameChange() {
      this.relationship();
    },
    // 法人名称修改
    legalPersonBlur() {
      this.relationship();
    },
    legalPersonChange() {
      this.relationship();
    },
    accountNameChange() {
      this.relationship();
    },

    addDialog() {
      this.customerNoDisabled = false;
      this.addFormVisible = true;
      this.clearValidate();
    },
    bankhandleChangeArea(value) {
      //选择开户行地区
      this.bankCity = value[2] || value[1] || value[0];
      this.getBankListHandle();
    },
    banksChange(value) {
      // 选择所属银行
      this.bankAreaVisible = true;
      this.branchNameVisible = false;
      this.bankCode = value;
      this.getBankListHandle();
    },
    getBankListHandle() {
      this.addForm.unionCode = "";
      // 获取支行
      if (this.bankCode && this.bankCity) {
        // 获取支行列表数据
        getBankList()({
          bankCode: this.bankCode,
          cityId: this.bankCity
        }).then(data => {
          if (data.code == "00") {
            this.branchBankOptions = data.data;
          }
        });
      }
    },
    comCustomerNoFn() {
      let nowdate = new Date();
      let year = nowdate.getFullYear() + "";
      year = year.substr(2, 2);
      let mouth = nowdate.getMonth() + 1;
      mouth = mouth >= 10 ? mouth : "0" + mouth;
      let day = nowdate.getDate();
      day = day >= 10 ? day : "0" + day;
      let hour = nowdate.getHours();
      hour = hour >= 10 ? hour : "0" + hour;
      let minute = nowdate.getMinutes();
      minute = minute >= 10 ? minute : "0" + minute;
      let second = nowdate.getSeconds();
      second = second >= 10 ? second : "0" + second;
      return year + mouth + day + hour + minute + second;
    },
    //持卡人证件号显示隐藏
    checkIn() {
      if (this.dialogLoading) {
        this.dialogLoading.close();
      }
      this.$refs['addForm'].resetFields();
      this.addForm = Object.assign(this.addForm, {
        version: "1.0.0",
        customerType: "1",
        settleMode: "T1",
        accountType: "0"
      })
      this.$nextTick(() => {
        let arr = [
          "bussinessLicenseImg",//商户营业执照照片
          "accountLicenseImg",//开户许可证照片
          "identityFrontImg",//法人身份证人像面
          "identityBackImg",//法人身份证国徽面
          "identityHolderImg",//法人手持身份证合影照片
          "storeImg",//店内照片
          "placeImg",//门头照片
          "cashSpaceImg",//收银台照片
          "settleCardImg",//结算卡照片
          "certificateImg",//授权照片
          "holdCertificateImg",//法人手持授权照片
          "cardHolderFrontImg",//持卡人身份证人像面照片
          "cardHolderBackImg",//持卡人身份证国徽面照片
          "cardHolderIdImg",//持卡人手持身份证合影照片
          "othersImg"//其他照片
        ]
        arr.forEach((item) => {
          if (this.$refs[item]) {
            this.$refs[item].clearImg();
          }
        })
      })
      if (this.formType == 'ADD') {
        this.companyNoDisabled = false;
        // 版本号
        let mctManageOrdersVersion = localStorage.getItem("mctManageOrdersVersion");
        if (localStorage.getItem("mctManageOrdersVersion")) {
          this.addForm.version = mctManageOrdersVersion
        }
        this.addForm.comCustomerNo = this.comCustomerNoFn();
        this.clearValidate();
      }
      if (this.formType == 'EDIT') {
        this.companyNoDisabled = true;
        this.dialogLoading = this.$loading({
          target: document
            .querySelector("#dialogLoding")
            .querySelector(".el-dialog")
        });
        // 编辑
        this.$nextTick(() => {
          let data = this.rowData;
          let agentNo = data.agentNo;// 服务商编号为加密key
          this.getEncryptKey(agentNo).then((res) => {
            let encryptKey = res.encryptKey;
            let signKey = res.signKey;
            this.encryptKey = encryptKey;
            this.signKey = signKey;
            let queryEncryptData = secret.Encrypt({ // 加密数据块
              customerNo: data.customerNo,
            }, encryptKey);
            //查询基本信息文字
            getMctManageOrdersAdd()({
              key: signKey,
              version: this.addForm.version,
              service: 'customer.query',
              companyNo: agentNo,
              encryptData: queryEncryptData
            }).then((res) => {
              if (res.code == "00" && res.encryptData) {
                let encryptData = res.encryptData;
                let getData = secret.Decrypt(encryptData, encryptKey);
                getData = JSON.parse(getData);
                // 图片start
                this.senImgAllHandle(agentNo, getData);

                // 图片end
                getData.wechatScansRate = utils.accMul(getData.wechatScansRate, 100) + "";
                getData.alipayScansRate = utils.accMul(getData.alipayScansRate, 100) + "";
                getData.wechatAppRate = utils.accMul(getData.wechatAppRate, 100) + "";
                getData.alipayAppRate = utils.accMul(getData.alipayAppRate, 100) + "";
                getData.wechatH5Rate = utils.accMul(getData.wechatH5Rate, 100) + "";
                getData.alipayH5Rate = utils.accMul(getData.alipayH5Rate, 100) + "";
                let newObj = Object.assign(this.addForm, {
                  companyNo: getData.agentNo,
                  comCustomerNo: getData.customerNo,
                  customerNo: getData.customerNo, // 系统返回商户编号
                  myarea: areaOrgcode(getData.orgCode),// 地区编码转地区
                }, getData)
                this.addForm = newObj;
                // this.$set(this.$data, 'addForm', newObj)
                this.clearValidate();
              }
              this.dialogLoading.close();
            })
          }).catch((error) => {
            console.log(error)
            this.dialogLoading.close();
          });
        })
      }
      this.relationship();
    },
    //关系
    relationship() {
      this.enterprise = false;//企业
      this.personal = false;//个人
      this.company = false;// 对公
      this.privateperson = false;// 对私
      this.corporatePerson = false;// 法人
      this.unCorporatePerson = false;//非法人
      let addForm = this.addForm;
      let accountType = addForm.accountType; //结算类型
      let customerType = addForm.customerType; //商户类型
      let accountName = "";// 账户名称
      if (customerType == 0) {
        // 个人 只能对私 并且结算人身份证等于法人身份证
        this.personal = true;
        this.addForm.settleIdCard = this.addForm.idCard;
        accountName = addForm.enterpriseName;
        this.accountNameDis = false;
      }
      if (customerType == 1) {
        // 企业
        this.enterprise = true;
        if (accountType == 0) {
          // 对公
          this.company = true;
          this.accountNameDis = true;
          accountName = addForm.enterpriseName;
        }
        if (accountType == 1) {
          // 对私
          this.privateperson = true;
          this.addForm.settleIdCard = this.addForm.idCard;//设置结算人证件号码
          accountName = addForm.accountName == addForm.enterpriseName ? addForm.legalPerson : addForm.accountName || addForm.legalPerson;
          this.accountNameDis = false;
        }
      }
      this.addForm.accountName = accountName; //设置用户名
      //判断是是否为法人
      if (this.addForm.accountName == this.addForm.legalPerson) {
        // 法人
        this.corporatePerson = true;
      } else {
        // 非法人
        this.unCorporatePerson = true;
      }
    },
    //选择个人
    customerTypeSelect(val) {
      if (val == '0') {
        this.$set(this.addForm, "accountType", "1")
      }
      if (val == "1") {
        this.$set(this.addForm, "accountType", "0")
      }
    }
  },
  computed: {

    // 上传图片所需start
    ...mapState({
      saveImgIdList: state => state.mctManageOrders_Pc.imgKeys, // 储存后台需要的图片id
      imgUrlList: state => state.mctManageOrders_Pc.imgKeys, // 后台返回的图片路径用于显示到页面
    }),
    //商户名称label
    enterpriseNameHolder() {
      if (this.enterprise) {
        return "请填写营业与执照上一致的名称"
      } else {
        return "请填写申请人姓名"
      }
    },
    bussinessNameHolder() {
      if (this.enterprise) {
        return "请填写商户简称"
      } else {
        return "请填写申请人姓名/简称"
      }
    },
    allImgData() { // 上传图片时候需要附带的参数
      return {
        // businessNo: this.rowData.bussinessNo,
        // businessType: "customer",
        // imgString: ""
      }
    },
    imgUploadAction() {
      return `${this.oaIp}'/bussinessImg/upload'`
    },
    // 上传图片所需end

    accountTypeOptions() {
      return this.statusFilterQuery('accountType')
    },
    idTypeOptions() {
      return this.statusFilterQuery('idType')
    },
    customerTypeOptions() {
      return this.statusFilterQuery('mctManageType')
    },
    mctManageSettleModeOptions() {
      return this.statusFilterQuery('mctManageSettleMode')
    },
    isBankAreaRule() {
      if (this.addForm.branchName == "") {
        return "bankArea"
      } else {
        return ""
      }
    }

  },
  mounted() { },
  watch: {
    'myarea'(val) {
      this.addForm.orgCode = val[2]
    },
    detailsFormVisible(val) {
      this.saveLoadingStop(val);
    },
    editFormVisible(val) {
      this.saveLoadingStop(val);
    },
    //商户类型选择
    "addForm.version"(val) {
      if (val) {
        localStorage.setItem("mctManageOrdersVersion", val);
      }
    },
    "addForm.customerType"() {
      this.relationship();
      this.clearValidate();
    },
    //账户类型
    "addForm.accountType"() {
      this.relationship();
    }
  },
  created() {
    // this.saveImgId();
  }
};
</script>
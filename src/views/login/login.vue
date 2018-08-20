<template>
  <div class="login-page">
    <div class="progressive-box" v-for="(item,index) in imgs" :key="index">
      <div class="space"></div>
      <div class="progressive">
        <img class="preview" v-progressive="item.src" :data-srcset="item.srcset" :src="item.preview" />
      </div>
    </div>
    <div class="login-main">
      <div class="content-box">
        <header class="header">
          <div class="logo-box">
            <img :src="require(company.id=='zf'?'@src/assets/zfimgs/logo.png':'@src/assets/images/logo.png')" alt="">
            <!-- <img src="../../assets/images/logo.png" alt=""> -->
          </div>
          <div class="slogen-box">
            {{company.name}}
            <!-- <img src="../../assets/images/Slogen.png" alt=""> -->
          </div>
        </header>
        <!-- form start -->
        <div class="login-form">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="top" label-width="100px" class="demo-ruleForm form-r">
            <el-form-item prop="username">
              <el-input class="input-reset" v-model="ruleForm.username" prefix-icon placeholder="请输入账号/手机号"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input class="input-reset" v-model="ruleForm.password" placeholder="请输入密码" type="password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="submitForm('ruleForm')" :loading="loading" size="medium" type="danger" class="login-button">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!-- form end -->
      </div>
    </div>
    <el-footer class="login-footer">
      <p> {{company.copyright}}</p>
    </el-footer>
  </div>

</template>
<script>
// import $ from "@src/common/jquery.min.js";
//websocket 监听

import $ from "jquery";
import { Login } from "@src/apis";
var backImgUrl = "@src/assets/images/LoginBackSmall.png"
export default {
  name: "Login",
  data() {
    return {
      backImg: backImgUrl,
      imgs: [
        {
          src: require('@src/assets/images/LoginBack.png'),
          preview: require('@src/assets/images/LoginBackSmall.png')
        }
      ],
      loading: false,
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入账号/手机号", trigger: "blur,change" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur,change" }
        ],
        password: [
          { required: true, message: "请输入有效密码", trigger: "change" }
        ]
      }
    };
  },
  mounted() {
    document.onkeydown = event => {
      var e = event || window.event || arguments.callee.caller.arguments[0];
      if (e && e.keyCode == 13) {
        this.submitForm("ruleForm");
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var data_ = this.ruleForm;
          this.loading = true;
          Login()({
            username: data_.username,
            password: data_.password
          }).then(data => {
            this.loading = false;
            if (data.code == "98") {
              this.$message({
                type: "warning",
                message: data.msg
              });
            } else if (data.code == "00") {
              // 登录成功
              localStorage.setItem("isLogin", "100");
              location.reload();
            } else {
              // console.log(data);
              this.$message.error(data.msg);
            }
          });
        } else {
          this.$message.error("登录出错");
          return false;
        }
      });
    },
    enterHandle() {
      this.$nextTick(() => {
        $(".login-button").click();
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  computed: {
    company() {
      return this.$store.state.company.company;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "https://unpkg.com/progressive-image@1.2.0/dist/index.css";
</style>
<style lang='scss'>
$default-color: rgb(12, 11, 11); // 字体颜色
$center-width: 280px; // 表单宽度
@font-face {
  font-family: slogenFont;
  src: url("../../assets/fonts/lingzhao.ttf"),
    url("../../assets/fonts/lingzhao.eot"),
    url("../../assets/fonts/lingzhao.otf");
}
.login-page {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background: url(../../assets/images/LoginBack.png) no-repeat center;
  background-size: cover;
  color: $default-color;
  display: flex;
  flex: 1;
  box-sizing: border-box;
  flex-direction: column;
  .login-main {
    padding: 0px;
    position: relative;
    flex: 1;
    overflow: auto;
    box-sizing: border-box;
    padding: 20px;
  }
  .header {
    margin-top: 120px;
  }
  .logo-box {
    text-align: center;
    img {
      height: 80px;
      width: 80px;
    }
  }
  .slogen-box {
    margin-top: 20px;
    text-align: center;
    font-size: 40px;
    font-family: slogenFont;
    color: #333333;
    letter-spacing: 2px;
    -moz-user-select: none;
    -khtml-user-select: none;
    user-select: none;
    img {
      width: 220px;
    }
  }
  .form-r {
    width: $center-width;
    margin: 0 auto;
  }
  .login-footer {
    z-index: 10;
    text-align: center;
    p {
      text-align: center;
      font-size: 16px;
      margin-top: 0;
      margin-bottom: 30px;
    }
  }
  .login-button {
    width: 100%;
    margin-top: 15px;
    height: 40px;
    font-size: 18px;
    border-radius: 20px;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: transparent;
    background: #e60012;
  }

  .login-form {
    margin-top: 60px;
    form {
      .el-form-item {
        margin-top: 0px;
      }
    }
  }
  .login-intro {
    text-align: center;
    padding: 10px 0;
  }
  .input-reset {
    border-bottom: 1px solid $default-color;
    input {
      background: transparent;
      outline: none;
      border: 0px;
      color: $default-color;
      padding: 0;
      font-size: 18px;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      &:focus,
      &:hover {
        background: none;
      }
      &::-webkit-input-placeholder {
        /* WebKit browsers */
        font-size: 18px;
        color: $default-color;
      }
      &:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        font-size: 18px;
      }
      &::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        font-size: 18px;
      }
      &:-ms-input-placeholder {
        /* Internet Explorer 10+ */
        font-size: 18px;
      }
    }
  }
}
// 移动端样式
// @media screen and (max-width: 1024px) {
//   .login-page {
//     .content-box {
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       width: 100%;
//       height: 100%;
//       flex-direction: column;
//       overflow: hidden;
//     }
//     .header {
//       width: 100%;
//       margin-top: 0px;
//       text-align: center;
//     }
//     .login-form {
//       align-items: center;
//       margin-top: 112px;
//       .form-r {
//         max-width: auto;
//       }
//     }

//     .slogen-box {
//       text-align: center;
//       img {
//         width: 190px;
//       }
//     }
//   }
// }

/*渐进式背景start*/
.progressive-box {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: block;
  overflow: hidden;
  height: 100%;
  .progressive {
    height: 100%;
    width: 100%;
    img {
      display: block;
      max-width: 100%;
      min-height: 100%;
      border: 0none;
    }
  }
}
</style>

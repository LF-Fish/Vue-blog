<template>
  <div id="log">
    <div class="block" v-if="$store.state.isSignIn == 0">
      <h4>信息填写</h4>
      <!-- 登录表单 -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        label-position="right"
      >
        <el-form-item label="用户名" prop="id">
          <el-input
            prefix-icon="el-icon-user-solid"
            v-model.number="ruleForm.name"
          ></el-input>
        </el-form-item>
          <el-form-item label="昵称" prop="id" v-if="status == 2">
          <el-input
            prefix-icon="el-icon-user-solid"
            v-model.number="ruleForm.nickname"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass" v-if="status == 2">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>

        <el-form-item style="margin-right: 100px; margin-top: 50px">
          <el-button type="primary" @click="submitForm()" v-if="status == 1"
            >登录</el-button
          >
          <el-button type="primary" @click="register()" v-if="status == 2"
            >注册</el-button
          >
          <el-button @click="resetForm('form')" v-if="status == 1"
            >重置</el-button
          >
          <el-button @click="resetForm('ruleForm')" v-if="status == 2"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
      <span class="tip" v-if="status == 1"
        >没有注册？去<span class="sign" @click="toSign">注册</span></span
      >
      <span class="tip" v-if="status == 2"
        >已有账号？去<span class="sign" @click="toLogin">登录</span></span
      >
    </div>

    <div class="isSignIn" v-if="$store.state.isSignIn == 1">
      <span>{{$store.state.userName}}你好，你已登录，快去评论互动吧！</span>
    </div>
  </div>
</template>

<script>
import Cookie from "js-cookie";
export default {
  data() {
    // var checkId = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error("用户名不能为空"));
    //   }
    // };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      status: 1,
      form: {
        name: "",
        password: "",
      },
      ruleForm: {
        name: "",
        nickname:"",
        password: "",
        checkPass: "",
      },
      // 注册
      reRules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        // id: [{ validator: checkId, trigger: "blur" }],
      },
      // 登录
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        // id: [{ validator: checkId, trigger: "blur" }],
      },
    };
  },
  methods: {
    // 跳转到注册
    toSign() {
      this.status = 2;
    },
    // 跳转到登录
    toLogin() {
      this.status = 1;
    },
    submitForm() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          let data = {
            name: this.ruleForm.name,
            password: this.ruleForm.password,
          };
          let res = await this.$http.post("/api/users/login", data);
          console.log(res);
          if (res.data.code == -1) {
            this.open2();
          } else {
            // 保存用户名
            this.$store.commit('setUserName',this.ruleForm.nickname)
            console.log(this.ruleForm.name)
            // 修改vuex的登录状态
            this.$store.commit("changIsSignIn", 1);
            // 设置cookie
            Cookie.set("token", res.data.token);
            Cookie.set("username",this.ruleForm.nickname)
            // 修改vuex的token
            this.$store.commit("setToken", res.data.token);
            console.log(this.$store.state.token);
            

            this.$message({
              message: "登录成功，将跳转首页",
              type: "success",
            });
            setTimeout(()=>{
              this.$router.push({ name: "Index" });
            },3000)
          }
        } else {
          this.open1();
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 提交注册
    register() {
      let data = {
        username: this.ruleForm.name,
        password: this.ruleForm.password,
        nickname:this.ruleForm.nickname
      };
      this.$http.post("/api/users/register", data).then((res) => {
        if (res.data.code == -1) {
          this.$message({
            message: "用户名或昵称已存在，请重新注册",
            type: "warning",
          });
        } else {
          this.$message({
            message: "注册成功",
            type: "success",
          });
          this.status = 1;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    open1() {
      this.$notify({
        title: "警告",
        message: "用户名或密码错误",
        type: "warning",
      });
    },
    open2() {
      this.$notify({
        title: "警告",
        message: "该账号不存在",
        type: "warning",
      });
    },
  },
};
</script>

<style lang="less">
#log {
  margin: auto;

  .block {
    background-color: white;
    width: 500px;
    margin: 50px;
    padding: 30px;
    border: 1px solid #dbdcdf;
    border-radius: 10px;
    text-align: center;
    .el-form {
      width: 350px;
      margin: auto;
      .el-form-item {
        .el-button--primary {
          background-color: #f8baba;
          border-color: #f8baba;
        }
      }
    }
    .tip {
      color: #707070;
      font-size: 14px;
      span {
        color: #409eff;
      }
    }
  }
  .isSignIn{
    margin-top: 30px;
    height: 100px;
    width: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.7);
    span{
      color: #707070;
      font-size: 24px;
    }
  }
  .isSignIn ::before{
    content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      filter: blur(20px);
      z-index: -1;
      margin: -30px;
  }
}
</style>
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
      <span
        class="tip"
        style="color: #409eff; padding-left: 20px"
        v-if="status == 1"
        @click="toAdmin"
        >管理员登录</span
      >
      <span class="tip" v-if="status == 2"
        >已有账号？去<span class="sign" @click="toLogin">登录</span></span
      >
    </div>

    <div class="isSignIn" v-if="$store.state.isSignIn == 1">
      <div class="avator">
        <el-upload
          class="avatar-uploader"
          action="http://112.124.52.188:3000/api/article/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          name="head_img"
        >
          <img :src="imageUrl" class="avatar" />
        </el-upload>
        <!-- <el-image :src="imageUrl"></el-image> -->
      </div>
      <p>{{ this.nickname }}</p>
      <p>你好,你已登录快去评论吧~</p>
      <el-button type="danger" plain @click="update" style="margin-bottom:20px">保存</el-button>
      <el-button type="danger" plain @click="exit">退出登录</el-button>
    </div>
  </div>
</template>

<script>
import Cookie from "js-cookie";
export default {
  filters: {
    name(str) {
      if (str) return str.substring(0, 1);
      else return "";
    },
  },
  data() {
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
      imageUrl: "",
      nickname: "",
      status: 1,
      ruleForm: {
        name: "",
        nickname: "",
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
     // 封面上传相关方法
    handleAvatarSuccess(res) {
      this.imageUrl = res.data;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 跳转到注册
    toSign() {
      this.status = 2;
    },
    // 跳转到登录
    toLogin() {
      this.status = 1;
    },
    // 跳转到管理员登录页面
    toAdmin() {
      this.$router.push({ name: "adminlogin" });
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
            // 修改vuex的登录状态
            this.$store.commit("changIsSignIn", 1);
            // 设置cookie
            Cookie.set("token", res.data.token);
            Cookie.set("username",this.ruleForm.name );
            // 修改vuex的token
            this.$store.commit("setToken", res.data.token);
            console.log(this.$store.state.token);
            this.GetInfo()

            this.$message({
              message: "登录成功，将跳转首页",
              type: "success",
            });
            setTimeout(() => {
              this.$router.push({ name: "Index" });
            }, 3000);
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
        nickname: this.ruleForm.nickname,
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
    exit() {
      // 清除Cookie
      Cookie.set("token", "");
       Cookie.set("username", "");
      // 清除sessionStorage
      sessionStorage.clear();
      this.$router.push({ path: "/" });
      location.reload();
    },
    GetInfo() {
      this.$http.get("/api/users/info").then((res) => {
        //  获取用户头像地址
        console.log(res);
        this.nickname = res.data.data.nickname;
        this.imageUrl = res.data.data.head_img;
      });
    },
    async update(){
      await this.$http.post('/api/users/updateUser',{
          nickname:this.nickname,
          head_img:this.imageUrl
        })
        // 刷新页面
        location.reload();
      }
  },
  created() {
    if (this.$store.state.isSignIn == 1) this.GetInfo();
  },
};
</script>

<style lang="less">
#log {
  margin: auto;
  margin-bottom: 30px;
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
  .isSignIn {
    padding: 30px;
    margin: 30px auto;
    // height: 100px;
    width: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: rgba(255, 255, 255, 0.7);
    .avatar {
      width: 100px;
      height: 100px;
      line-height: 40px;
      // margin-right: 15px;
      border-radius: 100%;
    }
    p {
      color: #707070;
      text-align: center;
      font-size: 16px;
      // padding-bottom: 20px;
    }
  }
  .isSignIn ::before {
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
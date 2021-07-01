<template>
  <div class="adminLogin">
    
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      label-position="right"
    >
    <h4>管理员登录</h4>
      <el-form-item label="用户名" prop="id">
        <el-input
          prefix-icon="el-icon-user-solid"
          v-model.number="ruleForm.name"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
          prefix-icon="el-icon-lock"
        ></el-input>
      </el-form-item>
      <el-form-item style="margin-right: 100px; margin-top: 50px">
        <el-button type="danger" plain @click="login()"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "adminlogin",
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
    return {
      isTransform: false,
      user: "",
      pass: "",
      ruleForm: {
        name: "",
        password: "",
      },
      // 登录
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        // id: [{ validator: checkId, trigger: "blur" }],
      },
    };
  },
  methods: {
   login(){
     if(this.ruleForm.name =="123" && this.ruleForm.password=="123"){
      //  this.$router.replace("/admin/article");
       this.$router.push({ name: "admin" })
     }
   }
  },
};
</script>

<style lang="less">
.adminLogin {
  height: 300px;
  width: 500px;
  margin: 30px auto;
  background-color: #fff;
  padding: 20px;
  .el-form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
}
</style>
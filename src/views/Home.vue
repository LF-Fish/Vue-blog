<template>
  <div id="app">
    <!-- 封面 -->
    <div class="banner">
      <!-- 头像 -->
      <div class="headImg">
        <el-image :src="require('@/assets/default.jpg')"></el-image>
        <p>用户名称</p>
        <div class="info">
          <span>文章 2</span>
          <span>标签 3</span>
        </div>
      </div>
    </div>
    <!-- 导航栏 -->
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      active-text-color="rgb(219, 165, 183)"
      router
    >
      <el-image
        style="width: 30px; height: 30px"
        :src="require('@/assets/nav.png')"
      ></el-image>
      <el-menu-item index="/">学习心得</el-menu-item>
      <el-menu-item index="/log">登录/注册</el-menu-item>
      <el-menu-item index="/about">关于我</el-menu-item>
      <el-menu-item
        ><a href="https://github.com/LF-Fish" target="_blank"
          >GitHub</a
        ></el-menu-item
      >
    </el-menu>

    <el-container>
      <router-view></router-view>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headImg: "../assets/headImg.JPG",
      activeIndex: "/",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    changeIndex() {
      console.log("执行");
      this.activeIndex = "/";
    },
  },
};
</script>

<style lang="less">
#app {
  .banner {
    background-color: white;
    display: flex;
    justify-content: center;
    margin: auto;
    height: 550px;
    width: 65%;
    // overflow: hidden;
    background: url(../assets/headImg.png) 50% / cover no-repeat;
    .headImg {
      .el-image__inner {
        margin-top: 100px;
        width: 120px;
        height: 120px;
        border-radius: 100%;
      }
      p {
        text-align: center;
        font-size: 26px;
        font-weight: 500;
        margin: 5px 0;
        color: #eee;
      }
      .info {
        display: flex;
        justify-content: center;
        color: #eee;
        span {
          padding-left: 10px;
        }
      }
    }
  }
  .el-menu-demo {
    width: 80%;
    margin: auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-top: solid 1px #e6e6e6;
    a {
        text-decoration: none;
      }
  }

  .el-menu-item.is-active {
    border-bottom: 2px solid rgb(219, 165, 183);
    border-top: 2px solid rgb(219, 165, 183);
    font-weight: 600;
  }
}
.el-container {
  padding: 0 110px;
  margin: 0 10px;
}
</style>
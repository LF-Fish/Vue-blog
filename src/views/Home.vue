<template>
  <div>
    <!-- 封面 -->
    <div class="header">
      <div class="banner">
        <!-- 头像 -->
        <div class="headImg wow fadeInUp">
          <el-avatar
            :src="require('@/assets/avatar.jpg')"
            fit="fill"
            shape="circle"
          ></el-avatar>
          <p>罗废鱼</p>
        </div>
      </div>
      <!-- 导航栏 -->
      <el-menu
        :default-active="$route.path"
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
        <el-menu-item index="/">归档</el-menu-item>
        <el-menu-item index="/book">书单</el-menu-item>
        <el-menu-item index="/about">关于我</el-menu-item>
        <el-menu-item index
          ><a href="https://github.com/LF-Fish" target="_blank"
            >GitHub</a
          ></el-menu-item
        >
        <el-menu-item index="/log">登录/注册</el-menu-item>
        <el-menu-item index="/article" v-if="username == '123'"
          >管理员</el-menu-item
        >
      </el-menu>
    </div>

    <el-container>
      <!-- <transition
      mode="out-in"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    > -->
      <router-view></router-view>
      <!-- </transition> -->
    </el-container>
  </div>
</template>

<script>
import Cookie from "js-cookie";
export default {
  data() {
    return {
      headImg: "../assets/headImg.JPG",
      activeIndex: "/",
      username: Cookie.get("username"),
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    mounted() {
      let wow = new WOW.WOW({
        boxClass: "wow",
        animateClass: "animated",
        offset: 0,
        mobile: true,
        live: false,
      });
      wow.init();
      this.$router.push({
        path: "/",
      });
    },
  },
};
</script>

<style lang="less">
#app {
  .animate__animated {
    animation-duration: 0.5s;
  }
  .header {
    width: 1200px;
    margin: auto;
    .banner {
      border-radius: 10px;
      background-color: white;
      display: flex;
      justify-content: center;
      margin: auto;
      height: 580px;
      width: 100%;
      // overflow: hidden;
      background: url(../assets/headImg.png) 50% / cover no-repeat;
      .headImg {
        width: 120px;

        .el-avatar {
          margin-top: 100px;
          width: 120px;
          height: 120px;
        }
        p {
          text-align: center;
          font-size: 32px;
          font-weight: 500;
          margin: 5px 0;
          color: #eee;
        }
        .info {
          display: flex;
          justify-content: center;
          color: #eee;
          span {
            padding-right: 5px;
            text-align: center;
          }
        }
      }
    }
    .el-menu-demo {
      padding-right: 0;
      border-radius: 8px;
      width: 100%;
      margin: auto;
      display: flex;
      justify-content: space-around;
      align-items: center;
      border-top: solid 1px #e6e6e6;
      a {
        text-decoration: none;
      }
      .el-menu-item {
        font-size: 16px;
      }
    }

    .el-menu-item.is-active {
      border-bottom: 2px solid rgb(219, 165, 183);
      border-top: 2px solid rgb(219, 165, 183);
      font-weight: 600;
    }
  }
}
.el-container {
  // padding: 0 110px;
  // margin: 0 10px;
  width: 1000px;
  margin: auto;
}
</style>
<template>
  <div>
    <!-- 导航栏 -->
    <el-menu
      id="header"
      :default-active="$route.path"
      class="header-container"
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
    <!-- 封面 -->
    <div class="header">
      <div class="banner wow zoomIn">
        <!-- 头像 -->
        <div class="headImg wow fadeInUp">
          <span>🐠</span>
          <p>罗非鱼海鲜批发市场</p>
        </div>
      </div>
    </div>

    <el-container>
      <router-view></router-view>
      <footer></footer>
    </el-container>
  </div>
</template>

<script>

import WOW from "wowjs";
import Cookie from "js-cookie";
export default {
  
  data() {
    return {
      activeIndex: "/",
      username: Cookie.get("username"),
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(keyPath);
    },
    handleScroll() {
      // 获取当前滚动高度
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      const headerDom = document.getElementById("header");
      // 导航高度
      // let navHeight = headerDom.offsetHeight
      // console.log(navHeight)

      // 当滚动高度大于版头高度时隐藏
      if (scrollTop >= 520) {
        if (!headerDom.getAttribute("class").includes("not-top")) {
          headerDom.className = "header-container not-top"; // 添加类名 css里设置动画
        }
      } else {
        headerDom.className = "header-container";
      }
    },
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
    window.addEventListener("scroll", this.handleScroll, true);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style lang="less">
#app {
   .header-container{
    width: 100%;
    margin: auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 12;
    backdrop-filter: blur(4px);
    background-color: rgba(0, 0, 0, 0.2);
    transition: all 0.7s ease;
    border-bottom: solid 0 #e6e6e6;
    // padding:0 40px;
    &.not-top {
      transform: translate(0, -100%);
    }
    a {
      text-decoration: none;
      color: #e6e6e6;
    }
    .el-menu-item {
      font-size: 16px;
      color: #e6e6e6;
      font-weight: 600;
      &:hover {
        background-color: rgba(231, 230, 230, 0.1);
        color: rgb(219, 165, 183);
      }
    }
  }

  .el-menu-item.is-active {
    border-bottom: 2px solid rgb(219, 165, 183);
    border-top: 2px solid rgb(219, 165, 183);
    font-weight: 600;
    background-color: rgba(231, 230, 230, 0.1);
  }

  .header {
    width: 1200px;
    margin: auto;
    .banner {
      // border-radius: 10px;
      background-color: white;
      display: flex;
      justify-content: center;
      margin: auto;
      height: 580px;
      width: 100%;
      background: url("../assets/headImg.png") 50% / cover no-repeat;
      .headImg {
        // width: 120px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        span {
          font-size: 64px;
        }

        p {
          text-align: center;
          font-size: 32px;
          font-weight: 500;
          margin: 5px 0;
          color: #eee;
        }
      }
    }
  }
}
.el-container {
  width: 1000px;
  margin: auto;
}
</style>
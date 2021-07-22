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
    <!-- 音乐播放器 -->
    <record></record>
    <!-- 封面 -->
    <banner v-if="$route.path != '/about'"></banner>
    <el-container>
      <router-view></router-view>
    </el-container>
    <Footer></Footer>
  </div>
</template>

<script>
import WOW from "wowjs";
import Footer from "../components/footer.vue";
import banner from "../components/banner.vue";
import record from "../components/record.vue";
import Cookie from "js-cookie";
export default {
  components: {
    Footer,
    banner,
    record
  },
  data() {
    return {
      activeIndex: "/",
      username: Cookie.get("username"),
      oldScrollTop: 0,
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
      let scrollStep = scrollTop - this.oldScrollTop;
      // 更新——滚动前，滚动条距文档顶部的距离
      this.oldScrollTop = scrollTop;

      // 向下滚动隐藏导航栏
      if (scrollStep > 0) {
        if (!headerDom.getAttribute("class").includes("not-top")) {
          headerDom.className = "header-container not-top"; // 添加类名 css里设置动画
        }
      } else {
        headerDom.className = "header-container";
      }
    },
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll, false);
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
    window.addEventListener("scroll", this.handleScroll, false);
  },
};
</script>

<style lang="less">
#app {
  .header-container {
    width: 100%;
    margin: auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1999;
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
}
.el-container {
  width: 1000px;
  margin: auto;
}
</style>
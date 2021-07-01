<template>
  <div class="main">
    <div class="left">
      <!-- 文章内容 -->
      <article-contents
        id="article"
        :data="data"
        :v-loading="loading"
      ></article-contents>
      <!-- 评论区 -->
      <comment :articleId="id" id="comment"></comment>
      <!-- 左边 点赞、评论 -->
      <div class="suspended">
        <div class="suspendedItem" @click="addLike">
          <div class="icon el-icon-thumb"></div>
          <el-badge class="mark" :value="likeCount" />
        </div>
        <div class="suspendedItem" @click="toComment">
          <div class="icon el-icon-chat-line-round"></div>
        </div>
      </div>
      <el-backtop></el-backtop>
    </div>
    <!-- <div class="right">
      <div class="navi-floder">
        <div class="navi-floder-title">文章目录</div>
        <div class="catalog">
          <side-catalog class="catalog" v-bind="catalogProps"></side-catalog>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import articleContents from "../components/articleContents.vue";
import comment from "../components/comment.vue";
import Cookie from "js-cookie";
import SideCatalog from "vue-side-catalog";
import "vue-side-catalog/lib/vue-side-catalog.css";

export default {
  components: {
    articleContents,
    comment,
    SideCatalog,
  },
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      id: this.$route.params.id,
      data: {},
      likeCount: 0,
      changeStyle: false,
      isClick: true,
      loading: true,
      catalog: [],
      catalogProps: {
        container: ".left",
      },
    };
  },
  created() {
    this.GetArticleDetail();
    // this.generate_catalog();
  },
  methods: {
    async GetArticleDetail() {
      let res = await this.$http.get("/api/article/detail", {
        params: { article_id: this.id },
      });
      console.log(res);
      this.data = res.data.data;
      this.likeCount = res.data.like_count;
    },
    addLike() {
      if (Cookie.get("token")) {
        if (this.isClick == false) {
          return;
        }
        this.$http
          .post("/api/article/like", {
            article_id: this.$route.params.id,
          })
          .then((res) => {
            console.log(res.data.data[0]);
            this.likeCount = res.data.data[0].like_count;
            this.isClick = false;
          });
      } else {
        this.$message({
          message: "请登录后进行操作,即将跳转到登录页面",
          type: "warning",
        });
        setTimeout(() => {
          this.$router.push({ name: "Log" });
        }, 3000);
      }
    },
    toComment() {
      document.querySelector("#comment").scrollIntoView(true);
    },
    // 生成目录
    generate_catalog() {
      // 保证渲染成功
      this.$nextTick(() => {
        // const article_content = this.$refs["article"];
        const article_content = document
          .querySelector(".article")
          .getElementsByTagName("a");
        console.log(article_content);
        // const nodes = ["H1", "H2", "H3"];
        // let titles = [];
        // var children = document.getElementsByClassName("catalog")  //获取子节点
        // article_content.forEach((e, index) => {
        //   children.appendchild(e)
        //   // if (nodes.includes(e.nodeName)) {
        //   //   const id = "_" + index;
        //   //   e.setAttribute("id", id);
        //   //   titles.push({
        //   //     id: id,
        //   //     title: e.innerHTML,
        //   //     level: Number(e.nodeName.substring(1, 2)),
        //   //     nodeName: e.nodeName,
        //   //   });
        //   // }

        // });
        this.catalog = article_content;
      });
    },
  },
};
</script>

<style lang="less">
.main {
  margin-top: 10px;
  margin-bottom: 20px;
  display: flex;
}
.left {
  background-color: #fff;
}
.right {
  margin-left: 30px;
  width: 270px;
  .el-tag {
    margin-right: 10px;
  }
}
.suspended {
  position: fixed;
  bottom: 30px;
  margin-left: -120px;
  .suspendedItem {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    border: 1px solid rgba(202, 202, 202, 0.842);
    transition: all 0.5s ease;
    cursor: pointer;
    width: 50px;
    height: 50px;
    margin-bottom: 10px;
    .icon {
      font-size: 30px;
      color: #999;
      transition: all 0.5s ease;
      .icon :hover {
        color: brown;
        // background-color: brown;
      }
    }

    .el-badge__content {
      position: absolute;
      background-color: brown;
      padding: 2px 5px 3px;
      top: -28px;
      right: -20px;
      transform: scale(0.75);
      transition: all 0.5s ease;
    }
    & :hover {
      color: brown;
    }
  }
}
</style>
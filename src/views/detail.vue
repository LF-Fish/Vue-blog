<template>
  <div>
    <div class="left">
      <!-- 文章内容 -->
      <article-contents :data="data" :v-loading="loading"></article-contents>
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
    <div class="right"></div>
  </div>
</template>

<script>
import articleContents from "../components/articleContents.vue";
import comment from "../components/comment.vue";
import Cookie from "js-cookie";
export default {
  components: {
    articleContents,
    comment,
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
    };
  },
  created() {
    this.GetArticleDetail();
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
  },
  // watch: {
  //   likeCount(val) {
  //     return this.data.like_count;
  //   },
  // },
};
</script>

<style lang="less">
.left {
  background-color: #fff;
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
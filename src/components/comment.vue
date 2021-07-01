<template>
  <div>
    <div class="commentTitle">
      <p>Hi~</p>
    </div>
    <div class="commentAction">
      <div class="reply">
        <el-input
          type="textarea"
          autosize
          placeholder="写下你的评论....."
          v-model="textarea"
        >
        </el-input>
        <el-button class="submit" @click="SendComment()">提交</el-button>
      </div>

      <ul v-if="isEmpty == false">
        <li
          class="commentItem"
          v-for="(item, index) in commentArray"
          :key="index"
        >
          <div class="avator">{{ item.nickname | name() }}</div>
          <div class="content">
            <div class="info">
              <div class="name el-icon-user-solid" v-if="item.nickname === '罗废鱼'">{{ item.nickname }}</div>
              <div class="name" v-if="item.nickname != '罗废鱼'"> {{ item.nickname }}</div>
              <div class="time">{{ item.create_time }}</div>
            </div>
            <div class="detail">{{ item.cmcontent }}</div>
            <!-- <el-button type="text el-icon-chat-dot-square">回复</el-button> -->
            <el-button
              class="delete"
              type="text"
              v-if="username === '123'"
              @click="handleDelect(item.id)"
              >删除</el-button
            >
          </div>
        </li>
      </ul>
      <div class="emptyBox" v-if="isEmpty == true">
        <div class="el-icon-chat-square"></div>
        <p>暂无数据，可惜</p>
      </div>
    </div>
  </div>
</template>

<script>
import Cookie from "js-cookie";
export default {
  inject:['reload'],
  props: ["articleId"],
  filters: {
    name(str) {
      if (str) return str.substring(0, 1);
      else return "";
    },
  },
  data() {
    return {
      textarea: "",
      commentArray: [],
      isEmpty: false,
      username :Cookie.get("username")
    };
  },
  methods: {
    // 管理员删除评论
    handleDelect(id) {
      this.$confirm("此操作将永久删除该评论, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 发起删除的网络请求
          this.$http
            .post("/api/comment/delete", {
              comment_id: id,
            })
            .then((res) => {
              if (res.data.code === 0) {
                //发起删除请求操作
                this.$message({
                  type: "success",
                  message: `评论删除成功!`,
                });
                setTimeout(() => {
                  location.reload();
                }, 500);
              }
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    async GetArticleComment() {
      if (this.articleId) {
        let res = await this.$http.get("/api/comment/list", {
          params: { article_id: this.articleId },
        });
        this.commentArray = res.data.data.reverse();
        console.log(res);
      } else {
        this.isEmpty = true;
      }
    },
    SendComment() {
      if (Cookie.get("token")) {
        if (this.textarea == "") {
          this.$message({
            message: "请写下评论再提交吧~",
            type: "warning",
          });
          return;
        }
        // 发起评论请求
        this.$http
          .post("/api/comment/publish", {
            content: this.textarea,
            // 有则发送文章id，无则发送0
            article_id: this.articleId ? this.articleId : 0,
          })
          .then((res) => {
            this.GetArticleComment();
            this.textarea = "";
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
  },
  created() {
    this.GetArticleComment();
  },
};
</script>

<style lang="less">
.commentTitle {
  text-align: center;
  margin: 20px 0;
  p {
    font-size: 28px;
    font-weight: 600;
    color: brown;
  }
}
.reply {
  padding: 0 25px;
  display: flex;
  align-items: center;
  // justify-content: start;
  .el-textarea__inner {
    width: 500px;
    border-radius: 19px;
    transition: all 0.3s cubic-bezier(0.19, 0.4, 0.17, 0.85);
    background-color: #f2f2f2;
    color: #666;
  }
  .submit {
    margin-right: 50px;
    color: #fff;
    font-size: 15px;
    width: 60px;
    height: 36px;
    background-color: brown;
    border-radius: 60px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .el-button:focus {
    border-color: rgb(136, 25, 25);
    background-color: rgb(136, 25, 25);
    color: #fff;
  }
  .el-button:hover {
    border-color: rgb(136, 25, 25);
    background-color: rgb(136, 25, 25);
    color: #fff;
  }
}
ul {
  padding: 0 40px;
  list-style: none;
  .el-button {
    color: #999;
  }
  .el-button:focus {
    color: #666;
  }
  .el-button:hover {
    color: #666;
  }
  .avator {
    width: 40px;
    height: 40px;
    font-size: 24px;
    text-align: center;
    color: #b13713;
    line-height: 40px;
    margin-right: 15px;
    border-radius: 100%;
    transition: all 0.5s ease;
    border: 1px solid #e5e5e5;
  }
  .name {
    color: #333;
  }
  .time {
    color: #999;
    font-size: 14px;
  }
  .detail {
    margin-top: 10px;
  }
  .commentItem {
    padding: 10px;
    margin: 10px 0;
    overflow: hidden;
    display: flex;
    border-bottom: 1px dashed #c9c9c9;
  }
  .delete {
    color: #b13713;
  }
}
.emptyBox {
  color: #999;
  margin: 20px auto;
  font-size: 60px;
  text-align: center;
  .el-icon-chat-square ::before {
    width: 30px;
    height: 30px;
  }
  p {
    margin-top: 5px;
    font-size: 13px;
  }
}
</style>
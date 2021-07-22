<template>
  <div class="edit_wrap wrapper">
    <div class="backBtn">
      <el-button @click="goBack">返回</el-button>
    </div>
    <div class="edit_title">书名</div>
    <el-input v-model="title" placeholder="请输入书名"></el-input>
    <div class="edit_title">作者</div>
    <el-input v-model="author" placeholder="请输入作者"></el-input>
    <div class="edit_title">评分</div>
    <el-input
      style="padding-bottom: 20px"
      v-model="judge"
      placeholder="请输入评分"
    ></el-input>
    <!-- 上传封面 -->
    <div>
      <el-upload
        class="avatar-uploader"
        action="http://106.14.238.126:8888/api/article/upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        name="head_img"
      >
        <img :src="imageUrl ? imageUrl : defaultAvatar" class="avatar" />
      </el-upload>
    </div>
    <!-- 文章内容 -->
    <div class="edit_title">书单内容)</div>
    <el-input
      type="textarea"
      placeholder="请输入内容"
      v-model="content"
      autosize
    >
    </el-input>
    <el-button type="danger" @click="save">保存书单</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      author:"",
      content: "",
      judge: "",
      imageUrl: "",
      defaultAvatar: require("@/assets/default.jpg"),
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
    goBack() {
      this.$router.go(-1);
    },
    save() {
      if (this.$route.params.id == undefined) {
        let data = {
          title: this.title,
          content: this.content,
          pic_url: this.imageUrl,
          judge: Number(this.judge),
          author:this.author,
        };
        this.$http.post("/api/book/addBook", data).then((res) => {
          if (res.data.code === 0) {
            this.$router.push({ name: "bookEdit" });
          }
        });
      } else {
        let data = {
          book_id: this.$route.params.id,
          title: this.title,
          content: this.content,
          pic_url: this.imageUrl,
          judge: Number(this.judge),
          author:this.author,
        };
        this.$http.post("/api/book/updateBook", data).then((res) => {
          if (res.data.code === 0) {
            this.$router.push({ name: "bookEdit" });
          }
        });
      }
    },
    //  获取文章详情
    getDetail() {
      this.$http
        .get("/api/book/detailBook", {
          params: {
            book_id: this.$route.params.id,
          },
        })
        .then((res) => {
          if (res.data.code === 0) {
            console.log(res);
            this.title = res.data.data.title;
            this.content = res.data.data.content;
            this.judge = res.data.data.judge;
            // 获取文章封面pic_url:this.imageUrl
            this.imageUrl = res.data.data.pic_url;
            this.author = res.data.data.author
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  created() {
    if (this.$route.params.id) {
      this.getDetail();
    }
  },
};
</script>

<style lang="less">
.edit_wrap {
  margin: 30px auto;
  //   background-color: #fff;
  padding: 40px;
  font-size: 16px;
  .backBtn {
    text-align: right;
    margin-bottom: 40px;
  }
  .edit_title {
    margin: 20px 0;
    font-weight: 700;
  }
  .el-button--danger {
    margin: 40px 0;
  }
}

.classify {
  margin: 30px 0px;
  display: flex;
  .el-input {
    margin: 0 10px 0 0;
    width: 10%;
  }
}

// 封面
.avatar {
  width: 200px;
}
</style>
<template>
  <div class="edit_wrap wrapper">
    <div class="backBtn">
      <el-button @click="goBack">返回</el-button>
    </div>
    <div class="edit_title">标题</div>
    <el-input v-model="title" placeholder="请输入标题"></el-input>
    <!-- 分类 -->
    <div class="classify">
      <el-input v-model="class01" size="mini" placeholder="分类1"></el-input>
      <el-input v-model="class02" size="mini" placeholder="分类2"></el-input>
      <el-input v-model="class03" size="mini" placeholder="分类3"></el-input>
    </div>
    <!-- 上传封面 -->
    <div>
      <el-upload
        class="avatar-uploader"
        action="http://106.14.238.126:3000/api/article/upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        name="head_img"
      >
        <img :src="imageUrl ? imageUrl : defaultAvatar" class="avatar" />
      </el-upload>
    </div>
    <!-- 文章内容 -->
    <div class="edit_title">文章内容 (Markdown编辑器)</div>
    <div class="markdown">
      <mavon-editor v-model="content"/>
    </div>
    <div class="save_btn">
      <el-button type="primary" @click="save">保存为技术文章</el-button>
      <el-button type="primary" @click="save(1)">保存为生活说说</el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      title: "",
      content: "",

      class01: "",
      class02: "",
      class03: "",

      classid_01: "",
      classid_02: "",
      classid_03: "",

      imageUrl: "",
      defaultAvatar: require("@/assets/default.jpg"),
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: false, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览
      },
    };
  },
  methods: {
    $imgAdd(pos, $file) {
      // 添加图片
      // 第一步.将图片上传到服务器.
      console.log(pos, $file);
      var formdata = new FormData();
      formdata.append("image", $file);
     this.$http.post("/api/article/upload", formdata).then((url) => {
       console.log(url)
        this.$refs.md.$img2Url(pos, url.data.filename);
      });
    },
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
    save(type) {
      //  如果有重复的分类，则返回
      if (
        this.class01 &&
        this.class01 &&
        this.class01 &&
        (this.class01 === this.class02 || this.class01 === this.class03)
      ) {
        return this.$message({
          message: "请不要填写重复的分类名称",
          type: "warning",
        });
      } else {
        if (type == 0) {
          // 当类型为生活文章
        } else if (type == 1) {
          // 当类型为说说动态
          let data = {
            title: this.title,
            content: this.content,
            classname01: this.class01,
            classname02: this.class02,
            classname03: this.class03,
            type: type,
          };
          this.$http.post("/api/article/add", data).then((res) => {
            if (res.data.code === 0) {
              this.$router.push({ name: "article" });
            }
          });

          // 修改时间状态
          this.$store.commit("changeTimeLocus", 1);
        } else {
          // 当类型为技术文章
          //  判断当前的保存是新增保存还是编辑保存
          if (this.$route.params.id) {
            //  如果是编辑保存，则发起更新请求
            let data = {
              title: this.title,
              content: this.content,
              article_id: this.$route.params.id,

              classname01: this.class01,
              classname02: this.class02,
              classname03: this.class03,

              classid_01: this.classid_01,
              classid_02: this.classid_02,
              classid_03: this.classid_03,

              pic_url: this.imageUrl,
            };
            this.$http.post("/api/article/update", data).then((res) => {
              if (res.data.code === 0) {
                this.$router.push({ name: "article" });
              }
            });
          } else {
            //  如果是新增保存，则发起新增请求
            let data = {
              title: this.title,
              content: this.content,
              classname01: this.class01,
              classname02: this.class02,
              classname03: this.class03,
              pic_url: this.imageUrl,
            };
            this.$http.post("/api/article/add", data).then((res) => {
              if (res.data.code === 0) {
                this.$router.push({ name: "article" });
              }
            });
          }
        }
      }
    },
    //  获取文章详情
    getDetail() {
      this.$http
        .get("/api/article/detail", {
          params: {
            article_id: this.$route.params.id,
          },
        })
        .then((res) => {
          if (res.data.code === 0) {
            this.title = res.data.data.title;
            this.content = res.data.data.content;
            this.class01 = res.data.data.class_name01;
            this.class02 = res.data.data.class_name02;
            this.class03 = res.data.data.class_name03;

            // 获取分类id
            this.classid_01 = res.data.data.classify_id01;
            this.classid_02 = res.data.data.classify_id02;
            this.classid_03 = res.data.data.classify_id03;

            // 获取文章封面pic_url:this.imageUrl
            this.imageUrl = res.data.data.pic_url;
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
  margin: 30px 100px;
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
  .save_btn {
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
 <template>
  <!-- 左边内容 -->
  <el-container>
    <el-aside>
      <div class="wow slideInLeft">
        <!-- 文章分类 -->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>文章分类</span>
          </div>
          <div class="tag">
            <el-button
              plain
              v-for="(item, index) in AllArticleClassName"
              :key="index"
              size="small"
              @click="tagEvent(item.classname)"
            >
              {{ item.classname }}
            </el-button>
          </div>
        </el-card>

        <!-- 博客信息 -->
        <el-card class="box-card" style="margin-top: 30px">
          <div slot="header" class="clearfix">
            <span><i class="el-icon-coffee"></i>博客信息</span>
          </div>
          <div class="ItemList">
            <span class="left">
              <i class="el-icon-coffee-cup"></i>
              文章总数
            </span>
            <span> {{ count }}篇 </span>
          </div>
          <div class="ItemList">
            <span class="left">
              <i class="el-icon-goblet"></i>
              运行天数
            </span>
            <span> {{ day }}天 </span>
          </div>
        </el-card>
      </div>
    </el-aside>

    <!-- 中间主要内容 -->
    <el-main class="wow slideInRight">
      <!-- 搜索框 -->
      <div class="search">
        <el-input
          size="medium"
          placeholder="请输入文章名进行输入"
          suffix-icon="el-icon-search"
          v-model="input"
          debounce
          @keyup.enter.native="search(input)"
        >
        </el-input>
      </div>

      <!-- 文章页 -->

      <el-card
        class="box-card"
        shadow="hover"
        :body-style="{ width: '100%' }"
        v-for="(item, index) in AllArticle"
        :key="index"
      >
        <div slot="header" class="clearfix">
          <router-link :to="{ name: 'Detail', params: { id: item.id } }">
            <h3>{{ item.title }}</h3>
            <p class="el-icon-time">{{ item.create_time }}</p>
            <div class="tag">
              <!-- <el-tag type="danger">{{ item.class_name01 }}</el-tag> -->
              <el-tag v-if="item.class_name01" type="danger">{{
                item.class_name01
              }}</el-tag>
              <el-tag v-if="item.class_name02" type="danger">{{
                item.class_name02
              }}</el-tag>
              <el-tag v-if="item.class_name03" type="danger">{{
                item.class_name03
              }}</el-tag>
            </div>
          </router-link>
        </div>
        <!-- @click="GotoArticleDetail(item.id)" -->
        <div class="text item">
          {{ item.content }}
        </div>
        <p class="hot">
          <span class="el-icon-thumb">点赞({{ item.like_count }})</span>
          <span class="el-icon-view">阅读({{item.visited}})</span>
        </p>
      </el-card>

      <!-- 分页 -->
      <div class="block">
        <!-- <span class="demonstration" style="padding-left: 10px"
          >共{{ count/pageSize }}页</span
        > -->
        <el-pagination
          v-if="isShow == true"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="count"
          @current-change="indexChange"
        >
        </el-pagination>
      </div>
    </el-main>
  </el-container>
</template>
 
<script>
import WOW from "wowjs";
export default {
  data() {
    return {
      input: "",
      currentPage: 1,
      // 总文章数
      count: 0,
      // 总标签数
      tagCount: 0,
      // 文章列表
      AllArticle: [],
      // 点赞数量数组
      likes: [],
      // 所以文章分类
      AllArticleClassName: [],
      pageSize: 3,
      isShow: true,
      // 博客运行时间
      day: 0,
    };
  },
  watch: {
    key(val) {
      alert(val);
    },
  },
  created() {
    this.GetAllArticle(this.currentPage, this.pageSize);
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
    this.runtime()
    
  },
  methods: {
    // 博客运行时间
    runtime(){
      // 初始时间，日/月/年 时:分:秒
      const start = new Date("2021/7/3 0:00:00");
      let nowTime = new Date();
      let difference  = (nowTime.getTime()-start.getTime());
      let oneDaysecond = 24*60*60*1000;
      let d = difference/oneDaysecond;// 时间差 / 一天的毫秒数  = 天数
       this.day  = Math.floor(d);//获取天数（向下取整）
    },
    // 搜索文章
    async search(input) {
      let res = await this.$http.get("/api/article/typeList");
      let list = res.data.data;
      this.AllArticle = list.filter((item) => {
        return item.title.indexOf(input) > -1;
      });
      this.isShow = false;
      console.log(this.AllArticle);
    },
    GotoArticleDetail(id) {
      console.log(id);
      this.$router.push({ name: "Detail", params: { id } });
    },
    indexChange(index) {
      this.GetAllArticle(index, this.pageSize);
    },
    async tagEvent(key) {
      this.key = key;
      this.GetAllArticle();
      this.isShow = false;
    },
    // 获取全部文章
    async GetAllArticle(curPage, pageSize) {
      if (this.key) {
        var res = await this.$http.get("/api/article/list/Singleclassify", {
          params: { classname: this.key },
        });
        this.AllArticle = res.data.data.list;
      } else {
        var res = await this.$http.get("/api/article/typeList", {
          params: { curPage: curPage, pageSize: pageSize },
        });
        this.AllArticle = res.data.data;
        this.count = res.data.coust;
        this.$store.commit("setCount", this.count);
        console.log(res);
      }

      // 截取时间
      this.AllArticle.map((item) => {
        item.create_time = item.create_time.slice(0, 10);
      });
      this.GetAllArticleClassName();
    },

    // 获取全部文章标签
    async GetAllArticleClassName() {
      let res = await this.$http.get("/api/article/classify");

      this.AllArticleClassName = res.data.data;
      console.log(res);
      // 去除空字符
      for (var i = 0; i < this.AllArticleClassName.length; i++) {
        if (this.AllArticleClassName[i].classname == "") {
          this.AllArticleClassName.splice(i, 1);
          i = i - 1;
        }
      }
      this.tagCount = this.AllArticleClassName.length;
      this.$store.commit("setTagCount", this.tagCount);
    },
  },
};
</script>

<style lang="less">
#app {
  .el-loading-spinner {
    i {
      color: rgb(219, 165, 183);
    }
    p {
      color: rgb(219, 165, 183);
    }
  }
  .el-container {
    .el-aside {
      padding: 30px 30px;
      padding-left: 0;
      box-sizing: content-box;
      .box-card {
        width: 290px;
        .el-card__header {
          width: 100%;
          padding-left: 20px;
          font-size: 24px;
          color: #707070;
        }
        .tag {
          display: flex;
          // justify-content: space-between;
          flex-wrap: wrap;
          .el-button {
            margin-right: 10px;
            margin-bottom: 5px;
            margin-left: 0;
          }
          .is-plain:hover {
            background: #fff;
            border-color: brown;
            color: brown;
          }
          .is-plain:focus {
            background: brown;
            border-color: brown;
            color: #fff;
          }
        }

        .ItemList {
          padding: 10px 10px;
          cursor: pointer;
          color: #555;
          border-bottom: 1px solid #ebeef5;
          transition: all 0.6s;
          font-size: 13px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .ItemList:hover {
          background: #f3f4f5;
          color: #909399;
          padding-left: 10px;
        }
        .ItemList:last-child {
          border-bottom: none;
        }
      }
    }
    .el-main {
      background: rgba(255, 255, 255, 0.829);
      margin: 30px 0;
      padding-left: 100px;
      box-sizing: content-box;
      padding-bottom: 20px;
      border-left: 1px dashed rgb(201, 201, 201);
      overflow: unset;
      .search {
        margin-left: 80px;
        width: 300px;
        margin-top: 20px;
        margin-bottom: 20px;
        .el-input__inner {
          border: 1px solid #8a8a8a;
        }
      }

      .box-card {
        margin-bottom: 30px;
        width: 480px;
        border-left: 1px dashed rgb(201, 201, 201);
        .el-card__header {
          width: 100%;
          a {
            text-decoration: none;
            color: #606266;
          }

          .router-link-active {
            text-decoration: none;
            color: #606266;
          }
        }
        h3 {
          margin: 0;
          margin-top: 10px;
          font-size: 24px;
        }
        .el-icon-time {
          color: #8a8a8a;
          font-size: 14px;
          margin: 20px 0;
        }
        .tag {
          .el-tag {
            margin-right: 10px;
          }
        }
        .el-card__body {
          margin: 0;
          width: 100%;
          .text {
            width: 450px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            font-size: 14px;
          }
          .hot {
            color: #999;
            font-size: 13px;
            span {
              margin-right: 15px;
            }
          }
        }
      }
      .el-pagination {
        .btn-prev {
          color: #8a8a8a;
        }
        .btn-next {
          color: #8a8a8a;
        }
      }
      .el-pager li.active {
        color: rgb(219, 165, 183);
      }
      .el-pager li {
        color: #8a8a8a;
      }
    }
    .el-main ::before,
    .box-card ::before {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      filter: blur(20px);
      z-index: -1;
      margin: -30px;
    }
  }
}
</style>
 <template>
  <!-- 左边内容 -->
  <el-container>
    <el-aside>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>标签</span>
        </div>
        <div class="tag">
          <el-tag
            v-for="(item, index) in items"
            :key="index"
            type="info"
            effect="plain"
          >
            {{ item }}
          </el-tag>
        </div>
      </el-card>
    </el-aside>

    <!-- 中间主要内容 -->
    <el-main>
      <!-- 搜索框 -->
      <div class="search">
        <el-input
          size="medium"
          placeholder="请输入文章名进行输入"
          suffix-icon="el-icon-search"
          v-model="input"
        >
        </el-input>
      </div>

      <!-- 文章页 -->
      <!-- <div class="artical"> -->
      <el-card class="box-card" shadow="hover" :body-style="{ width: '100%' }">
        <div slot="header" class="clearfix">
          <h3>文章标题</h3>
          <p class="el-icon-time">2020-01-22</p>
          <div class="tag">
            <el-tag type="danger">JavaScript</el-tag>
            <el-tag type="danger">VUE</el-tag>
            <el-tag type="danger">CSS</el-tag>
          </div>
        </div>
        <div class="text item">
          User 组件，对于所有 ID 各不相同的用户，都要使
          用这个组件来渲feefwrgu而非呼唤v都v回复给施工队染。那么，我们可以在
          vue-router 的路由路径中使用“动态路径参数”(dynamic segment)
          来达到这个效果：
        </div>
        <p class="hot">
          <span class="el-icon-thumb">点赞(1)</span>
          <span class="el-icon-view">阅读(100)</span>
        </p>
      </el-card>

      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <h3>文章标题</h3>
          <p class="el-icon-time">2020-01-22</p>
          <div class="tag">
            <el-tag type="danger">JavaScript</el-tag>
            <el-tag type="danger">VUE</el-tag>
          </div>
        </div>

        <div class="text item">
          User 组件，对于所有 ID 各不相同的用户，都要使
          用这个组件来渲feefwrgu而非呼唤v都v回复给施工队染。那么，我们可以在
          vue-router 的路由路径中使用“动态路径参数”(dynamic segment)
          来达到这个效果：
        </div>
        <p class="hot">
          <span class="el-icon-thumb">点赞(1)</span>
          <span class="el-icon-view">阅读(100)</span>
        </p>
      </el-card>
      <!-- </div> -->

      <!-- 分页 -->
      <div class="block">
        <span class="demonstration">共1页</span>
        <el-pagination
          :current-page.sync="currentPage3"
          :page-size="5"
          layout="prev, pager, next, jumper"
          :total="3"
        >
        </el-pagination>
      </div>
    </el-main>
  </el-container>
</template>
 
<script>
export default {
  data() {
    return {
      items: ["性能优化", "vue", "CSS", "JavaScript"],
      input: "",
      currentPage3: 1,
    };
  },
};
</script>

<style lang="less">
#app {
  
  .el-container {
//      background: linear-gradient(to right, #ccc 1px, transparent 1px),
//     linear-gradient(to bottom, rgba(238, 234, 234, 0.932) 1px, transparent 1px);
//   background-repeat: repeat; /* 默认为 repeat */
//   background-size: 10px 10px;
    .el-aside {
      margin: 30px 30px;
      // margin-right: 30px;
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
          justify-content: space-around;
        }
      }
    }
    .el-main {
      background-color: white;
      margin: 30px 0;
      padding: 0 80px;
      padding-bottom: 20px;
      border-left: 1px dashed rgb(201, 201, 201);
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
        width: 500px;
        .el-card__header {
          width: 100%;
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
      .el-pager li.active {
        color: rgb(219, 165, 183);
      }
      .el-pager li {
        color: #8a8a8a;
      }
    }
  }
}
</style>
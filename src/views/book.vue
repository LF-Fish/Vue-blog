<template>
  <div id="book">
    <div class="masonry wow wow fadeInUp">
      <div class="item" v-for="(item, index) in bookList" :key="index">
        <div class="bookImg">
          <img :src="item.pic_url" />
        </div>
        <div class="info">
          <el-rate v-model="item.judge" disabled color="#A52A2A"> </el-rate>
          <p class="title">{{ item.title }}</p>
          <p class="author">{{ item.author }}</p>
          <p class="content">
            {{ item.content }}
          </p>
        </div>
      </div>

      ...more...
    </div>
  </div>
</template>

<script>
import WOW from "wowjs";
export default {
  data() {
    return {
      count: 0,
      bookList: [],
    };
  },
  methods: {
    load() {
      this.count += 2;
    },
    async getBook() {
      let res = await this.$http.get("/api/book/bookList");
      this.bookList = res.data.data;
    },
  },
  created() {
    this.getBook();
  },
  mounted() {
    let wow = new WOW.WOW({
      boxClass: "wow",
      animateClass: "animated",
      offset: 0,
      mobile: true,
      live: true,
    });
    wow.init();
  },
};
</script>

<style lang="less">
#book {
  margin-top: 20px;
}
.masonry {
  // width: 1440px; // 默认宽度
  margin: auto; // 剧中
  columns: 3; // 默认列数
  column-gap: 30px; // 列间距
  background-color: #fff;
  padding: 20px;
  .item {
    transition: all 0.5s ease;
    border-right: 1px dashed #c9c9c9;
    padding: 10px;
    padding-top: 20px;
    width: 100%;
    break-inside: avoid;
    margin-bottom: 30px;
    .bookImg {
      text-align: center;
      padding-bottom: 10px;
    }
    .info {
      padding-left: 20px;
      .title {
        font-weight: 700;
        font-size: 15px;
        margin-bottom: 5px;
      }
      .author {
        font-size: 12px;
        color: #999;
        margin-bottom: 8px;
      }
      .content {
        font-size: 13px;
      }
    }
    img {
      width: 80%;
    }
    &:hover {
      padding-top: 10px;
      padding-bottom: 20px;
    }
  }

  .el-icon-star-on {
    color: rgb(165, 42, 42);
  }
}
</style>
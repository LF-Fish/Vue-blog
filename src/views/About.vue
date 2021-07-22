<template>
  <div class="about wow slideInLeft">
    <div class="headerImg">
      <img src="../assets/about.png" alt="" />
    </div>
    <h1 class="aboutMe">关于我</h1>
    <el-divider><i class="el-icon-s-check"></i></el-divider>
    <div class="aboutItem">
      <div class="info">
        <h1>📝 个人信息</h1>
        <li class="name">🐟罗废鱼 or 🐠罗非鱼</li>
        <li>大三在读，现居重庆♨️，</li>
        <li>在路上的前端学习者🏃‍♀️。</li>
      </div>
      <study></study>
      <div class="like">
        <h1>💜 个人爱好</h1>
        <li>🎤 🎸 🎧 📚</li>
        <li>
          🔊
          <el-image
            style="width: 35px; height: 35px"
            :src="require('@/assets/snh48.jpg')"
          ></el-image>
          4️⃣8️⃣
        </li>
        <p style="font-size: 16px">有机会一起相约剧场...</p>
      </div>
    </div>
    <el-divider><i class="el-icon-s-comment"></i></el-divider>
    <div class="comment">
      <comment></comment>
    </div>
  </div>
</template>

<script>
import WOW from "wowjs";
import study from "../components/study.vue";
import comment from "../components/comment.vue";
export default {
  components: {
    study,
    comment,
  },
  provide() {
    return {
      reload: this.reload,
    };
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
  },
};
</script>

<style lang="less">
.about {
  background: #f8f8f8;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 0;
  width: 100%;
  color: rgb(127, 141, 153);
  .el-divider--horizontal{
    width: 80%;
  }
  .el-divider__text{
    background-color: rgba(248, 248, 248, 0.952);
  }
  .aboutMe{
    font-size: 42px;
    width: 300px;
    text-align: center;
    border-radius: 10px;
    line-height: 1.8;
    background: 0px 0px;
    border: 2px solid rgb(150, 150, 150);
    box-shadow: rgb(150 150 150) 0.4rem 0.4rem 0px 0px;
  }
  .headerImg {
    img {
      width: 700px;
      border-radius: 1rem;
    }
  }
  .aboutItem {
    display: flex;
    padding: 50px 0;
    .info {
      display: flex;
      flex-direction: column;
    }
  }
  li {
    padding: 10px 0;
    font-size: 18px;
    color: #707070;
  }

  .comment {
    width: 700px;
  }
}
</style>

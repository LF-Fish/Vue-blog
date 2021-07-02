<template>
  <div class="about wow slideInLeft">
    <h1 class="title">关于我</h1>
    <h1 class="name">🐟罗废鱼 or 🐠罗非鱼</h1>
    <h4>大三在读，现居重庆♨️，</h4>
    <h4>在路上的前端学习者🏃‍♀️。</h4>

    <div class="study">
      <div class="studyItem">
        <el-image
          style="width: 50px; height: 50px"
          :src="require('@/assets/js.png')"
        ></el-image>
        <p>js</p>
      </div>
      <el-image
        style="width: 20px; height: 20px"
        :src="require('@/assets/箭头右.png')"
      ></el-image>
      <div class="studyItem">
        <el-image
          style="width: 50px; height: 50px"
          :src="require('@/assets/wx.png')"
        ></el-image>
        <p>微信小程序</p>
      </div>
      <el-image
        style="width: 20px; height: 20px"
        :src="require('@/assets/箭头右.png')"
      ></el-image>
      <div class="studyItem">
        <el-image
          style="width: 50px; height: 50px"
          :src="require('@/assets/Vue.png')"
        ></el-image>
        <p>Vue.js</p>
      </div>
      <el-image
        style="width: 20px; height: 20px"
        :src="require('@/assets/箭头右.png')"
      ></el-image>

      <p style="padding-left: 20px; color: #707070; font-weight: 600">
        待续....
      </p>
    </div>
    <div class="like">
      <h4>Like:</h4>
      <p>🎤 🎸 🎧 📚</p>
      <h4>And</h4>
      <p>
        🔊
        <el-image
          style="width: 50px; height: 50px"
          :src="require('@/assets/snh48.jpg')"
        ></el-image>
        4️⃣8️⃣
      </p>
      <p style="font-size: 16px">有机会一起相约剧场...</p>
    </div>
  </div>
</template>

<script>
import WOW from "wowjs";
export default {
  mounted(){
     let wow = new WOW.WOW({
        boxClass: "wow",
        animateClass: "animated",
        offset: 0,
        mobile: true,
        live: false,
      });
      wow.init();
  }
}
</script>

<style lang="less">
.about {
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
  .title {
    font-size: 54px;
  }
  .name {
    font-size: 32px;
  }
  h4 {
    font-size: 20px;
    // padding-left: 100px;
  }
  .study {
    display: flex;
    align-items: center;
    padding: 10px 0;
    .studyItem {
      width: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding: 20px;
      color: #707070;
      font-weight: 600;
    }
  }
  .like {
    h4 {
      padding-left: 10px;
    }
    p {
      font-size: 32px;
    }
  }
}
</style>

<template>
  <div class="about wow slideInLeft">
    <div class="info">
      <h1>📝 个人信息</h1>
      <li class="name">🐟罗废鱼 or 🐠罗非鱼</li>
      <li>大三在读，现居重庆♨️，</li>
      <li>在路上的前端学习者🏃‍♀️。</li>
    </div>
    <div class="study">
      <!-- <h1 class="studyTitle">👩🏼‍💻 技能进阶</h1> -->
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
        <p>小程序</p>
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
</template>

<script>
import WOW from "wowjs";
export default {
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
  background: #fff;
  // width: ;
  margin: 20px auto;
  display: flex;
  padding: 30px 60px;
  li {
    padding: 10px 0;
    font-size: 18px;
    color: #707070;
  }
  .info {
    display: flex;
    flex-direction: column;
  }

  .study {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    margin: 0 20px;
    height: 300px;
    border-left: 1px dashed #c9c9c9 ;
    border-right: 1px dashed #c9c9c9 ;
    .studyItem {
      width: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding: 20px 0;
      color: #707070;
      font-weight: 600;
    }
  }
}
</style>

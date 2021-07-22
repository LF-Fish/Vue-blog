<template>
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
</template>

<style lang="less">
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
</style>
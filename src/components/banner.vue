<template>
  <div class="header">
    <div class="banner wow zoomIn">
      <!-- 头像 -->
      <div class="headImg wow fadeInUp">
        <span>🐠</span>
        <p>罗非鱼海鲜批发市场</p>
      </div>
    </div>
  </div>
</template>

<style lang="less">
  .header {
    width: 1200px;
    margin: auto;
    .banner {
      // border-radius: 10px;
      background-color: white;
      display: flex;
      justify-content: center;
      margin: auto;
      height: 580px;
      width: 100%;
      background: url("../assets/headImg.png") 50% / cover no-repeat;
      .headImg {
        // width: 120px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        span {
          font-size: 64px;
        }

        p {
          text-align: center;
          font-size: 32px;
          font-weight: 500;
          margin: 5px 0;
          color: #eee;
        }
      }
    }
  }
</style>
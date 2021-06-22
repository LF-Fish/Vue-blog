<template>
  <div class="contents">
    <div class="articleBody">
      <!-- 文章头 -->
      <div class="header">
        <h1>{{data.title}}</h1>
        <div class="info">
          <span class="el-icon-time"> 发表时间:{{data.create_time | timer()}} </span>
          <span class="el-icon-view">阅读({{data.visited}})</span>
          <span class="icon el-icon-thumb">点赞({{data.like_count}})</span>
        </div>
      </div>

      <!-- 文章内容 -->
      <div class="body">
        <mavon-editor
          v-model="data.content"
          defaultOpen="preview"
          :toolbarsFlag="false"
          :subfield="false"
          codeStyle="atom-one-dark"
          :boxShadow="false"
        >
        </mavon-editor>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:['data','loading'],
    filters:{
      timer(str){
        if(str != null)
        return str.substring(0,10);
        else
        return ""
      },
    },
    created(){
      console.log(this.data);
    }
  }
</script>

<style lang="less">
.contents {
  margin-top: 20px;
  width: 750px;
  background-color: #fff;
  .articleBody{
    padding: 10px 20px;
    .header{
      padding-bottom: 20px;
      h1{
        font-size: 36px;
      }
      span{
        font-size: 14px;
        color: #999;
        margin-right: 20px;
      }
    }
  }
}
</style>
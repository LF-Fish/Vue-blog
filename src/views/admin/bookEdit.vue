<template>
    <div class="wrapper">
        <h1 class="title">书单列表</h1>
        <div class="article">
            <el-button class="addBtn" @click="handleAdd">新增+</el-button>
            <el-table :data="bookList" border stripe>
                <el-table-column
                    prop="title"
                    label="标题"
                    width="180">
                </el-table-column>
                <el-table-column
                     prop="judge"
                    label="评分"
                    width="180">
                </el-table-column>
                <el-table-column
                     prop="content"
                    label="内容"
                    width="180">
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="success" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelect(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                bookList:[]
            }
        },
        methods:{
            handleAdd() {
                this.$router.push({name:'bookPublish'})
            },
            handleEdit(row) {
                let id = row.id;
                this.$router.push({name:'bookPublish',params: {id:id}})
            },
            handleDelect(row){
                let id = row.id
                this.$confirm('此操作将删除该书单, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                  this.$message({
                    type: 'success',
                    message: `书单删除成功!`
                  });
                    // 发起删除的网络请求
                    this.$http.post('/api/book/deleteBook',{
                        book_id:id
                    })
                    .then(res => {
                        if(res.data.code === 0){
                            //发起删除请求操作
                            this.$message({
                                type: 'success',
                                message: `${id}文章删除成功!`
                            });
                            setTimeout(() => {
                                location.reload()
                            }, 500);  
                        }
                    }).catch(e=>{
                        console.log(e)
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },
            getMyBookList(){
               this.$http.get('/api/book/bookList').then(res => {
                 console.log(res);
                 if(res.data.code === 0){
                    this.bookList = res.data.data
                    console.log(this.bookList);
                 }
               })
            }
        },
        created() {
            this.getMyBookList()
        },
    }
</script>

<style lang="less">
.wrapper{
    background-color: #FAFAFA;
}
.title {
    margin: 30px 0;
    text-align: center;
    font-weight: bold;
    font-size: 28px;
}
.article {
    .addBtn {
        float: right;
        margin: 30px 0;
        margin-right: 50px;
    }
}
.el-table {
    .cell {
        text-align: center;
    }
}
</style>
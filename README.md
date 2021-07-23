# myblog
## 基于Vue.js+element-ui实现的个人博客 
### [网站地址](http://www.lf-fish.co/)
### 技术栈主要包括```Vue```,```Vuex```,```axios```,```Vue Router```,```Less```。
## 1.网站模块
 1. 博文归档
 2. 书籍分享
 3. 用户登录 
 4. 留言评论

以上只做了这几个模块，没有单独做主页展示，考虑到我的文章数量并不多，所以直接将博文归档放在主页，同时也起到一个重点突出博文的作用。++归档++左边部分和上边部分可以通过文章分类标签和文章标题进行对文章检索。
## 2.技术栈
技术栈的话因为我才对vue进行一个入门的学习，正好选用vue也可以对之前的学习做一个实践性的巩固。而后端呢，因为还未深入的学习，所以后端主要是通过其他博客的源码进行配置。
主要技术有

前端：`Vue-Cli` `Element ui` `VueX` `Vue router` `Less` `axios`

后端：`Nodejs` `Express` `MySQL`
## 3.主要功能
1. 文章浏览
对于文章的布局和排版，直接使用的是==markdown==语法来编辑文章，再将文本内容保存到数据库中，浏览文章的时候使用==mavon-editor==插件来解析数据库中的文本内容。
2. 文章评论
因为是个人博客，并没有很大的流量和稳定的用户访问，所以只保留了用户评论，放弃了回复功能。
3. 文章点赞
文章详细页左侧有一个点赞按钮，根据用户登录后存储的==cookie==判断是否可以点赞，点赞成功后刷新仍可继续点赞。
4. 用户登录、修改头像
用户输入昵称、用户名、密码进行登录注册，登录成功后可回到登录页面查看个人信息，点击头像位置可更换头像。
## 4.后台管理
目前是对文章和书单进行管理，主要操作包括查看详细内容、修改更新、删除的操作，永远离不开的增删改查。
`ps:一次偶然中发现删除文章时没有将数据库中标签一并删除，考虑到相同标签的数量原因，之后会增加文章标签的管理，对一些不需要的标签进行手动删除。`

## 效果图
![首页](https://img-blog.csdnimg.cn/20210709124105754.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjAxODcyNg==,size_16,color_FFFFFF,t_70#pic_center)

![博文归档](https://img-blog.csdnimg.cn/20210709124137700.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjAxODcyNg==,size_16,color_FFFFFF,t_70#pic_center)

![书籍分享](https://img-blog.csdnimg.cn/20210709124214898.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjAxODcyNg==,size_16,color_FFFFFF,t_70#pic_center)

![个人信息](https://img-blog.csdnimg.cn/2021070912422872.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjAxODcyNg==,size_16,color_FFFFFF,t_70#pic_center)



## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

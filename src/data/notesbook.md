





[toc]













# Vue框架学习笔记



中国人——友雨溪，开发。

只关心视图层：html，css，js，给用户看，刷新后台给的数据

网络通信：axios

页面跳转：vue-router

状态管理：vuex



Soc关注点分离原则：



webpack：打包

ES6可以通过webpack打包成ES5支持的。



MVC：模型，视图，控制器，（同步通信为主）

MVVM：Model，View，v-model数据双向绑定。（异步通信为主）

虚拟DOM：利用内存；

vue框架：MVVM+虚拟DOM，集合两大框架的优点。

渐进式：逐渐实现新特性。

计算属性：Vue的特色，利用虚拟DOM

## 递归渲染

封装vue组件，传入一个数组，数组里面有数组，组件里面递归调用组件，





## 为什么要用MVVM模式？

目的：分离视图和模型。

低耦合：View和Model可以独立变化。ViewModel可以绑定到不同的的View上面。

可复用：

独立开发：

可测试：



![mvvm](C:\Users\刘国林\Desktop\mvvm.png)



ViewModel能观察数据的变化，并对视图对应内容进行更新。

ViewModel能监听视图的变化，并通知数据发生改变。（双向绑定）

Vue.js就是MVVM中的ViewModel。

View：视图层，表示DOM。

Model：模型层，表示js对象。数据。



Vue完全解耦了View层和Model层，解耦是前后端分离的核心。



## 2、基本语法

v-bind:绑定数据到属性。简写：

v-model：双向绑定数据

```javascript
<div v-if="">yes</div>

<div v-else>no</div>
//v-if=真，就显示，否则不显示，显示else标签


//可以写判断
<div v-if="abc==='a'">A</div>
data: {
    abc: 'a'
}
```

v-for:循环

```javascript
<li v-for="item in items">{{item.message}}</li>
```

事件绑定v-on，简写@

```javascript
<button v-on:click="">b</button>
```





## computed计算属性

计算出一个属性，并缓存起来。避免每次调用都需要计算。

将计算结果缓存起来的属性，将行为转化成了静态的属性。

计算出来的结果，保存在属性中。（缓存）

methods和computed里的方法不能重名，重名只会调用methods里的方法。



**调用方法时，每次都需要进行计算，计算就会有系统开销。如果这个结果是不经常变化的，那么吧这个计算结果缓存起来，就可以节约系统开销。计算属性就是把方法的结果作为属性缓存起来。**



## watch监听属性

监听某个属性，执行一些操作。



## slot插槽



做组件时候，留一个插槽，可以在此插入自定义标签，方便复用。

```javascript
<div>
    <slot name=""></slot>
	<ul>
    	<slot name=""></slot>
    </ul>
</div>  


<xxx slot=""></xxx>
```



## props: ['']

组件，自定义属性。用来接收，父组件给自己绑定、传递的数据。

<my :myprop="message" >绑定属性

## this.$emit.('funName',data)

自定义组件自身的方法，用来绑定组件外的方法。



组件里面有个button标签，绑定点击事件=remove。remove是组件自身的methods。

在remove里面，可以this.$emit("remove",data)。这样就自定义了组件的方法。例如该组件是

<my @remove="">这样就可以绑定外面的方法。@remove中的remove是emit定义的。

子组件:

 <span>{{childValue}}</span>

 <!-- 定义一个子组件传值的方法 -->

  <input type="button" value="点击触发" @click="childClick">


 export default {
  data () {
   return {
    childValue: '我是子组件的数据'

   }

  },

  methods: {
   childClick () {  

    this.$emit('childByValue', this.childValue)

   }

  }

 }


父组件

<!-- 引入子组件 定义一个on的方法监听子组件的状态-->

<child v-on:childByValue="childByValue"></child>

methods: {
   childByValue: function (childValue) {
    // childValue就是子组件传过来的值

    this.name = childValue

   }

  }

}

### 获取子组件的值

3.父组件调用子组件的方法通过ref

4、可以通过$parent和$children获取父子组件的参数

![img](https://img-blog.csdnimg.cn/20190223232512122.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xpYW53ZW54aXU=,size_16,color_FFFFFF,t_70)

### 兄弟之间的传值Vuex

在state里定义数据和属性

在 mutations里定义函数fn，在页面通过this.$store.commit('fn',params)来触发函数

```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
```

现在，你可以**通过 `store.state` 来获取状态对象，以及通过 `store.commit` 方法触发状态变更：**

```js
store.commit('increment')

console.log(store.state.count) // -> 1
```





## 绑定数据的三种方式

- {{message}}//文本的形式

绑定data.message，当message发生变化时，视图也发生变化

- v-bind
- v-model//一般用于表单元素中，输入发生变化同步。v-model基本上只会用在input, textarea, select这些表单元素上

```javascript
<input v-model="something">`其实是`<input v-bind:value="something" v-on:input="something = $event.target.value">
```







## 前后端请求的方式

@RequestParam使用
 1、使用 @RequestParam 注解将请求参数绑定至方法参数

前端请求地址：

```javascript
http://localhost:9191/getUser?userName=小明
```

后端：

```java
@PostMapping("getUser") 
public String testMethod(@RequestParam String userName)
```

 2、当前端传入参数和后端接收名字不一致的话，需要在@RequestParam后面指定参数名字，即：

```javascript
http://localhost:9191/getUser?userName=小明

@PostMapping("getUser") 
public String testMethod(@RequestParam("userName") String name)
```

 3、当方法参数的类型为基本类型，@RequestParam可省略不写。

@RequestBody使用
 1、GET方式无请求体，所以使用@RequestBody接收数据时，前端不能使用GET方式提交数据，而是用POST方式进行提交。

 2、@requestBody可以将请求体中的JSON字符串绑定到相应的bean上，也可以将其分别绑定到对应的字符串上。

 3、@RequestBody与@RequestParam() 可以同时使用，但**@RequestBody只能有一个，而@RequestParam()可以有多个**，@RequestBody 接收的是请求体里面的数据；而@RequestParam接收的是key-value里面的参数。

```javascript
$.ajax({ url:"/User/Login", type:"POST", async: false, contentType:"application/json;charset=UTF-8", dataType:'json', data:JSON.stringify({"user_name":user_name,"user_password":user_password}), //将JSON对象转为字符串

success:function(data){undefined

                    
```

转json字符串

获取到后端返回的json字符串后，要转换成对象进行赋值使用。



```javascript
// get传参数
axios.get('/user?id=123')
  .then(response=> {
    console.log(response)
  })
  .catch(error=> {
    console.log(error)
  });
 
// get,和上面效果一样
axios.get('/getuser', {
    params: {
      ID: 123
    }
}) .then(response=> { 
    console.log(response) 
}) .catch(error=> { 
    console.log(error)
});
 
// post传参数
axios.post('/getuser', {
    params: {
      name: '小明',
      age:18
    }
}) .then(response=> { 
    console.log(response) 
}) .catch(error=> { 
    console.log(error)
});

请求体方式

（1）application/x-www-form-urlencoded（表单方式）

axios({

  url: '/users',

  method: 'post',

  data: qs.stringify({

    id: '11111',

    name: '22222'

  })

})

 

请求地址：/users

请求体：id=11111&name=22222

 

（2）application/json（JSON方式）

axios({

  url: '/users',

  method: 'post',

  data: {

    id: '11111',

    name: '22222'

  }

})

```





## 代码混淆

```js
UglifyJs
/^glifai/
丑陋的，混淆，

```





## 路由传参

```js
const User = {
  props: ['id'],
  template: '<div>User {{ id }}</div>'
}
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User, props: true },

    // 对于包含命名视图的路由，你必须分别为每个命名视图添加 `props` 选项：
    {
      path: '/user/:id',
      components: { default: User, sidebar: Sidebar },
      props: { default: true, sidebar: false }
    }
  ]
})
```

## 路由钩子

```javascript
beforeRouteEnter:(to,from,next)=>{
    console.log("进入路由之前")
}
beforeRouteLeave:(to,from,next)=>{
    console.log("进入路由之后")
}

```





## Vue双向绑定原理及实现



vue是通过Object.defineProperty()来实现**数据劫持**的。

观察者模式。



1、proxy

2、object。get，set

3、object.defineProperty

4、object.definePropertis



通过Object.defineProperty( )设置了对象Book的name属性，对其get和set进行重写操作，

顾名思义，get就是在读取name属性这个值触发的函数，set就是在设置name属性这个值触发的函数，所以当执行 Book.name = 'vue权威指南' 这个语句时，控制台会打印出 "你取了一个书名叫做vue权威指南"，紧接着，当读取这个属性时，就会输出 "《vue权威指南》"，因为我们在get函数里面对该值做了加工了。如果这个时候我们执行下下面的语句，控制台会输出什么？

```js

var Book = {}
var name = '';
Object.defineProperty(Book, 'name', {
  set: function (value) {
    name = value;
    console.log('你取了一个书名叫做' + value);
  },
  get: function () {
    return '《' + name + '》'
  }
})
 
Book.name = 'vue权威指南';  // 你取了一个书名叫做vue权威指南
console.log(Book.name);  // 《vue权威指南》
```



![img](https://img2018.cnblogs.com/blog/1210947/201906/1210947-20190624184238527-1356189876.png)



![img](https://upload-images.jianshu.io/upload_images/18491406-0f1347e1ca0cbfaa.png?imageMogr2/auto-orient/strip|imageView2/2/w/730/format/webp)

个人理解：在new Vue的时候，在Observer中**通过Object.defineProperty()达到数据劫持**，**代理所有数据的getter和setter属性**，在每次触发setter的时候，**都会通过Dep来通知Watcher**，Watcher作为Observer数据监听器与Compile模板解析器之间的桥梁，当Observer监听到数据发生改变的时候，通过Updater来通知Compile更新视图

而Compile通过Watcher订阅对应数据，绑定更新函数，通过Dep来添加订阅者，达到双向绑定





































# 前端基础

## 1、说一下http和https？



http是基于tcp协议的一个超文本传输协议，用于web服务器和本地浏览器的数据传送。

https是http的安全版，在传输层进行ssl加密。

http端口为80，https端口为443.



https协议的工作原理

客户端在使用HTTPS方式与Web服务器通信时有以下几个步骤，如图所示。

客户使用https url访问服务器，则要求web 服务器建立ssl链接。

web服务器接收到客户端的请求之后，会将网站的证书（证书中包含了公钥），返回或者说传输给客户端。

客户端和web服务器端开始协商SSL链接的安全等级，也就是加密等级。

客户端浏览器通过双方协商一致的安全等级，建立会话密钥，然后通过网站的公钥来加密会话密钥，并传送给网站。

web服务器通过自己的私钥解密出会话密钥。

web服务器通过会话密钥加密与客户端之间的通信。



https要比http协议安全，可防止数据在传输过程中不被窃取、改变，确保数据的完整性。

缺点：

https握手阶段比较费时，缓存不如http高效。

ssl证书要钱的



## 2、TCP三次握手？

客户端发送SYN请求，

服务端收到请求，发送ACK表示同意，并发送SYN请求

客户端发送ACK同意请求。

## 3、TCP和UDP的区别

TCP是面先连接的，udp发送数据之前不需要先建立链接。

TCP是可靠的，无差错，不丢失，不重复，保证顺序。

TCP是面向字节流的，UDP面向报文。

TCP只能是1对1，UDP可以一对多。

UDP用于传输少量报文。结构简单，开销小。一对多。

TCP报文首部20字节，UDP8字节。



### 为什么不是两次？

主要是为了**防止已经失效的连接请求报文突然又传送到了服务器，从而产生错误。**

假如是两次握手，客户端发送了请求，并且没有丢失。只是网络有点慢。然后客户端重新发送了请求，建立了连接。过了一段时间之后，刚开始发送的那个请求终于到达了服务端，然后服务端就回应这个请求，如果是两个的话，那么就直接建立了连接，造成资源的浪费。

如果两次，**服务器端不能确认自己的消息客户端能收到**，服务器端发送消息可能客户端都收不到。

客户端没有发送ack，服务端不知道客户端有没有收到。

### 为什么不是四次：

三次结束后已经可以确定客户端和服务器可以相互发送消息，如果四次会造成浪费

tcp发出去的请求要得到回应，不然会超时重传。

### 为什么是四次挥手？

第一次挥手：主机1（可以使客户端，也可以是服务器端），设置Sequence Number和Acknowledgment Number，向主机2发送一个FIN报文段；此时，主机1进入FIN_WAIT_1状态；这表示主机1没有数据要发送给主机2了；
第二次挥手：主机2收到了主机1发送的FIN报文段，向主机1回一个ACK报文段，Acknowledgment Number为Sequence Number加1；主机1进入FIN_WAIT_2状态；主机2告诉主机1，我“同意”你的关闭请求；
第三次挥手：主机2向主机1发送FIN报文段，请求关闭连接，同时主机2进入LAST_ACK状态；
第四次挥手：主机1收到主机2发送的FIN报文段，向主机2发送ACK报文段，然后主机1进入TIME_WAIT状态；主机2收到主机1的ACK报文段以后，就关闭连接；此时，**主机1等待2MSL后依然没有收到回复**，则证明Server端已正常关闭，那好，主机1也可以关闭连接了。

***\*MSL, the maximum segment lifetime （\**\**最长报文段寿命\**\**）\**** 

**关闭请求和确认回应不能合并，因为服务端可能还有数据要传输。**

### 为什么要等2msl？

在TIME_WAIT （也被叫做２MSL等待状态）状态下，客户端向服务器发出ACK以后需要等待2个MSL的时间。**假如ACK在传输中丢失，超时后服务端会重新发送FIN,** 客户端收到以后会重新发ACK。**假如在2MSL时间中客户端都没有收到服务端重发的FIN,那么客户端认为服务端已经收到了客户端发送的ACK，** 此时客户端才可以放心的断开连接。


***\*为什么等待时间是2MSL?\****
**客户端发送的ACK segment存活期1MSL,服务端重发FIN segment存活期1MSL，加一起2MSL。2MSL是一个临界值，利用尽量大的等待时间来确保TCP连接断开的可靠性。** 



## 7、状态码

- 200 - 请求成功
- 301 - 资源（网页等）被永久转移到其它URL
- 404 - 请求的资源（网页等）不存在
- 500 - 内部服务器错误

| 301  | Moved Permanently | 永久移动。请求的资源已被永久的移动到新URI，返回信息会包括新的URI，浏览器会自动定向到新URI。今后任何新的请求都应使用新的URI代替 |
| ---- | ----------------- | ------------------------------------------------------------ |
| 302  | Found             | 临时移动。与301类似。但资源只是临时被移动。客户端应继续使用原有URI |

| 304  | Not Modified | 未修改。所请求的资源未修改， |
| ---- | ------------ | ---------------------------- |
|      |              |                              |

| 400  | Bad Request  | 客户端请求的语法错误，服务器无法理解 |
| ---- | ------------ | ------------------------------------ |
| 401  | Unauthorized | 请求要求用户的身份认证               |

| 403  | Forbidden | 服务器理解请求客户端的请求，但是拒绝执行此请求 |
| ---- | --------- | ---------------------------------------------- |
|      |           |                                                |

| 503  | Service Unavailable | 由于超载或系统维护，服务器暂时的无法处理客户端的请求。延时的长度可包含在服务器的Retry-After头信息中 |
| ---- | ------------------- | ------------------------------------------------------------ |
|      |                     |                                                              |

| 500  | Internal Server Error | 服务器内部错误，无法完成请求 |
| ---- | --------------------- | ---------------------------- |
|      |                       |                              |



## 请求的类型

GET：请求从服务器获取特定资源。
 2️⃣POST：在服务器上创建一个新的资源。
 3️⃣PUT：更新服务器上的资源(客户端提供更新后的整个资源)。
 4️⃣DELETE：从服务器删除特定的资源。
 5️⃣PATCH：更新服务器上的资源(客户端提供更改的属性，可以看做作是部分更新)，使用的比较少。



## 8、Cookie、sessionStorage、localStorage的区别

都是用于在浏览器端保存数据的。

cookie存储sessionID用来唯一标识用户

cookie常用于身份验证，在浏览器和服务器来回传递。

cookie只有4K左右的大小。

sessionStrorage存储临时数据，浏览器窗口关闭时失效。

localStorage存储永久数据。5M左右大小。

如果不设置时间，浏览器关闭，cookie就会消失



## 10、Doctype的作用？

声明在文档最前面，告诉浏览器以何种方式渲染页面。







## 13、get和post的区别



get参数通过url传参，post放在request body中。

url传参有长度限制。

get不安全，参数直接暴露在url中，不能用来传递敏感信息。

get产生一个TCP数据包，post产生两个。

请求头长度不一样

## 14、说一下浏览器缓存

### 参考回答：

缓存分为两种：强缓存和协商缓存，根据响应的header内容来决定。

强缓存相关字段有expires，cache-control。如果cache-control与expires同时存在的话，cache-control的优先级高于expires。

浏览器去请求某个文件的时候，服务端就在respone header里面对该文件做了缓存配置。

每次用户正常打开这个页面，浏览器会判断缓存是否过期，没有过期就从缓存中读取数据；



协商缓存相关字段有Last-Modified/If-Modified-Since，Etag/If-None-Match

## 15、在地址栏里输入一个URL,到这个页面呈现出来，中间会发生什么？

输入url后，首先需要找到这个url域名的服务器ip,为了寻找这个ip，浏览器首先会寻找缓存，查看缓存中是否有记录，缓存的查找记录为：

浏览器缓存-》系统缓存-》路由器缓存，缓存中没有则查找系统的hosts文件中是否有记录，

如果没有则查询DNS服务器，

得到服务器的ip地址后，浏览器根据这个ip以及相应的端口号，构造一个http请求，

这个请求报文会包括这次请求的信息，主要是请求方法，请求说明和请求附带的数据，并将这个http请求封装在一个tcp包中，这个tcp包会依次经过传输层，网络层，数据链路层，物理层到达服务器

，服务器解析这个请求来作出响应，返回相应的html给浏览器，

因为html是一个树形结构，浏览器根据这个html来构建DOM树，

在dom树的构建过程中如果遇到JS脚本和外部JS连接，则会停止构建DOM树来执行和下载相应的代码，这会造成阻塞，这就是为什么推荐JS代码应该放在html代码的后面，

之后根据外部样式，内部样式，内联样式构建一个CSS对象模型树CSSOM树，构建完成后和DOM树合并为渲染树，这里主要做的是排除非视觉节点，比如script，meta标签和排除display为none的节点，之后进行布局，布局主要是确定各个元素的位置和尺寸，之后是渲染页面，因为html文件中会含有图片，视频，音频等资源，在解析DOM的过程中，遇到这些都会进行并行下载，浏览器对每个域的并行下载数量有一定的限制，一般是4-6个，当然在这些所有的请求中我们还需要关注的就是缓存，缓存一般通过Cache-Control、Last-Modify、Expires等首部字段控制。 Cache-Control和Expires的区别在于Cache-Control使用相对时间，Expires使用的是基于服务器 端的绝对时间，因为存在时差问题，一般采用Cache-Control，在请求这些有设置了缓存的数据时，会先 查看是否过期，如果没有过期则直接使用本地缓存，过期则请求并在服务器校验文件是否修改，如果上一次 响应设置了ETag值会在这次请求的时候作为If-None-Match的值交给服务器校验，如果一致，继续校验 Last-Modified，没有设置ETag则直接验证Last-Modified，再决定是否返回304

##  HTTP2.0 的特性

### 参考回答：

http2.0的特性如下：

1、内容安全，应为http2.0是基于https的，天然具有安全特性，通过http2.0的特性可以避免单纯使用https的性能下降

2、二进制格式，http1.X的解析是基于文本的，http2.0将所有的传输信息分割为更小的消息和帧，并对他们采用二进制格式编码，基于二进制可以让协议有更多的扩展性，比如引入了帧来传输数据和指令

3、多路复用，这个功能相当于是长连接的增强，每个request请求可以随机的混杂在一起，接收方可以根据request的id将request再归属到各自不同的服务端请求里面，另外多路复用中也支持了流的优先级，允许客户端告诉服务器那些内容是更优先级的资源，可以优先传输，

##  浏览器在生成页面的时候，会生成那两颗树？

### 参考回答：

构造两棵树，DOM树和CSSOM规则树

当浏览器接收到服务器相应来的HTML文档后，会遍历文档节点，生成DOM树，

CSSOM规则树由浏览器解析CSS文件生成，



## 18、W3C标准包括

结构化标准语言html，xml

表现标准语言css

行为标准语言DOM，ES

## 19、网页结构

header、footer，section，article，aside，nav

## 20、ETag

ETag：它是文档版本的标识符。通常是内容的 MD5 值，不过它也可以包含其他内容，代表的是文档的版本/日期，如： 1.0 或者 2017-10-30。这里注意一点是，它必须用双引号括起来，如：ETag: “d3b0756geyg42sd3edec49eaa6238ad5ff00”。

etag：每个文件有一个，改动文件了就变了，就是个文件hash，每个文件唯一，就像用webpack打包的时候，每个资源都会有这个东西，如： app.js打包后变为 app.c20abbde.js，加个唯一hash，也是为了解决缓存问题。



etag和 last-modified，在下次请求时在 request header 就把这两个带上，服务端把你带过来的标识进行对比，然后判断资源是否更改了






## 21、CND

![q333.png](http://shp.qpic.cn/txdiscuz_pic/0/_bbs_qcloud_com_forum_201501_26_193741fjrd8g08gvhrrygr.png/0)



## 22、TCP

![img](https://t10.baidu.com/it/u=2590032753,2466318043&fm=173&app=49&f=JPEG?w=640&h=716&s=E7F239D247AFCCEA106594580300D072)



## 23、废弃标签及替代方法

u，underline的首字母，但是单单看一个字母u，没有语义，所以被废弃了。

等等。

大部分是语义问题。

替代方法。通过css改变样式

<strong>=<b> :定义重要性强调的文字 adfaf **bbb** **strong** *em* *iii*

<em>=<i> ：定义强调的文字

<ins>=<u>：定义插入的文字

<del>=<s>：定义删除的文字



## 24、历史

1995年javascript，

2006年jquery。

2009年angularjs

2013年react开源，vue框架诞生



## 25、`JS` 阻塞 `DOM` 解析（DOM解析，浏览器加载）

DOM 树的构建过程是一个深度遍历过程：当前节点的所有子节点都构建好后才会去构建当前节点的下一个兄弟节点。 



- `CSS` 不会阻塞 `DOM` 的解析，但会阻塞 `DOM` 渲染。
- `JS` 阻塞 `DOM` 解析，但浏览器会"偷看"`DOM`，预先下载相关资源。
- 浏览器遇到 `<script>`且没有`defer`或`async`属性的 标签时，**会触发页面渲染**，因而如果前面`CSS`资源尚未加载完毕时，浏览器会等待它加载完毕在执行脚本。css阻塞js的执行

**script的内容被解析完后，会先把script前面的内容渲染出来，再去解析script后面的内容**，css树解析完了，DOM树也经历了重绘重排（遇到script触发页面渲染）

没有 `defer` 或 `async`，**浏览器会立即加载并执行指定的脚本**，“立即”指的是在渲染该 `script` 标签之下的文档元素之前，也就是说不等待后续载入的文档元素，读到就加载并执行。

有 `async`，加载和渲染后续文档元素的过程将和 `script.js` 的加载与执行并行进行（异步）。

有 `defer`，加载后续文档元素的过程将和 `script.js` 的加载并行进行（异步），但是 **`script.js` 的执行要在所有元素解析完成之后**，`DOMContentLoaded` 事件触发之前完成。

![image-20210323102609958](C:\Users\刘国林\AppData\Roaming\Typora\typora-user-images\image-20210323102609958.png)

## 26、const定义的对象的属性可以改变

```javascript
const P = {a: "12",b: "122"}
P.a = "asdd"
//可以改变。
const保持p的指针不发生改变，但是指向的内容可以改变。
```



## var是函数级作用域，let是块级作用域



## 27、http强缓存和协商缓存

expires强缓存，设置一个到期时间，未到期之前都不用重新获取。

强缓存相关字段有expires，cache-control。如果cache-control与expires同时存在的话，cache-control的优先级高于expires。

last-modified，协商缓存，304，请求服务器是否修改。



在使用本地缓存前，先与服务器协商，核对缓存文件是否为最新。请求头携带If-None-Match或If-Modified-Since，也可都携带。

## 为什么有了Last-Modified还要用etag？

\1. 防止Last-Modified变了，但文件内容没变的情况下，浏览器需要重新请求服务器

\2. 防止文件在1s内发生变化，而Last-Modified不变



**cache-control > expires > etag > last-Modified**







## ES6新特性

![preview](https://pic4.zhimg.com/v2-b7be6584d9abff093cb5b177d675832f_r.jpg)



## 29、Promise



promise是ES6才出来的，主要是放在函数里面使用吧。主要是利用它的回调函数。then。

promise的构造函数有两个参数，一个是resolve，一个是reject。异步回调用then。

## 30、快速排序算法

- 选第一个为中间数temp。
- 左边i，向右遍历。右遍j，先左遍历。（第一个i就是选中的temp）
- arr[j]与temp比较。比temp小，就放入arr[i]里面。比temp大就不动。
- 



```c++
// Quick_Sort.cpp : Defines the entry point for the application.
// 快速排序算法

#include "stdafx.h"
#include<iostream>
using namespace std;

//快速排序算法(从小到大)
//arr:需要排序的数组，begin:需要排序的区间左边界，end:需要排序的区间的右边界
void quickSort(int *arr,int begin,int end)
{
	//如果区间不只一个数
	if(begin < end)
	{
		int temp = arr[begin]; //将区间的第一个数作为基准数
		int i = begin; //从左到右进行查找时的“指针”，指示当前左位置
		int j = end; //从右到左进行查找时的“指针”，指示当前右位置
		//不重复遍历
		while(i < j)
		{
			//当右边的数大于基准数时，略过，继续向左查找
			//不满足条件时跳出循环，此时的j对应的元素是小于基准元素的
			while(i<j && arr[j] > temp)
				j--;
			//将右边小于等于基准元素的数填入右边相应位置
			arr[i] = arr[j];
			//当左边的数小于等于基准数时，略过，继续向右查找
			//(重复的基准元素集合到左区间)
			//不满足条件时跳出循环，此时的i对应的元素是大于等于基准元素的
			while(i<j && arr[i] <= temp)
				i++;
			//将左边大于基准元素的数填入左边相应位置
			arr[j] = arr[i];
		}
		//将基准元素填入相应位置
		arr[i] = temp;
		//此时的i即为基准元素的位置
		//对基准元素的左边子区间进行相似的快速排序
		quickSort(arr,begin,i-1);
		//对基准元素的右边子区间进行相似的快速排序
		quickSort(arr,i+1,end);
	}
	//如果区间只有一个数，则返回
	else
		return;
}
int main()
{
	int num[12] = {23,45,17,11,13,89,72,26,3,17,11,13};
	int n = 12;
	quickSort(num,0,n-1);
	cout << "排序后的数组为：" << endl;
	for(int i=0;i<n;i++)
		cout << num[i] << ' ';
	cout << endl;
	system("pause");
	return 0;
}


```





## 31、节流和抖动

流指的都是某个函数在一定时间间隔内只执行**第一次**回调。举个常见的节流案例：我们把某个表单的提交按钮——button 设成每三秒内最多执行一次 click 响应；当你首次点击后，函数会无视之后三秒的所有响应；三秒结束后，button 又恢复正常 click 响应功能，以此类推。

防抖动就是利用类似于节流的手段——无视短时间内重复回调，避免浏览器发生抖动现象的技术。限流和防抖动在设计思想上一脉相承，只是限流是在某段时间内只执行**首次**回调，而防抖动通常是只执行**末次**回调。

```text
防抖——触发高频事件后 n 秒后函数只会执行一次，如果 n 秒内高频事件再次被触发，则重新计算时间；
function debounce(fn) {
     let timeout = null; // 创建一个标记用来存放定时器的返回值
     return function () {
       clearTimeout(timeout); // 每当用户输入的时候把前一个 setTimeout clear 掉
       timeout = setTimeout(() => { // 然后又创建一个新的 setTimeout, 这样就能保证输入字符后的 interval 间隔内如果还有字符输入的话，就不会执行 fn 函数
         fn.apply(this, arguments);
       }, 500);
     };
   }
   function sayHi() {
     console.log('防抖成功');
   }
   var inp = document.getElementById('inp');
   inp.addEventListener('input', debounce(sayHi)); // 防抖

节流——高频事件触发，但在 n 秒内只会执行一次，所以节流会稀释函数的执行频率。
function throttle(fn) {
     let canRun = true; // 通过闭包保存一个标记
     return function () {
       if (!canRun) return; // 在函数开头判断标记是否为 true，不为 true 则 return
       canRun = false; // 立即设置为 false
       setTimeout(() => { // 将外部传入的函数的执行放在 setTimeout 中
         fn.apply(this, arguments);
         // 最后在 setTimeout 执行完毕后再把标记设置为 true(关键) 表示可以执行下一次循环了。当定时器没有执行的时候标记永远是 false，在开头被 return 掉
         canRun = true;
       }, 500);
     };
   }
   function sayHi(e) {
     console.log(e.target.innerWidth, e.target.innerHeight);
   }
   window.addEventListener('resize', throttle(sayHi));
```

## 32、深克隆和浅克隆

对于基本数据类型而言，把a的值赋值给b后，a的修改，不会影响到b。

对于引用数据类型而言，把arr1赋值给arr2后，arr1的修改，会影响到arr2对应的值

基本数据类型是直接存储在**栈内存**中的，而引用数据类型，则仅仅是把地址存储在**栈内存**中,真正的数据是存储在**堆内存**中的，赋值操作时，仅仅把地址进行了赋值。

浅克隆直接赋值。

深克隆方法：

1、递归、循环，把原对象的每一个属性赋值给新对象

2、原对象转JSON字符串，字符串解析赋值给新对象。

## 33、js垃圾回收机制

**javascript垃圾回收机制原理：**

解决内存的泄露，垃圾回收机制会定期（周期性）找出那些不再用到的内存（变量），然后释放其内存。

现在各大浏览器通常采用的垃圾回收机制有两种方法：**标记清除，引用计数。**

- 标记清除

除了闭包和环境内的变量不被标记，其他变量被标记。带标记的被视为准备删除的目标，下一周期就回收它。

```javascript
function test(){
    var a = 10;    //被标记"进入环境",,声明的时候。调用函数的时候，函数运行的时候
    var b = "hello";    //被标记"进入环境"
}
test();    //执行完毕后之后，a和b又被标记"离开环境"，被回收
```





- 引用计数

如果一个值的引用次数为0，则被回收。

```javascript
let a = [1,2]//[1,2]被a引用
a = null//a 不引用了，【1，2】被回收

```



## 数据库并发操作产生冲突怎么办

悲观锁和乐观锁，

悲观锁，本次操作中，不允许其他操作进行，影响性能

乐观锁，每次操作版本号加一，版本号对比



## 34、堆和栈

栈存局部变量，堆存对象。

全局变量在静态存储区。

地址在栈中，数据在堆中。

**静态存储区：**
一定会存在的而且会永恒存在、不会消失，这样的数据包括常量、常变量（const 变量）、静态变量、全局变量等。
静态 、常量、全局变量就是存放在静态存储区，他们在程序编译完成后就已经分配好了，生命周期持续至程序结束。



栈:在Windows下,栈是向低地址扩展的数据结构,是一块连续的内存区域.即栈顶的地址和栈的最大容量是系统预先规好的。栈的大小是1M,如果申请空间超过栈的剩余空间时,将提示overflow.因此,能从栈获得的空间较小。

​    堆:堆是向高地址扩展的数据结构,是不连续的内存区域.这是因为系统是用链表来存储空闲内存地址的,自然是不连续的,而链表的遍历方向是由低地址向高地址.堆得大小受限于计算机系统中有效地虚拟内存.由此可见,堆获得的空间比较灵活,也比较大。

## 35、搜索算法

### 1、DFS/BFS

dfs：深度搜索

用递归，设置一个访问标志。

不断的深入，往一个方向递归。直到底部。找兄弟，对兄弟进行深度递归。



bfs：

设置一个访问标志，一个队列。

顶点入队列。

取出队列的点。找他的儿子。并入队列。

再从队列取点。找儿子。







### 2、剪枝搜索

加一个if判断，遇到明显不符合的直接break；或者return。



### 3、记忆化搜索

把已经搜索过的结果保存起来。

计算新的结果的时候，先在数组里面找有没有。

如果有，就是已经计算过，不必再次计算，直接取就行。

递归时候用。



## 死锁是什么

多个并发进程因争夺系统资源而产生相互等待的现象。

1、互斥条件：一个资源每次只能被一个进程使用；

2、请求与保持条件：一个进程因请求资源而阻塞时，对已获得的资源保持不放；

　　3、不剥夺条件:进程已获得的资源，在末使用完之前，不能强行剥夺；

　　4、循环等待条件:若干进程之间形成一种头尾相接的循环等待资源关系；



## 36、前端性能优化

**嵌套标签越多，解析越慢。**。少用嵌套。

#### JS操作真实DOM的代价！vDOM打包更新操作，一次性更新到真实DOM中。在dom发生变化的时候县对虚拟dom进行操作，通过dom diff算法将虚拟dom和原虚拟dom的结构做对比，最终批量的去修该真实的dom结构，尽可能的避免了频繁修改dom而导致的频繁的重排和重绘。





## 39、seo优化

1、title，keyword，descrip

2、语义化标签

3、图片alt

4、高质量外链

5、网页响应速度



### 1.浏览器页面有哪三层构成，分别是什么，作用是什么?

结构层，表示层和行为层。

分别对应，html，css，js

HTML实现页面结构、CSS完成页面的表现与风格、JavaScript实现客户端的一些功能和业务

### 2.HTML5的优点与缺点？

- 网络标准统一，W3C推荐出来的
- 多设备，跨平台
- 即时更新
- 提出新的标签
- 对SEO比较友好
- 调用native手机原生功能

缺点：

- webstorage，websocket安全性不够
- 浏览器的兼容性不够，旧版浏览器不兼容
- 



### 3.Doctype作用? 严格模式与混杂模式如何区分？它们有何意义?

DOctype定义文件类型，告诉浏览器这个文件的类型，然后用什么规范来解析这个文档。

Doctype必须声明在HTML文档的第一行

**严格模式：**浏览器按照W3C标准解析代码

**混杂模式：**浏览器用自己的方式解析代码

区分：有没有Doctype。有就是严格模式



### 4.HTML5有哪些新特性、移除了哪些元素？

拖放，语义化标签：如header，section，article这些。

还可以导入音频，视频。

画布，canvas，可以用js来画图。

还有localstorage，sessionstorage等存储技术。

webworker，websocket这些新技术。



移除元素：big，basefont，tt，u，还有frame这些。





### 5.你做的网页在哪些浏览器测试过,这些浏览器的内核分别是什么?

IE内核：trident

还有苹果那个浏览器：webkit

chrome浏览器：Blink内核

还有火狐浏览器的gecko内核。

内核：渲染引擎，对网页语法的解释

### 7.说说你对HTML5认识?（是什么,为什么）

html5是新一代的html标准，支持很多新的特性，也移除了一些不好用，不常用的特性。

我觉得h5最强大的特性就是跨平台性吧，h5是为了适应移动互联网而产生的。以前的h4网页标准不统一，影响发展。h5比h4更简单，易于编程。

语义化

### 8.对WEB标准以及W3C的理解与认识?

**web标准一般是将该三部分独立分开，使其更具有模块化**

web标准一般是将该三部分独立分开，使其更具有模块化。但一般产生行为时，就会有结构或者表现的变化，也使这三者的界限并不那么清晰。

**W3C对web标准提出了规范化的要求，也就是在实际编程中的一些代码规范**：包含如下几点

1.对于结构要求：（标签规范可以提高搜索引擎对页面的抓取效率，对SEO很有帮助）

**1）。标签字母要小写**

**2）。标签要闭合**

**3）。标签不允许随意嵌套**
**尽量使用外链css样式表和js脚本**

**样式尽量少用行间样式表。**



### 9.HTML5行内元素有哪些,块级元素有哪些, 空元素有哪些?

块级元素：独占一行，display:block

```javascript
h1-h6\p\div\列表
```

行内元素：不独占一行，inline

```javascript
span \a\img\strong...
```

行内元素可以包含在块级元素中，反之不能。

可以通过display来修改。



### 10.什么是WebGL,它有什么优点?

WebGL（全写 WebGraphics Library ）是一种 3D 绘图标准 。

是js和openGL的结合。

WebGL 可以为 HTML5 Canvas 提供硬件 3D 加速渲染，



### 11.请你描述一下 cookies，sessionStorage 和 localStorage 的区别?



### 12.说说你对HTML语义化的理解?

**用正确的标签做正确的事情。**html语义化让页面的内容结构化，结构更清晰，**便于对浏览器，搜索引擎解析**；即使在没有css样式的情况下，也以一种文档格式显示，并且是容易阅读的；搜索引擎的爬虫也依赖于HTML标记来确定上下文和各个关键字的权重**，利于SEO**；使阅读源代码的人对网站更容易将网站分块，**便于阅读维护理解。**

### 13.link和@import的区别?



link引用的CSS会同时被加载，而@import引用的CSS会等到页面全部被下载完再被加载。



@import是CSS2.1提出的，所以老的浏览器不支持，@import只有在IE5以上的才能识别，而link标签无此问题。

当使用javascript控制dom去改变样式的时候，只能使用link标签，因为@import不是dom可以控制的.

### 14.说说你对SVG理解?

SVG**可缩放矢量图形（** Scalable Vector Graphics ）是基于可扩展标记语言（ XML ），用于描述二维矢量图形的一种图形格式

SVG文件比那些 GIF 和 JPEG 格式的**文件要小很多**



### 15.HTML全局属性(global attribute)有哪些?

accesskey:设置快捷键，提供快速访问元素如aaa在windows下的firefox中按alt + shift + a可激活元素

**class**:为元素设置类标识，多个类名用空格分开，CSS和javascript可通过class属性获取元素

contenteditable: 指定元素内容是否可编辑

contextmenu: 自定义鼠标右键弹出菜单内容

**data-***: 为元素增加自定义属性

dir: 设置元素文本方向

draggable: 设置元素是否可拖拽

dropzone: 设置元素拖放类型： copy, move, link

hidden: 表示一个元素是否与文档。样式上会导致元素不显示，但是不能用这个属性实现样式效果

**id: 元素id**，文档内唯一

lang: 元素内容的语言

spellcheck: 是否启动拼写和语法检查

**style: 行内**css样式

tabindex: 设置元素可以获得焦点，通过tab可以导航

**title:** 元素相关的建议信息

translate: 元素和子孙节点内容是否需要本地化


### 16.说说超链接target属性的取值和作用？

17.data-属性的作用是什么？
18.介绍一下你对浏览器内核的理解？
19.常见的浏览器内核有哪些？
20.iframe有那些缺点？
21.Label的作用是什么，是怎么用的？
22.如何实现浏览器内多个标签页之间的通信?
23.如何在页面上实现一个圆形的可点击区域？
24.title与h3的区别、b与strong的区别、i与em的区别？
25.实现不使用 border 画出1px高的线，在不同浏览器的标准模式与怪异模式下都能保持一致的效果？
26.HTML5标签的作用?(用途)
27.简述一下src与href的区别？
28.谈谈你对canvas的理解？
29.WebSocket与消息推送？
30.mg的title和alt有什么区别？
31.表单的基本组成部分有哪些，表单的主要用途是什么？
32.表单提交中Get和Post方式的区别？
33.HTML5 有哪些新增的表单元素？
34.HTML5 废弃了哪些 HTML4 标签？
35.HTML5 标准提供了哪些新的 API？
36.HTML5 存储类型有什么区别？
37.HTML5 应用程序缓存和浏览器缓存有什么区别？
38.HTML5 Canvas 元素有什么用？
39.除了 audio 和 video，HTML5 还有哪些媒体标签？
40.HTML5 中如何嵌入视频？
41.HTML5 中如何嵌入音频？
42.新的 HTML5 文档类型和字符集是？



### 43、html和xhtml的区别

1.所有的标记都必须要有一个相应的结束标记

2.所有标签的元素和属性的名字都必须使用小写

3.所有的XML标记都必须合理嵌套

4.所有的属性必须用引号""括起来

5.把所有<和&特殊符号用编码表示

6.给所有属性赋一个值

7.不要在注释内容中使“--”

8.图片必须有说明文字（BY三人行慕课）

## 44、css-table

但table及其内部元素除外，它可能需要多次计算才能确定好其在渲染树中节点的属性，通常要花3倍于同等元素的时间。这也是为什么我们要避免使用table做布局的一个原因。













































# 前端知识专攻



## 1、前端性能优化的方法

- 减少请求的数量，避免过多的请求
- 对图片资源进行处理，转成base64编码，或者把多个图片弄成雪碧图。
- 减少重定向，重定向会延迟html文档的传输，影响用户体验。如果要使用重定向就使用301永久重定向，少用302临时重定向。
- 使用缓存，对一些经常要用的数据进行缓存，避免重复请求。
- 对于css的导入尽量用link标签导入，不用@import
- 对资源进行压缩处理，css，html，js，图片等资源都可以进行压缩。

**优化网络连接**

- 使用CDN，实时地根据网络状态，将用户的请求重新导向离用户最近的服务节点上
- 使用DNS预解析，提前解析之后可能会用到的域名，使解析结果缓存到`系统缓存`中，缩短DNS解析时间，来提高网站的访问速度。

```html
<link rel="dns-prefecth" href="https://www.google.com">
<link rel="dns-prefecth" href="https://www.google-analytics.com">
```

**优化资源加载**

- 

减少算法时间复杂度

减小作用域，因为作用域链，要遍历

**减少重绘与回流**

**DOM优化**

1、缓存DOM

　　2、减少DOM深度及DOM数量

标签元素越多，标签的层级越深，浏览器解析DOM并绘制到浏览器中所花的时间就越长

3、批量操作DOM

　4、批量操作CSS样式

　9、防抖和节流

**兼容性和适配性优化**

**安全性优化**

**SEO搜索引擎优化**

加入Meta标签，主要有title、description、keywords三个地方，其余的meta标签不加也没事。就重要性而言，title在页面优化中绝对占据很重要的位置。

## 2、箭头函数注意点

（1）**函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象**。

（2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。

（3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。

（4）不可以使用yield命令，因此箭头函数不能用作 Generator 函数。



1) 当形参有且只有一个的时候,可以省略小括号

2)当代码体只有一条语句的时候可以省略花括号



## 3、px、em、rem、vh、vw单位

 viewpoint height，视窗高度，1vh=视窗高度的1%

viewpoint width，视窗宽度，1vw=视窗宽度的1%

vmin，vw和vh中较小的那个。

vmax，vw和vh中较大的那个。

em，它是描述相对于应用在当前元素的字体尺寸，所以它也是相对长度单位。一般浏览器字体大小默认为16px，则2em == 32px；

rem是根元素是尺寸。

% 是相对于父元素的大小设定的比率
vw (viewport width) vh (viewport height) 是视窗的大小，100vw = 100%视窗宽度 100vh = 100%视窗高度，用vw，vh设定的大小只和视窗大小有关，所以用来开发多种屏幕设备的应用用这个单位还是挺合适的。





## 4、flexible.js移动端适配



阿里开源。

源代码：

```javascript
;(function(win, lib) {
 var doc = win.document
 var docEl = doc.documentElement
 var metaEl = doc.querySelector('meta[name="viewport"]')
 var flexibleEl = doc.querySelector('meta[name="flexible"]')
 var dpr = 0
 var scale = 0
 var tid
 var flexible = lib.flexible || (lib.flexible = {})
 
 if (metaEl) {
  console.warn('将根据已有的meta标签来设置缩放比例')
  var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/)
  if (match) {
   scale = parseFloat(match[1])
   dpr = parseInt(1 / scale)
  }
 } else if (flexibleEl) {
  var content = flexibleEl.getAttribute('content')
  if (content) {
   var initialDpr = content.match(/initial\-dpr=([\d\.]+)/)
   var maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/)
   if (initialDpr) {
    dpr = parseFloat(initialDpr[1])
    scale = parseFloat((1 / dpr).toFixed(2))
   }
   if (maximumDpr) {
    dpr = parseFloat(maximumDpr[1])
    scale = parseFloat((1 / dpr).toFixed(2))
   }
  }
 }
 
 if (!dpr && !scale) {
  var isAndroid = win.navigator.appVersion.match(/android/gi)
  var isIPhone = win.navigator.appVersion.match(/iphone/gi)
  var devicePixelRatio = win.devicePixelRatio
  if (isIPhone) {
   // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
   if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
    dpr = 3
   } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
    dpr = 2
   } else {
    dpr = 1
   }
  } else {
   // 其他设备下，仍旧使用1倍的方案
   dpr = 1
  }
  scale = 1 / dpr
 }
 
 docEl.setAttribute('data-dpr', dpr)
 if (!metaEl) {
  metaEl = doc.createElement('meta')
  metaEl.setAttribute('name', 'viewport')
  metaEl.setAttribute(
   'content',
   'initial-scale=' +
    scale +
    ', maximum-scale=' +
    scale +
    ', minimum-scale=' +
    scale +
    ', user-scalable=no'
  )
  if (docEl.firstElementChild) {
   docEl.firstElementChild.appendChild(metaEl)
  } else {
   var wrap = doc.createElement('div')
   wrap.appendChild(metaEl)
   doc.write(wrap.innerHTML)
  }
 }
 
 function refreshRem() {
  var width = docEl.getBoundingClientRect().width
  if (width / dpr > 540) {
   width = 540 * dpr
  }
  var rem = width / 10
  docEl.style.fontSize = rem + 'px'
  flexible.rem = win.rem = rem
 }
 
 win.addEventListener(
  'resize',
  function() {
   clearTimeout(tid)
   tid = setTimeout(refreshRem, 300)
  },
  false
 )
 win.addEventListener(
  'pageshow',
  function(e) {
   if (e.persisted) {
    clearTimeout(tid)
    tid = setTimeout(refreshRem, 300)
   }
  },
  false
 )
 
 if (doc.readyState === 'complete') {
  doc.body.style.fontSize = 12 * dpr + 'px'
 } else {
  doc.addEventListener(
   'DOMContentLoaded',
   function(e) {
    doc.body.style.fontSize = 12 * dpr + 'px'
   },
   false
  )
 }
 
 refreshRem()
 
 flexible.dpr = win.dpr = dpr
 flexible.refreshRem = refreshRem
 flexible.rem2px = function(d) {
  var val = parseFloat(d) * this.rem
  if (typeof d === 'string' && d.match(/rem$/)) {
   val += 'px'
  }
  return val
 }
 flexible.px2rem = function(d) {
  var val = parseFloat(d) / this.rem
  if (typeof d === 'string' && d.match(/px$/)) {
   val += 'rem'
  }
  return val
 }
})(window, window['lib'] || (window['lib'] = {}))

```

1. 获取文档对象
2. 获取viewport视口
3. 查看meta标签中是否设置了scale，初始化缩放。
4. 如果有就过去缩放倍数，设置dpr为scale分之一。
5. 查看meta中是否有flexible，有就设置dpr和scale
6. 如果没有设置meta，获取设备的dpr，
7. 设置data-dpr，dpr
8. 创建meta标签，name是viewport视口，设置宽度和缩放倍数。
9. 创建refleshRem函数（改变根元素的字体号）宽度的1/10
10. 添加两个监听器来触发relfeshRem函数，更新rem的值
11. html加载解析完成后设置body的字体大小
12. 调用releshRem函数



DPR：用多少个物理像素来渲染一个css像素

flexible就是根据dpr来设置缩放，然后通过窗口大小来改变根元素的字体大小，从而改变rem单位的大小。



在开发移动端的过程中，如何频繁的去计算rem和px之间的转换时一件非常麻烦的过程，接下来提供一个vue框架可以自动转换

一、安装lib-flexible依赖

```javascript
npm install lib-flexible --save
```

二、引入lib-flexible依赖
main.js中添加以下代码

```javascript
import 'lib-flexible/flexible'
三、配置meta 标签内容
```

<meta name="viewport" content="width=device-width,initial-scale=1.0, maximum-scale=1.0,user-scalable=no">
1
四、安装px2rem-loader依赖
npm install px2rem-loader --save-dev
1
五、配置相关px2rem-loader
在build下的 utils.js文件下，添加以下代码


![在这里插入图片描述](https://img-blog.csdnimg.cn/20190902114137580.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTEyMjEyMA==,size_16,color_FFFFFF,t_70)

```javascript
 const px2remLoader = {
    loader: 'px2rem-loader',
    options: {
      remUnit: 75
    }
  }
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190902114201907.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTEyMjEyMA==,size_16,color_FFFFFF,t_70)








## 5、VUE的生命周期

**创建、数据初始化、挂载、更新、销毁**



先是通过构造函数创建Vue，然后init初始化，初始化之后是create创建，create之前还有一个beforecreate。然后是挂载vue，挂载之后是构建和渲染DOM树，然后创建虚拟DOM，然后完成挂载。最后是destroy销毁。

在init初始化的时候：**props => methods =>data => computed => watch**; 完成这些的初始化，



具体方法：

init（props，methods）

 beforeCreate

  created

（解析渲染DOM）

  beforeMount

  mounted（完成虚拟DOM的创建）

  (

​     beforeUpdate

​     updated

   )

  beforeDestroy

  destroyed



运行顺序（methods、computed、data、watch）

![img](https://upload-images.jianshu.io/upload_images/13119812-5890a846b6efa045.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)











## 6、项目介绍



面试官你好，我是合肥工业大学软件工程专业22届本科生，我叫刘国林。

我想面试的是贵公司的ui开发岗位，在校期间做过基于vue框架和ssm框架的一些项目，

熟练掌握html，css，和js，对移动端h5也有一定的了解。



我觉得我有能力胜任这个岗位的工作，非常希望有机会能加入到腾讯之中。

我的实习周期在七个月以上。也非常希望通过这次实习，然后通过转正留下来。



老家是广西玉林的，父母也在深圳工作。所以我也是希望能在深圳发展的。



最关心的问题就是如果顺利的话，offer什么时候能下来了



1、小说阅读器

这个项目是基于vue开发的一个h5+app，主要功能是本地小说的导入阅读，和网络小说的爬取。





问：这个项目的难点是什么？

我觉得难不难主要看对于谁而言吧，对于当时的我来说都挺难的，很多知识点都不懂，每一步都要去学习。其实做这个项目也就是一个自我学习的过程。

但是当你做完之后，回头一看，发现它也不是很难。做过之后学到了更多的知识之后，就不难了。

对我来说，我觉得这个项目主要有两个难点。一个是本地小说的导入阅读。一个是js做网络爬虫。



本地小说的导入阅读主要是一个储存问题，用户选择导入的文件之后，怎么把这个文件缓存起来。刚开始我用的是localstorage，后来我发现，localstorage最多只有5M作用的存储大小，这肯定是不够的。所以要去寻找新的解决方案。

后来才发现，可以用indexedDB数据库来储存。有了储存方案之后，就是分章节的问题。分章节用的是正则表达式进行划分，然后分章节储存起来。



然后是网络小说的爬取。我当时的想法是直接用js在前端做一个爬虫，去爬取其他小说网站的数据，到自己的页面中来。可是由于这个浏览器同源策略的影响，直接调用不同域名，端口，或者协议的数据会存在跨域。我当时在网上研究了很多方法，都没能实现。什么CORS，jsonp，不是只在开发环境中可行就是需要两个页面进行配合。我可以画图介绍一下我的方法吗？

这是我的网页，这是目标网页。一般来说跨域传输数据是需要两个页面相互配合的是可以实现的，但现在只有这个网页是我的，目标网页是别人的。我先到目标网页中去，在目标网页中嵌入并执行一段js代码，把需要的数据保存到系统中。然后直接从系统中获取数据。我是通过这样实现的。



2、vue+ssm的考务管理系统。

这个系统主要是根据这个考试，分配监考老师去具体的考场监考。这个项目还是挺简单的。前后端我都有做，后端主要是数据库的增删查改。前端就是提交数据和显示信息。核心业务算法只有一个，就是根据一定的规则对老师进行分配，这个是其他组员做的。



其实对于这个项目，学校的目的主要是让我们熟悉git团队协作的流程。

功能开发工作流。









## 7、跨域方法与同源策略



### 1、JSONP跨域（手写jsonp）

利用**`<script>`标签没有跨域限制**，通过`<script>`标签src属性，发送带有callback参数的GET请求，服务端将接口返回数据拼凑到callback函数中，返回给浏览器，浏览器解析执行，从而前端拿到callback函数返回的数据。


```javascript
  script.src = 'http://www.domain2.com:8080/login?user=admin&callback=handleCallback';
    document.head.appendChild(script);

    // 回调执行函数
    function handleCallback(res) {
        alert(JSON.stringify(res));
    }

```

jquery的ajax还有axios封装好了，把请求方式写成jsonp，然后指定回调函数就行。



### 2、CORS跨域资源共享

SSM框架中，新建一个配置文件，使用注解配置。

指定允许跨域的域名或者ip地址。

ACCESS-CONTROL-ALLOW-ORIGIN

### 3、nginx代理配置

恩举克斯

代理跨域

```js
module.exports = {
	devServer: {
	port: 8888, // 端口号，如果端口号被占用，会自动提升1 		host: "localhost", //主机名， 127.0.0.1， 真机 0.0.0.0
	https: false, //协议 open: true, //启动服务时自动打开浏览器访问
	proxy: { // 匹配 /dev-api 开头的请求， 
		'/dev-api': { // 目标服务器, 代理访问到 https://localhost:8001 
			target: 'http://localhost:8001', 
			// 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据， 
			// 并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
			changOrigin: true, //开启代理
			pathRewrite: { 
			// 会将 /dev-api 替换为 '',也就是 /dev-api 会移除， 
			// 如 /dev-api/db.json 代理到 https://localhost:8080/db.json 
			'^/dev-api': '', 
			}
		}
	}
}, 
//就算没有corss返回的头部Access-Control-Allow-Origin: 的允许，一样可以，因为进行替换请求url，浏览器认为它是同源的。
```



### 5、document.domain+iframe

适合主域名相同，子域名不同的。

### 6、window.name

需要两个页面配合

### 7、websocket

建立全双工连接。

### 8、postMessage

两个页面发送数据。

添加message监听器，接收数据。





## 9、node.js

node.js就是运行在服务端的JavaScript。

可以用js做服务端语言。不用在浏览器，就可以直接运行js程序。



## 13、DOM树的构建方法

收到字节流，转换成字符流，输入解析。解析token节点，通过栈进行dom树的构建。

1）HTMLInputStream负责HTML数据的输入；

2）HTMLTokenlizer根据输入的数据流把HTML进行tokenlize；

3）HTMLTreeBuilder根据输入的token进行建树、完成树的构建；



DOM树是通过栈来构建的。

解析html标签，通过进栈出栈来完成树的构建。

![在这里插入图片描述](https://www.freesion.com/images/485/99c25b7dde77aa2c12e199837528da05.png)



## 14、移动端适配方案

在屏幕宽度过大时不再缩放，也会用到媒体查询，并且**响应式设计更多地可能是针对不同设备间的自适应**。对于移动端web页面的自适应方案来说，**现在用的比较多的是`rem`**，**逐渐向`vw/vh`发展**，而`rem+vw/vh`则是作为`vw/vh`向后兼容的一种过渡

> 获取dpr

js中通过**`window.devicePixelRatio`**获取，css中通过`-webkit-device-pixel-ratio`,`-webkit-min-device-pixel-ratio`,`-webkit-max-device-pixel-ratio`进行媒体查询。

1、百分比

2、rem，flexible

3、vh/vm

4、基于媒体查询的响应式设计

### 1像素问题

1px在屏幕上显示2px。dpr不同。

1、响应式处理（transform）

@media only screen and (-webkit-min-device-pixel-ratio: 2) {  .div:before {    -webkit-transform: scaleY(0.5);            transform: scaleY(0.5);  } }

2、先将页面缩小，在调整根元素字体号

将真个页面缩小dpr倍，再将页面的根字体放大dpr倍



### 横屏问题

设置页面宽度等于设备高度，一致认为横屏时让 `width=height` 体验比较好。

js检测横屏时候，设置另一套方法。

## 15、图片适配问题



如果想要针对不同屏幕，使用不同分辨率版本和尺寸的图片，使用属性`srcse` 和 `sizes` 。[srcset](https://links.jianshu.com/go?to=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FLearn%2FHTML%2FMultimedia_and_embedding%2FResponsive_images) 定义了允许浏览器选择的图像集，以及每个图像的大小（使用w单位）。`sizes`定义了一组媒体条件（例如屏幕宽度），指明当某些媒体条件为真时，什么样的图片尺寸是最佳选择。

```html
<img srcset="foo-320w.jpg,
             foo-480w.jpg 1.5x,
             foo-640w.jpg 2x"
     src="foo-640w.jpg">
     <!--srcset属性给出了三个图像URL，适应三种不同的像素密度， 后面的像素密度描述符，格式是像素密度倍数 + 字母x。1x表示单倍像素密度，可以省略。-->
```

```html
<img srcset = "elva-fairy-320w.jpg 320w,
               elva-fairy-480w.jpg 480w,
               elva-fairy-800w.jpg 800w"
     sizes = "(max-width: 320px) 280px,
              (max-width: 480px) 440px,
              800px"
     src = "elva-fairy-800w.jpg" alt="Elva dressed as a fairy">
```

> 浏览器的查询过程：

- 查看设备宽度；
- 检查`sizes`列表中哪个媒体条件是第一个为真；
- 查看给予该媒体查询的槽大小；
- 加载`srcset`列表中引用的最接近所选的槽大小的图像

#### img异步加载

> **< img> 引入的图片，使用js自带的异步加载图片。**根据不同的`dpr`，加载不同分辨率的图片。



```html
<img id="img" data-src1x="xxx@1x.jpg" data-src2x="xxx@2x.jpg" data-src3x="xxx@3x.jpg"/>
```

```javascript
var dpr = window.devicePixelRatio;
if(dpr > 3){
    dpr = 3;
};

var imgSrc = $('#img').data('src'+dpr+'x');
var img = new Image();
img.src = imgSrc;
img.onload = function(imgObj){
    $('#img').remove().prepend(imgObj);//替换img对象
};
```



> pictrue标签

```html
<picture>
  <source media="(min-width: 30px)" srcset="cat-vertical.jpg">
  <source media="(min-width: 60px)" srcset="cat-horizontal.jpg">
  <img src="cat.jpg" alt="cat">
</picture>
```

#### Image-set

> **对于背景图片，使用`image-set`根据用户设备的分辨率匹配合适的图像**， 同时要考虑兼容性问题。



```html
<style>
.css {
    background-image: url(1x.png); /*不支持image-set的情况下显示*/
    background: -image-set(
            url(1x.png) 1x,/* 支持image-set的浏览器的[普通屏幕]下 */
            url(2x.png) 2x,/* 支持image-set的浏览器的[2倍Retina屏幕] */
            url(3x.png) 3x/* 支持image-set的浏览器的[3倍Retina屏幕] */
    );
}
</style>
```

#### media query

> **对于背景图片，使用媒体查询自动切换不同分辨率的版本**



```html
<style>
/* 普通显示屏(设备像素比例小于等于1)使用1倍的图 */
.css{
    background-image: url(img_1x.png);
}

/* 高清显示屏(设备像素比例大于等于2)使用2倍图  */
@media only screen and (min-device-pixel-ratio:2){
    .css{
        background-image: url(img_2x.png);
    }
}

/* 高清显示屏(设备像素比例大于等于3)使用3倍图  */
@media only screen and (min-device-pixel-ratio:3){
    .css{
        background-image: url(img_3x.png);
    }
}
</style>
```

## 16、常用布局



### 4、左边固定右边自适应（两栏布局）

左边设置浮动，右边设置外边距

```csharp
HTML
<div class="left"></div>
<div class="right"></div>

CSS
.left{
    float:left;
    width: 200px;
    height:400px;
    background-color: blue;
}

.right{
    height:400px;
    background-color: red;
        margin-left:210px;
}
```

### 4、右边固定左边自适应

一种是margin负值，一种是flex；

左边设置flex：1;就可以；右边固定，父盒子是flex



## flex自适应

自适应的父盒子要给一个确定的高度

```js
<div class="parent">
  <div class="header">
 
  </div>
  <div class="content">
 
  </div>
  <div class="footer">
     
  </div>
</div>
　　
.parent{
  display: flex;
  height: 100vh;
}
.header{
  height: 100px;
}
.content{
  flex: 1;
}
.footer{
  height: 100px;
}
```



## 计算属性自适应

height: calc(100vh - 50px);

需要多次flex自适应的时候，flex：1;并不能实现第二层的高度确定，所以滚动会出问题，所以第一层的flex改成计算属性自适应。





浮动写在前面。

自适应的div，默认一行，设置一个margin就行。

```csharp
HTML
<div class="right"></div>
<div class="left"></div>

CSS
.left{
    height:400px;
    background-color: red;
        margin-right:210px;
}

.right{
    float:right;
    width: 200px;
    height:400px;
    background-color: blue;
}
```

### 5、两边固定中间自适应（三栏布局）

左右都浮动，中间设置边距。

```csharp
HTML:
<div class="left"></div>
<div class="right"></div>
<div class="middle"></div>
CSS:
.left{
    float:left;
    width: 200px;
    height:400px;
    background-color: red;
}

.right{
    float:right;
    width:200px;
    height:400px;
    background-color: blue;
}
.middle{
    height: 400px;
    background-color: yellow;
    margin:0 210px 0 210px;
}
```

### 5.1、圣杯布局（三栏布局）

margin负值，向该方向偏移。可以会覆盖，不会挤下去。

左栏就是margin-left： 100%，向左偏移100%。再relactive偏移自身宽度。因为容器设置了padding。

```csharp
HTML:
<div class="container">
    <div class="middle"></div>
    <div class="left"></div>
    <div class="right"></div>
</div>
CSS:
.container{
    overflow:hidden;
    padding:0 200px;
}
.middle{
    width:100%;
    height:400px;
    float:left;
    background-color: yellow;
}
.left{
    width:200px;
    height:400px;
    float:left;
    background-color: blue;
    margin-left:-100%;（挤上去）
    position:relative;
    left:-200px;
}
.right{
    width:200px;
    height:400px;
    float:left;
    background-color: darkseagreen;
    margin-left:-200px;（挤上去）
    position:relative;
    right:-200px;
}
/*
解决遮挡的代码是：
.container中 padding:0 200px;
.left中 position:relative;left:-200px;
.right中 position:relative;right:-200px;
*/
```

### 5.2、双飞翼布局（三栏布局）

主要内容模块可以优先加载，当页面中内容较多时不会影响用户体验。

```csharp
HTML:
<div class="container">
    <div class="middle">
                 <div id="inside">middle</div>
        </div>
    <div class="left"></div>
    <div class="right"></div>
</div>
CSS:
.container{
    overflow:hidden;
}
.middle{
    width:100%;
    height:400px;
    float:left;
    background-color: yellow;
}
.left{
    width:200px;
    height:400px;
    float:left;
    background-color: blue;
    margin-left:-100%;（挤上去）
}
.right{
    width:200px;
    height:400px;
    float:left;
    background-color: darkseagreen;
    margin-left:-200px;（挤上去）
}
/*解决遮挡*/
#inside{
    margin:0 210px;
    height:400px;
    background-color:red;
}
```

### 5.3、flex布局

调整order

```html
.container{
    display:flex;
    width:100%;
    height:100px;
}
.left{
    flex:0 0 100px;
    order: 0 /*默认为0*/
}
.right{
    flex:0 0 100px;
    order:2
}
.center{
    flex:1 1 auto;
    order:1
}

<div class="container">
        <div class="center" style="background-color:rgb(9, 134, 236)"></div>
    <div class="left" style="background-color:red"></div>
    <div class="right" style="background-color:rgb(6, 235, 44)"></div>
</div>

```

### 5.4、table布局

```html
.container{
    display:table;
    width:100%;
}
.left,.center,.right{
    display:table-cell;
}
.left{
    width:100px;
    height:100px;
}
.right{
    width: 100px;
    height:100px;
}

<div class="container">
    <div class="left" style="background-color:red"></div>
    <div class="center" style="background-color:rgb(9, 134, 236)"></div>
    <div class="right" style="background-color:rgb(6, 235, 44)"></div>
</div> 

```

### 5.5绝对定位布局

父容器position是relactive，子元素随意absolute。

### 6、网格布局






## 18、进程

### 通信

1. 共享存储，共享内存，共享数据结构
2. 消息传递，信号量，FIFO，消息队列
3. 管道通信，管道

### 僵尸进程与孤儿进程

每个进程都有一个对应的PCB，在进程结束时，**会发送一个信号量给父进程，通知父进程该进程已经结束**，并由父进程回收子进程的PCB如果父进程没有接收到这一信号量，子进程的PCB就会一直保存在内存中，变为僵尸进程。
僵尸进程会占用内存，是我们要避免的。
如果**在子进程结束之前父进程已经结束，那么子进程就会变为孤儿进程**。孤儿进程会统一被进程id为1的init进程收留，所以不会产生内存问题。

## 19、Promise

`promise.all`的用法： **传递一个`promise`的数组，当所有的`promise`都完成（`resolved`）,回调所有成功的结果， 或者有一个失败， 回调第一个失败的结果**

```js
async function test() {
  const v1 = await console.log(1);
  await new Promise((resolve,reject)=>{
    console.log('5')
    resolve(7)
    console.log(6)
  }).then(res=>{
    console.log(res)
  })
  console.log(2)
}

test();
console.log(3)
//1,3,5,6,7,2
```

## await

```js

async function test() {
  // const v1 = await console.log(1);
  new Promise((resolve,reject)=>{
    console.log('55')
    resolve(77)
    console.log(66)
  }).then(res=>{
    console.log(res)
  })
  await new Promise((resolve,reject)=>{
    console.log('5')
    resolve(7)
    console.log(6)
  }).then(res=>{
    console.log(res)
  })
  console.log(2)
}

test();
console.log(3)

//55,66,5,6,3,77,7,2
遇到await，先执行跟着的promise，回调放入微任务队列。再跳出函数，执行后面的语句，再
执行回调微任务，再执行await后面的语句
```



# web安全

## cookie如何防范xss攻击

在http头部设置cookie为httponly，secure

**httponly参数是用来限制非HTTP协议程序接口对客户端COOKIE进行访问的，所以客户端脚本，如JS是无法取得这种COOKIE的，同时，JQuery中的“$.cookie('xxx')”方法也无法正常工作，所以想要在客户端取到httponly的COOKIE的唯一方法就是使用AJAX，将取COOKIE的操作放到服务端，接收客户端发送的ajax请求后将取值结果通过HTTP返回客户端。**



## XSS攻击

跨站脚本攻击，注入一段脚本到你的服务器里面，或者放在url链接里面

盗取cookie信息

预防：过滤用户输入，不要相信用户的任何输入

## SQL注入

同样是过滤输入，

对进入数据库的特殊字符进行转移处理

在mapper层进行预编译处理，JDBC，比如mabatis的#和￥

## DDOS攻击

著名的DDOS攻击，发送大量的请求导致服务器瘫痪。

1、备份网站，启动应急，告诉用户受到了攻击，暂时无法访问

2、封IP，大量的请求从一个ip发出，就封掉它（硬件、防火墙、web服务器都可以过滤）

3、带宽扩容，能接受更多的请求

4、cdn分发、用户只允许访问 CDN，如果内容不在 CDN 上，CDN 再向源服务器发出请求。

5、攻击溯源，打回去，报警、线下干掉它

6、检测技术和清洗技术，清除异常流量

7、使用验证码

## SYN攻击(ddoS攻击的一种)

`SYN`攻击指的是，攻击客户端在短时间内伪造大量不存在的IP地址，向服务器不断地发送`SYN`包，服务器回复确认包，并等待客户的确认。由于源地址是不存在的，服务器需要不断的重发直至超时，这些伪造的`SYN`包将长时间占用未连接队列，正常的`SYN`请求被丢弃，导致目标系统运行缓慢，严重者会引起网络堵塞

## CSRF

跨站请求伪造

攻击者盗用了你的身份，以你的名义发送恶意请求。

在没有关闭目标网站的情况下，访问了恶意网站。

目标网站已经和用户建立了信任关系

预防：使用token认证，敏感请求使用验证码，密码等

## 文件上传漏洞

上传文件到服务器

## 不安全的通信

使用https



## 20、正则表达式



### 1、前面的字符至少出现一次+

+号，

```js
runoo+b，可以匹配 runoob、runooob、runoooooob 等
```

### 2、前面的字符可以出现任意次，也可以不出现*

*号

```js
runoo*b，可以匹配 runob、runoob、runoooooob 等
```

### 3、前面的字符只能出现0次或1次,?

?号

```js
colou?r 可以匹配 color 或者 colour
```



### 4、[abc123]显示指定字符

显示指定【】内出现的字符，，

```js
[aeiou] 匹配字符串 "google runoob taobao" 中所有的 e o u a 字母
```

### 5、除了这些字符不匹配

**[^aeiou]** 匹配字符串 "google runoob taobao" 中除了 e o u a 字母的所有字母。

匹配除换行符（\n、\r）之外的任何单个字符，相等于 [^\n\s】。

### 6、匹配一个连续区间

[A-Z] 表示一个区间，匹配所有大写字母，[a-z] 表示所有小写字母。

### 7、匹配所有（空白符和非空白）\s\S

匹配所有。**\s 是匹配所有空白符**，包括换行，\S 非空白符，不包括换行。

### 8、匹配字母数字下划线    \w

匹配字母、数字、下划线。等价于 [A-Za-z0-9_]

### 9、转义字符(特殊字符都需要转义)

```js
runo\*ob 匹配字符串 runo*ob。
```

### 10、特别字符



| 特别字符 | 描述                                                         |
| :------- | :----------------------------------------------------------- |
| $        | 匹配输入字符串的结尾位置。如果设置了 RegExp 对象的 Multiline 属性，则 $ 也匹配 '\n' 或 '\r'。要匹配 $ 字符本身，请使用 \$。 |
| ( )      | 标记一个子表达式的开始和结束位置。子表达式可以获取供以后使用。要匹配这些字符，请使用 \( 和 \)。 |
| *        | 匹配前面的子表达式零次或多次。要匹配 * 字符，请使用 \*。     |
| +        | 匹配前面的子表达式一次或多次。要匹配 + 字符，请使用 \+。     |
| .        | 匹配除换行符 \n 之外的任何单字符。要匹配 . ，请使用 \. 。    |
| [        | 标记一个中括号表达式的开始。要匹配 [，请使用 \[。            |
| ?        | 匹配前面的子表达式零次或一次，或指明一个非贪婪限定符。要匹配 ? 字符，请使用 \?。 |
| \        | 将下一个字符标记为或特殊字符、或原义字符、或向后引用、或八进制转义符。例如， 'n' 匹配字符 'n'。'\n' 匹配换行符。序列 '\\' 匹配 "\"，而 '\(' 则匹配 "("。 |
| ^        | 匹配输入字符串的开始位置，除非在方括号表达式中使用，当该符号在方括号表达式中使用时，表示不接受该方括号表达式中的字符集合。要匹配 ^ 字符本身，请使用 \^。 |
| {        | 标记限定符表达式的开始。要匹配 {，请使用 \{。                |
| \|       | 指明两项之间的一个选择。要匹配 \|，请使用 \|。               |



### 11、匹配次数

| 字符  | 描述                                                         |
| :---- | :----------------------------------------------------------- |
| *     | 匹配前面的子表达式零次或多次。例如，zo* 能匹配 "z" 以及 "zoo"。* 等价于{0,}。 |
| +     | 匹配前面的子表达式一次或多次。例如，'zo+' 能匹配 "zo" 以及 "zoo"，但不能匹配 "z"。+ 等价于 {1,}。 |
| ?     | 匹配前面的子表达式零次或一次。例如，"do(es)?" 可以匹配 "do" 、 "does" 中的 "does" 、 "doxy" 中的 "do" 。? 等价于 {0,1}。 |
| {n}   | n 是一个非负整数。匹配确定的 n 次。例如，'o{2}' 不能匹配 "Bob" 中的 'o'，但是能匹配 "food" 中的两个 o。 |
| {n,}  | n 是一个非负整数。至少匹配n 次。例如，'o{2,}' 不能匹配 "Bob" 中的 'o'，但能匹配 "foooood" 中的所有 o。'o{1,}' 等价于 'o+'。'o{0,}' 则等价于 'o*'。 |
| {n,m} | m 和 n 均为非负整数，其中n <= m。最少匹配 n 次且最多匹配 m 次。例如，"o{1,3}" 将匹配 "fooooood" 中的前三个 o。'o{0,1}' 等价于 'o?'。请注意在逗号和两个数之间不能有空格。 |

以下正则表达式匹配一个正整数，**[1-9]**设置第一个数字不是 0，**[0-9]\*** 表示任意多个数字：



## 贪婪模式和非贪婪模式

```js
let text = '12345678'
let reg = /\d{3,6}?/g
text.replace(reg, 'X')
"XX78"
let text = '12345678'
let reg = /\d{3,6}/g
text.replace(reg, 'X')
"X78"

独占模式，尽可能长，不回溯
```

## 多条件”或“匹配

```js
(abc)|(fff)
|前后不能有空格
```









# git的使用





## git提交冲突

head 到 =======里面的balabala的是自己的commit的内容

=========到 >>>>>>里面的balabala一堆的内容是下拉的内容

修改冲突后，重新commit



## 1、git merge 和git rebase的区别

merge和rebase都是用来合并分支的。

**merge命令不会保留merge的分支的commit**：

使用`merge`命令合并分支，解决完冲突，执行`git add .`和`git commit -m'fix conflict'`。这个时候会产生一个commit。

使用`rebase`命令合并分支，解决完冲突，执行`git add .`和`git rebase --continue`，不会产生额外的commit。这样的好处是，‘干净’，分支上不会有无意义的解决分支的commit；坏处，如果合并的分支中存在多个`commit`，需要重复处理多次冲突。

1. `git pull`和`git pull --rebase`区别：`git pull`做了两个操作分别是‘获取’和合并。所以加了rebase就是以rebase的方式进行合并分支，默认为merge。



rebase可以给你提供一套清晰的代码历史。



相反的, merge会给你一套乱七八糟的代码历史。当你看到这样的代码历史的时候，我相信你绝对没有心情去研究每一个历史对应的代码。



## 2、git fetch 和git pull的区别

git pull = git fetch + git merge

- **相当于fetch的时候本地的master没有变化，但是与远程仓关联的那个版本号被更新了，我们接下来就是在本地合并这两个版本号的代码。**



## 37、git工作流

- 集中式工作流
- 功能开发工作流
- Gitflow工作流
- Forking工作流



## 切换分支

git checkout -b xxx remotes/xxx





3、显示项目的代码行数总和（已经删除文件显示为空）：

```git
git ls-files | xargs cat | wc -l
```



## 查看修改了哪些内容

git show hashcommit



## 块级元素和行内元素

可替换元素的性质同设置了display:inline-block的元素一致





## Settimeout不准的解决方案

原因：时间循环机制，单线程

### 1、webworker

### 2、获取当前时间进行修正



## 判断动画结束

1、监听器webkitAnimationEnd

2、同步记录相同时间

3、vue中的transition的生命周期

## 微信小程序底层

**View视图层、App Service逻辑层，**View层用来渲染页面结构，AppService层用来逻辑处理、数据请求、接口调用，它们在两个进程（两个Webview）里运行。
视图层和逻辑层通过**系统层的JSBridage进行通信，**逻辑层把数据变化通知到视图层，触发视图层页面更新，视图层把触发的事件通知到逻辑层进行业务处理。

小程序的UI视图和逻辑处理是用多个webview实现的，逻辑处理的JS代码全部加载到一个Webview里面，称之为AppService

![img](https://img2020.cnblogs.com/blog/1805573/202003/1805573-20200321110221708-1129307493.png)

**它封装了postMessage方法，实现webview之间的通信**



wa的运行环境有3个平台，IOS的webkit（苹果开源的浏览器内核），Android的X5(QQ浏览器内核)，开发时用的nw.js（C++实现的web转桌面应用）

wa的表现是半native app，半web app

![img](https://img2020.cnblogs.com/blog/1805573/202003/1805573-20200321105908552-71997322.png)

wxml转化为html用的是 https://github.com/facebook/react，而wxss与css基本上没有任何不同



依赖WeixinJSBridge.js这个脚本了



然你就访问不了bom对象啦，当然其他很多对象也不能访问啦。这些对象如果访问，就是undefined。

​    为什么要这样做呢？还不是为了管理和监控嘛。如果这些对象你能访问，那么你就可以像操作通常的网页一样操作wa，这是绝对不被允许的，所以，你懂的。  





JSBridge的作用就是让native可以调用web的js代码，让web可以调用原生的代码，实现数据通信，

将Native端的接口封装成js接口
将Web端js接口封装成原生接口



## 浏览器渲染原理

*display:none 会触发 reflow，而 visibility:hidden 只会触发 repaint，因为没有发现位置变化。*

DOM Tree：浏览器将HTML解析成树形的数据结构。

　　CSS Rule Tree：浏览器将CSS解析成树形的数据结构。

　　Render Tree: DOM和CSSOM合并后生成Render Tree。

　　layout: 有了Render Tree，浏览器已经能知道网页中有哪些节点、各个节点的CSS定义以及他们的从属关系，从而去计算出每个节点在屏幕中的位置。

　　painting: 按照算出来的规则，通过显卡，把内容画到屏幕上。

## http请求头的内容



## HTTP2是在HTTPS上实现的



## for。。in能用break吗



## 浏览器进程

![image-20211110170818050](C:\Users\gellenliu\AppData\Roaming\Typora\typora-user-images\image-20211110170818050.png)

# 算法基础

## 1、String字符串函数





### 11、数字转字符串



```c++
#include <sstream>
stringstream ss;
int n = 10;
string str;
ss<<n;
ss>>str;

//2
<string>
to_string(n);
```

### 12、字符串转数字

```c++
stringstream ss;
ss<<str;
ss>>n;
```



## 3、DFS/BFS

dfs：深度搜索

用递归，设置一个访问标志。

不断的深入，往一个方向递归。直到底部。找兄弟，对兄弟进行深度递归。



bfs：

设置一个访问标志，一个队列。

顶点入队列。

取出队列的点。找他的儿子。并入队列。

再从队列取点。找儿子。





## 4、剪枝搜索

加一个if判断，遇到明显不符合的直接break；或者return。



## 5、记忆化搜索

把已经搜索过的结果保存起来。

计算新的结果的时候，先在数组里面找有没有。

如果有，就是已经计算过，不必再次计算，直接取就行。

递归时候用。



## 滑动窗口算法

左右双指针，相加，大于，右就移动，小于左就移动，直到符合条件

移动一个区间，去遍历数组。



## 堆排序算法

寻找无序数组中，第k大的值







大根堆，大的往上，小的往下，进行呼唤，得到最大的，然后将这个最大的放到最后面。重复。类似冒泡排序。一次得到一个最大的。

![img](https://img2018.cnblogs.com/blog/1250927/201910/1250927-20191007030336562-1007398686.gif)



## js算法专攻



数组的创建

```js
let arr = [];

var arr = new Array(3);
```





将a.b.c.d.e转换成a:{b:{c:{d:}}}    2021.8.3字节面试

```js
var str = 'a.b.c';
str = str.split('.');//分割字符串
var obj = {};//创建对象
var idx = str.length -1;
while(idx>-1){  //循环
  var temp = {};
  temp[str[idx]] = obj;   //赋值
  obj = temp;
  idx--;
}
```



数组的长度，

```js
arr.length
```

循环数组

```js
for(let i=0;i<arr.length;i++){
    
}
```

数组添加值

```js
arr.push(); //一个参数或者多个参数
```

连接数组

```js
newarr = [...oldarr,...olabrr]
```

字符串分割

```
var str = 'adfaf';
str.split('');


```



### set

```js
var s = new Set([a,b,c]);
s.delect()
s.add()
s.has()

for (let item of s){}

```

Map

```js
var map = new Map(['a',100],['b',19]);
map.get()
map.set()
map.delect()

for(var item of map){}
```

set去重数组

```js
const nums = [1,2,3,4,3,2,1]

uniq1 = [...new Set(nums)]  //方法1

uniq2 = Array.from(new Set(nums)) //方法2
```

### 数组转字符串

1.

```js
arr.toString();
//含有逗号，，，
1，2，3
```



2、

```js
arr.join('');
123
//不含逗号

//含逗号
arr.join();
1,2,3

//其他字符
arr.join('--');
1--2--3

```

3、循环遍历数组，用+=拼接

### 字符串转数组

1、str.split('')

### 字符串转数字

str.parseInt()

str.parseFloat()

### 数字转字符串

toString



次方

Math.pow(2,31);

开平方

Math.sqr(2);



### 正则判断

reg.test("adfafd")

判断字符串是否符合正则表达式

### 正则断言



```js
有如下字符串：

我爱你 我爱 爱 爱你

如果要取出爱字，要求这个爱字后面有你，这个时候就要这么写，这就是 先行断言：

'我爱你 我爱 爱 爱你'.match(/爱(?=你)/g) // ["爱", "爱"]

如果要求爱字后面没有你，那自然也有先行否定断言：

'我爱你 我爱 爱 爱你'.match(/爱(?!你)/g) // ["爱", "爱"] ，因为匹配相同...

这个时候，如果要求爱字后面有你，前面还要有我，那就要用到后行断言了，如下：

'我爱你 我爱 爱 爱你'.match(/(?<=我)爱(?=你)/g) // ["爱"]

最后，如果要求爱字前面没有我，后面也没有我，那就要用到先行否定断言和后行否定断言，如下：

'我爱你 我爱 爱 爱你'.match(/(?<!我)爱(?!你)/g) // ["爱"]
```





## 动态规划详解

递归暴力->带备忘录的递归->非递归的动态规划

有base case，基础数据

通过基础数据一步一步往后推导，通过状态转移方程来推导。



# js字符串函数

```js
//字符串分割成数组
//把参数对应的字符处分割，原字符消失
str.split("")
str= "abbaba"
str.split("a")
//["","bb","b",""]
//a变成逗号，逗号前后都有空字符



//字符串替换，可以是正则
str.replace("","");
//字符串长度
str.length

//查询子串，返回下标
index = str.indexOf("hell",0)
第二个参数是开始的位置，0————length-1


//查询子串，返回下表
str.search(正则)
//查询子串，最后一个，返回下标
str.lasteIndexOf("xxx")
//字符串匹配,可以是正则
str.match("xxx")


var mystr="hi,mynameisguoxiansheng6,33iswho?";
var matchStr=mystr.match("guo");    //guo
var matchStr1=mystr.match("Guo");    //null
var regexp1=/\d+/g;
var regexp2=/guo/g;
var reg = /guo/gi; //不区分大小写
var regexp3=/guo/;
var matchStr2=mystr.match(regexp1);    //["6","33"]
var matchStr3=mystr.match(regexp2);    //["guo"]
var matchStr3=mystr.match(regexp3);    //["guo",index:11,input:"hi,mynameisguoxiansheng6,33iswho?"]
matchStr3.index    //11
matchStr3.input    //hi,mynameisguoxiansheng6,33iswho?

/*如果使用正则匹配字符串时，如果正则表达式没有 g (全局标识)标志，返回与正则匹配相同的结果。而且返回的数组拥有一个额外的 input 属性，该属性包含原始字符串。另外，还拥有一个 index 属性，该属性表示匹配结果在被字符串中的索引（以0开始）。如果正则表达式包含 g 标志，则该方法返回匹配字符串的数组。*/

//字符串连接
str.concat(str2,str3)

//字符串切割

str.slice(-3);//负数为倒数第几个
str.substring(3,7);//3到7
str.substr(3,7);//3开始，数7个

/*1.slice() 可以为负数，如果起始位置为负数，则从字符串最后一位向前找对应位数并且向后取结束位置，如果为正整数则从前往后取起始位置到结束位置。
　　2.substring()只能非负整数，截取起始结束位置同slice()函数一致。

　　3.substr()与第一、第二种函数不同，从起始位置开始截取，结束位置为第二个参数截取的字符串最大长度。*/

slice()可以用于数组！

//数组转字符串
arr.join('')

//对象转json
JSON.stringify()

//JSON字符串解析成对象
JSON.parse()
```

# 数组函数

```js
1\
arr.toString();//含逗号
2、
arr.join('');//不含逗号
3、
arr.pop()
4、
arr.push()
5\
arr.shift();//删除首个数组元素，索引也向左移,返回被删除的元素
6、
arr.unshift();//在开头添加一个元素，索引向右移，返回新数组长度
7、
arr.lenght
8\
delete arr[1];//把arr【1】的元素删除，变成undefined
9、
//插入元素到a处，并删除a向后的b个元素，插入的元素为x1，x2.。。
arr.splice(a,b,x1,x2,x3);
//若没有需要插入的元素，就可以当作删除功能
arr.splice(0,1);//删除第一个元素，直接删除掉所在的位置

在a的前面插入


10、连接数组
arr1
arr2
arr3
let newarr = arr1.concat(arr2);
let newarr2 = arr1.concat(arr2,arr3);//可以多个参数

11、裁剪数组
//一个参数
arr.slice(a);//从元素a开始，切出后面的元素，返回新的数组，不影响原来的数组，包括a。
a可以是负数，表示倒数第几个。
arr（-2）；倒数第二个开始，包含本身


//两个参数
arr.slice(a,b);//从a开始（包括a），选到b，不包括b。


12、排序
arr.sort()


```



## 对象的创建

```js
let obj = {};
obj['key'] = "123";   
/*
  {
    key: 123
  }
*/

```

### dom节点的父节点

```js
node.parentNode
```

a.b.c.d转对象{a:b:c:d}

```js
function namespace(oNamespace, sPackage) {
      const arr = sPackage.split('.');
      let o = oNamespace;
      for(let i = 0;i<arr.length ;i++) {
        // 如果不是对象，则使它成为对象
        if(typeof o[arr[i]] != 'object') {
          o[arr[i]] = {};
        }
         o = o[arr[i]];//关键点
      }
      return oNamespace;
}
```

### Unicode编码

```js
str.charCodeAt(index);
返回unicode编码数字
```

### 进制

```js
parseInt("ff",16);//16指的是第一个参数的进制，输出都是十进制。
=>255

toString(16);//输出16进制
```



## 防抖函数

```js
function debounce(fn,delay) {
    let timer = null;
    return function(){
        let content = this;
        let args = arguments;
        clearTimeout(timer)
        timer = setTimeOut(function(){
            fn.apply(content,args)
        },delay)
    }
}

function a(){
    let timer = null;
    if(timer == null){
        let fangdou = function(){
        clearTimeOut(timer)
        timer = setTimeOut(function(){
            
          //...函数内容
        }, 500)
    }
    }
    
    
    
}
```

## 节流函数

```js
function throttle(fn,delay) {
    let timer = null;
    return function() {
        let content = this;
        let args = arguments;
        while(!time) {
            timer = setTimeOut(function(){
                fn.appy(content,args);
                timer = null
            },delay)
        }
    }
}
```

## 找字符串中出现最多的字符

```js
function fn(str) {
    let map = new Map();
    for(let i =0;i<str.length;i++) { 
        if(map.has(str[i])) {
            let count = map.get(str[i]) + 1;
            map.set(str[i],count)
        }else{
            map.set(str[i],1)
        }
    }
    let arr = Array.from(map);
    arr.sort(function(a,b){b[1]-a[1]})
    return arr[0][0];
}
fn("1231231")
```

## 函数柯里化

```js
// 普通的add函数
function add(x, y) {
    return x + y
}

// Currying后
function curryingAdd(x) {
    return function (y) {
        return x + y
    }
}

add(1, 2)           // 3
curryingAdd(1)(2)   // 3


//确定参数的函数柯里化实现
 
function sum(a,b,c,d){
    return a+b+c+d
}
function curry(fn){
    return function sum(...args){
        if(args.length<fn.length){ // 判断接受的参数是否小于函数的参数长度
           return function(){  // 参数不够长度，再次接受传递参数
                return sum(...args,...arguments)  
           }
        }
        return fn(...args)// 不要求改变this,
    }
}
let curried = curry(sum)
console.log(curried(1)(2)(3)(4))//10
console.log(curried(1,2)(2,4))//9



// 实现一个add方法，使计算结果能够满足如下预期：
add(1)(2)(3) = 6;
add(1, 2, 3)(4) = 10;
add(1)(2)(3)(4)(5) = 15;

function add() {
    // 第一次执行时，定义一个数组专门用来存储所有的参数
    var _args = Array.prototype.slice.call(arguments);

    // 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
    var _adder = function() {
        if(...arguments.length != 0){
            // ...运算符进行脱壳
            _args.push(...arguments);
            return _adder;
        }else {
            let res =  _args.reduce(function (a, b) {
              return a + b;
            });
            return res;
        }
        
    };
    return _adder;
}

add(1)(2)(3)                // 6
add(1, 2, 3)(4)             // 10
add(1)(2)(3)(4)(5)          // 15
add(2, 6)(1)   
```





## 箭头函数

一个参数可以省略括号

两个参数以上需要括号

（）=> {}

a => {}

(a,b) = {}

this的作用域由上下文确定

简洁代码



## finally和异常处理

finally必然执行

## **in和hasOwnProperty的区别**

- in判断的是对象的所有属性，包括对象实例及其原型的属性；
- hasOwnProperty是判断对象实例的是否具有某个属性,不包含原型对象的属性

## 数组的.map函数

```js
let arr = [1,2,3,4]
newarr = arr.map(item=> {return item*2})
//2,3,4,8

map函数对每个元素进行处理，返回一个新的数组。


map(value,index,arr)
value是元素的值，index是元素的下标，arr是元素的数组
```

## 数组增加一个对象

```js
arr.push({
    key: _key
    value: _value
})

//取对象的值,用.点来获取
key = arr[i].key


```



## 类的定义，结构体的使用

```js

class node {
    constructor(_key,_value) {
        this.key = _key,
        this.value = _value
    }
    
}
tree = []
tree.push(new node("1","23"))


```



## babel转换流程

es6生成ast抽象语法树，再转换成es5



## 虚拟DOM是什么？

因为操作真实dom的开销是很大的，所以就有了这个虚拟dom。

真实dom是树形结构，虚拟dom是对象结构。

vue把模板抽象成ast，再生成render函数，生成虚拟dom。

我们先根据真实DOM生成一颗`virtual DOM`，当`virtual DOM`某个节点的数据改变后会生成一个新的`Vnode`，然后`Vnode`和`oldVnode`作对比，发现有不一样的地方就直接修改在真实的DOM上，然后使`oldVnode`的值为`Vnode`。

`VNode`和`oldVNode`都是对象

## diff算法是什么？

计算出虚拟dom真正变化的部分，并只针对该部分进行真实dom的操作，而不是渲染整个页面。

时间复杂度为O（n）

一个真实dom，一个old虚拟dom，一个new虚拟dom

old虚拟dom和new虚拟dom进行对比

1.调用patch函数比较Vnode和OldVnode,如果不一样直接return Vnode即将Vnode真实化后替换掉DOM中的节点

2.如果OldVnode和Vnode值得进一步比较则调用patchVnode方法进行进一步比较，分为以下几种情况：

Vnode有子节点，但是OldVnode没有，则将Vnode的子节点真实化后添加到真实DOM上

Vnode没有子节点，但是OldVnode上有，则将真实DOM上相应位置的节点删除掉

Vnode和OldVnode都有文本节点但是内容不一样，则将真实DOM上的文本节点替换为Vnode上的文本节点

Vnode和OldVnode上都有子节点，**需要调用updateChildren函数进一步比较**

## 数据劫持怎么实现？

Object.defineProperty()来实现数据劫持的。

```js
var Book = {}
var name = '';
Object.defineProperty(Book, 'name', {
  set: function (value) {
    name = value;
    console.log('你取了一个书名叫做' + value);
  },
  get: function () {
    return '《' + name + '》'
  }
})
 
Book.name = 'vue权威指南';  // 你取了一个书名叫做vue权威指南
console.log(Book.name);  // 《vue权威指南》

//set在设置值的时候触发通知view改变，get在读取值的时候触发通知model改变
```

设置一个监听器，Observer

订阅者Watcher

管理器Dep

解析器Compile

## 观察者模式（

当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知，并自动更新

。

## 发布订阅模式）

发布者的消息发送者不会将消息直接发送给订阅者，这意味着发布者和订阅者不知道彼此的存在。在发布者和订阅者之间存在第三个组件，称为消息代理或调度中心或中间件，它维持着发布者和订阅者之间的联系，过滤所有发布者传入的消息并相应地分发它们给订阅者。



## 数字精度问题

在 JavaScript 中不论小数还是整数只有一种数据类型表示，这就是 Number 类型，其遵循 IEEE 754 标准，使用双精度浮点数（double）64 位（8 字节）来存储一个浮点数（所以在 **JS 中 1 === 1.0**）

0.1 + 0.2 ！= 0.3

解决： 截取小数位，或乘以10再除以十

```js
let a = 0.1 + 0.2;
a.toFixed(3);  //0.300三位小数
```

## js原型链

proto，prototype

1.对象有属性__proto__,指向该对象的构造函数的**原型对象。**
2.方法除了有属性__proto__,还有属性prototype，prototype指向该方法的原型对象。

构造函数也有prototype



每个函数都有一个prototype，指向一个对象，原型对象

```js
Function.__proto__ === Function.prototype; // true
Object.__proto__ === Function.prototype; // true，，Object是通过function来创建的
Function.prototype.__proto__ === Object.prototype; // true
Object.prototype.__proto__ === null;   

Object原型是最底层的，Object原型的__proto__指向空
```

对象的隐式原型的值为其对应构造函数的显式原型的值
fn.__proto__ === Function.prototype
函数的prototype属性是定义时自动添加的。默认为{}
对象的__proto__属性是创建对象时自动添加的，默认值为其构造函数的prototype
Object.prototype.__proto__ === null

函数的proto原型对象都是，Function类。

对象的proto就是该对象的类。

函数还有prototype，是该函数原型对象（类）。

类也是一个对象。

![在这里插入图片描述](https://img-blog.csdnimg.cn/2019022822050917.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM4NzIyMDk3,size_16,color_FFFFFF,t_70)

一个是显性原型prototype，一个是隐形原型__proto__ ，proto指向其构造函数的prototype属性。函数和对象的构造函数都创建于Function，指向Function.prototype。

函数也是一个对象

Person.prototype，，Object。prototype其实就是一个类，就是原型对象，就是class。

他的构造函数指向Person()，，Person()的prototype指向Person.prototype原型对象。

对象实例person的__proto__继承于类Person，也就是Person。prototype原型对象，所以指向它。





```js
Function.prototype.a = ()=>{
    console.log(1)
}
Object.prototype.b = ()={
    console.log(2)
}
function A(){};
var a = new A();

a.a();//error
a.b();2

//因为A.__proto__ === Function.prototype
//a.__proto__ === A.prototype !== A.__proto__
```





## 斐波那契数列

### 1\递归法(n2的复杂度)

```js
function fibonacci(n) {
    if(n<2) {
        return n;
    }
    return fibonacci(n-1) + fibonacci(n-2);
}
```

2、循环法O（n）

```js
//从前面往后面算
for(let i =2;i<=n;i++){
    fibN = fibone + fibtwo;  //第三个等于前两个相加
    fibtwo = fibone            //往后退一布，从fibN倒数第二个等于原来的倒数第一fibnoe
    fibone = fibN              //往后退一步，倒数第一个等于新的fibN
}
//循环n-2次，到达n位
```

## class的声明不会提升

# 牛客面经合集

## 1、自我介绍



## 6、介绍一下项目，项目优化和难点



## 7、js基础类型

```js

//8种
object (function\array)


null
Number
String
boolean
undefined
bigint
symbol

typeof function(){}
"function"
typeof null
"object"
typeof undefined
"undefined"
typeof BigInt
"function"
typeof [1,2]
"object"
```



## 1、反问



## 1、tcp三次握手\四次挥手

客户端发送syn连接请求，服务端回应ack确认和syn请求，客户端回应ack确认。

为什么四次挥手？服务端回应的ack和fin断开请求要分开发送因为服务端可能还有数据需要发送，还不能断开。

为什么要等2msl？因为客户端不知道服务端是否收到的自己的ack确认。要等2msl，两个报文存在的最大周期。如果没有收到服务端的重传，就再次发送。



## 1、栈和堆

基本数据类型在栈中，引用类型在堆中

## in和hasOwnProperty的区别

in包含原型链上的

hasOwnProperty只算自己的

## Object.keys()和Object。getOwnPropertyNames的区别

keys返回自身的可枚举的属性

getOwnPropertyNames返回自身的所有属性。

## instranceof和typeof的区别

instranceof 返回true或false。找原型链上的，是否是它的对象。

typeof返回它的原型

## 为什么基本类型在栈中，引用类型在堆中

基本类型是确定的不可变的，大小的确定的

引用类型是大小不确定的，而且引用类型比较大



引用类型的数据的**地址指针是存储于栈中的，当我们想要访问引用类型的值的时候，需要先从栈中获得对象的地址指针，然后，在通过地址指针找到堆中的所需要的数据。**



## for循环优化

**2.优化版for循环**

使用变量，将长度缓存起来，**避免重复获取长度**，数组很大时优化效果明显

```
for(var j = 0,len = arr.length; j < len; j++){
    console.log(arr[j]);
}
```



## for--in和for--of--foreach的区别

for。。。in可以遍历数组，也可以遍历对象

for。。of不能遍历对象。

for。。in从0开始遍历

for...in 循环不仅遍历数字键名，还会遍历手动添加的其它键，甚至包括原型链上的键。for...of 则不会这样

```js
//for...in遍历的是下标
for (var index in myArray) {
  console.log(myArray[index]);
}

var myObject={
　　a:1,
　　b:2,
　　c:3
}
for (var key in myObject) {
  console.log(key);//a,b,c
}


//for...of遍历的是元素本身
var myArray=[1,2,4,5,6,7]
myArray.name="数组";
for (var value of myArray) {
  console.log(value);
}

```

forEach（）是是数组的方法，后面跟一个函数

## 怎么判断是pc端还是移动端，横屏还是竖屏

navigator.userAgent标识

clientwidth宽度判断



## z-index的理解

1、如果不设定position，z-index不生效。文档流后面的节点会覆盖在前面的节点之上。

2、如果position为static（html元素的默认值就是static），依旧是文档流后面的覆盖前面的

，z-index不生效

3、如果将 position 设为 relative (相对定位)，absolute (绝对定位) 或者 fixed
(固定定位)，这样的节点会覆盖没有设置 position 属性或者属性值为 static 的节
点，说明前者比后者的默认层级高。

4、b覆盖a，，a-1覆盖b

```html
 <div id="a">
     <div id="a-1" style="position:relative;">A-1</div>
  </div>
  <div id="b">B</div>
```

5、 z-index 属性仅在节点的 position 属性为 relative, absolute 或者
fixed 时生效.

6、从父原则。z-index与同级元素进行比较，子节点多大都没用

![img](https://images2015.cnblogs.com/blog/1015026/201608/1015026-20160826174206944-994632417.jpg)



### bg<负数z-index<block<float<inline-block<z-index：auto、0<正数z-index

## position的理解

position：relative；偏移后，盒子还是留在文档流原来的位置的。

position: sticky;   解决ios键盘拉出导致页面向上滚动的问题。在可视区域时表现成relative，滚动超出可视区时，表现成fixed；

position：fixed；相对浏览器窗口定义，与html无关；

position：absolute；父元素已定位就相对父元素，否则相对html标签定位，不是浏览器窗口。

## margin负值和position：relative偏移、和tranform的区别；

margin负值偏移，文档流的位置也会偏移，影响后面紧跟着的元素。

position偏移，文档流盒子的位置不变，还留在原地。

transform偏移：文档流盒子的位置不变，还留在原地占位，实际表现偏移而已。

## bind、call、同一行多次调用时，返回第一次调用的this

## 不知道高度居中方法

position偏移50%，再用transform偏移-50%。

flex布局、grid布局



## diff算法的时间复杂度，n3

删除，插入，替换都遍历一遍。



## scoped底层

加一个唯一前缀样式选择器，加一个唯一属性，用属性选择器

- 给HTML的DOM节点加一个不重复`data`属性(形如：`data-v-a2a7b732`)来表示他的唯一性
- 在每句css选择器的末尾（编译后的生成的css语句）加一个当前组件的`data`属性选择器（如`[data-v-a2a7b732]`）来私有化样式

## esmodule  commonjs的区别

Commonjs的动态引入，运行时引入。require

ESmodule是静态引入，编译时引入，，import。。from

CommonJS 是一种模块规范，最初被应用于 Nodejs，成为 Nodejs 的模块规范。

ES6 modulde是后面出的

我们平时在 Webpack 中使用的 export 和 import，会经过 Babel 转换为 CommonJS 规范。在使用上的差别主要有：

1. CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
2. CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
3. CommonJs 是单个值导出，ES6 Module可以导出多个
4. CommonJs 是动态语法可以写在判断里，ES6 Module 静态语法只能写在顶层
5. CommonJs 的 this 是当前模块，ES6 Module的 this 是 undefined





## html解析、js、css阻塞（浏览器加载）

当浏览器获得一个html文件时，会”自上而下“加载，并在加载过程中进行解析渲染。
**加载过程中遇到外部css文件，浏览器另外发出一个请求，来获取css文件。**
遇到图片资源，浏览器也会另外发出一个请求，来获取图片资源。**这是异步请求，并不会影响html文档进行加载。**
但是当文档加载过程中遇到js文件，**html文档会挂起渲染**（加载解析渲染同步）的线程，不仅要**等待文档中js文件加载完毕，还要等待解析执行完毕，才可以恢复html文档的渲染线程。**

- JS 会阻塞后续 DOM 解析以及其它资源(如 CSS，JS 或图片资源)的加载。

css会阻塞 后续JS 文件的执行（原因之一是，js执行代码可能会依赖到css样式。css**只阻塞执行而不阻塞js的加载）。**



## 浏览器的事件机制

事件传播的三个阶段：捕获、目标对象、冒泡

![img](https://upload-images.jianshu.io/upload_images/3748553-8a2a00abefbffd10.png?imageMogr2/auto-orient/strip|imageView2/2/w/707/format/webp)



事件对象从window逐层派发到目标对象，冒泡就是派发的逆过程。

### 事件委托

我们把事件处理程序添加到其父元素（在例子中就是ul）上，然后按照事件冒泡的规则，点击到子元素（li）上的时间就会一级一级冒到父元素上。如下：

**我们将事件处理器绑定到一个父级元素上**，**避免了频繁的绑定多个子级元素,**依靠**事件冒泡**机制与**事件捕获**机制，子级元素的事件将委托给父级元素。



如果父div有click事件, div里的span也有click事件, 默认你点span的时候父div的click事件也会被激发, 如果你不想激发父div的click事件, 就在span的click事件中stopPropagation(), 就是这样

### 阻止事件冒泡

调用 `stopPropagation` 严格来说不是阻止冒泡，是阻止事件传播，捕获阶段也可以直接阻止

- 事件接口还有一个 `cancelBubble` 因历史原因的 stopPropagation 的别名，给其赋值 true 可以达到调用 stopPropagation 同样的效果。

- 调用 `preventDefault` 则是阻止默认事件。

- ```js
  e=e||window.event;
          if(e.stopPropagation){
              e.stopPropagation();//其它浏览器
          }else{
              e.cancelBubble=true;//IE浏览器
          }
  
  ```

## 函数没有返回值时，返回undefined



## 依赖注入

Class A中用到了Class B的对象b，一般情况下，需要在A的代码中显式的new一个B的对象。采用依赖注入技术之后，A的代码只需要定义一个私有的B对象，不需要直接new来获得这个对象，而是通过相关的容器控制程序来将B对象在外部new出来并注入到A类里的引用中。

缺点：增加了耦合，

provide和inject

provide选项允许我们指定我们想要提供给后代组件的数据/方法。

```js
...
data() {
 return {
  msg: ‘I am origin component data’
 }
},
provide: function() {
 return {
  getData() {
   console.log(‘hi，I come from origin component’)
  }
 },
 msg: this.msg
},
...

```

inject可以在任何后代组件使用来接受我们在祖先指定的数据/方法
后代组件：

...

```js
inject: [‘getData’, ‘msg’],
created() {
 this.init()
},
methods: {
 init() {
  console.log(this.msg),
  this.getData()
 }
}
...
```




## 兄弟组件通讯bus.js

## 弹窗禁止滚动

```js
//1\设置overflow
html.style.overflow="hidden";
html.style.height="100%";
body.style.overflow="hidden";
body.style.height="100%";

//2
1、重叠的两个页面元素，z-index值更高的会优先触发事件监听，从而可以在此控制是否让事件流继续；2、移动端滚动的touch事件，基于事件流。
//在黑幕层阻挡touch事件
				shield.addEventListener("touchstart",function(e){
					e.stopPropagation();
					e.preventDefault();
				},false);
```



## nexttick

执行时机：当前宏任务结束后，`nextTick`总是要比`setTimeout`先要执行。

等当前调用栈清空，再执行

**看浏览器的支持情况：**

Vue 在内部尝试对异步队列使用原生的`Promise.then`和 `MessageChannel`，如果执行环境不支持，会采用`setTimeout(fn, 0)`代替。



在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

Vue 实现响应式并**不是数据发生变化之后 DOM 立即变化**，

Vue 在修改数据后，视图不会立刻更新，而是等**同一事件循环**中的所有数据变化完成之后，再统一进行视图更新。

```js
//改变数据
vm.message = 'changed'

//想要立即使用更新后的DOM。这样不行，因为设置message后DOM还没有更新
console.log(vm.$el.textContent) // 并不会得到'changed'

//这样可以，nextTick里面的代码会在DOM更新后执行
Vue.nextTick(function(){
    console.log(vm.$el.textContent) //可以得到'changed'
})


var vm = new Vue({
    el: '#example',
    data: {
        msg: '123'
    }
})
vm.msg = 'new message'
console.log(1)
console.log(vm.$el.innerText)
console.log(2)
Vue.nextTick(()=>{
    console.log(vm.$el.innerText)
})
console.log(3)
</script>
1
123
2
3
new message

```

```js
new Promise((resolve) => {
    console.log(1);
    
    process.nextTick(() => {
    	console.log(2);
    });
    
    resolve();
    
    process.nextTick(() => {
    	console.log(3);
    });
    
    console.log(4);
}).then(() => {
    console.log(5);
});
 
setTimeout(() => {
    console.log(6);
}, 0);
 
console.log(7);
复制代码
1,4,7,2,3,5,6
```

```js

//重点
click(){
         let btn = this.$refs.btn;

         Promise.resolve().then(() => {
            console.log(1, btn.$el.innerText);
         });
         this.$nextTick(() => {
            console.log(2, btn.$el.innerText);
         });

         console.log(3);
         this.name = 'after';
         console.log(4);

         Promise.resolve().then(() => {
            console.log(5, btn.$el.innerText);
         });
         this.$nextTick(() => {
            console.log(6, btn.$el.innerText);
         });

        //你以为是这样：3， 4，视图更新，1，2，5，6   
        // 或者是这样 ：3， 4，视图更新，1，2，6，5
 
    、、第一次有数据改变，调用栈清空后，立即执行tick回调，所有tick回调都放在一个回调里执行
        // 其实是这样 ：3， 4，2，视图更新，6，1，5//这行结果又无法重现了
    、、第二次没有数据改变，先打印1，轮到tick回调，打印2，6，最后才是5
        // 其实是这样 ：3， 4，1，2，视图更新，6，5
       }
```



# ES6新增的数组方法

## 1.forEach()方法

forEach()方法是循环遍历数组中的每一项，把符合条件的筛选出来成为一个新的数组。

let arr = [1,33,44,22,6,9]
let ary = []
arr.forEach(function(v, i){
  if (v > 10) {
    ary.push(arr[i])
  }  
})
console.log(ary)
1

## 2.some()方法

some()方法找到符合条件的就返回true,如果没有找到符合条件的就返回false。

```js
let arr = [1,33,44,22,6,9]
let ary = arr.some(function(v){
  return v > 10
})
console.log(ary)
```

## 3.filter()方法

filter()方法是将符合挑选的筛选出来成为一个新数组，新数组不会影响旧数组。

```js
let arr = [1,33,44,22,6,9]
let ary = arr.filter( v => v > 10)
console.long(ary)

```

## 4.find()方法

find()方法是查找数组中符合条件的第一个元素，直接将这个元素返回出来

```js
let arr = [1,33,44,22,6,9]
let ary = arr.find(v => v > 10)
console.log(ary)
```

## 5.findIndex()方法

findIndex()方法是查找数组中符合条件的第一个元素的索引，索引从0开始

let arr = [1,33,44,22,6,9]
let ary = arr.findIndex(v => v > 10）
console.log(ary)

## 6.includes()方法

includes()方法是查看数组中是否存在这个元素，如果存在就返回true,如果不存在就返回false

let arr = [1,33,44,22,6,9]
let ary = arr.includes(22)
console.log(ary)

## 7、reduce()

```js
array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
```

```js
// 1.数组求和
var arr = [1,5,8,6,15,78,65,25,48,55]
var sum = arr.reduce(function(total,currentValue){
  return total+currentValue;
});
console.log(sum);//306
var eachSum = 0;
arr.forEach(function(currentValue){
  eachSum += currentValue;
})
console.log(eachSum);//306
```



# es新增字符串方法

## 1、includes

返回bool，判断是否包含字串

```js
let s = 'Hello world!';

s.startsWith('Hello') // true
s.endsWith('!') // true
s.includes('o') // true
let s = 'Hello world!';

s.startsWith('world', 6) // true
s.endsWith('Hello', 5) // true
s.includes('Hello', 6) // false
注意：使用第二个参数n时，endsWith的行为与其他两个方法有所不同。它针对前n个字符，而其他两个方法针对从第n个位置直到字符串结束。
```

## 2、startsWith()、endsWith()

判断是否以改字符串开头，结尾

## 3、repeat()

重复，

```js
'x'.repeat(3) // "xxx"
'hello'.repeat(2) // "hellohello"
'na'.repeat(0) // ""
```

## 4、补全padStart()

```js
'x'.padStart(5, 'ab') // 'ababx'
'x'.padStart(4, 'ab') // 'abax'

'x'.padEnd(5, 'ab') // 'xabab'
'x'.padEnd(4, 'ab') // 'xaba'
```

## 5、去除空格trim

```js
const s = '  abc  ';

s.trim() // "abc"
s.trimStart() // "abc  "
s.trimEnd() // "  abc"
```





## commit合并

- 在终端输入: `git rebase -i HEAD~2`  这里的 `HEAD~2` 表示合并最近两次的提交, 如果想合并最近三次的提交修改为: `git rebase -i HEAD~3`

- 通过git rebase -i 将本地的多次提交合并为一个，以简化提交历史。**本地有多个提交时,如果不进行这一步,在git rebase master时会多次解决冲突(最坏情况下,每一个提交都会相应解决一个冲突)**

pick：保留该commit（缩写:p）

reword：保留该commit，但我需要修改该commit的注释（缩写:r）

edit：保留该commit, 但我要停下来修改该提交(不仅仅修改注释)（缩写:e）

squash：将该commit和前一个commit合并（缩写:s）

fixup：将该commit和前一个commit合并，但我不要保留该提交的注释信息（缩写:f）

exec：执行shell命令（缩写:x）

drop：我要丢弃该commit（缩写:d）



作者：liqingbiubiu
链接：https://www.jianshu.com/p/4a8f4af4e803
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

## ~~类型转换

转换成数字



## 轮播图

1、每一张单独进行移动

2、假如是三张图A、B、C你要做的scrollview实际上应该是五张的大小顺序是C、A、B、C、A。初始偏移量设置到第二张，监听scrollview滑动事件。判断偏移量。当偏移量在第一张时将偏移量修改到第四张，当偏移量在第五张时将偏移量调整到第二章。这样在循环时比较流畅。

1，绝对定位在同一个位置，使用opacity透明度控制，
2，使用position,margin,translate进行移动一整行，头尾复制一个，到最后的时候transition设置为0，
3，对每个图片img进行控制，移动。
4，使用css动画，animation进行控制，需要写多个动画。animation-play-state,用hover来控制

## 纯函数

一个函数的返回结果只依赖于它的参数，并且在执行过程里面没有副作用，我们就把这个函数叫做纯函数。这么说肯定比较抽象，

```js
const a = 1
const foo = (b) => a + b
foo(2) // => 3
这个不是纯函数
```



## toString方法



1. 



Number、array、boolean、string、date，，重写了object的tostring方法，所以可以打印出对应的字符串。





`**toString()**` 方法返回一个表示该对象的字符串。

。默认情况下，`toString()` 方法被每个 `Object` 对象继承。如果此方法在自定义对象中未被覆盖，`toString()` 返回 "[object *type*]"，其中 `type` 是对象的类型。以下代码说明了这一点：

```js
var toString = Object.prototype.toString;

toString.call(new Date); // [object Date]
toString.call(new String); // [object String]
toString.call(Math); // [object Math]

//Since JavaScript 1.8.5
toString.call(undefined); // [object Undefined]
toString.call(null); // [object Null]
Object.prototype.toString.call(null)
"[object Null]"
Object.prototype.toString.call(1)
"[object Number]"
Object.prototype.toString.call(1n)
"[object BigInt]"
toString([])
"[object Undefined]"
toString("")
"[object Undefined]"
Object.prototype.toString([])
"[object Object]"
Object.prototype.toString([1,2])
"[object Object]"
Object.prototype.toString("")
"[object Object]"
Object.prototype.toString.call([])
"[object Array]"
```



## background可以设置多个背景图片

## COOKIE、token、session的区别

个浏览器能创建的 Cookie 数量最多为 300 个，并且每个不能超过 4KB，每个 Web 站点能设置的 Cookie 总数不能超过 20 个。

A：首先，客户端会发送一个http请求到服务器端；

B： 服务器端接受客户端请求后，发送一个http响应到客户端，这个响应头，其中就包含Set-Cookie头部；

C：在客户端发起的第二次请求（注意：如果服务器需要我们带上Cookie，我们就需要在B步骤上面拿到这个Cookie然后作为请求头一起发起第二次请求），提供给了服务器端可以用来唯一标识客户端身份的信息

Cookie 中的所有数据在客户端就可以被修改，数据非常容易被伪造，那么一些重要的数据就不能存放在 Cookie 中了，而且如果 Cookie 中数据字段太多会影响传输效率。为了解决这些问题，就产生了 Session，Session 中的数据是保留在服务器端的。服务端检查 Cookie 中保存的 session_id 并通过这个 session_id 与服务器端的 Session data 关联起来，进行数据的保存和修改。

## requestAnimationFrame

html5 还提供一个专门用于请求动画的API，那就是 requestAnimationFrame，顾名思义就是**请求动画帧。**

```jsx
var progress = 0;
    //回调函数
    function render() {
     progress += 1; //修改图像的位置
     if (progress < 100) {
     //在动画没有结束前，递归渲染
     window.requestAnimationFrame(render);
     }
    }
    //第一帧渲染
    window.requestAnimationFrame(render);</pre>
```



## session的弊端

1、服务器压力增大

通常session是存储在内存中的，每个用户通过认证之后都会将session数据保存在服务器的内存中，而当用户量增大时，服务器的压力增大。

2、CSRF跨站伪造请求攻击

session是基于cookie进行用户识别的, cookie如果被截获，用户就会很容易受到跨站请求伪造的攻击。

3、扩展性不强

如果将来搭建了多个服务器，虽然每个服务器都执行的是同样的业务逻辑，但是session数据是保存在内存中的（不是共享的），用户第一次访问的是服务器1，当用户再次请求时可能访问的是另外一台服务器2，服务器2获取不到session信息，就判定用户没有登陆过
————————————————

## token，保存再浏览器中，localstorage

浏览器会将接收到的token值存储在Local Storage中，（通过js代码写入Local Storage，通过js获取，并不会像cookie一样自动携带）

服务器对浏览器传来的token值进行解密，解密完成后进行用户数据的查询，如果查询成功，则通过认证，实现状态保持，所以，即时有了多台服务器，服务器也只是做了token的解密和用户数据的查询，它不需要在服务端去保留用户的认证信息或者会话信息，这就意味着基于token认证机制的应用不需要去考虑用户在哪一台服务器登录了

token用来做身份认证，session还可以保持其他的会话状态





token可以放入cookie中存储。session、localstorage都行。

在http请求header携带，authorization字段



## http和https的区别



https协议需要到CA申请证书，一般免费证书较少，因而需要一定费用。

http是超文本传输协议，信息是明文传输，https则是具有安全性的ssl/tls加密传输协议。

http和https使用的是完全不同的连接方式，用的端口也不一样，前者是80，后者是443

http的连接很简单，是无状态的；HTTPS协议是由SSL/TLS+HTTP协议构建的可进行加密传输、身份认证的网络协议，比http协议安全。

TLS/SSL全称安全传输层协议Transport Layer Security, 是介于TCP和HTTP之间的一层安全协议，不影响原有的TCP协议和HTTP协议，

ssl属于会话层和表示层

## https是怎么加密的

客户端使用非对称加密与服务器进行通信，实现身份验证并协商对称加密使用的密钥，然后对称加密算法采用协商密钥对信息以及信息摘要进行加密通信，不同的节点之间采用的对称密钥不同，从而可以保证信息只能通信双方获取。

如果用公开密钥对数据进行加密，只有用对应的私有密钥才能解密；如果用私有密钥对数据进行加密，那么只有用对应的公开密钥才能解密。因为加密和解密使用的是两个不同的密钥，所以这种算法叫作非对称加密算法。

![img](https://pic4.zhimg.com/80/v2-1ea0209a526f3527a713736fe7609fcf_1440w.jpg)

## http1.x和http2.0的区别



HTTP1.1支持长连接和请求的流水线处理，在一个TCP连接上可以传送多个HTTP请求和响应，减少了建立和关闭连接的消耗和延迟，在HTTP1.1中默认开启长连接keep-alive，

HTTP1.1的请求消息和响应消息都支持host域， 在HTTP1.0中认为每台服务器都绑定一个唯一的IP地址，

在HTTP1.0中主要使用header里的If-Modified-Since,Expires来做为缓存判断的标准，HTTP1.1则引入了更多的缓存控制策略例如Entity tag，If-Unmodified-Since, If-Match, If-None-Match等更多可供选择的缓存头来控制缓存策略。
HTTP1.1支持只发送header信息（不带任何body信息）节省带宽。 

在HTTP1.1中新增了24个错误状态响应码，



多路复用技术：做到同一个连接并发处理多个请求，而且并发请求的数量比HTTP1.1大了好几个数量级：

头部压缩：：HTTP2.0使用HPACK算法对header的数据进行压缩，这样数据体积小了，在网络上传输就会更快。

允许服务器推送

#### HTTP2.0性能增强的核心：二进制分帧

HTTP2.0所有通信都是在一个TCP连接上完成

**请求有优先级**



## webworker的使用

1）**同源限制**

分配给 Worker 线程运行的脚本文件，必须与主线程的脚本文件同源。

（2）**DOM 限制**

Worker 线程所在的全局对象，与主线程不一样，无法读取主线程所在网页的 DOM 对象，也无法使用`document`、`window`、`parent`这些对象。但是，Worker 线程可以`navigator`对象和`location`对象。

（3）**通信联系**

Worker 线程和主线程不在同一个上下文环境，它们不能直接通信，必须通过消息完成。

（4）**脚本限制**

Worker 线程不能执行`alert()`方法和`confirm()`方法，但可以使用 XMLHttpRequest 对象发出 AJAX 请求。

（5）**文件限制**

Worker 线程无法读取本地文件，即不能打开本机的文件系统（`file://`），它所加载的脚本，必须来自网络。

```
//worker.js
onmessage =function (evt){
  var d = evt.data;//通过evt.data获得发送来的数据
  postMessage( d );//将获取到的数据发送会主线程
}
```

```
<!DOCTYPE HTML>
<html>
<head>
 <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
 <script type="text/javascript">
//WEB页主线程
var worker =new Worker("worker.js"); //创建一个Worker对象并向它传递将在新线程中执行的脚本的URL
 worker.postMessage("hello world");     //向worker发送数据
 worker.onmessage =function(evt){     //接收worker传过来的数据函数
   console.log(evt.data);              //输出worker发送来的数据
 }
 </script>
 </head>
 <body></body>
</html>
```



使用完毕，为了节省系统资源，必须关闭 Worker。

> ```javascript
> // 主线程
> worker.terminate();
> 
> // Worker 线程
> self.close();
> ```



## websocket的使用

```javascript
var ws = new WebSocket("wss://echo.websocket.org");

ws.onopen = function(evt) { 
  console.log("Connection open ..."); 
  ws.send("Hello WebSockets!");
};

ws.onmessage = function(evt) {
  console.log( "Received Message: " + evt.data);
  ws.close();
};

ws.onclose = function(evt) {
  console.log("Connection closed.");
};     
```

## settimeout 0

如果代码中设定了一个 setTimeout，那么浏览器便会在合适的时间，将代码插入任务队列，如果这个时间设为 0，就代表立即插入队列，但不是立即执行，仍然要等待前面代码执行完毕。所以 setTimeout 并不能保证执行的时间，是否及时执行取决于 JavaScript 线程是拥挤还是空闲。


## PostMessege（两个页面的跨域）



```
postMessage(data,origin)方法接受两个参数
```

　　参数说明：

　　data： html5规范支持任意基本类型或可复制的对象，**但部分浏览器只支持字符串，所以传参时最好用JSON.stringify()序列化。**
　　origin： 协议+主机+端口号，也可以设置为"*"，表示可以传递给任意窗口，如果要指定和当前窗口同源的话设置为"/"。

```js
function test() {
 
    let op = window.open('b.html', '_blank'); //打开新窗口，并建立窗口的引用变量op
 
    function receiveMessage(event) {
      console.log('event', event);
 
    }
 
    op.addEventListener("message", receiveMessage, false); //监听新开窗口发来的消息
  }



页面b
<script>
  function post() {
    window.postMessage("hi there!", location.origin); //发送到所有同源的窗口，注意，当前窗口也会收到
  }
 
  function receiveMessage(event) {
    console.log('event', event)
 
  }
  window.addEventListener("message", receiveMessage, false);
</script>


```

## CORS跨域的缺点

1、需要后端进行配置

2、复杂请求的时候，会发送option预见请求，再发送真实请求，发送了两次，右性能损耗



## JSONP默认不带cookie，但可以手动带



# 数据结构



https://blog.csdn.net/weixin_48726650/article/details/107789164



## 堆和栈的区别

1、堆栈空间分配区别

栈（操作系统）：由操作系统（编译器）自动分配释放 ，存放函数的参数值，局部变量的值等。其操作方式类似于数据结构中的栈。

堆（操作系统）： 一般由程序员分配释放， 若程序员不释放，程序结束时可能由OS回收，分配方式倒是类似于链表。

2、堆栈缓存方式区别

栈使用的是一级缓存， 它们通常都是被调用时处于存储空间中，调用完毕立即释放。

堆则是存放在二级缓存中，生命周期由虚拟机的垃圾回收算法来决定（并不是一旦成为孤儿对象就能被回收）。所以调用这些对象的速度要相对来得低一些。

3、堆栈数据结构区别

堆（数据结构）：堆可以被看成是一棵树，如：堆排序。

栈（数据结构）：一种先进后出的数据结构。

## 判断无向图是否有环

边数大于点数-1，则一定有环

## stack

用一个数组，

```js
class Stack {
    constructor(){
        this.count = 0;
        this.data = [];
    }
    push(value){
        this.data.push(value)
    }
    pop(){
        this.data.pop()
    }
}
```



## queue

```js
class Queue {
    constructor() {
        this.data = []
    }
    pop(){
        this.data.shift()
    }
    push(value){
        this.data.push(value)
    }
}

```

## 优先队列

```js
class node {
    constructor(a,b){
       this.data = a;
        this.rank = b;
    }
}
let a = new node(1,2)
a.data;
Object.keys(a)[0];

class PQueue(){
    constructor(){
      this.collection = []    
    }
    push(value){
        for(let i =0;i<collection.length;i++){
            if(value[1]<collection[i][1]){
                collection.splice(i,0,value)
                break;
            }
        }
    }
    print(){
    }
}
```



## 链表

快慢指针

```js
class Node{
    constructor(element){
       this.element = element;
       this.next = null; 
    }
    
}

class List {
    constructor(){
        this.length = 0;
        this.head = null;
    }
    size() {
        return this.length;
    }
    head() {
        return this.head;
    }
    //从头开始找
    add(element) {
        let node = new Node(element);
        if(head == null) {
            head = node;
        }else {
            let currentNode = head;
            while (currentNode.next) {
                currentNode = currentNode.next;
            }
            currentNode.next = node;
            
        }
        this.length++;
    }
    remove(element) {
        let currentNode = this.head;
        let preNode;
        if(currentNode.element == element){
            head = currentNode.next;
        }
        else {
            while(currentNode.element !== element) {
                preNode = currentNode;
                currentNode = currentNode.next;
            }
            //跳过中间那个
            preNode.next = currentNode.next;
        }
        this.length--;
    }
    }
```



## set

```js
class MySet() {
    constructor() {
        this.collection = []
    }
    has(value) {
        return (collection.indexOf(value) !== -1 ) 
    }
    add(value) {
        if(!this.has(vlue)) {
            collection.push(value);
            return true;
        }
        return false;
    }
}
```

## 哈希表



这时，就把重复的添加到同一hash值的元素的后面，让 next引用指向它，这样形成一个链表。所以数组索引处可以认为存放的就是一个链表。没有发生冲突的索引处就是只有一个元素的链表。JDK8以后，当链表长度大于8时，就转化为红黑树，这样就大大提高了查找效率。
所以HashMap要想快速查找关键就是让hash值不冲突，这样就不用遍历链表，才能提高效率。

```js
function hash(string, max) {
   var hash = 0;
    for() {
        hash += string.charCodeAt(i)
    }
    return hash % max;
}

class HashTable {
    add(key, value) {
        data[index] = [
            [key, value]
        ];
        
    }
}
```

## 二叉树

```js
class Node {
    constructor(data, left =null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}
class tree {
    constructor() {
        this.root = null;
    }
    add(data) {
        const node = this.root;
        if(node === null) {
            this.root = new Node(data);
            return true;
        }
        else {
            //平衡插入
            const searchTree = function (node) {
                if(data<node.data) {
                    if(node.left == null) {
                        node.left = new Node(data);
                        return true;
                    }else if(node.left !== null) {
                        return searchTree(node.left)
                    }
                }
                else if(data>node.data) {
                    if()
                }
                 else {
                     return null;
                 }
            }
                return searchTree(node)
        }
    }
        findMin() {
            let current = this.root;
            while (current.left !== null) {
                current = current.left;
                
            }
            return current.data;
        }
}

```



## prim算法（最小生成树）

一直找最短的路径

标记visit，是否被访问。

一直选与已选点最短路径的点

## kruskal算法

将边排序，选一直选最短的，要保证不构成环路

所有的边按照权值先从小到大排列，接着按照顺序选取每条边，如果**这条边的两个端点不属于同一集合，那么就将它们合并，**直到所有的点都属于同一个集合为止



## 拓扑序列（多道工序，依次处理）

选一个入度为0的顶点。

将所有入度为0的顶点入队列，然后删除这些顶点对应的边，再找入度为0的点，入队列并删除对应的边，重复操作。



## Dijkstra(迪杰斯特拉)，单源最短路径

不允许负值

## SPFA算法（最短路径）

时间复杂度比较大n*e，带环可能死循环

1、首先我们先初始化数组dis如下图所示：（除了起点赋值为0外，其他顶点的对应的dis的值都赋予无穷大，这样有利于后续的松弛）

2、此时，我们还要把v1如队列：{v1}，现在进入循环，直到队列为空才退出循环。，

3、把v1出队列，并把v1相连的边的点进队列，并且更新dis数组对应的距离

4、重复，出队列，进队列，松弛dis数组

用队列里有的点作为起始点去刷新到所有点的最短路，如果刷新成功**且被刷新点不在队列中**则把该点加入到队列最后。重复执行直到队列为空。



## 归并排序

```js
递归分成两半，然后进行比较合并，nlogn，稳定排序
function mergeSort(arr) {  // 采用自上而下的递归方法
    var len = arr.length;
    if(len < 2) {
        return arr;
    }
    var middle = Math.floor(len / 2),
        left = arr.slice(0, middle),
        right = arr.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right)
{
    var result = [];

    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    while (left.length)
        result.push(left.shift());

    while (right.length)
        result.push(right.shift());

    return result;
}
```



## 快速排序



与递归的深度有关。看基准值取的好不好

最坏：n2，，，每次只能找出中间值，退化成冒泡了

平均：nlogn，，，  ***\*快速排序最优的情况就是每一次取到的元素都刚好平分整个数组\****(

最优：nlogn，，具体次数不一样，但量级一样

空间复杂度：

如果用方法1，还要增加

   首先就地快速排序使用的空间是O(1)的，也就是个常数级；而真正消耗空间的就是递归调用了，因为每次递归就要保持一些数据；

   **最优的情况下空间复杂度为：O(logn)  ；每一次都平分数组的情况**

   **最差的情况下空间复杂度为：O( n )    ；退化为冒泡排序的情况**



```js
// 定义左右两个数组，选一个基准值，比它小的放左边，比它大的放右边，递归左右数组，合并基准值和左右递归
// 思路简单，但插入删除性能消耗较大，而且需要新增数组来保存结果，空间消耗大

var quickSort = function(arr) {
 
　　if (arr.length <= 1) { return arr; }
 
　　var pivotIndex = Math.floor(arr.length / 2);
 
　　var pivot = arr.splice(pivotIndex, 1)[0];
 
　　var left = [];
 
　　var right = [];
 
　　for (var i = 0; i < arr.length; i++){
 
　　　　if (arr[i] < pivot) {
 
　　　　　　left.push(arr[i]);
 
　　　　} else {
 
　　　　　　right.push(arr[i]);
 
　　　　}
 
　　}
 
　　return quickSort(left).concat([pivot], quickSort(right));
};




// 方法二
// 选一个基准值的下标，前后双指针比较，在左边遇到比它大的，就停止，在右边遇到比它小的就停止，然后交换，，继续循环，
// 左右边都进行递归，前指针与基准值，后指针与基准值
  var devide_Xin = function (array, start, end) {
        if(start >= end) return array;
        var baseIndex = Math.floor((start + end) / 2), // 基数索引
             i = start,
             j = end;

        while (i <= j) {
            while (array[i] < array[baseIndex]) {
                i++;
            }
            while (array[j] > array[baseIndex])  {
                j--;
            }

            if(i <= j) {
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
                i++;
                j--;
            }
        }
        return i;
    }

    var quickSort_Xin = function (array, start, end) {
        if(array.length < 1) {
            return array;
        }
        var index = devide_Xin(array, start, end);
        if(start < index -1) {
            quickSort_Xin(array, start, index - 1);
        }
        if(end > index) {
            quickSort_Xin(array, index, end);
        }

        return array;
    }
```



# Flutter开发

## flutter



## 1、页面跳转

```js
Navigator.push(context, MaterialPageRoute(builder: (context) {
  return SecondScreen();
}));
```



返回上一页

```js
Navigator.pop(context);
```



定义路由，"/"是第一个页面。

不能在MaterialApp的页面跳转路由，只在其注册

无法传参

```javascript
void main() => runApp(new MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "页面一",
      ///注册路由表
      routes: {
        "/": (context) => LoginPage(),
        "/home": (context) => Home(),
      },
    );
  }
}

```



### 路由传参数

```js
Navigator.pushNamed(context, "/second", arguments: Photo(title: "pass title",message: "pass message"));
```

photo是类名，一个对象



#### 获取传递过来的参数

```dar
 final Photo photo=ModalRoute.of(context).settings.arguments;
```

### 在前一个页面接收另外一个页面的数据



## 使用图片

new Images.assets()



fix: Boxfit.cover

![image-20210717112916032](C:\Users\gellenliu\AppData\Roaming\Typora\typora-user-images\image-20210717112916032.png)

alignment

![image-20210716163257075](C:\Users\gellenliu\AppData\Roaming\Typora\typora-user-images\image-20210716163257075.png)





## Container里面只有一个child



## 样式类

Flutter的Decoration可以设置：背景色 背景图 边框 圆角 阴影 渐变色 的等属性，有点像android里面的shape，Decoration 是基类，它的子类有下面这些

BoxDecoration:实现边框、圆角、阴影、形状、渐变、背景图像
ShapeDecoration:实现四边分别指定颜色和宽度、底部线、矩形边色、圆形边色、体育场（竖向椭圆）、 角形（八边角）边色
FlutterLogoDecoration:Flutter图片
UnderlineTabindicator:下划线

![image-20210716171737004](C:\Users\gellenliu\AppData\Roaming\Typora\typora-user-images\image-20210716171737004.png)

其实`Image.asset`是对`AssetImage`一层更高级的封装。



## margin

```
Container(
  margin:  EdgeInsets.fromLTRB(10, 10, 10, 10),
),
```



## color

```
Color.fromARGB(255,255,255,255),
```

255是透明度，255不透明

Color.fromRGBO()

Color(0xffffffff)

八位十六进制颜色，前两位是透明度



## 页面创建模板



对页面进行动态更新，双向绑定，相当于data的数据

```
class HomePage extends StatefulWidget {

   final String props; 

  @override
  _HomePageState createState() {
    return _HomePageState();
  }

}
class _HomePageState extends State<HomePage> {
 
 String _data = '';

  @override
  Widget build(BuildContext context) {
    return Text("data");
  }
}
```

![image-20210717113740617](C:\Users\gellenliu\AppData\Roaming\Typora\typora-user-images\image-20210717113740617.png)



![image-20210717114141679](C:\Users\gellenliu\AppData\Roaming\Typora\typora-user-images\image-20210717114141679.png)

属性后面要跟一个相应的对象





## 发送请求

添加dio依赖

![image-20210717160142551](C:\Users\gellenliu\AppData\Roaming\Typora\typora-user-images\image-20210717160142551.png)

### get请求

```dart
Dio dio new Dio();
var response = dio.get("/test",data:{"id":12,"name": "adfaf"})
print(response.data)
```

### Post请求

```dar

Dio dio new Dio();
var response = dio.post("/test",data:{"id":12,"name": "adfaf"})
print(response.data)
```



dio返回的数据，用[""]访问





## 组件创建时调用

```da
@override
  void initState() {
    // TODO: implement initState
    super.initState();

  }

```

方法写在state中



## 私有数据赋值

写在setState（）函数中





## flex盒子(row和column)



### web:

```css
div {
  display: flex;
  justify-content: center;
  align-items: center;
}
```



组件

- Row

- Column

- Center





- 主轴：mainAxisAlighment: 

- 交叉轴：crossAxisAlignment: 


![image-20210722165157983](C:\Users\gellenliu\AppData\Roaming\Typora\typora-user-images\image-20210722165157983.png)![image-20210722165234208](C:\Users\gellenliu\AppData\Roaming\Typora\typora-user-images\image-20210722165234208.png)





## 对齐位置

alignment属性

![image-20210722170632391](C:\Users\gellenliu\AppData\Roaming\Typora\typora-user-images\image-20210722170632391.png)

![image-20210722170718252](C:\Users\gellenliu\AppData\Roaming\Typora\typora-user-images\image-20210722170718252.png)

本质是靠数值，可以通过自定义数值来调整位置，

相当于盒子内的绝对布局absolute



![image-20210722172521097](C:\Users\gellenliu\AppData\Roaming\Typora\typora-user-images\image-20210722172521097.png)

盒子的绝对布局

Positioned(

)



margin: EdgeInsets.only( top: 10)；





```js
this.$router.push()

this.$rouuter.go(-1)
```



```html
<div>    <p>Lorem<span>ipsum</span></p></div>
```











## 按需生成builder

![image-20210722172948833](C:\Users\gellenliu\AppData\Roaming\Typora\typora-user-images\image-20210722172948833.png)



## 动画

animationController



比css更强大

不仅是动画，还可以是一个函数，一个过程

![image-20210722174206439](C:\Users\gellenliu\AppData\Roaming\Typora\typora-user-images\image-20210722174206439.png)





## 1、cdn原理

通过cdn技术把**源站的内容缓存到多个节点**。用户向源站域名发起请求时，请求会被调度至最接近用户的服务节点，直接由服务节点直接快速响应，有效降低用户访问延迟，提升可用性。

CDN网络是在用户和服务器之间增加Cache层，主要是通过接管DNS实现，将用户的请求引导到Cache上获得源服务器的数据，从而降低网络的访问的速度。



## 备份CDN

出于游戏稳定性的考虑，开发者可能会想将资源上传至多个CDN中，在一个服务器出问题后，可以自动由其他CDN来替补。

想要配置多CDN，只需要：

1. 开发者可以在`Project Setting标签 >> 游戏设置 >> backupURLs`中配置。
2. 在Loader.load()调用的额外参数里，指定`httpRetryCount = 3`。

这样的话每次下载失败之后，都会重试3次，每次重试都会自动尝试下一个CDN。

## 



## 2、dns原理

寻找与域名对应的ip。

客户机到本地DNS，递归查询

浏览器缓存，系统缓存，路由器缓存，本地dns缓存

本地DNS到其他DNS，迭代查询

告诉你应该向哪个服务器去查询，不用一层一层的找



## 3、首屏渲染优化的方式

Script标签放到底部、DNS预解析、HTTP2.0、CDN、资源压缩、懒加载

缓存、内联css



## 1、箭头函数和普通函数的区别

外形不同、

箭头函数不能用于构造函数，不能使用new

箭头函数的this指向创建它的对象

箭头函数没有原型

箭头函数都是匿名函数，普通函数可匿名也可以具名



## 3、手写div拖拽

```js

//mousedown\mousemove\mouseup

var flag = false
var position = null

xxx.addEventListener('mousedown',function(e){
  flag = true
  position = [e.clientX, e.clientY]
})

document.addEventListener('mousemove', function(e){
  if(flag === false){return ;}
  const x = e.clientX
  const y = e.clientY
  const deltaX = x - position[0]
  const deltaY = y - position[1]

  const left = parseInt(xxx.style.left || 0)
  const top = parseInt(xxx.style.top || 0)
 
  xxx.style.left = left + deltaX + 'px'
  xxx.style.top = top + deltaY + 'px'
  position = [x, y]
})

document.addEventListener('mouseup', function(e){
  flag = false
})
```



## 4、手写防抖节流

```js
function debonce(fn, delay) {
    let timer = null;
    
    return function(){
            clearsetTimeOut(timer);
    timer =  setTimeOut(()=>{
        let args = arguments;
        let context = this;
        fn.apply(context,args);
    },delay)
    }

}

function jieliu() {
    let timer = null;
    return function(){
          let args = arguments;
          let context = this;
          while(!timer){
            timer = setTimeOut(()=>{
      
            fn.apply(context,args);
                timer = null;
        },delay)
      }
    }
  
    
    
}
//闭包，变量不会被0重置

function throttle(fn, delay) {
    let lastTime = 0;
    return function(){
        var nowTime = new Date().getTime();
        console.log(nowTime)
        if(nowTime-lastTime > delay){
            fn.call(this)
            lastTime = nowTime
        }
    }
}
window.addEventListener('resize', debounce(fun,1000))
```



## 3、前端有哪几种部署发布方式

1、nginx，tomcat、iis服务器部署

2、docker容器部署

3、cdn部署



6、typeof和instanceof的区别

## 1、创建一个类

```js
class map {
    constructor(){
        this.x = 0;
        this.y = 0;
    }
    getX(){
        return this.x;
    }
}
let a = new map();
a.x;
```





## 7、call、apply、bind的区别

都是改变this的指向、找function.prototype的call方法。把参数传进入。

call一个一个参数传，apply传一个参数数组，bind不执行，返回一个函数。

8、https是怎么加密的

## 1、对称加密和非对称加密

对称加密使用同样的密钥。

对称加密的密钥进行非对称加密，然后传送给需要它的人。

（1） Alice需要在银行的网站做一笔交易，她的浏览器首先生成了一个随机数作为对称密钥。

（2） Alice的浏览器向银行的网站请求公钥。

（3） 银行将公钥发送给Alice。

（4） Alice的浏览器使用银行的公钥将自己的对称密钥加密。

（5） Alice的浏览器将加密后的对称密钥发送给银行。

（6） 银行使用私钥解密得到Alice浏览器的对称密钥。

（7） Alice与银行可以使用对称密钥来对沟通的内容进行加密与解密了。

 对称加密加密与解密使用的是同样的密钥，所以速度快，但由于需要将密钥在网络传输，所以安全性不高。

非对称：

公钥进行加密，私钥进行解密。公钥公开，私钥自己保管，只有有私钥的才能进行解密。

甲方再用自己私钥对加密后的信息进行解密。甲方想要回复乙方时正好相反，使用乙方的公钥对数据进行加密，同理，乙方使用自己的私钥来进行解密。

## 变量引用

var count = 10
undefined
function a(){return count+10;}
undefined
function b(){var count = 20;return a();}
undefined
b()
20



```js
var count = 10
undefined
function a(){return count+10;}
undefined
function b(){var count = 20;return a();}
undefined
b()
20
function c(){var count = 12;return function(){return count+1;}}
undefined
c()
ƒ (){return count+1;}
c()()
13
function d(){var count = 16;return count + 2;}
undefined
d()
18
```





## 1、手写深拷贝

```js
function copyObj(obj) {
    let res = JSON.parse(JSON.stringify(obj));
    res.__proto__ = obj.__proto__
    return res;
}

Date（）会变成具体时间
RegExp、Error对象会变成空对象
function，undefined会丢失
NaN会变成null
```

```js
//常规方法
 function deepClone(obj) {
     let newObj;
     if(obj && typeof obj != "object") {
         newObj = obj;
}
     else if(obj && typeof obj === 'object') {
         newObj = Array.isArray(obj) ? [] : {};
         
         for(let key in obj){
             if(obj.hasOwnProperty(key)){
                 if(obj[key]&& typeof obj[key] === 'object'){
                     newObj[key] = deepClone(obj[key])
                 }
                 else {
                     newObj[key] = obj[key]
                 }
             }
         }
     }
 }
```



## 1、学习前端的方式

菜鸟教程、技术博客、官方文档，书籍，搜索引擎，同行交流



## bigint的使用

```js
得到的结果是正确的，感兴趣的话可以用字符串模拟乘法运算法则检验一下。
可以看到BigInt与Number的区别在于后缀n，那么在刷题过程中，可以通过toString()的方法，把n去掉。
加一个n
var x = 123456789n;
var y = 987654321n;
console.log(x*y);//121932631112635269n
console.log((x*y).toString());//121932631112635269

```



## 1、选择器的优先级

\1. 第一等：代表内联样式，如: style=””，权值为1000。

\2. 第二等：代表ID选择器，如：#content，权值为0100。

\3. 第三等：代表类，伪类和属性选择器，如.content，权值为0010。

\4. 第四等：代表类型选择器和伪元素选择器，如div p，权值为0001。

\5. 通配符、子选择器、相邻选择器等的。如*、>、+,权值为0000。

\6. 继承的样式没有权值



优先级：!important > 内联样式 > id选择器 > 类、伪类、属性选择器 > 标签、伪元素选择器

权 重： !important：10000

内联： 1000

id选择器：100

类、伪类、属性选择器：10

标签、伪元素选择器：1

通用选择器（*）、子选择器（>）、相邻兄弟选择器（+）、通用兄弟选择器（~）权重值为0

p{color:red;} /*权值为1*/
p span{color:green;} /*权值为1+1=2*/
.warning{color:white;} /*权值为10*/
p span.warning{color:purple;} /*权值为1+1+10=12*/

**权重可以叠加**

当`11个class选择器`和`1个id选择器`在一块时，优先解析的是`id选择器`，并不会出现所谓的`11个class选择器`大于`id选择器`的问题

id和class相差2位的十六进制，所以是16²=256。超过这个数目就有效。

Chrome和Opera：即便class超过256个，权重也无法超过id。





## promise的三种状态

**Pending、fulfilled、Rejected。**

　　**只有异步才可以改变状态。**

　　**resolved：走then**

　　**rejected：走catch**

　　**then走完，状态变为resolved**

　　**catch走完，状态变为resolved**

resolve或者程序正常走完 作用是，将Promise对象的状态从“未完成”变为“成功”（即从 pending 变为 fulfilled），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；
 reject作用是，将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），或者抛出一个错误时候，throw new Erro（“”），会变成reject状态，，，**catch之后，又变成fulfilled状态。**

**Promise.all方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。**

## 1、xss攻击、xsrf攻击、sql注入、举例、怎么防范

xss攻击，是跨站脚本攻击，分为反射型，储存型和DOM型。反射型通常在一串url中包含恶意脚本，点击恶意链接就中招了。储存型是注入到服务器中，用户请求就会返回执行。

攻击者提交恶意代码，浏览器执行恶意代码。

防止cookie劫持，加上httpOnly

过滤用户的输入。

2、csrf，跨站请求伪造。

第三方网站用你的cookie去请求目标网站。。

同源检测，双重cookie，验证码防范。

3、sql注入

用户输入sql信息。

防范：过滤信息，mybatis，负责数据库层mapper层

使用#{}号，会有一个预编译，占位，而且变成字符串，可以防止sql注入。Java JDBC中的`PreparedStatement`预编译预防SQL注入

4、DDOS攻击

不断的发送请求，导致服务器瘫痪

检测技术就是检测网站是否正在遭受 DDoS 攻击，而清洗技术就是清洗掉异常流量。这个需要根据具体的业务进行判断。

5、文件上传漏洞

上传用户图片，选择一个恶意病毒



## 1、css画曲线、画三角形

1、画三角形

使用border，令其他边的颜色为transparent。

可以通过transfrom进行旋转，缩放，拉伸。

宽高为0，是三角形。有宽高就是箭头

2、画圆

```css
background: radial-gradient( circle, transparent 50px, black 51px, transparent 52px );
```

3、曲线运动，贝塞尔曲线运动

cubic-bezier()

## 1、webpack了解吗

可以将多个静态资源js、css转换成一个静态资源。减少页面请求。

可以压缩代码。

webpack本身只处理js，要处理css所以还需要css-loader。等loader

使用plugins功能更强大，loader主要是打包。

这样要根据具体的情况来定

## vue的生命周期钩子函数

```js
  beforeCreate(){
                    console.log('vue实例创建前:'+this.msg+','+this.$el);
                    //    数据data和dom都还没有初始化
                },
                created(){
                    console.log('vue实例创建后:'+this.msg+','+this.$el);
                    //数据dom初始化完成，dom还没有初始化完成
                },
                beforeMount(){
                    console.log('元素挂载前:');
                    console.log(this.$el);
                },
                mounted(){
                    console.log('元素挂载后:');
                    console.log(this.$el);
                },
                beforeUpdate(){
                    console.log('实例更新前');
                    console.log(this.msg);
                    console.log(this.$el);
                },
                updated(){
                    console.log('实例更新后');
                    console.log(this.msg);
                    console.log(this.$el);
                },
                beforeDestroy(){
                    console.log('实例销毁前');
                    console.log(this.msg);
                },
                destroyed(){
                    console.log('实例销毁后');
                    console.log(this.msg);
                }
```





## vue2 diff算法

![img](https://images2018.cnblogs.com/blog/998023/201805/998023-20180519212357826-1474719173.png)

![img](https://images2018.cnblogs.com/blog/998023/201805/998023-20180519213155724-1596106357.png)

```js
//key值是否相等，标签名是否相等,是否是注释节点，他的数据是否相等，类型是否相等，去比较两个节点是否相似
function sameVnode (a, b) {
  return (
    a.key === b.key &&  // key值
    a.tag === b.tag &&  // 标签名
    a.isComment === b.isComment &&  // 是否为注释节点
    // 是否都定义了data，data包含一些具体信息，例如onclick , style
    isDef(a.data) === isDef(b.data) &&  
    sameInputType(a, b) // 当标签是<input>的时候，type必须相同
  )
}

不相同直接进行节点替换


//如果节点相似，进一步比较patch
找到对应的真实dom，称为el
判断Vnode和oldVnode是否指向同一个对象，如果是，那么直接return
如果他们都有文本节点并且不相等，那么将el的文本节点设置为Vnode的文本节点。
如果oldVnode有子节点而Vnode没有，则删除el的子节点
如果oldVnode没有子节点而Vnode有，则将Vnode的子节点真实化之后添加到el
如果两者都有子节点，则执行updateChildren函数比较子节点，这一步很重要

//如果都有子节点，进一步比较，updateChildren
将Vnode的子节点Vch和oldVnode的子节点oldCh提取出来
oldCh和vCh各有两个头尾的变量StartIdx和EndIdx，它们的2个变量相互比较，一共有4种比较方式。如果4种比较都没匹配，如果设置了key，就会用key进行比较，在比较的过程中，变量会往中间靠，一旦StartIdx>EndIdx表明oldCh和vCh至少有一个已经遍历完了，就会结束比较。

如果是oldS和E匹配上了，那么真实dom中的第一个节点会移到最后
如果是oldE和S匹配上了，那么真实dom中的最后一个节点会移到最前，匹配上的两个指针向中间移动
如果四种匹配没有一对是成功的，那么遍历oldChild，S挨个和他们匹配，匹配成功就在真实dom中将成功的节点移到最前面，如果依旧没有成功的，那么将S对应的节点插入到dom中对应的oldS位置，oldS和S指针向中间移动。

/*头尾两个指针向中间移动*/

第一步
oldS = a, oldE = d；
S = a, E = b;
oldS和S匹配，则将dom中的a节点放到第一个，已经是第一个了就不管了，此时dom的位置为：a b d

第二步
oldS = b, oldE = d；
S = c, E = b;
oldS和E匹配，就将原本的b节点移动到最后，因为E是最后一个节点，他们位置要一致，这就是上面说的：当其中两个能匹配上那么真实dom中的相应节点会移到Vnode相应的位置，此时dom的位置为：a d b

第三步
oldS = d, oldE = d；
S = c, E = d;
oldE和E匹配，位置不变此时dom的位置为：a d b

第四步
oldS++;
oldE--;
oldS > oldE;
遍历结束，说明oldCh先遍历完。就将剩余的vCh节点根据自己的的index插入到真实dom中去，此时dom位置为：a c d b

一次模拟完成。

这个匹配过程的结束有两个条件：

oldS > oldE表示oldCh先遍历完，那么就将多余的vCh根据index添加到dom中去（如上图）
S > E表示vCh先遍历完，那么就在真实dom中将区间为[oldS, oldE]的多余节点删掉




//标识key的作用
diff算法只会比较同层的节点，不会跨层级比较。
标识key可以提高diff算法的效率。记录一个索引表
abcd
更新成abfcd
默认diff：将c替换成f，将d替换成c，最后插入d
标识key后：直接插入f。
```



## vue3了解吗，与vue2的区别

速度更快，体积减小，重写了虚拟Dom的实现

一些API的优化

加强了对ts的支持

vue3.0底层，会自动识别某个节点是否是动态的，如果是动态的会自动生成标识（不同的动态会有不同的标识对应，如内容文本的动态，或者id的动态），从而在每次更新dom时，直接跳过哪些静态的节点，直接定位到动态的节点，大大节省效率。

- Custom Renderer API：自定义渲染器
- 在vue3中，新增了一个`setup`生命周期函数，
- 我们在setup中挂载生命周期钩子，当执行到对应的生命周期时，就调用对应的钩子函数：

在vue2.x中，在一个元素上同时使用v-for和v-if，`v-for`有更高的优先级，因此在vue2.x中做性能优化，有一个重要的点就是v-for和v-if不能放在同一个元素上。

**而在vue3中，`v-if`比`v-for`有更高的优先级**，所以会报错





### 4. diff算法优化

深度递归遍历vnode树，节点的标签和key相同认为是同一个节点则更新，不同则删除，然后处理子节点。

**子节点分这几种情况处理**：纯文本、vnode 数组和空

1. 空往往意味着添加或删除；
2. 纯文本相同直接更新innerText，不同则删除；
3. 新旧子节点都是vnode数组则diff算法来处理；

**vue3.0 diff算法思想**

1. 编译模版时进行`静态分析`，`标记动态节点`，diff对比差异时仅对比动态节点（性能提升明显）；
2. diff算法先`去头去尾`，借此缩短遍历对比数组长度（对数组插入和删除操作性能优化明显）；
3. 通过对更新前后子节点数组`建立映射表`的方式，将O(n^2)复杂度的遍历降低到O(n)；
4. 通过`最长递增子序列`方法了来diff前后的子节点数组，减少移动操作的次数；

- vue3.0 diff算法的实现见[demo演示](https://link.zhihu.com/?target=http%3A//alanyf.gitee.io/personal-website/pages/virtualDom-diff-3.0.html)
- 最长递增子序列算法实现：

```text
/*
 * 寻找最长递增子序列
 * 使用动态规划思想，a -> c = a -> b + b -> c
 * 其中p数组存储的是从p[p[i]] 到 p[i] 的最长递增子序列索引，也就是前一个b的索引；
 * r数组存储最后一个元素也就是c的索引
 */
 function getSequenceOfLIS(arr) {
    const p = [0];
    const result = [0];
    for (let i = 0; i < arr.length; i ++) {
        const val = arr[i];
        const top = result[result.length - 1];
        if (arr[top] < val) {
            p[i] = top;
            result.push(i);
            continue;
        }
        // 二分法搜索
        let l = 0, r = result.length - 1;
        while(l < r) {
            const c = (l + r) >> 1;
            if (arr[result[c]] < val) {
                l = c + 1;
            } else {
                r = c;
            }
        }
        if (val < arr[result[l]]) {
            if (l > 0) {
                p[i] = result[l - 1]
            }
            result[l] = i;
        }
    }
    // 回朔p数组，找出最长递增子序列
    let preIndex = result[result.length - 1];
    for (let i = result.length - 1; i > 0; i --) {
        result[i] = preIndex;
        preIndex = p[preIndex]
    }
    return result;
}
```

### 1、监听机制改变

Proxy代替Object。defineProperty

Object.defineProperty 只能监听到属性的读写，而 `Proxy` 除读写外，还可以监听属性的删除，方法的调用等

Object.defineProperty 无法监测数组、对象的变化。而 Proxy 可以直接监视数组、对象的变化。



## vue-cli3禁用eslint

在根目录下的vue.config.js中添加 lintOnSave:false即可



## 1、map和weakmap的区别

map是强引用，weakmap是弱引用。

弱引用会被垃圾回收

map会导致内存泄漏

## js垃圾回收

环境标记法

引用计数法



1、盒模型

computed和watch的区别

js隐式类型转换

1、手写promise

## 2、刘海屏和异性屏

padding

3、scoped的原理

4、正则表达式

5、算法题：一个数组，分成三个和相等的数组

1、垂直居中和水平居中

2、浏览器渲染

3、函数里面定义函数

```js
			function Foo(){
				getName=function(){  //虽然这里没有用var，定义的是全局的，外部直接访问是无法访问的。
					console.log(1)
				}      //这里定义一个函数（从数据类型角度理解），因为是定义在函数内部的函数，外部直接访问是无法访问的。
				return this
			}
getName();//报错
Foo();
getName();//不会报错,1

函数执行之后才定义。定义是全局的
如果getName前面有var，则报错

```

4、用var和不用var声明对象的区别

不用var，就是直接声明在全局对象下面，是全局对象的属性，可用delete删除。

用var声明的，不可以用delete删除。

## map转数组的方法

```js
//1
Array.from(map)
//2
[...map]
//3
for(var key of map){
    
}
```



## iframe实现菜鸟教程的代码网页运行

```js
<!DOCTYPE html>
<html>
	<head></head>
	<body>
		<div>123</div>
		<iframe  id="f2"></iframe>
	</body>
	<script>
		let f2 = document.getElementById("f2")
		let fw = f2.contentWindow.document
		console.log(f2)
		console.log(fw)
		let a = document.createElement("div")
		a.innerText = "123"
		fw.body.appendChild(a)
		console.log(fw)

	</script>
</html>
```





# 面试代码题

## 1、搜索子串的下标

```js
/*
 * 查找一个字符串中的所有子串的位置
 */
var str = "I think of other ages that floated upon the stream of life and love and death";
var positions = new Array();
function searchSubStr(str,subStr){
    var pos = str.indexOf(subStr);
    while(pos>-1){
        positions.push(pos);
        pos = str.indexOf(subStr,pos+1);
    }
}
searchSubStr(str,"o");
alert(positions);//8,11,29,37,51,64
```

## 2、数组扁平化

```js
function flatten(arr) {
    var res = arr.join().split(',')
    res = res.map(item => +item)//字符串变数字
    return res;
}

```

## 对象扁平化

```js
var newobj = {};
function flat(cur, key2) {
	Object.keys(cur).forEach(function(key) {
		if (typeof cur[key] != "object") {
			if (key2) {
				newobj[key2 + key] = cur[key]
			} else {
				newobj[key] = cur[key]
			}
		} else if (typeof cur[key] == "object") {
			if (key2) {
				flat(cur[key], key2 + key + ".")
			} else {
				flat(cur[key], key + ".")
			}
		}
	});
	return newobj
}
var target = flat(source);

```

## 最大和连续子序列

```js
function maxSubArr(arr) {
    let pre = 0; let max = arr[0]
    for(let item of arr) {
        pre = Math.max(item, pre+item)
        max = Math.max(max, pre)
    }
    return max;
}
```





## 脱离文档流后，重排的开销比较小



## 反扁平化

```js
function unflatten(obj) {
	if (Object(obj) !== obj || Array.isArray(obj)) {
		return obj;
	}
	var result = {};
	var r = /\.?([^\.\[\]]+)|\[(\d+)\]/g;    
	for (var prop in obj) {
		var matchs;
		var cur = result;
		var p = "";
		while(matchs = r.exec(prop)) {
			cur = cur[p] || (cur[p] = matchs[2] ? []: {});
			p = matchs[2] || matchs[1];
		}
		cur[p] = obj[prop];
	}
	return result[""] || result;
}

```

## class链式调用（lazyman）

```js


```

## 数组随机排序



第一种、利用数组自带的sort方法，比较函数用随机数-0.5

第二洗牌、下标交互，Math.random()，保持随机下标对应的变量，顺序遍历i，然后交换

## 中文数转阿拉伯数字

```js
//中文转数字
//一百万三千三十一

function toNum(str){
  let a = str.split('')
  for(let i=a.length-1;i>=0;i--){
    if(a[i]=='六'){
      a[i] = 6;
    }
    if(a[i]=='三'){
      a[i] = 3;
    }
    if(a[i]=='一'){
      a[i] = 1;
    }
    if(a[i]=='千'){
      a[i] = 1000;
    }
    if(a[i]=='百'){
      a[i] = 100;
    }
    if(a[i]=='万'){
      a[i] = 10000;
    }
    if(a[i]=='十'){
      a[i] = 10;
    }
  }
  console.log(a)
  let res = []
  while(a.length){
    let k =0;
    let max = 0
    for(let i =0;i<a.length;i++){
      if(a[i]>max){
         k = i;
         max = a[i];
      }
    }
    let all = 1;
    for(let p=0;p<=k;p++){
      all *= a[p]
    }
    console.log(all)
    a.splice(0,k+1)
    res.push(all)
  }
  let ll=0
  for(let i=0;i<res.length;i++){
    ll += res[i]
  }
  console.log(ll)
}
toNum('六千一百三十一')
```



## DOMcontentload和load

1. 解析HTML结构。
2. 加载外部脚本和样式表文件。
3. 解析并执行脚本代码。
4. DOM树构建完成。//DOMContentLoaded
5. 加载图片等外部文件。
6. 页面加载完毕。//load

## CSS背景图和img的加载顺序

先加载html中的img，最后渲染的时候才请求css中的背景图

## nodeJS事件循环机制

- Node 端，microtask 在事件循环的各个阶段之间执行
- 浏览器端，microtask 在事件循环的 macrotask 执行完之后执行

外部输入数据–>轮询阶段(poll)–>检查阶段(check)–>关闭事件回调阶段(close callback)–>定时器检测阶段(timer)–>I/O 事件回调阶段(I/O callbacks)–>闲置阶段(idle, prepare)–>轮询阶段（按照该顺序反复运行）…

- ![img](https://pic3.zhimg.com/80/v2-24fd07c4074bdb1d169f63ad4de59a36_1440w.jpg)

```js
setTimeout(()=>{
    console.log('timer1')
    Promise.resolve().then(function() {
        console.log('promise1')
    })
}, 0)
setTimeout(()=>{
    console.log('timer2')
    Promise.resolve().then(function() {
        console.log('promise2')
    })
}, 0)
```



浏览器端运行结果：`timer1=>promise1=>timer2=>promise2`

Node 端运行结果：`timer1=>timer2=>promise1=>promise2`

## 懒加载(防抖节流混合)

images[i].src = images[i].getAttribute('data-src');

```js

function throttle(fn, delay, atleast) {//函数绑定在 scroll 事件上，当页面滚动时，避免函数被高频触发，
        var timeout = null,//进行去抖处理
        startTime = new Date();
        return function() {
        var curTime = new Date();
        clearTimeout(timeout);
        if(curTime - startTime >= atleast) {
            fn();
            startTime = curTime;
        }else {
            timeout = setTimeout(fn, delay);
        }
        }
    }
    function lazyload() {
        var images = document.getElementsByTagName('img');
        var len    = images.length;
        var n      = 0;      //存储图片加载到的位置，避免每次都从第一张图片开始遍历        
        return function() {
        var seeHeight = document.documentElement.clientHeight;
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        for(var i = n; i < len; i++) {
            if(images[i].offsetTop < seeHeight + scrollTop) {
                if(images[i].getAttribute('src') === 'images/loading.gif') {
                 images[i].src = images[i].getAttribute('data-src');
                }
            n = n + 1;
             }
        }
        }
    }
    var loadImages = lazyload();
    loadImages();          //初始化首页的页面图片
    window.addEventListener('scroll', throttle(loadImages, 500, 1000), false);
　　//函数节流（throttle）与函数去抖（debounce）处理,
//500ms 的延迟，和 1000ms 的间隔，当超过 1000ms 未触发该函数，则立即执行该函数，不然则延迟 500ms 执行该函数
```



## 4、找两个字符串的公共子串

substring

indexof

## 睡眠函数（lazyman，死循环）

```js
//死循环法
class A{
  constructor(name){
    this.name = name;
  }
   sleep(time){
    console.log('sleep')
    let a = new Date().getTime();
     for(;;){
       let b = new Date().getTime();
       if(b-a>=time){
         break;
       }
     }
    return this;
  }
}
let a = new A('小明')
a.sleep(2000).sleep(1000)
```

## 6、最小公倍数，最大公约数

```js
//两个数的最大公约数
function gcd2(a,b){
    var result = 1;
    for(var i = 1; i <= a && i <= b; i++ ){
      if(a%i == 0 && b%i == 0 ){
        result = i;
      }
    }
    return result;
  }
//辗转相除法
function GCD(a,b){
    var temp;
    while(b != 0){
      temp = a % b;
      a = b;
      b = temp;
    }
    return a;
  }

//最小公倍数的算法
function scm(a,b){
  return (a*b)/gcd(a,b);
}
```





## 合并两个有序数组

```js
var merge = function(nums1, nums2) {
  for(let i=0;i<nums1.length;i++){
    for(let j=0;j<nums2.length;j++){
        
        if(nums1[i]<nums2[j]){
            nums2.splice(j,0,nums1[i])
            break;
        }
    }
  }
  return nums2;
};
//取最小的比较，放入一个新的数组
var merge = function(nums1, nums2) {
  let res = []
  let l = nums1.length+nums2.length
  for(let i=0;i<l;i++){
     if(nums1[0]<=nums2[0]){
        res.push(nums1.shift())
     }else {
        res.push(nums2.shift())
     }
  }
  return res;
};
```



## 连续子数组最大和

```js
//暴力
var maxSubArray = function(nums) {
    let max = nums[0];
  for(let i=0;i<nums.length;i++){
      for(let j=i+1;j<=nums.length;j++){
        let tmp = nums.slice(i,j);
        let c = tmp.reduce((a,b,tmp)=>{
            return a+b;
        })
        if(c>max){
            max = c;
        }
      }
  }
  return max;
};
//动态规划
//从第一个开始，如果加上后面的一个，比后面的那个大，那就连起来，连续，否则就重新从后面那个开始，因为它比前面的和都大。
//比较最大值与pre
//只有不是pre成为负数，就一直连续，比较记录最大和。知道x>pre+x，重新开始
var maxSubArray = function(nums) {
let pre = 0, maxAns = nums[0];
    nums.forEach((x) => {
        pre = Math.max(pre + x, x);
        maxAns = Math.max(maxAns, pre);
    });
    return maxAns;
 }

```

## 最小K个数（快排改造）

```js
//快排思想，快排改造优化
每次从[start, end]范围内的数组中随机选择一个标杆元素(代码里取得是第一个元素), 然后把数组中所有小于标杆的放在数组左边，所有大于标杆的元素放在数组右边，然后判断标杆元素的位置是否等于目标位置。如果目标位置小于当前位置，则继续在左边查找，如果目标位置大于当前位置，则继续在右边查找。这样每次迭代都会缩小查找的范围。最理想的情况下时间复杂度是 O(logN)




var getLeastNumbers = function(arr, k){
  quickSort(arr, 0, arr.length - 1);
  return arr.slice(0, k);
}

var quickSort = function(arr, l, r){
  if(l >= r) return;
  let i = l, j = r;
  while(i < j){
    <!-- arr[l]当做标志位，以arr[l]为标准来比较 -->
    while(i < j && arr[j] >= arr[l]) j--;
    while(i < j && arr[i] <= arr[l]) i++;
    swap(arr, i, j);
  }
  <!-- 这轮交换完后，arr[i]的左边都是比它小的，右边都是比它大的 -->
  // 把第一个标志，和中间位置交换
  swap(arr, l, i);

<!-- 二分然后排序 -->
  quickSort(arr, l, i - 1);
  quickSort(arr, i + 1, r);
}

<!-- 交换数组中两个值 -->
var swap = function(arr, i, j){
  let tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}







//快排改造


var getLeastNumbers = function(arr, k) {
    let len = arr.length
    if (!len || !k) return []
    let start = 0
    let end = len - 1
    // 寻找一次标杆元素的位置
    let index = quikSort(arr, start, end)
    // 如果标杆元素的位置不等于 K
    while(index !== k - 1) {
        if (index > k-1) {
            // 如果上一次查找，标杆元素位置大于目标位置
            end = index-1
            index = quikSort(arr, start, end)
        } else {
            // 如果上一次查找，标杆元素位置小于目标位置
            start = index + 1
            index = quikSort(arr, start, end)
        }
    }
    return arr.slice(0, index+1)
};

function quikSort(arr, left, right) {
    let pivot = arr[left]
    while(left < right) {
        while(left < right && arr[right] >= pivot) right--
        arr[left] = arr[right]
        while(left < right && arr[left] < pivot) left++
        arr[right] = arr[left]
    }
    arr[left] = pivot
    //这里不做递归，只找标杆元素的下标就行
    return left
}


```





## 7、搜索所有子串

```js
for(let i=0;i<arr.length;i++){
    for(let j=0;j<arr.length;j++){
        arr.slice(i,j)
    }
}

//搜索含有相同的子串
for(){//遍历第一个元素的所有字串
    for(){//该子串与后面的元素进行匹配
        indexOf()
    }
}

```



## 38、手写ajax

```javascript
//

//创建ajax对象并实例化
var xhr = new XMLHttpRequest()
	//设置请求方式和请求地址
        xhr.open('GET','www.localhost:3000/?name=zs&age=12')
        //readystate是xhr对象中的属性，用来获取ajax状态码 0 1 2 3 4
        xhr.onreadystatechange = function(){
        //判断ajax状态码
        //status获取http状态码。200表示ok
            if(xhr.readyState === 4 && xhr.status === 200){
            //xhr.responseText表示请求返回的数据内容 
                console.log(xhr.responseText)
            }
        };
        //发送
        xhr.send();
```



## 实现some方法

```js
// 实现some
Array.prototype.some = function(fn, value){
    if (typeof fn !== "function") {
        return false;
    }
    var arr = this;
    for (var i = 0; i < arr.length; i++) {
        var result = fn.call(value, arr[i], i, arr);
        if (result) return true;
    }
    return false;
}
```

## 手写filter

```js
Array.prototype.fit = function(fn, value){
  if (typeof fn !== "function") {
      return false;
  }
  var arr = this;
  let res = []
  for (var i = 0; i < arr.length; i++) {
      var result = fn.apply(value, [arr[i]]);
      if (result){
        res.push(arr[i])
      }
  }
  return res;
}
let a = [1,2,3,4]
let b = a.fit((a)=>{
   return a>2
},{})
console.log(b)
```



## 手写promiseALl

```js
Promise.all = function (iterator) {  
    let count = 0//用于计数，当等于len时就resolve
    let len = iterator.length
    let res = []//用于存放结果
    return new Promise((resolve,reject) => {
        for(let i in iterator){
            Promise.resolve(iterator[i])//先转化为Promise对象
            .then((data) => {
                res[i] = data;
                if(++count === len){
                    resolve(res)
                }
            })
            .catch(e => {
                reject(e)
            })
        }
    })
}

Promise.race = function (iterators) {  
    return new Promise((resolve,reject) => {
        for (const p of iterators) {
            Promise.resolve(p)
            .then((res) => {
                resolve(res)
            })
            .catch(e => {
                reject(e)
            })
        }
    })

}
```



## 实现call方法

```js
//模拟call方法
Function.prototype.call_ = function (obj) {
    obj.fn = this; // 此时this就是函数fn
    obj.fn(); // 执行fn
    delete obj.fn; //删除fn
};
fn.call_(obj); // 听风是风
```



## 手写js bridge封装原生

```js
原生端：

public class NativeInjectObject {
    public void openCamera(successCbKey, failCbKey) {
        // 尝试打开摄像头
        if (success) {
            webview.evaluateJavacript(String.format(successCbKey))
        } else {
            webview.evaluateJavacript(String.format(failCbKey))
        }
    }

    public void getLocation(successCbKey, failCbKey) {
        // 尝试获取用户位置
        if (success) {
            webview.evaluateJavacript(String.format(successCbKey))
        } else {
            webview.evaluateJavacript(String.format(failCbKey))
        }
    }
}
//webview上添加接口
webview.addJavascriptInterface(new NativeInjectObject(), 'NativeBridge')

js端：
// 打开摄像头
window.jsbridge
function openCamera() {
  return new Promise((resolve, reject) => {
    const successCbKey = uuid();
    window[successCbKey] = (res) => {
      resolve(res);
      delete window[successCbKey];
    };

    const failCbKey = uuid();
    window[failCbKey] = (err) => {
      reject(err);
      delete window[failCbKey];
    };

    window.NativeBridge.openCamera(successCbKey, failCbKey);
  });
}
```





# 浏览器api

```js
页可见区域宽： document.body.clientWidth;
网页可见区域高： document.body.clientHeight;
网页可见区域宽： document.body.offsetWidth (包括边线的宽);
网页可见区域高： document.body.offsetHeight (包括边线的宽);

网页正文全文宽： document.body.scrollWidth;
网页正文全文高： document.body.scrollHeight;
网页被卷去的高： document.body.scrollTop;
网页被卷去的左： document.body.scrollLeft;
网页正文部分上： window.screenTop;
网页正文部分左： window.screenLeft;
屏幕分辨率的高： window.screen.height;
屏幕分辨率的宽： window.screen.width;
屏幕可用工作区高度： window.screen.availHeight;

HTMLElement.offsetTop 为只读属性，它返回当前元素相对于其 offsetParent 元素的顶部的距离。
window.innerHeight：浏览器窗口的视口（viewport）高度（以像素为单位）；如果有水平滚动条，也包括滚动条高度。

```



## 浏览器缓存

两个容易混淆，no-cache不是不缓存的意思，

no-cache 可以在本地缓存，可以在代理服务器缓存，但是这个缓存要服务器验证才可以使用
no-store 彻底得禁用缓冲，本地和代理服务器都不缓冲，每次都从服务器获取





## 如何判断localStrorage剩余容量

首先用了JSON.stringify(localStorage).length得出你当前页面的localstorage所使用的字符数量current_num。

然后你再去http://arty.name/localstorage.html这里，获取页面的localstorage最大使用量total_num。

total_num - currentnum就是页面的localstorage剩余容量。



# TS入门

- 类 Classes
- 接口 Interfaces
- 模块 Modules 
- 类型注解 Type annotations
- 编译时类型检查 Compile time type checking 

a ?: number;

?:是可选属性，a可以是number或者undefined；

let isDone: boolean = false;

let list: Array<number> = [1, 2, 3];

let list: number[] = [1, 2, 3];

枚举

enum Days { Sun, Mon, Tue, Wed, Thu, Fri, Sat };



function add(x: number, y: number): number {    return x + y; }



我们可以使用 `interface` 来定义复杂数据类型，用来描述形状或抽象行为。如：

```typescript
interface IPerson {
  name: string;
  age: number;
  sayName(): void;
}
```

```js
class Student {
    fullName: string;
    constructor(public firstName, public middleInitial, public lastName) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person : Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("Jane", "M.", "User");

document.body.innerHTML = greeter(user);
```



## manifest 的目的是将Web应用程序安装到设备的主屏幕，为用户提供更快的访问和更丰富的体验。



## WASM,webassembly

用c++写编译成汇编/机器码格式,导入js中执行

用在vr,cad,游戏等场景中

可以用现成的c代码,不需要重新写

编译器:Emscripten

```bash
C/C++ ⇒ LLVM ==> LLVM IR ⇒ Emscripten ⇒ asm.js
```

一旦 JavaScript 引擎发现运行的是 asm.js，就知道这是经过优化的代码，可以跳过语法分析这一步，直接转成汇编语言。另外，浏览器还会调用 WebGL 通过 GPU 执行 asm.js，即 asm.js 的执行引擎与普通的 JavaScript 脚本不同。这些都是 asm.js 运行较快的原因。据称，asm.js 在浏览器里的运行速度，大约是原生代码的50%左右。

Module.cwrap()执行

# 数据库基础

# 计算机网络

## 17、http详解

**支持客户/服务器模式。**
**简单快速**：客户向服务器请求服务时，只需传送请求方法和路径。
**灵活：**HTTP允许传输任意类型的数据对象。正在传输的类型由Content-Type（Content-Type是HTTP包中用来表示内容类型的标识）加以标记。
**无连接**：无连接的含义是限制**每次连接只处理一个请求**。服务器处理完客户的请求，并收到客户的应答后，即断开连接。采用这种方式可以节省传输时间。
**无状态**：无状态是指协议对于事务处理没有记忆能力，服务器不知道客户端是什么状态。
![image-20210325125011649](C:\Users\刘国林\AppData\Roaming\Typora\typora-user-images\image-20210325125011649.png)

在HTTP/1.0版本的时候，客户端与服务器完成一个请求/响应之后，会将之前建立的TCP连接断开，下次请求的时候又要重新建立TCP连接，这也被称为短连接
在HTTP1.0发布仅半年后（1997年1月） ，HTTP/1.1版本发布并带来一个新的功能：在客户端与服务器完成一次请求/响应之后，允许不断开TCP连接，这意味着下次请求就直接使用这个TCP连接而不再需要重新握手建立新连接，这也被称为长连接
注意：长连接是指一次TCP连接允许多次HTTP会话，HTTP永远都是一次请求/响应，会话结束，HTTP本身不存在长连接之说。

## 6、说一下http2.0

http2.0提高访问速度，相比http1.0，请求资源所需的时间更少。

允许多路复用。http1.1中对同一域名下的请求有一定数量限制。

二进制分帧层

在二进制分帧层上，**HTTP 2.0会将所有传输的信息分割为更小的消息和帧**，并对它们采用二进制格式的编码

## 长连接和多路复用的区别

长连接：同一个域名访问同一个文件的多个请求都可以复用一个tcp连接（不用像1.0一样 每次请求都需要重新建立连接）
依然存在的问题：1.多个请求只能被串行处理（数据基于文本，只能按顺序传输）；2.访问多个不同的文件依然会建立多个请求。

多路复用：同一个域名访问多个文件的请求也可以复用一个tcp连接，且多个请求可以被并行处理。
并行实现原理：http2.0引入二进制数据帧和流的概念（数据帧对每一个数据进行标识，可以不按顺序传输，从而实现并行）





## TCP的各种机制

### 1、确认应答机制

每个字节的数据都进行了编号，就是序列号，可以保证你发送的和对方接收的数据的有序的。

### 2、超时重传机制

a发送数据给b后，由于网络堵塞等原因，没有得到确认，a就会重发。

利用序列号可以清楚的过滤掉重发的信息。

重发的时间间隔会**指数递增**，累计一定次数就会关闭连接。

### 3、滑动窗口机制

无需等待确认就可以进行发送。否则要等确认再发送，再等确认再发送，就会很慢。

窗口大小：无需等待确认就可以进行发送的数据最大值

### 4、流量控制机制

TCP根据接收端的处理能力来决定发送端的发送速度。

接收端一旦发现自己的缓冲区快满了，就将滑动窗口的大小设置更小一点。

### 5、拥塞控制

慢启动机制，先发送少量数据摸清当前的网络拥堵状态，再决定按照多大的速度发送。

拥塞窗口的大小，最开始为1，然后指数增长，到达一定阈值之后，线性增长。

### 6、延迟应答

等待接收的数据到达自己的缓冲区大小后，再ack应答。若立即应答，返回的窗口比较小，传输速度下降。

### 7、粘包问题

TCP是一个一个报文传过来的，按照序号放在缓冲区。

粘包问题就是，不知道怎么去划分数据包，不知道从哪一段到哪一段是一个完整的应用层数据包。

UDP没有粘包问题，因为是完整的UDP报文，不存在半个。

### 8、TCP异常

禁止终止：仍然可以发送FIN，正常关闭

断电断网：重传询问



### 可靠性：

1、校验和

2、序列号

3、确认应答

4、超时重传

5、流量控制

6、拥塞控制

### 提高性能：

滑动窗口

快速重传

延迟应答

稍带应答

## UDP只有校验和机制，确保不被修改，完整性













# 设计原则

## 1、开闭原则

## 2、单一责任原则

## 3、里氏替换原则

## 4、依赖倒置原则

## 5、接口隔离原则

## 6、合成复用原则

## 7、迪米特原则





# 图片加载



## 一、图片加载的原理



### 1、加载目标与加载时机

解析dom是时候遇到img的src会请求资源

构建渲染树时，浏览器根据dom节点对css进行匹配，css没有对应的节点：不发送请求，背景仅在应用的元素在页面中存在时，才会产生请求。

执行js的时候，遇到image对象的src会请求资源



![image-20211110170255351](https://image-1251917893.file.myqcloud.com/imgOptimization/docImg/img-load-process.png)

每个页面都有Renderer线程负责渲染页面， 而浏览器有io线程， 用来负责请求资源等。 为什么io线程不是放在每个页面里面而是放在浏览器框架呢？因为这样的好处是如果两个页面页面请求了相同资源的话， 如果有缓存的话就能避免重复请求了。



### 3、加载拦截

kCSP,  *//csp内容安全策略检查* 

```html
// 只信任当前域的图片请求
<meta http-equiv='Content-Security-Policy' content='img-src "self";'>
```

kMixedContent, *//mixed content* 

```html
// 不允许在https页面中嵌入http请求，可自动升级http为https
<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
```

kOrigin, *//secure origin* 

kInspector, *//devtools的检查器* 

kSubresourceFilter,

 kOther, 

kNone





### 4、资源加载优先级

 very-high、high、medium、  、low、very-low，

其中MainRescource页面、css、字体这三个的优先级是最高的，然后是script，ajax这种， 而图片、音频的默认优先级是比较低的， 最低的事prefetch预加载的资源。

![image-20211110151425522](https://image-1251917893.file.myqcloud.com/imgOptimization/docImg/img-priority.png)

在优先级在Medium以下的为delayable，即可推迟的， 而大于等于medium的为不可delayable的。从刚刚我们总结的表可以看出：css/js是不可推迟的，而图片， preload的js为可推迟加载：



如图：css样式表优先加载，图片资源处于pending等待状态

![image-20211111143049717](https://image-1251917893.file.myqcloud.com/imgOptimization/docImg/img-priority-test1.png)

![image-20211110161652705](https://image-1251917893.file.myqcloud.com/imgOptimization/docImg/img-priority-test2.png)

### 5、浏览器最大并发请求数

`HTTP/1.1`中，单个TCP连接，在同一时间只能处理一个http请求，虽然存在Pipelining技术支持多个请求同时发送，但由于实践中存在很多问题无法解决，所以浏览器默认是关闭，所以可以认为是不支持同时多个请求。

`HTTP2`提供了多路传输功能，多个http请求，可以同时在同一个TCP连接中进行传输。

Chrome浏览器最多允许对同一个域名Host建立6个TCP连接，不同的浏览器有所区别。

如果图片都是HTTPS的连接，并且在同一域名下，浏览器会先和服务器协商使用`HTTP2`的`Multiplexing`功能进行多路传输，不过未必所有的挂在这个域名下的资源都会使用同一个TCP连接。如果用不了HTTPS或者HTTP2（HTTP2是在HTTPS上实现的），那么浏览器会就在同一个host建立多个TCP连接，每一个TCP连接进行顺序请求资源。

同一域名一般为6个左右，最大不超过10个。

假如一个页面有120个静态资源（css、js、img），并且所有资源都在一个域名下，使用的浏览器最大网络并行请求资源数是6，假设理想一些：所有请求时间都是一样的，每个文件加载需要500ms，则所有资源加载完成需要 120/6 * 0.5 = 10s 的时间。

**优化方案：**

1、控制首屏资源加载数，合并请求等

2、将静态资源分布在不同的服务器中，使用多个域名，加大并发量



### 6、资源加载的过程

![image-20211112174203132](https://image-1251917893.file.myqcloud.com/imgOptimization/docImg/load-timing.png)



![image-20211112115100514](https://image-1251917893.file.myqcloud.com/imgOptimization/docImg/load-timing-2.png)

第一次访问有初始化连接和SSL开销，后面没有说明用的是同一个tcp连接,只有stalled的等待时间



**Queued at ：**表示该请求加入到请求队列中的时刻，请求队列在打开F12后第一次发送请求的时候创建，直到关闭控制台的时候销毁。
 **Started at ：**表示请求开始处理的时刻。
 **Queueing：**表示请求从加入到请求队列中到请求开始处理经过的时间。
 **Stalled：**请求在可以被发送出去之前的等待时间（阻塞时间），一般是等待可复用的TCP连接释放的时间。浏览器对于单个域名只能同时建立4~6个TCP连接（不同浏览器实现有差异）。
 **Proxy Negotiation：**浏览器和代理服务器连接的协商时间。
 **DNS Lookup：**域名解析花费的时间。
 **Initial Connection：**建立TCP连接花费的的时间，包括TCP握手/重试和协商SSL。
 **Request sent：**发送请求花费的时间。
 **Waiting (TTFB)：**从发出请求到接收到响应第一个字节经过的时间，包括网络延迟时间。
 **Content Download：**接收响应花费的时间。





<font color=#00ab46 size=5> Queueing </font>  

请求文件顺序的的排序

<font color=#00ab46 size=5> Stalled </font>  

是浏览器得到要发出这个请求的指令到请求可以发出的等待时间，一般是代理协商、以及等待可复用的TCP连接释放的时间，不包括DNS查询、建立TCP连接等时间等

> 同域名最大TCP连接并发为6左右，可使用多种域名提高并发量

<font color=#00ab46 size=5> DNS Lookup  </font>  

时间执行DNS查找。每个新域pagerequires DNS查找一个完整的往返。 DNS查询的时间，当本地DNS缓存没有的时候，这个时间可能是有一段长度的，但是比如你一旦在host中设置了DNS，或者第二次访问，由于浏览器的DNS缓存还在，这个时间就为0了。

```html
DNS预解析
<link rel="preconnect" href="https://xxx.me">
```



<font color=#00ab46 size=5> Initial connection  </font>  

建立TCP连接的时间，就相当于客户端从发请求开始到TCP握手结束这一段，包括DNS查询+Proxy时间+TCP握手时间。

```html
预建立TCP链接：
<link rel="preconnect" href="https://xxxime.com">
```

<font color=#00ab46 size=5> SSL  </font> 

https加密

<font color=#00ab46 size=5> Request sent </font> 

 请求第一个字节发出前到最后一个字节发出后的时间，也就是上传时间

<font color=#00ab46 size=5> WaitingTTFB </font>  

请求发出后，到收到响应的第一个字节所花费的时间(Time To First Byte),发送请求完毕到接收请求开始的时间;这个时间段就代表服务器处理和返回数据网络延时时间了。服务器优化的目的就是要让这个时间段尽可能短。

> 服务器优化

<font color=#00ab46 size=5> Content Download  </font>  

收到响应的第一个字节，到接受完最后一个字节的时间，就是下载时间

> 压缩资源体积，减少下载时间







参考文献：

1、https://segmentfault.com/a/1190000016369295 《[理解浏览器允许的并发请求资源数](https://segmentfault.com/a/1190000016369295)》

2、https://blog.csdn.net/qq_34178990/article/details/82822662《从chrome源码看浏览器如何加载资源》



## 二、懒加载

### 1、什么是懒加载

有时候一个网页会包含很多的图片，例如淘宝京东这些购物网站，商品图片多只之又多，页面图片多，加载的图片就多。服务器压力就会很大。不仅影响渲染速度还会浪费带宽。比如一个1M大小的图片，并发情况下，达到1000并发，即同时有1000个人访问，就会产生1个G的带宽。

懒加载即延迟加载，需要的时候再进行图片的加载，而不是一次性加载全部图片

### 2、原理

页面中的img元素，如果没有src属性，浏览器就不会发出请求去下载图片，只有通过javascript设置了图片路径，浏览器才会发送请求。

一张图片就是一个`<img>`标签，浏览器是否发起请求图片是根据`<img>`的src属性，所以实现懒加载的关键就是，在图片没有进入可视区域时，先不给`<img>`的src赋值，这样浏览器就不会发送请求了，等到图片进入可视区域再给src赋值。

`data-xxx` 中的`xxx`可以自定义，这里我们可以使用`data-src`来保存图片链接。

### 3、懒加载的优点

1、减轻服务器压力
2、减少无效的资源的加载并发加载的资源过多会阻塞js 的加载,影响网站的正常使用

![image-20211108160239293](https://image-1251917893.file.myqcloud.com/imgOptimization/docImg/lazy-load-theory.png)

如图：不使用懒加载，需要下载5.9M资源，load耗时1.06s

![image-20211112170920349](https://image-1251917893.file.myqcloud.com/imgOptimization/docImg/lazy-load-test1.png)

如图：使用懒加载，仅需下载1.2m资源，load耗时225ms

![image-20211112171020713](https://image-1251917893.file.myqcloud.com/imgOptimization/docImg/lazy-test2.png)



### 4、使用场景

懒加载适用于图片较多，页面较长的页面场景中。

1、超长列表滚动时

2、图片资源多，且用户无需第一时间看到全部

4、首屏加载完成了再进行加载，监听load事件



### 5、代码示例

```html
<div class="container">
     <img src="loading.gif"  data-src="pic.png">
     <img src="loading.gif"  data-src="pic.png">
     <img src="loading.gif"  data-src="pic.png">
     <img src="loading.gif"  data-src="pic.png">
     <img src="loading.gif"  data-src="pic.png">
     <img src="loading.gif"  data-src="pic.png">
</div>
<script>
var imgs = document.querySelectorAll('img');
function lozyLoad(){
		var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
		var winHeight= window.innerHeight;
		for(var i=0;i < imgs.length;i++){
			if(imgs[i].offsetTop < scrollTop + winHeight ){
				imgs[i].src = imgs[i].getAttribute('data-src');
			}
		}
	}
  window.onscroll = lozyLoad();
</script>

//vue项目中使用
<script src="https://image-1251917893.file.myqcloud.com/igame/npm/vue-lazyload@1.3.3/vue-lazyload.js"></script>
```

如图：首页只加载1、2、3的图片

![image-20211111113809423](https://image-1251917893.file.myqcloud.com/imgOptimization/docImg/lazy-test3.png)

如图：浏览器往下滑动时，才开始加载4、5、6、7图片

![image-20211111113855425](https://image-1251917893.file.myqcloud.com/imgOptimization/docImg/lazy-test4.png)



## 三、预加载



### 1、什么是预加载

预加载即提前加载，当需要使用时直接从缓存中获取即可。

### 2、原理

提前加载资源，减少等待时间，优化用户体验

### 3、预加载的优点

提前加载资源，减少等待时间，优化用户体验

### 4、使用场景

- 图片等静态资源在使用之前就提前请求，资源使用到的时候能从缓存中加载, 提升用户体验

  1、hover显示图片

  2、tab切换

  3、点击按钮显示图片等需要快速显示图片的场景



### 5、代码示例

#### 方法1：标签法

使用img标签

```js
<img src="haorooms.jpg" style="display: none" />
//ps：对于用display: none隐藏的元素css背景，不会产生HTTP请求
```

使用link标签：

```html
<link rel="prefetch" href="image.png">
```

优点：可在不支持js或未开启js支持的浏览器使用

#### 方法2：image对象

```js
// 给img的src赋值，即可触发请求
var img = new Image();
img.src = "https://xxx.png";

//需要预加载的图片路径存放在数组里


var imgList = [
        "1.png",
        "2.png",
        "3.png"
    ];
//遍历数组的路径，预加载
for (var i = 0; i < imgList.length; i++) {
    var img = new Image();
    img.src = imgList[i];
 }

```

#### 方法3：请求、使用其他库 Preload.js

xmlHttpRequest 异步请求.  优点: 可以监控Process 比如现在已经加载了多少.便于操控, 缺点有跨域问题.
 使用其他库 比如Preload.js , 这个其实原生也是用src 或者 xmlHTTPRequest实现,默认是XMLHTTPRequest,

> 官网：https://www.createjs.com/preloadjs

```js
var mainfest = [
  { src: "img/loading.gif" },
  { src: "img/background.png" },
  { src: "img/bg_repeat.jpg" },
// 音频
  { src: "./music/loop.mp3",id:'loop' },
// 视频
 { src: "./video/video_01.mp4",id:'myVideo' }
  
];
 
var preload = {
  // 预加载函数
  startPreload: function () {
    var preload = new createjs.LoadQueue(true);
    //为preloaded添加整个队列变化时展示的进度事件
    preload.addEventListener("progress", this.handleFileProgress);
    //注意加载音频文件需要调用如下代码行
    preload.installPlugin(createjs.SOUND);
    //为preloaded添加当队列完成全部加载后触发事件
    preload.addEventListener("complete", this.loadComplete);
    //设置最大并发连接数  最大值为10
    preload.setMaxConnections(1);
    preload.loadManifest(mainfest);
  },
  // 当整个队列变化时展示的进度事件的处理函数
  handleFileProgress: function (event) {
    $(".percent").text('loading...' + Math.ceil(event.loaded * 100) + "%");
  },
  // 处理preload添加当队列完成全部加载后触发事件
  loadComplete: function () {
    shuangjie.$pageLoad.addClass('hide').next().removeClass('hide')
  }
}
preload.startPreload();
```



#### 方法4：css

```css
/* 伪元素背景预加载 */
.animate-pre-load::after {
      content: "";
      background: url(https://image-1251917893.file.myqcloud.com/imgOptimization/d-1.png) no-repeat 0 0;
      background-size: 100% 100%;
    }

/* 动画延迟预加载 */
.animate-pre-load {
      animation: animatePre 1s forwards;
      animation-delay: 2s;
    }
    @keyframes animatePre {
      0% {}
      100% {
        background: url(https://image-1251917893.file.myqcloud.com/imgOptimization/b-1.png) no-repeat 0 0;
        background-size: 100% 100%;
      }
    }
```



![image-20211111155156576](https://image-1251917893.file.myqcloud.com/imgOptimization/docImg/pre-load-test1.png)



## 总结

**懒加载与预加载的区别：**
这两种方式都是提高网页性能的方式，两者主要区别是一个是提前加载，一个是迟缓甚至不加载。懒加载对服务器前端有一定的缓解压力作用，预加载则会增加服务器前端压力。



# canvas

## canvas学习

平面坐标： 左上角是0 0 

```js
var c=document.getElementById("myCanvas");// 获取dom节点
var ctx=c.getContext("2d");  //创建contenx
ctx.fillStyle="#FF0000"; //颜色
ctx.fillRect(0,0,150,75);  //位置与宽高

ctx.moveTo(x,y) //移动画笔
ctx.lineTo(200, 100)//移动画笔到结束位置
ctx.stroke() //画线

//画圆
ctx.beginPath();
ctx.arc(195,60,40,0,2*Math.PI);// x,y位置，40为直径，0为启始画点，2*Math.PI为终点，2*Math.PI画一圈，4*Math.PI画两圈
ctx.stroke();

// 画字
ctx.font="30px Arial";
ctx.fillText("Hello World",10,50);

// 创建渐变
var grd=ctx.createLinearGradient(0,0,200,0);
grd.addColorStop(0,"red");
grd.addColorStop(1,"white");
// 填充渐变
ctx.fillStyle=grd;
ctx.fillRect(10,10,150,80);

// 图片
var img=document.getElementById("scream");
ctx.drawImage(img,10,10);


// 
平移 context.translate(x,y) 将默认的坐标系源点盐x轴y轴分别移动指定单位长度
坐标缩放 context.scale(x,y) x,y是缩放的陪数
坐标旋转 context.rotate(angle) 旋转一定角度，angle负时逆时针旋转

// 堆栈原理保存状态
save():保存当前的绘图状态。（当前画笔的各个属性）
restore():恢复之前保存的绘图状态。

canvas	取得画布<canvas>元素
fillStyle	填充路径的当前的颜色、模式或渐变
globalCompositeOperation	指定颜色如何与画布上已有颜色组合（合成）
lineCap	指定线段端点的绘制方式
lineJoin	指定线段连接的绘制方式
lineWidth	绘制线段的宽度
miterLimit	当lineJoin为miter时，这个属性指定斜连接长度和二分之一线宽的最大比率
shadowBlur	指定阴影模糊度
shadowColor	指定阴影颜色
shadowOffsetX	指定阴影水平偏移值
shadowOffsetY	指定阴影垂直偏移值
strokeStyle	指定线段颜色

// 
beginPath() 方法开始一条路径，或重置当前的路径。
提示：请使用这些方法来创建路径：moveTo()、lineTo()、quadricCurveTo()、bezierCurveTo()、arcTo() 以及 arc()。
提示：请使用 stroke() 方法在画布上绘制确切的路径。
```





默认宽高：300*150

不能通过css来控制，只能修改标签属性

1、获取canvas对象

```js
var canvas = document.getElementById("cans")
```



2、创建上下文

```js
var ctx = canvas.getContext("2d")
```



3、坐标轴

左上角是0，0



## 绘制矩形

```js
ctx.fillRect(x, y, width, height);//绘制一个填充的矩形

// 绘制一个矩形边框
ctx.stokeRect(x, y, width, height);

// 清空矩形区域（橡皮擦）
ctx.clearRect(x, y, width, height)

```





## 绘制路径

```js
// 开启路径
ctx.beginPath()

ctx.moveTo(x, y); // 移动画笔
ctx.lineTo(x, y); // 从画笔处画线至改坐标

// 画圆
ctx.arc()

ctx.stroke();//绘线，不描边看不到上面的画线
ctx.fill();//填充路径的区域, 不描边也可以填充


// 结束路径
ctx.closePath()
或者可以再画线至起点



```

## 使用样式和颜色

```js
// 这些 fillStyle 的值均为 '橙色'
ctx.fillStyle = "orange";
ctx.fillStyle = "#FFA500";
ctx.fillStyle = "rgb(255,165,0)";
ctx.fillStyle = "rgba(255,165,0,1)";
// 画线的样式
ctx.strokeStyle = "rgba(255,0,0,0.5)";

// 透明度
 // 设置透明度值
  ctx.globalAlpha = 0.2;
或者用rgba（）  rgba更加灵活



// 虚线
用 setLineDash 方法和
lineDashOffset 属性来制定虚线样式.
setLineDash 方法接受一个数组，来指定线段与间隙的交替；
lineDashOffset 属性设置起始偏移量.


// 渐变
渐变颜色
gradient.addColorStop(position, color)
lineargradient.addColorStop(0,'white');
lineargradient.addColorStop(1,'black');

、、渐变距离
createLinearGradient(x1, y1, x2, y2)
createLinearGradient 方法接受 4 个参数，表示渐变的起点 (x1,y1) 与终点 (x2,y2)。
createRadialGradient(x1, y1, r1, x2, y2, r2)
createRadialGradient 方法接受 6 个参数，前三个定义一个以 (x1,y1) 为原点，半径为 r1 的圆，后三个参数则定义另一个以 (x2,y2) 为原点，半径为 r2 的圆。
```





## 3d转2d

```js
//有一个点B，我们从A点观察B点。那么B点在xy平面上的投影即AB的延长线与平面xy的交点C。而xy平面不就是可以看一个二维的canvas画布吗。
投影原理
```





## 绘制图片

先获取图片的width和height

swidth是计算图片里面的

width是所裁剪出来的部分画在画布上的尺寸

```js
drawImage(img, sx, sy, swidth, sheight, x, y, width, height)
```



![image-20211215102059758](C:\Users\gellenliu\AppData\Roaming\Typora\typora-user-images\image-20211215102059758.png)



```js
let backgroundImage = new Image()
backgroundImage.src = this.backgroundSrc
backgroundImage.onload = ()=> {
  ctx.drawImage(backgroundImage, this.x, this.y, this.width, this.height)
}
```





加载完才绘制，否则有可能绘制不出来



## ctx.drawImage的图片，无论是网络图片还是本地图片都有一下结果

1、如果不做预加载，放在class里面，画不出来，放在onload等图片加载完才能画出来。
2、做了预加载之后，放在class里面，在开发者工具可以直接画出来，但是在手机上还是画不出来，要在onload才能画出来。
3、如果放在class外面，手机和开发者工具都可以直接画出来，

解决方案：

1、确实要等加载完才能画，代码运行速度肯定比加载快，所以画不出来，当然也可以requestAnimationFrame不断刷出来

2、预加载后，可以直接从缓存里面取图片，但还是有一个加载的时间，有可能画不出来，与不同机器的性能、取缓存的速度有关

3、class外面定义，小游戏最开始的加载页面就进行下载小游戏的代码包，会执行相关的js，所以class外面定义的image最开始就进行加载了，并且一直保持着这个对象在内存中，属于全局变量。

4、只刷一次的，可放onload里面；requestAnimationFrame刷新的可以不用管（最开始会刷不出来）；静态图片可放class外面放全局变量保存（渲染最快）；

5、做预加载，可加快onload的时间





## databus全局状态管理，可做页面跳转判断

main函数不断刷新，判断databus的页面的值选择渲染哪个页面





## 在一个canvas里面新建另外的canvas

用drawImage绘制canvas在当面canvas上





audio.addEventListener("canplay", function(){//监听audio是否加载完毕





## cavas点击事件

获取触摸的坐标，如果坐标在按钮的范围之内，就触发点击函数

## 排行榜滚动

将数据绘制在离屏cavas上，再将这个canvas绘制再小游戏主canvas上，通过监听触摸滑动距离来控制drawImage的截取区域。

 touchMoveHandler(e) {

​    e.preventDefault();

​    const x = e.touches[0].clientX;

​    const y = e.touches[0].clientY;

# 常用网站

## UML图绘画地址

https://www.processon.com/diagrams



## canvas提高清晰度

增加dpr倍像素，再缩放画布

const dpr = wx.getSystemInfoSync().pixelRatio;

canvas.width = window.innerWidth * dpr;

canvas.height = window.innerHeight * dpr;

ctx.scale(dpr, dpr);



## canvas播放视频

创建video标签或者对象。该对象可以直接传入drawImage。但只绘制当前播放的帧。所以要用requestAnimationFrame来递归播放。

也可以对cavas对象进行像素操作，比如绿幕抠图，抠视频





## 陨石位置算法

（屏幕宽度-陨石宽度） * 随机数（0到1）

## 碰撞算法

判断子弹位置和陨石位置，碰撞后子弹消失，陨石生命减一。如果陨石生命为0 ，石头爆炸，返回true。

X + WIDTH/2中心点，是否在碰撞的宽度内。飞机和陨石双重判断逻辑，飞机中心在陨石上，或者陨石中心在飞机上，都爆炸





# webpack

entry里面配置入口文件

output里面配置出口文件和路径

rules里面的test用正则去匹配相关文件，然后use属性配置相关的loader，按顺序调用。

loader的主要作用是将css、图片、sass等其他文件，解析成js文件

file-loader和Url-loader可以接收任何文件，比如字体文件

plugins配置插件，数组里面放插件对象，会自动执行插件的apply方法。

编写插件：一个class，构造函数（参数），apply方法（会自动调用该方法），module.exports = xxx。

detool属性配置source-map，可以追踪错误代码

loader是处理文件的，插件相当于一些自动化脚本

tree shaking: 自动删除未引用的代码。

vue-cli内部只能通过vue.config.js配置，configWebpack属性。和chainWebpack链式维护。



## webpack打包

webpack是一个前端资源加载/打包工具。

Webpack 本身只能处理 JavaScript 模块，如果要处理其他类型的文件，就需要使用 loader 进行转换。

webpack 命令执行后，会默认载入当前目录的 webpack.config.js 文件。

```javascript
module.exports = {
    entry: "./runoob1.js",//输入要打包的文件
    output: {
        path: __dirname,
        filename: "bundle.js"   //打包后输出的静态文件
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style-loader!css-loader" }
        ]
    }
};
```





## 新技术

框架： svelte，

微前端：阿里qiankun

低代码：腾讯微搭，阿里宜搭

js基础设施的未来：rust

新的构建工具：vite





6、低代码将持续成为热点话题
距我们在2020-技术趋势中谈及“低代码"”又过去了一年，从2020年19亿到2021年28.5亿的市场规模，无疑表明该领域依日火热，依旧在快速发展中。如果说2020年让我们收获了对低代码领域持续升温的预期，那么2021年则让我们看到了更多关于低代码领域未来发展的趋势。
一方面，我们看到腾讯微搭、阿里宜搭等企业级低代码平台在行业内开始发力，公司内也有无极等专注管理台搭建的平台逐步成熟。大量平台型产品仍在差异化高速发展，仍是主流的发展思路。在IMWeb团队内，从19年开始的运营低码平台Vision，到20年的管理台低码框架Hulk，我们一直在通过垂直类低码平台加速业务研发。2021年，我们进一步在服务端场景进行了尝试，打磨出了专注接口搭建的HulkData平台。
HulkData通过Web可视化组件搭建流水线，基于数据库或已有JAPI，配合少量代码生成全新的API接口。HulkData借鉴BPMN2.0协议使用图形来表达业务流程，支持多业务，多数据资源，低代码、插件机制、流程编排、请求和响应参数修改。Serverless日渐成熟，Serverless 的无运维特性对HulkData而言是一个非常良好的契机，在HulkData 上创建的接口会以SCF的方式部署到腾讯云，不需要再关注服务器运维。使用HulkData 服务端接口编排可快速实现业务逻辑，敏捷接付业务应用，比传统开发模式交付速度提升80%。目前内部三大业务接入使用共400+接口在正常运行。
另一方面，值得思考的是，在高速发展的差异化、场景化的平台产品之间，是否存在某些共性?
毕竟不管针对什么场景，从零建设一个低码平台的成本绝不低，此
类的资源浪费在大厂里尤为突出。
20年底IMWeb团队内启动的Gems低代码引擎项目，其实就是对这个问题的探索。低代码引擎的核心目标，是提供一套基础标准、设施，帮助上层平台更有效地建设。而其思路的关键，在于引擎模型及能力的完备性、以及针对不同场景下的可扩展性。Gems作为低代码引擎，在21年里不断完善自身的基础能力与设计，提供了全面板插件化、核心编辑对象AP|等能力。除了平稳支撑团队内的运营与管理台低码平台，也逐步迈出到团队之外，帮助到公司内多个团队在自身业务场景低码平台的高效建设。有关Gems的更多内容可以关注我们团队在QCon的相关分享。

同时，我们也看到在今年底的GMTC大会上，阿里已经对外宣传了集团的低代码引擎，从分享内容看已经支撑了60多个低代码平台的建设;而腾讯内部的低代码Oteam也在21年开始组织起来，主要的目标也是底层核心的共建。从整个行业看，低代码引擎已经开始崭露头角，且可预见到趋势还将上升。只是这个细分赛道更多可能只是大厂参与，因为其需要大量的场景支撑验证，而这是小厂或独立开发者不具备的
同时，我们也看到在今年底的gmtc大会上，阿里已经对外宣传了集团的低代码引擎，从分享内容看已经支撑了60多个低代码平台的建设；而腾讯内部的低代码也在21年开始组织起来，主要的目标也是底层核心的共建.从整个行业看，低代码引擎已经开始崭露头角，且可预见到趋势还将上升.只是这个细分赛道更多可能只是大厂参与，因为其需要大量的场景支撑验证，而这是小厂或独立开发者不具备的



## css modules

通过构建工具改变css的类名，或者选择器名字来实现作用域，scoped也是。解决全局命名冲突，样式冲突，模块化。

通过webpack的css-loader来实现。


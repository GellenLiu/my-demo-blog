
# JavaScript学习笔记





## 数据类型

Number

String

Boolean

Undefined

null

symbol

bigint



Object

Function

Array

## symbol有什么用

symbol是唯一的。表示唯一的值



```js
let mySymbol = Symbol();创建

let s1 = Symbol.for('foo'); let s2 = Symbol.for('foo'); s1 === s2 *// true*


let s1 = Symbol.for("foo");
Symbol.keyFor(s1) // "foo"
```



Symbol 作为属性名，该属性不会出现在for...in、for...of循环中，也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。所以我们可以用Object.getOwnPropertySymbols方法，获取指定对象的所有 Symbol 属性名。



```js
如果两个操作数不是相同的类型，JavaScript转换
操作数n适用严格的比较。如果任一操作数是数字
或布尔值，则操作数将转换为数字（如果可能）; else
如果任一操作数是字符串，则另一个操作数转换为
字符串（如果可能）。如果两个操作数都是对象，则JavaScript
比较内部引用，当操作数引用
时内存中的相同对象时，内部引用相等
```








## typeof和instanceof的区别

typeof判断数据类型，返回类型

“typeof”可以返回的数据类型有：“number”、“string”、“boolean”、“undefined”、“object”、“function”

instanceof判断该对象是谁的示例，返回true或false,原型链上的都为true

## 简单请求和非简单请求

只要同时满足以下两大条件，就属于简单请求。

```
（1) 请求方法是以下三种方法之一：
    HEAD
    GET
    POST
（2）HTTP的头信息不超出以下几种字段：   
    Accept
    Accept-Language
    Content-Language
    Last-Event-ID
    Content-Type：只限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain
```

## HEAD请求

常常被忽略，但是能提供很多有用的信息，特别是在有限的速度和带宽下。主要有以下特点：
1、只请求资源的首部；
2、检查超链接的有效性；
3、检查网页是否被修改；
4、多用于自动搜索机器人获取网页的标志信息，获取rss种子信息，或者传递安全认证信息等

于HEAD请求的回应部分来说，它的HTTP头部中包含的信息与通过GET请求所得到的信息是相同的。利用这个方法，不必传输整个资源内容，就可以得到Request-URI所标识的资源的信息。

## Option请求

浏览器必须首先使用 OPTIONS 方法发起一个预检请求(preflight request)，从而获知服务端是否允许该跨域请求。服务器确认允许之后，才发起实际的 HTTP 请求。



## 1、字符串的不可变性

eg. 

```javascript
let str = "abcd"
str[0] = 'f'
console.log(str[0]);// 输出是a

```

不能改变单个字符的值，只能重新赋值整个字符串。



## 2、数组

Array可以包含任意的数据类型

```javascript
let arr = [1,2,3,null,'abc']
```

1、长度

```javascript
arr.length
```

2、indexOf，通过元素获得下标索引

3、slice（）  截取Array的一部分，返回一个新的数组

4、push,pop

​	push;压入到尾部

​	pop弹出一个元素

5、unshift（），shift（）

​	unshift压入到头部

​	shift弹出头部的一个元素

6、sort（）排序

7、元素反转reverse（）

8、concat（）拼接数组，返回一个新是数组

9、连接符join（）

​	打印拼接数组，使用特定的字符串连接

```javascript
let arr = ["c","b","a"]
arr.join("-")
"c-b-a"
```

10、多维数组

```javascript
let arr = [[1,2,3],[4,5,6]]
arr[0][1]// 2
```

### 11、连接连个数组

arr = [...arr1,...arr2]

## 2.2数组排序

```
var points = [40, 100, 1, 5, 25, 10];
points.sort(function(a, b){return a - b}); 
需要重写sort的比值函数，不然会根据字符串来排序
```

## 2.4数组去重

```js
let a = Array.from(new Set(arr)
```

## 3、对象

```javascript
// 定义了一个对象
var 对象名 = {
    属性名： 属性值，
    属性名： 属性值，
    属性名： 属性值
}
```

用{}包裹，键值对描述属性。

**使用 prototype 属性就可以给对象的构造函数添加新的属性：**

JavaScript中所有的键都是字符串，值是任意对象。



### 遍历对象

for(let item in obj)

Object.keys主要用于遍历对象自有的可枚举属性，不包括继承自原型的属性和不可枚举的属性。

### new做了什么

(1) 创建一个新对象；
(2) 将构造函数的作用域赋给新对象（因此 this 就指向了这个新对象） ；
(3) 执行构造函数中的代码（为这个新对象添加属性） ；
(4) 返回新对象。



```js
function foo(a){
    this.a = a;
}
var bar = new foo(2);
console.log(bar.a); // 2
// 其中 new foo(2) 进行的是类似如下的操作
{
	var obj = new Object();
	obj.__proto__ = foo.prototype;
	var result = foo.call(obj,"2");
	return result === 'object' ? result : obj
}
```



————————————————

**一、构造函数法**

这是经典方法，也是教科书必教的方法。它用构造函数模拟"类"，在其内部用this关键字指代实例对象。

> 　　function Cat() {
>
> 　　　　this.name = "大毛";
>
> 　　}

生成实例的时候，使用new关键字。

> 　　var cat1 = new Cat();
>
> 　　alert(cat1.name); // 大毛

类的属性和方法，还可以定义在构造函数的prototype对象之上。

> 　　Cat.prototype.makeSound = function(){
>
> 　　　　alert("喵喵喵");
>
> 　　}

二、

> 　　var Cat = {
>
> 　　　　name: "大毛",
>
> 　　　　makeSound: function(){ alert("喵喵喵"); }
>
> 　　};

然后，直接用Object.create()生成实例，不需要用到new。

> 　　var cat1 = Object.create(Cat);





1、使用一个不存在的对象属性，不会报错！ undefined而已

2、动态的删减属性(delete删除属性)

```javascript
delete person.name
```

3、动态的添加(直接给新属性添加值)

```javascript
person.haha = "hello"
```

4、判断属性值是否在这个对象中

```javascript
'haha' in person
true
// 继承
'toString' in person
true
```

5、判断一个属性是否是对象自身的

```javascript
person.hasOwnProperty('toString')
false
person.hasOwnProperty('haha')
true
```



### 用prototype和不用的区别

prototype是原型对象，也就是类，在类上添加

**给类定义一个属性：**

在函数里面就用this，在函数外面，用函数名.prototype.xxx;

```js
首先来看一个实例：
function ListCommon2(first,second,third) 
{ 
    this.First=function () 
    { 
        alert("first do"+first); 
    } 
} 
//不加prototype的情况
ListCommon2.do1=function(first) 
{ 
    // this.First(); 
    alert("first do"+first); 
} 
//添加prototype的情况
ListCommon2.prototype.do2=function(first) 
{ 
    // this.First(); 
    alert("first do"+first); 
} 

上面添加与不添加prototype有什么区别呢？下面我们来测试这个实例。代码如下：

var t1=new ListCommon2("烧水1","泡茶1","喝1"); 
// t1.do1();//调用出错 
ListCommon2.do1("烧水1"); 
var t2=new ListCommon2("烧水2","泡茶2","喝2"); 
t2.do2("烧水2");// 
// ListCommon2.do2("烧水1");//调用出错 

//property将属性加到构造函数里面，不加property的话新建对象无关
```





## 回调函数

将一个函数作为参数传递到另一个函数中执行，传入的函数参数就叫回调函数

用setInterval来一直异步运行

```js
// 倒计时启动和关闭回调封装
    setCountDownTime(callback) {
      if (this.countDownTime > 0) {
        this.countDownInterval = setInterval(() => {
          if (this.countDownTime >= 1) {
            this.countDownTime -= 1;
            this.joinEndStr = this.countDownTimeStr(this.countDownTime);
          } else {
            clearInterval(this.countDownInterval);
            // 倒计时为0 刷新比赛进程，自动开赛
            callback();
          }
        }, 1000);
      }
    },
```



## 4、流程控制

### 1、if-else判断

### 2、while循环

```javascript
while(age<100){
    age = age +1;
    console.log(age)
}
```

### 3、for循环

```javascript
for(let i = 0;i<100;i++){
    console.log(i)
}
```

### 4、forEach循环(ES5.1)

```javascript
var age = [1,2,3,4,5]
age.forEach(function(value){
    console.log(value)
})
```

### 5、for...in遍历/for...of(ES6)

```javascript
for(var num in age){
    // num是索引
    console.log(age[num])
}
for(var num of age){
    // num是值
    console.log(num)
}
```



### 5、Map和Set（ES6新特性）

```javascript
// 取值
var map = new Map(['tom',100],['jack',90])
var name = map.get('tom')
console.log(name)//获得100

//设值
map.set('admin',100);
map.delete('tom')
map.has('')

//遍历map
for....of..


//map排序
let arr = Array.from(map)
arr.sort(function(a,b){return a[1]-b[1]})
```



Set:无序不重复的集合

(可以去重复值)

```javascript
var set = new Set([3,2,2,2])
set.delete(2)
set.add(1)
//是否有这个元素
console.log(set.has(3))

//遍历
for...of

```

## 5、函数

方法：对象（属性，方法）

函数：不属于对象

### 5.1定义函数

> 定义方式一 

```javascript
function abs(x){
    if(x>=0){
        return x;    
    }else{
        return -x;
    }
}
```

如果没有执行return，函数执行完也会返回结果，结果就是undefined



>定义方式二

把函数赋值给对象，对象就成函数了。

```javascript
var abs = function(x){

}
```

不存在参数如何规避？

```javascript
// 手动抛出异常
if(typeof x!=='number'){
    throw 'Not a Number'
}
```

>arguments

arguments 是一个关键字

代表传递进来的所有参数是一个数组。

即使你只定义了一个参数，但是你传入多个参数，可以用arguments来获取。



>**...rest**

ES6新特性，获取除了已经定义的参数之外的参数。

```javascript
function fun(a,b,c,...rest){
    console.log(rest)
}
```



### 5.2、变量的作用域

var定义的变量实际是有作用域的。

在函数内声明，则在函数体外不可以使用。（闭包可实现）



> 内部函数可以访问外部函数的成员，反之则不行。

假如，内部函数变量和外部函数的变量重名，则用内部的。从内往外找。



### 5.3提升变量的作用域

```javascript
function a(){
    var x = 'x'+y;
    console.log(x);
    var y ='y';
}
//结果：输出xundefined
//结论：js执行引擎，自动提示了y的声明，但不会提升y的赋值。
```

变量的定义都写在前面。

//var x,y,z...

### 5.4全局变量

在外部定义。

全局对象window。

默认所有的全局变量都绑定在window对象下。

alert()也是window下的变量。

方法也是变量，也是可以赋值的。

js只有一个全局作用域，就是window。

### 5.5规范

由于所有的全局变量都会绑定到window上，如果使用了不同的js文件，使用了相同的全局变量，就会冲突。

如何减少冲突？

```javascript
//唯一全局变量
var a = {}；

//定义全局变量
a.name = "jadfa";
a.add = function(a,b){
    return a+b;
}
```

把自己的代码全部放入自己定义的唯一空间名字中，降低全局命名冲突。



> 局部作用域let

ES6引入，解决局部作用域冲突问题。

{}里面，一个作用域。



>常量const

ES6之前，只要是全部使用大写字母定义的变量就认为是常量，不要去动它。

ES6后用const定义。只读。



### 5.6方法

方法就是把函数方到对象里面。

方法调用一定要带（）

this。代表调用它的人。

> apply

在js中可以控制this的指向

```javascript
getAge.apply(对象，[]);//this指向了指定对象
```



## 6、内部对象

> 标准对象

```javascript
typeof 123
"number"

typeof '123'
"string"

typeof []
"object"

typeof NaN
"number"

typeof Math.abs
"function"

typeof true 
"boolean"

typeof undefined
"undefined"
```



### 6.1、Date

```javascript
var now = new Date();
now.getFullYear();//年
now.getMonth();//0-11
now.getDate();//日
now.getDay();//星期几
now.getHours();//时
now.getMinuters();//分
now.getSeconds();//秒

now.getTime();//时间戳，距离1970.。


```

### 6.2、JSON

轻量级的数据交换格式。

在javascript中一切皆为对象，任何js支持的类型都可以用JSON来表示。



> 格式

对象都用{}

数组都用[]

键值对key：value

### 对象转换JSON字符串

JSON.stringify()

### JSON字符串解析成对象

JSON.parse()

> JSON和JS对象的区别

```javascript
var obj = {a: 'hello',b: 'ji'}
var json = '{"a": "hello","b": "ji"}'

```

## 7、面向对象编程

### 7.1、proto继承原型对象

```javascript
var Student = {
    name: "liuguo",
    age: 3,
    run: function(){
        console.log("run...")
    }
}
var xiaoming = {
    name: "xiaoming"
};
//继承
xiaoming.__proto__ = Student;
```

### 7.2、class继承

ES6引入class关键字

1、定义一个类，属性，方法

```javascript
class Studnet{
    constructor(name){
        this.name = name;
    }
    hello(){
        alter('hello')
    }
}
var xiaoming = new Student("xiaoming")

```

2、继承

```javascript
class XiaoStudent extends Student{
	construtor(name,grade){
        super(name);
        this.grade = grade;
    }
    myGrade(){
        console.log("adfaf")
    }
}
```



class的本质还是__proto__，只是为了更方便书写。

> 原型链

无限继承





## 、、定义类

class Point {

 constructor(x, y) {

  this.x = x;

  this.y = y;

 }



 toString() {

  return '(' + this.x + ', ' + this.y + ')';

 }

}

与下列方式等价



function Point(x, y) {

 this.x = x;

 this.y = y;

}



Point.prototype.toString = function () {

 return '(' + this.x + ', ' + this.y + ')';

};



## 8、操作BOM对象

BOM：浏览器对象模型

window代表浏览器窗口

navigator：封装了浏览器的 信息

screen：屏幕width，height

> location：当前页面的url信息

reload()//刷新网页

assign（）//设置新的地址

> document

代表当前的页面

获取文档节点document.getElementById()

> 获取cookir 

document.cookie

> history

history.back()//后退

history.forward()//前进

## 9、操作DOM对象

> ### 更新：更新DOM节点

node.innerText

node.innerHTML

node.style.



> ### 遍历DOM节点：得到节点

要操作一个DOM节点，就必须先获得这个节点。



> ### 删除一个DOM节点

先获取父节点，再通过父节点删除自己。

```javascript
var father = p1.parentElement
father.removeChild(p1)

father.removeChild(father.children[0])
```



> ### 添加一个新的节点

innerHTML//会覆盖

```javascript
var newp =  document.createElement('p')
newp.id = 'newp'
nwep.innerText = "helloworld"

newp.setAttribute('','')

node.appendChild(newp);
```



## 10、JQuery

里面存在大量的javascript函数

<script >标签引入
​    公式:  $(selector).action()

$代表JQuery

selector就是**css的选择器**

```javascript
//选中标签,进行函数操作

$('#id').click(function(){
	console.log("afs")
})
```



> 事件

mousedown()

mouseover()

等等

## 11、闭包

闭包就是嵌套函数，内部的函数可以访问外部函数的作用域。

![img](https://img2018.cnblogs.com/blog/551750/201812/551750-20181212101629347-1385426172.jpg)

**一般情况下，在函数fn执行完后，就应该连同它里面的变量一同被销毁，但是在这个例子中，匿名函数作为fn的返回值被赋值给了fn1，这时候相当于fn1=function(){var n = 0 ... }，并且匿名函数内部引用着fn里的变量num，所以变量num无法被销毁，而变量n是每次被调用时新创建的，所以每次fn1执行完后它就把属于自己的变量连同自己一起销毁，于是乎最后就剩下孤零零的num，于是这里就产生了内存消耗的问题**

作用：

1. 可以在函数的外部访问到函数内部的局部变量。 
2. 让这些变量始终保存在内存中，不会随着函数的结束而自动销毁。



但我们可以使用闭包来模拟私有方法

如果不是某些特定任务需要使用闭包，在其它函数中创建函数是不明智的，因为闭包**在处理速度和内存消耗方面对脚本性能具有负面影响。**



### 12、第 31 题：下面代码输出什么

```text
var a = 10;(function () {
console.log(a)
a = 5
console.log(window.a)
var a = 20;
console.log(a)})()
分别为 undefined 10 20，原因是作用域问题，在内部声名 var a = 20;相当于
先声明 var a;然后再执行赋值操作，这是在ＩＩＦＥ内形成的独立作用域，如果
把 var a=20 注释掉，那么 a 只有在外部有声明，显示的就是外部的Ａ变量的值
了。结果Ａ会是 10 5 5
```



## js代码规范

```js
   /**
   * 查询段位排行榜
   * @param {boolean} showLoading 是否显示加载中
   * @returns {void}
   */
  queryRankList: function(showLoading = false) {
    console.log("查询同店排行榜")
    if (this.data.isLoading || !this.data.hasMore) {
        
        /**
        * xsklfjal
        * @param {string}
        * @returns {number}
        */
         if (wincnt == 0 && losecnt == 0) {
                res.playlist[i]['winrate'] = 0
              } else {
                res.playlist[i]['winrate'] = (wincnt * 100 / (wincnt + losecnt)).toFixed(1)
              }
        
```

运算符两边空格，函数右边括号后留空格，if后接空格

测试用例



## clientwidth和offsettop

网页可见区域高：document.body.clientHeight

网页正文全文高：document.body.scrollHeight
网页可见区域高（包括边线的高）：document.body.offsetHeight
网页被卷去的高：document.body.scrollTop

屏幕分辨率高：window.screen.height

offsettop： 顶部距离设置了position父元素的距离



## 小程序setData注意事件

1. 频繁的去 setData

在我们分析过的一些案例里，部分小程序会非常频繁（毫秒级）的去setData，其导致了两个后果：

Android 下用户在滑动时会感觉到卡顿，操作反馈延迟严重，因为 JS 线程一直在编译执行渲染，未能及时将用户操作事件传递到逻辑层，逻辑层亦无法及时将操作处理结果及时传递到视图层；

渲染有出现延时，由于 WebView 的 JS 线程一直处于忙碌状态，逻辑层到页面层的通信耗时上升，视图层收到的数据消息时距离发出时间已经过去了几百毫秒，渲染的结果并不实时；

\2. 每次 setData 都传递大量新数据

由setData的底层实现可知，我们的数据传输实际是一次 `evaluateJavascript` 脚本过程，当数据量过大时会增加脚本的编译执行时间，占用 WebView JS 线程，

\3. 后台态页面进行 setData

当页面进入后台态（用户不可见），不应该继续去进行setData，后台态页面的渲染用户是无法感受的，另外后台态页面去setData也会抢占前台页面的执行。



## js都是值传递，没有引用传递

```js

1 function setName(obj) {
2     obj.name = "Nicholas";
3     obj = new Object(); //改变obj的指向，此时obj指向一个新的内存地址，不再和person指向同一个
4     obj.name = "Greg";
5 }
6 
7 var person = new Object();
8 setName(person);  //你看看下面，相信我也是按值传递的了吧
9 alert(person.name);  //"Nicholas"

传递的是指针的地址，内部新建了一个指向同一个地址的对象，所以看起来像是引用传递
```

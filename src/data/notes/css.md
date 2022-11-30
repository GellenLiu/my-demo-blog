# UI开发学习笔记

## 1、CSS2,2.1,3

CSS2.0 div+CSS，html与css分离的思想

css2.1 浮动，定位

css3.0 圆角，阴影，动画。。。

## 2、css的优势

- 内容与表现分离
- 网页结构表现统一，可以实现复用
- 样式十分的丰富
- 建议使用独立于html的css文件
- 利于SEO，容易被搜索引擎收录

## CSS变量

变量命名为 --

使用变量用var()

```js
// 定义在根元素
:root {
    --value: 2px;
}
定义在某一选择器内
div {
    --abc: 2;
}
div {
    width: var(--value);
    height: calc(2 * var(--value))
}
```



## 动画可以用精灵图+animate控制图片position来实现

精灵图记录每一帧

逐帧动画

精度丢失解决：1、不用雪碧图，每一帧一张图片

2、使用scale缩放

3、使用svg代替雪碧图



## 使用div模拟输入框

enableedit可编辑

```scss
.team-zone-input {
    // padding: .12rem .16rem;
    min-height: .72rem;
    max-height: 1rem;
    border-radius: .08rem;
    border: .12rem solid $color-gray-5;
    border-left: .16rem solid $color-gray-5;
    border-right: .16rem solid $color-gray-5;
    background-color: $color-gray-5;
    overflow-y: auto;
    outline: none;
    user-select:text;
    -webkit-user-select:text;
    color: $color-black;
    font-size: $font-xm;
    line-height: .44rem;
    //输入光标的颜色
    caret-color

    &:empty:before{
      content: attr(data-placeholder);
      color:$color-gray-2;
    }
    &:not(:empty){
      &:focus:before{
          content:none;
      }
    }

  }
```

## textareare

```js
//高度自适应
inputContent(e) {
      const height = e.target.scrollHeight;
      const base = parseInt(document.getElementsByTagName('html')[0].style.fontSize, 10);
      const borderHeight = base * 0.12;
      const initHeight = base * 0.64;
      const lineHeight = 0.44 * base;
      e.target.style.height = '';
      if (lineHeight * 3 <= height) {
        e.target.style.height = `${lineHeight * 3 + borderHeight * 2}px`;
      } else if (initHeight > height) {
        e.target.style.height = `${initHeight}px`;
      } else {
        e.target.style.height = `${e.target.scrollHeight + borderHeight * 2}px`;
      }
    },
```





## rem单位的缺点

精度问题

屏幕除以750有精度缺失，可以使用scale

- 1、这部分内容抛弃rem单位，使用绝对正确的px单位来设置动画区间；
- 2、这部分内容抛弃雪碧图，使用16张相同大小的图片保证精度计算的误差是一致的（都向上或向下取整）；，
- 3、寻求更多的解决方案；

## CSS动画事件

| 事件名称                     | 何时触发                            |
| :--------------------------- | :---------------------------------- |
| `animationstart (en-US)`     | 某个 CSS 动画开始时触发。           |
| `animationend (en-US)`       | 某个 CSS 动画完成时触发。           |
| `animationiteration (en-US)` | 某个 CSS 动画完成后重新开始时触发。 |

## 3、三种导入方式

- 行内（标签内属性）
- 内部样式（style标签）
- 外部样式（文件）

> **行内>内部>外部样式**(就近原则)

外部样式的两种写法：

1、链接

```javascript
<link rel="stylesheet" href=""></link>
```



2、导入(在style中)

```javascript
<style>
@import url（""）
</style>
```

## 4、选择器

选择页面上的某个元素

### 4.1、标签选择器

会选择所有指定标签，只能放基本的通用样式

### 4.2、类选择器

选中同类名的，一组标签。

```javascript
<style>
    .classname{
        
    }
</style>
```

### 4.3、ID选择器

id要唯一

```javascript
#idname{

}
```

> **d选择器>类选择器>标签选择器**

### 4.4、层次选择器

- 后代选择器

在某个元素的后面。eg.body后面有p

```javascript
body p{
    
}
```



- 子选择器(第一代儿子)

```javascript
body>p{
    
}
```



- 相邻兄弟选择器

只有一个，下面的那一个元素。

```javascript
div1 + div2{

}
```



- 通用选择器

当前选中元素的所有向下兄弟元素

```javascript
div1 ~ div2{

}
```



```javascript
border-radius: 24px;//圆角
```

### 4.5、结构伪类选择器



```javascript
//第一个和最后一个
ul li:first-child{
    
}
ul li:last-child{
    
}

:hover



// 选中当前p元素的父级元素，进而选中父级元素的第一个，并且选中的元素是当前元素（p）
p:nth-child(1){
    
}
//选中父元素下的p元素的第二个，类型
p:nth-of-type(1){
    
}
```

### 4.6、属性选择器（常用）

id和class结合

```javascript
//a标签中带有id属性的
a[id]{
    
}
//a标签中id=nm的
a[id=nm]{
    
}

//语法：属性名 = 属性值（正则）
//=绝对等于
//*=包含
//^=以什么开头
//$= 以什么结尾

a[class *= "links"]{
}
//同时含有多个属性
a[href][title] {color:red;}
```

## 深度选择器(可以穿透scoped)

```css
css:
>>>

less/scss:
/deep/    ::v-deep
```

推荐使用::v-deep

1、scoped的作用是，给最后一个选择器添加属性。
2、::v-deep的作用是，取消scoped，并且在::v-deep前面的选择器添加属性。如果前面没有选择器，就直接添加一个属性选择器。也就是说就算使用v-deep，也无法在组件内对组件外进行选择。
3、style标签不加scopd，即可全局使用选择器，穿透力更强。



## 5、美化网页元素


### 5.1、字体样式

```javascript
font-family: xxx，xxx;//字体族
font-size: 50px;//字体大小
font-weight: bold;//字体的粗细
color： #12a;//字体颜色

//第一是风格，第二是粗细，第三是大小，第四是字体
font: oblique bolder 12px "楷体";
```

### 5.2、文本样式

```javascript
//颜色 ：单词/RGB/RGBA(A是透明度0-1)
color: rgba(0,255,255,0.5)

//排版
text-align: center;
//首行缩进 2em是两个字符
text-indent: 2em

background: #000012;

//行高和块的高度一样的话就上下居中
height: 300px;
line-height: 300px;


//下划线
text-decoration: underline;

//上划线
text-decoration: underline;

//中划线
text-decoration: line-through;


//多元素水平对齐
img,span{
    vertical-align: middle;
}
<div>
    <img>
    <span>
 
    
    


```

### 5.3、伪类

```javascript
//鼠标悬浮(重点)
a:hover{
    
}
//鼠标点完之后
a:visited{
    
}

//鼠标按住未释放的状态
a:active{
    
}
```



### 5.4、列表

```javascript
<ul>
	<li>
    <li>
    ....
    
//选中ul下的所有li
ul li{
    height: 30px;//高度
    list-style: none;//去掉列表前的黑点,circle为空心⚪，decimal为数字
    
    
    
}    
```

### 5.5、背景

背景颜色

背景图片

```javascript
//div中方背景图片
div{
    backgroud-image: url("");
    backgroud-repeat: no-repeat;//(repeat-x,,repeat-y,,水平平铺和竖直平铺)
}
//默认是全部平铺，不断重复图片，铺满位置

```

```javascript
//参数：颜色，图片，图片位置，平铺方式
backgroud: red url("") 270px 10px no-repeat;

```

### 5.6、渐变

```javascript
//渐变色，角度，起始颜色，结束颜色
background-image: linear-gradient(10deg,#21D4FD 0%,#B721FF 100%);
```



## 6、盒子模型



![image-20210312164732644](C:\Users\刘国林\AppData\Roaming\Typora\typora-user-images\image-20210312164732644.png)





宽高，外边距，边框，内边距，内容。



先初始化，所有的标签都有默认的内外边距。

外边距

```javascript
margin: 0 auto;//居中元素，写两个参数就是上下，左右
```



控制好：外边距+边框+内边距+内容=规定的大小

```javascript
//圆角边框：四个参数，左上，右上，右下，左下。。
//两个参数：左上+右下，右上+左下
//一个参数：上下左右
//参数是圆角的半径！！

border-radius:


```



- IE盒子模型（width包含内边距，边框）
- 标准盒子模型（width只有content）
- 怪异盒子模型（弹性盒子）



## 7、浮动



标准文档流

![image-20210312202406547](C:\Users\刘国林\AppData\Roaming\Typora\typora-user-images\image-20210312202406547.png)

块级元素：独占一行，block

```javascript
h1-h6\p\div\列表
```



行内元素：不独占一行，inline

```javascript
span \a\img\strong...
```

行内元素可以包含在块级元素中，反之不能。



div和span最常用

```javascript
display: block;//块级元素；；inline是行内元素

```

inline-block是块元素，但是可以在一行。一行中的一块。

块级元素/行内元三年也是一种实现**行内元素排列的方式**

> 浮动

float： left；//right



左右浮动，超脱出标准文档流，引起父级边框塌陷的问题。



### 父级边框塌陷问题

```javascript
//right//右侧不允许浮动
/*
left

none
*/
clear: both;两侧不允许有浮动元素
```

1、增加父级元素的高度

2、在后面**添加一个空的div**，清除浮动

3、在父级元素添加overflow

4、在父类添加一个伪类(类似空div)（推荐使用）

```javascript
#father:after{
	content: '';
	display: block;
    clear: both;

}
```



```javascript
overflow: sroll;//超出大小，生成滚动条。
```



防止margin重叠

    <body>
        <p>Haha</p>
        <p>Hehe</p>
    </body>
    p{
            color: #f55;
            background: #fcc;
            width: 200px;
            line-height: 100px;
            text-align: center;
            margin: 100px;
        }


两个p之间的距离为100px，发送了margin重叠。

根据BFC布局规则第二条：
Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠。
1
2
折叠的结果：
1. 两个相邻的外边距都是正数时，折叠结果是它们两者之间较大的值。
2. 两个相邻的外边距都是负数时，折叠结果是两者绝对值的较大值。
3. 两个外边距一正一负时，折叠结果是两者的相加的和。
   我们可以在p外面包裹一层容器，并触发该容器生成一个BFC。**那么两个P便不属于同一个BFC，就不会发生margin重叠了。**

    <body>
        <p>Haha</p>
        <div class="wrap">
            <p>Hehe</p>
        </div>
    </body>
    .wrap{
            overflow: hidden;
        }





## 8、定位

### 8.1、相对定位

相对于自己原来的位置，进行偏移。

```javascript
position: relative;//上下左右
top: 20px;//距离上边20px，即元素向下偏移20px
left: 20px;
bottom: 20px;
right: 20px;

```

### 8.2、绝对定位

```javascript
positon: absolte;//上下左右
//没有父级元素定位的情况下，相对浏览器定位。
//相对父级元素，父级要有position属性，可以是relative；

```

### 8.3、fixed固定定位

```javascript
position: fixed;
//固定在一个位置，拉滚动条也不变
```

### 8.4、z-index

层级，

一层一层的在上面。

```javascript
z-index: 99;//

opacity: 0.6;//设置透明度

```



## 9、CSS预处理器

SASS

LESS：基于NodeJS。（必学）





## 10、垂直居中

水平居中就是：margin：0 auto

垂直居中：

设置父元素height，weight为100%

要居中的元素设置position： relative; top: 50%; /*偏移一般*/



css3 ：transform属性



## 11、BCF和ICF

BFC名字很高大上，说白了就是一个规则，这个规则应用于块级元素（div,p）上。

IFC这个规则应用于内联元素(span,em,i)上。



## 12、inline-block不对齐

vertical-align: top;

添加这行代码

## 13、下拉框

1. //去掉ie下select下拉箭头按钮
2. select::-ms-expand { 
3. ​    display: none; 
4. }

## IE滚动条隐藏

-ms-overflow-style: none;





## 15、垂直居中

![preview](https://pic1.zhimg.com/v2-551c052a8bb3e2da270adf6d55f62484_r.jpg)





## 16、负数外边距

相反的，比如左负外边距，产生平移。如margin-left：-30px;元素向左平移30px；



## 17、rgba（）和opacity的透明区别

opacity和rgba的区别主要是透明目标的不同吧，

opacity把整个元素都透明，元素的所有内容都透明。

rgba是把元素的背景透明，而且他的子元素不会透明。



opacity是css3的属性，可能会不兼容。

```css
opacity: 0.4
filter: alpha(opacity=60);  
```



## 18、letter-spacing 的妙用知道有哪些么？（inline-block）

letter-spacing 属性增加或减少字符间的空白（字符间距）。
答案:可以用于消除 inline-block 元素间的换行符空格间隙问题  

## 19、 px 和 em 的区别。

px 和 em 都是长度单位， 区别是， px 的值是固定的， 指定是多少就是多少， 计算比较容易。
em 得值不是固定的， 并且 em 会继承父级元素的字体大小。



1em是当前div内的文体的字体的尺寸  

## 20、 CSS 中 link 和@import 的区别是：

Link 属于 html 标签， 而@import 是 CSS 中提供的
在页面加载的时候， link 会同时被加载， 而@import 引用的 CSS 会在页面加载完成后才会加
载引用的 CSS
@import 只有在 ie5 以上才可以被识别， 而 link 是 html 标签， 不存在浏览器兼容性问题  

## 21、BFC

BFC（ 块级格式化上下文） ， 一个创建了新的 **BFC 的盒子是独立布局的**， 盒子内元素的布局
不会影响盒子外面的元素。 **在同一个 BFC 中的两个相邻的盒子在垂直方向发生 margin 重叠**
的问题
BFC 是指浏览器中创建了一个独立的渲染区域， 该区域内所有元素的布局不会影响到区域外
元素的布局， 这个渲染区域只对块级元素起作用  

### 0、触发bfc的方法

- 1、float的值不是none。**（浮动）**
- 2、position的值**不是**static或者relative。
- 3、display的值是i**nline-block、table-cell、flex、table-caption或者inline-flex**
- 4、overflow的值**不是visible**
- 根元素，即HTML元素

### 1、margin重叠

我们可以在**div外面包裹一层容器，并触发该容器生成一个BFC**。那么两个div便不属于同一个BFC，就不会发生margin重叠了。

2、display: inline-block;让相邻的**元素本身触发bfc**

```html
<body>
    <p>看看我的 margin是多少</p>
    <div>
        <p>看看我的 margin是多少</p>
    </div>
</body>
```



### 2）清除浮动(四种方法之一)

块级子元素浮动，如果块级父元素没有设置高度，其会有高度塌陷的情况发生。
原因：**子元素浮动后，均开启了BFC，父元素不会被子元素撑开。**
解决方法：由第六条原理得，计算BFC的高度时，浮动元素也参与计算。所**以只要将父容器设置为bfc**
**就可以把子元素包含进去**：这个容器将包含浮动的子元素，它的高度将扩展到可以包含它的
子元素，在这个BFC，这些元素将会回到页面的常规文档流。



因为BFC内部的元素和外部的元素绝对不会互相影响，因此， 当BFC外部存在浮动时，它不应该影响BFC内部Box的布局，BFC会通过变窄，而不与浮动有重叠。同样的，当BFC内部有浮动时，为了不影响外部元素的布局，BFC计算高度时会包括浮动的高度。避免margin重叠也是这样的一个道理。



## margin穿透

子元素的margin-top穿透到父元素外面；

解决：**父元素，触发bfc**，或者父元素用padding代替。



## 字体渲染

1、黑白渲染

2、灰度渲染

3、亚像素渲染




## 22、p标签

p标签是块级元素，占一行。



## 23、CSS定位

static：默认位置，不受top，left等的影响。

relactive：相对定位，根据原来的位置，偏移一定是位置。

fixed：固定在浏览器某个位置，滚动页面也不动。

absolute：绝对定位，对于父窗口/浏览器，绝对定位某个位置。

## 24、CSS计数器

```css
body {
  counter-reset: section;
}

h2::before {
  counter-increment: section;
  content: "Section " counter(section) ": ";
}
//body定义一个section变量，h2让section自增，然后赋值给内容
```



## 25、IFC

1.中文名：内联(行)格式化上下文
2.英文全称：Inline Formatting Contexts
3.形成条件:
3.1**IFC由不包含块级盒的块容器盒建立(块容器盒中只有内联级盒子)。**

inline-block也触发ifc。



内联元素(inline-elemet)很容易理解(display:inline),它能生成inline-level boxes,但只有在IFC内的才称之为inline box

### 布局规则：

在一个IFC里，盒是**一个接一个从顶部水平放置**。
摆放这些框，它们水平方向的margin,padding,border所占空间会被计算在内。
**行盒的高度由行盒内最高的inline boxes决定**。
垂直方向，可通**过vertical-align设置文本基线，**取值可以是具体像素值，也可以是middle等方向词。
当内部的容器盒子太多了一个line box装不下来，他们折行之后会变成两个或者多个line box， **line box们垂直方向无间隔地堆叠**，但不能重叠
浮动后IFC内部的浮动元素宽高参与IFC的line-box宽高计算并且从换行后的行开始排列



## 26、浮动元素居中

- 在外层套一层div，对外层div居中
- relative定位，偏移50%，再调整自身宽度。
- 外层盒子，向右偏移50%，内层盒子向左偏移50%。
- 套一个外层盒子，用正常方法居中。



## 27、web标准和w3c标准

web标准就是分为html，css，js，分别是结构层，表现层，行为层。使其具有模块化。

W3C对web标准提出了规范化的要求，也就是在实际编程中的一些代码规范。

）。标签字母要小写

2）。标签要闭合

3）。标签不允许随意嵌套

2.对于css和js来说

1）。尽量使用外链css样式表和js脚本



## 28、文字超出显示省略号

text-overflow: ellipsis;
  overflow: hidden;

## 两行省略

**text-overflow: -o-ellipsis-lastline;**

 **overflow: hidden;**

 **text-overflow: ellipsis;**

 **display: -webkit-box;**

 **-webkit-line-clamp: 2;**

 **line-clamp: 2;**

 **-webkit-box-orient: vertical;**

## 响应式图片

img标签srcset

max-width最大宽度自适应





## 瀑布流布局

内容固定宽度，随瀑布宽度的大小而自适应。（跟百度图片搜索出来的展示一样）。

js获取瀑布/屏幕宽度，除以内容的宽度，得到最大列数。

js通过绝对定位来设置left和top。来实现瀑布。

记录高度，最新的放在最小高度处

监听resize。

1. 　　设定每一列图片的宽度和间距
2. 　　获取当前窗口的总宽度，从而根据图片宽度去旁段分成几列
3. 　　获取所有图片元素，定义一个空数组来保存高度
4. 　　遍历所有容器，开始判断　　当页面加载完成，或页面宽度发生变化时，调用函数。
   - 如果当前处于第一行时： 直接设置图片位置【 即 top为间距的大小，left为（当前图片的宽度+间距） * 当前图片的值+间距大小 】，并保存当前元素高度。
   - 如果当前不处于第一行时：进行高度对比，通过遍历循环，拿到最小高度和相对应的索引，设置图片位置【 即 top为最小高度值+间距*2，left为 （当前图片的宽度+间距） * 索引 值+间距大小）】，并修改当前索引的高度为当前元素高度。
5. 　　当页面加载完成，或页面宽度发生变化时，调用函数。

![image-20220105101525130](C:\Users\gellenliu\AppData\Roaming\Typora\typora-user-images\image-20220105101525130.png)



## 百度图片瀑布流

每一列用一个div，inline-block。然后往这一列加列表项就行。

inline-block高度会自动撑开，屏幕宽度不够也会自动换行。

基本不会用绝对定位瀑布流，都是等宽等高布局

## rem适配

要设置限制最大和最小的跟字体,防止过大.



## rem+媒体查询+flex

js未加载时,先用媒体查询渲染页面,防止js加载后改动太大.

## 29、0.5px

1px是最小的，要实现0.5px的大小，可以使用transform，缩放0.5

## 媒体查询

```css
@media only screen and (min-height: 760px) {

  page {

​    min-height: 100vh;

​    background: url(https://image-1251917893.file.myqcloud.com/2021/a20210926KPL/teamarea-bg-2.jpg) no-repeat 0 0;

​    background-size: 100% 100%;

  }

 }
```





## 图片优化

![image-20211104194240115](C:\Users\gellenliu\AppData\Roaming\Typora\typora-user-images\image-20211104194240115.png)



## SVG学习

### 1、svg修改颜色、大小

### 2、svg精灵图

把所有的SVG图标都在一个SVG源上，然后用id调用就可以了。

参考代码

```
<svg viewBox="0 0 100 100"> <use xlink:href="#icon-1"></use> </svg>
```

use元素是通过xlink:href属性，寻找要使用的元素的。#icon-1对应的就是id为icon-1的元素。

> 推荐使用icomoon.io 这个网站





## line-height的值

line-height: 1.5;  表示font-size的1.5倍，继承给子元素的是line-height1.5，具体高度与子元素的font-size相乘

line-height： 150%；表示font-size的1.5倍，继承给子元素的是父元素的font-size的1.5倍的具体值





## css3D

设置transform-style：perspective-3d

perspective：摄像机的距离

perspective-origin：摄像机的位置





UI开发
有一些选择器是用不了class的，只能用标签
.class1 ~ .class 可以用class，表示，在class1后面的class元素
first-child，其父元素的第一个儿子
first-type，其父元素的第一个该类型的标签元素。








<template>
    <demo-template :codeContent="code">
        <div class="desc">当列表数据过长，会遇到不使用分页方式来加载长列表的需求。如在数据长度大于 1000 条情况，DOM 元素的创建和渲染需要的时间成本很高，完整渲染列表所需要的时间不可接受，同时会存在滚动时卡顿问题。</div>
        <div class="desc" style="margin-top: 10px">
            演示数据：1000条，每条高度30，列表高度400，列表一次展示13条
        </div>
        <div class="list-view" :style="{ height: `${model.viewHeight}px` }" @scroll="handleScroll">
            <!-- 设置高度撑起滚动条 -->
            <div class="list-view-bg" :style="{ height: bgHeight }"></div>
            <!--  -->
            <ul ref="listRef" class="list-view-content">
                <li
                    class="list-view-item"
                    v-for="(item, index) in vData"
                    :key="index"
                    :style="{ height: `${model.itemHeight}px` }"
                >
                    {{ item.label }}
                </li>
            </ul>
        </div>
    </demo-template>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DemoTemplate from '@/views/demoTemplate.vue';

@Component({
    components: { DemoTemplate }
})
export default class virtualList extends Vue {
    code: string = `
    关键步骤：
    1.计算当前可见区域起始数据的 startIndex
    2.计算当前可见区域结束数据的 endIndex
    3.计算当前可见区域的数据，并渲染到页面中
    4.计算 startIndex 对应的数据在整个列表中的偏移位置 startOffset，并设置到列表上
    5.设置缓存区，避免滚动留白
    6.计算列表总高度撑起滚动条
    7.绝对定位列表，transform移动数据
    8.监听容器的滚动事件和scrollTop`;
    vData: any = [];  // 渲染的数据
    model: any = {
        data: <any>[], // 全部数据
        vData: <any>[],  
        viewHeight: 400, // 列表高度
        itemHeight: 30,   // 每一项的高度
        buffSize: 3  // 缓存区，多渲染几条
    };
    conRef: any = null;
    mounted() {
        let that = this;
        setTimeout(() => {
            for(let i=0; i<1000; i++) {
                that.model.data.push({label: i})
            }
            that.updateVdata(0);
        });
    }

    handleScroll(val: any) {
        let scrollTop: number = val.target.scrollTop;
        this.updateVdata(scrollTop);
    }
    updateVdata(scrollTop: number) {
        let that = this;
        // 获取可见区域的可见列表数量
        const vNum = Math.ceil(that.model.viewHeight / that.model.itemHeight);
        // 获取可见区域的开始数据索引
        const start = Math.floor(scrollTop / that.model.itemHeight);
        // 获取可见区域的结束数据索引
        const end = start + vNum;
        // 计算出可见区域的数据，让vue更新
        that.vData = that.model.data.slice(start, end + that.model.buffSize);
        // 下拉到可视区域，滚动半项时，还是利用了css的滚动效果
        (that.$refs.listRef as any).style.transform = `translate(0, ${start * that.model.itemHeight}px`;
    }
    // 撑起滚动条
    get bgHeight() {
        return `${this.model.data.length * this.model.itemHeight}px`;
    }
}
</script>
<style lang="scss" scoped>
.list-view {
    position: relative;
    height: 300px;
    width: 200px;
    margin: 20px auto;
    overflow: auto;
    border: 1px solid #aaa;

    .list-view-bg {
        // 绝对定位脱离文档流
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        z-index: -1;
    }

    .list-view-content {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        list-style: none;
        padding: 0;
        margin: 0;

        .list-view-item {
            text-align: center;
            padding: 5px;
            color: #666;
            line-height: 30px;
            box-sizing: border-box;
        }
    }
}
</style>

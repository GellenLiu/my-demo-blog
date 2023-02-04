<template>
    <demo-template :codeContent="code">
        <div class="desc">无缝轮播图</div>
        <div class="banner-box">
            <div ref="bannerList" class="img-list-wrap">
                <!-- 复制到开头 -->
                <div
                    class="img-list-item"
                    :style="{ background: imgList[imgList.length - 1] }"
                ></div>
                <div
                    class="img-list-item"
                    v-for="(item, index) in imgList"
                    :key="index"
                    :style="{ background: item }"
                >
                    {{ index }}
                </div>
                <!-- 复制到结尾 -->
                <div class="img-list-item" :style="{ background: imgList[0] }"></div>
            </div>
            <div class="next-btn btn" @click="rightNext()">></div>
            <div class="pre-btn btn" @click="leftNext()">&lt;</div>
            <div class="dot-wrap">
                <div
                    class="dot"
                    @click="moveTo(index - 1)"
                    :class="
                        activeIndex === index - 1 ||
                        (activeIndex === imgList.length && index - 1 === 0)
                            ? 'active-dot'
                            : ''
                    "
                    v-for="index in imgList.length"
                    :key="index - 1"
                >
                    {{ index - 1 }}
                </div>
            </div>
        </div>
    </demo-template>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DemoTemplate from '@/views/demoTemplate.vue';

@Component({
    components: { DemoTemplate }
})
export default class bannerLoop extends Vue {
    code: string = `
    // 负责两份
    // 到最后一张时候，瞬间跳到第-1张，再移动到第0张
    `;
    imgList: any = ['#111', '#222', 'red', '#ccc', '#eee'];
    activeIndex: number = 0;
    mounted() {
        let that = this;
        that.autoLoop();
    }

    moveTo(index: number) {
        let that = this;
        let bannerList: any = document.querySelector('.img-list-wrap');
        bannerList.style.setProperty('transition', 'all .5s');
        that.activeIndex = index;
        bannerList.style.setProperty('transform', `translate(-${that.activeIndex+1}00%)`);

    }
    rightNext() {
        let that = this;
        let bannerList: any = document.querySelector('.img-list-wrap');

        // 到最后一张时候，瞬间跳到第-1张，再移动到第0张
        if (that.activeIndex >= that.imgList.length - 1) {
            bannerList.style.setProperty('transition', 'none');
            bannerList.style.setProperty('transform', 'translate(0)');
            // 强制渲染
            bannerList.offsetHeight;
            that.moveTo(0);
        } else {
            that.activeIndex++;
            that.moveTo(that.activeIndex);
        }
    }
    leftNext() {
        let that = this;
        let bannerList: any = document.querySelector('.img-list-wrap');

        // 到第0张时候，瞬间跳到第最后一张，再移动到倒数第一张
        if (that.activeIndex <= 0) {
            bannerList.style.setProperty('transform', `translate(-${this.imgList.length+1}00%)`);
            bannerList.style.setProperty('transition', 'none');
            // 强制渲染
            bannerList.offsetHeight;
            that.moveTo(this.imgList.length-1);
        } else {
            that.activeIndex--;
            that.moveTo(that.activeIndex);
        }
    }
    autoLoop() {
        let that = this;
        let bannerList: any = that.$refs.bannerList;
        setInterval(() => {
            that.rightNext();
        }, 1500);
    }
}
</script>
<style lang="scss" scoped>
.banner-box {
    position: relative;
    width: 400px;
    height: 220px;
    margin: 20px auto;
    border: 2px solid #ccc;
    overflow: hidden;
}
.img-list-wrap {
    display: flex;
    overflow: visible;
    transition: all 0.5s;
    // 从第二张开始
    transform: translate(-100%);
}
.img-list-item {
    display: inline-block;
    flex-shrink: 0;
    width: 400px;
    height: 220px;
    text-align: center;
    color: aqua;
}
.dot-wrap {
    position: absolute;
    left: 50%;
    bottom: 10px;
    display: flex;
    transform: translate(-50%);
}
.dot {
    height: 10px;
    width: 10px;
    margin: 10px;
    border-radius: 50%;
    border: 1px solid rgb(88, 25, 213);
}
.next-btn {
    position: absolute;
    right: 10px;
    top: 50%;
    height: 20px;
    width: 20px;
    color: aqua;
}
.btn:hover {
    border-radius: 50%;
   background: #ccc;
}
.pre-btn {
    position: absolute;
    left: 10px;
    top: 50%;
    height: 20px;
    width: 20px;
    color: aqua;
}
.active-dot {
    background: rgb(8, 67, 194);
}
</style>

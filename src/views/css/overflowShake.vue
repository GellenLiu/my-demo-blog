<template>
    <div class="demo-content">
        <demo-info v-bind="demoInfo"></demo-info>
        <div class="demo-wrap">
            <div>滚动容器</div>
            <div class="overflow-container">
                <div class="content" :style="overCtrl ? 'height: 1000px' : 'height: 100px'">
                    <div class="item">显示滚动条也不占用宽度，不会抖动</div>
                    <div class="item">显示滚动条也不占用宽度，不会抖动</div>
                    <div class="item">显示滚动条也不占用宽度，不会抖动</div>
                    <div class="item">显示滚动条也不占用宽度，不会抖动</div>
                    <div class="item">显示滚动条也不占用宽度，不会抖动</div>
                    <div class="item">显示滚动条也不占用宽度，不会抖动</div>
                    <div class="item">显示滚动条也不占用宽度，不会抖动</div>
                    <div class="item">显示滚动条也不占用宽度，不会抖动</div>
                    <div class="item">显示滚动条也不占用宽度，不会抖动</div>
                    <div class="item">显示滚动条也不占用宽度，不会抖动</div>
                    <div class="item">显示滚动条也不占用宽度，不会抖动</div>
                    <div class="item">显示滚动条也不占用宽度，不会抖动</div>
                    <div class="item">显示滚动条也不占用宽度，不会抖动</div>
                    <div class="item">显示滚动条也不占用宽度，不会抖动</div>
                    <div class="item">显示滚动条也不占用宽度，不会抖动</div>
                </div>
            </div>
            <el-button @click="overCtrl = !overCtrl" >{{overCtrl ? '内容高度不滚动' : '滚动'}}</el-button>
        </div>
        <code-show :code="codeContent"></code-show>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Editor from '@/components/monacoEditor.vue';
import CodeShow from '@/components/CodeShow.vue';
import DemoInfo from '@/components/DemoInfo.vue';
@Component({
    components: { Editor, CodeShow, DemoInfo }
})
export default class overflowShake extends Vue {
    demoInfo = {
        title: '滚动条抖动',
        author: 'gellenliu',
        likes: '999+',
        labels: [
            'css',
            'scss'
        ]
    };
    overCtrl = true;
    codeContent = `width - padding`;
    mounted() {}
}
</script>
<style lang="scss" scoped>
// 滚动条宽度8px
// 理想padding 20px
$width: 600px;
.overflow-container {
    width: $width;
    height: 500px;
    margin: 0 auto;
    overflow-y: auto;
    overflow-x: hidden;
    background: #ccc;
    border: rgb(60, 116, 172) solid 1px;
}

// 方法2，给container设置overlay
.overflow-container {
    // overflow-y: overlay;
}

// 方法1
.content {
    display: flex;
    flex-wrap: wrap;
    padding-top: 20px;
    padding-left: 20px;
    width: ($width - 40px);// 核心代码 （width - padding）
    background: #fff no-repeat;
    background-clip: content-box;

}
.content-3 {
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    background: #fff;
    background-clip: content-box;

    // @if (100% + 12) == 600 {
    //     padding-right: 12px;
    // }
}
// 自定义滚动条
.overflow-container::-webkit-scrollbar {
    width: 8px;
    border-radius: 10px;
    background: #000;
}
</style>

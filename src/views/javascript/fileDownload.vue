<template>
    <div class="demo-content">
        <demo-info v-bind="demoInfo"></demo-info>
        <div class="demo-wrap">
            <a :href="url" :download="name">a标签下载</a>
            <el-button @click="download(url, name)">点击下载</el-button>
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
export default class Copy extends Vue {
    demoInfo = {
        author: 'gellenliu',
        likes: '999+',
        labels: [
            'javascript'
        ]
    };
    codeContent = `暂无代码`;

    url: string = '';
    name: string = '文件名';
    mounted() {}

    download(url:string, name:string) {
       let that = this;
       // 同域名发请求下载, 本地文件转blob也可以下载
       if (url.indexOf('localhost')) {
            var fileRequest = new XMLHttpRequest();
            fileRequest.open('GET', url, true);
            fileRequest.responseType = 'blob';
            fileRequest.onload = function (e) {
                let blobUrl = window.URL.createObjectURL(fileRequest.response);
                let a = document.createElement('a');
                a.href = blobUrl;
                a.download = name;
                a.click();
            };
            fileRequest.send();
        } else {
            // pdf/jpg时，会进入预览，可配置请求字段
            window.open(url, '_blank');
        }

        // 创建a标签并点击
        // let a = document.createElement('a');
        // a.href = url;
        // a.download = name;
        // a.click();
    }
}
</script>
<style lang="scss" scoped>
</style>

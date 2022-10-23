<template>
    <div class="notesbook-page">
        <div class="file-list">
            <div v-for="(file, index) in fileList" :key="index" class="file-item"></div>
        </div>
        <div class="md-content" v-html="content"></div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
var Marked = require('marked');

@Component({
    components: {}
})
export default class notesbook extends Vue {
    content = '';
    marked = () =>{};
    created() {
        let fileList = require.context('@/data', true, /\.md$/)
        console.log(fileList)
    }
    mounted() {
        let that = this;
        this.initMarked();
        that.content =  Marked.marked('## 我的笔记  `function hello()`');
    }
    initMarked() {
        var rendererMD = new Marked.Renderer();
        Marked.setOptions({
            renderer: rendererMD,
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false
        }); //基本设置
    }
}
</script>
<style lang="scss" scoped src="@/styles/notesbook.scss"></style>

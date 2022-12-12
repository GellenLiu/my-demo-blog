<template>
    <div class="page">
        <myHeader></myHeader>
        <div class="notesbook-page">
            <div class="website-list">
               <div class="juejin-blog"></div>
               <div class="csdn-blog"></div>
            </div>
            <iframe src="https://blog.csdn.net/weixin_44736005?type=blog"></iframe>
            <!-- <div class="file-list">
                <div class="tab">
                    <div class="file-tab" @click="changeTab(1)">文件</div>
                    <div class="content-tab" @click="changeTab(2)">目录</div>
                </div>
                <div class="file-wrap" v-show="fileListTab === 1">
                    <div
                        v-for="(file, index) in files"
                        :key="index"
                        class="file-item"
                        :class="{ active: activeIndex === index }"
                        @click="viewPage(index)"
                    >
                        <div>{{ file.name }}</div>
                    </div>
                </div>
                <div v-show="fileListTab === 2">
                    <div v-for="(title, index) in Cataloggue" :key="index">
                        <div>{{ title }}</div>
                    </div>
                </div>
            </div>
            <div v-highlight class="md-content" v-html="content"></div> -->
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/components/Header.vue';
var Marked = require('marked');
var hljs = require('@/utils/highlight.js');

@Component({
    components: {myHeader: Header}
})
export default class notesbook extends Vue {
    content = '';
    files: any = [];
    activeIndex = 0;
    fileListTab = 1;
    Cataloggue = [];
    navList = [];
    toc = [];
    marked = () => {};
    created() {
        let that = this;
    }

    viewPage(index: number) {
        let that = this;
        that.activeIndex = index;
        console.log('@/data/' + that.files[index].name + '.md');
        let content = require(`@/data/${that.files[index].name}.md`);
        let Cataloggue = that.parseCataloggue(content);
        // that.content = Marked.marked(content);
        that.content = content
        console.log(this.toc);
    }
    mounted() {
        let that = this;
        const listFiles = () =>
            require
                .context('@/data', true, /^\.\/(.+)\.md$/)
                .keys()
                .map((name) => ({ name: name.replace(/^\.\/(.+)\.md$/, '$1') }));
        this.files = listFiles();
        this.initMarked();
    }
    initMarked() {
        let that = this;
        var rendererMD = new Marked.Renderer();
//         rendererMD.heading = function (text, level, raw, slugger) {
//             if(level == 0) {
//                 that.toc.push({
//                     text: text,
//                     level: level
// })
//             }
//             if (this.options.headerIds) {
//                 const id = this.options.headerPrefix + slugger.slug(raw);
//                 return `<h${level} id="${id}">${text}</h${level}>\n`;
//             }

//             // ignore IDs
//             return `<h${level}>${text}</h${level}>\n`;
//         };

        Marked.setOptions({
            renderer: rendererMD,
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false
        });
    }

    // 解析目录
    parseCataloggue(content: string) {}

    changeTab(index: number) {
        let that = this;
        that.fileListTab = index;
    }
}
</script>
<style lang="scss" scoped src="@/styles/notesbook.scss"></style>

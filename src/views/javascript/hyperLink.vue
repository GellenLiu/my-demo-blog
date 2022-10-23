<template>
    <div class="demo-content">
        <div>
            <el-input v-model="inputContent" placeholder="input your message"></el-input>
            <el-button @click="transform">转换</el-button>
            <div class="show-wrap">
                <div v-html="hyperLinkcontent"></div>
            </div>
        </div>
        <div class="code-wrap">
            <div class="code-header-wrap">
                <div class="code-title">Code Demo:</div>
                <div class="copy-btn" @click="copyCodeContent">copy</div>
            </div>
            <Editor class="editor" :codes="codeContent" :readOnly="true"></Editor>
        </div>
    </div>
</template>
  <script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Message } from 'element-ui';
import Editor from '@/components/monacoEditor.vue';
let LINK_IDENTIFICATION = 'TElOS19JREVOVElGSUNBVElPTg==';
import codes from '@/data/codes/javascript/hyperLink';

@Component({
    components: { Editor }
})
export default class hyperLink extends Vue {
    codeContent = codes;
    inputContent = '';
    hyperLinkcontent = '';
    mounted() {}

    transform() {
        this.hyperLinkcontent =  this.transformLinks(this.inputContent);
    }

    htmlDecode(str: string): string {
        let s = '';
        if (str.length == 0) return '';
        s = str.replace(/&amp;/g, '&');
        s = s.replace(/&lt;/g, '<');
        s = s.replace(/&gt;/g, '>');
        s = s.replace(/&nbsp;/g, ' ');
        s = s.replace(/&#39;/g, "'");
        s = s.replace(/&quot;/g, '"');
        return s;
    }

    htmlEncode(str: string) {
        let s = '';
        if (str.length == 0) return '';
        s = str.replace(/&/g, '&amp;');
        s = s.replace(/</g, '&lt;');
        s = s.replace(/>/g, '&gt;');
        s = s.replace(/ /g, '&nbsp;');
        s = s.replace(/\'/g, '&#39;');
        s = s.replace(/\"/g, '&quot;');
        return s;
    }

    fixLink(str: string) {
        if (!str.startsWith('http')) {
            return `//${str}`;
        }
        return str;
    }

    /**
     * 将文本中的链接识别出来并转为JSON
     */
    transformLinks(str: string) {
        const that = this;
        /** 这里可以这样判定当前信息是否为图片是因为信息为图片时是一条单独的信息，且不会被转义, 若是用户输入的内容会被转义 */
        if (str.startsWith('<img')) return str;

        const normalStr = that.htmlDecode(str);
        /** 正常匹配url正则即可 */
        const urlReg =
            /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.(com|edu|gov|int|net|org|info|cn|mo|tw|hk|io){1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=;]*)/g;
        const urls: string[] = [];
        const link = normalStr.replace(urlReg, function ($0) {
            urls.push($0);
            return LINK_IDENTIFICATION;
        });
        const encodeStr = this.htmlEncode(link);
        const reg = new RegExp(LINK_IDENTIFICATION, 'g');
        return encodeStr.replace(reg, function () {
            const url = urls.shift() || '';
            return `<a href="${that.fixLink(url)}" target="_blank" class="msg-link">${url}</a>`;
        });
    }

    copy(text: string, fcb: Function, errCb: Function) {
        if (!navigator.clipboard) {
            let textArea = document.createElement('textarea');
            textArea.value = window.location.href;
            textArea.style.top = '0';
            textArea.style.left = '0';
            textArea.style.position = 'fixed';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
                fcb && fcb();
            } catch (err) {
                errCb && errCb();
            }
            document.body.removeChild(textArea);
            return;
        }
        navigator.clipboard.writeText(text).then(
            function () {
                fcb && fcb();
            },
            function (err) {
                errCb && errCb();
            }
        );
    }
    copyCodeContent() {
        this.copy(
            this.codeContent,
            () => {
                Message.success('复制成功');
            },
            () => {
                Message.error('复制失败');
            }
        );
    }
}
</script>
  <style lang="scss" src="@/styles/javascript/copy.scss">
</style>
  
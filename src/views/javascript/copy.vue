<template>
    <div class="demo-content">
        <demo-info v-bind="demoInfo"></demo-info>
        <div class="text-area-container">
            <el-input type="input" v-model="inputValue" />
            <div class="btn-wrap">
                <el-button class="btn" @click="copyClick">copy</el-button>
            </div>
        </div>
        <div>粘贴验证区域：</div>
        <textarea></textarea>
        <code-show :code="codeContent"></code-show>
    </div>
</template>
  <script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Message } from 'element-ui';
import Editor from '@/components/monacoEditor.vue';
import codes from '@/data/codes/javascript/copy.js';
import CodeShow from '@/components/CodeShow.vue';
import DemoInfo from '@/components/DemoInfo.vue';

@Component({
    components: { Editor,DemoInfo, CodeShow }
})
export default class Copy extends Vue {
    demoInfo = {
        author: 'gellenliu',
        likes: '999+',
        labels: [
            'javascript'
        ]
    }
    inputValue = '复制这段话';
    curCode = '<div>111</div>';
    cmOptions = {
        value: '',
        mode: 'text/javascript',
        theme: 'ambiance',
        readOnly: true
    };
    codeContent = codes;
    mounted() {}
    copyClick() {
        this.copy(
            this.inputValue,
            () => {
                Message.success('复制成功');
            },
            () => {
                Message.error('复制失败');
            }
        );
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
  
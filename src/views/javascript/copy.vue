<template>
    <div class="demo-content">
        <div class="text-area-container">
            <input type="input" v-model="inputValue" />
            <div class="btn-wrap">
                <div class="btn" @click="copyClick">copy</div>
            </div>
        </div>
        <div>粘贴验证区域：</div>
        <textarea></textarea>
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

@Component({
    components: { Editor }
})
export default class Copy extends Vue {
    inputValue = '复制这段话';
    curCode = '<div>111</div>';
    cmOptions = {
        value: '',
        mode: 'text/javascript',
        theme: 'ambiance',
        readOnly: true
    };
    codeContent = `copy(text: string, fcb: Function, errCb: Function) {
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
    }`;
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
  
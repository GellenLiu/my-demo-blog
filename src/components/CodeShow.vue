

<template>
    <div class="code-wrap">
        <div class="code-header-wrap">
            <div class="code-title">Code Demo:</div>
            <div class="copy-btn" @click="copyCodeContent">复制代码</div>
        </div>
        <Editor class="editor" :codes="code" :readOnly="readonly"></Editor>
    </div>
</template>
  
  <script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Message } from 'element-ui';
import Editor from '@/components/monacoEditor.vue';

@Component({
    components: { Editor }
})
export default class CodeShow extends Vue {
    @Prop() code!: string;
    @Prop({ default: true }) readonly!: boolean;

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
            this.code,
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
  
  <style lang="scss" scoped>
@import '../styles/layout.scss';

.code-title {
    font-size: 14px;
}
.code-wrap {
    font-size: 14px;

}
</style>
  
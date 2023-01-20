<template>
    <demo-template :demoInfo="demoInfo">
       <div class="content">
           123
       </div>
    </demo-template>
</template>
  <script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Message } from 'element-ui';
import codes from '@/data/codes/javascript/copy.js';
import DemoTemplate from '@/views/demoTemplate.vue';

@Component({
    components: {DemoTemplate }
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
  
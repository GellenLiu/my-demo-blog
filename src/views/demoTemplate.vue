<template>
    <div class="demo-content">
        <demo-info v-bind="demoInfo"></demo-info>
        <div class="demo-wrap"></div>
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
    mounted() {}
}
</script>
<style lang="scss" scoped>
</style>

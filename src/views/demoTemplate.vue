<template>
    <div class="demo-content">
        <demo-info v-bind="demoInfo"></demo-info>
        <div class="demo-wrap">
            <slot></slot>
        </div>
        <code-show :code="codeContent"></code-show>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Editor from '@/components/monacoEditor.vue';
import CodeShow from '@/components/CodeShow.vue';
import DemoInfo from '@/components/DemoInfo.vue';
@Component({
    components: { Editor, CodeShow, DemoInfo }
})
export default class Copy extends Vue {
    @Prop({default: {
        author: 'gellenliu',
        likes: '999+',
        labels: [
            'javascript'
        ]
    }}) demoInfo!: any;
    @Prop({default: '暂无代码'}) codeContent!: any;
}
</script>
<style lang="scss" scoped>
</style>

<template>
    <div class="demo-content">
        <demo-info slot="info" v-bind="info"></demo-info>
        <div class="demo-wrap">
            <slot></slot>
        </div>
        <code-show slot="code" :code="code"></code-show>
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
    @Prop() demoInfo!: any;
    @Prop({default: '暂无代码'}) codeContent!: any;

    info: any = {};
    code: string = '';
    created() {
        this.info = this.$route?.meta || this.demoInfo;
        this.code = this.$route?.meta?.code || this.codeContent;
    }
}
</script>
<style lang="scss" scoped>
</style>

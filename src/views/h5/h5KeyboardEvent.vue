<template>
    <demo-template :codeContent="code"></demo-template>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DemoTemplate from '@/views/demoTemplate.vue';

@Component({
    components: {DemoTemplate}
})
export default class h5KeyboardEvent extends Vue {
    code: string = `
    const h5Resize = function(downCb, upCb) {
        let clientHeight = window.innerHeight;
        downCb = typeof downCb === 'function' ? downCb : function(){};
        upCb = typeof ipCb === 'function' ? upCb : function(){};
        window.addEventListener('resize', () => {
            let height = window.innerHeight;
            if(height === clientHeight) {
                downCb()
            }
            if(height < clientHeight) {
                upCb()
            }
        })
    }
    `;
    mounted() {}
}
</script>
<style lang="scss" src="@/styles/javascript/copy.scss">
</style>
  
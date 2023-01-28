<template>
    <demo-template :codeContent="code">
        <div class="drag-area">
          <div class="drag-box">拖拽组件</div>
        </div>
    </demo-template>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DemoTemplate from '@/views/demoTemplate.vue';

@Component({
    components: { DemoTemplate }
})
export default class h5KeyboardEvent extends Vue {
    code: string = `mousedown, mousemove, mouseup`;
    mounted() {
        var o: any = document.querySelector('.drag-box');
        o.onmousedown = function (e: any) {
            let offsetX = e.clientX - o.offsetLeft;
            let offsetY = e.clientY - o.offsetTop;
            document.onmousemove = function (e) {
                let x =  e.clientX - offsetX;
                let y = e.clientY - offsetY;
                if(x < 0) {
                    x = 0;
                }
                if(y < 0) {
                    y = 0;
                }
                if(y > 250) {
                    y = 250;
                }
                o.style.left =x + "px";
                o.style.top =y + "px";
            }
            document.onmouseup = function () {
                document.onmousemove = null;
                document.onmouseup = null;
            }
        }
    }
}
</script>
<style lang="scss">
.drag-area {
    position: relative;
    width: 100%;
    height: 400px;
    border: 2px solid #ccc;
}
.drag-box {
    position: absolute;
    width: 150px;
    height: 150px;
    text-align: center;
    line-height: 150px;
    color: rgb(141, 221, 13);
    background: rgb(10, 118, 227);
    z-index: 9;
}
</style>

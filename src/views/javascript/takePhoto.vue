<template>
    <div class="demo-content">
        <demo-info v-bind="demoInfo"></demo-info>
        <div class="demo-wrap">
           <div id="contentHolder">
               <video id="video" autoplay style="background-color: #000"></video>
               <div></div>
               <canvas style="display:none" width="400" height="400" id="canvas"></canvas>
               <img id="photo-show" src=""/>
           </div>
           <el-button @click="takePhoto">拍照</el-button>
        </div>
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
            'javascript',
            'API'
        ]
    };
    video:any = null;
    codeContent = '';
    mounted() {
        let that = this;
        that.video = document.getElementById('video');
        this.video.width = 400;
        this.video.height = 400;
        let height = 400;
        let width = 400;

        const options = {
            video: {
                width,
                height
            }
        }
        navigator.mediaDevices.getUserMedia(options).then(stream =>{
            that.video.srcObject = stream
            that.video.onloadedmetadata = () => {
                that.video.play();
            }
        })
    }
    takePhoto() {
        let that = this;
        let cvs:any = document.getElementById('canvas');
        let ctx = cvs.getContext('2d');
        ctx.drawImage(that.video, 0, 0, 400, 400);
        let img:any = document.getElementById('photo-show');
        img.src = cvs?.toDataURL('image/png')
    }
}
</script>
<style lang="scss" scoped>
</style>

<template>
  <div class="share-screen">
    <demo-info v-bind="demoInfo"></demo-info>
    <video id="video" class="video"></video>
    <div class="btn-wrap">
      <div class="start-btn" @click="startShare">开始共享</div>
      <div class="stop-btn" @click="stopShare">结束共享</div>
    </div>
    <code-show :code="codes"></code-show>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Editor from '@/components/monacoEditor.vue';
import codes from '@/data/codes/shareScreen/index';
import CodeShow from '@/components/CodeShow.vue';
import DemoInfo from '@/components/DemoInfo.vue';

@Component({
  components: {Editor,DemoInfo, CodeShow},
})
export default class ShareScreen extends Vue {
  demoInfo = {
        author: 'gellenliu',
        likes: '101'
    }
  codes = codes;
  mounted() {
    console.log(codes)
  }

  stream: any = null;
  startShare() {
    let that = this;
    console.log("开始共享屏幕......");
    let options = {
      video: {
        cursor: "always",
      },
      audio: false,
    };
    that.startCapture(options);
  }
  stopShare() {
    console.log("结束共享屏幕");
  }
  async startCapture(displayMediaOptions: any) {
    let that = this;
    let captureStream = null;
    try {
      captureStream = await navigator.mediaDevices.getDisplayMedia(
        displayMediaOptions
      );
      that.stream = captureStream;
      that.live(captureStream);
      console.log("captureSream");
      console.log(captureStream);
      /*
    MediaStream {id: 'hW1oXkU2lBWzXvaHphmc7143NvEgzcrDWUeT', active: true, onaddtrack: null, onremovetrack: null, onactive: null, …}
active: true
id: "hW1oXkU2lBWzXvaHphmc7143NvEgzcrDWUeT"
onactive: null
onaddtrack: null
oninactive: null
onremovetrack: null
[[Prototype]]: MediaStream
     */
    } catch (err) {
      console.error("Error: " + err);
    }
    return captureStream;
  }
  // 创建一个video标签进行播放流
  live(stream: any) {
    const video: any = document.getElementById("video");
    video.srcObject = stream;
    video.controls = true;
    video.play();
  }

  pushStream() {
    // 通过webRTC进行推流
  }
  codeContent = codes as string;
}
</script>
<style>
.video {
  height: 400px;
  width: 600px;
  background: #e2e2d8d3;
}
.btn-wrap {
  display: flex;
  width: 300px;
  margin: 0 auto;
  justify-content: space-between;
}
</style>

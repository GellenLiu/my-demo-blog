export default `let options = {
    video: {
      cursor: "always",
    },
    audio: false,
  };
async startCapture(displayMediaOptions: any) {
  let that = this;
  let captureStream = null;
  try {
    captureStream = await navigator.mediaDevices.getDisplayMedia(
      displayMediaOptions
    );
    that.stream = captureStream;
    that.live(captureStream);
  } catch (err) {
    console.error("Error: " + err);
  }
  return captureStream;
} // 创建一个video标签进行播放流
live(stream: any) {
  const video: any = document.getElementById("video");
  video.srcObject = stream;
  video.controls = true;
  video.play();
}`

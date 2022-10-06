<template>
  <div class="home">
    <div class="page">
		<div class="content">
		  	<div class="title">HI , I AM Gellen Liu</div>
		    <div class="sub-title">welcome to my world</div>
		    <div class="start-btn" @click="start">start</div>
		</div>
		<div class="img-box">
			<img src="../../public/man.png"/>
		</div>
		<div class="fly">
			<div class="left-wing"></div>
			<img src="../../public/qihang.png"/>
			<div class="right-wing"></div>
		</div>
    <div id="blackHall" class="black-hall">
      <img v-if="showBlackHall" :key="freshDom" src="../../public/blackhole2019_pc.png"/>
    </div>
<!-- 	<div class="ball-box">
			<div class="ball"></div>
		</div> -->
		<!-- <div class="trans">
			
		</div> -->
		 
 
	</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue';

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  showBlackHall = false;
  freshDom = Symbol()

  start() {
    let that = this;
    that.$router.push('/projectList')

    // this.showBlackHall = true;
    // let blackHall = document.getElementById('blackHall');
    // console.log(blackHall)
    // blackHall?.addEventListener('animationend', ()=> {
    //   this.showBlackHall = false;
    //   that.freshDom = Symbol();
    //   that.$router.push('/projectList')
    // }, false)
  }
}
</script>
<style lang="scss" scoped src="@/styles/home.scss"></style>

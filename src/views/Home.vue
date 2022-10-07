<template>
    <div class="home">
        <div class="page">
            <div class="content">
                <div class="title" data-text="HI , I AM Gellen Liu">HI , I AM Gellen Liu</div>
                <div class="sub-title">welcome to my world</div>
                <div class="start-btn" @click="start">start</div>
            </div>
            <div class="img-box">
                <img src="../../public/man.png" />
                <div class="ball-wrap">
                <div class="planet">
                    <div class="ball" @mouseover="stopRotate" @mouseleave="startRotate" />
                </div>
            </div>
            </div>
            
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue';

@Component({
    components: {
        HelloWorld
    }
})
export default class Home extends Vue {
    showBlackHall = false;
    freshDom = Symbol();

    start() {
        let that = this;
        that.$router.push('/projectList');

        // this.showBlackHall = true;
        // let blackHall = document.getElementById('blackHall');
        // console.log(blackHall)
        // blackHall?.addEventListener('animationend', ()=> {
        //   this.showBlackHall = false;
        //   that.freshDom = Symbol();
        //   that.$router.push('/projectList')
        // }, false)
    }
    startRotate() {
      let planet = document.querySelector('.planet');
      let ball = document.querySelector('.ball');
      if(planet && ball) {
        planet.style.animationPlayState = 'running';
        ball.style.animationPlayState = 'running';
      }
    }
    stopRotate() {
      let planet = document.querySelector('.planet');
      let ball = document.querySelector('.ball');
      if(planet && ball) {
        planet.style.animationPlayState = 'paused';
        ball.style.animationPlayState = 'paused';
      }
    }
}
</script>
<style lang="scss" scoped src="@/styles/home.scss"></style>

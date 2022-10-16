<template>
    <div class="home">
        <div id="sky-header"></div>
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

    mounted() {
        this.starSky();
    }

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
        if (planet && ball) {
            planet.style.animationPlayState = 'running';
            ball.style.animationPlayState = 'running';
        }
    }
    stopRotate() {
        let planet = document.querySelector('.planet');
        let ball = document.querySelector('.ball');
        if (planet && ball) {
            planet.style.animationPlayState = 'paused';
            ball.style.animationPlayState = 'paused';
        }
    }
    starSky() {
        let sky = document.getElementById('sky-header');
        var screenW = sky.clientWidth;
        var screenH = sky.clientHeight;
        for (var i = 0; i < 40; i++) {
            var span = document.createElement('span');
            span.className = 'star'
            sky.appendChild(span);
            var x = Math.random() * screenW;
            var y = Math.random() * screenH;
            span.style.left = x + 'px';
            span.style.top = y + 'px';
            var scale = Math.random() * 1.5;
            let rotate = -Math.random() * 20;
            span.style.transform = 'scale(' + scale + ', ' + scale + ') rotate(' + rotate + 'deg)';
            var rate = Math.random() * 5.5;
            span.style.animationDelay = rate + 's';
        }
    }
}
</script>
<style lang="scss" scoped src="@/styles/home.scss"></style>

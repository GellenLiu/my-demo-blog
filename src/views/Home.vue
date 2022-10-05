<template>
  <div class="home">
    <header></header>
    <div class="main">
      <div class="main-left">
        <div class="title">Welcome To My World</div>
      <div class="start-btn" @click="start">Start</div>
      </div>
      <div class="main-right">
        <div class="img-box">
          <img/>
        </div>
      </div>
      <img v-if="showBlackHall" class="black-hall" src="https://ss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/www/cache/yunying/blackhole/img/blackhole2019_pc.png"/>
    </div>
    <footer></footer>
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

  start() {
    console.log('start...');
    this.showBlackHall = true;
    this.$router.push('/projectList')
  }
}
</script>
<style lang="scss" scoped src="@/styles/home.scss"></style>

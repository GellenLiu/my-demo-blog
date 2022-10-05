<template>
    <div class="projectList">
        <div class="list-wrap">
            <div v-for="(item, index) in itemList" :key="index">
            <div class="item-wrap" @click="goRouter(item.path)">
                <div class="item-label">{{item.label}}</div>
                <div class="item-desc">{{item.desc}}</div>
            </div>
        </div>
        </div>
    </div>
  </template>
  
  <script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
  
  @Component({
    components: {
      HelloWorld,
    },
  })
  export default class TemplateCnp extends Vue {
    itemList = [
        {
            label: 'my-demo-blog',
            desc: '我用demo写博客',
            path: '/my-demo-blog'
        },
        {
            label: 'Comming Soon',
            desc: '敬请期待',
            path: ''
        }
    ];
    goRouter(path: string) {
        this.$router.push(path);
    }
  }
  </script>
  <style lang="scss" scoped src="@/styles/projectList.scss"></style>
  
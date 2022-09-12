<template>
  <div id="app">
    <div class="router-menu">
      <el-row class="tac">
        <el-col :span="12">
          <h5>路由导航</h5>
          <el-menu>
            <el-submenu v-for="(item, index) in menu" :key="index">
              <template slot="title">
                <router-link :to="item.path">
                  <span>{{ item.name }}</span>
                </router-link>
              </template>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <router-view />
  </div>
</template>
<script lang="ts">
// import {Button} from 'element-ui';
import { routes } from "@/router/index";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class AppView extends Vue {
  menu = routes;
}
</script>

<style>
#app {
  display: flex;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.router-menu {
  width: 200px;
}
.router-menu a {
  text-decoration: none;
}
.el-submenu__icon-arrow,
.el-icon-arrow-down {
  display: none !important;
}
</style>

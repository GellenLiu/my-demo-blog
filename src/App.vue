<template>
  <div id="app">
    <router-view/>
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

<style lang="scss" src="@/styles/app.scss"></style>

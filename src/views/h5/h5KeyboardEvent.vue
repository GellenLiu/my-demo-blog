<template>
    <demo-template>
       <div class="content">
           123
       </div>
    </demo-template>
</template>
  <script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DemoTemplate from '@/views/demoTemplate.vue';

@Component({
    components: {DemoTemplate}
})
export default class h5KeyboardEvent extends Vue {
    mounted() {}
}
</script>
  <style lang="scss" src="@/styles/javascript/copy.scss">
</style>
  
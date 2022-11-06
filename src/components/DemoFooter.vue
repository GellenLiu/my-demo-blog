<template>
    <div class="demo-info">
        <div class="right">
            <div class="demo-author">
                <img src="@/assets/icon/author.svg"/>
                <div class="author-name">{{ author }}</div>
            </div>
            <div class="demo-agree">
                <img src="@/assets/icon/agree1.png"/>
                <div class="agree-number">{{ likes }}</div>
            </div>
            <div class="demo-share">
                <img src="@/assets/icon/share.png"/>
            </div>
        </div>
    </div>
</template>
  
  <script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';


@Component
export default class DemoInfo extends Vue {

    @Prop({default: 'gellenliu'}) author!: string;
    @Prop({default: 0}) likes!: string | number;

    mounted() {
    }

}
</script>
  
<style lang="scss" scoped>
@import '../styles/layout.scss';
@import '@/styles/mixin.scss';

</style>
  
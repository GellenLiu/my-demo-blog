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

.demo-info {
    display: flex;
    justify-content: end;
    align-items: center;
    width: 100%;
    height: 30px;
}
.left {
    width: 100px;
}
.right {
    display: flex;
    justify-content: end;
    align-items: center;
}
.info-icon {
   height: 20px;
   margin-right: 10px;
   @include text-elipsis;
   img {
    display: inline-block;
    height: 20px;
    width: 20px;
    margin-right: 6px;
   }
}

.demo-author {
    @extend .info-icon;
    display: flex;
    align-items: center;
    line-height: 1;
    margin-right: 10px;
}

.demo-agree {
    @extend .info-icon;
    display: flex;
   align-items: center;
}

.demo-share {
    @extend .info-icon;
  display: flex;
align-items: center;
    img {
        height: 18px;
        width: 18px;
    }
}
</style>
  
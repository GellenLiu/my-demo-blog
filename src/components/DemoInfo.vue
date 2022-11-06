<template>
    <div class="demo-info">
        <div class="left">
            <div class="demo-label-list">
                <img src="@/assets/icon/label.png" />
                <div class="label-item" v-for="(label, index) in labels" :key="index">
                    {{ label }}
                </div>
            </div>
        </div>
        <div class="right">
            <div class="demo-author">
                <img src="@/assets/icon/author.svg" />
                <div class="author-name">{{ author }}</div>
            </div>
            <div class="demo-agree">
                <img src="@/assets/icon/agree1.png" @click="like" />
                <div class="agree-number">{{ likes }}</div>
            </div>
            <div class="demo-share" @click="share">
                <img src="@/assets/icon/share.png" />
            </div>
        </div>
    </div>
</template>
  
  <script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Utils from '@/utils/utils';
import { Message } from 'element-ui';

@Component
export default class DemoInfo extends Vue {
    @Prop({ default: 'gellenliu' }) author!: string;
    @Prop({ default: 0 }) likes!: string | number;
    @Prop() labels!: Array<string>;

    mounted() {}

    like() {}

    share() {
        let link = window.location.href;
        Utils.copy(
            link,
            () => {
                Message.success('已复制分享链接');
            },
            () => {
                Message.error('复制失败');
            }
        );
    }
}
</script>
  
<style lang="scss" scoped>
@import '../styles/layout.scss';
@import '@/styles/mixin.scss';

.demo-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 30px;
    margin-bottom: 10px;
}
.left {

    .demo-label-list {
        display: flex;
        justify-content: start;
        align-items: center;
        img {
            height: 18px;
            width: 18px;
            margin-right: 10px;
        }
    }

    .label-item {
        height: 16px;
        font-size: 14px;
        padding: 0 8px;
        margin-right: 10px;
        line-height: 16px;
        border-radius: 4px;
        background: rgb(106, 104, 104);
        color: #fff;
    }
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
  
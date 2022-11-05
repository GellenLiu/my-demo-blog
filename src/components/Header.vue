<template>
    <div class="header">
        <div class="left">
                <div class="go-home" @click="goHome">
                    <img src="@/assets/img/home.svg" />
                    <span>Home</span>
                </div>
            </div>
            <div class="right"></div>
    </div>
  </template>
  
  <script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Header extends Vue {
    @Prop() private msg!: string;

    goHome() {
        let that =this;
        that.$router.push('/')
    }
}
</script>
  
  <style lang="scss" scoped>
@import '../styles/layout.scss';

.demoHome {
    color: $color-black;
    background-color: white;
}
.header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    height: 50px;
    border-bottom: .5px solid rgba(0,0,0,.08);
    z-index: 990px;
    background: rgba($color: #fff, $alpha: .8);
    .left {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .logo {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: $font-size-m;
        img {
            height: 40px;
            width: 40px;
        }
    }
    .go-home {
        display: flex;
        justify-content: start;
        align-items: center;
        line-height: 100%;
        font-weight: 500;
        img {
            height: 30px;
            width: 30px;
            margin-right: 6px;
        }
    }
}
.main {
    display: flex;
    padding-top: 50px;
    width: 100%;
    min-height: calc(100vh - 50px);
}
.aside {
    width: 200px;
    padding: 15px;
    border-right: 1px solid $border-color-gray;

    .router-list-item {
        height: 50px;
        line-height: 50px;
        &:hover {
            background-color: rgba(77, 166, 234, 0.6);
        }
    }
}
.content {
    flex: 1;
    padding: 20px;
}
.aside-header {
    ::v-deep input {
        width: 60%;
        height: 30px;
    }
}
</style>
  
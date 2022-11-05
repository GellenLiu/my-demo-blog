<template>
    <div class="demoHome">
        <div class="header">
            <div class="left">
                <div class="logo">
                    <img src="@/assets/logo.png" />
                    <span>my-demo-blog</span>
                </div>
                <div class="go-home" @click="goHome"><img src="@/assets/img/home.svg"></img></div>
            </div>
            <div class="right"></div>
        </div>
        <div class="main">
            <div class="aside">
                <div class="aside-header">
                    <el-select
                        v-model="searchValue"
                        multiple
                        filterable
                        remote
                        reserve-keyword
                        placeholder="请输入关键词"
                        :remote-method="remoteMethod"
                    >
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        >
                        </el-option>
                    </el-select>
                    <div class="more"></div>
                    <div class="more-select"></div>
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            排序<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item icon="el-icon-plus">热度</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-circle-plus">好评</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-circle-plus-outline"
                                >难度</el-dropdown-item
                            >
                            <el-dropdown-item icon="el-icon-check">高到低</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-circle-check">低到高</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <div class="aside-content">
                    <div
                        class="router-list-item"
                        v-for="(item, index) in routerList"
                        :key="index"
                        @click="goRouter(item.path)"
                    >
                        <div>{{ item.label }}</div>
                    </div>
                </div>
            </div>
            <div class="content">
                <router-view></router-view>
            </div>
        </div>
        <div class="footer"></div>
    </div>
</template>
  
  <script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue';
import routerListData from '@/data/routerListData';

@Component({
    components: {
        HelloWorld
    }
})
export default class TemplateCnp extends Vue {
    searchValue = '';
    options = [];
    remoteMethod() {}
    routerList = routerListData;
    mounted() {
        console.log(this.routerList);
    }
    goRouter(path: string) {
        let that = this;
        that.$router.push(`${path}`);
    }
    goHome() {
        let that =this;
        that.$router.push('/')
    }
}
</script>
  <style lang="scss" scoped src="@/styles/demoHome.scss"></style>
  
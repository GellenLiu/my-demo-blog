<template>
    <div class="demoHome">
        <my-header></my-header>
        <div class="main">
            <div class="aside">
                <div class="aside-header">
                    <el-input
                        type="text"
                        prefix-icon="el-icon-search"
                        v-model="searchValue"
                        placeholder="输入关键字"
                        style="width: 120px; cursor: pointer"
                        @keyup.enter.native="searching"
                    ></el-input>
                    <div class="more-select"></div>
                    <el-dropdown @command="sorting">
                        <span class="el-dropdown-link">
                            {{ $t('sort') }}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="heat" icon="el-icon-plus">热度</el-dropdown-item>
                            <el-dropdown-item command="likes" icon="el-icon-circle-plus">好评</el-dropdown-item>
                            <el-dropdown-item command="difficulty" icon="el-icon-circle-plus-outline"
                                >难度</el-dropdown-item
                            >
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
import Header from '@/components/Header.vue';

@Component({
    components: {
        HelloWorld,
        'my-header': Header
    }
})
export default class TemplateCnp extends Vue {
    searchValue = '';
    options = [];
    remoteMethod() {}
    routerList = routerListData;
    mounted() {}
    goRouter(path: string) {
        let that = this;
        that.$router.push(`${path}`);
    }
    goHome() {
        let that = this;
        that.$router.push('/');
    }

    // 搜索
    searching() {
        let that = this;
        that.routerList =  routerListData.filter((item: any) => {
            return JSON.stringify(item).includes(that.searchValue);
        });
    }

    // 标签筛选
    labelSearching(label: string) {
        let that = this;
        that.routerList =  that.routerList.filter((item: any) => {
            return JSON.stringify(item).includes(label);
        });
    }

    // 排序
    sorting(type: string) {
        if(type === 'likes') {
            this.routerList = this.routerList.sort((a: any, b: any)=>{
                console.log(parseInt(b.demoInfo.likes) - parseInt(a.demoInfo.likes))
                return parseInt(b.demoInfo.likes) - parseInt(a.demoInfo.likes);
           })
           return;
        }
        if(type === 'reading') {
            this.routerList = this.routerList.sort((a: any, b: any)=>{
                return b.demoInfo.likes - a.demoInfo.likes;
           })
           return;
        }
        if(type === 'difficulty') {
            this.routerList = this.routerList.sort((a: any, b: any)=>{
                return b.demoInfo.likes - a.demoInfo.likes;
           })
           return;
        }


    }
}
</script>
  <style lang="scss" scoped src="@/styles/demoHome.scss"></style>
  
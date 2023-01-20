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
                    <el-dropdown @command="sorting">
                        <span class="el-dropdown-link">
                            {{ $t('sort') }}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="heat" icon="el-icon-plus"
                                >热度</el-dropdown-item
                            >
                            <el-dropdown-item command="likes" icon="el-icon-circle-plus"
                                >好评</el-dropdown-item
                            >
                            <el-dropdown-item
                                command="difficulty"
                                icon="el-icon-circle-plus-outline"
                                >难度</el-dropdown-item
                            >
                        </el-dropdown-menu>
                    </el-dropdown>
                    <div class="more-select" @click="showLabelSearch = !showLabelSearch"></div>
                    
                </div>
                <div v-show="showLabelSearch">
                    <el-checkbox-group v-model="labelSearchList">
                        <el-checkbox label="css"></el-checkbox>
                        <el-checkbox label="javascript"></el-checkbox>
                        <el-checkbox label="API"></el-checkbox>
                    </el-checkbox-group>
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
import { Component, Vue, Watch } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue';
import routerListData from '@/data/routerListData.json';
import Header from '@/components/Header.vue';

@Component({
    components: {
        HelloWorld,
        'my-header': Header
    }
})
export default class TemplateCnp extends Vue {
    labelOptions = ['css', 'javascript', 'API', 'Vue', 'canvas', 'h5', 'function'];
    searchValue:string = '';
    showLabelSearch:boolean = false;
    options = [];
    remoteMethod() {}
    routerList = routerListData;
    // 筛选条件
    filterCond: any = {
        searchValue: '',
        labelList: []
    };
    labelSearchList = [];
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
        const that = this;
        that.filterCond.searchValue = that.searchValue;
        that.search();
    }

    search() {
        let that = this;
        let result = routerListData;
        result = result.filter((item: any) => {
            return JSON.stringify(item).includes(that.filterCond.searchValue);
        });
        for (let i of that.filterCond.labelList) {
            result = result.filter((item: any) => {
                return JSON.stringify(item).includes(i);
            });
        }
        that.routerList = result;
    }

    @Watch('labelSearchList')
    labelSearching() {
        let that = this;
        that.filterCond.labelList = that.labelSearchList;
        that.search();
    }

    // 排序
    sorting(type: string) {
        if (type === 'likes') {
            this.routerList = this.routerList.sort((a: any, b: any) => {
                console.log(parseInt(b.demoInfo.likes) - parseInt(a.demoInfo.likes));
                return parseInt(b.demoInfo.likes) - parseInt(a.demoInfo.likes);
            });
            return;
        }
        if (type === 'reading') {
            this.routerList = this.routerList.sort((a: any, b: any) => {
                return b.demoInfo.likes - a.demoInfo.likes;
            });
            return;
        }
        if (type === 'difficulty') {
            this.routerList = this.routerList.sort((a: any, b: any) => {
                return b.demoInfo.likes - a.demoInfo.likes;
            });
            return;
        }
    }
}
</script>
  <style lang="scss" scoped src="@/styles/demoHome.scss"></style>
  
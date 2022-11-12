<template>
    <div class="projectList">
        <div class="header">
            <div class="go-back" @click="goHome">
                <button class="learn-more">
                    <span class="circle" aria-hidden="true">
                        <span class="icon arrow"></span>
                    </span>
                    <span class="button-text">Back</span>
                </button>
            </div>
        </div>
        <div class="list-wrap">
            <div
                class="list-item"
                @click="goRouter(item.path, key)"
                v-for="(item, key) in itemList"
                :key="key"
            >
                <div :class="index == key ? 'light-animate' : ''">
                    <div class="item-label">{{ item.label }}</div>
                    <!-- <div class="item-desc">{{ item.desc }}</div> -->
                </div>
                <!-- </div> -->
            </div>
        </div>
        <div class="footer">
            <div class="g-container">
                <div class="g-wrap">
                    <div class="g-footer">
                        <div v-for="(item, index) in 200" :key="index" class="g-bubble"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
    components: {}
})
export default class TemplateCnp extends Vue {
    itemList = [
        {
            label: 'Demo',
            desc: '我用demo写博客',
            path: '/my-demo-blog'
        },
        {
            label: 'Blog',
            desc: '笔记',
            path: '/notesbook'
        },
        {
            label: 'Resume',
            desc: '敬请期待',
            path: ''
        }
    ];
    clicked = false;
    index = -1;

    goRouter(path: string, index: any) {
        let that = this;
        that.clicked = true;
        that.index = index;
        setTimeout(() => {
            that.$router.push(path);
        }, 200);
    }
    goHome() {
        let that = this;
        that.$router.push('/');
    }

}
</script>
<style lang="scss" scoped src="@/styles/projectList.scss"></style>
  
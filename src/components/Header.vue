<template>
    <div class="header">
        <div class="left">
            <div class="go-home" @click="goHome">
                <img src="@/assets/img/home.svg" />
                <span>{{ $t('Home') }}</span>
            </div>
        </div>
        <div class="right">
            <div class="dark-mode-setting">
                <label class="switch">
                    <input v-model="themeMode" type="checkbox" />
                    <span class="slider"></span>
                </label>
            </div>
            <div class="language-setting">
                <el-dropdown @command="changeLanguage">
                    <span class="el-dropdown-link">
                        {{ activeLanguage }}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="zh">中文</el-dropdown-item>
                        <el-dropdown-item command="en">English</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
  
  <script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { useI18n } from '../i18n/index';
const { setLanguage } = useI18n();
const langMap: any = {
    zh: '中文',
    en: 'English'
};

@Component
export default class Header extends Vue {
    activeLanguage = '中文';
    themeMode = window.localStorage.getItem('theme') === 'dark' || false;

    mounted() {
        let APP = document.getElementById('app');
        this.themeMode && APP?.classList.add('dark');
    }

    goHome() {
        let that = this;
        that.$router.push('/');
    }

    changeLanguage(lang: string) {
        this.activeLanguage = langMap[lang];
        setLanguage(lang, true);
    }

    @Watch('themeMode')
    changeTheme() {
        let APP = document.getElementById('app');
        if(this.themeMode) {
            APP?.classList.add('dark');
            window.localStorage.setItem('theme', 'dark')
            
        } else {
            APP?.classList.remove('dark');
            window.localStorage.setItem('theme', 'light')
        }
    }
}
</script>
  
<style lang="scss" scoped>
@import '../styles/layout.scss';

.demoHome {
    color: $color-black;
    background-color: white;
}
.dark {
    .header {
       background: rgba($color: rgb(19, 18, 18), $alpha: 0.8);
    }

    .go-home {
        color: #fff;;
    }
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
    border-bottom: 0.5px solid rgba(0, 0, 0, 0.08);
    z-index: 99;
    background: rgba($color: #fff, $alpha: 0.8);
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
        position: relative;
        display: flex;
        justify-content: start;
        align-items: center;
        line-height: 100%;
        font-weight: 500;
        overflow: visible;
        cursor: pointer;
        img {
            height: 30px;
            width: 30px;
            margin-right: 6px;
        }

        // 修改伪元素实现hover
        &::before {
            content: '';
            display: block;
            position: absolute;
            left: -5px;
            right: 0;
            width: 40px;
            height: 40px;
            border-radius: 999px;
            transition: width .4s;
            background-color: rgba(0,0,0,.3);
        }
        &:hover {
            &::before {
            content: '';
            display: block;
            position: absolute;
            left: -5px;
            right: 0;
            width: 100px;
            height: 40px;
            border-radius: 999px;
            background-color: rgba(0,0,0,.3);
        }
        }
    }
}

.right {
    display: flex;
    justify-content: end;
    align-items: center;
}

.dark-mode-setting {
    margin-top: 2px;
    margin-right: 10px;
    transform: scale(.7);

    img {
        height: 100%;
        width: 100%;
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

// 主题开关
.switch {
    /* --moon-mask: ; */
    font-size: 17px;
    position: relative;
    display: inline-block;
    width: 3.5em;
    height: 2em;
}

/* Hide default HTML checkbox */
.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

/* The slider */
.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f4f4f5;
    transition: 0.4s;
    border-radius: 30px;
}

.slider:before {
    position: absolute;
    content: '';
    height: 1.4em;
    width: 1.4em;
    border-radius: 20px;
    left: 0.3em;
    bottom: 0.3em;
    background: linear-gradient(40deg, #ff0080, #ff8c00 70%);
    transition: 0.4s;
}

input:checked + .slider {
    background-color: #303136;
}

input:checked + .slider:before {
    transform: translateX(1.5em);
    background: #303136;
    box-shadow: inset -3px -2px 5px -2px #8983f7, inset -10px -5px 0 0 #a3dafb;
}
</style>
<style lang="scss">
.el-dropdown-link {
    cursor: pointer;
    color: #409eff;
}
.el-icon-arrow-down {
    font-size: 12px;
}
</style>
  
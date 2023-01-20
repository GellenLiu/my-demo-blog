import enI18n from './en';
import zhI18n from './zh';
import Vue from "vue";
import VueI18n from 'vue-i18n';


Vue.use(VueI18n);

const LANG_DB_KEY = 'lang';
const initLang = window.localStorage.getItem(LANG_DB_KEY) || getSystemLang() || 'zh';
const i18n = new VueI18n({
    locale: initLang,
    messages: {zh: zhI18n, en: enI18n}
});

Vue.use({
    install(Vue, options) {
        Vue.mixin({
            beforeCreate() {
                // @ts-ignore
                this._i18n ??= i18n;
            }
        });
    }
});

setLanguage(initLang);

function getSystemLang() {
    return navigator.language === 'en' ? 'en' : 'zh';
}

function setLanguage(lang: string, cache: boolean = true) {
    i18n.locale = lang;
    cache && window.localStorage.setItem(LANG_DB_KEY, lang);
    // 设置cookie语言
    document.cookie = `lang=${lang}&domain=${window.location.hostname}`;
}

function useI18n() {
    return {
        i18n: new Vue({i18n}),
        current: i18n.locale,
        setLanguage,
        switchLanguage() {
            if (i18n.locale === 'en') {
                setLanguage('zh');
            } else {
                setLanguage('en');
            }
        }
    };
}

export {useI18n, setLanguage};

export default i18n;

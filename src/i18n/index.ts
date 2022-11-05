import enI18n from './en';
import zhI18n from './zh';
import Vue from "vue";


Vue.use(VueI18n);
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

const LANG_DB_KEY = 'lang';
const initLang = Db.get(LANG_DB_KEY) ?? getSystemLang() : 'zh';
const i18n = new VueI18n({
    locale: initLang ?? 'zh',
    messages: {zh: zhI18n, en: enI18n}
});

setLanguage(initLang);

function getSystemLang() {
    return navigator.language === 'en' ? 'en' : 'zh';
}

function setLanguage(lang: 'zh' | 'en', cache: boolean = true) {
    i18n.locale = lang;
    // 设置element-ui语言
    // ElementLocale.use(lang === 'en' ? enLocale : zhLocale);
    // 保存语言到本地
    cache && window.localStorage.set(LANG_DB_KEY, lang);
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

export {useI18n};

export default i18n;

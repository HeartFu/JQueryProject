import i18next from 'i18next'
import zh from './zh.js'
import en from './en.js'

let nLng = 'en'
if (navigator.language.startsWith('zh')) {
    nLng = 'zh'
}
const lng = 'zh' || localStorage.lang || nLng
localStorage.lang = lng

// 将i8next配置全局配置到react-i8next(通过reactI18nextModule)
i18next.init({
    lng, // 'en' | 'zh-CN'
    // debug: true,
    resources: {
        zh: {
            translation: zh
        },
        en: {
            translation: en
        },
    },
}, (err, t) => {
    if (err) {
        return err
    }
    return t
})

function changeLng(lng) {
    i18next.changeLanguage(lng);
}
  


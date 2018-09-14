import "./index.scss";
import "../../js/common.js";
import apis from '../../fetch/index';
import i18next from "i18next";

document.getElementById("headerTitle").innerText = i18next.t('headerTitle');
document.getElementById("contentTitle").innerText = i18next.t('contentTitle');
document.getElementById("userLabel").innerText = i18next.t('userLabel');
document.getElementById("heightLabel").innerText = i18next.t('heightLabel');
document.getElementById("dataLabel").innerText = i18next.t('dataLabel');
document.getElementById("footer").innerText = i18next.t('footer');

$(document).ready(function() {
    // 从后台获取数据
    // console.log(123)
    queryBlockData();
})

async function queryBlockData() {
    let res = await apis.queryBlockData();
    if (res && res.code === 0) {
        // 表示成功
        let data = res.data;
        document.getElementById("userNum").innerText = data.userCount;
        document.getElementById("blockHeight").innerText = data.blockHigh;
        document.getElementById("dataCount").innerText = data.dateCount;
    }
}
import "./index.scss";
import "../../js/common.js";
import i18next from "i18next";

document.getElementById("consentLabel").innerText = i18next.t('consentLabel');
document.getElementById("consentLabel2").innerText = i18next.t('consentLable2');
document.getElementById("showConsent").innerText = i18next.t('showCOnsentButton');
document.getElementById("footer").innerText = i18next.t('footer');

$("#showConsent").bind('click', function(e) {
    window.location.href = '/mederaHome.html';
})


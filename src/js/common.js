import '../i18n/index.js';

// rem 定义根节点font-size 移动端专属
(function setFontSize(cw) {
    function setRootFontSize() {
        let w = document.documentElement.getBoundingClientRect().width;
        w = w > cw ? cw : w;
        const per = w / cw;
        document.documentElement.style.fontSize = `${per * 100}px`;
    }
    setRootFontSize();
    window.onresize = setRootFontSize;
}(750));
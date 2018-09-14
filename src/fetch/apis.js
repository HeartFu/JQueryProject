// 配置简化转换
function conversion(url, method) {
    return {
        url,
        method
    }
}

// ajax通用配置
export default {
    queryBlockData: conversion('blockChain/query', 'get'),
    saveSign: conversion('blockChain/upload', 'post'),
    saveDataToBlockChain: conversion('wechat/signature/generate/block', 'post'),
    getTemplate: conversion('wechat/signature/get/template', 'get'),
}

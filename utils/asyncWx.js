function getSetting() {
    return new Promise((resolve,reject) => {
        wx.getSetting({
            success: (res) =>{
                resolve(res);
            },
            fail: (err) => {
                reject(err);
            }
        })
    })
}

function chooseAddress() {
    return new Promise((resolve,reject) =>{
        wx.chooseAddress({
            success: (res) => {
                resolve(res);
            },
            fail: (err) => {
                reject(err);
            }
        })
    })
}

function openSetting() {
    return new Promise((resolve,reject) =>{
        wx.openSetting({
            success: (res) => {
                resolve(res);
            },
            fail: (err) => {
                reject(err);
            }
        })
    })
}

function showModal({content}) {
    return new Promise((resolve,reject) =>{
        wx.showModal({
            title: '提示',
            content,
            success: (res) =>{
                resolve(res);
            },
            fail: (err) =>{
                reject(err);
            }
        })
    })
}

function showToast({title}) {
    return new Promise((resolve,rj) =>{
        wx.showToast({
            title,
            icon:'none',
            mask:true
        });
          
    })
}

function login() {
    return new Promise((resolve,reject) =>{
        wx.login({
            success: (res) => {
                resolve(res);
            },
            fail: (err) => {
                reject(err);
            }
        })
    })
}

// @param {object} 支付所必要的参数
function requestPayment(param) {
    return new Promise((resolve,reject) =>{
        wx.requestPayment({
            ...param,
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err);
            }
        });
    })
}

export {getSetting,chooseAddress,openSetting,showModal,showToast,login,requestPayment};
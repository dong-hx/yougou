// pages/login/index.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},
	handleGetUserInfo(ev){
		// console.log(ev);
		const {userInfo} = ev.detail;
		wx.setStorageSync("userInfo",userInfo);
		wx.navigateBack({
			delta: 1
		});
		  
	}
})
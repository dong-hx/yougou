// pages/user/index.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		userInfo:{},
		//收藏的商品的数量
		collectedNum:0
	},
	onShow() {
		const userInfo = wx.getStorageSync("userInfo");
		const collectedNum = wx.getStorageSync("collected").length;
		this.setData({
			userInfo,
			collectedNum
		})
	}
})
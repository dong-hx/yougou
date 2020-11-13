// pages/collect/index.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		tabs:[
			{
				id:0,
				value:"商品收藏",
				isActive:true
			},
			{
				id:1,
				value:"品牌收藏",
				isActive:false
			},
			{
				id:2,
				value:"店铺收藏",
				isActive:false
			},
			{
				id:3,
				value:"浏览足迹",
				isActive:false
			}
		],
		collected:[]
	},
	onShow(){
		let collected = wx.getStorageSync("collected");
		this.setData({
			collected
		})
	},
	handleTabsItemChange(ev){
		//ev.detail是传过来的索引值
		const index = ev.detail;
		//修改原数组
		const tabs = this.data.tabs;
		tabs.forEach((item,idx) => {idx === index ? (item.isActive = true) : (item.isActive = false)});
		this.setData({
			tabs
		})
	},
})
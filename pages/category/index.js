import request from '../../request/index.js';

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		//菜单栏数据
		leftMenuList:[],
		//右边内容数据
		rightContent:[],
		//激活的菜单索引值
		currentIndex: 0,
		//滚动天的初始位置
		scrollTop:0
	},
	catesList:[],
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		const cates = wx.getStorageSync("cates");
		if(!cates){
			this.getCates();
		}else{
			if(Date.now() - cates.time > 1000*60*5){
				this.getCates();
			}else{
				this.catesList = cates.data;
				let leftMenuList = this.catesList.map(item => item.cat_name);
				let rightContent = this.catesList[0].children;
				this.setData({
					leftMenuList,
					rightContent
			});
			}
		}
		
	},
	async getCates(){
		const res = await request({url:"/categories"});
		this.catesList = res;
		wx.setStorageSync("cates", {time:Date.now(), data: this.catesList});
		let leftMenuList = this.catesList.map(item => item.cat_name);
		let rightContent = this.catesList[0].children;
		this.setData({
			leftMenuList,
			rightContent
		});
	},
	getContentList(ev){
		let currentIndex = ev.target.dataset.idx;
		let rightContent = this.catesList[currentIndex].children;
		this.setData({
			rightContent,
			currentIndex,
			// 重新设置滚动天的位置
			scrollTop:0
		});
	}
})
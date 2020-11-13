// pages/goods_list/index.js
import request from '../../request/index.js';
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		//选项卡标题
		tabs:[
			{
				id:0,
				value:"综合",
				isActive:true
			},
			{
				id:1,
				value:"销量",
				isActive:false
			},
			{
				id:2,
				value:"价格",
				isActive:false
			}
		],
		goodsList:[],
		//商品页数
		pagesCount:1
	},
	queryParams:{
		query:'',
		cid:'',
		pagenum:1,
		pagesize:10
	},
	//标题点击后，子组件触发传递过来的事件
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
	//请求数据
	async getGoodsList(){
		const res = await request({url:'/goods/search',data:this.queryParams});
		//获取商品总数
		const total = res.total;
		//计算页数
		this.pagesCount = Math.ceil(total/this.queryParams.pagesize);
		this.setData({
			goodsList: [...this.data.goodsList,...res.goods]
		});
		wx.stopPullDownRefresh();
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.queryParams.cid = options.cid||"";
		this.queryParams.query = options.query||"";
		this.getGoodsList();
	},
	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {
		if(this.queryParams.pagenum === this.pagesCount){
			wx.showToast({
				title: '没有更多数据了',
				icon:'loading'
			});
			  
		}else{
			this.queryParams.pagenum++;
			this.getGoodsList();
		}
	},
	/**
	 * 用户下拉操作
	 */
	onPullDownRefresh:function () {
		//清空页面数据
		this.setData({
		goodsList : [],
		});
		//重置当前页码
		this.queryParams.pagenum = 1;
		this.getGoodsList();
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})
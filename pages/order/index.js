import request from '../../request/index.js';
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		tabs:[
			{
				id:0,
				value:"全部订单",
				isActive:true
			},
			{
				id:1,
				value:"待付款",
				isActive:false
			},
			{
				id:2,
				value:"待收货",
				isActive:false
			},
			{
				id:3,
				value:"退款/退货",
				isActive: false
			}
		],
		orders:[]
	},
	onShow(){
		let pages = getCurrentPages();
		// console.log(pages);
		let {type} = pages[pages.length-1].options;
		let num = parseInt(type);
		this.getOrders(num);
		this.changeTitleByIndex(num - 1);

	},
	//获取订单的函数
	async getOrders(num){
    	const res = await request({
			url: "/my/orders/all",
			data: { type:num}
		})
		this.setData({
			orders: res.orders.map(item => ({...item,create_time_cn: new Date(item.create_time*1000).toLocaleString()}))	//将时间戳格式化为本地时间
		})
	},
	//改变选中状态的函数
	changeTitleByIndex(index){
		const tabs = this.data.tabs;
		tabs.forEach((item,idx) => {idx === index ? (item.isActive = true) : (item.isActive = false)});
		this.setData({
			tabs
		})
	},
	handleTabsItemChange(ev){
		//ev.detail是传过来的索引值
		const index = ev.detail;
		//修改原数组
		this.changeTitleByIndex(index);
		this.getOrders(index+1); //index和type存在index+1 = type的关系
	},

	
})
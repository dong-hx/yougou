import request from '../../request/index.js';
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		searchList:[],
		isFocus:false,
		value:""
	},
	timeId:0,
	handleSearch(ev) {
		//获取输入的值
		let {value} = ev.detail;
		//判断合法性
		if(!value.trim()) {
			this.setData({
				searchList:[],
				isFocus:false
			})
			return;
		}
		this.setData({
			isFocus:true
		})
		clearTimeout(this.timeId);
		this.timeId = setTimeout(() =>{
			this.searchInput(value)
		},1000);
		
	},
	//请求数据的函数
	async searchInput(query){
		let searchList = await request({url:"/goods/qsearch",data:{query}})
		this.setData({
			searchList
		})
	},
	handleCancel(){
		this.setData({
			value:"",
			isFocus:false,
			searchList:[]
		})
	}
})
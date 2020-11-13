import {showToast} from "../../utils/asyncWx.js"
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		tabs:[
			{
				id:0,
				value:"体验问题",
				isActive:true
			},
			{
				id:1,
				value:"商品、商家投诉",
				isActive:false
			}
		],
		//选择的图片的路径数组
		chooseImgs:[],
		//文本域内容
		textVal:""
	},
	//外网图片的路径数组
	uploadImgs:[],
	//切换选项卡
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
	//选择图片
	handleChooseImg(){
		wx.chooseImage({
			count: 9,
			sizeType: ['original', 'compressed'],
			sourceType: ['album', 'camera'],
			success: (result) => {
				this.setData({
					chooseImgs: [...this.data.chooseImgs,...result.tempFilePaths]
				})
			}
		});
		  
	},
	//删除图片
	handleRemoveImg(ev){
		const idx = ev.detail;
		let {chooseImgs} = this.data;
		chooseImgs.splice(idx,1);
		this.setData({
			chooseImgs
		})
	},
	//文本域的输入事件
	handleTextInput(e){
		this.setData({
			textVal: e.detail.value
		})
	},
	//提交按钮点击事件
	handleFromSubmit(){
		let {textVal,chooseImgs} = this.data;
		//如果没有输入或者输入不合法
		if(!textVal.trim()) {
			showToast({title:"请输入信息"});
			return;
		}
		//准备上传图片	到专门的图片服务器
		chooseImgs.forEach((item,idx) => {
			var upTask = wx.uploadFile({
				url: 'https://images.ac.cn/Home/Index/UploadAction/',
				filePath: item,
				name: "file",
				formData: {},
				success: (result) => {
					let url = JSON.parse(result.data).url;
					this.uploadImgs.push(url);
					//所有图片上传完毕
					if(idx===chooseImgs.length-1){
						console.log("把文本内容和外网的图片链接数组提交到后台中");
						this.setData({
							chooseImgs:[],
							textVal:""
						})
						wx.navigateBack({
							delta: 1
						});
						  
					}
				}
			});
		})
	}
})
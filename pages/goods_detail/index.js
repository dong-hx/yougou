import request from '../../request/index.js';
import { showToast } from '../../utils/asyncWx.js';
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		//页面数据
		goodsObj:{},
		isCollected: false
	},
	goodsInfo:{},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onShow: function () {
		let currentPages =  getCurrentPages();
		let {options} = currentPages[currentPages.length - 1]
		const {goods_id} = options;
		this.getGoodsDetail(goods_id);
	},
	//获取页面数据
	async getGoodsDetail(goods_id){
		const goodsObj = await request({url:'/goods/detail',data:{goods_id}});
		this.goodsInfo = goodsObj;		//将goodsObj赋值给全局变量，方便后续handlePreviewImg函数使用
		//判断当前商品是否被收藏
		let collected  = wx.getStorageSync("collected") || [];
		let isCollected = collected.some(item => item.goods_id === goodsObj.goods_id);
		this.setData({
			goodsObj:{
				pics: goodsObj.pics,
				goods_price: goodsObj.goods_price,
				goods_name: goodsObj.goods_name,
				goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g,'.png')
			},
			isCollected
		})
	},
	handlePreviewImg(ev){
		const current = ev.currentTarget.dataset.url;
		const urls = this.goodsInfo.pics.map( item => item.pics_sma);
		wx.previewImage({
			current,
			urls
		});
	},
	handleAddToCart(){
		const cart = wx.getStorageSync('cart') || [];
		const index = cart.findIndex(item => item.goods_id === this.goodsInfo.goods_id);
		if(index === -1) {
			this.goodsInfo.num = 1;
			this.goodsInfo.checked = false;
			cart.push(this.goodsInfo);
		}else{
			cart[index].num++;
		}
		wx.setStorageSync('cart',cart);
		wx.showToast({
			title: '添加购物车成功',
			icon: 'success',
			mask: true
		}); 
	},
	handleCollect(){
		//获取缓存中的collected对象
		let collected  = wx.getStorageSync("collected") || [];
		//判断是否存有当前页面
		let index = collected.findIndex(item => item.goods_id === this.goodsInfo.goods_id);
		//如果返回的是-1表示没有存
		if(index === -1) {
			collected.push(this.goodsInfo);
			wx.showToast({
				title: '成功收藏',
				icon: 'success'
			});
			  
		}else{
			collected.splice(index,1);
			wx.showToast({
				title: '取消收藏',
				icon: 'success'
			});
		}
		//将collected设置回缓存中
		wx.setStorageSync("collected",collected);
		//将选中状态取反
		this.setData({
			isCollected:!this.data.isCollected
		})
	}
})
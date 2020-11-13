// pages/cart/index.js
import { getSetting, chooseAddress, openSetting,showModal,showToast,requestPayment } from '../../utils/asyncWx.js';
import request from '../../request/index.js';
Page({
	data: {
		address: {},
		payCart: [],
		totalPrice: 0,
		totalNum: 0
	},
	//生命周期函数
	onShow() {
		//缓存中收货地址信息
		const address = wx.getStorageSync("address");
		//缓存中购物车信息
		let payCart = wx.getStorageSync("cart") || [];
		//过滤购物车商品
		payCart = payCart.filter(item => item.checked);
		// this.setData({ address });
		let [totalPrice, totalNum] = [0, 0];
		payCart.forEach(item => {
			totalPrice += item.goods_price * item.num;
			totalNum += item.num;
			}
		);
		this.setData({
			payCart,
			address,
			totalPrice,
			totalNum
		});
		wx.setStorageSync("payCart", payCart);
	},
	async handleOrderPay() {
		let cart = wx.getStorageSync("cart");
		cart = cart.filter(item =>!item.checked);
		wx.setStorageSync("cart",cart);
		wx.showToast({
			title: '暂时不支持支付功能~',
			icon: 'none',
			mask: true
			});
	}
})
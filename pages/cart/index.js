// pages/cart/index.js
import { getSetting, chooseAddress, openSetting,showModal,showToast } from '../../utils/asyncWx.js'
Page({
	data: {
		address: {},
		cart: [],
		isAllChecked: true,
		totalPrice: 0,
		totalNum: 0
	},
	async handleChooseAddress() {
		//获取权限状态 result.authSetting["scope.address"]
		const res = await getSetting();
		const scopeAddress = res.authSetting["scope.address"];
		//如果曾经拒绝过授权，引导用户授权获取位置权限
		if (scopeAddress === false) {
			await openSetting();
		}
		try {
			const address = await chooseAddress();
			address.completeAdd = address.provinceName + address.cityName + address.countyName + address.detailInfo;
			wx.setStorageSync("address", address);
		} catch (err) {

		}
	},
	//生命周期函数
	onShow() {
		//缓存中收货地址信息
		const address = wx.getStorageSync("address");
		//缓存中购物车信息
		const cart = wx.getStorageSync("cart") || [];
		this.setData({ address });
		this.setCart(cart);
	},
	//点击单个商品的复选框，选中或者不选中
	handleChangeChecked(ev) {
		const goods_id = ev.currentTarget.dataset.id;
		let { cart } = this.data;
		let index = cart.findIndex(item => item.goods_id === goods_id);
		cart[index].checked = !cart[index].checked;
		this.setCart(cart);
	},
	//全选或者反选
	handleItemAllChecked() {
		let { cart, isAllChecked } = this.data;
		isAllChecked = !isAllChecked;
		cart.forEach(item => item.checked = isAllChecked);
		this.setCart(cart);
	},
	//通过点击'+'和'-'改变商品数量
	async handleItemNumEdit(ev) {
		const {id,operation} = ev.currentTarget.dataset;
		let {cart} = this.data;
		const index = cart.findIndex(item => item.goods_id === id);
		if(cart[index].num === 1 && operation === -1) {
			const res = await showModal({content: '是否删除该商品？'});
			// console.log(res);
			if(res.confirm) {
				cart.splice(index,1);
				this.setCart(cart);
			}
		}else{
			cart[index].num += operation;
			this.setCart(cart);
		}
		
	},
	//结算
	async handlePay() {
		const {totalNum,address} = this.data;
		if(!address.userName) {
			await showToast({title:'您还没有添加收货地址'});
			return;
		}
		if(totalNum === 0) {
			await showToast({title: '您还没有选购商品'});
			return;
		}
		wx.navigateTo({
			url: '/pages/pay/index',
			success: (result) => {
				
			}
		});
		  
	},

	//设置data和缓存的函数
	setCart(cart) {
		let isAllChecked = true;
		let [totalPrice, totalNum] = [0, 0];
		cart.forEach(item => {
			if (item.checked) {
				totalPrice += item.goods_price * item.num;
				totalNum += item.num;
			} else {
				isAllChecked = false;
			}
		});
		isAllChecked = cart.length ? isAllChecked : false;
		this.setData({
			cart,
			isAllChecked,
			totalPrice,
			totalNum
		});
		wx.setStorageSync("cart", cart);
	}
})
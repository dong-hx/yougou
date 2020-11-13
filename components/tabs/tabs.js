// components/tabs/tabs.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		tabs:{
			type:Array,
			value:[]
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {

	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		handleItemTap(ev){
			const {index} = ev.currentTarget.dataset;
			this.triggerEvent("tabsItemChange",index);
		}
	}
})

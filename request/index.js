let ajaxTimes = 0;
function request(params){
	let header = {...params.header};
	if(params.url.includes("/my/")) {
		header["Authorization"] = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo";
	}
	ajaxTimes++;
	wx.showLoading({
		title: "加载中",
		mask: true
	});
	const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1";
	return new Promise((resolve,reject) =>{
		wx.request({
			...params,
			header:header,
			url: baseUrl + params.url,
			data: params.data,
			success: (res) => {
				resolve(res.data.message);
			},
			fail: (err) => {
				reject(err);
			},
			complete: () => {
				ajaxTimes--;
				if(ajaxTimes===0){
					wx.hideLoading();  
				}
			}
		})
	})
}

export default request;
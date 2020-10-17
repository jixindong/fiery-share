const baseURL = 'https://dyxcx.waszn.com/';
const request = data => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseURL + data.url,
			method: data.method || 'GET',
			header: {
				'Content-Type': 'application/json'
			},
			data: data.data || {},
			success: res => {
				resolve(res.data);
			},
			fail: err => {
				reject(err);
			}
		});
	});
};
export default request;

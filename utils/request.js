const baseURL = 'https://www.easy-mock.com/mock/5f82c46575729f6d58a788f4/motui/';
const request = data => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseURL + data.url,
			method: data.method || 'GET',
			data: data.data || {},
			success: res => {
				resolve(res);
			},
			fail: err => {
				reject(err);
			}
		});
	});
};
export default request;

import request from '@/utils/request';

// 用户详情
export function fetchUserDetail(data) {
	return request({
		url: 'fx/userDetail',
		method: 'POST',
		data
	});
}

// 用户协议
export function fetchUserDeal(data) {
	return request({
		url: 'fx/agree',
		method: 'POST',
		data
	});
}

// 关于我们
export function fetchAboutUs(data) {
	return request({
		url: 'fx/about',
		method: 'POST',
		data
	});
}

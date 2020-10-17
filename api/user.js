import request from '@/utils/request';

// 用户id
export function fetchUserId(data) {
	return request({
		url: 'fx/getSessionKey',
		method: 'POST',
		data
	});
}

// 上传用户信息
export function uploadUserInfo(data) {
	return request({
		url: 'fx/saveUserInfo',
		method: 'POST',
		data
	});
}

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

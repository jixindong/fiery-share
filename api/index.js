import request from '@/utils/request';

// banner
export function fetchBanner(data) {
	return request({
		url: 'fx/picture',
		method: 'POST',
		data
	});
}

// 分享列表
export function fetchShareList(data) {
	return request({
		url: 'fx/share',
		method: 'POST',
		data
	});
}

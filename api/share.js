import request from '@/utils/request';

// 分享详情
export function fetchShareDetail(data) {
	return request({
		url: 'fx/detail',
		method: 'POST',
		data
	});
}

// 分享推荐
export function fetchShareRecommend(data) {
	return request({
		url: 'fx/recommend',
		method: 'POST',
		data
	});
}

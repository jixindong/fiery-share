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

// OSS配置
export function fetchOssConfig(data) {
	return request({
		url: 'fx/oss',
		method: 'POST',
		data
	});
}

// 分享分类列表
export function fetchShareClassList(data) {
	return request({
		url: 'fx/classfiy_list',
		method: 'POST',
		data
	});
}

// 添加分享
export function addNewShare(data) {
	return request({
		url: 'fx/add',
		method: 'POST',
		data
	});
}

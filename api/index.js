import request from '@/utils/request';

// banner
export function fetchBanner(data){
	return request({
		url:'index/banner',
		method:'POST',
		data
	});
}

// 热门分享
export function fetchFieryShare(data){
	return request({
		url:'index/fieryShare',
		method:'POST',
		data
	});
}

// 最新分享
export function fetchNewShare(data){
	return request({
		url:'index/newShare',
		method:'POST',
		data
	});
}
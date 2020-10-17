<template>
	<view class="fieryShare">
		<view class="default" v-if="fieryShareList.length === 0">
			<image src="../../static/images/ikon-planet.png" mode="widthFix"></image>
			<text>暂无分享</text>
		</view>
		
		<navigator :url="'./shareDetail?id=' + item.id" class="item" v-for="(item, index) in fieryShareList" :key="index">
			<image :src="item.img" v-if="item.img"></image>
			<view class="msg">
				<view class="title">{{ item.title }}</view>
				<view class="d-flex justify-content-between">
					<view class="userMsg">
						<image :src="item.member.avatarurl || '../../static/images/avatar.png'"></image>
						<text class="text-truncate">{{ item.member.nickname }}</text>
					</view>
					<view class="readMsg">
						<image src="../../static/images/icon-fire.png" mode="widthFix"></image>
						<text>{{ item.num | readerNum }}</text>
						<text>万人围观</text>
					</view>
				</view>
			</view>
			<view class="across"></view>
		</navigator>
		<view class="my-3" v-if="fieryShareList.length !== 0"><u-loadmore :status="loadmore"/></view>
	</view>
</template>

<script>
import {fetchShareList} from '@/api/index';
export default {
	data() {
		return {
			// 分享列表
			fieryShareList: [],
			// 分享列表分页
			fieryShareListPage:{
				total: 1,
				pageSize: 10,
				totalPage: 1,
				currentPage: 1
			},
			// 搜索
			searchData:{lx:''},
			// 加载更多
			loadmore:'loadmore'
		};
	},
	methods:{
		// 设置页面title
		handlePageTitle(title){
			if(title){
				uni.setNavigationBarTitle({title:title});
			}
		},
		// 设置搜索
		handleSearchData(lx){
			this.searchData.lx = lx;
		},
		// 获取分享列表
		async getShareList(){
			let data = {
				status: '',
				page: this.fieryShareListPage.currentPage,
				limit: this.fieryShareListPage.pageSize,
				isZr: 0,
				lx:this.searchData.lx,
				userid: ''
			};
			let res = await fetchShareList(data);
			if(res.code !== 200){
				return false;
			}
			
			this.fieryShareList = [...this.fieryShareList,...res.data[0].data];
			this.handleShareListPage(res.data[0].count);// 设置分享列表分页
		},
		// 设置分享列表分页
		handleShareListPage(count){
			let total = count ? count : 1;
			this.fieryShareListPage.totalPage = Math.ceil(total / this.fieryShareListPage.pageSize);
		}
	},
	// 下拉刷新
	onPullDownRefresh() {
		this.fieryShareList = [];
		this.getShareList();// 获取分享列表
		uni.stopPullDownRefresh();
	},
	// 上拉加载更多
	onReachBottom() {
		this.loadmore = 'loading';
		if(this.fieryShareListPage.currentPage < this.fieryShareListPage.totalPage){
			this.loadmore = 'loadmore';
			this.fieryShareListPage.currentPage = this.fieryShareListPage.currentPage + 1;
			this.getShareList();// 获取分享列表
		}else{
			this.loadmore = 'nomore';
		}
	},
	onLoad(e) {
		this.handlePageTitle(e.title);// 设置页面title
		this.handleSearchData(e.lx);// 设置搜索
		this.getShareList();// 获取分享列表
	}
};
</script>

<style lang="scss" scoped>
.fieryShare{
	display: flex;
	flex-flow: column nowrap;
	min-height: 100vh;
	.item {
		position: relative;
		display: flex;
		padding: 30rpx 40rpx;
		&:nth-last-child(1) .across {
			display: none;
		}
		> image {
			margin-right: 20rpx;
			width: 160rpx;
			height: 120rpx;
			border-radius: 20rpx;
		}
		.msg {
			display: flex;
			flex-flow: column nowrap;
			justify-content: space-between;
			width: 490rpx;
			color: #999;
			font-size: 20rpx;
			.title {
				color: #333;
				font-size: 24rpx;
			}
			.userMsg {
				display: flex;
				align-items: center;
				image {
					margin-right: 10rpx;
					width: 28rpx;
					height: 28rpx;
					border-radius: 50%;
				}
				text {
					max-width: 200rpx;
				}
			}
			.readMsg {
				display: flex;
				align-items: center;
				image {
					margin-right: 6rpx;
					width: 16rpx;
				}
			}
		}
		.across {
			position: absolute;
			bottom: 0;
			left: 40rpx;
			width: 670rpx;
			height: 4rpx;
			background-color: #f2f2f2;
		}
	}
}
</style>

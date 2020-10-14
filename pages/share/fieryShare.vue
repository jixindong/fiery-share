<template>
	<view class="fieryShare">
		<navigator open-type="redirect" :url="'./shareDetail?id=' + item.id" class="item" v-for="(item, index) in fieryShareList" :key="index">
			<image :src="item.img" v-if="item.img"></image>
			<view class="msg">
				<view class="title">{{ item.title }}</view>
				<view class="d-flex justify-content-between">
					<view class="userMsg">
						<image :src="item.member.avatarurl"></image>
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
		<view class="my-3"><u-loadmore :status="loadmore"/></view>
	</view>
</template>

<script>
import {fetchShareList} from '@/api/index';
export default {
	data() {
		return {
			// 分享列表
			fieryShareList: [],
			// 搜索
			searchData:{lx:''},
			// 加载更多
			loadmore:'loadmore'
		};
	},
	filters:{
		// 围观人数
		readerNum(value) {
			if (!value) {
				return 0;
			}
		
			return (value / 10000).toFixed(1);
		}
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
				page: 1,
				limit: 10,
				isZr: 0,
				lx:this.searchData.lx,
				userid: ''
			};
			let res = await fetchShareList(data);
			if(res.code !== 200){
				return false;
			}
			
			this.fieryShareList = res.data[0].data;
		},
		// 下拉加载更多
		pullDownMore(){
			this.loadmore = 'loading';
		}
	},
	onPullDownRefresh() {
		this.getShareList();// 获取分享列表
		uni.stopPullDownRefresh();
	},
	onReachBottom() {
		
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

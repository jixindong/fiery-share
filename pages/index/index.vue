<template>
	<view class="index">
		<!-- banner -->
		<swiper class="banner" autoplay circular v-if="bannerList.length > 0">
			<swiper-item v-for="(item, index) in bannerList" :key="index"><image :src="item.path | bannerImg" mode="widthFix"></image></swiper-item>
		</swiper>

		<!-- 热门分享 -->
		<view class="fieryShare">
			<view class="hd">
				<view class="title">
					<view></view>
					<text>热门分享</text>
				</view>
				<navigator url="../share/fieryShare?lx=''">查看更多 ></navigator>
			</view>

			<view class="default" v-if="fieryShareList.length === 0">
				<image src="../../static/images/ikon-planet.png" mode="widthFix"></image>
				<text>暂无分享</text>
			</view>
			<scroll-view class="shareList" scroll-x v-else>
				<navigator :url="'../share/shareDetail?id=' + item.id" class="item" v-for="(item, index) in fieryShareList" :key="index">
					<image :src="item.img" mode="widthFix"></image>
					<view class="title">{{ item.title }}</view>
					<view class="msg">
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
				</navigator>
			</scroll-view>
		</view>

		<!-- 最新分享 -->
		<view class="newShare">
			<view class="title">
				<view></view>
				<text>最新分享</text>
			</view>

			<view class="default" v-if="newShareList.length === 0">
				<image src="../../static/images/ikon-planet.png" mode="widthFix"></image>
				<text>暂无分享</text>
			</view>
			<template v-else>
				<view class="item" v-for="(item, index) in newShareList" :key="index">
					<navigator :url="'../user/userHome?userid=' + item.member.id" class="userMsg">
						<image :src="item.member.avatarurl || '../../static/images/avatar.png'"></image>
						<view>
							<view class="userName">{{ item.member.nickname }}</view>
							<view>{{ item.create_time | shareTime }}</view>
						</view>
					</navigator>
					<navigator :url="'../share/fieryShare?lx=' + item.classfiy.id + '&title=' + item.classfiy.name" class="classify">#{{ item.classfiy.name }}#</navigator>
					<navigator :url="'../share/shareDetail?id=' + item.id" class="content">
						<view class="title">{{ item.title }}</view>
						<view class="accessory">
							<image src="../../static/images/icon-video.png" mode="widthFix" v-if="item.fileLx === 'video'"></image>
							<image src="../../static/images/icon-img.png" mode="widthFix" v-else></image>
							<text>{{ item.fileName }}</text>
						</view>
						<view class="readMsg">
							<image src="../../static/images/icon-fire.png" mode="widthFix"></image>
							<text>{{ item.num | readerNum }}万人围观</text>
						</view>
					</navigator>
				</view>
			</template>
		</view>

		<!-- 导航栏 -->
		<view class="tabBar">
			<view class="item active">
				<image src="../../static/images/icon-home-active.png" mode="widthFix"></image>
				<text>首页</text>
			</view>
			<view class="item share" @click="navigateToShare"><image src="../../static/images/icon-plus.png"></image></view>
			<view class="item" @click="redirectToUser">
				<image src="../../static/images/icon-user.png" mode="widthFix"></image>
				<text>我的</text>
			</view>
		</view>
	</view>
</template>

<script>
import * as indexApi from '@/api/index';
export default {
	data() {
		return {
			// banner
			bannerList: [],
			// 最热分享
			fieryShareList: [],
			// 最新分享
			newShareList: []
		};
	},
	methods: {
		// 获取banner
		async fetchBanner() {
			let res = await indexApi.fetchBanner();
			if (res.code !== 200) {
				return false;
			}
			this.bannerList = res.data;
		},
		// 获取最热分享
		async fetchFieryShare() {
			let data = {
				status: 1,
				page: 1,
				limit: 10,
				isZr: 1,
				lx: '',
				userid: ''
			};
			let res = await indexApi.fetchShareList(data);
			if (res.code !== 200) {
				return false;
			}
			this.fieryShareList = res.data[0].data;
		},
		// 获取最新分享
		async fetchNewShare() {
			let data = {
				status: 1,
				page: 1,
				limit: 10,
				isZr: 0,
				lx: '',
				userid: ''
			};
			let res = await indexApi.fetchShareList(data);
			if (res.code !== 200) {
				return false;
			}
			this.newShareList = res.data[0].data;
		},
		// 跳转分享页
		navigateToShare(){
			uni.navigateTo({url:'../share/share'});
		},
		// 跳转用户页
		redirectToUser(){
			uni.redirectTo({url:'../user/user'});
		}
	},
	onReady() {
		this.fetchBanner(); // 获取banner
		this.fetchFieryShare(); // 获取最热分享
		this.fetchNewShare(); // 获取最新分享
	}
};
</script>

<style lang="scss" scoped>
.index {
	padding-bottom: 160rpx;
	min-height: 100vh;
	background-color: #fafafa;
	// banner
	.banner {
		width: 750rpx;
		height: 352rpx;
		image {
			width: 750rpx;
		}
	}
	// 热门分享
	.fieryShare {
		display: flex;
		flex-flow: column nowrap;
		margin: 40rpx auto;
		padding: 20rpx 0 0 20rpx;
		width: 690rpx;
		min-height: 600rpx;
		background-color: #fff;
		border-radius: 10rpx;
		.hd {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-right: 10rpx;
			color: #999;
			font-size: 24rpx;
			.title {
				display: flex;
				align-items: center;
				color: #333;
				font-size: 32rpx;
				view {
					margin-right: 12rpx;
					width: 6rpx;
					height: 36rpx;
					background-color: #0094ff;
				}
			}
		}
		.shareList {
			white-space: nowrap;
			.item {
				display: inline-block;
				margin: 30rpx 26rpx 30rpx 4rpx;
				width: 480rpx;
				overflow: hidden;
				border-radius: 20rpx;
				box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.2);
				> image {
					width: 100%;
					height: 320rpx;
				}
				.title {
					padding: 20rpx;
					min-height: 150rpx;
					color: #333;
					font-size: 28rpx;
					white-space: normal;
				}
				.msg {
					display: flex;
					justify-content: space-between;
					padding: 10rpx;
					color: #999;
					font-size: 20rpx;
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
			}
		}
	}
	// 最新分享
	.newShare {
		display: flex;
		flex-flow: column nowrap;
		min-height: 600rpx;
		> .title {
			display: flex;
			align-items: center;
			padding: 30rpx;
			color: #333;
			font-size: 32rpx;
			background-color: #fff;
			view {
				margin-right: 12rpx;
				width: 6rpx;
				height: 36rpx;
				background-color: #0094ff;
			}
		}
		.item {
			margin-bottom: 20rpx;
			background-color: #fff;
			box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
			.userMsg {
				display: flex;
				align-items: center;
				padding: 40rpx 0 20rpx 40rpx;
				color: #999;
				font-size: 20rpx;
				image {
					margin-right: 20rpx;
					width: 90rpx;
					height: 90rpx;
					border-radius: 50%;
				}
				.userName {
					margin-bottom: 10rpx;
					color: #333;
					font-size: 28rpx;
					font-weight: 600;
				}
			}
			.classify {
				display: inline-block;
				margin-left: 40rpx;
				color: #0094ff;
				font-size: 28rpx;
			}
			.content {
				padding-left: 40rpx;
				.title {
					padding-top: 20rpx;
				}
				.accessory {
					display: flex;
					align-items: center;
					margin: 20rpx 0;
					image {
						margin-right: 12rpx;
						width: 28rpx;
					}
				}
				.readMsg {
					display: flex;
					align-items: center;
					padding-bottom: 20rpx;
					color: #999;
					font-size: 24rpx;
					image {
						margin-right: 8rpx;
						width: 22rpx;
					}
				}
			}
		}
	}
}
</style>

<template>
	<view class="user">
		<!-- 用户信息 -->
		<view class="userMsg">
			<image :src="userMsg.avatarurl || '../../static/images/avatar.png'" mode="widthFix" class="avatarBgi"></image>
			<view class="msg">
				<image :src="userMsg.avatarurl || '../../static/images/avatar.png'" class="avatar" @click="navigateToUserHome"></image>
				<text>{{ userMsg.nickname || '用户昵称' }}</text>
				<view class="shareLevel">
					<image src="../../static/images/icon-medal.png" mode="widthFix"></image>
					<text>{{ userMsg.msg || '初级分享' }}</text>
				</view>
			</view>
		</view>

		<!-- 功能列表 -->
		<view class="functionList">
			<navigator :url="'./userShare?userid=' + userid" class="item">
				<image src="../../static/images/icon-share.png" mode="widthFix"></image>
				<text>我的分享</text>
				<image src="../../static/images/icon-arrow-right.png" mode="widthFix" class="arrow"></image>
			</navigator>
			<navigator url="./userDeal" class="item">
				<image src="../../static/images/icon-deal.png" mode="widthFix"></image>
				<text>用户协议</text>
				<image src="../../static/images/icon-arrow-right.png" mode="widthFix" class="arrow"></image>
			</navigator>
			<navigator url="../aboutUs/aboutUs" class="item">
				<image src="../../static/images/icon-i.png" mode="widthFix"></image>
				<text>关于我们</text>
				<image src="../../static/images/icon-arrow-right.png" mode="widthFix" class="arrow"></image>
			</navigator>
		</view>

		<!-- 导航栏 -->
		<view class="tabBar">
			<navigator url="../index/index" class="item">
				<image src="../../static/images/icon-home.png" mode="widthFix"></image>
				<text>首页</text>
			</navigator>
			<navigator url="../share/share" class="item share"><image src="../../static/images/icon-plus.png"></image></navigator>
			<view class="item active">
				<image src="../../static/images/icon-user-active.png" mode="widthFix"></image>
				<text>我的</text>
			</view>
		</view>
	</view>
</template>

<script>
import { fetchUserDetail } from '@/api/user';
export default {
	data() {
		return {
			// 用户id
			userid: 1,
			// 用户信息
			userMsg: ''
		};
	},
	methods: {
		// 获取用户详情
		async getUserDetail() {
			let res = await fetchUserDetail({ userid: this.userid });
			if (res.code !== 200) {
				return false;
			}

			this.userMsg = res.data[0];
		},
		// 跳转用户主页
		navigateToUserHome() {
			uni.navigateTo({
				url: `./userHome?userid=${this.userid}`
			});
		}
	},
	onReady() {
		this.getUserDetail(); // 获取用户详情
	}
};
</script>

<style lang="scss" scoped>
.user {
	padding-bottom: 160rpx;
	min-height: 100vh;
	background-color: #fafafa;
	/* 用户信息 */
	.userMsg {
		position: relative;
		height: 580rpx;
		overflow: hidden;
		.avatarBgi {
			width: 750rpx;
			filter: blur(6rpx);
			transform: translateY(-84rpx);
		}
		.msg {
			position: absolute;
			top: 0;
			left: 0;
			display: flex;
			flex-flow: column nowrap;
			justify-content: center;
			align-items: center;
			width: 750rpx;
			height: 580rpx;
			color: #fff;
			font-size: 24rpx;
			background-color: rgba(0, 0, 0, 0.5);
			.avatar {
				margin-bottom: 30rpx;
				width: 240rpx;
				height: 240rpx;
				border: 30rpx solid transparent;
				border-radius: 50%;
				box-shadow: 0 0 4rpx #fff;
			}
			.shareLevel {
				display: flex;
				align-items: center;
				margin-top: 20rpx;
				color: #ffb830;
				image {
					margin-right: 10rpx;
					width: 28rpx;
				}
			}
		}
	}
	/* 功能列表 */
	.functionList {
		position: relative;
		top: -30rpx;
		padding-top: 50rpx;
		background-color: #fafafa;
		border-radius: 20rpx 20rpx 0 0;
		.item {
			display: flex;
			align-items: center;
			padding: 30rpx 40rpx;
			color: #333;
			font-size: 32rpx;
			image {
				margin-right: 30rpx;
				width: 34rpx;
			}
			.arrow {
				margin-left: auto;
				width: 12rpx;
			}
		}
	}
}
</style>

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
			<navigator :url="'./userShare?userid=' + userid" class="item" v-if="userid">
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

		<!-- 授权登录 -->
		<view class="loginBtn" v-if="!userid"><u-button type="primary" size="medium" ripple @click="userAccredit">授权登录</u-button></view>

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
import * as userApi from '@/api/user';
export default {
	data() {
		return {
			// 用户id
			userid: '',
			// 用户信息
			userMsg: '',
			userInfo: ''
		};
	},
	methods: {
		// 判断用户是否授权
		judgeUserAccredit() {
			let userid = uni.getStorageSync('userid');
			if (!userid) {
				return uni.showToast({
					title: '请先授权',
					icon: 'none'
				});
			}

			this.userid = userid;
			this.getUserDetail(); // 获取用户详情
		},
		// 获取用户详情
		async getUserDetail() {
			let res = await userApi.fetchUserDetail({ userid: this.userid });
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
		},
		// 授权登录
		userAccredit() {
			// #ifdef MP-TOUTIAO
			uni.getUserInfo({
				provider: 'toutiao',
				success: res => {
					this.userInfo = res.userInfo;
					this.fetchUserId(); // 获取用户id
				}
			});
			// #endif
		},
		// 获取用户id
		async fetchUserId() {
			let data = {
				jsCode: uni.getStorageSync('code'),
				appCode: '1',
				channelId: '9'
			};
			let res = await userApi.fetchUserId(data);
			if (res.code !== 200) {
				return false;
			}

			uni.setStorageSync('userid', res.data);
			this.userid = res.data;
			this.uploadUserInfo(); // 上传用户信息
		},
		// 上传用户信息
		async uploadUserInfo() {
			let data = {
				appCode: '1',
				channelId: '9',
				sessionKey: uni.getStorageSync('code'),
				userId: this.userid,
				userInfo: this.userInfo
			};
			let res = await userApi.uploadUserInfo(data);
			if (res.code !== 200) {
				return uni.showToast({
					title: res.msg,
					icon: 'none'
				});
			}

			uni.showToast({
				title: '授权成功',
				icon: 'success'
			});
			this.getUserDetail(); // 获取用户详情
		}
	},
	onReady() {
		this.judgeUserAccredit(); // 判断用户是否授权
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
	/* 登录 */
	.loginBtn {
		margin: 100rpx 0 40rpx;
		text-align: center;
	}
}
</style>

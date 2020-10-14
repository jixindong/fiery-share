<template>
	<view class="userHome">
		<!-- 用户信息 -->
		<view class="userMsg">
			<image src="https://s1.ax1x.com/2020/10/12/02rrX4.jpg" mode="widthFix" class="avatarBgi"></image>
			<view class="msg">
				<image src="https://s1.ax1x.com/2020/10/12/02rrX4.jpg" class="avatar" @click="navigateToUserHome"></image>
				<text>爱美妆的木子萌</text>
			</view>
		</view>

		<!-- 分享列表 -->
		<view class="shareList">
			<view class="item" v-for="(item, index) in userShareList" :key="index">
				<view class="userMsg">
					<image :src="item.userAvatar"></image>
					<view>
						<view class="userName">{{ item.userName }}</view>
						<view>{{ item.createTime }}</view>
					</view>
				</view>
				<navigator url="../share/fieryShare" class="classify">#生活小常识#</navigator>
				<navigator url="../share/shareDetail" class="content">
					<view class="title">{{ item.title }}</view>
					<view class="accessory">
						<image src="../../static/images/icon-pdf.png" mode="widthFix"></image>
						<text>{{ item.accessoryName }}.{{ item.accessoryType }}</text>
					</view>
					<view class="readMsg">
						<image src="../../static/images/icon-fire.png" mode="widthFix"></image>
						<text>{{ item.num }}万人围观</text>
					</view>
				</navigator>
				<view class="across"></view>
			</view>
		</view>
	</view>
</template>

<script>
import * as userApi from '@/api/user';
export default {
	data() {
		return {
			// 用户分享列表
			userShareList: []
		};
	},
	methods:{
		// 获取用户详情
		async fetchUserDetail(userid){
			let res = await userApi.fetchUserDetail({userid:userid});
			if(res.code !== 200){
				return false;
			}
			
			this.userShareList = res.data;
		}
	},
	onLoad(e) {
		this.fetchUserDetail(e.userid);// 获取用户详情
	}
};
</script>

<style lang="scss" scoped>
.userHome {
	/* 用户信息 */
	> .userMsg {
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
		}
	}
	/* 分享列表 */
	.shareList {
		position: relative;
		top: -30rpx;
		padding-top: 20rpx;
		background-color: #fff;
		border-radius: 20rpx 20rpx 0 0;
		.item {
			&:nth-last-child(1) .across {
				display: none;
			}
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
			.across {
				margin: 0 auto;
				width: 670rpx;
				height: 4rpx;
				background-color: #f7f7f7;
			}
		}
	}
}
</style>

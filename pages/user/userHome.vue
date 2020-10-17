<template>
	<view class="userHome">
		<!-- 用户信息 -->
		<view class="userMsg">
			<image :src="userMsg.avatarurl || '../../static/images/avatar.png'" mode="widthFix" class="avatarBgi"></image>
			<view class="msg">
				<image :src="userMsg.avatarurl || '../../static/images/avatar.png'" class="avatar"></image>
				<text>{{ userMsg.nickname || '用户昵称' }}</text>
			</view>
		</view>

		<!-- 分享列表 -->
		<view class="shareList">
			<view class="default" v-if="userShareList.length === 0">
				<image src="../../static/images/ikon-planet.png" mode="widthFix"></image>
				<text>暂无分享</text>
			</view>
			<view class="item" v-for="(item, index) in userShareList" :key="index">
				<view class="userMsg">
					<image :src="item.member.avatarurl || '../../static/images/avatar.png'"></image>
					<view>
						<view class="userName">{{ item.member.nickname }}</view>
						<view>{{ item.create_time | shareTime }}</view>
					</view>
				</view>
				<navigator :url="'../share/fieryShare?userid=' + item.member.id" class="classify">#{{ item.classfiy.name }}#</navigator>
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
				<view class="across"></view>
			</view>
			<view class="my-3" v-if="userShareList.length > 10"><u-loadmore :status="loadmore" /></view>
		</view>
	</view>
</template>

<script>
import { fetchShareList } from '@/api/index';
import { fetchUserDetail } from '@/api/user';
export default {
	data() {
		return {
			// 用户id
			userid: '',
			// 用户信息
			userMsg: '',
			// 用户分享列表
			userShareList: [],
			// 用户分享列表分页
			userShareListPage: {
				total: 1,
				pageSize: 10,
				totalPage: 1,
				currentPage: 1
			},
			// 加载更多
			loadmore: 'loadmore'
		};
	},
	methods: {
		// 设置用户id
		handleUserId(userid) {
			if (userid) {
				this.userid = userid;
			}
		},
		// 获取用户详情
		async getUserDetail() {
			let res = await fetchUserDetail({ userid: this.userid });
			if (res.code !== 200) {
				return false;
			}

			this.userMsg = res.data[0];
			uni.setNavigationBarTitle({title:res.data[0].nickname});
		},
		// 获取用户分享列表
		async getShareList() {
			let data = {
				status: '',
				page: this.userShareListPage.currentPage,
				limit: this.userShareListPage.pageSize,
				isZr: 0,
				lx: '',
				userid: this.userid
			};
			let res = await fetchShareList(data);
			if (res.code !== 200) {
				return false;
			}

			this.userShareList = [...this.userShareList, ...res.data[0].data];
			this.handleShareListPage(res.data[0].count); // 设置用户分享列表分页
		},
		// 设置用户分享列表分页
		handleShareListPage(count) {
			let total = count ? count : 1;
			this.userShareListPage.totalPage = Math.ceil(total / this.userShareListPage.pageSize);
		}
	},
	// 下拉刷新
	onPullDownRefresh() {
		this.userShareList = [];
		this.getShareList(); // 获取用户分享列表
		uni.stopPullDownRefresh();
	},
	// 上拉加载更多
	onReachBottom() {
		this.loadmore = 'loading';
		if (this.userShareListPage.currentPage < this.userShareListPage.totalPage) {
			this.loadmore = 'loadmore';
			this.userShareListPage.currentPage = this.userShareListPage.currentPage + 1;
			this.getShareList(); // 获取用户分享列表
		} else {
			this.loadmore = 'nomore';
		}
	},
	onLoad(e) {
		this.handleUserId(e.userid); // 设置用户id
		this.getUserDetail(); // 获取用户详情
		this.getShareList(); // 获取用户分享列表
	}
};
</script>

<style lang="scss" scoped>
.userHome {
	// 用户信息
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
	// 分享列表
	.shareList {
		position: relative;
		top: -20rpx;
		display: flex;
		flex-flow: column nowrap;
		padding-top: 20rpx;
		min-height: 660rpx;
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

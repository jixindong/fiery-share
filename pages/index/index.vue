<template>
	<view class="index">
		<!-- banner -->
		<swiper class="banner" autoplay circular>
			<swiper-item v-for="(item, index) in bannerList" :key="index"><image :src="item" mode="widthFix"></image></swiper-item>
		</swiper>

		<!-- 热门分享 -->
		<view class="fieryShare">
			<view class="hd">
				<view class="title">
					<view></view>
					<text>热门分享</text>
				</view>
				<navigator url="../share/fieryShare">查看更多 ></navigator>
			</view>

			<scroll-view class="shareList" scroll-x>
				<navigator url="../share/shareDetail" class="item" v-for="(item, index) in fieryShareList" :key="index">
					<image :src="item.poster" mode="widthFix"></image>
					<view class="title">{{ item.title }}</view>
					<view class="msg">
						<view class="userMsg">
							<image :src="item.userAvatar"></image>
							<text class="text-truncate">{{ item.userName }}</text>
						</view>
						<view class="readMsg">
							<image src="../../static/images/icon-fire.png" mode="widthFix"></image>
							<text>{{ item.num }}</text>
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

			<view class="item" v-for="(item, index) in newShareList" :key="index">
				<navigator url="../user/userHome" class="userMsg">
					<image :src="item.userAvatar"></image>
					<view>
						<view class="userName">{{ item.userName }}</view>
						<view>{{ item.createTime }}</view>
					</view>
				</navigator>
				<navigator url="../liveSense/liveSense" class="classify">#生活小常识#</navigator>
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
			</view>
		</view>

		<!-- 导航栏 -->
		<view class="tabBar">
			<view class="item active">
				<image src="../../static/images/icon-home-active.png" mode="widthFix"></image>
				<text>首页</text>
			</view>
			<navigator url="../share/share" class="item share"><image src="../../static/images/icon-plus.png"></image></navigator>
			<navigator url="../user/user" class="item">
				<image src="../../static/images/icon-user.png" mode="widthFix"></image>
				<text>我的</text>
			</navigator>
		</view>
	</view>
</template>

<script>
import * as indexApi from '@/api/index';
export default {
	data() {
		return {
			// banner
			bannerList: ['https://s1.ax1x.com/2020/10/12/021ymF.png', 'https://s1.ax1x.com/2020/10/12/021ymF.png'],
			// 最热分享
			fieryShareList: [
				{
					id: 1,
					poster: 'https://s1.ax1x.com/2020/10/12/023Tg0.jpg',
					title: '李白一斗诗百篇，长安市上酒家眠。天子呼来不上船，自称臣是酒中仙。',
					userAvatar: 'https://s1.ax1x.com/2020/10/11/0cxpxU.jpg',
					userName: '法外狂徒张三',
					num: 66.66
				},
				{
					id: 2,
					poster: 'https://s1.ax1x.com/2020/10/12/023Tg0.jpg',
					title: '李白一斗诗百篇，长安市上酒家眠。天子呼来不上船，自称臣是酒中仙。',
					userAvatar: 'https://s1.ax1x.com/2020/10/11/0cxpxU.jpg',
					userName: '爱美妆的木子萌爱美妆的木子萌',
					num: 23.33
				},
				{
					id: 3,
					poster: 'https://s1.ax1x.com/2020/10/12/023Tg0.jpg',
					title: '李白一斗诗百篇，长安市上酒家眠。天子呼来不上船，自称臣是酒中仙。',
					userAvatar: 'https://s1.ax1x.com/2020/10/11/0cxpxU.jpg',
					userName: '法外狂徒张三',
					num: 88.88
				}
			],
			// 最新分享
			newShareList: [
				{
					id: 1,
					userAvatar: 'https://s1.ax1x.com/2020/10/11/0cxdsg.jpg',
					userName: '杜甫',
					title: '《饮中八仙歌》',
					accessoryName: '饮中八仙歌',
					accessoryLink: 'https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf',
					accessoryType: 'pdf',
					createTime: '2020-10-09 12:30',
					num: 66.66
				},
				{
					id: 2,
					userAvatar: 'https://s1.ax1x.com/2020/10/11/0cxdsg.jpg',
					userName: '啦啦',
					title: '《饮中八仙歌》',
					accessoryName: '饮中八仙歌',
					accessoryLink: 'https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf',
					accessoryType: 'pdf',
					createTime: '2020-10-09 12:30',
					num: 66.66
				},
				{
					id: 3,
					userAvatar: 'https://s1.ax1x.com/2020/10/11/0cxdsg.jpg',
					userName: '张三',
					title: '《饮中八仙歌》',
					accessoryName: '饮中八仙歌',
					accessoryLink: 'https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf',
					accessoryType: 'pdf',
					createTime: '2020-10-09 12:30',
					num: 66.66
				}
			]
		};
	},
	methods: {
		// 获取banner
		fetchBanner() {
			indexApi
				.fetchBanner()
				.then(res => {
					this.bannerList = res.data.list;
				})
				.catch(() => {});
		},
		// 获取最热分享
		fetchFieryShare() {
			indexApi
				.fetchFieryShare()
				.then(res => {
					this.fieryShareList = res.data.list;
				})
				.catch(() => {});
		},
		// 获取最新分享
		fetchNewShare() {
			indexApi
				.fetchNewShare()
				.then(res => {
					this.newShareList = res.data.list;
				})
				.catch(() => {});
		}
	},
	onShow() {
		// this.fetchBanner(); // 获取banner
		// this.fetchFieryShare(); // 获取最热分享
		// this.fetchNewShare(); // 获取最新分享
	}
};
</script>

<style lang="scss" scoped>
.index {
	padding-bottom: 160rpx;
	min-height: 100vh;
	background-color: #fafafa;
	/* banner */
	.banner {
		width: 750rpx;
		height: 352rpx;
		image {
			width: 750rpx;
		}
	}
	/* 热门分享 */
	.fieryShare {
		margin: 40rpx auto;
		padding: 20rpx 0 0 20rpx;
		width: 690rpx;
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
	/* 最新分享 */
	.newShare {
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

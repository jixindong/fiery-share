<template>
	<view class="shareDetail">
		<!-- 分享详情 -->
		<view class="detail">
			<image :src="shareDetail.poster" mode="widthFix"></image>
			<view class="title">{{ shareDetail.title }}</view>
			<view class="d-flex justify-content-between">
				<view class="userMsg">
					<image :src="shareDetail.userAvatar"></image>
					<text class="text-truncate">{{ shareDetail.userName }}</text>
				</view>
				<view class="readMsg">
					<image src="../../static/images/icon-fire.png" mode="widthFix"></image>
					<text>{{ shareDetail.num }}</text>
					<text>万人围观</text>
				</view>
			</view>
			<view class="content">{{ shareDetail.content }}</view>
			<view class="accessory">
				<image src="../../static/images/icon-pdf.png" mode="widthFix"></image>
				<text>{{ shareDetail.accessoryName }}.{{ shareDetail.accessoryType }}</text>
				<view class="text-primary">下载</view>
			</view>
		</view>

		<!-- 推荐列表 -->
		<view class="recommendList">
			<view class="title">
				<view></view>
				<text>为你推荐</text>
			</view>

			<view class="item" v-for="(item, index) in recommendList" :key="index">
				<image :src="item.poster"></image>
				<view class="msg">
					<view class="title">{{ item.title }}</view>
					<view class="d-flex justify-content-between">
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
				</view>
				<view class="across"></view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 分享详情
			shareDetail: {
				poster: 'https://s1.ax1x.com/2020/10/12/023Tg0.jpg',
				title: '李白一斗诗百篇，长安市上酒家眠。天子呼来不上船，自称臣是酒中仙。',
				content: '李白一斗诗百篇，长安市上酒家眠。天子呼来不上船，自称臣是酒中仙。李白一斗诗百篇，长安市上酒家眠。天子呼来不上船，自称臣是酒中仙。',
				accessoryName: '饮中八仙歌',
				accessoryLink: 'https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf',
				accessoryType: 'pdf',
				userAvatar: 'https://s1.ax1x.com/2020/10/11/0cxpxU.jpg',
				userName: '法外狂徒张三',
				num: 66.66
			},
			// 推荐列表
			recommendList: [
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
			]
		};
	}
};
</script>

<style lang="scss" scoped>
.shareDetail {
	/* 分享详情 */
	.detail {
		padding: 20rpx 40rpx;
		color: #999;
		font-size: 20rpx;
		> image {
			width: 670rpx;
			border-radius: 4rpx;
			box-shadow: 0 0 4rpx rgba(0, 0, 0, 0.2);
		}
		.title {
			margin: 20rpx 0;
			color: #333;
			font-size: 32rpx;
		}
		.userMsg {
			display: flex;
			align-items: center;
			image {
				margin-right: 10rpx;
				width: 40rpx;
				height: 40rpx;
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
		.content {
			margin-top: 20rpx;
			color: #666;
			font-size: 24rpx;
		}
		.accessory {
			display: flex;
			align-items: center;
			margin: 40rpx 0;
			padding: 20rpx;
			color: #333;
			font-size: 28rpx;
			background-color: #fafafa;
			> image {
				margin-right: 20rpx;
				width: 50rpx;
			}
			> view {
				margin-left: auto;
			}
		}
	}
	/* 推荐列表 */
	.recommendList {
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
}
</style>

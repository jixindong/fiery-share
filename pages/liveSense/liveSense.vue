<template>
	<view class="liveSense">
		<navigator url="./liveSenseDetail" class="item" v-for="(item, index) in liveSenseList" :key="index">
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
		</navigator>
	</view>
</template>

<script>
export default {
	data() {
		return {
			liveSenseList: [
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
.liveSense .item {
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
</style>

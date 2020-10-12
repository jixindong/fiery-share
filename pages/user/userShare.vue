<template>
	<view class="userShare">
		<u-tabs-swiper ref="uTabs" :list="tabTitleList" :current="current" @change="tabsChange" :is-scroll="false" active-color="#348BF6" swiperWidth="750"></u-tabs-swiper>
		<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish" circular>
			<swiper-item class="swiper-item" v-for="(item, index) in tabTitleList" :key="index">
				<scroll-view class="content" scroll-y @scrolltolower="onreachBottom">
					<!-- 审核中 -->
					<template v-if="index === 0">
						<view class="item" v-for="(v, i) in shareCheckList" :key="i">
							<image :src="v.poster"></image>
							<view class="title">{{ v.title }}</view>
							<view class="checkSign check">审核中</view>
							<view class="across"></view>
						</view>
					</template>

					<!-- 审核成功 -->
					<template v-if="index === 1">
						<navigator class="item" url="../share/shareDetail" v-for="(v, i) in shareSuccessList" :key="i">
							<image :src="v.poster"></image>
							<view class="title">{{ v.title }}</view>
							<view class="checkSign success">审核成功</view>
							<view class="across"></view>
						</navigator>
					</template>

					<!-- 审核失败 -->
					<template v-if="index === 2">
						<view class="item" v-for="(v, i) in shareFailedList" :key="i">
							<image :src="v.poster"></image>
							<view class="title">
								<view>{{ v.title }}</view>
								<view class="text-danger">失败原因</view>
							</view>
							<view class="checkSign failed">审核失败</view>
							<view class="across"></view>
						</view>
					</template>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
export default {
	data() {
		return {
			/* ======================== tabsSwiper 全屏选项卡 ======================== */
			// tabs标题
			tabTitleList: [{ name: '审核中' }, { name: '审核成功' }, { name: '审核失败' }],
			// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
			// tabs组件的current值，表示当前活动的tab选项
			current: 0,
			// swiper组件的current值，表示当前那个swiper-item是活动的
			swiperCurrent: 0,
			/* ======================== 分享列表 ======================== */
			// 审核中
			shareCheckList: [
				{
					id: 1,
					title: '饭后应该怎样去除口腔蒜味 让你免除口臭的尴尬',
					poster: 'https://s1.ax1x.com/2020/10/12/023Tg0.jpg'
				},
				{
					id: 2,
					title: '饭后应该怎样去除口腔蒜味 让你免除口臭的尴尬',
					poster: 'https://s1.ax1x.com/2020/10/12/023Tg0.jpg'
				},
				{
					id: 3,
					title: '饭后应该怎样去除口腔蒜味 让你免除口臭的尴尬',
					poster: 'https://s1.ax1x.com/2020/10/12/023Tg0.jpg'
				}
			],
			// 审核成功
			shareSuccessList: [
				{
					id: 1,
					title: '饭后应该怎样去除口腔蒜味 让你免除口臭的尴尬',
					poster: 'https://s1.ax1x.com/2020/10/12/023Tg0.jpg'
				},
				{
					id: 2,
					title: '饭后应该怎样去除口腔蒜味 让你免除口臭的尴尬',
					poster: 'https://s1.ax1x.com/2020/10/12/023Tg0.jpg'
				},
				{
					id: 3,
					title: '饭后应该怎样去除口腔蒜味 让你免除口臭的尴尬',
					poster: 'https://s1.ax1x.com/2020/10/12/023Tg0.jpg'
				}
			],
			// 审核失败
			shareFailedList: [
				{
					id: 1,
					title: '饭后应该怎样去除口腔蒜味 让你免除口臭的尴尬',
					poster: 'https://s1.ax1x.com/2020/10/12/023Tg0.jpg'
				},
				{
					id: 2,
					title: '饭后应该怎样去除口腔蒜味 让你免除口臭的尴尬',
					poster: 'https://s1.ax1x.com/2020/10/12/023Tg0.jpg'
				},
				{
					id: 3,
					title: '饭后应该怎样去除口腔蒜味 让你免除口臭的尴尬',
					poster: 'https://s1.ax1x.com/2020/10/12/023Tg0.jpg'
				}
			]
		};
	},
	methods: {
		/* ======================== tabsSwiper 全屏选项卡 ======================== */
		// tabs通知swiper切换
		tabsChange(index) {
			this.swiperCurrent = index;
		},
		// swiper-item左右移动，通知tabs的滑块跟随移动
		transition(e) {
			let dx = e.detail.dx;
			this.$refs.uTabs.setDx(dx);
		},
		// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
		// swiper滑动结束，分别设置tabs和swiper的状态
		animationfinish(e) {
			let current = e.detail.current;
			this.$refs.uTabs.setFinishCurrent(current);
			this.swiperCurrent = current;
			this.current = current;
		},
		// scroll-view到底部加载更多
		onreachBottom() {}
	}
};
</script>

<style lang="scss" scoped>
.userShare {
	display: flex;
	flex-flow: column nowrap;
	height: 100%;
	swiper {
		flex: 1;
		.content {
			height: 100%;
			.item {
				position: relative;
				display: flex;
				align-items: center;
				padding: 28rpx 40rpx;
				color: #333;
				font-size: 24rpx;
				&:nth-last-child(1) .across {
					display: none;
				}
				image {
					width: 160rpx;
					height: 120rpx;
					border-radius: 10rpx;
				}
				.title {
					padding: 0 40rpx 0 20rpx;
				}
				.checkSign {
					width: 128rpx;
					&.check {
						color: #ffab09;
					}
					&.success {
						color: #10d216;
					}
					&.failed {
						color: #ea4159;
					}
				}
				.across {
					position: absolute;
					bottom: 0;
					left: 40rpx;
					width: 670rpx;
					height: 2rpx;
					background-color: #f2f2f2;
				}
			}
		}
	}
}
</style>

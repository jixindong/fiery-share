<template>
	<view class="userShare">
		<u-tabs-swiper ref="uTabs" :list="tabTitleList" :current="current" @change="tabsChange" :is-scroll="false" active-color="#348BF6" swiperWidth="750"></u-tabs-swiper>
		<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish" circular>
			<swiper-item class="swiper-item" v-for="(item, index) in tabTitleList" :key="index">
				<scroll-view class="content" scroll-y @scrolltolower="onreachBottom(index)">
					<!-- 审核中 -->
					<template v-if="index === 0">
						<view class="default" v-if="shareCheckList.length === 0">
							<image src="../../static/images/ikon-planet.png" mode="widthFix"></image>
							<text>暂无分享</text>
						</view>
						<view class="item" v-for="(v, i) in shareCheckList" :key="i">
							<image :src="v.img" v-if="v.img"></image>
							<view class="title">{{ v.title }}</view>
							<view class="checkSign check">审核中</view>
							<view class="across"></view>
						</view>
						<view class="my-3" v-if="shareCheckList.length >= 10"><u-loadmore :status="checkListLoadmore" /></view>
					</template>

					<!-- 审核成功 -->
					<template v-if="index === 1">
						<view class="default" v-if="shareSuccessList.length === 0">
							<image src="../../static/images/ikon-planet.png" mode="widthFix"></image>
							<text>暂无分享</text>
						</view>
						<navigator :url="'../share/shareDetail?id=' + v.id" class="item" v-for="(v, i) in shareSuccessList" :key="i">
							<image :src="v.img" v-if="v.img"></image>
							<view class="title">{{ v.title }}</view>
							<view class="checkSign success">审核成功</view>
							<view class="across"></view>
						</navigator>
						<view class="my-3" v-if="shareSuccessList.length >= 10"><u-loadmore :status="successListLoadmore" /></view>
					</template>

					<!-- 审核失败 -->
					<template v-if="index === 2">
						<view class="default" v-if="shareFailedList.length === 0">
							<image src="../../static/images/ikon-planet.png" mode="widthFix"></image>
							<text>暂无分享</text>
						</view>
						<view class="item" v-for="(v, i) in shareFailedList" :key="i">
							<image :src="v.img" v-if="v.img"></image>
							<view class="title">
								<view>{{ v.title }}</view>
								<view class="text-danger" v-if="v.cause">{{ v.cause }}</view>
							</view>
							<view class="checkSign failed">审核失败</view>
							<view class="across"></view>
						</view>
						<view class="my-3" v-if="shareFailedList.length >= 10"><u-loadmore :status="failedListLoadmore" /></view>
					</template>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import { fetchShareList } from '@/api/index';
export default {
	data() {
		return {
			/* ======================== 公共 ======================== */
			// 用户id
			userid: '',
			/* ======================== tabsSwiper 全屏选项卡 ======================== */
			// tabs标题
			tabTitleList: [{ name: '审核中' }, { name: '审核成功' }, { name: '审核失败' }],
			// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
			// tabs组件的current值，表示当前活动的tab选项
			current: 0,
			// swiper组件的current值，表示当前那个swiper-item是活动的
			swiperCurrent: 0,
			/* ======================== 分享列表 ======================== */
			// 审核中列表
			shareCheckList: [],
			// 审核中列表分页
			shareCheckListPage: {
				total: 1,
				pageSize: 10,
				totalPage: 1,
				currentPage: 1
			},
			// 审核中列表加载更多
			checkListLoadmore: 'loadmore',
			// 审核成功列表
			shareSuccessList: [],
			// 审核成功列表分页
			shareSuccessListPage: {
				total: 1,
				pageSize: 10,
				totalPage: 1,
				currentPage: 1
			},
			// 审核成功列表加载更多
			successListLoadmore: 'loadmore',
			// 审核失败列表
			shareFailedList: [],
			// 审核失败列表分页
			shareFailedListPage: {
				total: 1,
				pageSize: 10,
				totalPage: 1,
				currentPage: 1
			},
			// 审核失败列表加载更多
			failedListLoadmore: 'loadmore'
		};
	},
	methods: {
		/* ======================== 公共 ======================== */
		// 设置用户id
		handleUserId(userid) {
			if (userid) {
				this.userid = userid;
			}
		},
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
		onreachBottom(index) {
			if (index === 0) {
				this.checkListLoadmore = 'loading';
				if (this.shareCheckListPage.currentPage >= this.shareCheckListPage.totalPage) {
					this.checkListLoadmore = 'nomore';
					return false;
				}

				this.checkListLoadmore = 'loadmore';
				this.shareCheckListPage.currentPage = this.shareCheckListPage.currentPage + 1;
				this.getShareCheckList(); // 获取审核中分享列表
			} else if (index === 1) {
				this.successListLoadmore = 'loading';
				if (this.shareSuccessListPage.currentPage >= this.shareSuccessListPage.totalPage) {
					this.successListLoadmore = 'nomore';
					return false;
				}

				this.successListLoadmore = 'loadmore';
				this.shareSuccessListPage.currentPage = this.shareSuccessListPage.currentPage + 1;
				this.getShareSuccessList(); // 获取审核通过分享列表
			} else if (index === 2) {
				this.failedListLoadmore = 'loading';
				if (this.shareFailedListPage.currentPage >= this.shareFailedListPage.totalPage) {
					this.failedListLoadmore = 'nomore';
					return false;
				}

				this.failedListLoadmore = 'loadmore';
				this.shareFailedListPage.currentPage = this.shareFailedListPage.currentPage + 1;
				this.getShareFailedList(); // 获取审核失败分享列表
			}
		},
		/* ======================== 分享列表 ======================== */
		// 获取审核中分享列表
		async getShareCheckList() {
			let data = {
				status: 0,
				page: this.shareCheckListPage.currentPage,
				limit: this.shareCheckListPage.pageSize,
				isZr: 0,
				lx: '',
				userid: this.userid
			};
			let res = await fetchShareList(data);
			if (res.code !== 200) {
				return false;
			}

			this.shareCheckList = [...this.shareCheckList, ...res.data[0].data];
			this.handleCheckListPage(res.data[0].count); // 设置审核中列表分页
		},
		// 设置审核中列表分页
		handleCheckListPage(count) {
			let total = count ? count : 1;
			this.shareCheckListPage.totalPage = Math.ceil(total / this.shareCheckListPage.pageSize);
		},
		// 获取审核通过分享列表
		async getShareSuccessList() {
			let data = {
				status: 1,
				page: this.shareSuccessListPage.currentPage,
				limit: this.shareSuccessListPage.pageSize,
				isZr: 0,
				lx: '',
				userid: this.userid
			};
			let res = await fetchShareList(data);
			if (res.code !== 200) {
				return false;
			}

			this.shareSuccessList = [...this.shareSuccessList, ...res.data[0].data];
			this.handleSuccessListPage(res.data[0].count); // 设置审核通过列表分页
		},
		// 设置审核通过列表分页
		handleSuccessListPage(count) {
			let total = count ? count : 1;
			this.shareSuccessListPage.totalPage = Math.ceil(total / this.shareSuccessListPage.pageSize);
		},
		// 获取审核失败分享列表
		async getShareFailedList() {
			let data = {
				status: 2,
				page: this.shareFailedListPage.currentPage,
				limit: this.shareFailedListPage.pageSize,
				isZr: 0,
				lx: '',
				userid: this.userid
			};
			let res = await fetchShareList(data);
			if (res.code !== 200) {
				return false;
			}

			this.shareFailedList = [...this.shareFailedList, ...res.data[0].data];
			this.handleFailedListPage(res.data[0].count); // 设置审核失败列表分页
		},
		// 设置审核失败列表分页
		handleFailedListPage(count) {
			let total = count ? count : 1;
			this.shareFailedListPage.totalPage = Math.ceil(total / this.shareFailedListPage.pageSize);
		}
	},
	// 下拉刷新
	onPullDownRefresh() {
		this.shareCheckList = [];
		this.shareSuccessList = [];
		this.shareFailedList = [];
		this.getShareCheckList(); // 获取审核中分享列表
		this.getShareSuccessList(); // 获取审核通过分享列表
		this.getShareFailedList(); // 获取审核失败分享列表
		uni.stopPullDownRefresh();
	},
	onLoad(e) {
		this.handleUserId(e.userid); // 设置用户id
		this.getShareCheckList(); // 获取审核中分享列表
		this.getShareSuccessList(); // 获取审核通过分享列表
		this.getShareFailedList(); // 获取审核失败分享列表
	}
};
</script>

<style lang="scss" scoped>
.userShare {
	display: flex;
	flex-flow: column nowrap;
	height: 100vh;
	swiper {
		flex: 1;
		.content {
			height: 100%;
			.default {
				margin-top: 300rpx;
			}
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
					margin-left: auto;
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

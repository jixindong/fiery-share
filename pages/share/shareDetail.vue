<template>
	<view class="shareDetail">
		<!-- 分享详情 -->
		<view class="detail">
			<image :src="shareDetail.img" mode="widthFix" v-if="shareDetail.img"></image>
			<view class="title">{{ shareDetail.title }}</view>
			<view class="d-flex justify-content-between">
				<view class="userMsg">
					<image :src="shareDetail.member.avatarurl || '../../static/images/avatar.png'"></image>
					<text class="text-truncate">{{ shareDetail.member.nickname }}</text>
				</view>
				<view class="readMsg">
					<image src="../../static/images/icon-fire.png" mode="widthFix"></image>
					<text>{{ shareDetail.num | readerNum }}</text>
					<text>万人围观</text>
				</view>
			</view>
			<view class="content">{{ shareDetail.content }}</view>
			<view class="accessory">
				<image src="../../static/images/icon-video.png" mode="widthFix" v-if="shareDetail.fileLx === 'video'"></image>
				<image src="../../static/images/icon-img.png" mode="widthFix" v-else></image>
				<text>{{ shareDetail.fileName }}</text>
				<view class="text-primary" @click="downloadFile()">下载</view>
			</view>
		</view>

		<!-- 推荐列表 -->
		<view class="recommendList">
			<view class="title">
				<view></view>
				<text>为你推荐</text>
			</view>

			<navigator :url="'../share/shareDetail?id=' + item.id" class="item" v-for="(item, index) in recommendList" :key="index">
				<image :src="item.img" v-if="item.img"></image>
				<view class="msg">
					<view class="title">{{ item.title }}</view>
					<view class="d-flex justify-content-between">
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
				</view>
				<view class="across"></view>
			</navigator>
		</view>
	</view>
</template>

<script>
import * as shareApi from '@/api/share';
export default {
	data() {
		return {
			// 分享详情
			shareDetail: '',
			// 推荐列表
			recommendList: []
		};
	},
	methods: {
		// 获取分享详情
		async fetchShareDetail(id) {
			let data = { id: parseInt(id) };
			let res = await shareApi.fetchShareDetail(data);
			if (res.code !== 200) {
				return false;
			}

			this.shareDetail = res.data;
		},
		// 文件下载
		async downloadFile() {
			let downloadFileRes = await uni.downloadFile({ url: this.shareDetail.file });
			let saveFileRes = await uni.saveFile({ tempFilePath: downloadFileRes.tempFilePath });
			uni.showToast({ title: '下载成功', icon: 'success' });
		},
		// 获取分享推荐
		async fetchShareRecommend() {
			let data = { userid: 2 };
			let res = await shareApi.fetchShareRecommend(data);
			if (res.code !== 200) {
				return false;
			}

			this.recommendList = res.data;
		}
	},
	onLoad(e) {
		this.fetchShareDetail(e.id); // 获取分享详情
		this.fetchShareRecommend(); // 获取分享推荐
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

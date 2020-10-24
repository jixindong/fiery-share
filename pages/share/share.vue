<template>
	<view class="share">
		<u-form :model="shareForm" ref="shareFormRef" class="shareForm">
			<!-- 分类 -->
			<u-form-item label="分类" prop="type" :border-bottom="false">
				<view class="type" @click="shareTypeSelectShow = true">
					<text>{{ shareForm.type.label || '请选择分享类型' }}</text>
					<image src="../../static/images/icon-arrow-down.png" mode="widthFix"></image>
				</view>
				<u-select mode="single-column" :list="shareType" v-model="shareTypeSelectShow" @confirm="shareTypeSelectChange"></u-select>
			</u-form-item>
			<!-- 封面 -->
			<view class="uploadPoster">
				<view class="poster" v-if="uploadFile.poster">
					<image :src="uploadFile.poster" mode="widthFix"></image>
					<view class="close"><u-icon name="close-circle" @click="delUploadedPoster"></u-icon></view>
				</view>
				<view class="addBtn" @click="uploadPoster" v-else>
					<image src="../../static/images/icon-plus-2.png"></image>
					<text>添加封面图片</text>
				</view>
			</view>
			<!-- 标题 -->
			<view class="content">
				<u-form-item prop="title" label-width="0" :border-bottom="false">
					<u-input type="textarea" v-model="shareForm.title" placeholder="添加标题" maxlength="30"></u-input>
				</u-form-item>
				<view class="limit">{{ shareForm.title.length }}/30</view>
			</view>
			<!-- 详情 -->
			<view class="content">
				<u-form-item prop="content" label-width="0" :border-bottom="false">
					<u-input type="textarea" v-model="shareForm.content" placeholder="添加详情~" maxlength="300" autoHeight></u-input>
				</u-form-item>
				<view class="limit">{{ shareForm.content.length }}/300</view>
			</view>
			<!-- 附件 -->
			<view class="uploadAccessory">
				<view class="accessory" v-if="uploadFile.accessory">
					<text class="text-truncate">{{ uploadFile.accessoryName }}</text>
					<u-button type="warning" size="mini" plain ripple @click="delUploadedAccessory">删除已上传附件</u-button>
				</view>
				<view class="addMsg" v-else>
					<view class="addBtn" @click="uploadAccessory">
						<image src="../../static/images/icon-plus-2.png"></image>
						<text>添加附件</text>
					</view>
					<text>请上传图片或视频</text>
				</view>
			</view>
			<u-button type="primary" ripple @click="shareFormSubmit">提交审核</u-button>
		</u-form>
	</view>
</template>

<script>
import * as shareApi from '@/api/share';
import uploadFile from '@/utils/uploadFile';
export default {
	data() {
		return {
			// 用户id
			userid: '',
			// 分享表单
			shareForm: {
				type: '',
				title: '',
				content: ''
			},
			// 分享表单校验规则
			shareFormRules: {
				type: [
					{
						required: true,
						message: '请选择分享类型'
					}
				],
				title: [
					{
						required: true,
						message: '请输入分享标题',
						trigger: ['blur']
					}
				],
				content: [
					{
						required: true,
						message: '请输入分享详情',
						trigger: ['blur']
					}
				]
			},
			// 分享类型
			shareType: [],
			// 分享类型select显示隐藏
			shareTypeSelectShow: false,
			// OSS配置
			config: {
				uploadUrl: '',
				AccessKeySecret: '',
				OSSAccessKeyId: '',
				timeout: 0
			},
			// 已上传文件
			uploadFile: {
				poster: '', // 封面
				accessory: '', // 附件
				accessoryName: '', // 附件名称
				accessoryType: '' // 附件类型
			}
		};
	},
	methods: {
		// 判断用户是否授权
		judgeUserAccredit() {
			let userid = uni.getStorageSync('userid');
			if (!userid) {
				return uni.redirectTo({ url: '../user/user' });
			}

			this.userid = userid;
		},
		// 获取分享类型
		async fetchShareClassList() {
			let res = await shareApi.fetchShareClassList();
			if (res.code !== 200) {
				return false;
			}

			let shareType = [];
			res.data.forEach(e => {
				shareType.push({ value: e.id, label: e.name });
			});
			this.shareType = shareType;
		},
		// 获取OSS配置
		async fetchOssConfig() {
			let res = await shareApi.fetchOssConfig();
			if (res.code !== 200) {
				return false;
			}

			let { oss_url: uploadUrl, oss_key_secret: AccessKeySecret, oss_access_key: OSSAccessKeyId } = res.data[0];
			uploadUrl = uploadUrl.slice(uploadUrl.length - 1) === '/' ? `https://${uploadUrl}` : `http://${uploadUrl}/`;
			this.config = { uploadUrl, AccessKeySecret, OSSAccessKeyId, timeout: 87600 };
		},
		// 上传封面
		uploadPoster() {
			uni.chooseImage({
				count: 1, // 上传文件数量
				success: res => {
					let tempFilePath = res.tempFilePaths[0];
					let filePostfix = tempFilePath.lastIndexOf('.') === -1 ? '' : tempFilePath.slice(tempFilePath.lastIndexOf('.'));
					uploadFile(this.config, filePostfix, tempFilePath, '', res => {
						this.uploadFile.poster = res;
						uni.hideLoading();
					});
				}
			});
		},
		// 删除已上传封面
		delUploadedPoster() {
			uni.showModal({
				title: '提示',
				content: '确认删除吗？',
				success: res => {
					res.confirm && (this.uploadFile.poster = '');
				}
			});
		},
		// 上传附件
		uploadAccessory() {
			uni.showModal({
				title: '提示',
				content: '请选择上传文件类型',
				confirmText: '图片',
				cancelText: '视频',
				success: res => {
					if (res.confirm) {
						this.uploadFile.accessoryType = 'image';
					} else {
						this.uploadFile.accessoryType = 'video';
					}
				},
				complete: () => {
					uni.chooseImage({
						count: 1, // 上传文件数量
						success: res => {
							let tempFilePath = res.tempFilePaths[0];
							let filePostfix = tempFilePath.lastIndexOf('.') === -1 ? '' : tempFilePath.slice(tempFilePath.lastIndexOf('.'));
							uploadFile(this.config, filePostfix, tempFilePath, '', res => {
								this.uploadFile.accessory = res;
								this.uploadFile.accessoryName = res.slice(res.lastIndexOf('/') + 1);
								uni.hideLoading();
							});
						}
					});
				}
			});
		},
		// 删除已上传附件
		delUploadedAccessory() {
			uni.showModal({
				title: '提示',
				content: '确认删除吗？',
				success: res => {
					res.confirm && (this.uploadFile.accessory = '');
				}
			});
		},
		// 设置分享表单校验规则
		handleShareFormRules() {
			this.$refs.shareFormRef.setRules(this.shareFormRules);
		},
		// 分享类型select选择
		shareTypeSelectChange(e) {
			this.shareForm.type = e[0];
		},
		// 提交审核
		async shareFormSubmit() {
			this.$refs.shareFormRef.validate(valid => {
				if (!valid) {
					return false;
				}
			});

			if (!this.uploadFile.poster) {
				return uni.showToast({ title: '请上传封面', icon: 'none' });
			}

			let data = {
				lx: this.shareForm.type.value,
				title: this.shareForm.title,
				content: this.shareForm.content,
				img: this.uploadFile.poster,
				file: this.uploadFile.accessory,
				fileName: this.uploadFile.accessoryName,
				fileLx: this.uploadFile.accessoryType,
				userid: this.userid
			};
			let res = await shareApi.addNewShare(data);
			if (res.code !== 200) {
				return uni.showToast({ title: res.msg, icon: 'none' });
			}

			uni.showToast({
				title: '添加成功',
				icon: 'success',
				duration: 2000,
				complete: () => {
					uni.redirectTo({ url: '../index/index' });
				}
			});
		}
	},
	onReady() {
		this.judgeUserAccredit(); // 判断用户是否授权
		this.handleShareFormRules(); // 设置分享表单校验规则
		this.fetchShareClassList(); // 获取分享类型
		this.fetchOssConfig(); // 获取OSS配置
	}
};
</script>

<style lang="scss" scoped>
.share {
	padding: 20rpx 20rpx 30rpx;
	.shareForm {
		// 类型
		.type {
			color: #999;
			font-size: 24rpx;
			text-align: right;
			image {
				margin-left: 20rpx;
				width: 20rpx;
			}
		}
		// 上传封面
		.uploadPoster {
			display: flex;
			justify-content: center;
			align-items: center;
			min-height: 320rpx;
			.poster {
				position: relative;
				padding: 20rpx;
				image {
					width: 710rpx;
				}
				.close {
					position: absolute;
					top: -2rpx;
					right: 6rpx;
					color: #0094ff;
					font-size: 48rpx;
					background-color: #fff;
					border-radius: 50%;
				}
			}
			.addBtn {
				display: flex;
				flex-flow: column nowrap;
				align-items: center;
				color: #666;
				font-size: 28rpx;
				image {
					margin-bottom: 20rpx;
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
				}
			}
		}
		// 标题、详情
		.content {
			margin: 40rpx 0;
			padding: 10rpx 20rpx;
			color: #999;
			font-size: 24rpx;
			background-color: #f4f4f4;
			.limit {
				text-align: right;
			}
		}
		// 附件
		.uploadAccessory {
			display: flex;
			padding: 30rpx 0;
			.accessory {
				display: flex;
				align-items: center;
				color: #999;
				font-size: 28rpx;
				text {
					margin-right: 20rpx;
					max-width: 375rpx;
				}
			}
			.addMsg {
				display: flex;
				color: #999;
				.addBtn {
					display: flex;
					flex-flow: column nowrap;
					justify-content: center;
					align-items: center;
					margin-right: 20rpx;
					width: 180rpx;
					height: 180rpx;
					font-size: 20rpx;
					background-color: #f4f4f4;
					border-radius: 6rpx;
					image {
						margin-bottom: 12rpx;
						width: 50rpx;
						height: 50rpx;
						border-radius: 50%;
					}
				}
			}
		}
	}
}
</style>

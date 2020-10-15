<template>
	<view class="share">
		<u-form :model="shareForm" ref="shareFormRef" class="shareForm">
			<u-form-item label="分类" prop="type" :border-bottom="false">
				<view class="type" @click="shareTypeSelectShow = true">
					<text>{{ shareForm.type.label || '请选择分享类型' }}</text>
					<image src="../../static/images/icon-arrow-down.png" mode="widthFix"></image>
				</view>
				<u-select mode="single-column" :list="shareType" v-model="shareTypeSelectShow" @confirm="shareTypeSelectChange"></u-select>
			</u-form-item>
			<u-upload :action="uploadPath" max-count="1" :on-success="uploadImgSuccess"></u-upload>
			<view class="content">
				<u-form-item prop="title" label-width="0" :border-bottom="false">
					<u-input type="textarea" v-model="shareForm.title" placeholder="添加标题" maxlength="30"></u-input>
				</u-form-item>
				<view class="limit">{{ shareForm.title.length }}/30</view>
			</view>
			<view class="content">
				<u-form-item prop="content" label-width="0" :border-bottom="false">
					<u-input type="textarea" v-model="shareForm.content" placeholder="添加详情~" maxlength="300" autoHeight></u-input>
				</u-form-item>
				<view class="limit">{{ shareForm.content.length }}/300</view>
			</view>
			<u-button type="primary" ripple @click="shareFormSubmit">提交审核</u-button>
		</u-form>
	</view>
</template>

<script>
export default {
	data() {
		return {
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
			shareType: [
				{
					value: 1,
					label: '生活小常识'
				},
				{
					value: 2,
					label: '知识'
				}
			],
			// 分享类型select显示隐藏
			shareTypeSelectShow: false,
			// 上传文件地址
			uploadPath: 'http://douchuang.oss-cn-qingdao.aliyuncs.com/'
		};
	},
	methods: {
		// 设置分享表单校验规则
		handleShareFormRules() {
			this.$refs.shareFormRef.setRules(this.shareFormRules);
		},
		// 分享类型select选择
		shareTypeSelectChange(e) {
			this.shareForm.type = e[0];
		},
		// 提交审核
		shareFormSubmit() {
			this.$refs.shareFormRef.validate(valid => {
				if (!valid) {
					return false;
				}
			});
		},
		// 上传图片成功
		uploadImgSuccess() {}
	},
	onReady() {
		this.handleShareFormRules(); // 设置分享表单校验规则
	}
};
</script>

<style lang="scss" scoped>
.share {
	padding: 20rpx;
	.shareForm {
		.type {
			color: #999;
			font-size: 24rpx;
			text-align: right;
			image {
				margin-left: 20rpx;
				width: 20rpx;
			}
		}
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
	}
}
</style>

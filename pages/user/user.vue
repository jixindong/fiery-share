<template>
	<view class="user">
		<!-- 用户信息 -->
		<view class="userMsg">
			<image src="../../static/images/avatar.jpg" mode="widthFix" class="avatarBgi"></image>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {},
	onShow() {}
};
</script>

<style lang="scss">
.user{
	/* 用户信息 */
	.userMsg{
		height: 600rpx;
		overflow: hidden;
		.avatarBgi{
			width: 100%;
		}
	}
}
</style>

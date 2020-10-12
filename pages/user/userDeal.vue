<template>
	<view class="userDeal">
		<image src="../../static/images/ikon-safe.png" mode="widthFix" class="banner"></image>
		<view class="content">
			<view>
				为了更好地为您提供服务，请您在开始使用“抖音”软件及相关服务之前，认真阅读并充分理解本协议，特别是涉及免除或者限制责任的条款、权利许可和信息使用的条款、同意开通和使用特殊单项服务的条款、法律适用和争议解决条款等。其中，免除或者限制责任条款等重要内容将以加粗形式提示您注意，您应重点阅读。
			</view>
			<view>
				如您未满18周岁，请您在法定监护人陪同下仔细阅读并充分理解本协议，并征得法定监护人的同意后使用“抖音”软件及相关服务。
				如您不同意本协议，这将导致公司无法为您提供完整的产品和服务，您也可以选择停止使用。如您自主选择同意或使用“抖音”软件及相关服务，则视为您已充分理解本协议，并同意作为本协议的一方当事人接受本协议以及其他与“抖音”软件及相关服务相关的协议和规则（包括但不限于
				<text class="policy">《“抖音”隐私政策》</text>
				）的约束。
			</view>
		</view>
	</view>
</template>

<style lang="scss" scoped>
.userDeal {
	display: flex;
	flex-flow: column nowrap;
	padding: 60rpx 40rpx 0;
	.banner {
		margin: 0 auto 20rpx;
		width: 440rpx;
	}
	.content {
		color: #010101;
		font-size: 32rpx;
		> view {
			margin-top: 50rpx;
		}
		.policy {
			color: #348bf6;
		}
	}
}
</style>

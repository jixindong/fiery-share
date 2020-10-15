<template>
	<view v-html="userDeal"></view>
</template>

<script>
import { fetchUserDeal } from '@/api/user';
export default {
	data() {
		return {
			userDeal: null
		};
	},
	methods: {
		// 获取用户协议
		async getUserDeal() {
			let res = await fetchUserDeal();
			if (res.code !== 200) {
				return false;
			}

			this.userDeal = res.data[0].value;
		}
	},
	onReady() {
		this.getUserDeal(); // 获取用户协议
	}
};
</script>

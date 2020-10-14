<template>
	<view v-html="aboutUs"></view>
</template>

<script>
import { fetchAboutUs } from '@/api/user';
export default {
	data() {
		return {
			aboutUs: null
		};
	},
	methods: {
		// 获取关于我们
		async getAboutUs() {
			let res = await fetchAboutUs();
			if (res.code !== 200) {
				return false;
			}

			this.aboutUs = res.data[0].value;
		}
	},
	onReady() {
		this.getAboutUs(); // 获取关于我们
	}
};
</script>

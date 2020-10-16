<script>
export default {
	onLaunch() {
		// #ifdef MP-TOUTIAO
		uni.login({
			provider: 'toutiao',
			success: res => {
				uni.setStorageSync('code', res.code);
			}
		});
		// #endif
	},
	onShow() {},
	onHide() {}
};
</script>

<style lang="scss">
/* uview-ui */
@import 'uview-ui/index.scss';
/* tool-class */
@import '~@/style/tool-class.css';
/* common */
@import '~@/style/common.scss';
</style>

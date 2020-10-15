// banner
export function bannerImg(value) {
	if (!value) {
		return 'https://s1.ax1x.com/2020/10/12/021ymF.png';
	}

	return `https://dyxcx.waszn.com/${value}`;
}

// 围观人数
export function readerNum(value) {
	if (!value) {
		return 0;
	}

	return (value / 10000).toFixed(1);
}

// 分享时间
export function shareTime(value) {
	if (!value) {
		return '保密';
	}

	let date = new Date(value * 1000);
	let year = date.getFullYear();
	let month = (date.getMonth() + 1).toString().padStart(2, '0');
	let day = date.getDate();
	let hour = date
		.getHours()
		.toString()
		.padStart(2, '0');
	let minute = date
		.getMinutes()
		.toString()
		.padStart(2, '0');
	let second = date
		.getSeconds()
		.toString()
		.padStart(2, '0');
	return `${year}年${month}月${day}日 ${hour}:${minute}:${second}`;
}

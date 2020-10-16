// 引入base64,hmac,sha1,crypto相关算法
const base64 = require('./base64.js');
require('./hmac.js');
require('./sha1.js');
const Crypto = require('./crypto.js');

// 上传OSS相关配置
let config = {
	uploadUrl: '',
	AccessKeySecret: '',
	OSSAccessKeyId: '',
	timeout: 87600
};

/*
 * 上传文件到阿里云OSS
 * @param - handleConfig : 上传OSS相关配置
 * @param - filePostfix : 上传文件扩展名
 * @param - filePath : 上传文件路径
 * @param - dir : 上传到服务器的哪个目录下
 * @param - successFunc : 上传成功回调
 * @param - failFunc : 上传失败回调
 */

const uploadFile = function(handleConfig, filePostfix, filePath, dir, successFunc, failFunc) {
	if (!filePath) {
		return uni.showModal({
			title: '提示',
			content: '上传失败，请重试。',
			showCancel: false
		});
	}

	// OSS相关配置
	config = handleConfig;
	// 文件名 当前时间戳 + 150 以内随机数
	let aliyunFileKey = dir + new Date().getTime() + Math.floor(Math.random() * 150) + filePostfix;
	let aliyunServerURL = handleConfig.uploadUrl; // OSS地址
	let accessid = handleConfig.OSSAccessKeyId;
	let policyBase64 = getPolicyBase64();
	let signature = getSignature(policyBase64); // 签名

	uni.uploadFile({
		url: aliyunServerURL,
		filePath,
		name: 'file',
		formData: {
			'key': aliyunFileKey,
			'policy': policyBase64,
			'OSSAccessKeyId': accessid,
			'signature': signature,
			'success_action_status': '200'
		},
		success: function(res) {
			if (res.statusCode !== 200) {
				return uni.showModal({
					title: '提示',
					content: '上传失败，请重试。',
					showCancel: false
				});
			}

			successFunc(aliyunServerURL + aliyunFileKey);
		},
		fail: function(err) {
			uni.showModal({
				title: '提示',
				content: '上传失败，请重试。',
				showCancel: false
			});
		}
	});
};

const getPolicyBase64 = function() {
	let date = new Date();
	date.setHours(date.getHours() + config.timeout);
	let srcT = date.toISOString();
	const policyText = {
		'expiration': srcT, // 设置该Policy的过期时间
		'conditions': [
			['content-length-range', 0, 50 * 1024 * 1024] // 设置上传文件的大小限制
		]
	};
	const policyBase64 = base64.encode(JSON.stringify(policyText));
	return policyBase64;
};

const getSignature = function(policyBase64) {
	const accesskey = config.AccessKeySecret;
	const bytes = Crypto.HMAC(Crypto.SHA1, policyBase64, accesskey, {
		asBytes: true
	});
	const signature = Crypto.util.bytesToBase64(bytes);
	return signature;
};

module.exports = uploadFile;

import fs from 'fs';
import path from 'path';

interface configObj {
	publicDir: string;
}

const writeVersion = (versionFileName: string, content: string | NodeJS.ArrayBufferView) => {
	// 写入文件
	fs.writeFile(versionFileName, content, (err) => {
		if (err) throw err;
	});
};

// 打包时获取版本信息
const VERSION_TIME = new Date().getTime();

export const versionUpdatePlugin = () => {
	let config: configObj = { publicDir: '' };

	return {
		name: 'version-update',
		configResolved(resolvedConfig: configObj) {
			// 存储最终解析的配置
			config = resolvedConfig;
		},
		buildStart() {
			// 生成版本信息文件路径
			const file = config.publicDir + path.sep + 'version.json';

			// 这里使用编译时间作为版本信息
			const content = JSON.stringify({ version: VERSION_TIME });

			if (fs.existsSync(config.publicDir)) {
				writeVersion(file, content);
			} else {
				fs.mkdir(config.publicDir, (err) => {
					if (err) throw err;
					writeVersion(file, content);
				});
			}
		},
	};
};


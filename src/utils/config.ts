import type { TFunction } from "i18next";

/**
 * @description: 配置项
 */
export const TITLE_SUFFIX = (t: TFunction) => t('public.currentName'); // 标题后缀
export const TOKEN = 'admin_token'; // token名称
export const LANG = 'lang'; // 语言
export const WATERMARK_PREFIX = 'admin'; // 水印前缀
export const EMPTY_VALUE = '-'; // 空值显示
export const CRYPTO_SECRET = '__Vite_Admin_Secret__'; // 加密密钥
export const THEME_KEY = 'theme_key'; // 主题
 
 // 公共组件默认值
 export const MAX_TAG_COUNT = 'responsive'; // 最多显示多少个标签，responsive：自适应
 export const INPUT_REQUIRED = (t: TFunction) => [{ required: true, message: t('public.inputPleaseEnter') }]; // 输入框必填校验
 export const SELECT_REQUIRED = (t: TFunction) => [{ required: true, message: t('public.inputPleaseSelect') }];// 选择框必填校验

// 环境判断
const ENV = import.meta.env.VITE_ENV as string;
// 生成环境所用的接口
const URL = import.meta.env.VITE_BASE_URL as string;
// 上传地址
export const FILE_API = `${ENV === 'development' ? '/api' : URL}/authority/file/upload-file`;

// 新增/编辑标题
export const ADD_TITLE = (t: TFunction, title?: string) => t('public.createTitle', { title: title ?? '' });
export const EDIT_TITLE = (t: TFunction, name: string, title?: string) => `${ t('public.editTitle', { title: title ?? '' }) }${ name ? `(${name})` : '' }`;

// 密码规则
export const PASSWORD_RULE = (t: TFunction) => ({
  pattern: /^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z~!@#$%^&*+\.\_\-*]{6,30}$/,
  message: t('login.passwordRuleMessage')
});
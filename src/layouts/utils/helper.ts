import type { TabsData } from "@/stores/tabs";
import type { MessageInstance } from "antd/es/message/interface";
import { LANG, VERSION } from "@/utils/config";
import axios from "axios";

/** 版本监控 */
export const versionCheck = async (messageApi: MessageInstance) => {
  // if (import.meta.env.MODE === 'development') return;
  const versionLocal = localStorage.getItem(VERSION);
  const { data: { version } } = await axios.get('version.json');

  // 首次进入则缓存本地数据
  if (version && !versionLocal) {
    return localStorage.setItem(VERSION, String(version));
  }

  if (version && versionLocal !== String(version)) {
    localStorage.setItem(VERSION, String(version));
    messageApi.info({
      content: '发现新内容，自动更新中...',
      key: 'reload',
      onClose: () => {
        let timer: NodeJS.Timeout | null = setTimeout(() => {
          clearTimeout(timer as NodeJS.Timeout);
          timer = null;
          window.location.reload();
        }, 60000);
      }
    });
  }
};

/**
 * 通过路由获取标签名
 * @param tabs - 标签
 * @param path - 路由路径
 */
export const getTabTitle = (tabs: TabsData[], path: string): string => {
  const lang = localStorage.getItem(LANG);

  for (let i = 0; i < tabs?.length; i++) {
    const item = tabs[i];

    if (item.key === path) {
      const { label, labelEn, labelZh } = item;
      const result = lang === 'en' ? labelEn : labelZh || label;
      return result as string;
    }
  }

  return '';
};

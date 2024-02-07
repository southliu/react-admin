import type { MessageInstance } from "antd/es/message/interface";
import { VERSION } from "@/utils/config";
import axios from "axios";

/** 版本监控 */
export const versionCheck = async (messageApi: MessageInstance) => {
  // if (import.meta.env.MODE === 'development') return;
  const versionLocal = localStorage.getItem(VERSION);
  const { data: { version } } = await axios.get('version.json');

  // 首次进入则缓存本地数据
  if (!versionLocal) {
    return localStorage.setItem(VERSION, String(version));
  }

  if (versionLocal !== String(version)) {
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
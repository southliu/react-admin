import type { MessageInstance } from "antd/es/message/interface";
import axios from "axios";

/** 版本监控 */
export const versionCheck = async (messageApi: MessageInstance) => {
  if (import.meta.env.MODE === 'development') return;
  const response = await axios.get('version.json');
  if (process.env.VITE_APP_VERSION !== response.data.version) {
    messageApi.info({
      content: '发现新内容，自动更新中...',
      key: 'reload',
      onClose: () => {
        window.location.reload();
      }
    });
  }
};
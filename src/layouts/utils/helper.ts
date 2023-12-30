import type { AppDispatch } from "@/stores";
import type { MessageInstance } from "antd/es/message/interface";
import { setVersion } from "@/stores/public";
import axios from "axios";

/**
 * 版本监控
 * @param versionStore - 版本缓存值
 */
export const versionCheck = async (
  versionStore: string,
  dispatch: AppDispatch,
  messageApi: MessageInstance
) => {
  // if (import.meta.env.MODE === 'development') return;
  const { data: { version } } = await axios.get('version.json');

  // 首次进入则缓存本地数据
  if (!versionStore) {
    return dispatch(setVersion(String(version)));
  }

  if (versionStore !== String(version)) {
    dispatch(setVersion(String(version)));

    messageApi.info({
      content: '发现新内容，自动更新中...',
      key: 'reload',
      onClose: () => {
        window.location.reload();
      }
    });
  }
};